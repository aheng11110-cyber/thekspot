import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '../src/data/curationDB.json');

// GitHub Secrets에 등록된 OPENAI_API_KEY를 가져옵니다.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

async function crawlNaverSearch() {
  console.log("📡 네이버에서 '성수동 핫플' 인기글 검색 중...");
  try {
    const response = await axios.get('https://search.naver.com/search.naver?query=%EC%84%B1%EC%88%98%EB%8F%99+%ED%95%AB%ED%94%8C');
    const $ = cheerio.load(response.data);
    let titles = [];
    $('.api_txt_lines.total_tit').each((i, el) => {
      titles.push($(el).text());
    });
    console.log("🔍 크롤링된 트렌드:", titles.slice(0, 3));
    return titles.join(', ');
  } catch (error) {
    console.log("⚠️ 크롤링 실패 (API 대기). 기본 트렌드 키워드 사용.");
    return "성수동 최신 트렌디 카페, 웨이팅 있는 팝업스토어";
  }
}

async function scrapeAndFilterData() {
  console.log("🚀 100% 무인 AI 자동화 수집 봇 시작...");
  
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ 오류: OPENAI_API_KEY가 설정되지 않았습니다.");
    console.error("GitHub [Settings] -> [Secrets and variables] -> [Actions] 에 키를 추가해주세요.");
    process.exit(1);
  }

  // 1. 최신 트렌드 크롤링
  const trendData = await crawlNaverSearch();

  console.log("🧠 OpenAI(ChatGPT) 가동: 데이터 분석 및 다국어 큐레이션 작성 중...");

  const prompt = `
    당신은 전 세계 외국인들에게 한국의 '진짜' 핫플레이스를 추천해주는 AI 큐레이터입니다.
    다음 최신 트렌드 키워드를 바탕으로, 서울에서 가장 인기 있고 추천수가 높은 핫플(카페, 팝업, 식당 등) 1곳을 선정하세요.
    키워드: ${trendData}
    
    이 장소에 대해 다음 정보를 JSON 형식으로 작성하세요.
    - id: 고유한 숫자 (현재 타임스탬프)
    - type: cafe, restaurant, popup, concert, bar 중 하나
    - imageUrl: "/images/29.jpg" (고정값 사용)
    - links: { instagram: "https://www.instagram.com/p/BsOGulcndj-/" } (고정값 사용 - 임베드 오류 방지용)
    - tags: 2개의 태그 (예: ["AI 추천", "트렌드"])
    - groupSizes: ["혼자", "2-3명"] 등
    
    결과는 EN, KO, JP, CN, VN 5개 언어로 번역되어야 하며, 각 언어 객체가 name, city, province, description을 해당 언어로 가져야 합니다.
    형식 예시:
    {
      "EN": { "id": "123", "name": "...", "city": "Seoul", "province": "Seoul", "description": "...", "type": "cafe", "imageUrl": "...", "links": {...}, "tags": [...], "groupSizes": [...] },
      "KO": { ... },
      "JP": { ... },
      "CN": { ... },
      "VN": { ... }
    }
    응답은 반드시 마크다운 블록 없이 순수 JSON 형태만 반환하세요.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const responseText = response.choices[0].message.content.trim();
  
  try {
    const aiGeneratedData = JSON.parse(responseText);
    console.log("✅ AI 큐레이션 완료:", aiGeneratedData.KO.name);
    return aiGeneratedData;
  } catch (err) {
    console.error("❌ JSON 파싱 오류. AI 응답:", responseText);
    throw err;
  }
}

async function run() {
  try {
    const newData = await scrapeAndFilterData();
    
    // 기존 DB 읽기
    let db = {};
    if (fs.existsSync(DB_PATH)) {
      db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    }

    // 각 언어별로 데이터 추가
    const languages = ['EN', 'KO', 'JP', 'CN', 'VN'];
    languages.forEach(lang => {
      if (!db[lang]) db[lang] = [];
      db[lang].unshift(newData[lang]);
      
      // 용량 최적화: 최대 50개까지만 유지
      if (db[lang].length > 50) {
        db[lang] = db[lang].slice(0, 50);
      }
    });

    // DB 파일 덮어쓰기
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    console.log("✅ 데이터베이스(curationDB.json) AI 자동 업데이트 완료!");
    
  } catch (error) {
    console.error("❌ 실행 중 오류 발생:", error);
    process.exit(1);
  }
}

run();

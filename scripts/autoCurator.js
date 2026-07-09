import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 이 파일은 매일 새벽 GitHub Actions에 의해 자동으로 실행되는 스크립트입니다.
// 실제 운영 시에는 'Apify' 나 'Google Maps API' 연동 코드가 이곳에 들어갑니다.
// 그리고 AI API(OpenAI/Gemini)를 호출하여 데이터를 5개 국어로 번역합니다.

const DB_PATH = path.join(__dirname, '../src/data/curationDB.json');

async function scrapeAndFilterData() {
  console.log("🚀 자동화 수집 봇 시작...");
  console.log("📡 외부 API(네이버/인스타)에서 최신 핫플 트렌드 탐색 중...");
  
  // 시뮬레이션: 네트워크 딜레이
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  console.log("🧠 AI 필터링 가동 (광고성 글 제외, 순수 로컬 후기 분석 중)...");

  // 시뮬레이션: AI가 찾아낸 오늘의 새로운 핫플 데이터 (예시)
  const newHotSpotId = Date.now().toString();
  
  const aiGeneratedData = {
    EN: {
      id: newHotSpotId,
      name: "Automated AI Secret Cafe",
      city: "Seoul",
      province: "Seoul",
      type: "cafe",
      description: "[AI Auto-Curated] A newly discovered hidden cafe trending on local forums today. Filtered and verified by AI.",
      imageUrl: "/images/29.jpg",
      links: { instagram: "https://instagram.com" },
      tags: ["AI Pick", "Trending"],
      groupSizes: ["Solo", "2-3 People"]
    },
    KO: {
      id: newHotSpotId,
      name: "AI 무인 자동화 시크릿 카페",
      city: "서울",
      province: "서울특별시",
      type: "cafe",
      description: "[AI 자동 수집] 오늘 새벽 로컬 커뮤니티에서 가장 뜨거운 반응을 얻은 숨겨진 카페. AI가 광고를 필터링하고 검증했습니다.",
      imageUrl: "/images/29.jpg",
      links: { instagram: "https://instagram.com" },
      tags: ["AI 추천", "실시간 트렌드"],
      groupSizes: ["혼자", "2-3명"]
    },
    JP: {
      id: newHotSpotId,
      name: "自動化AIシークレットカフェ",
      city: "ソウル",
      province: "ソウル",
      type: "cafe",
      description: "[AI自動収集] 本日ローカルフォーラムで最もトレンドになっている隠れ家カフェ。AIが広告を排除し検証済み。",
      imageUrl: "/images/29.jpg",
      links: { instagram: "https://instagram.com" },
      tags: ["AIピック", "トレンド"],
      groupSizes: ["1人", "2-3人"]
    },
    CN: {
      id: newHotSpotId,
      name: "自动化AI秘密咖啡馆",
      city: "首尔",
      province: "首尔",
      type: "cafe",
      description: "[AI自动收集] 今天在当地论坛上最火的隐藏咖啡馆。由AI过滤广告并验证。",
      imageUrl: "/images/29.jpg",
      links: { instagram: "https://instagram.com" },
      tags: ["AI推荐", "热门趋势"],
      groupSizes: ["单人", "2-3人"]
    },
    VN: {
      id: newHotSpotId,
      name: "Quán cà phê bí mật AI tự động",
      city: "Seoul",
      province: "Seoul",
      type: "cafe",
      description: "[AI tự động] Một quán cà phê ẩn mới được phát hiện đang thịnh hành trên các diễn đàn địa phương hôm nay. Đã được AI xác minh.",
      imageUrl: "/images/29.jpg",
      links: { instagram: "https://instagram.com" },
      tags: ["AI Chọn", "Xu hướng"],
      groupSizes: ["Cá nhân", "2-3 Người"]
    }
  };

  return aiGeneratedData;
}

async function run() {
  try {
    const newData = await scrapeAndFilterData();
    
    // 기존 DB 읽기
    let db = {};
    if (fs.existsSync(DB_PATH)) {
      db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    }

    // 각 언어별로 데이터 추가 (최신순을 위해 배열 앞에 추가)
    const languages = ['EN', 'KO', 'JP', 'CN', 'VN'];
    languages.forEach(lang => {
      if (!db[lang]) db[lang] = [];
      db[lang].unshift(newData[lang]);
      
      // 용량 최적화: 최대 50개까지만 유지 (나머지는 자동 삭제)
      if (db[lang].length > 50) {
        db[lang] = db[lang].slice(0, 50);
      }
    });

    // DB 파일 덮어쓰기
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    console.log("✅ 데이터베이스(curationDB.json) 업데이트 완료!");
    
  } catch (error) {
    console.error("❌ 자동화 수집 중 오류 발생:", error);
    process.exit(1);
  }
}

run();

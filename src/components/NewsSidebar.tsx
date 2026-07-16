import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { collection, query, where, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url?: string;
  lang: string;
  createdAt?: Timestamp;
}

const MOCK_NEWS = {
  EN: [
    { id: 'm1', title: 'Ateez tops Billboard 200 with new album', summary: 'K-pop boy group Ateez has secured their first No. 1 on the Billboard 200 albums chart.', lang: 'EN', url: 'https://koreajoongangdaily.heraldcorp.com/' },
    { id: 'm2', title: 'Netflix Korea announces 2026 lineup', summary: 'Netflix revealed its massive Korean content lineup including Squid Game Season 3.', lang: 'EN', url: 'https://koreajoongangdaily.heraldcorp.com/' },
    { id: 'm3', title: 'Seoul opens new night market in Myeongdong', summary: 'A massive new night market featuring over 100 food stalls has opened.', lang: 'EN' }
  ],
  KO: [
    { id: 'm1', title: '에이티즈, 빌보드 200 1위 달성', summary: '보이그룹 에이티즈가 새 앨범으로 빌보드 메인 차트 1위에 올랐습니다.', lang: 'KO', url: 'https://n.news.naver.com/' },
    { id: 'm2', title: '넷플릭스 2026 K-콘텐츠 라인업 발표', summary: '오징어게임 시즌3를 포함한 역대급 라인업이 공개되었습니다.', lang: 'KO', url: 'https://n.news.naver.com/' },
    { id: 'm3', title: '명동에 초대형 야시장 개장', summary: '100여개의 푸드트럭이 모인 새로운 명동 야시장이 문을 열었습니다.', lang: 'KO' }
  ],
  JP: [
    { id: 'm1', title: 'ATEEZ、ビルボード200で1位を獲得', summary: '韓国のボーイズグループATEEZが最新アルバムでビルボード200のトップに立ちました。', lang: 'JP' },
    { id: 'm2', title: '明洞に新しいナイトマーケットがオープン', summary: '100以上の屋台が集まる巨大なナイトマーケットが明洞にオープンしました。', lang: 'JP' }
  ],
  CN: [
    { id: 'm1', title: 'ATEEZ登顶公告牌二百强专辑榜', summary: '韩国男子组合ATEEZ凭借新专辑首次登顶公告牌二百强专辑榜。', lang: 'CN' },
    { id: 'm2', title: '首尔明洞开设全新夜市', summary: '明洞开设了一个拥有100多个小吃摊的大型新夜市。', lang: 'CN' }
  ],
  VN: [
    { id: 'm1', title: 'ATEEZ đứng đầu Billboard 200', summary: 'Nhóm nhạc nam K-pop ATEEZ đã giành được vị trí số 1 đầu tiên trên bảng xếp hạng album Billboard 200.', lang: 'VN' },
    { id: 'm2', title: 'Chợ đêm mới mở tại Myeongdong', summary: 'Một chợ đêm mới khổng lồ với hơn 100 quầy thức ăn đã được mở.', lang: 'VN' }
  ]
};

export function NewsSidebar() {
  const { lang } = useLanguage();
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  useEffect(() => {
    // 1. news 컬렉션에서 현재 언어(lang)와 일치하는 문서만 쿼리
    // 복합 색인(Index) 오류를 우회하기 위해 orderBy를 제거하고 클라이언트에서 정렬합니다.
    const q = query(
      collection(db, 'news'),
      where('lang', '==', lang)
    );
    
    // 2. 실시간 리스너 달기 (문서가 추가/수정되면 자동 갱신됨)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as NewsItem[];
      
      // 클라이언트 측에서 최신순으로 정렬
      items.sort((a, b) => {
        const timeA = a.createdAt?.toMillis() || 0;
        const timeB = b.createdAt?.toMillis() || 0;
        return timeB - timeA;
      });
      
      setNewsList(items);
    }, (error) => {
      // 만약 Firestore 색인(Index) 오류가 나더라도 일단 에러를 출력
      console.error("News fetch error:", error);
    });

    return () => unsubscribe();
  }, [lang]);

  const displayNews = newsList.length > 0 ? newsList : MOCK_NEWS[lang as keyof typeof MOCK_NEWS] || MOCK_NEWS['EN'];

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
  };

  const formatTime = (ts?: Timestamp) => {
    if (!ts) return 'Just now';
    const diff = Date.now() - ts.toMillis();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <>
      <div className="absolute top-24 right-4 bottom-6 w-[clamp(200px,22vw,320px)] bg-black/50 backdrop-blur-xl border-2 border-white/30 rounded-2xl z-30 flex flex-col p-4 lg:p-6 shadow-2xl">
        
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
          <h3 className="bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-lg tracking-[0.05em] uppercase font-bold">K-Trend News</h3>
        </div>
        
        {/* 뉴스 리스트 영역 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-5 pr-2">
          {displayNews.length === 0 ? (
            <p className="text-white/40 text-sm mt-10 text-center font-light leading-relaxed">
              No recent news for {lang}.<br/>
              Check back later!
            </p>
          ) : (
            displayNews.map((news, i) => (
              <motion.div 
                key={news.id + lang} // 언어 바뀔 때마다 애니메이션 트리거
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => handleNewsClick(news)}
                className="group cursor-pointer flex flex-col"
              >
                <p className="text-red-400 font-medium text-[10px] mb-1.5 uppercase tracking-wide">
                  {formatTime(news.createdAt)}
                </p>
                <h4 className="text-white/90 group-hover:text-white text-[14px] leading-relaxed transition-all line-clamp-3 font-medium">
                  {news.title}
                </h4>
                <div className="h-px w-full bg-white/5 mt-5 group-hover:bg-white/20 transition-colors" />
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* ──────────────── 뉴스 요약 팝업 (모달) ──────────────── */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNews(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                <X size={18} />
              </button>

              <div className={`p-8 pt-12`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/70 uppercase tracking-wide">
                    Trending
                  </span>
                  <span className="text-[10px] text-white/30 uppercase tracking-wide">
                    {formatTime(selectedNews.createdAt)}
                  </span>
                </div>
                
                <h2 className="text-white text-lg sm:text-xl font-light leading-snug mb-4">
                  {selectedNews.title}
                </h2>
                
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  {selectedNews.summary}
                </p>

                <a 
                  href={selectedNews.url ? selectedNews.url : `https://www.google.com/search?q=${encodeURIComponent(selectedNews.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 hover:text-white transition-colors text-sm font-light"
                >
                  <Search size={14} />
                  {selectedNews.url ? (
                    lang === 'EN' ? 'Read full article' : 
                    lang === 'KO' ? '기사 원문 보기' : 
                    lang === 'JP' ? '記事の全文を読む' : 
                    lang === 'CN' ? '阅读全文' : 'Đọc toàn bộ bài báo'
                  ) : (
                    lang === 'EN' ? 'Search for more details' : 
                    lang === 'KO' ? '자세한 내용 검색해보기' : 
                    lang === 'JP' ? '詳細を検索する' : 
                    lang === 'CN' ? '搜索更多详情' : 'Tìm kiếm thêm thông tin'
                  )}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

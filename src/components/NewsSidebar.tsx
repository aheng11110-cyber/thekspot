import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MOCK_NEWS = {
  EN: [
    { 
      id: 1, title: "Seoul named top global travel destination for 2026", time: "2h ago",
      summary: "Leading travel magazines have officially ranked Seoul as the #1 must-visit city globally for 2026, citing its perfect blend of ultra-modern infrastructure, pop-up culture, and historical palaces.",
      image: "/page_images/10.jpg"
    },
    { 
      id: 2, title: "New K-Pop mega concert announced at Busan Haeundae", time: "4h ago",
      summary: "A massive free concert featuring top K-pop idols will be held at Haeundae Beach this August. Over 100,000 global fans are expected to attend.",
      image: "/page_images/11.jpg"
    },
    { 
      id: 3, title: "Michelin Guide adds 5 new traditional Korean BBQ spots", time: "5h ago",
      summary: "The 2026 Michelin Guide has highlighted 5 newly established premium K-BBQ restaurants that cater specifically to foreign palates while maintaining authentic charcoal-grill traditions."
    },
    { 
      id: 4, title: "Best 10 popup stores opening this weekend in Seongsu", time: "1d ago",
      summary: "A curated list of the top 10 hottest pop-up stores opening in Seongsu-dong this weekend has been released, featuring exclusive beauty and fashion collaborations."
    }
  ],
  KO: [
    { 
      id: 1, title: "2026년 세계 최고의 여행지로 선정된 서울", time: "2시간 전",
      summary: "세계적인 여행 매거진들이 2026년 꼭 방문해야 할 도시 1위로 서울을 선정했습니다. 최첨단 인프라, 성수동 팝업 컬쳐, 전통 고궁이 완벽하게 조화를 이룬다는 점이 높은 평가를 받았습니다.",
      image: "/page_images/10.jpg"
    },
    { 
      id: 2, title: "부산 해운대에서 새로운 K-Pop 메가 콘서트 개최 발표", time: "4시간 전",
      summary: "올해 8월 부산 해운대 해수욕장에서 최정상 K-POP 아티스트들이 총출동하는 글로벌 메가 콘서트가 열립니다. 전 세계에서 10만 명 이상의 팬들이 모일 것으로 예상됩니다.",
      image: "/page_images/11.jpg"
    },
    { 
      id: 3, title: "미슐랭 가이드, 새로운 전통 K-BBQ 레스토랑 5곳 추가", time: "5시간 전",
      summary: "2026년 미슐랭 가이드에 외국인 관광객도 쉽게 접근할 수 있는 프리미엄 K-BBQ 레스토랑 5곳이 새롭게 별을 획득했습니다. 정통 숯불구이의 맛을 현대적으로 재해석했습니다."
    },
    { 
      id: 4, title: "이번 주말 성수동에서 열리는 최고의 팝업스토어 Top 10", time: "1일 전",
      summary: "이번 주말 성수동에서 열리는 가장 핫한 팝업스토어 10곳의 리스트가 공개되었습니다. 인기 뷰티 브랜드부터 한정판 스니커즈 콜라보까지 다양합니다."
    }
  ],
  JP: [
    { 
      id: 1, title: "2026年の世界最高の旅行先にソウルが選定", time: "2時間前",
      summary: "世界の主要旅行雑誌が、最先端のインフラ、ポップアップ文化、歴史的な宮殿が完璧に調和している点を評価し、2026年に訪れるべき都市1位にソウルを選定しました。",
      image: "/page_images/10.jpg"
    },
    { 
      id: 2, title: "釜山・海雲台で新しいK-POPメガコンサート開催決定", time: "4時間前",
      summary: "今年の8月、釜山の海雲台ビーチでトップK-POPアイドルが出演する大規模な無料コンサートが開催されます。世界中から10万人以上のファンが集まると予想されています。",
      image: "/page_images/11.jpg"
    },
    { 
      id: 3, title: "ミシュランガイド、新しい伝統的K-BBQ店を5軒追加", time: "5時間前",
      summary: "2026年のミシュランガイドで、外国人観光客にも親しみやすく、本格的な炭火焼きの伝統を守るプレミアムK-BBQレストラン5軒が新たに星を獲得しました。"
    },
    { 
      id: 4, title: "今週末、聖水洞(ソンスドン)で注目のポップアップストアTop10", time: "1日前",
      summary: "今週末に聖水洞でオープンする最もホットなポップアップストア10選が公開されました。限定のビューティーブランドやファッションコラボが含まれています。"
    }
  ],
  CN: [
    { 
      id: 1, title: "首尔被评为2026年全球最佳旅游目的地", time: "2小时前",
      summary: "全球领先的旅游杂志正式将首尔列为2026年全球必访城市第一名，称赞其超现代基础设施、快闪文化与历史宫殿的完美融合。",
      image: "/page_images/10.jpg"
    },
    { 
      id: 2, title: "釜山海云台宣布举办全新K-Pop大型演唱会", time: "4小时前",
      summary: "一场由顶级K-pop偶像带来的大型免费演唱会将于今年8月在海云台海滩举行，预计将吸引全球超过10万名粉丝。",
      image: "/page_images/11.jpg"
    },
    { 
      id: 3, title: "米其林指南新增5家传统韩国烤肉店", time: "5小时前",
      summary: "2026年米其林指南重点推介了5家新开业的高端韩国烤肉店，这些餐厅不仅保留了传统的炭烤工艺，还特别适合外国游客的口味。"
    },
    { 
      id: 4, title: "本周末圣水洞最值得去的10家快闪店", time: "1天前",
      summary: "本周末圣水洞最热门的10家快闪店名单已发布，涵盖了独家美妆和时尚联名品牌。"
    }
  ],
  VN: [
    { 
      id: 1, title: "Seoul được vinh danh là điểm đến du lịch hàng đầu năm 2026", time: "2 giờ trước",
      summary: "Các tạp chí du lịch hàng đầu đã chính thức xếp hạng Seoul là thành phố phải đến số 1 thế giới năm 2026, nhờ sự kết hợp hoàn hảo giữa hạ tầng hiện đại, văn hóa pop-up và các cung điện lịch sử.",
      image: "/page_images/10.jpg"
    },
    { 
      id: 2, title: "Mega concert K-Pop mới được công bố tại Haeundae, Busan", time: "4 giờ trước",
      summary: "Một buổi hòa nhạc miễn phí quy mô lớn với sự tham gia của các thần tượng K-pop hàng đầu sẽ diễn ra tại bãi biển Haeundae vào tháng 8 này. Dự kiến thu hút hơn 100.000 người hâm mộ toàn cầu.",
      image: "/page_images/11.jpg"
    },
    { 
      id: 3, title: "Michelin Guide thêm 5 nhà hàng K-BBQ truyền thống", time: "5 giờ trước",
      summary: "Michelin Guide 2026 đã vinh danh 5 nhà hàng K-BBQ cao cấp mới mở, phục vụ khẩu vị của du khách nước ngoài trong khi vẫn giữ gìn truyền thống nướng than hoa đích thực."
    },
    { 
      id: 4, title: "Top 10 cửa hàng Pop-up mở tại Seongsu cuối tuần này", time: "1 ngày trước",
      summary: "Danh sách 10 cửa hàng pop-up hot nhất sẽ mở tại Seongsu-dong cuối tuần này đã được công bố, bao gồm các màn hợp tác độc quyền về thời trang và làm đẹp."
    }
  ]
};

export function NewsSidebar() {
  const { lang } = useLanguage();
  const [selectedNews, setSelectedNews] = useState<typeof MOCK_NEWS['EN'][0] | null>(null);

  const currentNews = MOCK_NEWS[lang];

  return (
    <>
      <div className="absolute top-24 right-4 bottom-6 w-[280px] lg:w-[320px] bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl z-30 flex flex-col py-6 px-6 shadow-2xl">
        
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <h3 className="text-white text-xs tracking-[0.2em] uppercase font-light">K-Trend News</h3>
        </div>
        
        {/* 뉴스 리스트 영역 */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-5 pr-2">
          {currentNews.map((news, i) => (
            <motion.div 
              key={news.id + lang} // 언어 바뀔 때마다 애니메이션 트리거
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              onClick={() => setSelectedNews(news)}
              className="group cursor-pointer flex flex-col"
            >
              <p className="text-white/30 text-[9px] mb-1.5 uppercase tracking-widest">{news.time}</p>
              <h4 className="text-white/70 group-hover:text-white text-[13px] leading-relaxed transition-colors line-clamp-2 font-light">
                {news.title}
              </h4>
              <div className="h-px w-full bg-white/5 mt-5 group-hover:bg-white/20 transition-colors" />
            </motion.div>
          ))}
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

              {selectedNews.image && (
                <div className="w-full h-48 sm:h-56 relative overflow-hidden">
                  <img 
                    src={selectedNews.image} 
                    alt="News coverage" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] to-transparent" />
                </div>
              )}

              <div className={`p-8 ${!selectedNews.image ? 'pt-12' : 'pt-4'}`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/70 uppercase tracking-widest">
                    Trending
                  </span>
                  <span className="text-[10px] text-white/30 uppercase tracking-widest">
                    {selectedNews.time}
                  </span>
                </div>
                
                <h2 className="text-white text-lg sm:text-xl font-light leading-snug mb-4">
                  {selectedNews.title}
                </h2>
                
                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  {selectedNews.summary}
                </p>

                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(selectedNews.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/70 hover:text-white transition-colors text-sm font-light"
                >
                  <Search size={14} />
                  {lang === 'EN' ? 'Search for more details' : 
                   lang === 'KO' ? '자세한 내용 검색해보기' : 
                   lang === 'JP' ? '詳細を検索する' : 
                   lang === 'CN' ? '搜索更多详情' : 'Tìm kiếm thêm thông tin'}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

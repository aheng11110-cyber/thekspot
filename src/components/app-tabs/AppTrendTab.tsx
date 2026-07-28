import { motion } from 'framer-motion';
import { Hash, TrendingUp } from 'lucide-react';

const hashtags = [
  { tag: '성수동팝업', en: '성수동 인기 팝업스토어', posts: '1.2M', trend: '+15%' },
  { tag: '한강피크닉', en: '요즘 한강공원 피크닉', posts: '850K', trend: '+5%' },
  { tag: '요즘카페', en: '인스타 감성 트렌디 카페', posts: '2.4M', trend: '+8%' },
];

export function AppTrendTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6 p-6 pb-32"
    >
      <header className="pt-4">
        <h1 className="text-[32px] font-extrabold flex items-center gap-3">
          <Hash className="text-purple-400" size={32} />
          인기 트렌드
        </h1>
        <p className="text-[14px] text-white/50 mt-2 break-keep">지금 한국에서 가장 많이 찾는 키워드입니다.</p>
      </header>

      <div className="flex flex-col gap-3">
        {hashtags.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-4">
              <span className="text-[16px] font-bold text-white/30 w-4">{idx + 1}</span>
              <div>
                <h3 className="text-[16px] font-bold">#{item.tag}</h3>
                <p className="text-[12px] text-white/40">{item.en}</p>
              </div>
            </div>
            <div className="text-right">
               <div className="text-[13px] font-medium text-purple-400 flex items-center justify-end gap-1"><TrendingUp size={12} /> {item.trend}</div>
               <div className="text-[11px] text-white/30">{item.posts} 게시물</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { MessageCircle, Volume2 } from 'lucide-react';

const slangs = [
  { ko: '대박', roman: 'Dae-bak', en: '최고, 엄청난 (Awesome / Jackpot)', ex: '이 카페 완전 대박이야!' },
  { ko: '꿀잼', roman: 'Kkul-jaem', en: '너무 재미있는 (Super fun)', ex: '어제 갔던 팝업스토어 꿀잼이었어.' },
  { ko: '어쩔티비', roman: 'Eo-jjeol-tv', en: '어쩌라고 (So what?)', ex: 'MZ세대들이 자주 쓰는 밈.' },
];

export function AppSlangTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6 p-6 pb-32"
    >
      <header className="pt-4">
        <h1 className="text-[32px] font-extrabold flex items-center gap-3">
          <MessageCircle className="text-pink-400" size={32} />
          K-슬랭 사전
        </h1>
        <p className="text-[14px] text-white/50 mt-2 break-keep">현지인처럼 자연스럽게 대화해 보세요.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {slangs.map((s, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-[30px] -mr-8 -mt-8" />
             <div className="flex justify-between items-start mb-2 relative z-10">
               <div>
                 <h3 className="text-[24px] font-bold text-white">{s.ko}</h3>
                 <p className="text-[14px] text-pink-400 font-medium mb-3">{s.roman}</p>
               </div>
               <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                 <Volume2 size={16} />
               </button>
             </div>
             
             <div className="relative z-10">
               <p className="text-[15px] font-medium text-white/90 mb-1">{s.en}</p>
               <p className="text-[13px] text-white/40 italic">"{s.ex}"</p>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

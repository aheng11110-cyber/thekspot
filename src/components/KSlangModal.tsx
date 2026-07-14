import { motion } from 'framer-motion';
import { X, BookOpen, Quote, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface KSlangModalProps {
  onClose: () => void;
}

const mockSlangs = [
  { term: '폼 미쳤다', pron: 'Pom Mi-chyeot-da', meaning: 'Their form is crazy. Used when someone is exceptionally good at something recently.', usage: '오늘 손흥민 폼 미쳤다! (Son Heung-min\'s form is crazy today!)' },
  { term: '완전 럭키비키잔앙', pron: 'Won-jeon Lucky Vicky-jan-ang', meaning: 'Totally Lucky Vicky. A meme popularized by IVE\'s Wonyoung to express extreme positivity in a bad situation.', usage: '비가 와서 시원하니까 완전 럭키비키잔앙~ (It is raining so it\'s cool, totally lucky vicky~)' },
  { term: '킹받네', pron: 'King-bat-ne', meaning: 'Very annoying/pissed off. "King" (extreme) + "Yeol-bat-ne" (angry).', usage: '아 진짜 킹받네 ㅋㅋ (Ah seriously that is so annoying lol)' },
  { term: '오운완', pron: 'O-un-wan', meaning: 'Acronym for "Today\'s Workout Complete". Used a lot on Instagram.', usage: '오늘도 오운완! 뿌듯하다. (O-un-wan today too! Feel proud.)' },
];

export function KSlangModal({ onClose }: KSlangModalProps) {
  const { lang } = useLanguage();
  
  const title = lang === 'KO' ? '주간 K-슬랭 요약본' : 'Weekly K-Slang Digest';
  const desc = lang === 'KO' ? '교과서에 없는, 한국인들이 지금 당장 쓰는 진짜 유행어 사전입니다.' : 'The real slang Koreans are using right now, not the textbook Korean.';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl h-[75vh] bg-[#0a0a0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-10 border-b border-white/10 bg-black/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tighter flex items-center gap-3 mb-2">
              <BookOpen className="text-purple-400/80" />
              {title}
            </h2>
            <p className="text-white/50 text-sm tracking-wide">{desc}</p>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium">
            <Download size={16} />
            Download PDF
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 bg-[#0a0a0c] flex flex-col gap-6">
          {mockSlangs.map((slang, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                <h3 className="text-2xl text-purple-300 font-bold">{slang.term}</h3>
                <span className="text-white/40 font-mono text-sm">[{slang.pron}]</span>
              </div>
              <div className="h-px w-full bg-white/10 my-1" />
              <p className="text-white/80 leading-relaxed text-sm sm:text-base">
                {slang.meaning}
              </p>
              <div className="mt-2 bg-black/30 p-4 rounded-lg flex gap-3 items-start border border-white/5">
                <Quote size={16} className="text-purple-400 shrink-0 mt-0.5" />
                <p className="text-white/60 italic text-sm">{slang.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

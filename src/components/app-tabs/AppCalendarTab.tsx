import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, MapPin, ExternalLink } from 'lucide-react';

const events = [
  { id: 1, title: '젠틀몬스터 팝업 스토어', date: '10월 15일 - 10월 30일', type: '패션', location: '하우스 도산' },
  { id: 2, title: '탬버린즈 전시회', date: '10월 20일 - 11월 5일', type: '뷰티', location: '성수동' },
];

export function AppCalendarTab() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6 p-6 pb-32"
    >
      <header className="pt-4">
        <h1 className="text-[32px] font-extrabold flex items-center gap-3 break-keep">
          <CalendarIcon className="text-[#39FF14]" size={32} />
          팝업 캘린더
        </h1>
        <p className="text-[14px] text-white/50 mt-2 break-keep">지금 가장 핫한 팝업스토어를 놓치지 마세요.</p>
      </header>

      <div className="grid grid-cols-1 gap-5">
        {events.map((e) => (
          <div key={e.id} className="relative overflow-hidden bg-white/5 border border-white/10 p-5 rounded-[20px] backdrop-blur-md">
             <div className="absolute top-0 right-0 w-24 h-24 bg-[#39FF14]/10 rounded-full blur-[30px] -mr-8 -mt-8" />
             <span className="text-[10px] font-bold uppercase tracking-wider text-[#39FF14] bg-[#39FF14]/10 px-3 py-1 rounded-full mb-3 inline-block">
               {e.type}
             </span>
             <h3 className="text-[20px] font-bold mb-3">{e.title}</h3>
             
             <div className="flex flex-col gap-2 text-[13px] text-white/60 mb-4">
               <span className="flex items-center gap-2"><Clock size={14} /> {e.date}</span>
               <span className="flex items-center gap-2"><MapPin size={14} /> {e.location}</span>
             </div>

             <button className="w-full bg-white/10 hover:bg-white/20 transition-colors text-white text-[13px] font-medium py-2.5 rounded-xl flex items-center justify-center gap-2">
               자세히 보기 <ExternalLink size={14} />
             </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

import { motion } from 'framer-motion';
import { X, Map, Utensils, Star, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FoodMapModalProps {
  onClose: () => void;
}

const mockRestaurants = [
  { name: '대성갈비 (Daeseong Galbi)', rating: 4.8, type: 'K-BBQ', address: '성동구 서울숲4길 27' },
  { name: '소문난성수감자탕', rating: 4.6, type: 'Pork Bone Stew', address: '성동구 연무장길 45' },
  { name: '난포 (Nanpo)', rating: 4.7, type: 'Fusion Korean', address: '성동구 서울숲4길 18-8' },
  { name: '쵸리상경 (Chori Sanggyeong)', rating: 4.5, type: 'Rice Bowl', address: '성동구 서울숲4길 18-8 2F' },
];

export function FoodMapModal({ onClose }: FoodMapModalProps) {
  const { lang } = useLanguage();
  
  // Basic localization based on language
  const title = lang === 'KO' ? '네이버 필터링 클린 맛집' : 'Naver-Filtered Clean Food Map';
  const desc = lang === 'KO' ? '광고와 가짜 리뷰를 모두 걸러낸 진짜 로컬 맛집 리스트입니다.' : 'Curated local restaurants filtered for fake reviews and ads.';

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

        <div className="p-6 sm:p-10 border-b border-white/10 bg-black/20">
          <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight flex items-center gap-3 mb-2">
            <Map className="text-orange-400/80" />
            {title}
          </h2>
          <p className="text-white/50 text-sm tracking-wide">{desc}</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 bg-[#0a0a0c] flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRestaurants.map((res, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col gap-3 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg text-white font-medium group-hover:text-orange-300 transition-colors">{res.name}</h3>
                  <div className="flex items-center gap-1 text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md text-xs font-bold">
                    <Star size={12} className="fill-orange-400" />
                    {res.rating}
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm text-white/50">
                  <span className="flex items-center gap-2"><Utensils size={14} className="text-white/30" /> {res.type}</span>
                  <span className="flex items-center gap-2"><MapPin size={14} className="text-white/30" /> {res.address}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center text-center gap-3 bg-white/5">
            <Map size={32} className="text-white/20 mb-2" />
            <h4 className="text-white font-medium">Interactive Map Coming Soon</h4>
            <p className="text-white/40 text-sm max-w-md">We are currently integrating the live Google Maps API to let you import these curated routes directly to your phone.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

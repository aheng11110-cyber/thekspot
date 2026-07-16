import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Map, Utensils, Star, MapPin, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FoodMapModalProps {
  onClose: () => void;
}

const mockRestaurants = [
  { 
    id: 'r1',
    name: '대성갈비 (Daeseong Galbi)', 
    rating: 4.8, 
    type: 'K-BBQ', 
    address: '성동구 서울숲4길 27',
    desc: '성수동 갈비골목의 터줏대감. 숯불향 가득한 돼지갈비와 푸짐한 밑반찬이 일품인 곳입니다. (Famous charcoal pork BBQ with generous side dishes.)'
  },
  { 
    id: 'r2',
    name: '소문난성수감자탕', 
    rating: 4.6, 
    type: 'Pork Bone Stew', 
    address: '성동구 연무장길 45',
    desc: '성수동 필수 코스로 꼽히는 감자탕 맛집. 백종원의 3대천왕에 출연했으며 진하고 얼큰한 국물이 특징입니다. (Legendary spicy pork bone stew.)'
  },
  { 
    id: 'r3',
    name: '난포 (Nanpo)', 
    rating: 4.7, 
    type: 'Fusion Korean', 
    address: '성동구 서울숲4길 18-8',
    desc: '할머니가 차려주신 듯한 정갈한 한식을 모던하게 풀어낸 퓨전 한식당. 제철 쌈밥과 새우전이 인기 메뉴입니다. (Modern fusion Korean cuisine.)'
  },
  { 
    id: 'r4',
    name: '쵸리상경 (Chori Sanggyeong)', 
    rating: 4.5, 
    type: 'Rice Bowl', 
    address: '성동구 서울숲4길 18-8 2F',
    desc: '프리미엄 솥밥 전문점. 연어 솥밥, 갈비 솥밥 등 정성 가득한 한 끼를 맛볼 수 있습니다. (Premium Korean hot pot rice bowls.)'
  },
];

export function FoodMapModal({ onClose }: FoodMapModalProps) {
  const { lang } = useLanguage();
  const [selectedRes, setSelectedRes] = useState<any>(null);
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  
  const title = lang === 'KO' ? '로컬 필터링 클린 맛집' : 'Local-Verified Clean Food Map';
  const desc = lang === 'KO' ? '광고와 가짜 리뷰를 모두 걸러낸 진짜 로컬 맛집 리스트입니다.' : 'Curated local restaurants filtered for fake reviews and ads.';

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSaved = new Set(savedItems);
    if (newSaved.has(id)) newSaved.delete(id);
    else newSaved.add(id);
    setSavedItems(newSaved);
  };

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
          <h2 className="text-3xl sm:text-4xl font-title font-extrabold text-white tracking-[-0.08em] flex items-center gap-3 mb-2">
            <Map className="text-orange-400/80" />
            {title}
          </h2>
          <p className="text-white/50 text-sm tracking-wide">{desc}</p>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 bg-[#0a0a0c]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockRestaurants.map((res) => (
              <div 
                key={res.id} 
                onClick={() => setSelectedRes(res)}
                className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col gap-3 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer group"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-lg text-white font-medium group-hover:text-orange-300 transition-colors">{res.name}</h3>
                  <button 
                    onClick={(e) => toggleSave(e, res.id)}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Heart 
                      size={20} 
                      className={`transition-colors ${savedItems.has(res.id) ? 'fill-pink-500 text-pink-500' : 'text-white/30 hover:text-white/70'}`} 
                    />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md text-xs font-bold w-fit mb-1">
                  <Star size={12} className="fill-orange-400" />
                  {res.rating}
                </div>
                <div className="flex flex-col gap-2 text-sm text-white/50">
                  <span className="flex items-center gap-2"><Utensils size={14} className="text-white/30" /> {res.type}</span>
                  <span className="flex items-center gap-2"><MapPin size={14} className="text-white/30" /> {res.address}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Detail Popup */}
      <AnimatePresence>
        {selectedRes && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRes(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedRes(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              <div className="p-6 sm:p-8 pt-10 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl text-white font-medium pr-8">{selectedRes.name}</h3>
                  <button 
                    onClick={(e) => toggleSave(e, selectedRes.id)}
                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors shrink-0"
                  >
                    <Heart 
                      size={22} 
                      className={`transition-colors ${savedItems.has(selectedRes.id) ? 'fill-pink-500 text-pink-500' : 'text-white/50'}`} 
                    />
                  </button>
                </div>
                
                <div className="flex gap-3 text-sm">
                  <div className="flex items-center gap-1 text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md font-bold">
                    <Star size={14} className="fill-orange-400" />
                    {selectedRes.rating}
                  </div>
                  <div className="flex items-center gap-2 text-white/70 bg-white/5 px-2 py-1 rounded-md">
                    <Utensils size={14} /> {selectedRes.type}
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed text-[15px] mt-2">
                  {selectedRes.desc}
                </p>

                <div className="flex items-center gap-2 text-sm text-white/50 mt-2 mb-4">
                  <MapPin size={16} />
                  {selectedRes.address}
                </div>

                {/* Free Google Maps iframe */}
                <div className="w-full h-[250px] bg-white/5 rounded-xl overflow-hidden border border-white/10">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedRes.name + ' ' + selectedRes.address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRes.name + ' ' + selectedRes.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] text-[13px]"
                  >
                    <Star size={16} className="fill-black" />
                    Google Maps
                  </a>
                  
                  <a 
                    href={`https://map.naver.com/p/search/${encodeURIComponent(selectedRes.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#03C75A] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#02b350] transition-colors shadow-[0_0_15px_rgba(3,199,90,0.2)] text-[13px]"
                  >
                    <Star size={16} className="fill-white" />
                    Naver Maps
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

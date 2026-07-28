import { motion, AnimatePresence } from 'framer-motion';
import { Map, Star, Utensils, MapPin, Heart } from 'lucide-react';
import { useState } from 'react';

export const mockRestaurants = [
  { id: 'r1', name: '대성갈비', rating: 4.8, type: 'K-BBQ', address: '성동구 서울숲4길 27', desc: '성수동 갈비골목의 터줏대감. 숯불향 가득한 돼지갈비와 푸짐한 밑반찬이 일품인 곳입니다.' },
  { id: 'r2', name: '소문난성수감자탕', rating: 4.6, type: '돼지등뼈 찌개', address: '성동구 연무장길 45', desc: '성수동 필수 코스로 꼽히는 감자탕 맛집. 백종원의 3대천왕에 출연했으며 진하고 얼큰한 국물이 특징입니다.' },
  { id: 'r3', name: '난포', rating: 4.7, type: '퓨전 한식', address: '성동구 서울숲4길 18-8', desc: '할머니가 차려주신 듯한 정갈한 한식을 모던하게 풀어낸 퓨전 한식당. 제철 쌈밥과 새우전이 인기 메뉴입니다.' },
  { id: 'r4', name: '쵸리상경', rating: 4.5, type: '솥밥 전문점', address: '성동구 서울숲4길 18-8 2F', desc: '프리미엄 솥밥 전문점. 연어 솥밥, 갈비 솥밥 등 정성 가득한 한 끼를 맛볼 수 있습니다.' },
];

interface AppMapTabProps {
  saved: Set<string>;
  toggle: (id: string) => void;
}

export function AppMapTab({ saved, toggle }: AppMapTabProps) {
  const [selectedRes, setSelectedRes] = useState<any>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6 p-6 pb-32"
    >
      <header className="pt-4 flex items-center justify-between">
        <div>
          <h1 className="text-[32px] font-extrabold flex items-center gap-3 break-keep">
            <Map className="text-blue-500" size={32} />
            로컬 맛집 지도
          </h1>
          <p className="text-[14px] text-white/50 mt-2 break-keep">광고 없는 진짜 로컬 맛집만 모았습니다.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {mockRestaurants.map((res) => (
          <div 
            key={res.id} 
            onClick={() => setSelectedRes(res)}
            className="relative overflow-hidden bg-white/5 border border-white/10 p-5 rounded-[20px] backdrop-blur-md cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-[18px] font-bold">{res.name}</h3>
              <button onClick={(e) => { e.stopPropagation(); toggle(res.id); }}>
                <Heart size={20} className={saved.has(res.id) ? 'fill-pink-500 text-pink-500' : 'text-white/30'} />
              </button>
            </div>
            
            <div className="flex gap-2 text-[12px] mb-3">
              <span className="flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md font-bold">
                <Star size={12} className="fill-blue-400" /> {res.rating}
              </span>
              <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md text-white/70">
                <Utensils size={12} /> {res.type}
              </span>
            </div>
            
            <p className="flex items-center gap-1 text-[13px] text-white/40">
              <MapPin size={14} /> {res.address}
            </p>
          </div>
        ))}
      </div>

      {/* Detail Popup */}
      <AnimatePresence>
        {selectedRes && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRes(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full h-[100dvh] sm:h-auto max-w-lg bg-[#0a0a0c] border border-white/20 rounded-none sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedRes(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                ✕
              </button>

              <div className="p-4 pt-14 sm:p-8 sm:pt-10 flex flex-col gap-4 overflow-y-auto pb-safe">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl text-white font-medium pr-8">{selectedRes.name}</h3>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggle(selectedRes.id); }}
                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors shrink-0"
                  >
                    <Heart 
                      size={22} 
                      className={`transition-colors ${saved.has(selectedRes.id) ? 'fill-pink-500 text-pink-500' : 'text-white/50'}`} 
                    />
                  </button>
                </div>
                
                <div className="flex gap-3 text-sm">
                  <div className="flex items-center gap-1 text-blue-400 bg-blue-500/20 px-2 py-1 rounded-md font-bold">
                    <Star size={14} className="fill-blue-400" />
                    {selectedRes.rating}
                  </div>
                  <div className="flex items-center gap-2 text-white/70 bg-white/10 px-2 py-1 rounded-md">
                    <Utensils size={14} /> {selectedRes.type}
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed text-[15px] mt-2 break-keep">
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

                <div className="grid grid-cols-2 gap-2 mt-2 mb-10">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedRes.name + ' ' + selectedRes.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] text-[13px]"
                  >
                    Google 지도
                  </a>
                  
                  <a 
                    href={`https://map.naver.com/p/search/${encodeURIComponent(selectedRes.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#03C75A] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#02b350] transition-colors shadow-[0_0_15px_rgba(3,199,90,0.2)] text-[13px]"
                  >
                    네이버 지도
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

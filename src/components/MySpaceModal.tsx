import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_LOCATIONS } from '../data/mockCurationData';
import { useLanguage } from '../contexts/LanguageContext';
import { X, MapPin, Calendar, Trash2 } from 'lucide-react';

interface SavedItinerary {
  id: number;
  locations: number[];
  date: string;
}

interface MySpaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MySpaceModal({ isOpen, onClose }: MySpaceModalProps) {
  const { lang } = useLanguage();
  const [itineraries, setItineraries] = useState<SavedItinerary[]>([]);

  const loadItineraries = () => {
    const saved = JSON.parse(localStorage.getItem('saved_itineraries') || '[]');
    // 내림차순 정렬 (최신순)
    setItineraries(saved.sort((a: SavedItinerary, b: SavedItinerary) => b.id - a.id));
  };

  useEffect(() => {
    if (isOpen) {
      loadItineraries();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleItinerarySaved = () => {
      if (isOpen) loadItineraries();
    };
    window.addEventListener('itinerarySaved', handleItinerarySaved);
    return () => window.removeEventListener('itinerarySaved', handleItinerarySaved);
  }, [isOpen]);

  const handleDelete = (id: number) => {
    const newItineraries = itineraries.filter(it => it.id !== id);
    setItineraries(newItineraries);
    localStorage.setItem('saved_itineraries', JSON.stringify(newItineraries));
    window.dispatchEvent(new Event('itinerarySaved')); // 뱃지 갱신용
  };

  const getLocData = (id: number) => {
    return MOCK_LOCATIONS[lang].find(l => l.id === id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Right Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
              <h2 className="text-2xl sm:text-3xl font-title font-extrabold tracking-[-0.08em] text-white flex items-center gap-2">
                <i className="bi bi-bookmark-star"></i>
                {lang === 'KO' ? '내 일정' : 
                 lang === 'JP' ? 'マイトリップ' :
                 lang === 'CN' ? '我的行程' : 
                 lang === 'VN' ? 'Lịch trình của tôi' : 'My Itinerary'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {itineraries.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-white/40">
                  <i className="bi bi-inbox text-4xl mb-4 opacity-50"></i>
                  <p>{lang === 'KO' ? '아직 저장된 일정이 없습니다.' : 'No saved itineraries yet.'}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {itineraries.map((itinerary) => (
                    <div key={itinerary.id} className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 relative group">
                      
                      <button 
                        onClick={() => handleDelete(itinerary.id)}
                        className="absolute top-4 right-4 p-2 text-white/30 hover:text-red-400 bg-white/5 hover:bg-white/10 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title={lang === 'KO' ? '삭제' : 'Delete'}
                      >
                        <Trash2 size={16} />
                      </button>

                      <div className="text-white/40 text-xs mb-4 flex items-center gap-1.5">
                        <Calendar size={12} />
                        {new Date(itinerary.date).toLocaleDateString(lang === 'KO' ? 'ko-KR' : 'en-US')}
                      </div>

                      <div className="flex flex-col gap-3">
                        {itinerary.locations.map((locId, idx) => {
                          const loc = getLocData(locId);
                          if (!loc) return null;
                          return (
                            <div key={locId} className="flex gap-3 items-center">
                              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white/60 shrink-0">
                                {idx + 1}
                              </div>
                              <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden shrink-0 relative">
                                <img src={loc.imageUrl} alt={loc.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white text-sm font-medium truncate">{loc.name}</h4>
                                <div className="text-white/40 text-[11px] flex items-center gap-1 mt-0.5">
                                  <MapPin size={10} />
                                  <span className="truncate">{loc.city}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

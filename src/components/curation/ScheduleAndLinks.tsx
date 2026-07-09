import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationData } from '../../data/mockCurationData';
import { Calendar, Instagram, Link2, MapPin, X, ExternalLink } from 'lucide-react';

interface ScheduleAndLinksProps {
  locations: LocationData[];
  onExclude?: (id: number) => void;
}

export function ScheduleAndLinks({ locations, onExclude }: ScheduleAndLinksProps) {
  const [selectedInstaUrl, setSelectedInstaUrl] = useState<string | null>(null);

  if (locations.length === 0) {
    return (
      <div className="text-white/40 text-sm mt-8 text-center p-8 border border-white/5 rounded-2xl bg-white/[0.02]">
        해당 조건에 맞는 장소가 없습니다. 다른 필터를 선택해 보세요.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
      {locations.map((loc, i) => (
        <motion.div
          key={loc.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
        >
          {/* 이미지 */}
          <div className="w-full sm:w-32 h-32 shrink-0 rounded-lg overflow-hidden bg-black/50 relative">
            <img src={loc.imageUrl} alt={loc.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 backdrop-blur-md rounded text-[10px] text-white uppercase tracking-wider">
              {loc.type}
            </div>
          </div>

          {/* 정보 */}
          <div className="flex flex-col flex-1 justify-center relative">
            {/* Exclude Button */}
            {onExclude && (
              <button
                onClick={() => onExclude(loc.id)}
                className="absolute -top-2 -right-2 p-1.5 bg-black/50 hover:bg-red-500/80 text-white/50 hover:text-white rounded-full transition-colors backdrop-blur-md"
                title="제외하기"
              >
                <X size={14} />
              </button>
            )}

            <div className="flex items-center gap-2 mb-1 pr-6">
              <h3 className="text-white font-medium text-lg">{loc.name}</h3>
            </div>
            
            <div className="flex items-center gap-1.5 text-white/40 text-xs mb-3">
              <MapPin size={12} />
              <span>{loc.province} {loc.city}</span>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
              {loc.description}
            </p>

            {/* 일정 (팝업, 콘서트 등) */}
            {loc.schedule && (
              <div className="flex items-center gap-2 mb-4 text-xs text-white/80 bg-white/5 px-3 py-2 rounded-md w-fit">
                <Calendar size={14} className="text-white/50" />
                <span>{loc.schedule.startDate} ~ {loc.schedule.endDate}</span>
                {loc.schedule.time && <span className="ml-2 pl-2 border-l border-white/20">{loc.schedule.time}</span>}
              </div>
            )}

            {/* 링크 버튼들 */}
            {loc.links && (
              <div className="flex items-center gap-3 mt-auto">
                {loc.links.instagram && (
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedInstaUrl(loc.links!.instagram!);
                    }}
                    className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full"
                  >
                    <Instagram size={14} />
                    Instagram
                  </button>
                )}
                {loc.links.blog && (
                  <a href={loc.links.blog} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full">
                    <Link2 size={14} />
                    Blog Review
                  </a>
                )}
              </div>
            )}
            
            {/* 해시태그 */}
            <div className="flex flex-wrap gap-2 mt-3">
              {loc.tags.map(tag => (
                <span key={tag} className="text-[10px] text-white/30 tracking-wide uppercase">#{tag}</span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}

      {/* Instagram Modal */}
      <AnimatePresence>
        {selectedInstaUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedInstaUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-black border border-white/20 rounded-2xl overflow-hidden flex flex-col"
              style={{ height: '80vh' }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-white/80">
                  <Instagram size={16} />
                  <span className="text-sm font-medium">Instagram View</span>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={selectedInstaUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-1.5 text-white/50 hover:text-white transition-colors"
                    title="새 창으로 열기"
                  >
                    <ExternalLink size={16} />
                  </a>
                  <button 
                    onClick={() => setSelectedInstaUrl(null)}
                    className="p-1.5 text-white/50 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 w-full bg-white relative">
                {/* 인스타그램 임베드는 URL 끝에 /embed 를 붙여야 동작합니다 */}
                <iframe 
                  src={selectedInstaUrl.endsWith('/') ? selectedInstaUrl + 'embed' : selectedInstaUrl + '/embed'} 
                  className="w-full h-full border-none"
                  allowTransparency={true}
                  allow="encrypted-media"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

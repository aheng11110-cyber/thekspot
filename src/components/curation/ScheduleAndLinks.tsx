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
  const [showAllModal, setShowAllModal] = useState(false);

  if (locations.length === 0) {
    return (
      <div className="text-white/40 text-sm mt-8 text-center p-8 border border-white/5 rounded-2xl bg-white/[0.02]">
        해당 조건에 맞는 장소가 없습니다. 다른 필터를 선택해 보세요.
      </div>
    );
  }

  const renderCard = (loc: LocationData, index: number, isModal: boolean = false) => (
    <motion.div
      key={loc.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
    >

      {/* 정보 */}
      <div className="flex flex-col flex-1 justify-center relative">
        {/* Exclude Button */}
        {onExclude && !isModal && (
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
          {loc.tags.map((tag, j) => (
            <span key={j} className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-white/50 border border-white/5">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const displayLocations = locations.slice(0, 2);
  const hasMore = locations.length > 2;

  return (
    <>
      <div className="flex flex-col gap-6 w-full pr-2">
        {displayLocations.map((loc, i) => renderCard(loc, i))}
        
        {hasMore && (
          <button
            onClick={() => setShowAllModal(true)}
            className="w-full py-4 mt-2 border border-white/20 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all"
          >
            + {locations.length - 2}개의 장소 더 보기 (팝업으로 열기)
          </button>
        )}
      </div>

      {/* 모두 보기 팝업 모달 */}
      <AnimatePresence>
        {showAllModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative"
            >
              {/* 모달 헤더 */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50 sticky top-0 z-10">
                <h2 className="text-white text-xl font-light">모든 추천 장소 ({locations.length})</h2>
                <button
                  onClick={() => setShowAllModal(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 모달 내용 (스크롤 영역) */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
                {locations.map((loc, i) => renderCard(loc, i, true))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 인스타그램 임베드 모달 */}
      <AnimatePresence>
        {selectedInstaUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedInstaUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-black border border-white/10 rounded-2xl overflow-hidden relative w-full max-w-[400px] shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* 모달 헤더 */}
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none">
                <span className="text-white/80 text-sm font-medium px-3 py-1 bg-black/50 rounded-full backdrop-blur-md border border-white/10">Instagram</span>
                <button
                  onClick={() => setSelectedInstaUrl(null)}
                  className="p-2 bg-black/50 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md pointer-events-auto"
                >
                  <X size={20} />
                </button>
              </div>

              {/* 인스타그램 임베드 iframe 영역 */}
              <div className="w-full bg-black flex items-center justify-center min-h-[500px] pt-12">
                <iframe
                  src={selectedInstaUrl.endsWith('/') ? selectedInstaUrl + 'embed' : selectedInstaUrl + '/embed'}
                  className="w-full"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  allow="encrypted-media"
                ></iframe>
              </div>

              {/* 하단 외부 링크 버튼 */}
              <div className="p-4 border-t border-white/10 bg-black/50">
                <a 
                  href={selectedInstaUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors"
                >
                  인스타그램 앱에서 보기 <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

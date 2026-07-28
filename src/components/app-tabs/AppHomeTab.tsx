import { motion } from 'framer-motion';
import { ConnectAILabLogo } from '../../components/ConnectAILabLogo';
import { BRAND_NAME, SITE_CONTENT } from '../../config/content';
import { useLanguage } from '../../contexts/LanguageContext';
import { ChevronRight, Sparkles, MapPin, Zap, Heart, X, Navigation } from 'lucide-react';
import type { AppTab } from '../AppBottomNav';
import { mockRestaurants } from './AppMapTab';
import { smartCourses } from '../../data/mockAppCurationData';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

interface AppHomeTabProps {
  onNavigate: (tab: AppTab) => void;
  saved: Set<string>;
  toggleSaved: (id: string) => void;
}

export function AppHomeTab({ onNavigate, saved, toggleSaved }: AppHomeTabProps) {
  const { lang, setLang } = useLanguage();
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showAllCurations, setShowAllCurations] = useState(false);
  const [selectedCuration, setSelectedCuration] = useState<any>(null);
  const content = SITE_CONTENT['ko'];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-8 pb-32"
    >
      {/* ── App Header ── */}
      <header className="flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#39FF14] to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.3)]">
            <ConnectAILabLogo size={16} className="text-black" />
          </div>
          <span className="font-title font-extrabold tracking-tight text-[18px] text-white">
            {BRAND_NAME}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowSavedModal(true)}
            className="flex items-center justify-center w-[30px] h-[30px] rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/10 transition-colors relative"
          >
            <Heart size={14} className={saved.size > 0 ? "fill-pink-500 text-pink-500" : ""} />
            {saved.size > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {saved.size}
              </span>
            )}
          </button>
          <button 
            onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
            className="text-[11px] font-bold tracking-widest border border-white/20 bg-white/5 px-4 py-1.5 rounded-full text-white hover:bg-white/10 transition-colors"
          >
            {lang === 'ko' ? 'ENG' : 'KOR'}
          </button>
        </div>
      </header>

      {/* ── Hero / Greeting ── */}
      <section className="px-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <h1 className="text-[32px] sm:text-[40px] font-extrabold leading-[1.2] tracking-[-0.04em] mb-3 break-keep">
            서울의 숨겨진 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-cyan-400">
              매력을 발견하세요
            </span>
          </h1>
          <p className="text-[15px] text-white/50 leading-relaxed max-w-[280px] break-keep">
            한국의 진정한 로컬 문화를 체험할 수 있는 가장 확실한 가이드
          </p>
        </motion.div>
      </section>

      {/* ── Quick Actions (Glassmorphism Cards) ── */}
      <section className="px-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-[#39FF14]" />
          <h2 className="text-[13px] text-white/60 uppercase tracking-[0.1em] font-bold">오늘의 추천</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onNavigate('map')}
            className="relative overflow-hidden rounded-[24px] bg-white/[0.03] border border-white/10 aspect-square p-4 sm:p-5 text-left flex flex-col justify-between group active:scale-95 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-blue-500/30 transition-colors" />
            <MapPin size={24} className="text-blue-400 mb-2 relative z-10" />
            <div className="relative z-10">
              <h3 className="text-[16px] sm:text-[18px] font-bold leading-tight mb-1">로컬<br/>찐맛집</h3>
              <p className="text-[11px] sm:text-[12px] text-white/40">숨겨진 명소</p>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('calendar')}
            className="relative overflow-hidden rounded-[24px] bg-white/[0.03] border border-white/10 aspect-square p-4 sm:p-5 text-left flex flex-col justify-between group active:scale-95 transition-all"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#39FF14]/20 rounded-full blur-[40px] -ml-10 -mt-10 group-hover:bg-[#39FF14]/30 transition-colors" />
            <Zap size={24} className="text-[#39FF14] mb-2 relative z-10" />
            <div className="relative z-10">
              <h3 className="text-[16px] sm:text-[18px] font-bold leading-tight mb-1">최신<br/>팝업스토어</h3>
              <p className="text-[11px] sm:text-[12px] text-white/40">요즘 뜨는 곳</p>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('trend')}
            className="relative overflow-hidden rounded-[24px] bg-white/[0.03] border border-white/10 aspect-square p-4 sm:p-5 text-left flex flex-col justify-between group active:scale-95 transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px] -mr-10 -mt-10 group-hover:bg-purple-500/30 transition-colors" />
            <Sparkles size={24} className="text-purple-400 mb-2 relative z-10" />
            <div className="relative z-10">
              <h3 className="text-[16px] sm:text-[18px] font-bold leading-tight mb-1">해시태그<br/>트렌드</h3>
              <p className="text-[11px] sm:text-[12px] text-white/40">실시간 인기</p>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('slang')}
            className="relative overflow-hidden rounded-[24px] bg-white/[0.03] border border-white/10 aspect-square p-4 sm:p-5 text-left flex flex-col justify-between group active:scale-95 transition-all"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full blur-[40px] -ml-10 -mt-10 group-hover:bg-pink-500/30 transition-colors" />
            <Zap size={24} className="text-pink-400 mb-2 relative z-10" />
            <div className="relative z-10">
              <h3 className="text-[16px] sm:text-[18px] font-bold leading-tight mb-1">K-슬랭<br/>사전</h3>
              <p className="text-[11px] sm:text-[12px] text-white/40">필수 현지어</p>
            </div>
          </button>
        </div>
      </section>

      {/* ── Horizontal Scroll Feed ── */}
      <section className="pl-6">
        <div className="flex items-center justify-between pr-6 mb-4">
          <h2 className="text-[20px] font-bold">스페셜 큐레이션</h2>
          <button 
            onClick={() => setShowAllCurations(true)}
            className="text-[13px] text-white/40 hover:text-white flex items-center gap-1"
          >
            전체보기 <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 pr-6 snap-x snap-mandatory hide-scrollbar">
          {smartCourses.slice(0, 3).map((curation) => (
            <div 
              key={curation.id}
              onClick={() => setSelectedCuration(curation)}
              className="snap-center shrink-0 w-[260px] h-[320px] rounded-[24px] overflow-hidden relative cursor-pointer group"
            >
              <img src={curation.image} alt={curation.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 inline-block">
                  {curation.tag}
                </span>
                <h3 className="text-[18px] font-bold leading-snug mb-1 break-keep pr-4">{curation.title}</h3>
                <p className="text-[13px] text-white/60">{curation.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats / Mini Banner ── */}
      <section className="px-6 mb-8">
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-white/10 rounded-[24px] p-6 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
           <h3 className="text-[24px] font-extrabold mb-1">Pro 버전 잠금해제</h3>
           <p className="text-[14px] text-white/60 mb-4 break-keep">모든 핫플레이스와 독점 콘텐츠를 제한 없이 이용하세요.</p>
           <button className="bg-white text-black font-bold text-[14px] px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]">
             지금 업그레이드
           </button>
        </div>
      </section>

      {/* ── Saved Items Modal ── */}
      <AnimatePresence>
        {showSavedModal && (
          <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowSavedModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg h-[80dvh] sm:h-[600px] bg-[#0a0a0c] sm:border border-white/10 sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
                <h3 className="text-[20px] font-bold flex items-center gap-2">
                  <Heart size={20} className="fill-pink-500 text-pink-500" />
                  내가 찜한 로컬 ({saved.size})
                </h3>
                <button 
                  onClick={() => setShowSavedModal(false)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-safe">
                {saved.size === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-white/40">
                    <Heart size={48} className="text-white/10 mb-4" />
                    <p className="text-[14px]">아직 찜한 장소가 없습니다.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {mockRestaurants.filter(res => saved.has(res.id)).map(res => (
                      <div key={res.id} className="bg-white/5 border border-white/10 rounded-[16px] p-4 flex justify-between items-center group">
                        <div className="flex-1 min-w-0 pr-4">
                          <h4 className="text-[16px] font-bold truncate mb-1">{res.name}</h4>
                          <div className="flex gap-2 text-[12px] text-white/50 mb-1">
                            <span className="text-blue-400">★ {res.rating}</span>
                            <span>{res.type}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-white/40 truncate">
                            <MapPin size={12} className="shrink-0" />
                            <span className="truncate">{res.address}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => toggleSaved(res.id)}
                          className="p-2.5 bg-black/40 rounded-full hover:bg-white/10 transition-colors shrink-0"
                        >
                          <Heart size={16} className="fill-pink-500 text-pink-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── All Curations Modal ── */}
      <AnimatePresence>
        {showAllCurations && (
          <div className="fixed inset-0 z-[2000] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowAllCurations(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-[85dvh] max-w-lg bg-[#0a0a0c] border border-white/10 rounded-t-[32px] overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                <h3 className="text-[20px] font-bold">스페셜 큐레이션 전체보기</h3>
                <button 
                  onClick={() => setShowAllCurations(false)}
                  className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar pb-safe">
                <div className="flex flex-col gap-6">
                  {smartCourses.map(curation => (
                    <div 
                      key={curation.id} 
                      onClick={() => {
                        setShowAllCurations(false);
                        setSelectedCuration(curation);
                      }}
                      className="rounded-[24px] overflow-hidden relative cursor-pointer group h-[200px]"
                    >
                      <img src={curation.image} alt={curation.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-5 w-full">
                        <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 inline-block">
                          {curation.tag}
                        </span>
                        <h3 className="text-[18px] font-bold leading-snug mb-1">{curation.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Smart Course (Curation Detail) Modal ── */}
      <AnimatePresence>
        {selectedCuration && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-0 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCuration(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[85vh] max-w-lg bg-[#0a0a0c] sm:border border-white/20 sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="relative h-[250px] shrink-0">
                <img src={selectedCuration.image} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/50 to-transparent" />
                <button 
                  onClick={() => setSelectedCuration(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-6 pr-6">
                  <span className="bg-[#39FF14]/20 backdrop-blur-md text-[#39FF14] text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3 inline-block">
                    SMART COURSE
                  </span>
                  <h2 className="text-[24px] font-bold leading-tight break-keep">{selectedCuration.title}</h2>
                  <p className="text-white/60 text-[14px] mt-1 break-keep">{selectedCuration.desc}</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-8 pb-safe bg-[#0a0a0c]">
                <h3 className="text-[16px] font-bold mb-6 text-white flex items-center gap-2">
                  <Navigation size={18} className="text-blue-400" />
                  코스 타임라인
                </h3>
                
                <div className="relative pl-6">
                  {/* Vertical Timeline Line */}
                  <div className="absolute left-1.5 top-2 bottom-6 w-[2px] bg-white/10" />
                  
                  {selectedCuration.places.map((place: any, index: number) => (
                    <div key={place.id} className="relative mb-8 last:mb-0">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[30px] top-1 w-4 h-4 rounded-full bg-black border-2 border-blue-400 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      </div>
                      
                      <div className="bg-white/5 border border-white/10 p-5 rounded-[20px] relative">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-[18px] font-bold text-white">{place.name}</h4>
                          <button onClick={() => toggleSaved(place.id)}>
                            <Heart size={18} className={saved.has(place.id) ? 'fill-pink-500 text-pink-500' : 'text-white/30'} />
                          </button>
                        </div>
                        <div className="flex gap-2 text-[12px] mb-3">
                          <span className="text-blue-400 font-bold">★ {place.rating}</span>
                          <span className="text-white/60">• {place.type}</span>
                        </div>
                        <p className="text-[14px] text-white/60 mb-3 break-keep leading-relaxed">{place.desc}</p>
                        <div className="flex items-center gap-1 text-[13px] text-white/40">
                          <MapPin size={14} /> {place.address}
                        </div>
                      </div>

                      {/* Transit Time Badge (if not last) */}
                      {place.transitToNext && (
                        <div className="absolute -left-[32px] -bottom-6 bg-[#1a1a1c] border border-white/10 px-2 py-1 rounded-full text-[10px] text-white/50 flex items-center gap-1 z-10 font-bold whitespace-nowrap shadow-xl">
                          <div className="w-1 h-1 rounded-full bg-white/30" />
                          {place.transitToNext}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

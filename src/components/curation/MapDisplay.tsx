import { useState, useRef, useEffect } from 'react';
import { LocationData } from '../../data/mockCurationData';
import { MapPin, MousePointerClick } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SITE_CONTENT } from '../../config/content';

interface MapDisplayProps {
  locations: LocationData[];
}

export function MapDisplay({ locations }: MapDisplayProps) {
  const [isActive, setIsActive] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const text = SITE_CONTENT[lang].curation;

  const getGoogleMapsLang = (l: string) => {
    switch (l) {
      case 'KO': return 'ko';
      case 'JP': return 'ja';
      case 'CN': return 'zh-CN';
      // 베트남어(vi)의 경우 구글 무료 임베드에서 연결을 거부(리다이렉션 차단)하는 
      // 구글 자체 버그가 있어 안전하게 영어(en)로 폴백합니다.
      default: return 'en';
    }
  };

  // 지도가 활성화되었을 때(클릭됨) 마우스 휠을 돌려도 
  // 페이지 전체가 아래로 스냅되어 넘어가는 현상을 완전히 방지합니다.
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // 스크롤바 사라짐으로 인한 화면 떨림 방지
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isActive]);

  if (locations.length === 0) {
    return (
      <div className="relative w-full aspect-square md:aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-2xl flex flex-col items-center justify-center">
        <MapPin size={48} className="text-white/20 mb-4" />
        <p className="text-white/40 text-sm">{text.noLocations}</p>
      </div>
    );
  }

  const mainLoc = locations[0];
  // 구글 맵에서 정확한 핀을 표시하기 위해 검색어를 더 구체적으로 변경 (이름, 도시, 한국)
  const query = encodeURIComponent(`${mainLoc.name}, ${mainLoc.city}, South Korea`);

  return (
    <div 
      ref={mapRef}
      onMouseLeave={() => setIsActive(false)}
      className="relative w-full aspect-square md:aspect-[4/3] bg-black border border-white/10 rounded-2xl overflow-hidden group"
    >
      
      {/* 
        구글 맵 iframe
        isActive 상태가 아닐 때는 iframe의 마우스 이벤트를 비활성화하여
        사용자가 휠을 돌릴 때 페이지 전체 스크롤(스냅)이 정상적으로 작동하게 합니다.
      */}
      <iframe
        width="100%"
        height="100%"
        style={{ 
          border: 0, 
          filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(85%)',
          pointerEvents: isActive ? 'auto' : 'none'
        }}
        src={`https://maps.google.com/maps?q=${query}&t=m&z=15&output=embed&hl=${getGoogleMapsLang(lang)}`}
        title={`Map of ${mainLoc.name}`}
      />

      {/* 클릭해서 활성화하는 오버레이 버튼 */}
      {!isActive && (
        <div 
          onClick={() => setIsActive(true)}
          className="absolute top-4 right-4 z-20 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2 shadow-2xl transform hover:scale-105 transition-transform cursor-pointer"
        >
          <MousePointerClick size={16} className="text-white" />
          <span className="text-white font-medium text-xs">{text.mapInteract}</span>
        </div>
      )}

      {/* 장소 이름 오버레이 */}
      <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl flex items-center gap-2 pointer-events-none">
        <MapPin size={14} className="text-white" />
        <p className="text-white text-sm font-medium">{mainLoc.name}</p>
      </div>

      {locations.length > 1 && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 shadow-xl pointer-events-none">
          <p className="text-white/70 text-xs mb-1">{text.otherLocations}</p>
          <div className="flex gap-2 overflow-x-hidden pb-1">
            {locations.slice(1).map(loc => (
              <span key={loc.id} className="whitespace-nowrap px-2 py-1 bg-white/10 rounded text-[10px] text-white">
                {loc.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

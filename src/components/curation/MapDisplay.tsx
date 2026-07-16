import { useState, useRef, useEffect } from 'react';
import { LocationData } from '../../data/mockCurationData';
import { MapPin, MousePointerClick } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { SITE_CONTENT } from '../../config/content';
import { RandomHoverWrapper } from '../RandomHoverWrapper';

interface MapDisplayProps {
  locations: LocationData[];
}

export function MapDisplay({ locations }: MapDisplayProps) {
  const [selectedLocId, setSelectedLocId] = useState<string | null>(null);
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



  // Reset selected location when the locations prop changes (filters changed)
  useEffect(() => {
    setSelectedLocId(null);
  }, [locations]);

  if (locations.length === 0) {
    return (
      <div className="relative w-full aspect-square md:aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-2xl flex flex-col items-center justify-center">
        <MapPin size={48} className="text-white/20 mb-4" />
        <p className="text-white/40 text-sm">{text.noLocations}</p>
      </div>
    );
  }

  const mainLoc = selectedLocId 
    ? locations.find(l => l.id === selectedLocId) || locations[0]
    : locations[0];
  
  const otherLocations = locations.filter(l => l.id !== mainLoc.id);

  // 구글 맵에서 정확한 핀을 표시하기 위해 검색어를 더 구체적으로 변경 (이름, 도시, 한국)
  const query = encodeURIComponent(`${mainLoc.name}, ${mainLoc.city}, South Korea`);

  return (
    <div 
      ref={mapRef}
      className="relative w-full aspect-square md:aspect-[4/3] bg-black border border-white/10 rounded-2xl overflow-hidden group pointer-events-auto"
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
          pointerEvents: 'auto'
        }}
        src={`https://maps.google.com/maps?q=${query}&t=m&z=15&output=embed&hl=${getGoogleMapsLang(lang)}`}
        title={`Map of ${mainLoc.name}`}
      />

      {otherLocations.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 shadow-xl pointer-events-auto">
          <p className="text-white/70 text-xs mb-2">{text.otherLocations}</p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {otherLocations.map(loc => (
              <button
                key={loc.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLocId(loc.id);
                }}
                className="whitespace-nowrap px-3 py-1.5 bg-white/10 border border-white/20 rounded-md text-[12px] text-white hover:bg-white/20 transition-colors flex-shrink-0 cursor-pointer pointer-events-auto"
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

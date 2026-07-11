import { useRef, useEffect } from 'react';
import { LocationData } from '../../data/mockCurationData';
import { MapPin } from 'lucide-react';

interface MapDisplayProps {
  locations: LocationData[];
}

export function MapDisplay({ locations }: MapDisplayProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Prevent page scroll when hovering over the map
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // This stops the page from scrolling/snapping when the user 
      // scrolls the mouse wheel over the map without holding Ctrl.
      e.preventDefault();
    };

    // Must be { passive: false } to use e.preventDefault()
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  if (locations.length === 0) {
    return (
      <div className="relative w-full aspect-square md:aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-2xl flex flex-col items-center justify-center">
        <MapPin size={48} className="text-white/20 mb-4" />
        <p className="text-white/40 text-sm">No locations to display</p>
      </div>
    );
  }

  // 지도를 보여줄 메인 장소 (첫 번째 장소 기준)
  const mainLoc = locations[0];
  // 구글 맵 검색 쿼리 (정확한 핀을 위해 주소 중심으로 검색)
  const query = encodeURIComponent(`${mainLoc.name} ${mainLoc.province}`);

  return (
    <div 
      ref={mapRef}
      className="relative w-full aspect-square md:aspect-[4/3] bg-black border border-white/10 rounded-2xl overflow-hidden group"
    >
      
      {/* 
        구글 맵 iframe (무료 버전) 
        CSS filter를 사용하여 다크모드 스타일로 반전시킴 
      */}
      <iframe
        width="100%"
        height="100%"
        style={{ 
          border: 0, 
          filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(85%)' 
        }}
        src={`https://maps.google.com/maps?q=${query}&t=m&z=15&output=embed`}
        title={`Map of ${mainLoc.name}`}
      />

      {/* 장소 이름 오버레이 */}
      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-xl flex items-center gap-2">
        <MapPin size={14} className="text-white" />
        <p className="text-white text-sm font-medium">{mainLoc.name}</p>
      </div>

      {locations.length > 1 && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 shadow-xl">
          <p className="text-white/70 text-xs mb-1">Other locations in your filter:</p>
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
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

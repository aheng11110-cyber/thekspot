import { motion } from 'framer-motion';
import { LocationData } from '../../data/mockCurationData';
import { MapPin } from 'lucide-react';

interface MapDisplayProps {
  locations: LocationData[];
}

export function MapDisplay({ locations }: MapDisplayProps) {
  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
      {/* 추상적인 그래픽 배경 지도 (그리드 레이더 컨셉) */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-3/4 h-3/4 rounded-full border border-white/50" />
        <div className="absolute w-1/2 h-1/2 rounded-full border border-white/30" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2 mb-8 pointer-events-none opacity-40">
        <MapPin size={48} className="text-white" />
        <p className="text-white text-sm font-medium tracking-widest uppercase">Interactive Map</p>
        <p className="text-white/50 text-xs">Stylized graphic map view</p>
      </div>

      {/* 마커 표시 (임의의 위치에 뿌려줌) */}
      {locations.map((loc, i) => {
        // lat, lng 대신 시각적 테스트를 위한 임의 좌표 (0~100%)
        // 실제 연동 시 lat/lng을 화면 픽셀로 변환하는 공식 필요 (카카오맵 사용 시 자동)
        const top = 20 + (i * 15) % 60;
        const left = 20 + (i * 25) % 60;

        return (
          <motion.div
            key={loc.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: 'spring' }}
            className="absolute flex flex-col items-center gap-1 cursor-pointer group"
            style={{ top: `${top}%`, left: `${left}%` }}
          >
            <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:scale-150 transition-transform" />
            <div className="px-2 py-1 bg-black/80 border border-white/20 rounded text-white text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {loc.name}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

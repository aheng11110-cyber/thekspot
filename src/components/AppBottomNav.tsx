import { motion } from 'framer-motion';
import { Home, Map as MapIcon, Calendar, Hash, MessageCircle } from 'lucide-react';

export type AppTab = 'home' | 'map' | 'calendar' | 'trend' | 'slang';

interface AppBottomNavProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

export function AppBottomNav({ activeTab, setActiveTab }: AppBottomNavProps) {
  const navItems: { id: AppTab; label: string; icon: any }[] = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'map', label: '로컬맵', icon: MapIcon },
    { id: 'calendar', label: '팝업', icon: Calendar },
    { id: 'trend', label: '트렌드', icon: Hash },
    { id: 'slang', label: '슬랭', icon: MessageCircle },
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0c]/90 backdrop-blur-xl border-t border-white/5 pb-safe"
    >
      <div className="flex justify-around items-center h-[72px] px-2 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center w-full h-full relative transition-all duration-300 ease-out active:scale-95 ${isActive ? 'text-[#39FF14]' : 'text-white/40 hover:text-white/70'}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="bottomNavIndicator"
                  className="absolute -top-[1px] w-12 h-[2px] bg-[#39FF14] shadow-[0_0_10px_#39FF14]"
                />
              )}
              <Icon size={24} className={`mb-1 transition-transform duration-300 ${isActive ? '-translate-y-1' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-semibold tracking-wide transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 absolute'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}

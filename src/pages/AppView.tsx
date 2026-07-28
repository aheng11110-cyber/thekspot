import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AppBottomNav, type AppTab } from '../components/AppBottomNav';
import { AppHomeTab } from '../components/app-tabs/AppHomeTab';
import { AppMapTab } from '../components/app-tabs/AppMapTab';
import { AppCalendarTab } from '../components/app-tabs/AppCalendarTab';
import { AppTrendTab } from '../components/app-tabs/AppTrendTab';
import { AppSlangTab } from '../components/app-tabs/AppSlangTab';

export function AppView() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [savedPlaces, setSavedPlaces] = useState<Set<string>>(new Set());

  const toggleSaved = (id: string) => {
    const next = new Set(savedPlaces);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSavedPlaces(next);
  };

  return (
    <div className="bg-[#050505] min-h-[100dvh] text-white font-sans selection:bg-[#39FF14]/30 relative overflow-hidden">
      
      {/* Dynamic Background Element */}
      <div className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none z-0" />
      
      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <AppHomeTab key="home" onNavigate={setActiveTab} saved={savedPlaces} toggleSaved={toggleSaved} />}
          {activeTab === 'map' && <AppMapTab key="map" saved={savedPlaces} toggle={toggleSaved} />}
          {activeTab === 'calendar' && <AppCalendarTab key="calendar" />}
          {activeTab === 'trend' && <AppTrendTab key="trend" />}
          {activeTab === 'slang' && <AppSlangTab key="slang" />}
        </AnimatePresence>
      </main>

      <AppBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, MapPin, Calendar as CalendarIcon, Info } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

interface Popup {
  id: string;
  title: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  description: string;
}

interface PopupCalendarProps {
  onClose: () => void;
}

export function PopupCalendar({ onClose }: PopupCalendarProps) {
  const { user } = useAuth();
  
  // Data State
  const [popups, setPopups] = useState<Popup[]>([]);
  const [savedPopupIds, setSavedPopupIds] = useState<Set<string>>(new Set());
  
  // UI State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPopup, setSelectedPopup] = useState<Popup | null>(null);
  const [filterSaved, setFilterSaved] = useState(false);

  // Fetch Popups
  useEffect(() => {
    const q = query(collection(db, 'popups'), orderBy('startDate', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Popup[];
      
      // Add mock data if database is empty so the user can test the UI
      if (items.length === 0) {
        const today = new Date();
        const y = today.getFullYear();
        const m = String(today.getMonth() + 1).padStart(2, '0');
        
        items.push(
          { id: 'mock1', title: '탬버린즈 성수 팝업', location: '성동구 연무장5길 8', startDate: `${y}-${m}-01`, endDate: `${y}-${m}-31`, description: '새로운 향수 컬렉션 런칭 기념 팝업스토어. 한정판 샘플 증정.' },
          { id: 'mock2', title: '아더에러 스페이스', location: '성동구 성수이로 82', startDate: `${y}-${m}-01`, endDate: `${y}-${m}-31`, description: '시즌 오프 특별 전시 및 팝업. 의류 및 굿즈 판매.' }
        );
      }
      
      setPopups(items);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Saved Popups
  useEffect(() => {
    if (!user) {
      setSavedPopupIds(new Set());
      return;
    }
    const fetchSaved = async () => {
      const q = query(collection(db, 'users', user.uid, 'saved_popups'));
      const snapshot = await getDocs(q);
      const ids = new Set<string>();
      snapshot.forEach(doc => ids.add(doc.id));
      setSavedPopupIds(ids);
    };
    fetchSaved();
  }, [user]);

  // Toggle Save
  const handleToggleSave = async (popupId: string) => {
    if (!user) return alert("Please log in to save popup stores!");
    
    const savedRef = doc(db, 'users', user.uid, 'saved_popups', popupId);
    
    if (savedPopupIds.has(popupId)) {
      await deleteDoc(savedRef);
      setSavedPopupIds(prev => {
        const next = new Set(prev);
        next.delete(popupId);
        return next;
      });
    } else {
      await setDoc(savedRef, { savedAt: new Date() });
      setSavedPopupIds(prev => {
        const next = new Set(prev);
        next.add(popupId);
        return next;
      });
    }
  };

  // Calendar Math
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-11
  
  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: firstDay }, (_, i) => i);

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Date formatted as YYYY-MM-DD
  const formatDate = (y: number, m: number, d: number) => {
    return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  };

  // Filtered popups
  const visiblePopups = filterSaved ? popups.filter(p => savedPopupIds.has(p.id)) : popups;

  // Check if a date has popups
  const getPopupsForDate = (dateStr: string) => {
    return visiblePopups.filter(p => p.startDate <= dateStr && p.endDate >= dateStr);
  };

  // Selected Popups to display in details
  const displayPopups = selectedPopup 
    ? [selectedPopup] 
    : (selectedDate ? getPopupsForDate(selectedDate) : []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 sm:p-8">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-6xl h-[100dvh] sm:h-[85vh] bg-[#0a0a0c] border border-white/10 rounded-none sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors backdrop-blur-md"
        >
          <X size={20} />
        </button>

        {/* ────────── LEFT: CALENDAR ────────── */}
        <div className="w-full md:w-[60%] lg:w-[65%] border-b md:border-b-0 md:border-r border-white/10 p-4 pt-14 sm:p-10 flex flex-col bg-black/20">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl sm:text-4xl font-title font-extrabold text-white tracking-[-0.08em] flex items-center gap-3">
              <CalendarIcon className="text-white/40" />
              Popup Stores
            </h2>
            
            <button 
              onClick={() => setFilterSaved(!filterSaved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition-colors ${filterSaved ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white'}`}
            >
              <Heart size={16} className={filterSaved ? "fill-red-400 text-red-400" : ""} />
              {filterSaved ? "Showing Saved" : "Show Saved"}
            </button>
          </div>

          <div className="flex items-center justify-between mb-6 bg-white/5 p-2 rounded-xl">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-lg text-white/70 transition-colors"><ChevronLeft /></button>
            <span className="text-lg font-medium text-white tracking-wide uppercase">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-lg text-white/70 transition-colors"><ChevronRight /></button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs text-white/40 mb-2 uppercase tracking-wide font-medium">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-2 flex-1">
            {blanksArray.map(b => <div key={`blank-${b}`} className="min-h-[60px] sm:min-h-[80px]" />)}
            
            {daysArray.map(d => {
              const dateStr = formatDate(year, month, d);
              const dayPopups = getPopupsForDate(dateStr);
              const isSelected = selectedDate === dateStr;
              
              return (
                <div 
                  key={d} 
                  onClick={() => { setSelectedDate(dateStr); setSelectedPopup(null); }}
                  className={`min-h-[60px] sm:min-h-[80px] p-2 rounded-xl border flex flex-col transition-all cursor-pointer 
                    ${isSelected ? 'bg-white/10 border-white/30' : 'bg-black/30 border-white/5 hover:bg-white/5 hover:border-white/10'}`}
                >
                  <span className={`text-sm mb-1 ${isSelected ? 'text-white font-medium' : 'text-white/60'}`}>{d}</span>
                  <div className="flex flex-col gap-1 overflow-hidden">
                    {dayPopups.slice(0, 3).map(p => (
                      <div key={p.id} className="w-full h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-80" />
                    ))}
                    {dayPopups.length > 3 && <span className="text-[9px] text-white/30 leading-none">+{dayPopups.length - 3}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ────────── RIGHT: DETAILS ────────── */}
        <div className="w-full md:w-[40%] lg:w-[35%] bg-[#0a0a0c] flex flex-col overflow-y-auto custom-scrollbar">
          {!selectedDate && !selectedPopup ? (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center text-white/30">
              <CalendarIcon size={48} className="mb-4 opacity-20" />
              <p>Select a date on the calendar<br/>to view popup stores.</p>
            </div>
          ) : (
            <div className="p-6 sm:p-10 flex flex-col gap-8">
              
              <div className="pb-4 border-b border-white/10">
                <p className="text-white/40 text-sm tracking-wide uppercase mb-1">
                  {selectedPopup ? 'Popup Details' : `Events on ${selectedDate}`}
                </p>
                <h3 className="text-xl font-light text-white">
                  {displayPopups.length} {displayPopups.length === 1 ? 'Store' : 'Stores'} Found
                </h3>
              </div>

              {displayPopups.length === 0 ? (
                <p className="text-white/30 italic">No popup stores found for this date.</p>
              ) : (
                <div className="flex flex-col gap-6">
                  {displayPopups.map(popup => {
                    const isSaved = savedPopupIds.has(popup.id);
                    return (
                      <div key={popup.id} className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col gap-4">
                        <div className="flex justify-between items-start gap-4">
                          <h4 className="text-lg text-white font-medium leading-snug">
                            {popup.title}
                          </h4>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleToggleSave(popup.id); }}
                            className="p-2 bg-black/50 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
                          >
                            <Heart size={18} className={isSaved ? "fill-red-500 text-red-500" : "text-white/40"} />
                          </button>
                        </div>

                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-2 text-white/60">
                            <CalendarIcon size={14} className="text-white/30" />
                            {popup.startDate} ~ {popup.endDate}
                          </div>
                          <div className="flex items-center gap-2 text-white/60">
                            <MapPin size={14} className="text-white/30" />
                            {popup.location}
                          </div>
                        </div>

                        <div className="mt-2 pt-4 border-t border-white/10">
                          <p className="text-white/50 text-sm leading-relaxed">
                            {popup.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* If we selected a date with multiple popups, list them. If we selected a single popup, we're already viewing it. */}
              
            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}

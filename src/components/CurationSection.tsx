import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocationData, MOCK_LOCATIONS } from '../data/mockCurationData';
import CURATION_DB from '../data/curationDB.json';
import { GOOGLE_SHEET_CSV_URL } from '../data/googleSheetConfig';
import { fetchGoogleSheetData } from '../utils/sheetParser';
import { MapDisplay } from './curation/MapDisplay';
import { ScheduleAndLinks } from './curation/ScheduleAndLinks';
import { PuzzleLookbook } from './PuzzleLookbook';
import { useLanguage } from '../contexts/LanguageContext';

const UI_TEXT = {
  EN: {
    title: 'Curate Your\nJourney',
    desc: 'Select your preferred travel style.',
    groupSize: 'Group Size',
    interests: 'Interests',
    region: 'Region',
    allRegion: 'All Regions',
    clearFilters: 'Clear All Filters',
    resultsTitle: 'Recommended Results',
    resultsCount: (n: number) => `${n} locations found`,
    saveItinerary: 'Save to My Itinerary',
    savedItinerary: 'Saved!'
  },
  KO: {
    title: 'Curate Your\nJourney',
    desc: '원하는 여행 스타일을 선택해 보세요.',
    groupSize: '인원',
    interests: '관심사',
    region: '지역',
    allRegion: '전체',
    clearFilters: '필터 초기화',
    resultsTitle: '추천 결과',
    resultsCount: (n: number) => `${n}개의 장소`,
    saveItinerary: '내 일정에 저장',
    savedItinerary: '저장 완료!'
  },
  JP: {
    title: 'Curate Your\nJourney',
    desc: 'ご希望の旅行スタイルを選択してください。',
    groupSize: '人数',
    interests: '興味・関心',
    region: '地域',
    allRegion: 'すべて',
    clearFilters: 'フィルターをクリア',
    resultsTitle: 'おすすめの結果',
    resultsCount: (n: number) => `${n}件の場所`,
    saveItinerary: 'マイプランに保存',
    savedItinerary: '保存しました!'
  },
  CN: {
    title: 'Curate Your\nJourney',
    desc: '请选择您偏好的旅行风格。',
    groupSize: '人数',
    interests: '兴趣',
    region: '地区',
    allRegion: '全部',
    clearFilters: '清除所有筛选',
    resultsTitle: '推荐结果',
    resultsCount: (n: number) => `共找到 ${n} 个地点`,
    saveItinerary: '保存到我的行程',
    savedItinerary: '已保存!'
  },
  VN: {
    title: 'Curate Your\nJourney',
    desc: 'Chọn phong cách du lịch ưa thích của bạn.',
    groupSize: 'Số người',
    interests: 'Sở thích',
    region: 'Khu vực',
    allRegion: 'Tất cả',
    clearFilters: 'Xóa bộ lọc',
    resultsTitle: 'Kết quả đề xuất',
    resultsCount: (n: number) => `Tìm thấy ${n} địa điểm`,
    saveItinerary: 'Lưu vào hành trình của tôi',
    savedItinerary: 'Đã lưu!'
  }
};

export function CurationSection() {
  const { lang } = useLanguage();
  const text = UI_TEXT[lang];
  
  // 기본 DB 데이터로 초기화
  const initialLocations = (CURATION_DB as Record<string, LocationData[]>)[lang] || MOCK_LOCATIONS[lang];
  const [locations, setLocations] = useState<LocationData[]>(initialLocations);

  // 구글 시트 데이터 실시간 연동
  useEffect(() => {
    async function loadSheetData() {
      if (!GOOGLE_SHEET_CSV_URL) return;
      const data = await fetchGoogleSheetData(GOOGLE_SHEET_CSV_URL);
      if (data && data.length > 0) {
        setLocations(data);
      }
    }
    loadSheetData();
  }, []);

  // 언어가 변경될 때 로컬 DB 언어로 리셋 (현재 구글시트는 1개 언어만 덮어씌움)
  useEffect(() => {
    if (!GOOGLE_SHEET_CSV_URL) {
      setLocations((CURATION_DB as Record<string, LocationData[]>)[lang] || MOCK_LOCATIONS[lang]);
    }
  }, [lang]);

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>(text.allRegion);
  const [excludedIds, setExcludedIds] = useState<number[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  // 언어가 바뀌면 선택된 필터를 초기화
  useEffect(() => {
    setSelectedSize(null);
    setSelectedInterests([]);
    setSelectedRegion(UI_TEXT[lang].allRegion);
    setExcludedIds([]);
  }, [lang]);

  // 동적 필터 카테고리 추출 (현재 언어의 데이터 기준)
  const groupSizes = useMemo(() => Array.from(new Set(locations.flatMap(l => l.groupSizes))), [locations]);
  const interests = useMemo(() => Array.from(new Set(locations.flatMap(l => l.tags))), [locations]);
  const regions = useMemo(() => [text.allRegion, ...Array.from(new Set(locations.map(l => l.city)))], [locations, text.allRegion]);

  const hasActiveFilters = selectedSize !== null || selectedInterests.length > 0 || selectedRegion !== text.allRegion;

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const clearFilters = () => {
    setSelectedSize(null);
    setSelectedInterests([]);
    setSelectedRegion(text.allRegion);
    setExcludedIds([]);
  };

  const handleExclude = (id: number) => {
    setExcludedIds(prev => [...prev, id]);
  };

  const handleSaveItinerary = () => {
    const currentSaved = JSON.parse(localStorage.getItem('saved_itineraries') || '[]');
    const newItinerary = {
      id: Date.now(),
      locations: filteredLocations.map(l => l.id),
      date: new Date().toISOString()
    };
    localStorage.setItem('saved_itineraries', JSON.stringify([...currentSaved, newItinerary]));
    
    // 이벤트 발생시켜 Navbar의 My Space 뱃지 갱신 유도
    window.dispatchEvent(new Event('itinerarySaved'));

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // 데이터 필터링 로직
  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      if (excludedIds.includes(loc.id)) return false;
      if (selectedSize && !loc.groupSizes.includes(selectedSize)) return false;
      if (selectedInterests.length > 0) {
        const hasMatchingInterest = selectedInterests.some(interest => loc.tags.includes(interest));
        if (!hasMatchingInterest) return false;
      }
      if (selectedRegion !== text.allRegion && loc.city !== selectedRegion && loc.province !== selectedRegion) {
        return false;
      }
      return true;
    });
  }, [locations, selectedSize, selectedInterests, selectedRegion, excludedIds, text.allRegion]);

  return (
    <section className="snap-start snap-always w-full min-h-screen bg-[#050505] border-b border-white/10 relative overflow-hidden flex flex-col md:flex-row">
      
      {/* ──────────────── 왼쪽 사이드바 (필터 영역) ──────────────── */}
      <div className="w-full md:w-[320px] lg:w-[400px] shrink-0 border-b md:border-b-0 md:border-r border-white/10 p-8 pt-20 flex flex-col bg-black/50 z-20 overflow-y-auto">
        <h2 className="text-white font-light tracking-tight leading-[1.1] mb-2 whitespace-pre-line" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
          {text.title}
        </h2>
        <p className="text-white/40 text-sm mb-10">{text.desc}</p>

        {/* 인원 선택 */}
        <div className="mb-8">
          <h3 className="text-white/60 text-xs tracking-widest uppercase mb-4">{text.groupSize}</h3>
          <div className="flex flex-wrap gap-2">
            {groupSizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                className={`px-4 py-2 rounded-full text-xs transition-colors border ${
                  selectedSize === size 
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent text-white/60 border-white/20 hover:border-white/50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* 관심사 선택 */}
        <div className="mb-8">
          <h3 className="text-white/60 text-xs tracking-widest uppercase mb-4">{text.interests}</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map(interest => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-colors border ${
                    isSelected 
                      ? 'bg-white text-black border-white' 
                      : 'bg-white/5 text-white/50 border-white/10 hover:border-white/30'
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        {/* 지역 선택 */}
        <div className="mb-8">
          <h3 className="text-white/60 text-xs tracking-widest uppercase mb-4">{text.region}</h3>
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full bg-black border border-white/20 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-white/50"
          >
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="mt-auto py-3 w-full text-center text-xs text-white/40 hover:text-white underline decoration-white/20 hover:decoration-white transition-all"
          >
            {text.clearFilters}
          </button>
        )}
      </div>

      {/* ──────────────── 우측 메인 영역 (결과 또는 룩북) ──────────────── */}
      <div className="flex-1 relative bg-[#020202]">
        <AnimatePresence mode="wait">
          {!hasActiveFilters ? (
            <motion.div
              key="lookbook"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <PuzzleLookbook />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 overflow-y-auto p-6 md:p-12 pt-20 md:pt-20 flex flex-col xl:flex-row gap-8"
            >
              {/* 왼쪽: 리스트 */}
              <div className="w-full xl:w-1/2 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-white text-xl font-light mb-1">{text.resultsTitle}</h3>
                    <span className="text-white/40 text-sm">{text.resultsCount(filteredLocations.length)}</span>
                  </div>
                  
                  {/* 저장 버튼 */}
                  <button
                    onClick={handleSaveItinerary}
                    disabled={isSaved || filteredLocations.length === 0}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      isSaved 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-white text-black hover:bg-white/90 border border-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <i className={isSaved ? "bi bi-check2" : "bi bi-bookmark-plus"}></i>
                    {isSaved ? text.savedItinerary : text.saveItinerary}
                  </button>
                </div>
                
                <AnimatePresence>
                  <ScheduleAndLinks locations={filteredLocations} onExclude={handleExclude} />
                </AnimatePresence>
              </div>

              {/* 오른쪽: 지도 */}
              <div className="w-full xl:w-1/2 flex flex-col">
                <div className="sticky top-12">
                  <MapDisplay locations={filteredLocations} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}

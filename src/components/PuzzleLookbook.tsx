import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const UI_TEXT = {
  EN: {
    title: "Real-time\nSpot Curation",
    desc: "Filter your preferences and get instantly matched with suitable locations. Check out real-time curated Korean spots tailored just for you and find them directly on the map."
  },
  KO: {
    title: "실시간\n스팟 큐레이션",
    desc: "내 취향을 필터링하면 어울리는 장소들이 즉시 매칭됩니다. 오직 당신만을 위해 실시간으로 선별된 한국의 장소들과 그 위치를 지도에서 바로 확인해 보세요."
  },
  JP: {
    title: "リアルタイム\nスポットキュレーション",
    desc: "あなたの好みをフィルタリングすると、ぴったりな場所が即座にマッチングされます。あなただけのためにリアルタイムで厳選された韓国のスポットと、その位置を地図で直接確認してみてください。"
  },
  CN: {
    title: "实时\n地点策展",
    desc: "筛选您的喜好，即刻为您匹配合适的地点。在地图上直接查看专为您实时精选的韩国地点及其位置。"
  },
  VN: {
    title: "Tuyển chọn\nĐịa điểm trực tiếp",
    desc: "Lọc sở thích của bạn và ngay lập tức được ghép nối với các địa điểm phù hợp. Kiểm tra các địa điểm Hàn Quốc được tuyển chọn theo thời gian thực dành riêng cho bạn và tìm chúng trực tiếp trên bản đồ."
  }
};

const IMAGES = [
  '/lookbook/11.jpeg',
  '/lookbook/12.jpeg',
  '/lookbook/13.jpeg',
  '/lookbook/14.jpeg',
  '/lookbook/15.jpeg',
  '/lookbook/16.jpeg',
  '/lookbook/17.jpeg',
  '/lookbook/18.jpeg',
  '/lookbook/19.jpeg',
  '/lookbook/20.jpeg',
];

// 4x4 Grid layout slots (16 cells total)
// 1 big center, with surrounding different sized blocks
const SLOTS = [
  "col-start-1 row-start-1 col-span-1 row-span-1", // 1 (1,1)
  "col-start-2 row-start-1 col-span-2 row-span-1", // 2 Wide (2,1 & 3,1)
  "col-start-4 row-start-1 col-span-1 row-span-2", // 3 Tall (4,1 & 4,2)
  "col-start-1 row-start-2 col-span-1 row-span-2", // 4 Tall (1,2 & 1,3)
  "col-start-2 row-start-2 col-span-2 row-span-2", // 5 BIG (2,2 & 3,2 & 2,3 & 3,3)
  "col-start-4 row-start-3 col-span-1 row-span-1", // 6 (4,3)
  "col-start-1 row-start-4 col-span-1 row-span-1", // 7 (1,4)
  "col-start-2 row-start-4 col-span-1 row-span-1", // 8 (2,4)
  "col-start-3 row-start-4 col-span-1 row-span-1", // 9 (3,4)
  "col-start-4 row-start-4 col-span-1 row-span-1", // 10 (4,4)
];

function shuffleArray(array: string[]) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function PuzzleLookbook() {
  const { lang } = useLanguage();
  const text = UI_TEXT[lang];
  
  // Keep the order of images constant so React doesn't move DOM nodes,
  // which can cause browsers to cancel image loading.
  const [slotMapping, setSlotMapping] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  useEffect(() => {
    setSlotMapping(shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  }, []);

  useEffect(() => {
    // 5초마다 주변 작은 사진들 '전체(9장)'를 섞어서 한꺼번에 이동시킴
    const smallInterval = setInterval(() => {
      setSlotMapping(prev => {
        const newMapping = [...prev];
        const smallSlotIndices = [0, 1, 2, 3, 5, 6, 7, 8, 9];
        
        // Find which images are currently in the small slots
        const imagesInSmallSlots = [];
        for (let i = 0; i < 10; i++) {
          if (smallSlotIndices.includes(newMapping[i])) {
            imagesInSmallSlots.push({ imageIndex: i, currentSlot: newMapping[i] });
          }
        }
        
        // Extract just the slots and shuffle them
        const slotsToShuffle = imagesInSmallSlots.map(item => item.currentSlot);
        const shuffledSlots = shuffleArray(slotsToShuffle);
        
        // Assign the shuffled slots back to those images
        imagesInSmallSlots.forEach((item, i) => {
          newMapping[item.imageIndex] = shuffledSlots[i];
        });

        return newMapping;
      });
    }, 5000);

    // 10초마다 가운데 큰 사진(slot index 4)을 작은 사진 중 하나와 스왑
    const centerInterval = setInterval(() => {
      setSlotMapping(prev => {
        const newMapping = [...prev];
        const smallSlotIndices = [0, 1, 2, 3, 5, 6, 7, 8, 9];
        const randomSmallSlot = smallSlotIndices[Math.floor(Math.random() * smallSlotIndices.length)];
        
        // Find which image has slot 4 (center) and which has the random small slot
        const centerImageIndex = newMapping.findIndex(slot => slot === 4);
        const randomSmallImageIndex = newMapping.findIndex(slot => slot === randomSmallSlot);
        
        if (centerImageIndex !== -1 && randomSmallImageIndex !== -1) {
          // 스왑 slots
          newMapping[centerImageIndex] = randomSmallSlot;
          newMapping[randomSmallImageIndex] = 4;
        }
        
        return newMapping;
      });
    }, 10000);

    return () => {
      clearInterval(smallInterval);
      clearInterval(centerInterval);
    };
  }, []);

  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-6 pt-16 md:p-12 md:pt-20 border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
      
      <div className="relative z-20 w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Text */}
        <div className="w-full lg:w-1/3 text-left">
          <h2 className="text-white font-title font-extrabold tracking-[-0.08em] leading-[1.1] mb-6 whitespace-pre-line break-keep" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            {text.title}
          </h2>
          <p className="text-white/50 text-[14px] sm:text-[16px] leading-relaxed max-w-md text-justify break-keep">
            {text.desc}
          </p>
        </div>

        {/* Right Side: Animated Puzzle Grid */}
        <div className="w-full lg:w-2/3 aspect-square relative grid grid-cols-4 grid-rows-4 gap-2 md:gap-4">
          {IMAGES.slice(0, 10).map((srcPath, index) => {
            const currentSlotIndex = slotMapping[index];
            const slotClass = SLOTS[currentSlotIndex];
            const imgUrl = import.meta.env.BASE_URL + srcPath.replace(/^\//, '');
            return (
              <motion.div
                key={srcPath} // Key by src ensures layout animation when array is shuffled
                layout
                transition={{
                  type: "spring",
                  stiffness: 40,
                  damping: 14,
                  mass: 1.2
                }}
                className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-white/5 border border-white/10 ${slotClass}`}
              >
                <img 
                  src={imgUrl} 
                  alt={`Lookbook ${index}`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

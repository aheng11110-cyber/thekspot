import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/hero/1.jpeg',
  '/hero/2.jpg',
  '/hero/3.jpeg',
  '/hero/4.jpeg',
  '/hero/5.jpeg',
  '/hero/6.jpeg',
  '/hero/7.jpeg',
  '/hero/8.jpg',
  '/hero/9.jpeg',
  '/hero/10.jpeg',
];

// 두번째 페이지(Puzzle Lookbook)와 완전히 동일한 4x4 퍼즐 레이아웃 (총 10칸)
const SLOTS = [
  "col-start-1 row-start-1 col-span-1 row-span-1", // 1 Small
  "col-start-2 row-start-1 col-span-1 row-span-1", // 2 Small
  "col-start-3 row-start-1 col-span-2 row-span-1", // 3 Wide
  "col-start-1 row-start-2 col-span-1 row-span-2", // 4 Tall
  "col-start-2 row-start-2 col-span-2 row-span-2", // 5 BIG (Center)
  "col-start-4 row-start-2 col-span-1 row-span-1", // 6 Small
  "col-start-4 row-start-3 col-span-1 row-span-1", // 7 Small
  "col-start-1 row-start-4 col-span-1 row-span-1", // 8 Small
  "col-start-2 row-start-4 col-span-2 row-span-1", // 9 Wide
  "col-start-4 row-start-4 col-span-1 row-span-1", // 10 Small
];

function shuffleArray(array: string[]) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function MondrianHeroGrid() {
  // Keep the order of images constant so React doesn't move DOM nodes,
  // which can cause browsers to cancel image loading.
  const [slotMapping, setSlotMapping] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  // 최초 로드시 한번만 셔플
  useEffect(() => {
    setSlotMapping(shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  }, []);

  useEffect(() => {
    // 5초마다 주변 작은 사진들 '전체(9장)'를 섞어서 한꺼번에 이동시킴
    const smallInterval = setInterval(() => {
      setSlotMapping(prev => {
        const newMapping = [...prev];
        // small slots are indices 0, 1, 2, 3, 5, 6, 7, 8, 9 in the SLOTS array
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
    <div className="absolute inset-y-0 left-0 w-full h-full flex flex-col justify-center bg-black overflow-hidden z-0 pl-4 lg:pl-8 py-8">
      {/* 4x4 다이나믹 퍼즐 그리드 (조금만 축소) */}
      <div className="w-[95%] lg:w-[92%] xl:w-[90%] aspect-[4/5] sm:aspect-square relative grid grid-cols-4 grid-rows-4 gap-2 md:gap-3">
        {IMAGES.slice(0, 10).map((srcPath, index) => {
          const currentSlotIndex = slotMapping[index];
          const slotClass = SLOTS[currentSlotIndex];
          const imgUrl = import.meta.env.BASE_URL + srcPath.replace(/^\//, '');
          return (
            <motion.div
              key={src} // src를 key로 써야 서로 위치가 부드럽게 이동함
              layout
              transition={{
                type: "spring",
                stiffness: 40,
                damping: 14,
                mass: 1.2
              }}
              className={`relative overflow-hidden rounded-xl bg-white/5 ${slotClass}`}
            >
              {/* Removed dark overlay to improve image quality as requested */}
              <img 
                src={imgUrl} 
                alt={`Hero Lookbook ${index}`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/page_images/10.jpg',
  '/page_images/11.jpg',
  '/page_images/ajs1980518-jusangjeolli-cliff-4810725.jpg',
  '/page_images/yujeong_huh-gyeongbok-palace-6854763_1920.jpg',
  '/page_images/vitamin-korean-village-snow-858232.jpg',
  '/page_images/Two_women_walking_on_street_202607081305.jpeg',
  '/page_images/dtteom-ocean-999811.jpg',
  '/page_images/gimmungiyipotoraendeu-damyang-5608568.jpg',
  '/page_images/hpuppet-woman-7292973.jpg',
  '/page_images/kimdaejeung-early-summer-5174844.jpg',
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
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);

  // 초기화
  useEffect(() => {
    setDisplayedImages(shuffleArray(IMAGES).slice(0, SLOTS.length));
  }, []);

  // 4초마다 무작위로 1~2개의 이미지만 교체 (부하 최소화, 먹통 방지)
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedImages(prev => {
        const newArr = [...prev];
        const slotToReplace = Math.floor(Math.random() * SLOTS.length);
        const availableImages = IMAGES.filter(img => !newArr.includes(img));
        
        if (availableImages.length > 0) {
          const randomNewImage = availableImages[Math.floor(Math.random() * availableImages.length)];
          newArr[slotToReplace] = randomNewImage;
        }
        return newArr;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (displayedImages.length === 0) return null;

  if (displayedImages.length === 0) return null;

  return (
    <div className="absolute inset-y-0 left-0 w-full h-full flex flex-col justify-center bg-black overflow-hidden z-0 pl-4 lg:pl-8 py-8">
      {/* 4x4 다이나믹 퍼즐 그리드 */}
      <div className="w-full aspect-[4/5] sm:aspect-square relative grid grid-cols-4 grid-rows-4 gap-2 md:gap-3">
        {SLOTS.map((slotClass, index) => {
          const currentImg = displayedImages[index];
          return (
            <div key={index} className={`relative overflow-hidden rounded-xl bg-white/5 ${slotClass}`}>
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentImg}
                  src={currentImg}
                  alt={`Hero Lookbook ${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

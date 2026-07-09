import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/images/11.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
  '/images/9.jpg',
  '/images/32.jpg',
  '/images/33.jpg',
  '/images/39.jpg',
  '/images/29.jpg',
  '/images/37.jpg',
  '/images/4.jpg',
];

// 2열(가로 2칸) x 4행(세로 4칸) 레이아웃
const SLOTS = [
  "col-start-1 row-start-1 col-span-1 row-span-2", // 0: 길쭉한 거 (좌측 상단)
  "col-start-2 row-start-1 col-span-1 row-span-1", // 1: 작은 거 (우측 상단)
  "col-start-2 row-start-2 col-span-1 row-span-1", // 2: 작은 거 (우측 중단)
  "col-start-1 row-start-3 col-span-1 row-span-1", // 3: 작은 거 (좌측 하단)
  "col-start-2 row-start-3 col-span-1 row-span-2", // 4: 길쭉한 거 (우측 하단)
  "col-start-1 row-start-4 col-span-1 row-span-1", // 5: 작은 거 (좌측 맨밑)
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

  // 6초마다 랜덤하게 1~2개 사진 교체
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedImages(prev => {
        const newArr = [...prev];
        const slotToReplace = Math.floor(Math.random() * SLOTS.length);
        
        // 현재 안 보여지고 있는 이미지 찾기
        const availableImages = IMAGES.filter(img => !newArr.includes(img));
        if (availableImages.length > 0) {
          const randomNewImage = availableImages[Math.floor(Math.random() * availableImages.length)];
          newArr[slotToReplace] = randomNewImage;
        }
        return newArr;
      });
    }, 8000); // 8초마다 교체 (부하 감소)

    return () => clearInterval(interval);
  }, []);

  if (displayedImages.length === 0) return null;

  return (
    <div className="absolute inset-y-0 left-0 w-[45%] h-full bg-black overflow-hidden z-0">
      {/* 2열 4행 그리드 */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-4 gap-1 sm:gap-2 p-1 sm:p-2 opacity-100 h-full w-full">
        {SLOTS.map((slotClass, index) => {
          const currentImg = displayedImages[index];
          return (
            <div key={index} className={`relative overflow-hidden rounded-md bg-white/5 ${slotClass}`}>
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentImg}
                  src={currentImg}
                  alt="Mondrian Gallery"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
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

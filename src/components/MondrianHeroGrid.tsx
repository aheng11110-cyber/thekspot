import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES = [
  '/page_images/10.jpg',
  '/page_images/11.jpg',
  '/page_images/ajs1980518-jusangjeolli-cliff-4810725.jpg',
  '/page_images/yujeong_huh-gyeongbok-palace-6854763_1920.jpg',
  '/page_images/vitamin-korean-village-snow-858232.jpg',
  '/page_images/Two_women_walking_on_street_202607081305.jpeg',
];

// 세로 2칸, 완벽한 정사각형(aspect-square) 타일 배열
const SLOTS = [
  "col-span-1 aspect-square", // 좌측 1
  "col-span-1 aspect-square", // 우측 1
  "col-span-1 aspect-square", // 좌측 2
  "col-span-1 aspect-square", // 우측 2
  "col-span-1 aspect-square", // 좌측 3
  "col-span-1 aspect-square", // 우측 3
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
    <div className="absolute inset-y-0 left-0 w-[45%] h-full flex flex-col justify-center bg-black overflow-hidden z-0 pl-4 py-8">
      {/* 2열 정사각형 그리드 */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
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

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
  const [images, setImages] = useState<string[]>([]);

  // 최초 로드시 한번만 셔플
  useEffect(() => {
    setImages(shuffleArray(IMAGES).slice(0, SLOTS.length));
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    // 5초마다 주변 작은 사진들 '전체(9장)'를 섞어서 한꺼번에 이동시킴
    const smallInterval = setInterval(() => {
      setImages(prev => {
        const newArr = [...prev];
        const smallIndices = [0, 1, 2, 3, 5, 6, 7, 8, 9];
        
        // 작은 사진들에 해당하는 이미지들만 추출
        const smallImages = smallIndices.map(idx => newArr[idx]);
        // 추출한 작은 사진들 셔플
        const shuffledSmall = shuffleArray(smallImages);
        // 다시 원래 위치에 덮어쓰기
        smallIndices.forEach((idx, i) => {
          newArr[idx] = shuffledSmall[i];
        });

        return newArr;
      });
    }, 5000);

    // 10초마다 가운데 큰 사진(index 4)을 작은 사진 중 하나와 스왑
    const centerInterval = setInterval(() => {
      setImages(prev => {
        const newArr = [...prev];
        const smallIndices = [0, 1, 2, 3, 5, 6, 7, 8, 9];
        const randomSmall = smallIndices[Math.floor(Math.random() * smallIndices.length)];
        
        // 스왑
        const temp = newArr[4];
        newArr[4] = newArr[randomSmall];
        newArr[randomSmall] = temp;
        
        return newArr;
      });
    }, 10000);

    return () => {
      clearInterval(smallInterval);
      clearInterval(centerInterval);
    };
  }, [images.length]);



  return (
    <div className="absolute inset-y-0 left-0 w-full h-full flex flex-col justify-center bg-black overflow-hidden z-0 pl-4 lg:pl-8 py-8">
      {/* 4x4 다이나믹 퍼즐 그리드 (조금만 축소) */}
      <div className="w-[95%] lg:w-[92%] xl:w-[90%] aspect-[4/5] sm:aspect-square relative grid grid-cols-4 grid-rows-4 gap-2 md:gap-3">
        {images.map((src, index) => {
          const slotClass = SLOTS[index];
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
              <div className="absolute inset-0 bg-black/20 z-10 hover:bg-transparent transition-colors duration-500" />
              <img 
                src={src} 
                alt={`Hero Lookbook ${index}`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                style={{ imageRendering: 'high-quality', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

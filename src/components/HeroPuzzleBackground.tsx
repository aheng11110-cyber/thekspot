import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

// 1번 슬롯(인덱스 0)은 무조건 제일 큰 왼쪽 상단 배치 (3열 5행 레이아웃)
const SLOTS = [
  "col-start-1 row-start-1 col-span-2 row-span-2", // 0: BIG Top-Left
  "col-start-3 row-start-1 col-span-1 row-span-1", // 1: small
  "col-start-3 row-start-2 col-span-1 row-span-1", // 2: small
  "col-start-1 row-start-3 col-span-1 row-span-1", // 3: small
  "col-start-2 row-start-3 col-span-1 row-span-2", // 4: tall
  "col-start-3 row-start-3 col-span-1 row-span-1", // 5: small
  "col-start-1 row-start-4 col-span-1 row-span-1", // 6: small
  "col-start-3 row-start-4 col-span-1 row-span-1", // 7: small
  "col-start-1 row-start-5 col-span-1 row-span-1", // 8: small
  "col-start-2 row-start-5 col-span-2 row-span-1", // 9: wide
];

function shuffleArray(array: string[]) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function HeroPuzzleBackground() {
  const [images, setImages] = useState(IMAGES);

  useEffect(() => {
    // 1. 나머지 9개(작은 슬롯들)는 5초마다 자기들끼리 자리 이동
    const interval5s = setInterval(() => {
      setImages(prev => {
        const newArr = [...prev];
        const bigImage = newArr[0];
        const smallImages = newArr.slice(1);
        const shuffledSmall = shuffleArray(smallImages);
        return [bigImage, ...shuffledSmall];
      });
    }, 5000);

    // 2. 왼쪽 상단 제일 큰 사진은 10초마다 다른 사진과 교체
    const interval10s = setInterval(() => {
      setImages(prev => {
        const newArr = [...prev];
        const randomIndex = Math.floor(Math.random() * 9) + 1; // 1~9 사이
        // 큰 이미지와 랜덤한 작은 이미지 스왑
        [newArr[0], newArr[randomIndex]] = [newArr[randomIndex], newArr[0]];
        return newArr;
      });
    }, 10000);

    return () => {
      clearInterval(interval5s);
      clearInterval(interval10s);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full lg:w-[calc(100%-320px)] h-full bg-black overflow-hidden">
      {/* 텍스트 가독성을 위한 아주 옅은 오버레이 (사진이 선명하게 보이도록) */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
      
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-5 gap-1 md:gap-2 p-1 md:p-2 opacity-100">
        {images.map((src, index) => {
          const slotClass = SLOTS[index];
          return (
            <motion.div
              key={src}
              layout
              transition={{
                type: "spring",
                stiffness: 25, // 속도를 늦추고 더 부드럽게 (어지럼증 감소)
                damping: 18,
                mass: 1.5
              }}
              className={`relative overflow-hidden rounded-md bg-white/5 ${slotClass}`}
            >
              <img 
                src={src} 
                alt="Background Puzzle" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8000ms] ease-linear hover:scale-105" 
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

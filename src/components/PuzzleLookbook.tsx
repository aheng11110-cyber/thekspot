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

// 4x4 Grid layout slots (16 cells total)
// 1 big center, with surrounding different sized blocks
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

export function PuzzleLookbook() {
  const [images, setImages] = useState<string[]>([]);

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
    <section className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-6 pt-16 md:p-12 md:pt-20 border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none z-10" />
      
      <div className="relative z-20 w-full max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Side: Text */}
        <div className="w-full lg:w-1/3 text-left">
          <h2 className="text-white font-light tracking-tight leading-[1.1] mb-6" style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}>
            Dynamic<br />Lookbook
          </h2>
          <p className="text-white/50 text-[14px] sm:text-[16px] leading-relaxed max-w-md">
            수백 가지의 엄선된 스타일 조합. 
            매 순간 새롭게 변하는 랜덤 퍼즐 레이아웃으로, 
            당신에게 영감을 줄 최적의 패션 스타일과 공간을 발견해보세요.
          </p>
        </div>

        {/* Right Side: Animated Puzzle Grid */}
        <div className="w-full lg:w-2/3 aspect-square relative grid grid-cols-4 grid-rows-4 gap-2 md:gap-4">
          {images.map((src, index) => {
            const slotClass = SLOTS[index];
            return (
              <motion.div
                key={src} // Key by src ensures layout animation when array is shuffled
                layout
                transition={{
                  type: "spring",
                  stiffness: 40,
                  damping: 14,
                  mass: 1.2
                }}
                className={`relative overflow-hidden rounded-xl md:rounded-2xl bg-white/5 border border-white/10 ${slotClass}`}
              >
                <div className="absolute inset-0 bg-black/20 z-10 hover:bg-transparent transition-colors duration-500" />
                <img 
                  src={src} 
                  alt={`Lookbook ${index}`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                  style={{ imageRendering: 'high-quality' }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

interface OrbitalAnimationProps {
  features: string[];
}

export const OrbitalAnimation: React.FC<OrbitalAnimationProps> = ({ features }) => {
  // We expect 4 features
  const displayFeatures = features.slice(0, 4);

  return (
    <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] mx-auto mt-12 flex items-center justify-center">
      
      {/* 
        The parent wrapper rotates continuously. 
        We set the border to transparent so the circle line isn't visible, 
        as requested by the user.
      */}
      <motion.div
        className="absolute w-full h-full rounded-full border border-transparent"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 20
        }}
      >
        {displayFeatures.map((feature, index) => {
          // Calculate angle for 4 items: 0, 90, 180, 270 degrees
          const angle = (index * 90);
          
          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`
              }}
            >
              {/* Position the box at the top edge of the rotating circle */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                {/* 
                  Counter-rotation so the text remains perfectly upright.
                  The inner div rotates the opposite way of the parent (-360deg),
                  and also offsets its initial angle (-angle).
                */}
                <motion.div
                  className="bg-white/5 backdrop-blur-md border border-white/10 px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-xl flex items-center justify-center text-center w-[140px] sm:w-[160px]"
                  animate={{ rotate: -360 }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 20
                  }}
                  style={{
                    // Initial counter-rotation
                    transform: `rotate(${-angle}deg)`
                  }}
                >
                  <span className="text-white/80 text-[12px] sm:text-[14px] font-medium leading-tight">
                    {feature}
                  </span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

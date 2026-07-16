import React from 'react';
import { motion } from 'framer-motion';

interface OrbitalAnimationProps {
  features: string[];
}

export const OrbitalAnimation: React.FC<OrbitalAnimationProps> = ({ features }) => {
  // We expect 4 features
  const displayFeatures = features.slice(0, 4);

  return (
    <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] mt-8 flex items-center justify-center pointer-events-none">
      
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
          duration: 30
        }}
      >
        {displayFeatures.map((feature, index) => {
          // Calculate angle for 4 items: 0, 90, 180, 270 degrees
          const angle = (index * 90);
          
          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 w-full h-full"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`
              }}
            >
              {/* Position the box at the top edge of the rotating circle */}
              <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                {/* 
                  Continuous counter-rotation to negate the parent's rotate: 360 
                */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30
                  }}
                  style={{ transformOrigin: 'center center' }}
                >
                  {/* 
                    Initial counter-rotation to negate the item's fixed angle.
                    This ensures the text starts perfectly horizontal.
                  */}
                  <div
                    className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 sm:px-8 sm:py-5 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center text-center w-[260px] sm:w-[340px] whitespace-pre-wrap leading-tight"
                    style={{ transform: `rotate(${-angle}deg)` }}
                  >
                    <span className="text-white text-[18px] sm:text-[22px] font-bold tracking-wide drop-shadow-md">
                      {feature}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

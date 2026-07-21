import { motion } from 'framer-motion';
import { RandomHoverWrapper } from './RandomHoverWrapper';

interface MobileFeaturesGridProps {
  features: string[];
}

export function MobileFeaturesGrid({ features }: MobileFeaturesGridProps) {
  return (
    <div className="w-full max-w-[400px] mx-auto grid grid-cols-2 gap-3 px-4 my-6 lg:hidden z-30 relative">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 + idx * 0.1 }}
        >
          <RandomHoverWrapper
            as="div"
            variant="border"
            className="w-full h-full p-3 rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-center shadow-lg"
          >
            <span className="text-white/80 text-[11px] sm:text-[13px] font-medium leading-tight">
              {feature}
            </span>
          </RandomHoverWrapper>
        </motion.div>
      ))}
    </div>
  );
}

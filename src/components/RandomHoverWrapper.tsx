import React, { useState } from 'react';

const COLORS = [
  'rgba(59, 130, 246, 0.15)',  // blue
  'rgba(236, 72, 153, 0.15)', // pink
  'rgba(16, 185, 129, 0.15)', // emerald
  'rgba(139, 92, 246, 0.15)', // purple
  'rgba(245, 158, 11, 0.15)', // amber
  'rgba(6, 182, 212, 0.15)',  // cyan
];

interface Props extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  disabled?: boolean;
}

export const RandomHoverWrapper = React.forwardRef<HTMLElement, Props>(
  ({ as: Component = 'div', className, disabled, style, onMouseEnter, onMouseLeave, ...rest }, ref) => {
    const [hoverBg, setHoverBg] = useState<string | undefined>(undefined);

    const handleMouseEnter = (e: any) => {
      if (!disabled) {
        setHoverBg(COLORS[Math.floor(Math.random() * COLORS.length)]);
      }
      if (onMouseEnter) onMouseEnter(e);
    };

    const handleMouseLeave = (e: any) => {
      setHoverBg(undefined);
      if (onMouseLeave) onMouseLeave(e);
    };

    return (
      <Component
        ref={ref}
        className={`transition-colors duration-300 ${className || ''}`}
        style={{ ...style, backgroundColor: disabled ? undefined : (hoverBg || style?.backgroundColor) }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      />
    );
  }
);

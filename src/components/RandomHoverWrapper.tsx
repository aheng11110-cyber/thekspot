import React, { useState } from 'react';

const COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', glow: 'rgba(59, 130, 246, 0.4)', border: '#3b82f6' }, // blue
  { bg: 'rgba(236, 72, 153, 0.15)', glow: 'rgba(236, 72, 153, 0.4)', border: '#ec4899' }, // pink
  { bg: 'rgba(16, 185, 129, 0.15)', glow: 'rgba(16, 185, 129, 0.4)', border: '#10b981' }, // emerald
  { bg: 'rgba(139, 92, 246, 0.15)', glow: 'rgba(139, 92, 246, 0.4)', border: '#8b5cf6' }, // purple
  { bg: 'rgba(245, 158, 11, 0.15)', glow: 'rgba(245, 158, 11, 0.4)', border: '#f59e0b' }, // amber
  { bg: 'rgba(6, 182, 212, 0.15)',  glow: 'rgba(6, 182, 212, 0.4)', border: '#06b6d4' }, // cyan
];

interface Props extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  disabled?: boolean;
  variant?: 'bg' | 'glow' | 'border';
}

export const RandomHoverWrapper = React.forwardRef<HTMLElement, Props>(
  ({ as: Component = 'div', className, disabled, style, onMouseEnter, onMouseLeave, variant = 'bg', ...rest }, ref) => {
    const [hoverColor, setHoverColor] = useState<typeof COLORS[0] | undefined>(undefined);

    const handleMouseEnter = (e: any) => {
      if (!disabled) {
        setHoverColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
      }
      if (onMouseEnter) onMouseEnter(e);
    };

    const handleMouseLeave = (e: any) => {
      setHoverColor(undefined);
      if (onMouseLeave) onMouseLeave(e);
    };

    const dynamicStyle: React.CSSProperties = { ...style };

    if (!disabled && hoverColor) {
      if (variant === 'bg') {
        dynamicStyle.backgroundColor = hoverColor.bg;
      } else if (variant === 'glow') {
        dynamicStyle.boxShadow = `0 0 30px ${hoverColor.glow}`;
        dynamicStyle.borderColor = hoverColor.border;
        dynamicStyle.backgroundColor = 'rgba(0,0,0,0.6)';
      } else if (variant === 'border') {
        dynamicStyle.borderColor = hoverColor.border;
        dynamicStyle.boxShadow = `inset 0 0 15px ${hoverColor.glow}, 0 0 15px ${hoverColor.glow}`;
        dynamicStyle.backgroundColor = 'rgba(0,0,0,0.8)';
      }
    }

    return (
      <Component
        ref={ref}
        className={`transition-all duration-300 ${className || ''}`}
        style={dynamicStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      />
    );
  }
);

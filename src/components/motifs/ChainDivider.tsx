import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ChainDividerProps {
  className?: string;
  tone?: 'scarlet' | 'gold' | 'chain';
}

const toneStops: Record<NonNullable<ChainDividerProps['tone']>, [string, string]> = {
  scarlet: ['rgb(var(--color-ember))', 'rgb(var(--color-blood))'],
  gold: ['rgb(var(--color-gold))', 'rgb(var(--color-gold-deep))'],
  chain: ['rgb(var(--color-chain))', 'rgb(var(--color-border))'],
};

const ChainDivider = ({ className = '', tone = 'scarlet' }: ChainDividerProps) => {
  const gradientId = useId();
  const reducedMotion = useReducedMotion();
  const [light, dark] = toneStops[tone];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="h-4 w-full"
        style={{ transformOrigin: 'left' }}
        initial={reducedMotion ? undefined : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg width="100%" height="16" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={light} />
              <stop offset="55%" stopColor={dark} />
              <stop offset="100%" stopColor={light} />
            </linearGradient>
            <pattern id={`${gradientId}-pattern`} width="22" height="16" patternUnits="userSpaceOnUse">
              <ellipse cx="5" cy="8" rx="4.4" ry="6.2" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" />
              <ellipse cx="16" cy="8" rx="4.4" ry="6.2" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" opacity="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="16" fill={`url(#${gradientId}-pattern)`} />
        </svg>
      </motion.div>
    </div>
  );
};

export default ChainDivider;

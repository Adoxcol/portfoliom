import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface JudgmentPendantProps {
  className?: string;
  length?: number;
}

/** A short hanging chain ending in a blade-tip, evoking the Judgment Chain weapon. Original geometry. */
const JudgmentPendant = ({ className = '', length = 120 }: JudgmentPendantProps) => {
  const gradientId = useId();
  const reducedMotion = useReducedMotion();
  const links = Math.max(3, Math.floor(length / 22));

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      style={{ transformOrigin: 'top center' }}
      initial={reducedMotion ? undefined : { scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width="14" height={links * 22} viewBox={`0 0 14 ${links * 22}`} aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--color-gold))" />
            <stop offset="100%" stopColor="rgb(var(--color-ember))" />
          </linearGradient>
        </defs>
        {Array.from({ length: links }).map((_, index) => (
          <ellipse
            key={index}
            cx={index % 2 === 0 ? 7 : 7}
            cy={index * 22 + 6}
            rx={index % 2 === 0 ? 4.6 : 3.2}
            ry={index % 2 === 0 ? 6 : 4.6}
            transform={index % 2 !== 0 ? `rotate(90 7 ${index * 22 + 6})` : undefined}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="1.6"
          />
        ))}
      </svg>

      <svg width="22" height="26" viewBox="0 0 22 26" className="animate-eye-pulse" aria-hidden="true">
        <path
          d="M11 0 L14 9 L22 11 L14 13 L11 26 L8 13 L0 11 L8 9 Z"
          fill="rgb(var(--color-ember))"
          opacity="0.9"
        />
      </svg>
    </motion.div>
  );
};

export default JudgmentPendant;

import { useId } from 'react';

interface ScarletEyeProps {
  size?: number;
  className?: string;
}

/** Original abstract emblem evoking activated scarlet eyes — not derived from any show asset. */
const ScarletEye = ({ size = 220, className = '' }: ScarletEyeProps) => {
  const glowId = useId();
  const rays = Array.from({ length: 12 });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`animate-eye-pulse ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgb(var(--color-ember))" stopOpacity="0.9" />
          <stop offset="45%" stopColor="rgb(var(--color-scarlet))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(var(--color-blood))" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="100" cy="100" r="92" fill={`url(#${glowId})`} />

      <g stroke="rgb(var(--color-ember))" strokeWidth="0.75" opacity="0.55">
        {rays.map((_, index) => {
          const angle = (index / rays.length) * 360;
          return (
            <line
              key={index}
              x1="100"
              y1="100"
              x2="100"
              y2="14"
              transform={`rotate(${angle} 100 100)`}
            />
          );
        })}
      </g>

      <ellipse cx="100" cy="100" rx="78" ry="42" fill="none" stroke="rgb(var(--color-ember))" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="26" fill="rgb(var(--color-blood))" stroke="rgb(var(--color-ember))" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="10" fill="rgb(var(--color-obsidian))" />
      <circle cx="95" cy="94" r="3" fill="rgb(var(--color-bone))" opacity="0.85" />
    </svg>
  );
};

export default ScarletEye;

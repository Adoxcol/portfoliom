import { useId } from 'react';

interface SealBadgeProps {
  label: string;
  tone?: 'scarlet' | 'gold' | 'chain';
  size?: number;
  className?: string;
}

const toneStops: Record<NonNullable<SealBadgeProps['tone']>, [string, string]> = {
  scarlet: ['rgb(var(--color-ember))', 'rgb(var(--color-scarlet))'],
  gold: ['rgb(var(--color-gold))', 'rgb(var(--color-gold-deep))'],
  chain: ['rgb(var(--color-chain))', 'rgb(var(--color-border))'],
};

const SealBadge = ({ label, tone = 'scarlet', size = 72, className = '' }: SealBadgeProps) => {
  const pathId = useId();
  const gradientId = useId();
  const [light, dark] = toneStops[tone];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`animate-aura-pulse rounded-full ${className}`}
      role="img"
      aria-label={label}
    >
      <defs>
        <path id={pathId} d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="rgb(var(--color-blood))" opacity="0.15" />
      <circle cx="50" cy="50" r="46" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" />
      <circle cx="50" cy="50" r="38" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1" strokeDasharray="2 3" />
      <text fontSize="7.5" fontFamily="IBM Plex Mono, monospace" fill={light} letterSpacing="2">
        <textPath href={`#${pathId}`} startOffset="0%">
          {label} • {label} •
        </textPath>
      </text>
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontSize="14"
        fontFamily="Cinzel, serif"
        fontWeight="700"
        fill={`url(#${gradientId})`}
      >
        HA
      </text>
    </svg>
  );
};

export default SealBadge;

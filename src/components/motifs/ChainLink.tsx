interface ChainLinkProps {
  className?: string;
  color?: string;
  orientation?: 'horizontal' | 'vertical';
}

/** Tiny two-ring chain glyph used as a list bullet / accent mark / connector. */
const ChainLink = ({
  className = '',
  color = 'rgb(var(--color-ember))',
  orientation = 'horizontal',
}: ChainLinkProps) => {
  if (orientation === 'vertical') {
    return (
      <svg viewBox="0 0 12 24" width="12" height="24" className={className} aria-hidden="true">
        <ellipse cx="6" cy="7" rx="4.2" ry="5.6" fill="none" stroke={color} strokeWidth="1.4" />
        <ellipse cx="6" cy="17" rx="4.2" ry="5.6" fill="none" stroke={color} strokeWidth="1.4" opacity="0.7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 12" width="20" height="12" className={className} aria-hidden="true">
      <ellipse cx="6" cy="6" rx="5" ry="4.6" fill="none" stroke={color} strokeWidth="1.6" />
      <ellipse cx="14" cy="6" rx="5" ry="4.6" fill="none" stroke={color} strokeWidth="1.6" opacity="0.7" />
    </svg>
  );
};

export default ChainLink;

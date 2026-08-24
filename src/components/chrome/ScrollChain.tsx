import { type RefObject, useEffect, useId, useRef } from 'react';
import {
  motion,
  useAnimation,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useSectionInView } from '../../hooks/useSectionInView';

const sectionIds = ['license', 'dossier', 'abilities', 'hunts', 'quests', 'phases', 'stats', 'contact'];

interface ScrollChainProps {
  containerRef: RefObject<HTMLElement>;
}

/**
 * A Judgment Chain that visibly pays out as you scroll — the chain "grows"
 * down the page and its blade tip trails just behind actual scroll progress
 * (a spring lag) so it reads as being pulled taut rather than a static
 * progress bar. Pure CSS-transform animation, no 3D assets.
 */
const ScrollChain = ({ containerRef }: ScrollChainProps) => {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ container: containerRef });
  // Single spring drives both the chain's length and the tip's position so
  // they can never drift apart from each other mid-scroll.
  const pullProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 18, mass: 0.5 });
  const gradientId = useId();

  const chainScaleY = reducedMotion ? 1 : pullProgress;
  const tipTop = useTransform(reducedMotion ? scrollYProgress : pullProgress, (v) => `${v * 100}%`);
  const tipRotate = useTransform(pullProgress, [0, 0.02, 0.04, 0], [0, -8, 8, 0]);

  // Punchier "yank" pulse whenever a new section becomes active — the chain
  // snaps taut instead of just smoothly trailing scroll position.
  const activeId = useSectionInView(containerRef, sectionIds);
  const tipJolt = useAnimation();
  const chainJolt = useAnimation();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (reducedMotion) return;

    tipJolt.start({
      y: [0, 14, -6, 0],
      scale: [1, 1.4, 0.9, 1],
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    });
    chainJolt.start({
      scaleX: [1, 1.6, 0.85, 1],
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, reducedMotion]);

  return (
    <div className="fixed left-3 md:left-6 top-0 h-screen w-6 z-40 pointer-events-none hidden lg:block">
      <svg width="6" height="100%" className="absolute left-0 top-0 h-full" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--color-gold))" />
            <stop offset="100%" stopColor="rgb(var(--color-ember))" />
          </linearGradient>
        </defs>
      </svg>

      {/* Track, faint, marks the full drop */}
      <div className="absolute left-[2px] top-0 bottom-0 w-px bg-chain/15" />

      {/* Chain that pays out from the top as you scroll */}
      <motion.div
        className="absolute left-0 top-0 w-6 h-full origin-top"
        style={{ scaleY: chainScaleY }}
      >
        <motion.svg
          width="24"
          height="100%"
          viewBox="0 0 24 800"
          preserveAspectRatio="none"
          aria-hidden="true"
          initial={{ scaleX: 1 }}
          animate={chainJolt}
          style={{ transformOrigin: 'center' }}
        >
          {Array.from({ length: 34 }).map((_, index) => (
            <ellipse
              key={index}
              cx="12"
              cy={index * 24 + 10}
              rx={index % 2 === 0 ? 5 : 3.6}
              ry={index % 2 === 0 ? 7 : 5.4}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="1.4"
              opacity="0.55"
            />
          ))}
        </motion.svg>
      </motion.div>

      {/* Blade tip trailing the pulled length */}
      <motion.div
        className="absolute -translate-x-1/2 left-[12px]"
        style={{ top: tipTop, rotate: reducedMotion ? 0 : tipRotate }}
      >
        <motion.svg
          width="18"
          height="22"
          viewBox="0 0 18 22"
          className="scarlet-glow rounded-full"
          aria-hidden="true"
          initial={{ y: 0, scale: 1 }}
          animate={tipJolt}
        >
          <path
            d="M9 0 L11.5 7.5 L18 9 L11.5 10.5 L9 22 L6.5 10.5 L0 9 L6.5 7.5 Z"
            fill="rgb(var(--color-ember))"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default ScrollChain;

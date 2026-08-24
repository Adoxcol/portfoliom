import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="custom-cursor fixed pointer-events-none z-[9999] top-0 left-0"
      style={{ x: position.x, y: position.y, translateX: '-50%', translateY: '-50%' }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.6 }}
      transition={{ duration: 0.12, ease: 'linear' }}
    >
      <svg width="22" height="14" viewBox="0 0 22 14" className="animate-eye-pulse">
        <ellipse cx="11" cy="7" rx="10" ry="6" fill="none" stroke="rgb(var(--color-ember))" strokeWidth="1.2" />
        <circle cx="11" cy="7" r="3.4" fill="rgb(var(--color-blood))" stroke="rgb(var(--color-ember))" strokeWidth="1" />
        <circle cx="11" cy="7" r="1.2" fill="rgb(var(--color-obsidian))" />
      </svg>
    </motion.div>
  );
};

export default CustomCursor;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.1,
        ease: 'linear',
      }}
    >
      {/* Crosshair cursor */}
      <div className="relative w-8 h-8">
        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-neon-lime opacity-60" />
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 w-px h-full bg-neon-lime opacity-60" />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-neon-lime rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Corner brackets */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-lime opacity-40" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-lime opacity-40" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-lime opacity-40" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-lime opacity-40" />
      </div>
      
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-neon-lime opacity-10 rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-md animate-pulse" />
    </motion.div>
  );
};

export default CustomCursor;
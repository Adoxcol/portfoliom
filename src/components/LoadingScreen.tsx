import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEM...');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Update status text
    const statusInterval = setInterval(() => {
      const statuses = [
        'INITIALIZING SYSTEM...',
        'LOADING ARCHIVES...',
        'VERIFYING CLEARANCE...',
        'ESTABLISHING CONNECTION...',
        'SYSTEM READY',
      ];
      setStatusText(statuses[Math.floor(progress / 20)]);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [onComplete, progress]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-tactical-black z-50 flex flex-col items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* System initialization text */}
        <motion.div
          className="tactical-mono text-soft-white text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {statusText}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-64 h-px bg-muted-gray relative overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 bg-neon-lime"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-neon-lime blur-sm"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ opacity: 0.5 }}
          />
        </motion.div>

        {/* System info */}
        <motion.div
          className="tactical-mono text-muted-gray text-xs mt-6 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div>SYSTEM ID: ARCH-2025</div>
          <div>VERSION: 1.0.0</div>
          <div>SECURITY: LEVEL 5</div>
          <div>CLEARANCE: AUTHORIZED</div>
        </motion.div>

        {/* Binary code animation */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
        >
          <div className="tactical-mono text-xs text-tactical-cyan">
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="whitespace-nowrap">
                {Array.from({ length: 50 }, () => 
                  Math.random() > 0.5 ? '1' : '0'
                ).join('')}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Loading indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-2 h-2 bg-neon-lime rounded-full"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
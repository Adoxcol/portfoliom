import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../../data/content';
import ScarletEye from '../motifs/ScarletEye';
import ChainLink from '../motifs/ChainLink';

interface LoadingScreenProps {
  onComplete: () => void;
}

const statuses = [
  'VERIFYING APPLICANT IDENTITY...',
  'CROSS-REFERENCING HUNT RECORDS...',
  'ACTIVATING SCARLET AUTHENTICATION...',
  'APPLYING ASSOCIATION SEAL...',
  'ACCESS GRANTED',
];

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        return Math.min(100, prev + 8 + Math.random() * 10);
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  const statusIndex = Math.min(statuses.length - 1, Math.floor((progress / 100) * statuses.length));

  return (
    <motion.div
      className="fixed inset-0 bg-ink z-50 flex flex-col items-center justify-center px-6 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      <motion.div
        className="mb-8"
        animate={{ scale: 0.5 + (progress / 100) * 0.6, opacity: 0.35 + (progress / 100) * 0.65 }}
        transition={{ duration: 0.2 }}
      >
        <ScarletEye size={140} />
      </motion.div>

      <div className="doc-heading text-2xl md:text-3xl text-blood-gradient mb-2 text-center">
        Hunter Association
      </div>
      <div className="doc-mono text-xs text-muted tracking-[0.2em] mb-10 text-center">
        LICENSE ISSUANCE PROTOCOL // {profile.licenseNumber}
      </div>

      <div className="w-72 max-w-full h-px bg-card relative overflow-hidden mb-4">
        <motion.div
          className="absolute inset-y-0 left-0 bg-ember scarlet-glow"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      <div className="flex items-center gap-3">
        <ChainLink className="opacity-40" />
        <motion.div
          key={statusIndex}
          className="doc-mono text-xs text-chain tracking-[0.15em]"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {statuses[statusIndex]}
        </motion.div>
        <ChainLink className="opacity-40 scale-x-[-1]" />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

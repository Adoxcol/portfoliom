import { motion } from 'framer-motion';

const TacticalBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Animated grid background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#00F0FF"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Scanline animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backgroundPosition: ['0px 0px', '0px 100px'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: `linear-gradient(
            0deg,
            transparent 50%,
            rgba(0, 240, 255, 0.03) 50%
          )`,
          backgroundSize: '100% 4px',
        }}
      />

      {/* Corner coordinates */}
      <div className="absolute top-4 left-4 tactical-mono text-xs text-muted-gray opacity-60">
        <div>X: 23.42° N</div>
        <div>Y: 90.41° E</div>
        <div>GRID: ACTIVE</div>
      </div>

      <div className="absolute top-4 right-4 tactical-mono text-xs text-muted-gray opacity-60 text-right">
        <div>SEC: LEVEL 5</div>
        <div>CLEARANCE: AUTH</div>
        <div>STATUS: ONLINE</div>
      </div>

      <div className="absolute bottom-4 left-4 tactical-mono text-xs text-muted-gray opacity-60">
        <div>SYSTEM: TACTICAL</div>
        <div>MODE: ARCHIVE</div>
        <div>PROTOCOL: ACTIVE</div>
      </div>

      <div className="absolute bottom-4 right-4 tactical-mono text-xs text-muted-gray opacity-60 text-right">
        <div>COORD: CLASSIFIED</div>
        <div>TIME: {new Date().toLocaleTimeString()}</div>
        <div>ZONE: UTC+6</div>
      </div>

      {/* Security level indicator */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 -rotate-90 tactical-mono text-xs text-neon-lime opacity-40 tracking-widest">
        SECURITY LEVEL 5
      </div>

      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 rotate-90 tactical-mono text-xs text-neon-lime opacity-40 tracking-widest">
        ARCHIVE ACCESS
      </div>

      {/* Blinking status indicator */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2"
        animate={{
          opacity: [1, 0.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-2 h-2 bg-neon-lime rounded-full"></div>
      </motion.div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default TacticalBackground;
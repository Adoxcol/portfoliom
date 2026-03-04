import { useState } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEnterArchive = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-12 xl:gap-20 items-center">
        {/* Left side - Name and Title */}
        <motion.div
          className="space-y-6 z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-2 md:space-y-4">
            <motion.h1 
              className="tactical-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-soft-white leading-none tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              MAHMOOD
            </motion.h1>
            
            <motion.h2 
              className="tactical-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-neon-lime leading-none tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              TAUHIDUL
            </motion.h2>
            
            <motion.div 
              className="tactical-mono text-xl md:text-2xl text-tactical-cyan tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              SYSTEM ARCHITECT
            </motion.div>
          </div>

          {/* System tags */}
          <motion.div 
            className="flex flex-wrap gap-3 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="tactical-label px-3 py-1 border border-tactical-cyan text-tactical-cyan">
              FULL STACK
            </div>
            <div className="tactical-label px-3 py-1 border border-tactical-magenta text-tactical-magenta">
              AI SYSTEMS
            </div>
            <div className="tactical-label px-3 py-1 border border-neon-lime text-neon-lime">
              SQA
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex gap-4 pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <a 
              href="https://github.com/Adoxcol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="tactical-border border border-muted-gray hover:border-neon-lime p-3 transition-colors duration-300 group"
            >
              <svg className="w-5 h-5 text-muted-gray group-hover:text-neon-lime" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/mahfuzur-rahman-60084326b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="tactical-border border border-muted-gray hover:border-tactical-cyan p-3 transition-colors duration-300 group"
            >
              <svg className="w-5 h-5 text-muted-gray group-hover:text-tactical-cyan" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a 
              href="mailto:mahmood.tauhidul@example.com" 
              className="tactical-border border border-muted-gray hover:border-tactical-magenta p-3 transition-colors duration-300 group"
            >
              <svg className="w-5 h-5 text-muted-gray group-hover:text-tactical-magenta" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v18.438h24v-18.438l-12 9.725z"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Right side - Status Panel */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div 
            className="bg-tactical-section tactical-border p-8 space-y-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Status indicators */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="tactical-label text-muted-gray">STATUS</span>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-neon-lime rounded-full"
                    animate={{
                      opacity: [1, 0.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <span className="tactical-mono text-neon-lime text-sm">ONLINE</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="tactical-label text-muted-gray">CLEARANCE</span>
                <span className="tactical-mono text-tactical-cyan text-sm">AUTHORIZED</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="tactical-label text-muted-gray">LOCATION</span>
                <span className="tactical-mono text-soft-white text-sm">DHAKA, BD</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="tactical-label text-muted-gray">SPECIALIZATION</span>
                <span className="tactical-mono text-tactical-magenta text-sm">FULL STACK / AI / SQA</span>
              </div>
            </div>

            {/* Horizontal divider */}
            <div className="h-px bg-muted-gray opacity-30"></div>

            {/* System stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="tactical-label text-muted-gray">YEARS ACTIVE</div>
                <div className="tactical-mono text-2xl text-neon-lime mt-1">5+</div>
              </div>
              <div className="text-center">
                <div className="tactical-label text-muted-gray">PROJECTS</div>
                <div className="tactical-mono text-2xl text-tactical-cyan mt-1">50+</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="w-full bg-transparent tactical-border border-2 border-neon-lime px-8 py-4 tactical-heading text-neon-lime hover:bg-neon-lime hover:text-tactical-black transition-all duration-300 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleEnterArchive}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">[ ENTER ARCHIVE ]</span>
            
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-neon-lime opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              animate={{
                opacity: isHovered ? 0.2 : 0,
              }}
            />
            
            {/* Border glow */}
            <motion.div
              className="absolute inset-0 border-2 border-neon-lime"
              animate={{
                boxShadow: isHovered 
                  ? '0 0 20px rgba(180, 240, 0, 0.5), 0 0 40px rgba(180, 240, 0, 0.3)' 
                  : '0 0 0px rgba(180, 240, 0, 0)',
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex flex-col items-center space-y-2"
        >
          <div className="tactical-mono text-xs text-muted-gray">SCROLL</div>
          <div className="w-px h-8 bg-gradient-to-b from-neon-lime to-transparent"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-tactical-section">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="tactical-heading text-4xl md:text-6xl text-soft-white mb-4">
            SYSTEM PROFILE
          </h2>
          <div className="w-24 h-px bg-neon-lime"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left side - Description */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="tactical-mono text-lg text-soft-white leading-relaxed space-y-4">
              <p>
                Full-stack engineer specializing in scalable web platforms and headless CMS architectures.
                Building high-performance applications using Next.js, React, and TypeScript with a focus on
                maintainable systems, strong type safety, and modern full-stack development practices.
              </p>
              
              <p>
                Expertise in AI and computer vision systems, including CNN-based classification models,
                real-time inference pipelines, and data-driven applications. Developing intelligent systems
                that combine machine learning, automation, and real-time processing to solve complex problems.
              </p>
              
              <p>
               Cloud-focused developer working with AWS infrastructure, containerized services, and modern
               deployment workflows. Engineering reliable systems with scalable APIs, optimized databases,
               and performant architectures designed for production environments.
              </p>
            </div>

            {/* Mission statement */}
            <motion.div 
              className="bg-tactical-card tactical-border p-6 mt-8"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="tactical-label text-neon-lime mb-3">MISSION OBJECTIVE</div>
              <div className="tactical-mono text-sm text-soft-white leading-relaxed">
                Design and implement cutting-edge systems that bridge artificial intelligence 
                with robust infrastructure, creating scalable solutions for complex technological challenges.
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - System Diagnostics */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-tactical-card tactical-border p-8 space-y-6">
              <div className="tactical-label text-tactical-cyan mb-4">SYSTEM DIAGNOSTICS</div>
              
              {/* Years Active */}
              <div className="flex items-center justify-between py-3 border-b border-muted-gray border-opacity-30">
                <span className="tactical-label text-muted-gray">YEARS ACTIVE</span>
                <div className="flex items-center gap-3">
                  <span className="tactical-mono text-2xl text-neon-lime">5+</span>
                  <div className="w-16 h-px bg-gradient-to-r from-neon-lime to-transparent"></div>
                </div>
              </div>

              {/* Stack */}
              <div className="flex items-center justify-between py-3 border-b border-muted-gray border-opacity-30">
                <span className="tactical-label text-muted-gray">STACK</span>
                <div className="text-right">
                  <div className="tactical-mono text-sm text-soft-white">Node.js • Python • C#</div>
                  <div className="tactical-mono text-xs text-muted-gray mt-1">React • TypeScript</div>
                </div>
              </div>

              {/* Cloud Providers */}
              <div className="flex items-center justify-between py-3 border-b border-muted-gray border-opacity-30">
                <span className="tactical-label text-muted-gray">CLOUD PROVIDERS</span>
                <div className="text-right">
                  <div className="tactical-mono text-sm text-tactical-cyan">AWS • Azure</div>
                  <div className="tactical-mono text-xs text-muted-gray mt-1">GCP • Vercel</div>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center justify-between py-3 border-b border-muted-gray border-opacity-30">
                <span className="tactical-label text-muted-gray">LANGUAGES</span>
                <div className="text-right">
                  <div className="tactical-mono text-sm text-tactical-magenta">JavaScript</div>
                  <div className="tactical-mono text-xs text-muted-gray mt-1">Python • C# • SQL</div>
                </div>
              </div>

              {/* Current Focus */}
              <div className="flex items-center justify-between py-3">
                <span className="tactical-label text-muted-gray">CURRENT FOCUS</span>
                <div className="text-right">
                  <div className="tactical-mono text-sm text-neon-lime">AI Systems</div>
                  <div className="tactical-mono text-xs text-muted-gray mt-1">LLM • DevOps • Cloud</div>
                </div>
              </div>
            </div>

            {/* System status */}
            <motion.div 
              className="bg-tactical-card tactical-border p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="tactical-label text-tactical-cyan">SYSTEM STATUS</span>
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
                  <span className="tactical-mono text-sm text-neon-lime">OPERATIONAL</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="tactical-mono text-xs text-muted-gray">CPU USAGE</span>
                  <span className="tactical-mono text-xs text-soft-white">24%</span>
                </div>
                <div className="flex justify-between">
                  <span className="tactical-mono text-xs text-muted-gray">MEMORY</span>
                  <span className="tactical-mono text-xs text-soft-white">8.2GB / 16GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="tactical-mono text-xs text-muted-gray">UPTIME</span>
                  <span className="tactical-mono text-xs text-soft-white">45 DAYS</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
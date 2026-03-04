import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const metrics: Metric[] = [
  { label: 'PROJECTS DEPLOYED', value: 47, suffix: '', color: 'text-neon-lime' },
  { label: 'SYSTEMS AUTOMATED', value: 23, suffix: '', color: 'text-tactical-cyan' },
  { label: 'APIS BUILT', value: 89, suffix: '', color: 'text-tactical-magenta' },
  { label: 'AI MODELS INTEGRATED', value: 15, suffix: '', color: 'text-neon-lime' },
];

const AnimatedCounter = ({ metric, index }: { metric: Metric; index: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = metric.value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, metric.value]);

  return (
    <motion.div
      ref={ref}
      className="text-center space-y-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="relative">
        <motion.div
          className={`tactical-mono text-6xl md:text-8xl font-bold ${metric.color}`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {count}{metric.suffix}
        </motion.div>
        
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 tactical-mono text-6xl md:text-8xl font-bold ${metric.color} blur-lg opacity-30`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        >
          {count}{metric.suffix}
        </motion.div>
      </div>
      
      <div className="tactical-label text-muted-gray tracking-widest">
        {metric.label}
      </div>
      
      {/* Progress indicator */}
      <div className="w-16 h-px bg-muted-gray mx-auto relative overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 ${metric.color.replace('text-', 'bg-')}`}
          initial={{ width: '0%' }}
          animate={{ width: isInView ? '100%' : '0%' }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const SystemMetrics = () => {
  return (
    <section id="metrics" className="py-32 bg-tactical-black">
      <div className="container mx-auto px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="tactical-heading text-4xl md:text-6xl text-soft-white mb-4">
            SYSTEM METRICS
          </h2>
          <div className="w-24 h-px bg-neon-lime mx-auto"></div>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {metrics.map((metric, index) => (
            <AnimatedCounter key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        {/* Additional system stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-tactical-section tactical-border p-6 text-center">
            <div className="tactical-label text-muted-gray mb-2">SYSTEM UPTIME</div>
            <div className="tactical-mono text-2xl text-neon-lime font-bold">99.9%</div>
          </div>
          
          <div className="bg-tactical-section tactical-border p-6 text-center">
            <div className="tactical-label text-muted-gray mb-2">RESPONSE TIME</div>
            <div className="tactical-mono text-2xl text-tactical-cyan font-bold">&lt;50ms</div>
          </div>
          
          <div className="bg-tactical-section tactical-border p-6 text-center">
            <div className="tactical-label text-muted-gray mb-2">ERROR RATE</div>
            <div className="tactical-mono text-2xl text-tactical-magenta font-bold">0.01%</div>
          </div>
          
          <div className="bg-tactical-section tactical-border p-6 text-center">
            <div className="tactical-label text-muted-gray mb-2">THROUGHPUT</div>
            <div className="tactical-mono text-2xl text-soft-white font-bold">10K/s</div>
          </div>
        </motion.div>

        {/* System status indicator */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="w-3 h-3 bg-neon-lime rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className="tactical-mono text-sm text-neon-lime">ALL SYSTEMS OPERATIONAL</span>
        </motion.div>
      </div>
    </section>
  );
};

export default SystemMetrics;
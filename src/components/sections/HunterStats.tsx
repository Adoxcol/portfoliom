import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { hunterStats } from '../../data/content';
import ChainDivider from '../motifs/ChainDivider';

interface Metric {
  label: string;
  value: number;
  colorClass: string;
}

const metrics: Metric[] = [
  { label: 'HUNTS CLEARED', value: hunterStats.huntsCleared, colorClass: 'text-ember' },
  { label: 'SYSTEMS AUTOMATED', value: hunterStats.systemsAutomated, colorClass: 'text-chain' },
  { label: 'APIS INTEGRATED', value: hunterStats.apisIntegrated, colorClass: 'text-gold' },
  { label: 'AI MODELS INTEGRATED', value: hunterStats.aiModelsIntegrated, colorClass: 'text-ember' },
];

const AnimatedCounter = ({ metric, index }: { metric: Metric; index: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = metric.value;
    const duration = 1600;
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
  }, [isInView, metric.value]);

  return (
    <motion.div
      ref={ref}
      className="text-center space-y-3"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className={`doc-mono text-5xl md:text-7xl font-bold ${metric.colorClass}`}>{count}</div>
      <div className="doc-label text-muted tracking-widest">{metric.label}</div>
    </motion.div>
  );
};

const HunterStats = () => {
  return (
    <section id="stats" className="snap-scene min-h-screen flex items-center py-24 bg-ink relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[32rem] h-[32rem] aura-field pointer-events-none opacity-50" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="doc-label text-gold mb-2">ASSOCIATION RECORDS</div>
          <h2 className="doc-heading text-3xl md:text-5xl text-bone">Hunter Stats</h2>
          <ChainDivider className="mt-4 w-32 mx-auto" tone="gold" />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {metrics.map((metric, index) => (
            <AnimatedCounter key={metric.label} metric={metric} index={index} />
          ))}
        </div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="license-border bg-card p-6 text-center">
            <div className="doc-label text-muted mb-2">UPTIME</div>
            <div className="doc-mono text-2xl text-ember font-bold">{hunterStats.uptime}</div>
          </div>
          <div className="license-border bg-card p-6 text-center">
            <div className="doc-label text-muted mb-2">RESPONSE TIME</div>
            <div className="doc-mono text-2xl text-chain font-bold">{hunterStats.responseTime}</div>
          </div>
          <div className="license-border bg-card p-6 text-center">
            <div className="doc-label text-muted mb-2">ERROR RATE</div>
            <div className="doc-mono text-2xl text-gold font-bold">{hunterStats.errorRate}</div>
          </div>
          <div className="license-border bg-card p-6 text-center">
            <div className="doc-label text-muted mb-2">THROUGHPUT</div>
            <div className="doc-mono text-2xl text-bone font-bold">{hunterStats.throughput}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HunterStats;

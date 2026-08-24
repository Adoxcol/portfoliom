import { useState } from 'react';
import { motion } from 'framer-motion';
import { nenAbilities, hunterStats, type NenAbility } from '../../data/content';
import ChainDivider from '../motifs/ChainDivider';

const categories: NenAbility['category'][] = ['AI', 'DevOps', 'Backend'];

const categoryClasses: Record<NenAbility['category'], {
  text: string;
  border: string;
  bg: string;
  activeButton: string;
  inactiveButton: string;
}> = {
  AI: {
    text: 'text-ember',
    border: 'border-ember/50',
    bg: 'bg-ember',
    activeButton: 'bg-ember text-ink border-ember',
    inactiveButton: 'border-ember/40 text-ember hover:bg-ember/10',
  },
  DevOps: {
    text: 'text-chain',
    border: 'border-chain/50',
    bg: 'bg-chain',
    activeButton: 'bg-chain text-ink border-chain',
    inactiveButton: 'border-chain/40 text-chain hover:bg-chain/10',
  },
  Backend: {
    text: 'text-gold',
    border: 'border-gold/50',
    bg: 'bg-gold',
    activeButton: 'bg-gold text-ink border-gold',
    inactiveButton: 'border-gold/40 text-gold hover:bg-gold/10',
  },
};

const AbilityCard = ({ ability, index }: { ability: NenAbility; index: number }) => {
  const tone = categoryClasses[ability.category];
  return (
    <motion.div
      className="license-border bg-card p-5 flex flex-col gap-4"
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <span className="doc-mono text-sm text-bone">{ability.name}</span>
        <span className={`doc-label text-[10px] px-2 py-0.5 border ${tone.border} ${tone.text}`}>
          {ability.category}
        </span>
      </div>
      <div className="doc-mono text-2xl font-bold text-gold">{ability.mastery}%</div>
      <div className="h-1 w-full bg-ink relative overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 ${tone.bg}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${ability.mastery}%` }}
          transition={{ duration: 0.9, delay: index * 0.04 + 0.2 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

const NenAbilities = () => {
  const [activeCategory, setActiveCategory] = useState<NenAbility['category'] | null>(null);
  const filtered = activeCategory ? nenAbilities.filter((a) => a.category === activeCategory) : nenAbilities;

  return (
    <section id="abilities" className="snap-scene min-h-screen flex items-center py-24 bg-ink relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[40rem] h-[40rem] aura-field pointer-events-none opacity-40" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="doc-label text-gold mb-2">NEN ABILITY GRID</div>
          <h2 className="doc-heading text-3xl md:text-5xl text-bone">Trained Techniques</h2>
          <ChainDivider className="mt-4 w-32 mx-auto" tone="scarlet" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`doc-label px-4 py-2 border transition-colors ${
              activeCategory === null ? 'bg-ember text-ink border-ember' : 'border-chain/30 text-chain hover:border-ember/50'
            }`}
          >
            ALL TECHNIQUES
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`doc-label px-4 py-2 border transition-colors ${
                activeCategory === category ? categoryClasses[category].activeButton : categoryClasses[category].inactiveButton
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((ability, index) => (
            <AbilityCard key={ability.name} ability={ability} index={index} />
          ))}
        </div>

        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="doc-mono text-sm text-muted">
            OVERALL MASTERY: <span className="text-gold font-bold">{hunterStats.overallMastery}%</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default NenAbilities;

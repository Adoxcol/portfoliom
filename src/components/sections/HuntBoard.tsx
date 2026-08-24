import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ExternalLink, Github, ChevronRight } from 'lucide-react';
import { hunts, type Hunt } from '../../data/content';
import ChainDivider from '../motifs/ChainDivider';
import ChainLink from '../motifs/ChainLink';

const categories = ['ALL', 'AI', 'FULL-STACK', 'EXTENSION'];

const HuntCard = ({ hunt, index, onClick }: { hunt: Hunt; index: number; onClick: () => void }) => (
  <motion.article
    className="group relative license-border bg-ink hover:border-ember/60 hover:scarlet-glow transition-all duration-300 cursor-pointer p-6"
    initial={{ opacity: 0, y: 28, rotate: -2 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    onClick={onClick}
  >
    <div className="flex justify-between items-start mb-4">
      <span className="doc-label px-2 py-0.5 border border-gold/50 text-gold">{hunt.rank}</span>
      <span
        className={`doc-mono text-[10px] px-2 py-0.5 border ${
          hunt.status === 'CLEARED' ? 'text-ember border-ember' : 'text-muted border-muted'
        }`}
      >
        {hunt.status}
      </span>
    </div>

    <h3 className="text-xl font-bold text-bone mb-2 group-hover:text-ember transition-colors">{hunt.name}</h3>
    <p className="text-muted text-sm mb-4 line-clamp-2">{hunt.summary}</p>

    <div className="flex flex-wrap gap-2">
      {hunt.techStack.map((tech) => (
        <span key={tech} className="doc-mono text-[10px] text-chain border border-chain/30 px-1.5 py-0.5">
          {tech}
        </span>
      ))}
    </div>

    <div className="mt-4 doc-mono text-[10px] text-muted">CASE_{hunt.id.toString().padStart(3, '0')}</div>
  </motion.article>
);

const HuntModal = ({ hunt, onClose }: { hunt: Hunt; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-ink/90 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.97, opacity: 0 }}
      onClick={(event) => event.stopPropagation()}
      className="license-border bg-ink w-full max-w-3xl max-h-[88vh] overflow-y-auto relative"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 text-muted hover:text-scarlet border border-transparent hover:border-scarlet transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="p-6 md:p-10 space-y-8">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="doc-label px-2 py-1 border border-gold/50 text-gold">{hunt.rank}</span>
            <span className="doc-mono text-xs px-2 py-1 border border-ember/50 text-ember">{hunt.status}</span>
            <span className="doc-mono text-xs text-muted">CASE_{hunt.id.toString().padStart(3, '0')}</span>
          </div>
          <h2 className="doc-heading text-3xl md:text-4xl text-bone mb-4">{hunt.name}</h2>
          <p className="text-bone/80 leading-relaxed">{hunt.longSummary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="license-border bg-card p-5">
            <div className="doc-label text-chain mb-2">OBJECTIVE</div>
            <p className="text-sm text-bone/80 leading-relaxed">{hunt.objective}</p>
          </div>
          <div className="license-border bg-card p-5">
            <div className="doc-label text-scarlet mb-2">ROLE</div>
            <p className="text-sm text-bone/80 leading-relaxed">{hunt.role}</p>
          </div>
        </div>

        <div>
          <h4 className="text-gold font-bold mb-3 flex items-center gap-2">
            <ChevronRight className="w-4 h-4" /> OBSTACLES ENCOUNTERED
          </h4>
          <ul className="space-y-2">
            {hunt.obstacles.map((obstacle) => (
              <li key={obstacle} className="flex items-start gap-3 text-sm text-muted">
                <ChainLink className="mt-1 shrink-0 opacity-70" />
                {obstacle}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-bold mb-3 flex items-center gap-2">
            <ChevronRight className="w-4 h-4" /> TECH STACK
          </h4>
          <div className="flex flex-wrap gap-2">
            {hunt.techStack.map((tech) => (
              <span key={tech} className="doc-mono text-xs text-bone border border-border bg-card px-2 py-1">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <div className="doc-label text-gold mb-2">REWARD</div>
          <p className="text-sm text-bone/80 leading-relaxed">{hunt.reward}</p>
        </div>

        <div className="flex flex-wrap gap-4 border-t border-border pt-6">
          {hunt.githubUrl && (
            <a
              href={hunt.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-border text-bone hover:border-scarlet hover:text-scarlet transition-all"
            >
              <Github className="w-4 h-4" />
              <span>VIEW_SOURCE</span>
            </a>
          )}
          {hunt.liveUrl && (
            <a
              href={hunt.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-ember/40 text-ember hover:bg-ember/10 hover:scarlet-glow transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>LIVE_DEMO</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const HuntBoard = () => {
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState<Hunt | null>(null);

  const filtered = filter === 'ALL' ? hunts : hunts.filter((h) => h.category === filter);

  return (
    <section id="hunts" className="snap-scene min-h-screen py-24 bg-section relative overflow-hidden">
      <div className="absolute -right-32 -top-10 w-96 h-96 aura-field pointer-events-none opacity-40" />
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div>
            <div className="doc-label text-gold mb-2">HUNTER BOARD // OPEN CONTRACTS</div>
            <h2 className="doc-heading text-3xl md:text-5xl text-bone">Hunts</h2>
            <ChainDivider className="mt-4 w-32" tone="gold" />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 doc-mono text-xs border transition-colors ${
                  filter === cat ? 'border-ember text-ember bg-ember/10' : 'border-border text-muted hover:text-bone'
                }`}
              >
                [{cat}]
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((hunt, index) => (
            <HuntCard key={hunt.id} hunt={hunt} index={index} onClick={() => setSelected(hunt)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <HuntModal hunt={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default HuntBoard;

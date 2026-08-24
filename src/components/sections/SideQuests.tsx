import { motion } from 'framer-motion';
import { sideQuests, type SideQuest } from '../../data/content';
import ChainDivider from '../motifs/ChainDivider';

const statusClasses: Record<SideQuest['status'], string> = {
  ACTIVE: 'text-ember border-ember bg-ember/10',
  'R&D': 'text-chain border-chain bg-chain/10',
  ITERATING: 'text-gold border-gold bg-gold/10',
};

const SideQuests = () => {
  return (
    <section id="quests" className="snap-scene min-h-screen py-24 bg-ink relative overflow-hidden">
      <div className="absolute -left-24 bottom-0 w-96 h-96 aura-field pointer-events-none opacity-40" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="doc-label text-gold mb-2">PERSONAL R&D // SIDE QUEST LOG</div>
          <h2 className="doc-heading text-3xl md:text-5xl text-bone">Side Quests</h2>
          <p className="doc-mono text-sm text-muted mt-4 max-w-2xl">
            Outside client and production work, a personal lab for side experiments, interface concepts, mini
            tools, and AI-driven ideas.
          </p>
          <ChainDivider className="mt-4 w-32" tone="chain" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sideQuests.map((quest, index) => (
            <motion.article
              key={quest.id}
              className="license-border bg-card p-6 relative overflow-hidden"
              initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="doc-mono text-xs text-muted mb-2">{quest.classification}</div>
                  <h3 className="text-xl font-bold text-bone">{quest.title}</h3>
                </div>
                <span className={`shrink-0 px-2 py-1 border text-[10px] doc-mono ${statusClasses[quest.status]}`}>
                  {quest.status}
                </span>
              </div>

              <p className="text-muted text-sm leading-relaxed mb-4">{quest.summary}</p>

              <div className="border-l-2 border-scarlet/40 pl-3 mb-4">
                <div className="doc-label text-scarlet mb-1 text-[10px]">MOTIVE</div>
                <p className="doc-mono text-xs text-bone/85 leading-relaxed">{quest.motive}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {quest.tags.map((tag) => (
                  <span key={tag} className="doc-mono text-[10px] text-chain border border-chain/30 px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SideQuests;

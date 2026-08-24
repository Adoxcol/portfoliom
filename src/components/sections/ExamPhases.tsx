import { motion } from 'framer-motion';
import { examPhases, type ExamPhase } from '../../data/content';
import ChainDivider from '../motifs/ChainDivider';

const statusClasses: Record<ExamPhase['status'], string> = {
  LAUNCHED: 'text-chain border-chain bg-chain/10',
  PROMOTED: 'text-gold border-gold bg-gold/10',
  ACTIVE: 'text-ember border-ember bg-ember/10',
};

const ExamPhases = () => {
  return (
    <section id="phases" className="snap-scene min-h-screen py-24 bg-section relative overflow-hidden">
      <div className="absolute right-0 top-1/3 w-96 h-96 aura-field pointer-events-none opacity-40" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="doc-label text-gold mb-2">CAREER PROGRESS // EXAM LOG</div>
          <h2 className="doc-heading text-3xl md:text-5xl text-bone">Hunter Exam Phases</h2>
          <p className="doc-mono text-sm text-muted mt-4 max-w-2xl">
            A timeline of how the path evolved: from internship exposure, to junior-level execution, to building
            full-stack products with LLM capabilities in a production environment.
          </p>
          <ChainDivider className="mt-4 w-32" tone="scarlet" />
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          <motion.div
            className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-ember via-chain/50 to-transparent hidden sm:block"
            style={{ transformOrigin: 'top' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.2 }}
          />

          <div className="space-y-8">
            {examPhases.map((phase, index) => (
              <motion.article
                key={phase.code}
                className="relative pl-0 sm:pl-14"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="hidden sm:flex absolute left-0 top-5 w-10 h-10 rounded-full border border-ember/50 bg-ink items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-ember scarlet-glow" />
                </div>

                <div className="license-border bg-card p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <div className="doc-mono text-xs text-muted mb-2">
                        {phase.code} // {phase.period}
                      </div>
                      <h3 className="text-2xl font-bold text-bone">{phase.title}</h3>
                      <div className="doc-mono text-sm text-gold mt-2">{phase.organization}</div>
                    </div>
                    <span className={`shrink-0 px-3 py-1 border text-xs doc-mono ${statusClasses[phase.status]}`}>
                      {phase.status}
                    </span>
                  </div>

                  <p className="text-muted text-sm leading-relaxed mb-5">{phase.summary}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {phase.impact.map((item) => (
                      <div key={item} className="border border-border bg-ink/60 p-3 doc-mono text-xs text-bone/85">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamPhases;

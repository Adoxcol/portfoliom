import { motion } from 'framer-motion';

interface MissionEntry {
  code: string;
  period: string;
  title: string;
  organization: string;
  status: 'LAUNCHED' | 'PROMOTED' | 'ACTIVE';
  summary: string;
  impact: string[];
}

const missionLog: MissionEntry[] = [
  {
    code: 'LOG_01',
    period: '2025 // FEB -> MAY',
    title: 'Software Engineering Intern',
    organization: 'BinduLogic LLC',
    status: 'LAUNCHED',
    summary: 'Entered the industry through an internship focused on learning delivery rhythm, working across real product requirements, and turning theory into shipped work.',
    impact: [
      'Worked inside a live software team environment',
      'Built confidence with practical development workflows',
      'Moved from learning mode into production contribution'
    ],
  },
  {
    code: 'LOG_02',
    period: '2025 -> 2026 // MAY -> MAR',
    title: 'Junior Software Developer',
    organization: 'BinduLogic LLC',
    status: 'PROMOTED',
    summary: 'Transitioned from intern to junior developer after the internship period, taking on more ownership and contributing with stronger delivery expectations.',
    impact: [
      'Expanded responsibility beyond internship scope',
      'Worked more independently on implementation tasks',
      'Built momentum as a full-time engineering contributor'
    ],
  },
  {
    code: 'LOG_03',
    period: '2026-03-27',
    title: 'Full Stack LLM Developer',
    organization: 'Remote Integrity',
    status: 'ACTIVE',
    summary: 'Joined Remote Integrity to work at the intersection of full-stack engineering and LLM-powered systems, building products where AI capabilities connect directly to real workflows.',
    impact: [
      'Shifted into AI-driven product delivery',
      'Worked on full-stack systems with LLM integration',
      'Focused on higher-leverage automation and intelligent workflows'
    ],
  },
];

const statusClasses: Record<MissionEntry['status'], string> = {
  LAUNCHED: 'text-tactical-cyan border-tactical-cyan bg-tactical-cyan/10',
  PROMOTED: 'text-tactical-magenta border-tactical-magenta bg-tactical-magenta/10',
  ACTIVE: 'text-neon-lime border-neon-lime bg-neon-lime/10',
};

const operatorImageUrl = '/images/operatorImageUrl.png';

const OperatorProfile = () => {
  return (
    <motion.aside
      className="bg-tactical-card tactical-border p-6 overflow-hidden h-full min-h-[32rem] lg:min-h-full"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <div className="relative mx-auto w-full h-full rounded-[2rem] overflow-hidden border border-neon-lime/15 bg-tactical-black/70 shadow-[0_0_32px_rgba(180,240,0,0.08)]">
        <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-neon-lime/70 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(180,240,0,0.05))]" />
        <div className="absolute inset-0 opacity-15 pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:100%_6px]" />

        <div className="absolute inset-x-0 top-0 z-20 p-5 flex items-center justify-between tactical-mono text-[11px] tracking-[0.22em]">
          <span className="text-neon-lime">OPERATOR_PROFILE</span>
          <span className="text-muted-gray">MISSION_VIEW</span>
        </div>

        {operatorImageUrl ? (
          <img
            src={operatorImageUrl}
            alt="Mission log operator portrait"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-5 top-14 bottom-5 border border-dashed border-neon-lime/25 bg-tactical-black/40 flex items-center justify-center">
            <div className="text-center px-6">
              <div className="tactical-label text-tactical-cyan mb-3">IMAGE PLACEHOLDER</div>
              <div className="tactical-heading text-2xl text-soft-white mb-3">DROP PORTRAIT HERE</div>
              <div className="tactical-mono text-xs text-muted-gray leading-relaxed">
                Recommended aspect ratio: 3:4
                <br />
                Recommended export: 1536 x 2048 px
              </div>
            </div>
          </div>
        )}

        <div className="absolute left-4 right-4 bottom-4 z-20 flex items-center justify-between gap-4 border border-muted-gray/20 bg-tactical-black/70 backdrop-blur-sm p-3 tactical-mono text-[10px]">
          <span className="text-muted-gray">FORMAT // PORTRAIT_3:4</span>
          <span className="text-neon-lime">READY</span>
        </div>

        <div className="absolute inset-y-0 left-0 z-20 w-px bg-gradient-to-b from-transparent via-tactical-cyan/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 z-20 w-px bg-gradient-to-b from-transparent via-tactical-magenta/30 to-transparent" />
      </div>
    </motion.aside>
  );
};

const MissionLog = () => {
  return (
    <section id="mission" className="py-24 bg-tactical-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl">
            <div className="tactical-label text-neon-lime mb-3">CAREER_PROGRESS_TRACK</div>
            <h2 className="tactical-heading text-4xl md:text-5xl text-soft-white mb-4">
              MISSION LOG
            </h2>
            <p className="tactical-mono text-sm md:text-base text-muted-gray leading-relaxed">
              A tactical timeline of how the workflow evolved: from internship exposure, to junior-level execution,
              to building full-stack products with LLM capabilities in a production environment.
            </p>
          </div>

          <motion.div
            className="bg-tactical-card tactical-border p-5 min-w-[280px]"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="tactical-label text-tactical-cyan">PATH_STATUS</span>
              <span className="tactical-mono text-xs text-muted-gray">LIVE_TRACKING</span>
            </div>
            <div className="space-y-2 tactical-mono text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-gray">START POINT</span>
                <span className="text-soft-white text-right">BinduLogic LLC // 2025</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-gray">CURRENT NODE</span>
                <span className="text-neon-lime text-right">Remote Integrity // 2026</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-gray">ROLE VECTOR</span>
                <span className="text-tactical-magenta text-right">Full Stack + LLM Systems</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-stretch">
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-neon-lime/70 via-tactical-cyan/40 to-transparent hidden sm:block" />

            <div className="space-y-8">
              {missionLog.map((entry, index) => (
                <motion.article
                  key={entry.code}
                  className="relative pl-0 sm:pl-14"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="hidden sm:flex absolute left-0 top-5 w-10 h-10 rounded-full border border-neon-lime/40 bg-tactical-black items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-neon-lime shadow-[0_0_12px_rgba(180,240,0,0.6)]" />
                  </div>

                  <div className="bg-tactical-card tactical-border border border-muted-gray/20 p-6 group relative overflow-hidden">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-neon-lime/5 via-transparent to-transparent pointer-events-none" />

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4 relative z-10">
                      <div>
                        <div className="tactical-mono text-xs text-muted-gray mb-2">
                          {entry.code} // {entry.period}
                        </div>
                        <h3 className="text-2xl font-bold text-soft-white group-hover:text-neon-lime transition-colors duration-300">
                          {entry.title}
                        </h3>
                        <div className="tactical-mono text-sm text-tactical-cyan mt-2">
                          {entry.organization}
                        </div>
                      </div>

                      <span className={`shrink-0 px-3 py-1 border text-xs tactical-mono ${statusClasses[entry.status]}`}>
                        {entry.status}
                      </span>
                    </div>

                    <p className="text-muted-gray text-sm leading-relaxed mb-5 relative z-10">
                      {entry.summary}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
                      {entry.impact.map((item) => (
                        <div
                          key={item}
                          className="border border-muted-gray/20 bg-tactical-black/40 p-3 tactical-mono text-xs text-soft-white/85"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <OperatorProfile />
        </div>
      </div>
    </section>
  );
};

export default MissionLog;

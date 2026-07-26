import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

interface HobbyCreation {
  id: number;
  title: string;
  status: 'ACTIVE' | 'R&D' | 'ITERATING';
  classification: string;
  summary: string;
  whyItExists: string;
  tags: string[];
  stack: string[];
  workflow: string[];
  outcome: string;
}

const hobbyCreations: HobbyCreation[] = [
  {
    id: 1,
    title: 'Spotify2Nicotine',
    status: 'ACTIVE',
    classification: 'MUSIC_AUTOMATION',
    summary: 'A plugin and GUI workflow focused on collecting and downloading FLAC music for Spotify playlists in a cleaner local-library setup.',
    whyItExists: 'I wanted a smoother way to bridge playlist discovery with high-quality local listening, instead of manually hunting tracks one by one.',
    tags: ['Plugin', 'GUI', 'FLAC', 'Spotify Playlists'],
    stack: ['Spotify APIs', 'FLAC Workflow', 'Desktop GUI', 'Automation'],
    workflow: [
      'Read and parse Spotify playlist data',
      'Match tracks against local or downloadable FLAC sources',
      'Use a GUI flow to review, fetch, and organize music',
      'Turn playlists into a cleaner local listening library'
    ],
    outcome: 'A side build focused on making playlist discovery feel compatible with a higher-quality personal listening setup.',
  },
  {
    id: 2,
    title: 'Guitar Tabs Analyze Helper',
    status: 'ITERATING',
    classification: 'MUSIC_EDTECH',
    summary: 'A visual guitar practice helper that analyzes tabs, surfaces proper exercises, and makes it easier to understand what to play and how to improve.',
    whyItExists: 'The goal was to turn raw tabs into something more teachable, with visual guidance and practice structure instead of guesswork.',
    tags: ['Tab Analysis', 'Exercises', 'Visual Helper', 'Practice'],
    stack: ['Tab Parsing', 'Visual Guidance', 'Practice Logic', 'Music Learning'],
    workflow: [
      'Analyze tab structure and identify playable patterns',
      'Highlight exercises that support technique improvement',
      'Provide visual cues for timing, finger flow, and repetition',
      'Turn static tabs into a guided practice experience'
    ],
    outcome: 'A more structured way to bridge tab reading with actual technique improvement and consistent guitar practice.',
  },
  {
    id: 3,
    title: 'SizeLens',
    status: 'R&D',
    classification: 'FIT_VISION',
    summary: 'A measurement helper that estimates torso sizing and related clothing fit data to guide T-shirt size selection more accurately.',
    whyItExists: 'This came from the idea that sizing should feel more measurable and less like trial-and-error, especially for fast personal fit checks.',
    tags: ['Computer Vision', 'Sizing', 'Torso Measurement', 'Fit Tech'],
    stack: ['Computer Vision', 'Body Measurement Logic', 'Sizing Model', 'Fit Guidance'],
    workflow: [
      'Estimate torso-related measurements from visual input',
      'Map measurements to clothing-size heuristics',
      'Generate more useful size suggestions than generic charts',
      'Explore fit-tech ideas through lightweight vision tooling'
    ],
    outcome: 'An early R&D concept around making clothing fit suggestions feel more precise and data-informed.',
  },
  {
    id: 4,
    title: 'Velour',
    status: 'ACTIVE',
    classification: 'AI_CREATIVE_TOOLS',
    summary: 'A poem formatter and background generator that uses ComfyUI and local models to analyze emotional tone and create matching poem visuals.',
    whyItExists: 'I wanted poems to feel more alive visually, with formatting, emotional analysis, and generated backgrounds that reflect the feeling of the writing.',
    tags: ['ComfyUI', 'Local Models', 'Poetry', 'Background Generation'],
    stack: ['ComfyUI', 'Local Models', 'Poem Analysis', 'Image Generation'],
    workflow: [
      'Analyze poem mood, tone, and emotional direction',
      'Format the poem into a cleaner presentational layout',
      'Generate background imagery with ComfyUI and local models',
      'Pair written emotion with visual atmosphere'
    ],
    outcome: 'A creative AI tool that turns poetry into a more complete visual and emotional presentation experience.',
  },
];

const statusStyles: Record<HobbyCreation['status'], string> = {
  ACTIVE: 'text-neon-lime border-neon-lime bg-neon-lime/10',
  'R&D': 'text-tactical-cyan border-tactical-cyan bg-tactical-cyan/10',
  ITERATING: 'text-tactical-magenta border-tactical-magenta bg-tactical-magenta/10',
};

const HobbyModal = ({ creation, onClose }: { creation: HobbyCreation; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-tactical-black/90 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.97, opacity: 0 }}
      onClick={(event) => event.stopPropagation()}
      className="bg-tactical-black border border-neon-lime/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-[0_0_30px_rgba(180,240,0,0.1)]"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 text-muted-gray hover:text-neon-lime border border-transparent hover:border-neon-lime transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative border-b md:border-b-0 md:border-r border-muted-gray/20 p-8 bg-tactical-card/40">
          <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(circle_at_25%_25%,rgba(180,240,0,0.14),transparent_35%),linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_65%)]" />

          <div className="relative z-10">
            <span className={`text-xs px-2 py-1 font-mono border inline-block mb-4 ${statusStyles[creation.status]}`}>
              {creation.status}
            </span>
            <div className="tactical-mono text-xs text-muted-gray mb-2">
              HOBBY_CASE // {creation.classification}
            </div>
            <h3 className="text-3xl font-bold text-soft-white mb-4">{creation.title}</h3>
            <p className="text-soft-white/80 text-sm leading-relaxed mb-6">{creation.summary}</p>

            <div className="space-y-3">
              <div className="tactical-label text-tactical-cyan">WHY_I_BUILD_THIS</div>
              <p className="tactical-mono text-sm text-soft-white/85 leading-relaxed">
                {creation.whyItExists}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h4 className="text-tactical-cyan font-bold mb-3 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" /> STACK
            </h4>
            <div className="flex flex-wrap gap-2">
              {creation.stack.map((item) => (
                <span key={item} className="text-xs text-soft-white font-mono border border-muted-gray/30 bg-muted-gray/10 px-2 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-tactical-cyan font-bold mb-3 flex items-center gap-2">
              <ChevronRight className="w-4 h-4" /> WORKFLOW
            </h4>
            <ul className="space-y-2">
              {creation.workflow.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-gray">
                  <span className="w-1.5 h-1.5 mt-1.5 bg-neon-lime/50 rotate-45" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-muted-gray/20 pt-6">
            <div className="tactical-label text-tactical-magenta mb-2">OUTCOME</div>
            <p className="text-sm text-soft-white/80 leading-relaxed">{creation.outcome}</p>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const HobbyCreations = () => {
  const [selectedCreation, setSelectedCreation] = useState<HobbyCreation | null>(null);

  return (
    <section id="hobby" className="py-24 bg-tactical-section relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl">
            <div className="tactical-label text-tactical-cyan mb-3">PERSONAL_R_AND_D</div>
            <h2 className="tactical-heading text-4xl md:text-5xl text-soft-white mb-4">
              HOBBY CREATIONS
            </h2>
            <p className="tactical-mono text-sm md:text-base text-muted-gray leading-relaxed">
              Outside client and production work, I keep a personal lab for side experiments,
              interface concepts, mini tools, and AI-driven ideas that help me explore new build directions.
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
              <span className="tactical-label text-neon-lime">LAB_STATUS</span>
              <span className="tactical-mono text-xs text-muted-gray">SIDE_BUILD_CHANNEL</span>
            </div>
            <div className="space-y-2 tactical-mono text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-gray">FOCUS</span>
                <span className="text-soft-white text-right">Creative engineering experiments</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-gray">MODE</span>
                <span className="text-neon-lime text-right">ACTIVE ITERATION</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-gray">OUTPUT</span>
                <span className="text-tactical-cyan text-right">Tools / Interfaces / Prototypes</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hobbyCreations.map((creation, index) => (
            <motion.article
              key={creation.title}
              className="bg-tactical-black tactical-border border border-muted-gray/20 p-6 relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              onClick={() => setSelectedCreation(creation)}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-neon-lime/5 via-transparent to-transparent pointer-events-none" />

              <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
                <div>
                  <div className="tactical-mono text-xs text-muted-gray mb-2">
                    CLASSIFICATION // {creation.classification}
                  </div>
                  <h3 className="text-2xl font-bold text-soft-white group-hover:text-neon-lime transition-colors duration-300">
                    {creation.title}
                  </h3>
                </div>

                <span className={`shrink-0 px-3 py-1 border text-xs tactical-mono ${statusStyles[creation.status]}`}>
                  {creation.status}
                </span>
              </div>

              <p className="text-muted-gray text-sm leading-relaxed mb-4 relative z-10">
                {creation.summary}
              </p>

              <div className="bg-tactical-card/60 border border-muted-gray/20 p-4 mb-4 relative z-10">
                <div className="tactical-label text-tactical-magenta mb-2">WHY_I_BUILD_THIS</div>
                <p className="tactical-mono text-sm text-soft-white/85 leading-relaxed">
                  {creation.whyItExists}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 relative z-10">
                {creation.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-tactical-cyan font-mono border border-tactical-cyan/25 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-2 tactical-mono text-xs text-neon-lime relative z-10">
                <span>OPEN_HOBBY_CASE</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCreation && (
          <HobbyModal
            creation={selectedCreation}
            onClose={() => setSelectedCreation(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default HobbyCreations;

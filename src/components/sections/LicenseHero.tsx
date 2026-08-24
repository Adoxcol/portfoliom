import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { profile } from '../../data/content';
import SealBadge from '../motifs/SealBadge';
import ChainDivider from '../motifs/ChainDivider';
import ScarletEye from '../motifs/ScarletEye';
import JudgmentPendant from '../motifs/JudgmentPendant';

const LicenseHero = () => {
  const scrollToNext = () => {
    document.getElementById('dossier')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="license" className="snap-scene min-h-screen flex items-center justify-center relative py-20 overflow-hidden">
      <div className="absolute inset-0 aura-field pointer-events-none" />
      <ScarletEye size={480} className="absolute -right-24 top-1/2 -translate-y-1/2 opacity-[0.12] pointer-events-none hidden md:block" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-7 -left-7 md:-top-9 md:-left-9 z-20 flex flex-col items-center">
            <motion.div
              className="animate-seal-stamp"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <SealBadge label={profile.status} tone="scarlet" size={92} />
            </motion.div>
            <JudgmentPendant length={100} className="hidden sm:flex" />
          </div>

          {/* Gradient frame */}
          <div className="p-px bg-gradient-to-br from-gold via-ember to-blood relative">
            <div className="bg-card/85 backdrop-blur-sm p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian/40 pointer-events-none" />

              <motion.div
                className="doc-label text-gold mb-2 text-right relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                HUNTER ASSOCIATION // OFFICIAL LICENSE
              </motion.div>
              <div className="doc-mono text-xs text-muted mb-8 text-right relative">
                NO. {profile.licenseNumber}
              </div>

              <motion.h1
                className="doc-heading text-blood-gradient text-4xl sm:text-5xl md:text-6xl leading-tight mb-2 relative animate-flicker"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                {profile.name}
              </motion.h1>

              <motion.div
                className="doc-mono text-lg md:text-xl text-ember mb-6 relative"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {profile.title} — {profile.company}
              </motion.div>

              <ChainDivider className="mb-6 relative" tone="gold" />

              <motion.div
                className="flex flex-wrap gap-3 mb-8 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {profile.specializations.map((spec) => (
                  <span key={spec} className="doc-label px-3 py-1 border border-chain/40 text-chain">
                    {spec}
                  </span>
                ))}
              </motion.div>

              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 relative"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              >
                <div>
                  <div className="doc-label text-muted mb-1">LOCATION</div>
                  <div className="doc-mono text-sm text-bone">{profile.location}</div>
                </div>
                <div>
                  <div className="doc-label text-muted mb-1">ACTIVE SINCE</div>
                  <div className="doc-mono text-sm text-bone">{profile.yearsActive} yr</div>
                </div>
                <div>
                  <div className="doc-label text-muted mb-1">HUNTS CLEARED</div>
                  <div className="doc-mono text-sm text-gold">{profile.huntsCleared}</div>
                </div>
                <div>
                  <div className="doc-label text-muted mb-1">STATUS</div>
                  <div className="doc-mono text-sm text-ember">{profile.status}</div>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-3 relative"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.25 }}
              >
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="license-border p-3 text-chain hover:text-ember hover:border-ember/60 hover:scarlet-glow transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="license-border p-3 text-chain hover:text-ember hover:border-ember/60 hover:scarlet-glow transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${profile.social.email}`}
                  className="license-border p-3 text-chain hover:text-ember hover:border-ember/60 hover:scarlet-glow transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-ember transition-colors z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to dossier"
      >
        <span className="doc-label text-xs">DOSSIER</span>
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    </section>
  );
};

export default LicenseHero;

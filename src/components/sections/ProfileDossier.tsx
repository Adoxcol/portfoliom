import { motion } from 'framer-motion';
import { profile } from '../../data/content';
import ChainDivider from '../motifs/ChainDivider';

const ProfileDossier = () => {
  return (
    <section id="dossier" className="snap-scene min-h-screen flex items-center py-24 bg-section relative overflow-hidden">
      <div className="absolute -left-32 top-0 w-96 h-96 aura-field pointer-events-none opacity-60" />
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <div className="doc-label text-gold mb-2">CASE FILE // OPERATOR DOSSIER</div>
          <h2 className="doc-heading text-3xl md:text-5xl text-bone">Profile Dossier</h2>
          <ChainDivider className="mt-4 w-32" tone="chain" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12">
          <motion.div
            className="space-y-5 doc-mono text-base text-bone/90 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {profile.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            <div className="license-border bg-gradient-to-br from-card to-obsidian/60 p-6 mt-6 relative">
              <div className="absolute top-0 left-0 w-8 h-px bg-ember" />
              <div className="doc-label text-ember mb-2">MISSION OBJECTIVE</div>
              <div className="text-sm text-bone/85 leading-relaxed">{profile.mission}</div>
            </div>
          </motion.div>

          <motion.div
            className="license-border bg-card p-6 space-y-4 h-fit"
            initial={{ opacity: 0, x: 30, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="doc-label text-gold mb-2">EQUIPMENT MANIFEST</div>

            {[
              ['CORE STACK', profile.stack.core.join(' • ')],
              ['FRONTEND', profile.stack.frontend.join(' • ')],
              ['CLOUD PROVIDERS', profile.stack.cloud.join(' • ')],
              ['LANGUAGES', profile.stack.languages.join(' • ')],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 py-2 border-b border-border/60 last:border-b-0">
                <span className="doc-label text-muted">{label}</span>
                <span className="doc-mono text-sm text-bone">{value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileDossier;

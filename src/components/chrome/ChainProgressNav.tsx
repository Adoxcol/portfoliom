import { useState, type RefObject } from 'react';
import { motion } from 'framer-motion';
import {
  ScrollText,
  UserRound,
  Sparkles,
  Scroll,
  FlaskConical,
  ListChecks,
  Gauge,
  Radio,
} from 'lucide-react';
import { useSectionInView } from '../../hooks/useSectionInView';
import ChainLink from '../motifs/ChainLink';

const navItems = [
  { id: 'license', label: 'LICENSE', icon: ScrollText },
  { id: 'dossier', label: 'DOSSIER', icon: UserRound },
  { id: 'abilities', label: 'NEN', icon: Sparkles },
  { id: 'hunts', label: 'HUNTS', icon: Scroll },
  { id: 'quests', label: 'SIDE QUESTS', icon: FlaskConical },
  { id: 'phases', label: 'EXAM LOG', icon: ListChecks },
  { id: 'stats', label: 'STATS', icon: Gauge },
  { id: 'contact', label: 'TRANSMIT', icon: Radio },
];

const sectionIds = navItems.map((item) => item.id);

interface ChainProgressNavProps {
  containerRef: RefObject<HTMLElement>;
}

const ChainProgressNav = ({ containerRef }: ChainProgressNavProps) => {
  const activeId = useSectionInView(containerRef, sectionIds);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-center">
      {navItems.map((item, index) => {
        const isActive = activeId === item.id;
        return (
          <div key={item.id} className="relative flex flex-col items-center">
            {index > 0 && (
              <ChainLink orientation="vertical" className="opacity-40" color="rgb(var(--color-chain))" />
            )}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {hoveredId === item.id && (
                <motion.span
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-full mr-3 whitespace-nowrap doc-label text-bone bg-ink/90 border border-border px-2 py-1"
                >
                  {item.label}
                </motion.span>
              )}
              <button
                onClick={() => scrollToSection(item.id)}
                aria-label={item.label}
                aria-current={isActive}
                className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'border-ember bg-ember/15 scarlet-glow scale-110'
                    : 'border-chain/30 bg-ink/60 hover:border-gold/60'
                }`}
              >
                <item.icon className={`w-4 h-4 ${isActive ? 'text-ember' : 'text-chain'}`} />
              </button>
            </div>
          </div>
        );
      })}
    </nav>
  );
};

export default ChainProgressNav;

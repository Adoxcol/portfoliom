import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun, Terminal } from 'lucide-react';

interface AssociationTerminalProps {
  theme: 'light' | 'dark';
  onSetTheme: (theme: 'light' | 'dark') => void;
}

const AssociationTerminal = ({ theme, onSetTheme }: AssociationTerminalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[75] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="license-border bg-ink/95 backdrop-blur-md p-4 w-56 doc-mono text-xs text-bone"
          >
            <div className="doc-label text-gold mb-3">ASSOCIATION TERMINAL</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted">DISPLAY MODE</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onSetTheme('dark')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 border transition-colors ${
                  theme === 'dark' ? 'border-scarlet text-scarlet bg-scarlet/10' : 'border-border text-muted hover:text-bone'
                }`}
              >
                <Moon className="w-3.5 h-3.5" /> DARK
              </button>
              <button
                onClick={() => onSetTheme('light')}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 border transition-colors ${
                  theme === 'light' ? 'border-scarlet text-scarlet bg-scarlet/10' : 'border-border text-muted hover:text-bone'
                }`}
              >
                <Sun className="w-3.5 h-3.5" /> LIGHT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 license-border bg-ink/85 backdrop-blur-md px-3 py-3 doc-mono text-[11px] text-muted hover:text-bone hover:border-scarlet/50 transition-colors"
      >
        <Terminal className="w-3.5 h-3.5" />
        TERMINAL
      </button>
    </div>
  );
};

export default AssociationTerminal;

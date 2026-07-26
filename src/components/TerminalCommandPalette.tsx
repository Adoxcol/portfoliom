import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Command, CornerDownLeft, Search, Terminal, X } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';

interface CommandItem {
  id: string;
  label: string;
  command: string;
  detail: string;
  sectionId?: string;
  href?: string;
}

interface TerminalCommandPaletteProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onSetTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}

const commands: CommandItem[] = [
  {
    id: 'home',
    label: 'Navigate to Home',
    command: 'open home',
    detail: 'Jump to hero section',
    sectionId: 'hero',
  },
  {
    id: 'system',
    label: 'Open System Profile',
    command: 'open system',
    detail: 'Jump to about section',
    sectionId: 'about',
  },
  {
    id: 'archive',
    label: 'Open Project Archive',
    command: 'open archive',
    detail: 'Jump to project archive',
    sectionId: 'projects',
  },
  {
    id: 'lab',
    label: 'Open Hobby Lab',
    command: 'open lab',
    detail: 'Jump to hobby creations',
    sectionId: 'hobby',
  },
  {
    id: 'mission',
    label: 'Open Mission Log',
    command: 'open mission',
    detail: 'Jump to career timeline',
    sectionId: 'mission',
  },
  {
    id: 'skills',
    label: 'Open Skills Matrix',
    command: 'open skills',
    detail: 'Jump to capability matrix',
    sectionId: 'skills',
  },
  {
    id: 'metrics',
    label: 'Open Metrics',
    command: 'open metrics',
    detail: 'Jump to system metrics',
    sectionId: 'metrics',
  },
  {
    id: 'uplink',
    label: 'Open Uplink',
    command: 'open uplink',
    detail: 'Jump to contact terminal',
    sectionId: 'contact',
  },
  {
    id: 'github',
    label: 'Open GitHub',
    command: 'open github',
    detail: 'Launch github profile',
    href: 'https://github.com/Adoxcol',
  },
  {
    id: 'linkedin',
    label: 'Open LinkedIn',
    command: 'open linkedin',
    detail: 'Launch linkedin profile',
    href: 'https://www.linkedin.com/in/mahfuzur-rahman-60084326b/',
  },
  {
    id: 'email',
    label: 'Open Email',
    command: 'open email',
    detail: 'Start a direct email',
    href: 'mailto:mahfuzurrrahmannn@gmail.com',
  },
  {
    id: 'theme-status',
    label: 'Check Theme Status',
    command: 'theme status',
    detail: 'Inspect current interface theme',
  },
  {
    id: 'theme-toggle',
    label: 'Toggle Theme',
    command: 'toggle theme',
    detail: 'Switch between dark and light',
  },
  {
    id: 'theme-dark',
    label: 'Set Dark Theme',
    command: 'set dark',
    detail: 'Force tactical dark mode',
  },
  {
    id: 'theme-light',
    label: 'Set Light Theme',
    command: 'set light',
    detail: 'Force tactical light mode',
  },
];

const TerminalCommandPalette = ({
  theme,
  onToggleTheme,
  onSetTheme,
}: TerminalCommandPaletteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentThemeLabel = theme === 'dark' ? 'TACTICAL_DARK' : 'TACTICAL_LIGHT';

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (!isOpen && !isTypingTarget && event.key === '/') {
        event.preventDefault();
        setIsOpen(true);
        return;
      }

      if (isOpen && event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedIndex(0);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const filteredCommands = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return commands;

    return commands.filter((item) =>
      [item.label, item.command, item.detail].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [query]);

  const visibleCommands = useMemo(
    () =>
      filteredCommands.map((item) =>
        item.id === 'theme-status'
          ? { ...item, detail: `Current theme: ${currentThemeLabel}` }
          : item
      ),
    [currentThemeLabel, filteredCommands]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (selectedIndex > visibleCommands.length - 1) {
      setSelectedIndex(0);
    }
  }, [selectedIndex, visibleCommands]);

  const runCommand = (item: CommandItem) => {
    if (item.id === 'theme-status') {
      setQuery('theme status');
      return;
    }

    if (item.id === 'theme-toggle') {
      onToggleTheme();
      setQuery(`theme status // ${theme === 'dark' ? 'TACTICAL_LIGHT' : 'TACTICAL_DARK'}`);
      return;
    }

    if (item.id === 'theme-dark') {
      onSetTheme('dark');
      setQuery('theme status // TACTICAL_DARK');
      return;
    }

    if (item.id === 'theme-light') {
      onSetTheme('light');
      setQuery('theme status // TACTICAL_LIGHT');
      return;
    }

    if (item.sectionId) {
      document.getElementById(item.sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }

    if (item.href) {
      window.open(item.href, item.href.startsWith('mailto:') ? '_self' : '_blank', item.href.startsWith('mailto:') ? undefined : 'noopener,noreferrer');
    }

    setIsOpen(false);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!visibleCommands.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % visibleCommands.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + visibleCommands.length) % visibleCommands.length);
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      runCommand(visibleCommands[selectedIndex]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-[75] flex items-center gap-3 border border-muted-gray/30 bg-tactical-black/85 backdrop-blur-md px-3 py-3 md:px-4 tactical-mono text-[11px] md:text-xs text-muted-gray shadow-[0_0_25px_rgba(0,0,0,0.35)] hover:text-soft-white hover:border-neon-lime/50 transition-colors"
        aria-label="Open command palette"
      >
        <Terminal className="w-4 h-4 text-neon-lime" />
        <span className="hidden sm:inline">COMMAND_PALETTE</span>
        <span className="border border-muted-gray/20 px-2 py-1 text-[10px]">CTRL K</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[80] bg-tactical-black/70 backdrop-blur-md px-4 py-10 md:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:100%_6px]" />

            <motion.div
              className="relative mx-auto w-full max-w-3xl border border-neon-lime/20 bg-tactical-card/95 shadow-[0_0_35px_rgba(180,240,0,0.08)]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-center justify-between border-b border-muted-gray/20 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center border border-neon-lime/25 bg-neon-lime/10">
                    <Command className="h-4 w-4 text-neon-lime" />
                  </div>
                  <div>
                    <div className="tactical-label text-neon-lime">TERMINAL COMMAND PALETTE</div>
                    <div className="tactical-mono text-xs text-muted-gray">Jump anywhere or launch a profile command</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="border border-muted-gray/20 p-2 text-muted-gray hover:text-soft-white hover:border-soft-white transition-colors"
                  aria-label="Close command palette"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="border-b border-muted-gray/20 px-5 py-4">
                <div className="flex items-center gap-3 border border-muted-gray/20 bg-tactical-black/70 px-4 py-3">
                  <Search className="h-4 w-4 text-tactical-cyan" />
                  <span className="tactical-mono text-neon-lime">&gt;</span>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder='Type "open archive", "open mission", "open github"...'
                    className="w-full bg-transparent text-soft-white placeholder:text-muted-gray/70 outline-none tactical-mono text-sm"
                  />
                </div>
              </div>

              <div className="max-h-[24rem] overflow-y-auto">
                {visibleCommands.length ? (
                  visibleCommands.map((item, index) => {
                    const isSelected = index === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => runCommand(item)}
                        className={`w-full border-b border-muted-gray/10 px-5 py-4 text-left transition-colors ${
                          isSelected ? 'bg-neon-lime/8' : 'bg-transparent hover:bg-soft-white/5'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="tactical-mono text-sm text-soft-white mb-1">{item.command}</div>
                            <div className="tactical-label text-muted-gray">{item.label}</div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="tactical-mono text-[11px] text-muted-gray">{item.detail}</span>
                            <ArrowRight className={`h-4 w-4 ${isSelected ? 'text-neon-lime' : 'text-muted-gray'}`} />
                          </div>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="px-5 py-10 text-center">
                    <div className="tactical-label text-tactical-magenta mb-3">NO_MATCHING_COMMAND</div>
                    <div className="tactical-mono text-sm text-muted-gray">
                      Try commands like `open mission`, `open metrics`, or `open github`
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-muted-gray/20 px-5 py-4 tactical-mono text-[11px] text-muted-gray">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2"><CornerDownLeft className="h-3.5 w-3.5" /> EXECUTE</span>
                  <span>↑ ↓ NAVIGATE</span>
                  <span>ESC CLOSE</span>
                </div>
                <span className="text-neon-lime">THEME_STATUS // {currentThemeLabel}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TerminalCommandPalette;

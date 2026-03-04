import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  User, 
  FolderGit2, 
  Cpu, 
  Activity, 
  Terminal 
} from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'HOME', icon: Home, color: 'text-soft-white' },
  { id: 'about', label: 'SYSTEM', icon: User, color: 'text-neon-lime' },
  { id: 'projects', label: 'ARCHIVE', icon: FolderGit2, color: 'text-tactical-cyan' },
  { id: 'skills', label: 'SKILLS', icon: Cpu, color: 'text-tactical-magenta' },
  { id: 'metrics', label: 'METRICS', icon: Activity, color: 'text-neon-lime' },
  { id: 'contact', label: 'UPLINK', icon: Terminal, color: 'text-tactical-cyan' },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Navigation Line */}
          <div className="absolute right-6 top-0 bottom-0 w-px bg-muted-gray opacity-20 -z-10" />

          {navItems.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center justify-end group"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
          {/* Label */}
          <AnimatePresence>
            {hoveredItem === item.id && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className={`absolute right-14 whitespace-nowrap tactical-label ${item.color} bg-tactical-black/80 px-2 py-1 border border-muted-gray/30 backdrop-blur-sm pointer-events-none`}
              >
                [{item.label}]
              </motion.div>
            )}
          </AnimatePresence>

          {/* Icon Button */}
          <button
            onClick={() => scrollToSection(item.id)}
            className={`
              relative p-3 transition-all duration-300
              ${activeSection === item.id ? 'scale-110' : 'scale-100 hover:scale-105'}
            `}
          >
            {/* Active/Hover Background */}
            <div className={`
              absolute inset-0 border border-muted-gray/30 bg-tactical-black/50 backdrop-blur-sm transition-all duration-300
              ${activeSection === item.id ? 'opacity-100 border-neon-lime/50' : 'opacity-0 group-hover:opacity-100'}
            `} />

            {/* Icon */}
            <item.icon 
              className={`
                w-5 h-5 relative z-10 transition-colors duration-300
                ${activeSection === item.id ? item.color : 'text-muted-gray group-hover:text-soft-white'}
              `} 
            />

            {/* Active Indicator */}
            {activeSection === item.id && (
              <motion.div
                layoutId="active-nav"
                className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-neon-lime shadow-[0_0_10px_rgba(180,240,0,0.5)]"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 32 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
          </div>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
  );
};

export default Navigation;

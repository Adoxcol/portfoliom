import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
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
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll();

  // Create smooth mask for center-out expansion
  // We use a clip-path inset to reveal the border from the center outwards
  const insetPercentage = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const clipPath = useMotionTemplate`inset(0% ${insetPercentage} 0% ${insetPercentage} round 9999px)`;

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Show nav on scroll
      if (window.scrollY > 100) {
        setIsVisible(true);
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Set new timeout to hide nav after 2s if not hovered
        scrollTimeout = setTimeout(() => {
          if (!isHovered) {
            setIsVisible(false);
          }
        }, 2000);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isHovered]);

  // Effect to handle hover state changes for auto-hide
  useEffect(() => {
    if (isHovered && window.scrollY > 100) {
      setIsVisible(true);
    }
  }, [isHovered]);

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
          className="fixed top-6 left-1/2 z-50 flex justify-center py-2 px-6 bg-tactical-black/80 backdrop-blur-md rounded-full shadow-lg shadow-neon-lime/10"
          initial={{ opacity: 0, y: -50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -50, x: "-50%" }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Progress Border */}
          <div className="absolute inset-0 rounded-full pointer-events-none">
            {/* Track */}
            <div className="absolute inset-0 w-full h-full rounded-full border border-muted-gray/30" />
            
            {/* Progress Mask */}
            <motion.div 
              className="absolute inset-0 w-full h-full rounded-full border-2 border-neon-lime"
              style={{ clipPath }}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-6 overflow-x-auto md:overflow-visible no-scrollbar pb-2 relative z-10">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col items-center group"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Icon Button */}
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    relative p-2 md:p-3 transition-all duration-300 rounded-full
                    ${activeSection === item.id ? 'scale-110' : 'scale-100 hover:scale-105'}
                  `}
                >
                  {/* Active/Hover Background */}
                  <div className={`
                    absolute inset-0 border border-muted-gray/30 bg-tactical-black/50 backdrop-blur-sm transition-all duration-300 rounded-full
                    ${activeSection === item.id ? 'opacity-100 border-neon-lime/50 bg-neon-lime/10' : 'opacity-0 group-hover:opacity-100'}
                  `} />

                  {/* Icon */}
                  <item.icon 
                    className={`
                      w-5 h-5 md:w-6 md:h-6 relative z-10 transition-colors duration-300
                      ${activeSection === item.id ? item.color : 'text-muted-gray group-hover:text-soft-white'}
                    `} 
                  />
                </button>

                {/* Label (Tooltip style below) */}
                <AnimatePresence>
                  {hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 12 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-full whitespace-nowrap tactical-label ${item.color} bg-tactical-black/90 px-3 py-1 border border-muted-gray/30 backdrop-blur-sm rounded-md pointer-events-none z-[60] hidden md:block text-xs tracking-wider shadow-xl`}
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navigation;

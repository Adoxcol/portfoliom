import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import TacticalBackground from './components/TacticalBackground';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectArchive from './components/ProjectArchive';
import SkillsMatrix from './components/SkillsMatrix';
import SystemMetrics from './components/SystemMetrics';
import TerminalContact from './components/TerminalContact';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    // Hide default cursor and show custom cursor after loading
    const handleLoadingComplete = () => {
      setIsLoading(false);
      setShowCursor(true);
      document.body.classList.add('cursor-hidden');
    };

    // Simulate loading time
    const timer = setTimeout(() => {
      handleLoadingComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-tactical-black">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Custom Cursor */}
      {showCursor && <CustomCursor />}

      {/* Tactical Background */}
      <TacticalBackground />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectArchive />
        <SkillsMatrix />
        <SystemMetrics />
        <TerminalContact />
      </main>

      {/* Footer */}
      <footer className="bg-tactical-section py-8 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="tactical-mono text-sm text-muted-gray mb-4 md:mb-0">
              © 2025 MAHMOOD TAUHIDUL - SYSTEM ARCHITECT
            </div>
            <div className="flex items-center gap-4 tactical-mono text-xs text-muted-gray">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse"></div>
                <span>SYSTEM ONLINE</span>
              </div>
              <span>•</span>
              <span>LAST UPDATED: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
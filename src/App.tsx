import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/chrome/CustomCursor';
import LoadingScreen from './components/chrome/LoadingScreen';
import ChainProgressNav from './components/chrome/ChainProgressNav';
import ScrollChain from './components/chrome/ScrollChain';
import AssociationTerminal from './components/chrome/AssociationTerminal';
import LicenseHero from './components/sections/LicenseHero';
import ProfileDossier from './components/sections/ProfileDossier';
import NenAbilities from './components/sections/NenAbilities';
import HuntBoard from './components/sections/HuntBoard';
import SideQuests from './components/sections/SideQuests';
import ExamPhases from './components/sections/ExamPhases';
import HunterStats from './components/sections/HunterStats';
import TransmissionContact from './components/sections/TransmissionContact';
import { useTheme } from './hooks/useTheme';
import { profile } from './data/content';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen bg-ink">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <CustomCursor />
          <ChainProgressNav containerRef={stageRef} />
          <ScrollChain containerRef={stageRef} />
          <AssociationTerminal theme={theme} onSetTheme={setTheme} />
        </>
      )}

      <div ref={stageRef} className="scene-stage h-screen overflow-y-scroll">
        <LicenseHero />
        <ProfileDossier />
        <NenAbilities />
        <HuntBoard />
        <SideQuests />
        <ExamPhases />
        <HunterStats />
        <TransmissionContact />

        <footer className="snap-scene bg-card py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="doc-mono text-sm text-muted">
                © 2026 {profile.name.toUpperCase()} — HUNTER ASSOCIATION LICENSE HOLDER
              </div>
              <div className="flex items-center gap-2 doc-mono text-xs text-muted">
                <div className="w-2 h-2 bg-scarlet rounded-full animate-pulse" />
                <span>LICENSE ACTIVE</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

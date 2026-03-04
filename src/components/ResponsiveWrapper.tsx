import { useState, useEffect } from 'react';

const ResponsiveWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={isMobile ? 'mobile-optimizations' : ''}>
      {children}
    </div>
  );
};

export default ResponsiveWrapper;
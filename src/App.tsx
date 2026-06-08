import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { SmoothScroll } from './components/layout/SmoothScroll';
import Spotlight from './components/Spotlight';

import { HeroSection } from './components/hero/HeroSection';
import { ServicesSection } from './components/services/ServicesSection';
import { PortfolioSection } from './components/portfolio/PortfolioSection';
import { ProcessSection } from './components/process/ProcessSection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { ContactSection } from './components/contact/ContactSection';
import './index.css';
import initGsapScroll from './lib/gsapScroll';

// Loader component moved to src/components/Loader.tsx

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Run GSAP initialisation shortly after mount
    const t = setTimeout(() => {
      try { initGsapScroll(); } catch (e) { /* ignore */ }
    }, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" />
      <div className="aurora-bg" aria-hidden />
      <div className="smoke-overlay" aria-hidden />

      {/* Scene wipe used for cinematic transitions (animated by GSAP) */}
      <div className="scene-wipe" aria-hidden />

      {/* Floating logo animation */}
      <div className="floating-logo" aria-hidden>
        <img src="/favicon.png" alt="logo" />
      </div>



      {/* Loading */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Main app */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Navigation theme={theme} onToggleTheme={toggleTheme} />
            <Spotlight />

            {/* Floating gradient blobs for cinematic feel */}
            <div className="floating-blobs" aria-hidden>
              <div className="blob blob-1" />
              <div className="blob blob-2" />
              <div className="blob blob-3" />
            </div>

            <SmoothScroll>
              <main>
                <HeroSection />
                <ServicesSection />
                <PortfolioSection />
                <ProcessSection />
                <TestimonialsSection />
                <ContactSection />
              </main>
            </SmoothScroll>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

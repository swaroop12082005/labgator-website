import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';

import { HeroSection } from './components/hero/HeroSection';
import { ServicesSection } from './components/services/ServicesSection';
import { PortfolioSection } from './components/portfolio/PortfolioSection';
import { ProcessSection } from './components/process/ProcessSection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { ContactSection } from './components/contact/ContactSection';
import './index.css';

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <div className="loading-logo">
          LAB<span style={{ color: 'var(--primary)' }}>GATORS</span>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Building brands that dominate
        </p>
      </motion.div>

      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
    </motion.div>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Noise overlay */}
      <div className="noise-overlay" />



      {/* Loading */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
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

            <main>
              <HeroSection />
              <ServicesSection />
              <PortfolioSection />
              <ProcessSection />
              <TestimonialsSection />
              <ContactSection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

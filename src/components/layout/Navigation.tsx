import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, X, ArrowUpRight } from 'lucide-react';
import { NAV_LINKS } from '../../lib/constants';

interface NavigationProps {
  theme: string;
  onToggleTheme: () => void;
}

export function Navigation({ theme, onToggleTheme }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
      const ids = NAV_LINKS.map((l) => l.href.replace('#', ''));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollProgress, transformOrigin: 'left', width: '100%' }}
      />

      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 'var(--z-nav)' as unknown as number,
          borderBottom: scrolled ? '1px solid var(--border-strong)' : '1px solid transparent',
          background: scrolled ? (theme === 'dark' ? 'rgba(12,11,9,0.96)' : 'rgba(245,237,214,0.95)') : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'all 0.35s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <motion.span whileHover={{ color: 'var(--primary)' }} style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              letterSpacing: '0.04em',
              color: 'var(--text)',
              lineHeight: 1,
              transition: 'color 0.2s',
            }}>
              LAB<span style={{ color: 'var(--primary)' }}>GATORS</span>
            </motion.span>
          </a>

          {/* Desktop nav — minimal, no backgrounds */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); go(link.href); }}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    letterSpacing: '0.04em',
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                    position: 'relative',
                    paddingBottom: '2px',
                    borderBottom: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--primary)' : 'var(--text-muted)')}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Theme toggle */}
            <motion.button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
              style={{
                width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent',
                border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-muted)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--primary)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; }}
            >
              <AnimatePresence mode="wait">
                <motion.div key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* CTA — desktop */}
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); go('#contact'); }}
              className="btn btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              id="nav-cta"
              style={{ padding: '0.5rem 1.25rem', fontSize: '0.8125rem', display: 'none', letterSpacing: '0.04em', textTransform: 'uppercase' }}
            >
              Start a Project <ArrowUpRight size={14} />
            </motion.a>

            {/* Hamburger */}
            <button
              id="hamburger-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="hamburger-btn"
              style={{
                width: 32, height: 32,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
                background: 'transparent', border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius-sm)', padding: '6px',
                color: 'var(--text)',
              }}
            >
              {menuOpen ? <X size={14} /> : (
                <>
                  <span style={{ width: 14, height: 1.5, background: 'var(--text)', display: 'block' }} />
                  <span style={{ width: 10, height: 1.5, background: 'var(--primary)', display: 'block', alignSelf: 'flex-start' }} />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 8999 }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(320px, 85vw)',
                background: 'var(--bg-surface)',
                borderLeft: '1px solid var(--border-strong)',
                zIndex: 9000,
                display: 'flex', flexDirection: 'column',
                padding: '5rem 2rem 2rem',
                gap: '0',
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); go(link.href); }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '3rem',
                    color: 'var(--text)',
                    textDecoration: 'none',
                    letterSpacing: '0.04em',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--border)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text)')}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="btn btn-primary"
                onClick={(e) => { e.preventDefault(); go('#contact'); }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                style={{ marginTop: '2rem', justifyContent: 'center', textTransform: 'uppercase', letterSpacing: '0.08em' }}
              >
                Start a Project <ArrowUpRight size={14} />
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) {
          .hamburger-btn { display: none !important; }
          #nav-cta { display: inline-flex !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}

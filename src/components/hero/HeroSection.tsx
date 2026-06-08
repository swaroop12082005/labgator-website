import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { STATS } from '../../lib/constants';
import { useCounter } from '../../hooks/useCounter';
import { Hero3D } from './Hero3D';
import { MagneticButton } from '../ui/MagneticButton';
import TextReveal from '../ui/TextReveal';

function StatCard({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [started, setStarted] = useState(false);
  const count = useCounter(value, 2000, started);
  useEffect(() => { const t = setTimeout(() => setStarted(true), delay); return () => clearTimeout(t); }, [delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000 + 0.3, duration: 0.5 }}
      style={{
        borderLeft: '1px solid var(--border-strong)',
        paddingLeft: '1.25rem',
        minWidth: '110px',
      }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '2.75rem',
        letterSpacing: '0.02em',
        color: 'var(--text)',
        lineHeight: 1,
        marginBottom: '0.25rem',
      }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
        {label}
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const gatorY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="home"
      data-scene="hero"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingTop: 68,
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-strong)',
      }}
    >
      {/* Decorative hero blobs (purple) */}
      <div className="hero-blob-1" aria-hidden />
      <div className="hero-blob-2" aria-hidden />
        {/* 3D floating background visuals */}
        <Hero3D />
      {/* Orange corner accent */}
      <div style={{
        position: 'absolute', top: 68, right: 0,
        width: 'clamp(200px, 30vw, 420px)',
        height: 3,
        background: 'var(--primary)',
      }} />

      {/* Gator mascot */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 'clamp(8px, 2vw, 28px)',
          y: gatorY,
          zIndex: 4,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        initial={{ opacity: 0, x: -80, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="hero-gator"
      >
        <img
          src="/Transparent bg gator.png"
          alt="LabGators Mascot"
          style={{
            height: 'clamp(440px, 60vh, 900px)',
            width: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.65))',
            transformOrigin: 'bottom left'
          }}
        />
      </motion.div>

      {/* Diagonal lime stripe */}
      <div style={{
        position: 'absolute',
        top: '10%', right: '8%',
        width: 1,
        height: '50%',
        background: 'var(--border)',
        transform: 'rotate(12deg)',
        transformOrigin: 'top',
      }} />

      {/* Large faint text watermark */}
      <motion.div
        className="hero-watermark"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        GATORS
      </motion.div>

      <div className="cinematic-hero reveal" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-inner">
          <motion.div className="container reveal parallax" style={{ y, opacity, paddingTop: '4rem', paddingBottom: '4.5rem', position: 'relative' }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}
        >
          <span style={{ width: 32, height: 1.5, background: 'var(--primary)', display: 'inline-block', flexShrink: 0 }} />
          <span className="eyebrow">Full-Service Digital Marketing Agency</span>
        </motion.div>

        {/* Headline — editorial giant */}
        <div style={{ marginBottom: '2.5rem' }}>
          {/* Letter-by-letter headline for a cinematic effect */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}>
            <TextReveal delay={0.12}>WE BUILD BRANDS</TextReveal>
            <motion.div style={{ marginTop: '0.8rem' }} initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
              <span className="display-xl" style={{ fontFamily: 'var(--font-display)', color: '#FFFFFF', letterSpacing: '-3px', fontWeight: 900 }}>THAT</span>
              <span className="display-xl" style={{ fontFamily: 'var(--font-display)', color: '#D4AF37', letterSpacing: '-3px', fontWeight: 900, marginLeft: '0.8rem' }}>DOMINATE.</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              className="display-xl"
              style={{
                fontFamily: 'var(--font-display)',
                WebkitTextStroke: '2px var(--text)',
                color: 'transparent',
                letterSpacing: '0.01em',
              }}
            >
              THAT
            </span>
            <span
              className="display-xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--lime)', letterSpacing: '0.01em' }}
            >
              DOMINATE.
            </span>
          </motion.div>
        </div>

        {/* Subline + CTAs row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            gap: '3rem',
            flexWrap: 'wrap',
            borderTop: '1px solid var(--border-strong)',
            paddingTop: '2rem',
          }}
        >
          {/* Typewriter subline */}
          <div style={{ maxWidth: '460px' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.125rem',
              color: 'var(--text-muted)',
              lineHeight: 1.75,
              marginBottom: '1.75rem',
              fontWeight: 400,
              letterSpacing: '0.5px',
            }}>
              <TypeAnimation
                sequence={[
                  'Photography. Web. Ads. Design. We do it all and we do it right.',
                  2800,
                  'Strategic creativity that turns visitors into loyal customers.',
                  2800,
                  'Cinematic content that makes your brand impossible to ignore.',
                  2800,
                ]}
                wrapper="span"
                cursor
                repeat={Infinity}
              />
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <MagneticButton
                href="#contact"
                onClick={(e: any) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn btn-primary"
              >
                Start a Project <ArrowUpRight size={14} />
              </MagneticButton>

              <MagneticButton
                href="#portfolio"
                onClick={(e: any) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn btn-outline"
              >
                See Our Work
              </MagneticButton>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start', paddingTop: '0.5rem' }}>
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} delay={1200 + i * 120} />
            ))}
          </div>
        </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="animate-bounce"
        style={{
          position: 'absolute', bottom: '2rem', right: '2rem',
          background: 'transparent', border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-sm)',
          width: 40, height: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-muted)',
          zIndex: 3,
        }}
        aria-label="Scroll down"
      >
        <ArrowDown size={16} />
      </motion.button>
    </section>
  );
}

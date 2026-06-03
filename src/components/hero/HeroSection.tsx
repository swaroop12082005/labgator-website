import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { STATS } from '../../lib/constants';
import { useCounter } from '../../hooks/useCounter';

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
          right: 'clamp(-60px, -2vw, -20px)',
          y: gatorY,
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        initial={{ opacity: 0, x: 80, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="hero-gator"
      >
        <img
          src="/Transparent bg gator.png"
          alt="LabGators Mascot"
          style={{
            height: 'clamp(320px, 46vh, 620px)',
            width: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.55))',
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.04 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '-4%', right: '-2%',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(10rem, 25vw, 28rem)',
          userSelect: 'none',
          pointerEvents: 'none',
          color: 'var(--text)',
          lineHeight: 0.85,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
        }}
      >
        GATORS
      </motion.div>

      <motion.div className="container" style={{ y, opacity, paddingTop: '4rem', paddingBottom: '4.5rem', position: 'relative', zIndex: 2 }}>
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
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', letterSpacing: '0.01em' }}
          >
            WE BUILD
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4.5rem, 13vw, 13rem)',
              lineHeight: 0.88,
              letterSpacing: '0.01em',
              color: 'var(--primary)',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            BRANDS
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
              fontSize: '1.0625rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
              marginBottom: '1.75rem',
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
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id="hero-cta-primary"
                style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.8125rem' }}
              >
                Start a Project <ArrowUpRight size={14} />
              </motion.a>
              <motion.a
                href="#portfolio"
                onClick={(e) => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn btn-outline"
                whileHover={{ scale: 1.03 }}
                id="hero-cta-secondary"
                style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.8125rem' }}
              >
                See Our Work
              </motion.a>
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

import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../lib/constants';

export function TestimonialsSection() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="about" className="section" style={{ borderBottom: '1px solid var(--border-strong)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ width: 32, height: 1.5, background: 'var(--primary)', display: 'inline-block' }} />
              <span className="eyebrow">Client Love</span>
              <span className="section-num">05</span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}>WHAT THEY SAY</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', maxWidth: '320px', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            Real results from real brands that trusted us.
          </p>
        </motion.div>
      </div>

      {/* Marquee row 1 */}
      <div style={{ width: '100%', overflow: 'hidden', marginBottom: '1px', position: 'relative' }}>
        <FadeEdge />
        <div
          style={{ display: 'flex', gap: '1px', animation: 'marquee 30s linear infinite', width: 'max-content' }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reverse */}
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
        <FadeEdge />
        <div
          style={{ display: 'flex', gap: '1px', animation: 'marquee 36s linear infinite reverse', width: 'max-content' }}
          onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
          onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
        >
          {[...doubled].reverse().map((t, i) => (
            <TestimonialCard key={i} t={t} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function FadeEdge() {
  return (
    <>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, zIndex: 2, background: 'linear-gradient(90deg, var(--bg), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, zIndex: 2, background: 'linear-gradient(-90deg, var(--bg), transparent)', pointerEvents: 'none' }} />
    </>
  );
}

function TestimonialCard({ t, compact }: { t: { quote: string; author: string; company: string; result: string }; compact?: boolean }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      padding: compact ? '1.5rem 2rem' : '2rem 2.25rem',
      minWidth: compact ? '300px' : '360px',
      maxWidth: compact ? '320px' : '380px',
      flexShrink: 0,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--primary)',
        marginBottom: '0.875rem',
      }}>
        {t.result}
      </div>
      <p style={{
        color: 'var(--text)',
        fontSize: compact ? '0.875rem' : '0.9375rem',
        lineHeight: 1.65,
        marginBottom: '1.25rem',
        fontStyle: 'italic',
      }}>
        "{t.quote}"
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text)' }}>{t.author}</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>{t.company}</div>
        </div>
        <div style={{ width: 24, height: 24, background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: '0.6rem', fontWeight: 900 }}>✓</span>
        </div>
      </div>
    </div>
  );
}

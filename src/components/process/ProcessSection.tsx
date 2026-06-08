import { useState } from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../lib/constants';
import { staggerContainer } from '../../lib/animations';

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="process" data-scene="process" className="section" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-strong)' }}>
      <div className="container">
        {/* Header row */}
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '5rem' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ width: 32, height: 1.5, background: 'var(--primary)', display: 'inline-block' }} />
              <span className="eyebrow">How We Work</span>
              <span className="section-num">04</span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}>
              THE PROCESS
            </h2>
          </div>
          <p style={{ color: 'var(--text-muted)', maxWidth: '340px', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            A clear, proven methodology that turns vision into measurable results — every single time.
          </p>
        </motion.div>

        {/* Progress track */}
        <div style={{ position: 'relative', marginBottom: '3rem' }}>
          <div style={{ height: 1, background: 'var(--border-strong)', width: '100%' }} />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', top: 0, left: 0, height: 2, background: 'var(--primary)', transformOrigin: 'left', width: '100%', marginTop: -1 }}
          />
          {/* Step dots on the track */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', transform: 'translateY(-50%)' }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.4, type: 'spring', stiffness: 200 }}
                style={{
                  width: 10, height: 10,
                  borderRadius: '50%',
                  background: activeStep === i ? 'var(--lime)' : 'var(--primary)',
                  border: `2px solid ${activeStep === i ? 'var(--lime)' : 'var(--primary)'}`,
                  outline: `3px solid var(--bg-surface)`,
                  transition: 'background 0.2s, border-color 0.2s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Steps — full-width editorial rows */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PROCESS_STEPS.map((step, i) => {
            const isActive = activeStep === i;
              return (
              <motion.div
                className="process-row tilt-card reveal parallax"
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 1fr auto',
                  alignItems: 'center',
                  gap: '3rem',
                  padding: '2.25rem 0',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'default',
                  transition: 'all 0.25s ease',
                  borderLeft: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                  paddingLeft: isActive ? '1.5rem' : '0',
                }}
                className="process-row"
              >
                {/* Step number */}
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4rem',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                  color: isActive ? 'var(--primary)' : 'var(--text-subtle)',
                  transition: 'color 0.25s',
                  userSelect: 'none',
                }}>
                  {step.step}
                </div>

                {/* Title + icon */}
                <div>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem', transition: 'transform 0.25s', transform: isActive ? 'scale(1.15)' : 'scale(1)', transformOrigin: 'left' }}>
                    {step.icon}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
                    letterSpacing: '0.03em',
                    color: isActive ? 'var(--primary)' : 'var(--text)',
                    transition: 'color 0.25s',
                    lineHeight: 0.95,
                  }}>
                    {step.title.toUpperCase()}
                  </h3>
                </div>

                {/* Description */}
                <p style={{
                  color: isActive ? 'var(--text)' : 'var(--text-muted)',
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  transition: 'color 0.25s',
                  maxWidth: '360px',
                }}>
                  {step.description}
                </p>

                {/* Lime tag on active */}
                <div style={{
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.25s',
                }}>
                  <span className="tag tag-lime" style={{ whiteSpace: 'nowrap' }}>Step {step.step}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '4rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.8125rem' }}
          >
            Start the Process ↗
          </motion.a>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Average project kickoff within <span style={{ color: 'var(--lime)', fontWeight: 700 }}>48 hours</span>.
          </span>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-row {
            grid-template-columns: 48px 1fr !important;
            gap: 1.25rem !important;
          }
          .process-row > *:nth-child(3),
          .process-row > *:nth-child(4) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

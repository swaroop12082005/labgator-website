import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../lib/constants';
import { fadeUp, staggerContainer, modalOverlay, modalContent } from '../../lib/animations';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  featured: boolean;
  deliverables: string[];
}

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  return (
    <motion.div
        variants={modalOverlay}
        initial="hidden" animate="visible" exit="exit"
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'var(--overlay)',
          backdropFilter: 'blur(6px)',
          zIndex: 'var(--z-modal)' as unknown as number,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        <motion.div
          variants={modalContent}
          initial="hidden" animate="visible" exit="exit"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(2rem, 4vw, 3rem)',
            maxWidth: '560px', width: '100%',
            position: 'relative',
            boxShadow: '0 32px 80px var(--shadow)',
          }}
        >
          {/* Top accent bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--primary)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />

          <button onClick={onClose} style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            background: 'transparent', border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-sm)',
            width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)',
          }}>
            <X size={14} />
          </button>

          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{service.icon}</div>
          <p className="eyebrow-orange" style={{ marginBottom: '0.5rem' }}>Service</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: '0.04em', color: 'var(--text)', marginBottom: '1rem', lineHeight: 0.95 }}>
            {service.title.toUpperCase()}
          </h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '0.9375rem' }}>
            {service.description}
          </p>

          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Deliverables
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
            {service.deliverables.map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text)', fontSize: '0.9rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>

          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
            className="btn btn-primary"
            whileHover={{ scale: 1.03 }}
            style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.8125rem' }}
          >
            Get a Quote <ArrowUpRight size={14} />
          </motion.a>
        </motion.div>
      </motion.div>
  );
}

export function ServicesSection() {
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="services" className="section" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-strong)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ width: 32, height: 1.5, background: 'var(--primary)', display: 'inline-block' }} />
              <span className="eyebrow">What We Do</span>
              <span className="section-num">02</span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}>
              SERVICES
            </h2>
          </div>
          <p style={{ maxWidth: '380px', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.7 }}>
            Everything your brand needs to grow, from creative production to digital strategy.
          </p>
        </motion.div>

        {/* List-style services — editorial numbered rows */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              onClick={() => setActiveService(service)}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '4rem 1fr auto',
                alignItems: 'center',
                gap: '2rem',
                padding: '1.75rem 0',
                borderBottom: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: hoveredId === service.id ? 'var(--primary-dim)' : 'transparent',
                paddingLeft: hoveredId === service.id ? '1rem' : '0',
                paddingRight: hoveredId === service.id ? '1rem' : '0',
                borderRadius: hoveredId === service.id ? 'var(--radius-md)' : '0',
              }}
            >
              {/* Number */}
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: hoveredId === service.id ? 'var(--primary)' : 'var(--text-subtle)',
                letterSpacing: '0.08em',
                transition: 'color 0.2s',
              }}>
                0{i + 1}
              </span>

              {/* Title + description */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{service.icon}</span>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    letterSpacing: '0.03em',
                    color: hoveredId === service.id ? 'var(--primary)' : 'var(--text)',
                    transition: 'color 0.2s',
                    lineHeight: 1,
                  }}>
                    {service.title.toUpperCase()}
                  </h3>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '480px', lineHeight: 1.5 }}>
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <motion.div
                animate={{ x: hoveredId === service.id ? 0 : -8, opacity: hoveredId === service.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: 'var(--primary)' }}
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {activeService && (
          <ServiceModal
            key="service-modal"
            service={activeService}
            onClose={() => setActiveService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

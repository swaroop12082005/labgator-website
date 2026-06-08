import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../../lib/constants';
import { fadeUp, staggerContainer, modalOverlay, modalContent } from '../../lib/animations';

interface Project {
  id: number;
  name: string;
  category: string;
  tags: string[];
  result: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  testimonial: { quote: string; author: string };
  color: string;
}

function CaseStudyModal({ project, onClose, onPrev, onNext }: { project: Project; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  return (
    <motion.div
        variants={modalOverlay}
        initial="hidden" animate="visible" exit="exit"
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)', zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
      >
        <motion.div
          variants={modalContent}
          initial="hidden" animate="visible" exit="exit"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-lg)',
            maxWidth: '840px', width: '100%',
            maxHeight: '90vh', overflow: 'auto',
            boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
            position: 'relative',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', height: '260px', overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
            <img src={project.image} alt={project.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--primary)' }} />

            {/* Controls */}
            <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <X size={14} />
            </button>
            <button onClick={onPrev} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={onNext} style={{ position: 'absolute', right: '4rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <ChevronRight size={16} />
            </button>

            {/* Category */}
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '2rem' }}>
              <span className="tag tag-orange">{project.category}</span>
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: '0.03em', marginBottom: '0.75rem', lineHeight: 0.95 }}>
              {project.name.toUpperCase()}
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>{project.description}</p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {project.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '2rem' }}>
              {project.metrics.map((m) => (
                <div key={m.label} style={{ background: 'var(--bg-card)', padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', letterSpacing: '0.03em', color: 'var(--primary)', lineHeight: 1 }}>{m.value}</div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', marginTop: '0.35rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{m.label}</div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '1.25rem', marginBottom: '2rem' }}>
              <p style={{ color: 'var(--text)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '0.5rem' }}>"{project.testimonial.quote}"</p>
              <p style={{ color: 'var(--primary)', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>— {project.testimonial.author}</p>
            </div>

            <motion.a href="#contact" onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
              className="btn btn-primary" whileHover={{ scale: 1.03 }}
              style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.8125rem' }}>
              Start a Similar Project <ArrowUpRight size={14} />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
  );
}

export function PortfolioSection() {
  const [active, setActive] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState<number | null>(null);
  const categories = ['All', ...Array.from(new Set(PROJECTS.map((p) => p.category)))];
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const go = (dir: 'prev' | 'next') => {
    if (!active) return;
    const i = PROJECTS.findIndex((p) => p.id === active.id);
    setActive(PROJECTS[dir === 'prev' ? (i - 1 + PROJECTS.length) % PROJECTS.length : (i + 1) % PROJECTS.length]);
  };

  return (
    <section id="portfolio" data-scene="portfolio" className="section" style={{ borderBottom: '1px solid var(--border-strong)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <span style={{ width: 32, height: 1.5, background: 'var(--primary)', display: 'inline-block' }} />
              <span className="eyebrow">Selected Work</span>
              <span className="section-num">03</span>
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}>CASE STUDIES</h2>
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                style={{
                  padding: '0.35rem 0.875rem',
                  borderRadius: 'var(--radius-sm)',
                  background: filter === cat ? 'var(--primary)' : 'transparent',
                  border: filter === cat ? 'none' : '1px solid var(--border-strong)',
                  color: filter === cat ? '#fff' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 500, fontSize: '0.6875rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  transition: 'all 0.2s',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Full-width strip cards */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                className="tilt-card reveal parallax"
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                onClick={() => setActive(project)}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  alignItems: 'center',
                  gap: '2.5rem',
                  padding: '2rem 0',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: hovered === project.id ? 'var(--bg-card)' : 'transparent',
                  paddingLeft: hovered === project.id ? '1.5rem' : '0',
                  paddingRight: hovered === project.id ? '1.5rem' : '0',
                  borderRadius: hovered === project.id ? 'var(--radius-md)' : '0',
                }}
              >
                {/* Thumb */}
                <div style={{ width: 80, height: 60, borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    animate={{ scale: hovered === project.id ? 1.08 : 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Info */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
                      letterSpacing: '0.02em',
                      color: hovered === project.id ? 'var(--primary)' : 'var(--text)',
                      transition: 'color 0.2s',
                      lineHeight: 1,
                    }}>
                      {project.name.toUpperCase()}
                    </h3>
                    <span className="tag">{project.category}</span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{project.result}</p>
                </div>

                {/* Metrics + arrow */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1.5rem' }} className="project-metrics">
                    {project.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--primary)', lineHeight: 1 }}>{m.value}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--text-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <motion.div animate={{ x: hovered === project.id ? 0 : -6, opacity: hovered === project.id ? 1 : 0.3 }}>
                    <ArrowUpRight size={20} style={{ color: 'var(--primary)' }} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <CaseStudyModal
            key="case-study-modal"
            project={active}
            onClose={() => setActive(null)}
            onPrev={() => go('prev')}
            onNext={() => go('next')}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) { .project-metrics { display: none !important; } }
      `}</style>
    </section>
  );
}

import { motion } from 'framer-motion';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { NAV_LINKS } from '../../lib/constants';
import { fadeUp, staggerContainer } from '../../lib/animations';

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { icon: InstagramIcon, href: 'https://www.instagram.com/labgators?igsh=emFybzA1YzA0bTN1', label: 'Instagram' },
    { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/lab-gators-680a61384?utm_source=share_via&utm_content=profile&utm_medium=member_android', label: 'LinkedIn' },
  ];

  return (
    <footer style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-strong)', position: 'relative', overflow: 'hidden' }}>

      {/* Big tiled logo watermark */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(8rem, 20vw, 18rem)',
        color: 'var(--text)',
        opacity: 0.02,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        letterSpacing: '0.02em',
      }}>
        LABGATORS
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* CTA strip */}
        <div style={{ padding: '5rem 0', borderBottom: '1px solid var(--border-strong)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: '1rem' }}>Ready to dominate?</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 0.92, letterSpacing: '0.02em', color: 'var(--text)' }}>
              LET'S GROW<br /><span style={{ color: 'var(--primary)' }}>YOUR BRAND.</span>
            </h2>
          </div>
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn btn-primary"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.875rem' }}
          >
            Start a Project ↗
          </motion.a>
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', padding: '4rem 0' }}
        >
          {/* Brand */}
          <motion.div variants={fadeUp}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', letterSpacing: '0.04em', marginBottom: '1rem', lineHeight: 1 }}>
              LAB<span style={{ color: 'var(--primary)' }}>GATORS</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '220px' }}>
              We build brands that dominate — through creative excellence and strategic growth.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  style={{ width: 32, height: 32, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid var(--border-strong)', color: 'var(--text-muted)', textDecoration: 'none', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={fadeUp}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Services</h4>
            {['Photography', 'Website Development', 'Ads & Shoots', 'Graphic Design', 'Logo Designing', 'Social Media', 'Editing', 'Digital Marketing'].map((s) => (
              <a key={s} href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{s}</a>
            ))}
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeUp}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Company</h4>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}
                onClick={(e) => { e.preventDefault(); document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' }); }}
                style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >{link.label}</a>
            ))}
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Contact</h4>
            {[
              { icon: Mail, text: 'hello@labgators.com' },
              { icon: Phone, text: '+91 98765 43210' },
              { icon: MapPin, text: 'India' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                <Icon size={13} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                {text}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 0', borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
            © {year} LABGATORS. ALL RIGHTS RESERVED.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3, borderColor: 'var(--primary)', color: 'var(--primary)' }}
            whileTap={{ scale: 0.9 }}
            style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'transparent', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', transition: 'all 0.2s' }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

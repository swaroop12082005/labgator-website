import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle, Loader, AlertCircle } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/animations';
import emailjs from '@emailjs/browser';

// ── EmailJS config ──────────────────────────────────────────────────────────
// 1. Sign up at https://www.emailjs.com (free tier: 200 emails/month)
// 2. Create a Gmail service → copy Service ID below
// 3. Create an email template → copy Template ID below
//    Template variables used: {{from_name}}, {{from_email}}, {{company}}, {{message}}
// 4. Copy your Public Key from Account → API Keys
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

// Initialize EmailJS once (v4 recommended approach)
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

function Field({ label, value, onChange, type = 'text', id, required }: { label: string; value: string; onChange: (v: string) => void; type?: string; id: string; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: focused ? 'var(--primary)' : 'var(--text-muted)', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
        {label}{required && ' *'}
      </label>
      <input
        id={id} type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        style={{
          width: '100%', padding: '0.875rem 1rem',
          background: 'var(--bg-card)',
          border: `1px solid ${focused ? 'var(--primary)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text)', fontSize: '0.9375rem',
          outline: 'none', fontFamily: 'var(--font-body)',
          transition: 'border-color 0.2s',
        }}
      />
    </div>
  );
}

function Textarea({ label, value, onChange, id, required }: { label: string; value: string; onChange: (v: string) => void; id: string; required?: boolean }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label htmlFor={id} style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: focused ? 'var(--primary)' : 'var(--text-muted)', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
        {label}{required && ' *'}
      </label>
      <textarea
        id={id} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required} rows={5}
        style={{
          width: '100%', padding: '0.875rem 1rem',
          background: 'var(--bg-card)',
          border: `1px solid ${focused ? 'var(--primary)' : 'var(--border-strong)'}`,
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text)', fontSize: '0.9375rem',
          outline: 'none', fontFamily: 'var(--font-body)', resize: 'vertical',
          transition: 'border-color 0.2s',
        }}
      />
    </div>
  );
}

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          title: `New message from ${form.name} (${form.email})`,
          name: form.name,
          email: form.email,
          reply_to: form.email,
          time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          message: form.company
            ? `Company: ${form.company}\n\n${form.message}`
            : form.message,
        }
      );
      console.log('EmailJS success:', result.status, result.text);
      setStatus('success');
      setForm({ name: '', email: '', company: '', message: '' });
    } catch (err: any) {
      // err is an EmailJSResponseStatus object with .status and .text
      console.error('EmailJS error — status:', err?.status, '| text:', err?.text, '| full:', err);
      setStatus('error');
    }
  };

  const info = [
    { icon: Mail, label: 'Email', value: import.meta.env.VITE_CONTACT_EMAIL || 'labgators25@gmail.com' },
    { icon: Phone, label: 'Phone', value: import.meta.env.VITE_CONTACT_PHONE || '+91 97905 73114' },
    { icon: MapPin, label: 'Location', value: import.meta.env.VITE_CONTACT_LOCATION || 'India — Global' },
  ];

  return (
    <section id="contact" data-scene="contact" className="section" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-strong)' }}>
      <div className="container">
        <motion.div
          className="reveal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <span style={{ width: 32, height: 1.5, background: 'var(--primary)', display: 'inline-block' }} />
            <span className="eyebrow">Get In Touch</span>
            <span className="section-num">06</span>
          </div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.02em' }}>
            LET'S BUILD<br />
            <span style={{ color: 'var(--primary)' }}>SOMETHING</span><br />
            LEGENDARY.
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}
          className="contact-grid"
        >
          {/* Form */}
          <motion.div variants={fadeUp} className="tilt-card reveal parallax">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem', padding: '4rem 2rem', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-lg)', borderTop: '2px solid var(--lime)' }}>
                  <CheckCircle size={48} style={{ color: 'var(--lime)' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: '0.04em', lineHeight: 0.95 }}>MESSAGE SENT!</h3>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '280px', lineHeight: 1.6 }}>
                    We'll get back to you within 24 hours. Let's make something great.
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.8125rem' }}>
                    Send Another Message
                  </button>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.25rem', padding: '4rem 2rem', border: '1px solid var(--primary)', borderRadius: 'var(--radius-lg)', borderTop: '2px solid var(--primary)' }}>
                  <AlertCircle size={48} style={{ color: 'var(--primary)' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', letterSpacing: '0.04em', lineHeight: 0.95 }}>OOPS!</h3>
                  <p style={{ color: 'var(--text-muted)', maxWidth: '300px', lineHeight: 1.6 }}>
                    Something went wrong sending your message. Please try again or email us directly at <strong style={{ color: 'var(--text)' }}>{import.meta.env.VITE_FALLBACK_EMAIL || 'vishwa2261@gmail.com'}</strong>
                  </p>
                  <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.8125rem' }}>
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', borderTop: '2px solid var(--primary)', background: 'var(--bg-card)' }}>
                  <Field label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} id="contact-name" required />
                  <Field label="Email Address" value={form.email} onChange={(v) => setForm({ ...form, email: v })} type="email" id="contact-email" required />
                  <Field label="Company (Optional)" value={form.company} onChange={(v) => setForm({ ...form, company: v })} id="contact-company" />
                  <Textarea label="Tell us about your project" value={form.message} onChange={(v) => setForm({ ...form, message: v })} id="contact-message" required />
                  <motion.button type="submit" className="btn btn-primary" disabled={status === 'loading'}
                    whileHover={status !== 'loading' ? { scale: 1.03 } : {}}
                    whileTap={{ scale: 0.97 }}
                    style={{ width: '100%', justifyContent: 'center', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.8125rem' }}
                    id="contact-submit">
                    {status === 'loading' ? (
                      <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}><Loader size={16} /></motion.div> Sending...</>
                    ) : (
                      <>Send Message <Send size={14} /></>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Info */}
          <motion.div variants={fadeUp} className="tilt-card reveal parallax">
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '3rem', fontSize: '1rem' }}>
              Big ambitions or small budgets — we treat every brand with the same relentless focus. Tell us what you need.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '3rem', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              {info.map(({ icon: Icon, label, value }, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem 1.5rem', borderBottom: i < info.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--bg-card)' }}>
                  <div style={{ width: 36, height: 36, background: 'var(--primary-dim)', border: '1px solid var(--primary)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <Icon size={15} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{label}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text)' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '1.5rem', border: '1px solid var(--lime)', borderRadius: 'var(--radius-lg)', background: 'var(--lime-dim)', borderLeft: '2px solid var(--lime)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: '0.5rem' }}>
                ⚡ Quick Response
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                Every inquiry gets a reply within 24 hours. We move fast.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; } }
      `}</style>
    </section>
  );
}

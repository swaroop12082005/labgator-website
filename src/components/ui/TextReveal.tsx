import { motion } from 'framer-motion';
import React from 'react';

export function TextReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const words = String(children).split(' ');
  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'baseline' }}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 80, opacity: 0, skewY: 4 }}
          animate={{ y: 0, opacity: 1, skewY: 0 }}
          transition={{ delay: delay + i * 0.06, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ display: 'inline-block', fontFamily: 'var(--font-display)' }}
        >
          {w}
        </motion.span>
      ))}
    </div>
  );
}

export default TextReveal;

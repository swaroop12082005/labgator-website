import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type LoaderProps = { onComplete: () => void };

export default function Loader({ onComplete }: LoaderProps) {
  const outerRef = useRef<SVGPathElement | null>(null);
  const innerRef = useRef<SVGPathElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    let gsap: any;
    (async () => {
      const mod = await import('gsap');
      gsap = mod.default || mod;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // draw outlines
      if (outerRef.current) {
        const len = outerRef.current.getTotalLength();
        outerRef.current.style.strokeDasharray = String(len);
        outerRef.current.style.strokeDashoffset = String(len);
        tl.to(outerRef.current, { strokeDashoffset: 0, duration: 0.9 }, 0);
      }
      if (innerRef.current) {
        const len2 = innerRef.current.getTotalLength();
        innerRef.current.style.strokeDasharray = String(len2);
        innerRef.current.style.strokeDashoffset = String(len2);
        tl.to(innerRef.current, { strokeDashoffset: 0, duration: 0.9 }, 0.15);
      }

      // reveal text + subtle scale
      if (textRef.current) {
        tl.fromTo(textRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6 }, 0.6);
      }

      // progress bar
      if (barRef.current) {
        tl.to(barRef.current, { width: '100%', duration: 1.6, ease: 'power3.out' }, 0.4);
      }

      // short hold then complete
      tl.to({}, { duration: 0.45 });
      tl.call(() => { if (!cancelled) onComplete(); });
    })();

    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <motion.div className="loader-screen" exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
      <div className="loader-inner">
        <svg width="220" height="80" viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path ref={outerRef as any} d="M8 8 H212 V72 H8 Z" stroke="rgba(255,255,255,0.06)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <path ref={innerRef as any} d="M20 54 C48 20, 84 20, 112 54 S180 88, 200 54" stroke="var(--primary)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.95} />
        </svg>

        <div className="loader-brand" ref={textRef}>
          <span className="logo-main">LAB</span><span className="logo-accent">GATORS</span>
        </div>

        <div className="loader-sub">A creative studio</div>

        <div className="loader-bar" aria-hidden>
          <div className="loader-bar-fill" ref={barRef} style={{ width: 0 }} />
        </div>
      </div>

      <div className="film-grain" aria-hidden />
      <div className="light-rays" aria-hidden />
    </motion.div>
  );
}

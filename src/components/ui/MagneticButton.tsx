import React, { useRef, useEffect } from 'react';

export function MagneticButton({ children, className = '', onClick, href }: { children: React.ReactNode; className?: string; onClick?: (e: any) => void; href?: string }) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      // gentler magnetic pull for a more cinematic feel
      const tx = relX * 0.12;
      const ty = relY * 0.08;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.015)`;
    };
    const onLeave = () => { if (el) el.style.transform = ''; };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => { el.removeEventListener('pointermove', onMove); el.removeEventListener('pointerleave', onLeave); };
  }, []);

  if (href) {
    return (
      <a ref={ref as any} href={href} onClick={onClick} className={`magnetic ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref as any} onClick={onClick} className={`magnetic ${className}`}>
      {children}
    </button>
  );
}

export default MagneticButton;

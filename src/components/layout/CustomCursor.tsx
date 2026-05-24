import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

  useEffect(() => {
    if (isMobile) return;

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Inner dot follows immediately
      if (innerRef.current) {
        innerRef.current.style.left = `${mouseX}px`;
        innerRef.current.style.top = `${mouseY}px`;
      }
    };

    const animate = () => {
      // Outer ring eases toward cursor
      outerX += (mouseX - outerX) * 0.12;
      outerY += (mouseY - outerY) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.left = `${outerX}px`;
        outerRef.current.style.top = `${outerY}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      outerRef.current?.style.setProperty('--cursor-size', '48px');
      outerRef.current?.style.setProperty('opacity', '0.5');
    };
    const onLeaveLink = () => {
      outerRef.current?.style.setProperty('--cursor-size', '28px');
      outerRef.current?.style.setProperty('opacity', '1');
    };

    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    attachHover();
    rafId = requestAnimationFrame(animate);

    const mo = new MutationObserver(attachHover);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      mo.disconnect();
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Lagging outer ring */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '1.5px solid var(--primary)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
          mixBlendMode: 'difference',
          opacity: 1,
        }}
      />
      {/* Instant inner dot */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: 'var(--primary)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}

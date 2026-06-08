import { useEffect, useRef } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    import('lenis').then(({ default: Lenis }) => {
      if (!mounted) return;
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
      lenisRef.current = lenis;
      // expose lenis instance so global scroll plugins (GSAP) can integrate with it
      (window as any).__lenis = lenis;
    });

    return () => { mounted = false; if (lenisRef.current) lenisRef.current.destroy(); delete (window as any).__lenis; };
  }, []);

  return <div id="lenis-wrap">{children}</div>;
}

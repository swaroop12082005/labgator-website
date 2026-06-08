import gsap from 'gsap';

export function revealText(selector: string, options: { stagger?: number; duration?: number } = {}) {
  const { stagger = 0.03, duration = 0.8 } = options;
  gsap.fromTo(
    selector,
    { y: 20, opacity: 0, skewY: 6 },
    { y: 0, opacity: 1, skewY: 0, duration, stagger, ease: 'power3.out' }
  );
}

export function floatAnimation(selector: string, options: { y?: number; duration?: number; repeat?: number } = {}) {
  const { y = 8, duration = 3.2, repeat = -1 } = options;
  gsap.to(selector, { y: `+=${y}`, yoyo: true, repeat, duration, ease: 'sine.inOut' });
}

export default gsap;

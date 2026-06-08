import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// dynamic import of Lenis handled via SmoothScroll which exposes window.__lenis

export function initGsapScroll() {
  if (typeof window === 'undefined') return;
  if ((gsap as any).utils && !(gsap as any).ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    try { gsap.registerPlugin(ScrollTrigger); } catch (e) { /* already registered */ }
  }

  // If Lenis is present (exposed by SmoothScroll), wire up ScrollTrigger scrollerProxy
  const lenis = (window as any).__lenis;
  const lenisWrap = document.querySelector('#lenis-wrap');
  if (lenis && lenisWrap) {
    ScrollTrigger.scrollerProxy(lenisWrap as any, {
      scrollTop(value?: number) {
        if (arguments.length) {
          lenis.scrollTo(value);
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: (lenisWrap as HTMLElement).style.transform ? 'transform' : 'fixed',
    });

    // update ScrollTrigger on Lenis scroll
    lenis.on && lenis.on('scroll', ScrollTrigger.update);
    ScrollTrigger.addEventListener('refresh', () => lenis && lenis.update && lenis.update());
  }

  // Simple reveal for elements with .reveal
  const reveals = gsap.utils.toArray<HTMLElement>('.reveal');
  reveals.forEach((el) => {
    gsap.fromTo(el, { y: 36, opacity: 0, filter: 'blur(6px)' }, {
      y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      stagger: 0.04,
    });
  });

  // Parallax for .parallax elements (y translate)
  const pars = gsap.utils.toArray<HTMLElement>('.parallax');
  pars.forEach((el) => {
    gsap.to(el, {
      y: '10%',
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.8,
      },
    });
  });

  // Scene wipe example: listen for data-scene attributes to animate a full-screen wipe between sections
  const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]');
  scenes.forEach((sec) => {
    const name = sec.getAttribute('data-scene') || '';
    ScrollTrigger.create({
      trigger: sec,
      start: 'top top',
      end: 'bottom top',
      onEnter: () => {
        // subtle toggle class for scene activation
        document.documentElement.setAttribute('data-current-scene', name);
      },
      onEnterBack: () => document.documentElement.setAttribute('data-current-scene', name),
    });
  });

  // Scene wipe: animate .scene-wipe when switching scenes
  const sceneWipe = document.querySelector<HTMLElement>('.scene-wipe');
  if (sceneWipe) {
    // create a central timeline that briefly drops a dark gradient then releases
    const wipeTL = gsap.timeline({ paused: true });
    wipeTL.to(sceneWipe, { y: '0%', duration: 0.45, ease: 'power3.out' });
    wipeTL.to(sceneWipe, { y: '-100%', duration: 0.6, ease: 'power3.inOut', delay: 0.06 });

    // play wipe on scene enter
    scenes.forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 40%',
        onEnter: () => { wipeTL.restart(); },
      });
    });
  }

  // Footer reveal cinematic ending
  const footer = document.querySelector<HTMLElement>('footer');
  if (footer) {
    ScrollTrigger.create({
      trigger: footer,
      start: 'top bottom',
      onEnter: () => footer.classList.add('inview'),
      onEnterBack: () => footer.classList.add('inview'),
      onLeave: () => footer.classList.remove('inview'),
    });
  }

  // Hero cinematic camera subtle zoom on load
  const hero = document.querySelector<HTMLElement>('.cinematic-hero .hero-inner');
  if (hero) {
    gsap.fromTo(hero, { scale: 1.0 }, { scale: 1.03, duration: 18, ease: 'linear', repeat: -1, yoyo: true });
  }

  // Tilt cards: add pointer handlers to elements with .tilt-card
  const tilts = Array.from(document.querySelectorAll<HTMLElement>('.tilt-card'));
  tilts.forEach((card) => {
    const bounds = () => card.getBoundingClientRect();
    const onMove = (e: PointerEvent) => {
      const r = bounds();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = -py * 6; // rotateX
      const ry = px * 8; // rotateY
      const tz = 12;
      gsap.to(card, { rotateX: rx, rotateY: ry, x: 0, y: 0, z: 0, transformPerspective: 800, transformOrigin: 'center', boxShadow: '0 30px 80px rgba(2,6,23,0.6)', scale: 1.02, duration: 0.4, ease: 'power3.out' });
      // slight inner image parallax if present
      const inner = card.querySelector<HTMLElement>('.parallax');
      if (inner) {
        gsap.to(inner, { x: px * 12, y: py * 8, duration: 0.6, ease: 'power3.out' });
      }
    };
    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, boxShadow: 'none', duration: 0.7, ease: 'elastic.out(1,0.6)' });
      const inner = card.querySelector<HTMLElement>('.parallax');
      if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: 'power3.out' });
    };
    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);
  });
}

export default initGsapScroll;

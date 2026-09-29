(() => {
  'use strict';
  const frame = document.querySelector('#frame');
  const visual = document.querySelector('#visual');
  const layer = document.querySelector('#chromatic');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let paused = reduce, active = false;
  const state = { x: innerWidth * .66, y: innerHeight * .46, radius: reduce ? 180 : 155 };

  if (!reduce && window.gsap) {
    gsap.set(visual, { scale: 1.065 });
    gsap.set('.copy,.topbar,.bottom', { y: 24, autoAlpha: 0 });
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to(visual, { scale: 1, duration: 2.25 }, 0)
      .to('.copy', { y: 0, autoAlpha: 1, duration: 1.1 }, .28)
      .to('.topbar,.bottom', { y: 0, autoAlpha: 1, duration: .75, stagger: .12 }, .64);
    const breathe = gsap.to(visual, { scale: 1.019, duration: 16, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.25 });
    const xTo = gsap.quickTo(state, 'x', { duration: .27, ease: 'power2.out' });
    const yTo = gsap.quickTo(state, 'y', { duration: .27, ease: 'power2.out' });
    const radiusTo = gsap.quickTo(state, 'radius', { duration: .34, ease: 'power2.out' });
    frame.addEventListener('pointermove', event => {
      if (paused || event.target.closest('.topbar,.bottom')) return;
      active = true;
      xTo(event.clientX); yTo(event.clientY);
      radiusTo(Math.min(178, Math.max(108, innerWidth * .13)));
    }, { passive: true });
    frame.addEventListener('pointerleave', () => { active = false; radiusTo(155); });
    frame.addEventListener('pointerdown', event => { if (!event.target.closest('a,button')) radiusTo(225); });
    frame.addEventListener('pointerup', () => radiusTo(155));

    function paint(now) {
      if (!paused && document.visibilityState === 'visible') {
        const x = active ? state.x : innerWidth * (.66 + Math.sin(now * .00018) * .055);
        const y = active ? state.y : innerHeight * (.46 + Math.cos(now * .00014) * .06);
        layer.style.setProperty('--mx', `${x}px`);
        layer.style.setProperty('--my', `${y}px`);
        layer.style.setProperty('--radius', `${state.radius}px`);
      }
      requestAnimationFrame(paint);
    }
    requestAnimationFrame(paint);
    document.querySelector('#pause').addEventListener('click', event => {
      paused = !paused; breathe.paused(paused);
      event.currentTarget.textContent = paused ? 'Resume motion' : 'Pause motion';
      event.currentTarget.setAttribute('aria-pressed', String(paused));
    });
  } else {
    const button = document.querySelector('#pause'); button.textContent = 'Reduced motion'; button.disabled = true;
  }
})();

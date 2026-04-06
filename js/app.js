const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const tiltElements = document.querySelectorAll('.tilt');

function handleTilt(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const midX = rect.width / 2;
  const midY = rect.height / 2;
  const rotX = ((y - midY) / midY) * -8;
  const rotY = ((x - midX) / midX) * 8;
  el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
}

function resetTilt(e) {
  e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
}

function initTilt() {
  if (prefersReducedMotion) return;
  tiltElements.forEach((el) => {
    el.addEventListener('mousemove', handleTilt);
    el.addEventListener('mouseleave', resetTilt);
  });
}

function initCollage() {
  if (prefersReducedMotion) return;
  document.querySelectorAll('.why-collage img').forEach((img) => {
    img.addEventListener('mousemove', handleTilt);
    img.addEventListener('mouseleave', resetTilt);
  });
}

function initParallax() {
  if (prefersReducedMotion) return;
  const items = Array.from(document.querySelectorAll('[data-depth]'));
  if (!items.length) return;

  let mouseX = 0;
  let mouseY = 0;

  const onMove = (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = (e.clientY / window.innerHeight) * 2 - 1;
  };

  window.addEventListener('mousemove', onMove);

  const tick = () => {
    items.forEach((el) => {
      const depth = parseFloat(el.dataset.depth || '0.3');
      const translateX = mouseX * depth * 18;
      const translateY = mouseY * depth * -18;
      el.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    });
    requestAnimationFrame(tick);
  };

  tick();
}

initTilt();
initCollage();
initParallax();

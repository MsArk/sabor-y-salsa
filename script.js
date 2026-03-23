document.querySelectorAll('[data-current-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

const revealNodes = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

revealNodes.forEach((node) => observer.observe(node));

const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    const expanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    mobileToggle.setAttribute('aria-expanded', String(!expanded));
    mobileMenu.classList.toggle('hidden');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const hero = document.getElementById('inicio');
const orbs = hero ? hero.querySelectorAll('.hero-burst-orb') : [];

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (hero && orbs.length && !reducedMotion) {
  window.addEventListener('mousemove', (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;
    orbs.forEach((orb, index) => {
      const factor = index === 0 ? 18 : -20;
      orb.style.transform = `translate3d(${x * factor}px, ${y * factor}px, 0)`;
    });
  });
}

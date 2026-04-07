/* ===== VALLEY CARBURATOR CO. — SHARED JS ===== */

// Navbar scroll behavior
const navbar = document.querySelector('.navbar');
const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('.hamburger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  // Back to top
  const btn = document.querySelector('.back-top');
  if (btn) {
    if (window.scrollY > 300) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }
});

// Hamburger toggle
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// Page transition on nav click
document.querySelectorAll('a[href$=".html"], a[href="index.html"], a[href="./"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('tel') && !href.startsWith('mailto')) {
      e.preventDefault();
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.25s ease';
      setTimeout(() => { window.location.href = href; }, 260);
    }
  });
});

// Back to top
const backTop = document.querySelector('.back-top');
if (backTop) {
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Count-up animation
function countUp(el, target, duration = 1800) {
  const isFloat = target.toString().includes('.');
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = el.dataset.suffix ? target + el.dataset.suffix : target;
  };
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-num');
      if (numEl && !numEl.dataset.counted) {
        numEl.dataset.counted = 'true';
        const target = parseFloat(numEl.dataset.target);
        countUp(numEl, target);
      }
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.stat-card').forEach(card => statObserver.observe(card));

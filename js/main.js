/* ============================================================
   LEHLOGONOLO SHIKA — PORTFOLIO
   js/main.js
   ============================================================ */

/* ---- NAV: scroll class + active link ---------------------- */
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  /* Scrolled class */
  nav.classList.toggle('scrolled', window.scrollY > 40);

  /* Active link */
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ---- MOBILE NAV TOGGLE ------------------------------------ */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navMenu.classList.toggle('open');
});

navMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* ---- SCROLL REVEAL ---------------------------------------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0, 10);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealEls.forEach(el => revealObserver.observe(el));

/* ---- SKILL BAR ANIMATION ---------------------------------- */
const skillBars = document.querySelectorAll('.skill-bar');
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const width = bar.dataset.width;
        bar.style.width = width;
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.3 }
);
skillBars.forEach(bar => barObserver.observe(bar));

/* ---- CONTACT FORM ----------------------------------------- */
const form     = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      feedback.textContent = 'Please fill in all required fields.';
      feedback.style.color = '#ff6b6b';
      feedback.classList.add('show');
      return;
    }

    feedback.textContent = 'Message sent. I will get back to you shortly.';
    feedback.style.color = 'var(--cyan)';
    feedback.classList.add('show');
    form.reset();

    setTimeout(() => feedback.classList.remove('show'), 5000);
  });
}

/* ---- PROFILE PHOTO: fallback to initials ------------------ */
const avatar = document.getElementById('profileAvatar');
if (avatar) {
  avatar.addEventListener('error', () => {
    avatar.style.display = 'none';
    const wrap = document.getElementById('avatarWrap');
    if (wrap) {
      const initials = document.createElement('div');
      initials.className = 'avatar-initials';
      initials.textContent = 'LS';
      initials.style.cssText = `
        position:absolute; inset:3px; border-radius:50%;
        background:linear-gradient(135deg,#0d1320,#111927);
        display:flex; align-items:center; justify-content:center;
        font-family:'Syne',sans-serif; font-size:3rem; font-weight:800;
        color:#00d4ff; z-index:1; border:3px solid #06090f;
      `;
      wrap.appendChild(initials);
    }
  });
}

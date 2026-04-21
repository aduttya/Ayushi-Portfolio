// --- Scroll Reveal ---
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

// --- Nav Scroll State ---
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  }, { passive: true });
}

// --- Mobile Nav Toggle ---
const toggle = document.querySelector('.nav__toggle');
const links  = document.querySelector('.nav__links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    links.classList.toggle('is-open', !open);
    nav.classList.toggle('nav--menu-open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
      nav.classList.remove('nav--menu-open');
      document.body.style.overflow = '';
    });
  });
}

// --- FAQ Accordion ---
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item    = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// --- Product Accordion (multiple open allowed) ---
document.querySelectorAll('.prod-acc-q').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.prod-acc-item').classList.toggle('open');
  });
});

// --- Size Box Toggle ---
document.querySelectorAll('.product-sizes__grid').forEach(grid => {
  grid.querySelectorAll('.size-box').forEach(box => {
    box.addEventListener('click', () => {
      grid.querySelectorAll('.size-box').forEach(b => b.classList.remove('active'));
      box.classList.add('active');
    });
  });
});

// --- Featured Collection Tabs ---
document.querySelectorAll('.fc-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const parent = tab.closest('.feat-collections');
    parent.querySelectorAll('.fc-tab').forEach(t => t.classList.remove('is-active'));
    parent.querySelectorAll('.fc-panel').forEach(p => p.classList.remove('is-active'));
    tab.classList.add('is-active');
    parent.querySelector('#fc-' + tab.dataset.tab).classList.add('is-active');
  });
});

// --- Collection Card Modal ---
document.querySelectorAll('.coll-card[data-modal]').forEach(card => {
  card.addEventListener('click', () => {
    const modal = document.getElementById(card.dataset.modal);
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

// --- Product Modal ---
const closeModal = modal => {
  modal.classList.remove('is-open');
  document.body.style.overflow = '';
};

document.querySelectorAll('.shop-card-item').forEach(card => {
  card.addEventListener('click', () => {
    const modal = document.getElementById(card.dataset.modal);
    if (!modal) return;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
});

document.querySelectorAll('.product-modal').forEach(modal => {
  modal.querySelector('.product-modal__close').addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(modal); });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.product-modal.is-open').forEach(closeModal);
  }
});

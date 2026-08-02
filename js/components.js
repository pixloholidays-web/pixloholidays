/**
 * Pixlo Holidays - Component Behavior
 * Header/footer markup is now static in each page (for crawlability/SEO).
 * This file only wires up interactivity: mobile menu toggle, active nav
 * link highlighting, and the floating WhatsApp button.
 */

(function() {
  function wireMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', function() {
      menu.classList.toggle('open');
      const icon = btn.querySelector('i');
      if (!icon) return;
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        const icon = btn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  function setActiveLink() {
    const path = window.location.pathname;
    const file = path.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-header .nav-links a, .site-header .mobile-menu-inner a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href && href !== '#' && !href.startsWith('https://') && !href.startsWith('http://')) {
        const target = href.split('/').pop();
        if (target === file) a.classList.add('active');
      }
    });
  }

  function init() {
    wireMobileMenu();
    setActiveLink();

    // Inject WhatsApp float on all pages
    if (!document.querySelector('.whatsapp-float')) {
      const waFloat = document.createElement('a');
      waFloat.href = 'https://wa.me/917021662074?text=Hi%20Pixlo%20Holidays%21%20I%20want%20to%20plan%20my%20holiday.';
      waFloat.target = '_blank';
      waFloat.rel = 'noopener noreferrer';
      waFloat.className = 'whatsapp-float';
      waFloat.setAttribute('aria-label', 'Chat on WhatsApp');
      waFloat.innerHTML = '<i class="fab fa-whatsapp"></i>';
      document.body.appendChild(waFloat);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
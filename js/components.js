/**
 * Pixlo Holidays - Component Loader
 * Loads plain-HTML partials (header/footer) into mount points.
 */

(function() {
  const HEADER_HTML_FALLBACK = `<a href="#main-content" class="skip-link">Skip to main content</a>

<header class="site-header">
  <div class="header-inner">
    <a href="./" class="logo-link">
      <img src="pixlo-logo.png" alt="Pixlo Holidays logo" title="Pixlo Holidays - Your Travel Partner" width="180" height="40" loading="lazy" decoding="async" />
      <div class="logo-text">
        <h1>Pixlo Holidays</h1>
        <span><span class="word-dream">Dream.</span> <span class="word-explore">Explore.</span> <span class="word-discover">Discover.</span></span>
      </div>
    </a>

    <nav class="nav-links" aria-label="Main navigation">
      <a href="./">Home</a>
      <a href="domestic.html">Domestic</a>
      <a href="international.html">International</a>
      <a href="contact.html">Contact</a>
      <a href="https://wa.me/917021662074?text=Hi%20Pixlo%20Holidays%21%20I%20want%20to%20plan%20my%20holiday." target="_blank" rel="noopener noreferrer" class="nav-cta">
        <i class="fab fa-whatsapp"></i> WhatsApp Now
      </a>
    </nav>

    <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle mobile menu">
      <i class="fas fa-bars"></i>
    </button>
  </div>

  <div class="mobile-menu" id="mobileMenu">
    <div class="mobile-menu-inner">
      <a href="./">Home</a>
      <a href="domestic.html">Domestic</a>
      <a href="international.html">International</a>
      <a href="contact.html">Contact</a>
      <a href="https://wa.me/917021662074?text=Hi%20Pixlo%20Holidays%21%20I%20want%20to%20plan%20my%20holiday." target="_blank" rel="noopener noreferrer" class="mobile-cta">
        <i class="fab fa-whatsapp"></i> WhatsApp Now
      </a>
    </div>
  </div>
</header>`;

  const FOOTER_HTML_FALLBACK = `<footer class="footer">
  <div class="footer-inner">
    <div class="footer-grid">
      <div class="footer-brand">
        <h3>Pixlo Holidays</h3>
        <p>Crafted for memorable journeys. No booking fees, free itinerary, personal travel expert.</p>
        <div class="contact-row">
          <i class="fas fa-envelope"></i>
          <a href="mailto:pixloholidays@gmail.com">pixloholidays@gmail.com</a>
        </div>
        <div class="contact-row">
          <i class="fas fa-phone"></i>
          <span>+91-7021662074</span>
        </div>
        <div class="contact-row">
          <i class="fas fa-clock"></i>
          <span>Open 24/7</span>
        </div>
      </div>

      <div class="footer-col">
        <h4>Quick Links</h4>
        <a href="domestic.html">Domestic Packages</a>
        <a href="international.html">International Packages</a>
        <a href="contact.html">Contact</a>
      </div>

      <div class="footer-col">
        <h4>Policies</h4>
        <a href="privacy.html">Privacy Policy</a>
        <a href="refund.html">Refund Policy</a>
        <a href="terms.html">Terms & Conditions</a>
      </div>

      <div class="footer-col">
        <h4>Follow Us</h4>
        <div class="footer-social">
          <a href="https://www.instagram.com/pixloholidays" target="_blank" rel="noopener noreferrer" class="ig" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="https://www.facebook.com/pixloholidays" target="_blank" rel="noopener noreferrer" class="fb" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="https://www.youtube.com/@pixloholidays" target="_blank" rel="noopener noreferrer" class="yt" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          <a href="https://wa.me/917021662074" target="_blank" rel="noopener noreferrer" class="wa" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 Pixlo Holidays. All rights reserved. | GST Registered | MSME Registered</p>
    </div>
  </div>
</footer>`;

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
    document.querySelectorAll('#site-header .nav-links a, #site-header .mobile-menu-inner a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href && href !== '#' && !href.startsWith('https://') && !href.startsWith('http://')) {
        const target = href.split('/').pop();
        if (target === file) a.classList.add('active');
      }
    });
  }

  async function init() {
    const headerMount = document.getElementById('site-header');
    const footerMount = document.getElementById('site-footer');
    if (!headerMount || !footerMount) return;

    try {
      const [h, f] = await Promise.all([
        fetch('components/header.html', {cache:'no-store'}).then(r => r.ok ? r.text() : Promise.reject()),
        fetch('components/footer.html', {cache:'no-store'}).then(r => r.ok ? r.text() : Promise.reject())
      ]);
      if (h) headerMount.innerHTML = h;
      if (f) footerMount.innerHTML = f;
    } catch(e) {
      headerMount.innerHTML = HEADER_HTML_FALLBACK;
      footerMount.innerHTML = FOOTER_HTML_FALLBACK;
    }

    wireMobileMenu();
    setActiveLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
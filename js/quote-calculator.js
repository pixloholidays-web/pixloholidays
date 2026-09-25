/* Instant quote calculator for package pages.
 *
 * Usage: add an element with class "quote-calc" and these data attributes:
 *   data-package  Package name used in the WhatsApp message
 *   data-tiers    JSON array of {"id","label","price"} (price = per person, INR)
 *   data-default  Optional tier id selected on load
 * The calculator renders itself inside that element.
 */
(function () {
  var WHATSAPP_NUMBER = '917021662074';
  var MAX_ADULTS = 20;
  var MAX_CHILDREN = 10;

  function formatINR(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }

  function isoDate(d) {
    var tz = d.getTimezoneOffset() * 60000;
    return new Date(d - tz).toISOString().slice(0, 10);
  }

  function readableDate(value) {
    if (!value) return 'Flexible';
    var d = new Date(value + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function clamp(n, min, max) {
    n = parseInt(n, 10);
    if (isNaN(n)) n = min;
    return Math.min(max, Math.max(min, n));
  }

  function init(root) {
    var tiers;
    try {
      tiers = JSON.parse(root.getAttribute('data-tiers'));
    } catch (e) {
      return;
    }
    if (!tiers || !tiers.length) return;

    var pkg = root.getAttribute('data-package') || 'holiday package';
    var defaultTier = root.getAttribute('data-default') || tiers[0].id;
    var uid = 'qc-' + Math.random().toString(36).slice(2, 8);
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    var tierHtml = tiers.map(function (t) {
      var checked = t.id === defaultTier ? ' checked' : '';
      return '<label class="qc-tier">' +
        '<input type="radio" name="' + uid + '-tier" value="' + t.id + '"' + checked + ' />' +
        '<span class="qc-tier-body"><span class="qc-tier-label">' + t.label + '</span>' +
        '<span class="qc-tier-price">' + formatINR(t.price) + ' / person</span></span>' +
        '</label>';
    }).join('');

    root.innerHTML =
      '<h2>⚡ Instant Price Calculator</h2>' +
      '<p class="qc-intro">Get your exact price in seconds — no waiting for a quote.</p>' +
      '<div class="qc-tiers" role="radiogroup" aria-label="Package option">' + tierHtml + '</div>' +
      '<div class="qc-fields">' +
        '<label class="qc-field"><span>Travel date</span>' +
          '<input type="date" class="qc-date" min="' + isoDate(tomorrow) + '" /></label>' +
        '<div class="qc-field"><span>Adults</span>' +
          '<div class="qc-stepper"><button type="button" class="qc-dec" data-target="adults" aria-label="Fewer adults">−</button>' +
          '<input type="number" class="qc-adults" value="2" min="1" max="' + MAX_ADULTS + '" inputmode="numeric" aria-label="Adults" />' +
          '<button type="button" class="qc-inc" data-target="adults" aria-label="More adults">+</button></div></div>' +
        '<div class="qc-field"><span>Children (under 12)</span>' +
          '<div class="qc-stepper"><button type="button" class="qc-dec" data-target="children" aria-label="Fewer children">−</button>' +
          '<input type="number" class="qc-children" value="0" min="0" max="' + MAX_CHILDREN + '" inputmode="numeric" aria-label="Children under 12" />' +
          '<button type="button" class="qc-inc" data-target="children" aria-label="More children">+</button></div></div>' +
      '</div>' +
      '<div class="qc-result" aria-live="polite">' +
        '<div class="qc-breakdown"></div>' +
        '<div class="qc-total-row"><span>Estimated total</span><strong class="qc-total"></strong></div>' +
        '<p class="qc-note"></p>' +
      '</div>' +
      '<a class="btn-amber qc-book" target="_blank" rel="noopener noreferrer">' +
        '<i class="fab fa-whatsapp"></i> Reserve this price on WhatsApp</a>' +
      '<p class="qc-fineprint">Prices are per person on twin sharing. Final price is confirmed on WhatsApp subject to hotel &amp; train availability for your date.</p>';

    var inputs = {
      date: root.querySelector('.qc-date'),
      adults: root.querySelector('.qc-adults'),
      children: root.querySelector('.qc-children')
    };
    var out = {
      breakdown: root.querySelector('.qc-breakdown'),
      total: root.querySelector('.qc-total'),
      note: root.querySelector('.qc-note'),
      book: root.querySelector('.qc-book')
    };

    function selectedTier() {
      var r = root.querySelector('input[name="' + uid + '-tier"]:checked');
      var id = r ? r.value : defaultTier;
      for (var i = 0; i < tiers.length; i++) if (tiers[i].id === id) return tiers[i];
      return tiers[0];
    }

    function update() {
      var tier = selectedTier();
      var adults = clamp(inputs.adults.value, 1, MAX_ADULTS);
      var children = clamp(inputs.children.value, 0, MAX_CHILDREN);
      var total = tier.price * adults;

      out.breakdown.textContent = formatINR(tier.price) + ' × ' + adults +
        (adults === 1 ? ' adult' : ' adults') + ' (' + tier.label + ')';
      out.total.textContent = formatINR(total);

      var notes = [];
      if (adults % 2 === 1) notes.push(adults === 1
        ? 'Travelling solo? A single-room supplement may apply.'
        : 'Odd number of adults: a triple-sharing or extra-room adjustment may apply.');
      if (children > 0) notes.push('Child pricing (' + children + ') depends on age & bed — we\'ll add it in your quote.');
      out.note.textContent = notes.join(' ');
      out.note.style.display = notes.length ? '' : 'none';

      var msg = 'Hi Pixlo Holidays! I want to book:\n' +
        '• Package: ' + pkg + '\n' +
        '• Option: ' + tier.label + ' (' + formatINR(tier.price) + '/person)\n' +
        '• Travel date: ' + readableDate(inputs.date.value) + '\n' +
        '• Adults: ' + adults + (children ? ' | Children: ' + children : '') + '\n' +
        '• Estimated total: ' + formatINR(total) + (children ? ' + child charges' : '') + '\n' +
        'Please confirm availability.';
      out.book.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
      out.book.dataset.value = String(total);
    }

    root.addEventListener('input', update);
    root.addEventListener('change', function (e) {
      if (e.target === inputs.adults) inputs.adults.value = clamp(inputs.adults.value, 1, MAX_ADULTS);
      if (e.target === inputs.children) inputs.children.value = clamp(inputs.children.value, 0, MAX_CHILDREN);
      update();
    });
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('.qc-inc, .qc-dec');
      if (!btn) return;
      var field = btn.getAttribute('data-target');
      var input = inputs[field];
      var step = btn.classList.contains('qc-inc') ? 1 : -1;
      input.value = field === 'adults'
        ? clamp(+input.value + step, 1, MAX_ADULTS)
        : clamp(+input.value + step, 0, MAX_CHILDREN);
      update();
    });
    out.book.addEventListener('click', function () {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          currency: 'INR',
          value: Number(out.book.dataset.value) || 0,
          item_name: pkg,
          item_variant: selectedTier().label,
          method: 'quote_calculator'
        });
      }
    });

    update();
  }

  function initAll() {
    document.querySelectorAll('.quote-calc').forEach(init);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();

/* Fixed-departure group trips.
 *
 * ── HOW TO ADD A BATCH ──────────────────────────────────────────────
 * Add an object to GROUP_TRIPS below, commit and push. Example:
 *
 *   {
 *     title: 'Goa Express Weekend',            // shown on the card
 *     packageUrl: 'goa-express-tour-package.html',
 *     image: 'assets/images/destinations/goa.webp',
 *     from: 'Surat',                           // departure city
 *     depart: '2026-11-13',                    // YYYY-MM-DD
 *     return: '2026-11-16',                    // YYYY-MM-DD
 *     price: 4999,                             // per person, INR
 *     seatsTotal: 15,
 *     seatsBooked: 0,                          // update as people pay
 *     advance: 1000,                           // optional: advance to reserve a seat
 *     highlights: ['Sleeper train both ways', 'AC hotel, 2 nights', 'South Goa tour']
 *   },
 *
 * Batches disappear automatically after their departure date.
 * With no upcoming batches, the page shows a waitlist sign-up instead.
 * ────────────────────────────────────────────────────────────────────
 */
var GROUP_TRIPS = [
];

(function () {
  var WHATSAPP_NUMBER = '917021662074';

  function formatINR(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }

  function parseDate(s) {
    return new Date(s + 'T00:00:00');
  }

  function shortDate(s) {
    return parseDate(s).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function waLink(text) {
    return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);
  }

  function trackLead(label, value) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', {
        currency: 'INR', value: value || 0, item_name: label, method: 'group_trip'
      });
    }
  }

  function card(t) {
    var left = Math.max(0, t.seatsTotal - t.seatsBooked);
    var soldOut = left === 0;
    var pct = Math.min(100, Math.round((t.seatsBooked / t.seatsTotal) * 100));
    var dates = shortDate(t.depart) + ' → ' + shortDate(t.return);
    var seatText = soldOut ? 'Sold out' : (left <= 5 ? 'Only ' + left + ' seats left' : left + ' of ' + t.seatsTotal + ' seats left');
    var msg = soldOut
      ? 'Hi Pixlo Holidays! The ' + t.title + ' batch (' + dates + ') is sold out. Please add me to the waitlist for the next batch.'
      : 'Hi Pixlo Holidays! I want to reserve a seat on the group trip:\n• ' + t.title + '\n• Dates: ' + dates +
        '\n• From: ' + t.from + '\n• Price: ' + formatINR(t.price) + '/person' +
        (t.advance ? '\n• Advance to reserve: ' + formatINR(t.advance) : '') +
        '\nNumber of travellers: ';
    var highlights = (t.highlights || []).map(function (h) {
      return '<li><i class="fas fa-check"></i> ' + escapeHtml(h) + '</li>';
    }).join('');

    return '<article class="gt-card' + (soldOut ? ' gt-soldout' : '') + '">' +
      (t.image ? '<div class="gt-img"><img src="' + escapeHtml(t.image) + '" alt="' + escapeHtml(t.title) + '" width="400" height="240" loading="lazy" />' +
        '<span class="gt-date-badge">' + escapeHtml(dates) + '</span></div>' : '') +
      '<div class="gt-body">' +
        '<h3>' + escapeHtml(t.title) + '</h3>' +
        '<p class="gt-from"><i class="fas fa-train"></i> From ' + escapeHtml(t.from) + '</p>' +
        (highlights ? '<ul class="gt-highlights">' + highlights + '</ul>' : '') +
        '<div class="gt-seats"><div class="gt-seats-bar"><span style="width:' + pct + '%"></span></div>' +
          '<span class="gt-seats-text' + (left <= 5 ? ' gt-urgent' : '') + '">' + seatText + '</span></div>' +
        '<div class="gt-price-row"><div><span class="gt-price">' + formatINR(t.price) + '</span> <span class="gt-per">/ person</span></div>' +
          (t.advance && !soldOut ? '<span class="gt-advance">Reserve with ' + formatINR(t.advance) + '</span>' : '') + '</div>' +
        '<a class="btn-amber gt-book" href="' + waLink(msg) + '" target="_blank" rel="noopener noreferrer" data-label="' + escapeHtml(t.title) + '" data-value="' + (soldOut ? 0 : t.price) + '">' +
          '<i class="fab fa-whatsapp"></i> ' + (soldOut ? 'Join waitlist' : 'Reserve my seat') + '</a>' +
        (t.packageUrl ? '<a class="gt-details" href="' + escapeHtml(t.packageUrl) + '">View full itinerary →</a>' : '') +
      '</div></article>';
  }

  function render() {
    var list = document.getElementById('group-trips-list');
    if (!list) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var upcoming = GROUP_TRIPS.filter(function (t) {
      return t.depart && parseDate(t.depart) >= today && t.seatsTotal > 0;
    }).sort(function (a, b) {
      return parseDate(a.depart) - parseDate(b.depart);
    });

    if (!upcoming.length) {
      list.innerHTML = '<div class="gt-empty">' +
        '<i class="fas fa-calendar-plus"></i>' +
        '<h3>New batches are being scheduled</h3>' +
        '<p>Join the waitlist and we\'ll message you on WhatsApp as soon as the next departure dates open — before we announce them publicly.</p>' +
        '<a class="btn-amber gt-book" data-label="Waitlist" data-value="0" target="_blank" rel="noopener noreferrer" href="' +
          waLink('Hi Pixlo Holidays! Please add me to the group trip waitlist.\nPreferred trip (Goa / Himachal / Kerala / other): \nMy city: \nNumber of travellers: ') +
        '"><i class="fab fa-whatsapp"></i> Join the waitlist</a></div>';
    } else {
      list.innerHTML = '<div class="gt-grid">' + upcoming.map(card).join('') + '</div>';
    }

    list.addEventListener('click', function (e) {
      var a = e.target.closest('.gt-book');
      if (a) trackLead(a.getAttribute('data-label'), Number(a.getAttribute('data-value')));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();

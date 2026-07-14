# Pixlo Holidays

A premium, GitHub Pages-compatible static travel website designed for maximum conversion and SEO performance.

## Features

- **No Booking Fees** - Free custom itinerary planning
- **Personal Travel Expert** - Dedicated WhatsApp support
- **500+ Happy Travelers** - 4.9★ average rating
- **Domestic & International Packages** - Himachal, Goa, Kerala, Thailand, Vietnam, Philippines, Malaysia, Bali
- **Mobile-First Design** - Responsive and accessible
- **PWA Support** - Installable on mobile devices
- **SEO Optimized** - JSON-LD structured data, sitemap, robots.txt

## Project Structure

```
pixlo-holidays-website/
├── .nojekyll              # Prevents GitHub Pages Jekyll processing
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions deployment workflow
├── assets/
│   ├── images/
│   │   ├── destinations/    # Destination hero images (webp)
│   │   └── og-*.webp        # Open Graph social share images
│   ├── icons/             # Favicon and PWA icons
│   ├── domestic/          # Domestic destination assets
│   └── international/      # International destination assets
├── css/
│   ├── tailwind.css         # Compiled Tailwind CSS (homepage)
│   └── pixlo-theme.css      # Shared theme for inner pages
├── js/
│   └── components.js        # Header/footer partial loader + interactions
├── components/
│   ├── header.html          # Reusable site header partial
│   └── footer.html          # Reusable site footer partial
├── index.html               # Homepage
├── domestic.html            # Domestic packages page
├── international.html       # International packages page
├── contact.html             # Contact page
├── goa-tour-packages.html        # Goa package page
├── kerala-tour-packages.html      # Kerala package page
├── himachal-tour-packages.html    # Himachal package page
├── thailand-tour-packages.html    # Thailand package page
├── vietnam-tour-packages.html     # Vietnam package page
├── philippines-tour-packages.html # Philippines package page
├── malaysia-tour-packages.html    # Malaysia package page
├── bali-tour-packages.html        # Bali package page
├── privacy.html             # Privacy policy
├── refund.html              # Refund policy
├── terms.html               # Terms & conditions
├── 404.html                 # Custom error page
├── manifest.json            # PWA manifest
├── browserconfig.xml        # Windows tiles config
├── humans.txt               # Human-readable site info
├── robots.txt               # Search engine directives
├── sitemap.xml              # XML sitemap
└── sw.js                    # Service worker (PWA)
```

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/pixloholidays-web/pixloholidays.git
   cd pixloholidays
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve
   ```

3. No build process required - the site uses pre-compiled CSS.

> **Note:** The header and footer are loaded as HTML partials via `js/components.js` (fetch). When opening pages directly via `file://`, the browser may block these fetches — use a local server (above) to see the header/footer render correctly.

## GitHub Pages Deployment

### Automatic Deployment (Recommended)

1. Push to the `main` or `master` branch
2. GitHub Actions will automatically deploy to GitHub Pages
3. Configure your repository settings:
   - Go to Settings > Pages
   - Source: GitHub Actions
   - Custom domain: (optional)

### Manual Deployment

1. Push files to the `gh-pages` branch:
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

2. Or use the repository's root as the publishing source in repository settings.

## SEO Features

- **Open Graph** - Rich social media previews
- **Twitter Cards** - Optimized for Twitter sharing
- **JSON-LD Schema** - TravelAgency, Organization, FAQ, Website, Product, BreadcrumbList
- **Canonical URLs** - Prevents duplicate content
- **Sitemap** - XML sitemap for search engines
- **Robots.txt** - Search engine directives
- **Breadcrumbs** - Navigation schema on all pages

## Performance Optimizations

- Lazy loading images
- WebP image format
- Preconnect to fonts
- Font-display: swap
- Reduced motion support
- Minified CSS
- Deferred JavaScript

## Conversion Features

- **Hero Section** - Clear value proposition: "Plan Your Dream Holiday—Without Paying Booking Fees"
- **Free Trip Planner Form** - Generates WhatsApp message with user preferences
- **Trust Signals** - No booking fees, free planning, 24/7 support, GST registered
- **Package Cards** - Price visible upfront, rating, duration, CTA buttons
- **Floating WhatsApp Button** - Always visible on mobile
- **Testimonials** - Real customer reviews
- **FAQ Section** - AI-search optimized questions

## Customization

### Update Contact Information
Edit the following in `components/header.html`, `components/footer.html`, and all HTML files:
- WhatsApp number: `+91-7021662074`
- Email: `pixloholidays@gmail.com`

### Add New Packages
1. Create a new package page (e.g., `new-package.html`) modeled on an existing `*tour-packages.html` file
2. Add the destination card to `international.html` or `domestic.html`
3. Add the destination image to `assets/images/destinations/`
4. Add the Open Graph image to `assets/images/` (e.g., `og-new.webp`)

### Update Images
Replace images in `assets/images/` with your own WebP images. Recommended sizes:
- Hero images: 1920x1080px
- Destination cards: 800x600px
- OG share images: 1200x630px

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Android Chrome)

## License

MIT License - Feel free to use and modify for your travel business.
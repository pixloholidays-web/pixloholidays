# Pixlo Holidays

A premium, GitHub Pages-compatible static travel website designed for maximum conversion and SEO performance.

## Features

- **No Booking Fees** - Free custom itinerary planning
- **Personal Travel Expert** - Dedicated WhatsApp support
- **500+ Happy Travelers** - 4.9★ average rating
- **Domestic & International Packages** - India, Thailand, Vietnam, Philippines, Malaysia, Bali
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
│   │   ├── destinations/    # Destination hero images
│   │   ├── gallery/         # Instagram gallery images
│   │   ├── packages/        # Package card images
│   │   └── testimonials/    # Customer photos
│   └── icons/             # Favicon and PWA icons
├── css/
│   └── tailwind.css         # Compiled Tailwind CSS
├── js/
│   └── main.js              # Main JavaScript functionality
├── data/
│   ├── packages.json        # Package data
│   ├── testimonials.json    # Customer testimonials
│   ├── gallery.json         # Instagram gallery
│   └── destinations.json    # Destination data
├── index.html               # Homepage
├── domestic.html            # Domestic packages page
├── international.html       # International packages page
├── contact.html             # Contact page
├── privacy.html             # Privacy policy
├── refund.html              # Refund policy
├── terms.html               # Terms & conditions
├── manifest.json            # PWA manifest
├── browserconfig.xml        # Windows tiles config
├── humans.txt               # Human-readable site info
├── robots.txt               # Search engine directives
└── sitemap.xml              # XML sitemap
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
- **JSON-LD Schema** - TravelAgency, Organization, FAQ, Website, Product
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
- **Testimonials** - Real customer reviews with photos
- **FAQ Section** - AI-search optimized questions

## Customization

### Update Contact Information
Edit the following in all HTML files:
- WhatsApp number: `+91-7021662074`
- Email: `pixloholidays@gmail.com`

### Add New Packages
1. Add package data to `data/packages.json`
2. Create a new package page (e.g., `new-package.html`)
3. Add to navigation in all HTML files

### Update Images
Replace images in `assets/images/` with your own WebP images. Recommended sizes:
- Hero images: 1920x1080px
- Destination cards: 800x600px
- Gallery thumbnails: 400x400px
- Gallery full: 1200x1200px

## Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Android Chrome)
- IE11+ (with graceful degradation)

## License

MIT License - Feel free to use and modify for your travel business.
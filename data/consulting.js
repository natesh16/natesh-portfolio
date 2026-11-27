// Commercial content for the service-based (freelance / consulting) website.
// Commercial content for the service-based (freelance / consulting) website.

export const hero = {
  availability: 'Available for new projects',
  headline: 'High-converting websites, scalable web apps &',
  headlineAccent: 'SEO that ranks globally.',
  subheadline:
    "I'm Natesh — a full-stack developer and UI/UX designer helping startups, e-commerce brands and growing businesses turn traffic into revenue. From MERN applications to technical SEO, every decision is made to move a business metric.",
  primaryCta: 'Start a project',
  secondaryCta: 'View pricing',
  callCta: 'or book a free 20-minute call',
  proof: ['MERN & Next.js', 'Stripe & PayPal', 'Core Web Vitals', 'US · UK · GCC hours'],
};

export const services = [
  {
    id: 'full-stack',
    icon: 'code',
    title: 'Full-Stack Web Development',
    summary:
      'Custom business platforms, SaaS products and internal tools built on a foundation that will not need a rewrite in 12 months.',
    deliverables: [
      'Custom web apps & SaaS platforms',
      'MERN / Next.js architecture',
      'APIs, authentication & dashboards',
      'AWS deployment and monitoring',
    ],
    outcome: 'Built for growth, not just launch.',
  },
  {
    id: 'ecommerce',
    icon: 'commerce',
    title: 'E-Commerce Solutions',
    summary:
      'End-to-end online stores that reduce friction from product discovery to a completed, securely processed order.',
    deliverables: [
      'Storefront design & development',
      'Stripe & PayPal integration',
      'Product, cart & checkout flows',
      'Conversion tracking & analytics',
    ],
    outcome: 'Fewer drop-offs. More completed orders.',
  },
  {
    id: 'ui-ux',
    icon: 'design',
    title: 'UI/UX Design',
    summary:
      'Interfaces that feel effortless — structured around the decisions your visitors actually need to make.',
    deliverables: [
      'Wireframes & user flows',
      'Interactive prototypes',
      'Design systems & component libraries',
      'Usability testing & iteration',
    ],
    outcome: 'Clarity that compounds into conversions.',
  },
  {
    id: 'seo',
    icon: 'seo',
    title: 'Technical SEO & Optimization',
    summary:
      'Fast, indexable, mobile-first sites engineered for visibility in US, UK and global search results.',
    deliverables: [
      'Core Web Vitals optimization',
      'Technical audits & fixes',
      'Structured data & metadata',
      'International SEO foundations',
    ],
    outcome: 'Higher rankings. Lower bounce.',
  },
];

export const pricing = [
  {
    id: 'basic',
    name: 'Starter',
    tagline: 'Fast fixes, landing pages and SEO foundations that get you live quickly.',
    price: '$50 – $250',
    priceFrom: 50,
    priceTo: 250,
    priceNote: 'One-time project fee',
    bestFor: 'Quick fixes, landing pages & SEO setup',
    popular: false,
    features: [
      'Bug fixes, UI polish or one-page landing site',
      'Mobile-first responsive layout',
      'On-page SEO, sitemap & OpenGraph setup',
      'Contact / lead capture form & email setup',
      'Google Analytics installed and verified',
      '2–5 day turnaround',
    ],
    cta: 'Start from $50',
  },
  {
    id: 'standard',
    name: 'Growth',
    tagline: 'A complete multi-page site engineered to convert visitors into leads.',
    price: '$350 – $950',
    priceFrom: 350,
    priceTo: 950,
    priceNote: 'One-time project fee',
    bestFor: 'Growing businesses & service brands',
    popular: true,
    features: [
      'Everything in Starter, plus:',
      'Multi-page custom website (up to 6 pages)',
      'UI/UX wireframe & interactive design',
      'Lead capture and CRM-ready forms',
      'Core Web Vitals performance tuning',
      'Technical SEO & structured data setup',
      '1–2 week delivery',
    ],
    cta: 'Choose Growth',
  },
  {
    id: 'premium',
    name: 'Scale',
    tagline: 'A full-stack product or store, built and deployed end to end.',
    price: '$1,200 – $2,000+',
    priceFrom: 1200,
    priceTo: null,
    priceNote: 'Scoped per project',
    bestFor: 'SaaS MVPs, marketplaces & full stores',
    popular: false,
    features: [
      'Everything in Growth, plus:',
      'Full-stack MERN / Next.js app or e-commerce store',
      'Custom features, auth & admin dashboards',
      'AWS deployment & CI/CD automation',
      'Advanced technical SEO & speed audit',
      'Stripe / PayPal payment integration',
      '30 days of post-launch support',
    ],
    cta: 'Scope a Scale build',
  },
];

export const pricingTrust = {
  note: 'Flexible milestone payments (25%–50% upfront). International payments accepted via Stripe, PayPal and Payoneer.',
  currency: 'All prices in USD ($50 – $2,000+). Scope and timeline confirmed in writing before work begins.',
  bookingLabel: 'Not sure which tier fits?',
  bookingCta: 'Book a free 20-minute call',
  // Replace with your Calendly (or Cal.com) link when it is ready.
  bookingUrl: '',
};

export const inquiry = {
  services: [
    'Full-Stack Web Development',
    'E-Commerce Solutions',
    'UI/UX Design',
    'Technical SEO & Optimization',
    'Not sure yet — need advice',
  ],
  budgets: [
    'Starter — $50 to $250',
    'Growth — $350 to $950',
    'Scale — $1,200 to $2,000+',
    'Ongoing retainer',
    'I need a recommendation',
  ],
};

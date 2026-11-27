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
    name: 'Basic',
    tagline: 'A focused one-page presence that starts conversations.',
    price: '$300 – $500',
    priceFrom: 300,
    priceTo: 500,
    priceNote: 'One-time project fee',
    bestFor: 'Founders validating an offer',
    popular: false,
    features: [
      'One-page business profile or landing page',
      'Mobile-first responsive design',
      'Basic on-page SEO setup',
      'Contact / lead capture form',
      'Analytics installed and verified',
      '5–7 day turnaround',
    ],
    cta: 'Start with Basic',
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'A complete website designed to turn visitors into leads.',
    price: '$800 – $1,500',
    priceFrom: 800,
    priceTo: 1500,
    priceNote: 'One-time project fee',
    bestFor: 'Growing businesses & e-commerce brands',
    popular: true,
    features: [
      'Everything in Basic, plus:',
      'Multi-page custom website (up to 6 pages)',
      'Full UI/UX wireframe & prototype',
      'Lead capture and CRM-ready forms',
      'Core Web Vitals performance tuning',
      'Standard technical SEO setup',
      '2–3 week delivery',
    ],
    cta: 'Choose Standard',
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'A full product build, engineered and tested end to end.',
    price: '$2,000+',
    priceFrom: 2000,
    priceTo: null,
    priceNote: 'Scoped per project',
    bestFor: 'SaaS, marketplaces & full stores',
    popular: false,
    features: [
      'Everything in Standard, plus:',
      'Full-stack web app or complete e-commerce store',
      'Custom features & admin dashboards',
      'User testing and QA',
      'Advanced technical SEO',
      'Stripe / PayPal payment integration',
      '30 days of post-launch support',
    ],
    cta: 'Scope a Premium build',
  },
];

export const pricingTrust = {
  note: 'Flexible milestone payments (25%–50% upfront). International payments accepted via Stripe, PayPal and Payoneer.',
  currency: 'All prices in USD. Scope and timeline confirmed in writing before work begins.',
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
    'Basic — $300 to $500',
    'Standard — $800 to $1,500',
    'Premium — $2,000+',
    'Ongoing retainer',
    'I need a recommendation',
  ],
};

import { Inter, DM_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { profile } from '../data/portfolio';
import { pricing, services } from '../data/consulting';
import {
  SITE_DESCRIPTION,
  SITE_TAGLINE,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
  jsonLdString,
} from '../lib/site';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Effects from '../components/Effects';
import BackgroundFX from '../components/BackgroundFX';
import SoundFX from '../components/SoundFX';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

const description = SITE_DESCRIPTION;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: '%s | Natesh' },
  description,
  applicationName: 'Natesh — Full-Stack Development & SEO',
  keywords: [
    'hire full stack developer',
    'freelance web developer',
    'MERN stack developer',
    'React.js developer',
    'Next.js developer',
    'e-commerce website development',
    'Stripe payment integration',
    'UI UX designer',
    'technical SEO consultant',
    'Core Web Vitals optimization',
    'web app development for startups',
    'US UK Middle East web developer',
  ],
  authors: [{ name: 'Natesh', url: SITE_URL }],
  creator: 'Natesh',
  publisher: 'Natesh',
  category: 'technology',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: SITE_TITLE,
    description,
    url: SITE_URL,
    siteName: 'Natesh — Full-Stack Development & SEO',
    locale: 'en_US',
    images: [
      {
        url: '/profile.png',
        width: 1106,
        height: 1422,
        alt: 'Natesh — Full-Stack Web Developer & SEO Consultant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description,
    images: ['/profile.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  },
};

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0b0d12' };

const expertise = [
  'Full-stack web development',
  'MERN stack',
  'React.js',
  'Next.js',
  'E-commerce development',
  'Stripe and PayPal integration',
  'UI/UX design',
  'Technical SEO',
  'Core Web Vitals optimization',
  'Amazon Web Services',
  'CI/CD automation',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Natesh — Full-Stack Development & SEO',
      description,
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#business`,
      name: 'Natesh — Full-Stack Development & SEO',
      alternateName: 'Natesh',
      url: SITE_URL,
      image: absoluteUrl('/profile.png'),
      description,
      slogan: SITE_TAGLINE,
      email: profile.email,
      telephone: profile.phone.replace(/\s/g, ''),
      priceRange: '$300 - $2,000+',
      currenciesAccepted: 'USD, GBP, EUR, AED, INR',
      paymentAccepted: 'Stripe, PayPal, Payoneer, Bank transfer',
      areaServed: [
        { '@type': 'Country', name: 'United States' },
        { '@type': 'Country', name: 'United Kingdom' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'Qatar' },
        { '@type': 'Country', name: 'Kuwait' },
        { '@type': 'Country', name: 'India' },
      ],
      founder: { '@id': `${SITE_URL}/#person` },
      sameAs: [profile.linkedin, profile.github],
      knowsAbout: expertise,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Web development, e-commerce and SEO services',
        itemListElement: [
          ...services.map((service) => ({
            '@type': 'Offer',
            name: service.title,
            description: service.summary,
            url: `${SITE_URL}/#services`,
            availability: 'https://schema.org/InStock',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              description: service.summary,
            },
          })),
          ...pricing.map((tier) => ({
            '@type': 'Offer',
            name: `${tier.name} package`,
            description: tier.tagline,
            url: `${SITE_URL}/#pricing`,
            availability: 'https://schema.org/InStock',
            priceCurrency: 'USD',
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              minPrice: tier.priceFrom,
              ...(tier.priceTo ? { maxPrice: tier.priceTo } : {}),
            },
          })),
        ],
      },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: profile.name,
      jobTitle: profile.title,
      url: SITE_URL,
      image: absoluteUrl('/profile.png'),
      email: profile.email,
      description,
      worksFor: { '@id': `${SITE_URL}/#business` },
      sameAs: [profile.linkedin, profile.github],
      knowsAbout: expertise,
    },
  ],
};

// Runs before first paint so reveal animations never flash visible content.
const animGate =
  "if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window)document.documentElement.classList.add('anim')";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: animGate }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
        />
        <a className="skip" href="#main">Skip to content</a>
        <div id="bar" aria-hidden="true" />
        <BackgroundFX />
        <Navbar />
        {children}
        <Footer />
        <Effects />
        <SoundFX />
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-MPV93GTS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
        </Script>
      </body>
    </html>
  );
}

import { Inter, DM_Mono } from 'next/font/google';
import './globals.css';
import { profile } from '../data/portfolio';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, absoluteUrl, jsonLdString } from '../lib/site';
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
  title: { default: SITE_TITLE, template: '%s | Natesh L' },
  description,
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/feed.xml' },
  },
  openGraph: {
    title: SITE_TITLE,
    description: 'Scalable MERN applications, AWS cloud and CI/CD automation.',
    type: 'profile',
    url: '/',
    siteName: 'Natesh L',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: 'Scalable MERN applications, AWS cloud and CI/CD automation.',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  },
};

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0b0d12' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: profile.name,
  jobTitle: profile.title,
  url: SITE_URL,
  image: absoluteUrl('/profile.png'),
  description,
  email: profile.email,
  telephone: profile.phone.replace(/\s/g, ''),
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coimbatore',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Rohini College of Engineering & Technology',
  },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: [
    'Full Stack Development',
    'MERN stack',
    'DevOps',
    'Amazon Web Services',
    'Docker',
    'Jenkins',
    'GitHub Actions',
    'CI/CD automation',
    'Infrastructure as Code',
    'Cloud monitoring',
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
      </body>
    </html>
  );
}

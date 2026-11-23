import { Inter, DM_Mono } from 'next/font/google';
import './globals.css';
import { profile } from '../data/portfolio';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Effects from '../components/Effects';

const sans = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

const description =
  'Natesh L is a Full Stack Developer and DevOps Engineer building and deploying MERN applications on AWS with Docker, Jenkins and GitHub Actions.';

export const metadata = {
  title: { default: `${profile.name} | ${profile.title}`, template: '%s' },
  description,
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: 'Scalable MERN applications, AWS cloud and CI/CD automation.',
    type: 'profile',
  },
};

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#fafafa' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  telephone: profile.phone.replace(/\s/g, ''),
  sameAs: [profile.linkedin, profile.github],
  alumniOf: 'Rohini College of Engineering & Technology',
};

// Runs before first paint so reveal animations never flash visible content.
const animGate =
  "if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window)document.documentElement.classList.add('anim')";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: animGate }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a className="skip" href="#main">Skip to content</a>
        <div id="bar" aria-hidden="true" />
        <Navbar />
        {children}
        <Footer />
        <Effects />
      </body>
    </html>
  );
}

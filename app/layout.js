import { Space_Grotesk, DM_Mono } from 'next/font/google';
import './globals.css';
import { profile } from '../data/portfolio';

const sans = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const description =
  'Natesh L is a Full Stack Developer and DevOps Engineer building and deploying MERN applications on AWS with Docker, Jenkins and GitHub Actions.';

export const metadata = {
  title: `${profile.name} | ${profile.title}`,
  description,
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: 'Scalable MERN applications, AWS cloud and CI/CD automation.',
    type: 'profile',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#050a16',
};

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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <noscript>
          <style>{'#ld{display:none!important}'}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

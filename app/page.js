import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import ClientDetails from '../components/ClientDetails';
import Contact from '../components/Contact';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../lib/site';

export const metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
    description: SITE_DESCRIPTION,
    images: ['/profile.png'],
  },
};

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Services />
      <Pricing />
      <ClientDetails />
      <Contact />
    </main>
  );
}

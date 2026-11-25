import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import ToolStackOverview from '../components/ToolStackOverview';
import Education from '../components/Education';
import Training from '../components/Training';
import Writing from '../components/Writing';
import Profiles from '../components/Profiles';
import Contact from '../components/Contact';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../lib/site';

export const metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'profile',
    firstName: 'Natesh',
    lastName: 'L',
    username: 'natesh16',
    url: SITE_URL,
    siteName: 'Natesh — Full Stack Developer & DevOps Engineer',
    locale: 'en_US',
    images: [
      {
        url: '/profile.png',
        width: 1106,
        height: 1422,
        alt: 'Natesh — Full Stack Developer & DevOps Engineer',
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
      <About />
      <Experience />
      <Projects />
      <Skills />
      <ToolStackOverview />
      <Education />
      <Training />
      <Writing />
      <Profiles />
      <Contact />
    </main>
  );
}

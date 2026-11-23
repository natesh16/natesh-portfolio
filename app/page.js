import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Training from '../components/Training';
import Writing from '../components/Writing';
import Profiles from '../components/Profiles';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Training />
      <Writing />
      <Profiles />
      <Contact />
    </main>
  );
}

import Backdrop from '../components/Backdrop';
import Navbar from '../components/Navbar';
import SectionDots from '../components/SectionDots';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Training from '../components/Training';
import Profiles from '../components/Profiles';
import ResumeSection from '../components/ResumeSection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Effects from '../components/Effects';

export default function Home() {
  return (
    <>
      <Backdrop />
      <Navbar />
      <SectionDots />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Training />
        <Profiles />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
      <Effects />
    </>
  );
}

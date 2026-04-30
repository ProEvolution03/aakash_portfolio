import Navbar          from './components/jsx/Navbar';
import Hero            from './components/jsx/Hero';
import About           from './components/jsx/About';
import Projects        from './components/jsx/Projects';
import Skills          from './components/jsx/Skills';
import Contact         from './components/jsx/Contact';
import Currently       from './components/jsx/Currently';
import Footer          from './components/jsx/Footer';
import TransitionFlash from './components/jsx/TransitionFlash';
import CustomCursor    from './components/jsx/CustomCursor';

export default function App() {
  return (
    <div className="app-wrapper">
      <CustomCursor />
      <TransitionFlash />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Currently />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

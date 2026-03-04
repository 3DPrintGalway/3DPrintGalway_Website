import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Gallery from './sections/Gallery';
import Services from './sections/Services';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import FloatingCTA from './sections/FloatingCTA';

function App() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <Gallery />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

export default App;

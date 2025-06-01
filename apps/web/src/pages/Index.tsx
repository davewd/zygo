import About from './About';
import Contact from './Contact';
import Features from './Features';
import Footer from './Footer';
import Hero from './Hero';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

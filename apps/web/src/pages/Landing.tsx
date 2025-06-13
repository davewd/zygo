import Footer from './Footer';
import About from './landing/About';
import Features from './landing/Features';
import Hero from './landing/Hero';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
};

export default Landing;

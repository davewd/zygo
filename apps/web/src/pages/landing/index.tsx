import { NavigationBar } from '@zygo/ui';
import Footer from '../Footer';
import About from './About';
import Features from './Features';
import Hero from './Hero';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <NavigationBar className="bg-primary text-primary-foreground" />
      <Hero />
      <Features />
      <About />
      <Footer />
    </div>
  );
};

export default Landing;

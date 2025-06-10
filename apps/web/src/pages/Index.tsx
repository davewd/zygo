import { NavigationBar } from '@zygo/ui';
import Footer from './Footer';
import About from './landing/About';
import Features from './landing/Features';
import Hero from './landing/Hero';

const Index = () => {
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

export default Index;

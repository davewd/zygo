
import About from "@zygo/ui/About";
import Contact from "@zygo/ui/Contact";
import Features from "@zygo/ui/Features";
import Footer from "@zygo/ui/Footer";
import Hero from "@zygo/ui/Hero";

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

import { Button } from '@zygo/ui';
import { ArrowRight, Heart } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zygo-cream via-white to-zygo-mint"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-zygo-yellow rounded-full opacity-60 animate-float"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 bg-zygo-blue rounded-full opacity-50 animate-float"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute bottom-40 left-20 w-12 h-12 bg-zygo-mint rounded-full opacity-70 animate-float"
        style={{ animationDelay: '2s' }}
      ></div>
      <div
        className="absolute bottom-60 right-40 w-8 h-8 bg-zygo-red rounded-full opacity-60 animate-float"
        style={{ animationDelay: '3s' }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Heart className="text-zygo-red mr-3" size={48} />
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800">
              Zy<span className="text-zygo-blue">go</span>
            </h1>
          </div>

          <h2 className="text-3xl md:text-5xl font-light text-gray-700 mb-8 leading-tight">
            Where Families <span className="text-zygo-red font-semibold">Grow</span> Together
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Building stronger connections, fostering growth, and creating lasting memories through
            our family-centered community network.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-zygo-red hover:bg-zygo-red/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Community
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white px-8 py-4 text-lg rounded-full transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

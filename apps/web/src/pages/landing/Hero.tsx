import { Button } from '@zygo/ui';
import Typewriter from 'typewriter-effect';
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
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800">Zygo</h1>
          </div>

          <h2 className="flex items-center justify-center flex-nowrap text-3xl md:text-5xl font-light text-gray-700 mb-8 leading-tight">
            Where&nbsp;
            <Typewriter
              options={{
                strings: [
                  'Families',
                  'headmistresses',
                  'Teachers',
                  'Educators',
                  'Caregivers',
                  'Grandparents',
                  'Aunts',
                  'Uncles',
                  'Siblings',
                  'Guardians',
                  'Mentors',
                  'Role Models',
                  'Supporters',
                  'Communities',
                  'Partners',
                  'Co-parents',
                  'Children',
                  'Parents',
                  "Nona's",
                  'Best Friends',
                  'Doctors',
                  'Nurses',
                  'Midwives',
                  'Physiotherapists',
                  'Occupational Therapists',
                  'Speech Therapists',
                  'Dietitians',
                  'Psychologists',
                  'Counsellors',
                ],
                autoStart: true,
                loop: true,
              }}
            />
            <span className="text-zygo-red font-semibold inline-block">Grow Together</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Build your village. Grow with your health, education and wellness experts. Enable your
            family to thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-zygo-red hover:bg-zygo-red/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Login / Sign-up
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

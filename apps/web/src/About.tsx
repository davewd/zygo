import { Button } from "@zygo/ui/button";
import { Eye, Heart, Target } from "lucide-react";

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-zygo-cream/30 to-zygo-mint/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About <span className="text-zygo-red">Zygo</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We believe that every family has the potential to grow, learn, and thrive together. 
              Zygo is more than just a platform – it's a movement towards stronger, more connected families.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Heart className="text-zygo-red mr-3" size={28} />
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To create a supportive ecosystem where families can connect, learn, and grow together. 
                We provide the tools, resources, and community needed to navigate the beautiful journey 
                of family life with confidence and joy.
              </p>
            </div>
            <div className="bg-zygo-yellow/30 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">10,000+</div>
                <div className="text-gray-600">Families Connected</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1 bg-zygo-blue/30 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 mb-2">500+</div>
                <div className="text-gray-600">Growth Activities</div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Eye className="text-zygo-red mr-3" size={28} />
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                A world where every family feels supported, connected, and empowered to reach their 
                full potential. Through community, education, and shared experiences, we're building 
                bridges that strengthen the foundation of society – the family unit.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <Target className="text-zygo-red mr-3" size={28} />
              Why Choose Zygo?
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-8 max-w-3xl mx-auto">
              We understand that every family is unique, with their own challenges, dreams, and goals. 
              That's why we've created a flexible, inclusive platform that adapts to your family's needs 
              while connecting you with a community that truly understands your journey.
            </p>
            <Button size="lg" className="bg-zygo-red hover:bg-zygo-red/90 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

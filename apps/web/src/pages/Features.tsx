import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import { Award, BookOpen, Calendar, MessageCircle, Shield, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: 'Family Connections',
      description:
        'Connect with like-minded families in your community and beyond. Build lasting relationships that support growth and learning.',
      bgColor: 'bg-zygo-yellow/20',
      iconColor: 'text-gray-700',
    },
    {
      icon: Calendar,
      title: 'Growth Activities',
      description:
        'Access curated activities, workshops, and events designed to foster family development and create meaningful experiences.',
      bgColor: 'bg-zygo-blue/20',
      iconColor: 'text-gray-700',
    },
    {
      icon: MessageCircle,
      title: 'Support Network',
      description:
        'Join discussion groups, share experiences, and receive guidance from other families on similar journeys.',
      bgColor: 'bg-zygo-mint/30',
      iconColor: 'text-gray-700',
    },
    {
      icon: BookOpen,
      title: 'Learning Resources',
      description:
        "Access expert-curated content, guides, and tools to support your family's growth in every stage of life.",
      bgColor: 'bg-zygo-cream/40',
      iconColor: 'text-gray-700',
    },
    {
      icon: Award,
      title: 'Milestone Tracking',
      description:
        "Celebrate achievements and track your family's growth journey with our milestone and progress features.",
      bgColor: 'bg-zygo-yellow/20',
      iconColor: 'text-gray-700',
    },
    {
      icon: Shield,
      title: 'Safe Environment',
      description:
        'Enjoy a secure, moderated platform where families can connect and share in a trusted, supportive environment.',
      bgColor: 'bg-zygo-blue/20',
      iconColor: 'text-gray-700',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-zygo-cream/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Everything Your Family Needs to <span className="text-zygo-blue">Thrive</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the tools, connections, and resources that make family growth an exciting and
            supported journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`${feature.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105`}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 rounded-full bg-white/50 w-fit">
                  <feature.icon className={`${feature.iconColor}`} size={32} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

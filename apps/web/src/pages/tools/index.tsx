import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import { Baby, Clock, Heart, Timer, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Tools() {
  const toolCategories = [
    {
      title: 'Planning & Organization',
      description: 'Tools to help you plan and organize family activities',
      tools: [
        {
          id: 'holiday-planner',
          name: 'Holiday Planner',
          description: 'Plan activities and playdates for your children during holiday weeks',
          icon: Calendar,
          iconColor: 'text-purple-600',
          bgColor: 'bg-purple-50',
          route: '/tools/holiday-planner',
          comingSoon: false,
        },
      ],
    },
    {
      title: 'Postnatal & Early Development',
      description: "Tools to support the early stages of your baby's life",
      tools: [
        {
          id: 'breastfeeding-timer',
          name: 'Breastfeeding Timer',
          description: 'Track feeding sessions with dual-breast timers and session history',
          icon: Baby,
          iconColor: 'text-pink-600',
          bgColor: 'bg-pink-50',
          route: '/tools/postnatal/breastfeeding-timer',
          comingSoon: false,
        },
        {
          id: 'sleep-tracker',
          name: 'Sleep Tracker',
          description: 'Monitor sleep patterns and nap schedules',
          icon: Clock,
          iconColor: 'text-blue-600',
          bgColor: 'bg-blue-50',
          route: '/tools/postnatal/sleep-tracker',
          comingSoon: true,
        },
      ],
    },
    {
      title: 'Health & Wellness',
      description: 'Tools to monitor and support family health',
      tools: [
        {
          id: 'growth-tracker',
          name: 'Growth Tracker',
          description: 'Record height, weight, and development milestones',
          icon: Heart,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-50',
          route: '/tools/health/growth-tracker',
          comingSoon: true,
        },
        {
          id: 'medication-reminder',
          name: 'Medication Reminder',
          description: 'Set reminders for medications and supplements',
          icon: Timer,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-50',
          route: '/tools/health/medication-reminder',
          comingSoon: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Timer className="text-zygo-red mr-3" size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Family <span className="text-zygo-red">Tools</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Practical tools to help you track, monitor, and support your family's health and
            development journey.
          </p>
        </div>

        {/* Tool Categories */}
        {toolCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{category.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.tools.map((tool, toolIndex) => (
                <Card
                  key={toolIndex}
                  className={`${tool.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105`}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div
                        className={`w-16 h-16 ${tool.bgColor} rounded-full flex items-center justify-center border-2 border-white shadow-lg`}
                      >
                        <tool.icon className={`${tool.iconColor}`} size={32} />
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                      {tool.description}
                    </CardDescription>

                    {tool.comingSoon ? (
                      <Button disabled className="w-full bg-gray-400 text-white cursor-not-allowed">
                        Coming Soon
                      </Button>
                    ) : (
                      <Link to={tool.route}>
                        <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white">
                          Open Tool
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Note */}
        <div className="text-center mt-16 p-8 bg-zygo-mint/20 rounded-2xl">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">More Tools Coming Soon!</h3>
          <p className="text-gray-600">
            We're continuously developing new tools to support your family's journey. Have a
            suggestion? We'd love to hear from you!
          </p>
        </div>
      </div>
    </div>
  );
}

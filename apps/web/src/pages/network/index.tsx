import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import {
  ArrowRight,
  Building2,
  Heart,
  Network as NetworkIcon,
  Star,
  Stethoscope,
  UserCheck,
  UserPlus,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Network = () => {
  const networkCategories = [
    {
      title: 'Immediate Family',
      description: 'Connect with your spouse, children, and grandparents',
      icon: Heart,
      iconColor: 'text-zygo-red',
      bgColor: 'bg-zygo-mint/30',
      items: ['Spouse/Partner', 'Children', 'Grandparents', 'Siblings'],
      route: '/network/family',
      comingSoon: false,
    },
    {
      title: 'Service Providers',
      description: 'Healthcare professionals and specialists supporting your family',
      icon: Stethoscope,
      iconColor: 'text-zygo-blue',
      bgColor: 'bg-zygo-blue/20',
      items: ['Doctors', 'Nurses', 'Therapists', 'Counselors'],
      route: '/community/providers',
      comingSoon: false,
    },
    {
      title: 'Service Centers',
      description: 'Facilities and institutions that serve your family needs',
      icon: Building2,
      iconColor: 'text-zygo-yellow',
      bgColor: 'bg-zygo-yellow/20',
      items: ['Hospitals', 'Clinics', 'Schools', 'Community Centers'],
      route: '/community/centers',
      comingSoon: false,
    },
    {
      title: 'Services by Type',
      description: 'Browse services organized by family needs and life stages',
      icon: Star,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      items: ['Prenatal Care', 'Early Development', "Children's Activities", 'Family Support'],
      route: '/network/services',
      comingSoon: false,
    },
  ];

  const quickActions = [
    {
      title: 'Add Family Member',
      description: 'Invite a family member to join your network',
      icon: UserPlus,
      action: () => console.log('Add family member'),
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Find Providers',
      description: 'Search for healthcare providers in your area',
      icon: UserCheck,
      action: () => console.log('Find providers'),
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Join Communities',
      description: 'Connect with other families with similar journeys',
      icon: Users,
      action: () => console.log('Join communities'),
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <NetworkIcon className="text-zygo-red mr-3" size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Your Family <span className="text-zygo-red">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover services and providers tailored to your family's journey. From prenatal care to
            children's activities, find expert support for every stage of development.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className={`${action.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:transform hover:scale-105`}
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <action.icon className={`${action.iconColor} mx-auto mb-4`} size={32} />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Network Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {networkCategories.map((category, index) => (
              <Card
                key={index}
                className={`${category.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 relative group`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <category.icon className={`${category.iconColor} mr-3`} size={32} />
                      <div>
                        <CardTitle className="text-xl font-semibold text-gray-800">
                          {category.title}
                        </CardTitle>
                        {category.comingSoon && (
                          <span className="inline-block bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full mt-1">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight
                      className="text-gray-400 group-hover:text-gray-600 transition-colors"
                      size={20}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed mb-4">
                    {category.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.items.map((item, itemIndex) => (
                      <span
                        key={itemIndex}
                        className="bg-white/70 text-gray-700 text-xs px-3 py-1 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link to={category.route}>
                    <Button
                      className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white"
                      disabled={category.comingSoon}
                    >
                      {category.comingSoon ? 'Coming Soon' : `Explore ${category.title}`}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;

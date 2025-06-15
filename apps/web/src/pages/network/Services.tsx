import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import { Activity, Baby, Calendar, Heart, MapPin, Star, Stethoscope, Users, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const serviceTypes = [
    {
      title: 'Prenatal Care',
      description: 'Comprehensive pregnancy support and preparation for expecting parents',
      familyMember: 'For You & Your Partner',
      icon: Baby,
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      services: [
        {
          title: 'Egg Freezing at Prologue with Dr. Justin Tucker',
          description: 'Expert fertility preservation consultation and treatment',
          location: 'Sydney CBD',
          price: 'From $350',
          provider: 'Dr. Justin Tucker',
          center: 'Prologue',
          route: '/network/providers/dr-justin-tucker',
        },
        {
          title: 'Before Birth Consultation at Full Circle with Rebecca Cavallaro',
          description: 'Comprehensive antenatal preparation and planning',
          location: 'Windsor, QLD',
          price: 'From $230',
          provider: 'Rebecca Cavallaro',
          center: 'Full Circle Midwifery',
          route: '/network/providers/rebecca-cavallaro',
        },
      ],
    },
    {
      title: 'Early Development (0-2 years)',
      description: 'Support for infants and toddlers in their first years',
      familyMember: 'For Your Baby',
      icon: Heart,
      iconColor: 'text-zygo-red',
      bgColor: 'bg-zygo-mint/20',
      services: [
        {
          title: 'Lactation Support at Full Circle with Rebecca Cavallaro',
          description: 'Expert breastfeeding support and consultation',
          location: 'Windsor, QLD',
          price: 'From $230',
          provider: 'Rebecca Cavallaro',
          center: 'Full Circle Midwifery',
          route: '/network/providers/rebecca-cavallaro',
        },
        {
          title: 'Kindy Gym at Active8Kids with Emily McConaghy',
          description: 'Early movement classes for children aged 0-5',
          location: 'Bondi Junction, NSW',
          price: 'From $32',
          provider: 'Emily McConaghy',
          center: 'Active8Kids',
          route: '/network/providers/emily-mcconaghy',
        },
      ],
    },
    {
      title: 'Toddler Activities (2-5 years)',
      description: 'Physical and social development for growing toddlers',
      familyMember: 'For Your Toddler',
      icon: Activity,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      services: [
        {
          title: 'Recreational Gymnastics at Active8Kids with Emily McConaghy',
          description: 'Fun gymnastics classes building confidence and skills',
          location: 'Bondi Junction, NSW',
          price: 'From $38',
          provider: 'Emily McConaghy',
          center: 'Active8Kids',
          route: '/network/providers/emily-mcconaghy',
        },
        {
          title: "Play'n Move at Active8Kids with Emily McConaghy",
          description: 'Movement and play-based activities for young children',
          location: 'Bondi Junction, NSW',
          price: 'From $32',
          provider: 'Emily McConaghy',
          center: 'Active8Kids',
          route: '/network/providers/emily-mcconaghy',
        },
      ],
    },
    {
      title: 'School Age Activities (5-12 years)',
      description: 'Engaging activities for school-aged children',
      familyMember: 'For Your Child',
      icon: Users,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      services: [
        {
          title: 'Ninja-Gym-Parkour at Active8Kids with Jake Thompson',
          description: 'Ninja warrior and parkour training for adventurous kids',
          location: 'Bondi Junction, NSW',
          price: 'From $38',
          provider: 'Jake Thompson',
          center: 'Active8Kids',
          route: '/network/providers/jake-thompson',
        },
        {
          title: 'Holiday Camps at Active8Kids with Jake Thompson',
          description: 'Full day camps with varied physical activities',
          location: 'Bondi Junction, NSW',
          price: 'From $85',
          provider: 'Jake Thompson',
          center: 'Active8Kids',
          route: '/network/providers/jake-thompson',
        },
      ],
    },
    {
      title: 'Fertility Support',
      description: 'Comprehensive fertility assessment and treatment',
      familyMember: 'For You & Your Partner',
      icon: Stethoscope,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      services: [
        {
          title: 'Fertility Consultation at Prologue with Dr. Justin Tucker',
          description: 'Comprehensive fertility assessment and treatment planning',
          location: 'Sydney CBD',
          price: 'From $450',
          provider: 'Dr. Justin Tucker',
          center: 'Prologue',
          route: '/network/providers/dr-justin-tucker',
        },
        {
          title: 'Fertility Nursing Support at Prologue with Andrea Dunne',
          description: 'Specialized nursing care throughout fertility journey',
          location: 'Sydney CBD',
          price: 'From $220',
          provider: 'Andrea Dunne',
          center: 'Prologue',
          route: '/network/providers/andrea-dunne',
        },
      ],
    },
    {
      title: 'Special Occasions',
      description: 'Memorable experiences for celebrations and holidays',
      familyMember: 'For Your Child',
      icon: Star,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      services: [
        {
          title: 'Birthday Parties at Active8Kids with Emily McConaghy',
          description: 'Active birthday party experiences with gymnastics and games',
          location: 'Bondi Junction, NSW',
          price: 'From $450',
          provider: 'Emily McConaghy',
          center: 'Active8Kids',
          route: '/network/providers/emily-mcconaghy',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Family <span className="text-zygo-red">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover services and activities tailored to your family's needs at every stage of your
            journey. Connect with expert providers at trusted centers in your area.
          </p>
        </div>

        {/* Service Types Grid */}
        <div className="space-y-12">
          {serviceTypes.map((category, index) => (
            <Card
              key={index}
              className={`${category.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <CardHeader className="pb-6">
                <div className="flex items-center mb-4">
                  <category.icon className={`${category.iconColor} mr-3`} size={32} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <CardTitle className="text-2xl font-semibold text-gray-800">
                        {category.title}
                      </CardTitle>
                      <span className="bg-zygo-red/10 text-zygo-red text-sm font-medium px-3 py-1 rounded-full">
                        {category.familyMember}
                      </span>
                    </div>
                    <CardDescription className="text-gray-600 text-lg">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Horizontal Scrolling Container */}
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
                    {category.services.map((service, serviceIndex) => (
                      <Card
                        key={serviceIndex}
                        className="bg-white/90 border-0 shadow-md hover:shadow-lg transition-all duration-200 w-[280px] h-[320px] flex flex-col flex-shrink-0 relative"
                      >
                        <CardContent className="p-0 flex flex-col h-full relative">
                          {/* Top Half - Consumer Profile */}
                          <div className="flex-1 bg-gradient-to-br from-zygo-mint/30 to-zygo-blue/20 relative">
                            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                              <div className="bg-white/60 rounded-lg p-3 mb-2 backdrop-blur-sm">
                                <h4 className="font-semibold text-gray-800 text-sm mb-1">You & Your Family</h4>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                  Seeking quality care and support
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Avatar Icons positioned on center line */}
                          <div className="absolute top-1/2 left-0 right-0 flex items-center justify-between px-8 transform -translate-y-1/2 z-20">
                            {/* Consumer Avatar - Left */}
                            <div className="w-16 h-16 bg-gradient-to-br from-zygo-mint to-zygo-blue rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                              <User className="w-8 h-8 text-white" />
                            </div>

                            {/* Collaboration X Icon - Center */}
                            <div className="w-8 h-8 bg-zygo-red rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10">
                              <X className="w-4 h-4 text-white" />
                            </div>

                            {/* Provider Avatar - Right */}
                            <div className="w-16 h-16 bg-gradient-to-br from-zygo-yellow to-zygo-cream rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                              <Stethoscope className="w-8 h-8 text-gray-700" />
                            </div>
                          </div>

                          {/* Bottom Half - Service Provider Profile */}
                          <div className="flex-1 bg-gradient-to-br from-zygo-yellow/20 to-zygo-cream/30 relative">
                            <div className="flex flex-col items-center justify-center h-full text-center p-4 pt-8">
                              <div className="bg-white/60 rounded-lg p-3 backdrop-blur-sm w-full">
                                <h4 className="font-semibold text-gray-800 text-sm mb-1">{service.provider}</h4>
                                <p className="text-xs text-gray-600 mb-2">at {service.center}</p>
                                <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {service.location}
                                </div>
                                <div className="text-sm font-medium text-zygo-red mb-2">
                                  {service.price}
                                </div>
                                <Link to={service.route}>
                                  <Button
                                    size="sm"
                                    className="bg-zygo-red hover:bg-zygo-red/90 text-white text-xs px-3 py-1"
                                  >
                                    Connect
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Fill remaining slots if less than 4 services */}
                    {Array.from({ length: Math.max(0, 4 - category.services.length) }, (_, emptyIndex) => (
                      <Card
                        key={`empty-${emptyIndex}`}
                        className="bg-white/60 border-2 border-dashed border-gray-300 w-[280px] h-[320px] flex flex-col flex-shrink-0"
                      >
                        <CardContent className="p-0 flex flex-col h-full items-center justify-center">
                          <div className="text-center text-gray-400">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                              <Star className="w-6 h-6 text-gray-400" />
                            </div>
                            <p className="text-sm font-medium">More services</p>
                            <p className="text-xs">coming soon</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Service Details Summary */}
                <div className="mt-6 pt-4 border-t border-white/30">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {category.services.map((service, idx) => (
                      <span key={idx} className="text-xs bg-white/50 px-2 py-1 rounded-full text-gray-700">
                        {service.title.split(' at ')[0]}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Swipe or scroll horizontally to explore collaboration opportunities →
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-zygo-mint/20 to-zygo-blue/20 border-0">
            <CardHeader>
              <CardTitle className="text-center text-gray-800 flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2 text-zygo-red" />
                Ready to Get Started?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
                Our providers are ready to support your family's journey. Browse all providers and
                centers to find the perfect fit for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/network/providers">
                  <Button className="bg-zygo-red hover:bg-zygo-red/90 text-white">
                    Browse All Providers
                  </Button>
                </Link>
                <Link to="/network/centers">
                  <Button
                    variant="outline"
                    className="border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
                  >
                    View Service Centers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Services;

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import { Activity, Baby, Calendar, Heart, MapPin, Star, Stethoscope, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const serviceTypes = [
    {
      title: 'Prenatal Care',
      description: 'Comprehensive pregnancy support and preparation',
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {serviceTypes.map((category, index) => (
            <Card
              key={index}
              className={`${category.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center mb-4">
                  <category.icon className={`${category.iconColor} mr-3`} size={32} />
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-800">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {category.services.map((service, serviceIndex) => (
                    <Card
                      key={serviceIndex}
                      className="bg-white/80 border-0 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                              {service.title}
                            </h4>
                            <p className="text-xs text-gray-600 leading-relaxed mb-2">
                              {service.description}
                            </p>
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <MapPin className="w-3 h-3 mr-1" />
                              {service.location}
                            </div>
                          </div>
                          <div className="text-right ml-3">
                            <div className="text-sm font-medium text-zygo-red mb-1">
                              {service.price}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-600">
                            with <span className="font-medium">{service.provider}</span> at{' '}
                            <span className="font-medium">{service.center}</span>
                          </div>
                          <Link to={service.route}>
                            <Button
                              size="sm"
                              className="bg-zygo-red hover:bg-zygo-red/90 text-white text-xs px-3 py-1"
                            >
                              View Provider
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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

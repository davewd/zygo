import type { UserRole } from '@zygo/types';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import {
  Activity,
  ArrowRight,
  Baby,
  Heart,
  MapPin,
  Star,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMMUNITY_PROFILES } from '../../data/community/primaryConsumers';

const CommunityHub = () => {
  // Community stats
  const totalMembers = COMMUNITY_PROFILES.length;
  const activeMembers = COMMUNITY_PROFILES.filter((p) => p.consumer.isActive).length;
  const parentCount = COMMUNITY_PROFILES.filter((p) => p.consumer.role === 'parent').length;
  const grandparentCount = COMMUNITY_PROFILES.filter(
    (p) => p.consumer.role === 'grandparent'
  ).length;
  const childrenCount = COMMUNITY_PROFILES.filter((p) => p.consumer.role === 'child').length;

  // Featured community members
  const featuredMembers = COMMUNITY_PROFILES.sort(
    (a, b) => b.stats.postsCount - a.stats.postsCount
  ).slice(0, 6);

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'parent':
        return Heart;
      case 'grandparent':
        return Star;
      case 'child':
        return Baby;
      default:
        return User;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'parent':
        return 'text-zygo-red';
      case 'grandparent':
        return 'text-zygo-yellow';
      case 'child':
        return 'text-zygo-blue';
      default:
        return 'text-gray-600';
    }
  };

  const communityStats = [
    { label: 'Total Members', value: totalMembers, icon: Users, color: 'text-blue-600' },
    { label: 'Active Today', value: activeMembers, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Parents', value: parentCount, icon: Heart, color: 'text-zygo-red' },
    { label: 'Grandparents', value: grandparentCount, icon: Star, color: 'text-zygo-yellow' },
    { label: 'Children', value: childrenCount, icon: Baby, color: 'text-zygo-blue' },
  ];

  // Service categories for the services section
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
          route: '/community/providers/dr-justin-tucker',
        },
        {
          title: 'Before Birth Consultation at Full Circle with Rebecca Cavallaro',
          description: 'Comprehensive antenatal preparation and planning',
          location: 'Windsor, QLD',
          price: 'From $230',
          provider: 'Rebecca Cavallaro',
          center: 'Full Circle Midwifery',
          route: '/community/providers/rebecca-cavallaro',
        },
      ],
    },
    {
      title: 'Early Development (0-2 years)',
      description: 'Support for infants and toddlers in their first years',
      familyMember: 'For Your Baby',
      icon: Heart,
      iconColor: 'text-zygo-red',
      bgColor: 'bg-zygo-mint/30',
      services: [
        {
          title: 'Breastfeeding Support with Rebecca Cavallaro',
          description: 'Expert lactation consultation and ongoing support',
          location: 'Windsor, QLD',
          price: 'From $230',
          provider: 'Rebecca Cavallaro',
          center: 'Full Circle Midwifery',
          route: '/community/providers/rebecca-cavallaro',
        },
        {
          title: 'Swimming Lessons at Elixr with Sarah Mitchell',
          description: 'Parent-baby swimming programs for water safety and development',
          location: 'Bondi Junction',
          price: 'From $85',
          provider: 'Sarah Mitchell',
          center: 'Elixr Swim School',
          route: '/community/providers/sarah-mitchell',
        },
      ],
    },
    {
      title: 'Active Development (2-5 years)',
      description: 'Physical activities and sports for growing children',
      familyMember: 'For Your Toddler',
      icon: Activity,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50',
      services: [
        {
          title: 'Gymnastics Classes at Active8Kids with Emily McConaghy',
          description: 'Fun gymnastics and movement classes for toddlers',
          location: 'Brookvale',
          price: 'From $35',
          provider: 'Emily McConaghy',
          center: 'Active8Kids',
          route: '/community/providers/emily-mcconaghy',
        },
        {
          title: 'Soccer Training at Kickeroos with James Thompson',
          description: 'Age-appropriate soccer skills and team play',
          location: 'Paddington',
          price: 'From $25',
          provider: 'James Thompson',
          center: 'Kickeroos Soccer Academy',
          route: '/community/providers/james-thompson',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Community Hub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with families, discover services, and grow together in your parenting journey
          </p>
        </div>

        {/* Community Members Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Community Members you may know
              </h2>
            </div>
            <Link to="/community/profiles">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>View All Profiles</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/*           { /*Community Stats /}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {communityStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <IconComponent className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div> */}

          {/* Featured Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredMembers.map((profile) => {
              const { consumer, stats } = profile;
              const RoleIcon = getRoleIcon(consumer.role);
              const roleColor = getRoleColor(consumer.role);

              return (
                <Link key={consumer.id} to={`/community/profiles/${consumer.handle}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={consumer.profileImage}
                          alt={consumer.displayName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{consumer.displayName}</h3>
                          <div className="flex items-center space-x-1">
                            <RoleIcon className={`w-4 h-4 ${roleColor}`} />
                            <span className="text-sm text-gray-600 capitalize">
                              {consumer.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-3">{consumer.tagline}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{stats.postsCount} posts</span>
                        <span>{stats.connectionsCount} connections</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Services Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Services & Support</h2>
              <p className="text-gray-600">
                Discover professional services tailored to your family's needs
              </p>
            </div>
            <Link to="/community/providers">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>Browse All Providers</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Service Categories */}
          <div className="space-y-8">
            {serviceTypes.map((category, categoryIndex) => {
              const IconComponent = category.icon;

              return (
                <Card key={categoryIndex} className="overflow-hidden">
                  <CardHeader className={`${category.bgColor} border-b`}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full bg-white/70`}>
                        <IconComponent className={`w-6 h-6 ${category.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-gray-800">{category.title}</CardTitle>
                        <CardDescription className="text-gray-700">
                          {category.description}
                        </CardDescription>
                        <div className="text-sm font-medium text-gray-600 mt-1">
                          {category.familyMember}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.services.map((service, serviceIndex) => (
                        <Link key={serviceIndex} to={service.route}>
                          <Card className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-gray-800 mb-2">{service.title}</h4>
                              <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                              <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center space-x-4 text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{service.location}</span>
                                  </div>
                                  <span className="font-medium text-gray-700">{service.price}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="bg-gradient-to-r from-zygo-blue/10 to-zygo-mint/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Connect?</h3>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
            Join our growing community of families and discover the support and services you need
            for every stage of your parenting journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/feed">
              <Button className="bg-zygo-red hover:bg-zygo-red/90 text-white">
                View Community Feed
              </Button>
            </Link>
            <Link to="/community/profiles">
              <Button
                variant="outline"
                className="border-zygo-blue text-zygo-blue hover:bg-zygo-blue/10"
              >
                Browse Member Profiles
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CommunityHub;

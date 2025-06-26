// import type { UserRole } from '@zygo/types';
// import { Button, Card, CardContent, CardHeader, CardTitle } from '@zygo/ui';
import {
  Activity,
  ArrowRight,
  Baby,
  CalendarDays,
  Heart,
  Palmtree,
  Star,
  Sun,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ServiceCategories } from '../../components/community';
import { FriendNetworkAvailability } from '../../components/community/FriendNetworkAvailability';
import { COMMUNITY_PROFILES } from '../../data/community/primaryConsumers';

// Define UserRole locally to avoid type issues
type UserRole = 'grandparent' | 'parent' | 'child' | 'guardian' | 'caregiver';

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

        {/* Summer Holidays Activity Planning Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <Sun className="w-8 h-8 mr-3 text-yellow-500" />
                Summer Holidays Activity Plans
              </h2>
              <p className="text-gray-600">
                Discover and plan exciting activities for your family based on your preferences
              </p>
            </div>
            <Link to="/tools/holiday-planner">
              <button className="bg-zygo-red hover:bg-zygo-red/90 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <CalendarDays className="w-4 h-4" />
                <span>Open Holiday Planner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Activity Recommendations Based on Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg">
              <div className="p-6">
                <h3 className="flex items-center text-orange-800 font-semibold text-lg mb-3">
                  <Palmtree className="w-5 h-5 mr-2" />
                  Beach & Water Activities
                </h3>
                <p className="text-orange-700 text-sm mb-4">
                  Based on your family's love for outdoor activities and swimming
                </p>
                <ul className="space-y-2 text-sm text-orange-600 mb-4">
                  <li>• Beach picnics and sandcastle building</li>
                  <li>• Pool parties with friends</li>
                  <li>• Water parks and splash zones</li>
                  <li>• Surfing lessons at Bondi Beach</li>
                </ul>
                <button className="w-full px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm rounded">
                  Plan Beach Day
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <div className="p-6">
                <h3 className="flex items-center text-green-800 font-semibold text-lg mb-3">
                  <Activity className="w-5 h-5 mr-2" />
                  Adventure & Sports
                </h3>
                <p className="text-green-700 text-sm mb-4">
                  Perfect for your active family with sports-loving children
                </p>
                <ul className="space-y-2 text-sm text-green-600 mb-4">
                  <li>• Rock climbing and ninja courses</li>
                  <li>• Soccer camps and tournaments</li>
                  <li>• Hiking and nature exploration</li>
                  <li>• Cycling adventures in the park</li>
                </ul>
                <button className="w-full px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded">
                  Book Adventure
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
              <div className="p-6">
                <h3 className="flex items-center text-purple-800 font-semibold text-lg mb-3">
                  <Heart className="w-5 h-5 mr-2" />
                  Creative & Cultural
                </h3>
                <p className="text-purple-700 text-sm mb-4">
                  Nurture creativity and learn about different cultures
                </p>
                <ul className="space-y-2 text-sm text-purple-600 mb-4">
                  <li>• Art workshops and craft sessions</li>
                  <li>• Museum visits and exhibitions</li>
                  <li>• Theatre shows and performances</li>
                  <li>• Cooking classes from around the world</li>
                </ul>
                <button className="w-full px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded">
                  Explore Culture
                </button>
              </div>
            </div>
          </div>

          {/* Friend Network Availability */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  Friend Network Availability
                </h3>
                <p className="text-gray-600">
                  See when your friends are available for summer holiday playdates
                </p>
              </div>
              <Link to="/tools/holiday-planner">
                <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>View Full Calendar</span>
                </button>
              </Link>
            </div>

            <FriendNetworkAvailability
              compact={true}
              onCreatePlaydate={(timeSlot) => {
                // Navigate to holiday planner with pre-selected time
                console.log('Navigate to holiday planner with time:', timeSlot);
              }}
            />
          </div>

          {/* Quick Summer Activities CTA */}
          <div className="bg-gradient-to-r from-zygo-mint/30 to-zygo-blue/20 border-0 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
              <Sun className="w-6 h-6 mr-2 text-yellow-500" />
              Ready for Summer Fun?
            </h3>
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
              Make this summer unforgettable with activities tailored to your family's interests.
              Connect with friends, discover new experiences, and create lasting memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools/holiday-planner">
                <button className="bg-zygo-red hover:bg-zygo-red/90 text-white px-6 py-3 rounded-lg flex items-center">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Plan Your Summer
                </button>
              </Link>
              <Link to="/network/services">
                <button className="border border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white px-6 py-3 rounded-lg flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Browse Activities
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Community Members Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Community Members you may know
              </h2>
            </div>
            <Link to="/community/profiles">
              <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
                <span>View All Profiles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
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
                  <div className="rounded-lg border bg-white shadow-sm hover:shadow-lg transition-shadow">
                    <div className="flex flex-col space-y-1.5 p-6 pb-4">
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
                    </div>
                    <div className="p-6 pt-0">
                      <p className="text-gray-600 text-sm mb-3">{consumer.tagline}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{stats.postsCount} posts</span>
                        <span>{stats.connectionsCount} connections</span>
                      </div>
                    </div>
                  </div>
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
              <button className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-2 transition-colors">
                <span>Browse All Providers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Service Categories */}
          <ServiceCategories serviceTypes={serviceTypes} />
        </section>
      </div>
    </div>
  );
};

export default CommunityHub;

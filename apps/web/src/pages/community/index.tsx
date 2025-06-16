import type { UserRole } from '@zygo/types';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@zygo/ui';
import {
  ArrowRight,
  Award,
  Baby,
  Calendar,
  Heart,
  MessageCircle,
  Star,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMMUNITY_PROFILES } from '../../data/community/primaryConsumers';

const Community = () => {
  // Quick stats from the community data
  const totalMembers = COMMUNITY_PROFILES.length;
  const activeMembers = COMMUNITY_PROFILES.filter((p) => p.consumer.isActive).length;
  const parentCount = COMMUNITY_PROFILES.filter((p) => p.consumer.role === 'parent').length;
  const grandparentCount = COMMUNITY_PROFILES.filter(
    (p) => p.consumer.role === 'grandparent'
  ).length;
  const childrenCount = COMMUNITY_PROFILES.filter((p) => p.consumer.role === 'child').length;

  // Featured community members (most active or recently joined)
  const featuredMembers = COMMUNITY_PROFILES.sort(
    (a, b) => b.stats.postsCount - a.stats.postsCount
  ).slice(0, 3);

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

  const quickActions = [
    {
      title: 'Browse Profiles',
      description: 'Explore community member profiles and connect with families',
      icon: Users,
      iconColor: 'text-zygo-red',
      bgColor: 'bg-zygo-mint/20',
      route: '/community/profiles',
      action: 'Browse',
    },
    {
      title: 'Join Conversations',
      description: 'Participate in community discussions and share experiences',
      icon: MessageCircle,
      iconColor: 'text-zygo-blue',
      bgColor: 'bg-zygo-blue/20',
      route: '/feed',
      action: 'View Feed',
    },
    {
      title: 'Track Milestones',
      description: 'Share and celebrate family milestones with the community',
      icon: Award,
      iconColor: 'text-zygo-yellow',
      bgColor: 'bg-zygo-yellow/20',
      route: '/timeline',
      action: 'View Timeline',
    },
  ];

  const communityStats = [
    {
      label: 'Active Members',
      value: activeMembers,
      total: totalMembers,
      icon: Users,
      color: 'text-zygo-red',
    },
    {
      label: 'Parents',
      value: parentCount,
      icon: Heart,
      color: 'text-zygo-red',
    },
    {
      label: 'Grandparents',
      value: grandparentCount,
      icon: Star,
      color: 'text-zygo-yellow',
    },
    {
      label: 'Children',
      value: childrenCount,
      icon: Baby,
      color: 'text-zygo-blue',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Users className="text-zygo-red mr-3" size={48} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-zygo-red">Community</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with families, parents, grandparents, and children who are part of the Zygo
            community. Share experiences, find support, and grow together on your family journey.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {communityStats.map((stat, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg text-center">
              <CardContent className="p-6">
                <stat.icon className={`${stat.color} mx-auto mb-3`} size={32} />
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                  {stat.total && (
                    <span className="text-sm text-gray-500 font-normal">/{stat.total}</span>
                  )}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Get Started in the Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className={`${action.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 group`}
              >
                <CardContent className="p-6 text-center">
                  <action.icon
                    className={`${action.iconColor} mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    size={40}
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{action.description}</p>
                  <Link to={action.route}>
                    <Button className="bg-zygo-red hover:bg-zygo-red/90 text-white w-full">
                      {action.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Community Members */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Featured Community Members</h2>
            <Link to="/community/profiles">
              <Button
                variant="outline"
                className="border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
              >
                View All Profiles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredMembers.map((profile) => {
              const { consumer, stats } = profile;
              const RoleIcon = getRoleIcon(consumer.role);

              return (
                <Card
                  key={consumer.id}
                  className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      {consumer.profileImage ? (
                        <img
                          src={consumer.profileImage}
                          alt={consumer.displayName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-zygo-mint/30"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-zygo-mint/30 to-zygo-blue/30 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-zygo-red" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <CardTitle className="text-lg font-bold text-gray-800 truncate">
                            {consumer.displayName}
                          </CardTitle>
                          <RoleIcon className={`w-4 h-4 ${getRoleColor(consumer.role)}`} />
                        </div>
                        <p className="text-zygo-red font-medium text-sm">@{consumer.handle}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {consumer.tagline && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{consumer.tagline}</p>
                    )}

                    <div className="grid grid-cols-3 gap-3 text-center text-xs mb-4">
                      <div>
                        <div className="font-semibold text-zygo-red">{stats.postsCount}</div>
                        <div className="text-gray-500">Posts</div>
                      </div>
                      <div>
                        <div className="font-semibold text-zygo-blue">{stats.connectionsCount}</div>
                        <div className="text-gray-500">Connections</div>
                      </div>
                      <div>
                        <div className="font-semibold text-zygo-yellow">
                          {stats.milestonesShared}
                        </div>
                        <div className="text-gray-500">Milestones</div>
                      </div>
                    </div>

                    <Link to={`/community/profiles/${consumer.id}`}>
                      <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white text-sm group-hover:transform group-hover:scale-105 transition-all">
                        View Profile
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Community Highlights */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-to-br from-zygo-mint/20 to-zygo-blue/20 border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <TrendingUp className="w-5 h-5 mr-2 text-zygo-red" />
                Growing Community
              </CardTitle>
              <CardDescription>Connect with families at every stage</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our community brings together parents, grandparents, and families from all walks of
                life. Share milestones, get advice, and build lasting connections with people who
                understand your journey.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Heart className="w-4 h-4 mr-2 text-zygo-red" />
                  <span>Supportive environment for all family types</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="w-4 h-4 mr-2 text-zygo-yellow" />
                  <span>Wisdom from experienced parents and grandparents</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Baby className="w-4 h-4 mr-2 text-zygo-blue" />
                  <span>Child-safe environment with parental controls</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-zygo-yellow/20 to-zygo-cream/20 border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <MessageCircle className="w-5 h-5 mr-2 text-zygo-red" />
                Community Guidelines
              </CardTitle>
              <CardDescription>Creating a safe space for everyone</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                We're committed to maintaining a safe, respectful, and supportive environment where
                all families can share and connect authentically.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-zygo-blue" />
                  <span>Respectful interactions and inclusive language</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Privacy controls for children and families</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="w-4 h-4 mr-2 text-green-600" />
                  <span>Recognition for helpful community contributions</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-zygo-red/10 to-zygo-mint/20 border-0 inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Ready to Join Our Community?
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
                Start connecting with other families, share your experiences, and discover the
                support and wisdom our community has to offer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/community/profiles">
                  <Button className="bg-zygo-red hover:bg-zygo-red/90 text-white">
                    Explore Profiles
                  </Button>
                </Link>
                <Link to="/feed">
                  <Button
                    variant="outline"
                    className="border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
                  >
                    View Community Feed
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

export default Community;

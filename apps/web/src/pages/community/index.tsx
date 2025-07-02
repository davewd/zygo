import type { CommunityProfile, UserRole } from '@zygo/types/src/community';
import {
  ArrowRight,
  Award,
  Baby,
  Heart,
  MessageCircle,
  Star,
  TrendingUp,
  User,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAsyncData } from '../../hooks/useAsyncData';
import { getAllCommunityProfiles } from '../../lib/api/community';

const Community = () => {
  // Use the new useAsyncData hook to manage community profiles data
  const {
    data: profiles = [],
    loading,
    error,
    retry,
  } = useAsyncData(async (): Promise<CommunityProfile[]> => {
    const response = await getAllCommunityProfiles();
    return response.data;
  }, []);

  // Quick stats from the community data
  const totalMembers = profiles.length;
  const activeMembers = profiles.filter((p) => p.consumer.isActive).length;
  const parentCount = profiles.filter((p) => p.consumer.role === 'parent').length;
  const grandparentCount = profiles.filter((p) => p.consumer.role === 'grandparent').length;
  const childrenCount = profiles.filter((p) => p.consumer.role === 'child').length;

  // Featured community members (most active or recently joined)
  const featuredMembers = profiles
    .filter((p) => p.stats) // Only profiles with stats
    .sort((a, b) => (b.stats?.postsCount || 0) - (a.stats?.postsCount || 0))
    .slice(0, 3);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zygo-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading community...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to Our <span className="text-zygo-red">Community</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Connect with families, share experiences, and grow together in a supportive environment
            where every voice matters and every story is valued.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/community/profiles"
              className="bg-zygo-red hover:bg-zygo-red/90 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Explore Profiles
            </Link>
            <Link
              to="/community/hub"
              className="border border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Community Hub
            </Link>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-zygo-red">
            <Users className="w-12 h-12 text-zygo-red mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">{totalMembers}</div>
            <div className="text-gray-600">Community Members</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-green-500">
            <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">{activeMembers}</div>
            <div className="text-gray-600">Active Members</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-zygo-blue">
            <Heart className="w-12 h-12 text-zygo-blue mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">{parentCount}</div>
            <div className="text-gray-600">Parents</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center border-l-4 border-zygo-yellow">
            <Star className="w-12 h-12 text-zygo-yellow mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-800 mb-2">{grandparentCount}</div>
            <div className="text-gray-600">Grandparents</div>
          </div>
        </div>

        {/* Featured Community Members */}
        {featuredMembers.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Community Members</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet some of our most active and engaged community members who are sharing their
                journeys and supporting others.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredMembers.map((profile) => {
                const RoleIcon = getRoleIcon(profile.consumer.role);
                const roleColor = getRoleColor(profile.consumer.role);

                return (
                  <div
                    key={profile.consumer.id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Profile Header */}
                    <div className="h-40 bg-gradient-to-br from-zygo-blue to-zygo-mint relative">
                      {profile.consumer.profileImage && (
                        <img
                          src={profile.consumer.profileImage}
                          alt={profile.consumer.displayName}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-lg">
                          {profile.consumer.displayName}
                        </h3>
                        <p className="text-white/80 text-sm">@{profile.consumer.handle}</p>
                      </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <RoleIcon className={`w-5 h-5 ${roleColor}`} />
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {profile.consumer.role}
                        </span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-500 capitalize">
                          {profile.consumer.ageGroup}
                        </span>
                      </div>

                      {profile.consumer.tagline && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {profile.consumer.tagline}
                        </p>
                      )}

                      {/* Stats */}
                      {profile.stats && (
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          <span>{profile.stats.postsCount || 0} posts</span>
                          <span>{profile.stats.connectionsCount || 0} connections</span>
                        </div>
                      )}

                      {/* View Profile Button */}
                      <Link
                        to={`/community/profiles/${profile.consumer.id}`}
                        className="block w-full bg-zygo-red hover:bg-zygo-red/90 text-white text-center py-3 rounded-lg transition-colors font-medium"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link
            to="/community/profiles"
            className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 hover:border-zygo-red"
          >
            <div className="flex items-center justify-between mb-6">
              <Users className="w-12 h-12 text-zygo-red" />
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-zygo-red group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Browse Profiles</h3>
            <p className="text-gray-600 mb-4">
              Discover and connect with families, parents, grandparents, and children in your area.
            </p>
            <div className="text-zygo-red font-medium">Explore Now →</div>
          </Link>

          <Link
            to="/community/providers"
            className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 hover:border-zygo-red"
          >
            <div className="flex items-center justify-between mb-6">
              <Award className="w-12 h-12 text-zygo-red" />
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-zygo-red group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Service Providers</h3>
            <p className="text-gray-600 mb-4">
              Find trusted healthcare professionals, educators, and childcare specialists.
            </p>
            <div className="text-zygo-red font-medium">Find Services →</div>
          </Link>

          <Link
            to="/community/hub"
            className="group bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 hover:border-zygo-red"
          >
            <div className="flex items-center justify-between mb-6">
              <MessageCircle className="w-12 h-12 text-zygo-red" />
              <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-zygo-red group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Community Hub</h3>
            <p className="text-gray-600 mb-4">
              Join discussions, share experiences, and get support from our community.
            </p>
            <div className="text-zygo-red font-medium">Join Hub →</div>
          </Link>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-zygo-mint/20 to-zygo-blue/20 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Join Our Community?</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg">
            Whether you're a new parent seeking guidance, a grandparent wanting to share wisdom, or
            a family looking for connections, our community welcomes you with open arms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/signup"
              className="bg-zygo-red hover:bg-zygo-red/90 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Join Community
            </Link>
            <Link
              to="/about"
              className="border border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

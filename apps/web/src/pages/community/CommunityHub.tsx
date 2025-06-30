import type { CommunityProfile, UserRole } from '@zygo/types/src/community';
import { ArrowRight, Baby, Heart, Star, TrendingUp, User, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCommunityProfiles } from '../../lib/api/community';

const CommunityHub = () => {
  // API state management
  const [profiles, setProfiles] = useState<CommunityProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load community profiles on component mount
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setLoading(true);
        const response = await getAllCommunityProfiles();
        setProfiles(response.data);
        setError(null);
      } catch (err) {
        console.error('Failed to load community profiles:', err);
        setError('Failed to load community profiles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProfiles();
  }, []);

  // Community stats
  const totalMembers = profiles.length;
  const activeMembers = profiles.filter((p) => p.consumer.isActive).length;
  const parentCount = profiles.filter((p) => p.consumer.role === 'parent').length;
  const grandparentCount = profiles.filter((p) => p.consumer.role === 'grandparent').length;
  const childrenCount = profiles.filter((p) => p.consumer.role === 'child').length;

  // Featured community members (sort by engagement stats if available)
  const featuredMembers = profiles
    .filter((p) => p.stats) // Only include profiles with stats
    .sort((a, b) => (b.stats?.postsCount || 0) - (a.stats?.postsCount || 0))
    .slice(0, 6);

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
            <p className="text-gray-600">Loading community hub...</p>
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
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/community/profiles"
            className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-zygo-red"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-zygo-red" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-zygo-red group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Community Profiles</h3>
            <p className="text-gray-600 text-sm">
              Browse and connect with families, parents, and caregivers in your area.
            </p>
          </Link>

          <Link
            to="/community/providers"
            className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-zygo-red"
          >
            <div className="flex items-center justify-between mb-4">
              <User className="w-8 h-8 text-zygo-red" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-zygo-red group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Service Providers</h3>
            <p className="text-gray-600 text-sm">
              Find trusted healthcare professionals, educators, and specialists.
            </p>
          </Link>

          <Link
            to="/community/groups"
            className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200 hover:border-zygo-red"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-zygo-red" />
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-zygo-red group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Community Groups</h3>
            <p className="text-gray-600 text-sm">
              Join interest-based groups and participate in community discussions.
            </p>
          </Link>
        </div>

        {/* Featured Community Members */}
        {featuredMembers.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Featured Community Members</h2>
              <Link
                to="/community/profiles"
                className="text-zygo-red hover:text-zygo-red/80 font-medium text-sm flex items-center gap-2"
              >
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMembers.map((profile) => {
                const RoleIcon = getRoleIcon(profile.consumer.role);
                const roleColor = getRoleColor(profile.consumer.role);

                return (
                  <div
                    key={profile.consumer.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Profile Header */}
                    <div className="h-32 bg-gradient-to-br from-zygo-blue to-zygo-mint relative">
                      {profile.consumer.profileImage && (
                        <img
                          src={profile.consumer.profileImage}
                          alt={profile.consumer.displayName}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-white font-semibold text-sm">
                          {profile.consumer.displayName}
                        </h3>
                        <p className="text-white/80 text-xs">@{profile.consumer.handle}</p>
                      </div>
                    </div>

                    {/* Profile Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <RoleIcon className={`w-4 h-4 ${roleColor}`} />
                        <span className="text-sm font-medium text-gray-600 capitalize">
                          {profile.consumer.role}
                        </span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-500 capitalize">
                          {profile.consumer.ageGroup}
                        </span>
                      </div>

                      {profile.consumer.tagline && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {profile.consumer.tagline}
                        </p>
                      )}

                      {/* Stats */}
                      {profile.stats && (
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <span>{profile.stats.postsCount || 0} posts</span>
                          <span>{profile.stats.connectionsCount || 0} connections</span>
                        </div>
                      )}

                      {/* View Profile Button */}
                      <Link
                        to={`/community/profile/${profile.consumer.id}`}
                        className="block w-full bg-zygo-red hover:bg-zygo-red/90 text-white text-center py-2 rounded transition-colors text-sm font-medium"
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

        {/* Service Categories - TODO: Migrate ServiceCategories component */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Service Categories</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-center">
              Service categories will be displayed here once the ServiceCategories component is
              migrated.
            </p>
            <div className="text-center mt-4">
              <Link
                to="/network/providers"
                className="bg-zygo-red hover:bg-zygo-red/90 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Browse All Services
              </Link>
            </div>
          </div>
        </div>

        {/* Friend Network Availability - TODO: Migrate FriendNetworkAvailability component */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Friend Network</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 text-center">
              Friend network availability will be displayed here once the component is migrated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;

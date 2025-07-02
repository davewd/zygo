import type { CommunitySearchFilters } from '@zygo/types/src/community';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsyncData } from '../../hooks/useAsyncData';
import { getAllCommunityProfiles } from '../../lib/api/community';

const CommunityProfiles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<CommunitySearchFilters>({
    isActiveOnly: true,
    privacyLevel: ['public', 'family'],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Use the new useAsyncData hook to manage community profiles data
  const {
    data: profiles = [],
    loading,
    error,
    retry,
  } = useAsyncData(async () => {
    const response = await getAllCommunityProfiles();
    return response.data;
  }, []);

  // Filter profiles based on search and filters
  const filteredProfiles = profiles.filter((profile) => {
    const consumer = profile.consumer;

    // Privacy filter
    if (filters.privacyLevel && !filters.privacyLevel.includes(consumer.privacyLevel)) {
      return false;
    }

    // Active filter
    if (filters.isActiveOnly && !consumer.isActive) {
      return false;
    }

    // Role filter
    if (filters.roles && filters.roles.length > 0 && !filters.roles.includes(consumer.role)) {
      return false;
    }

    // Age group filter
    if (
      filters.ageGroups &&
      filters.ageGroups.length > 0 &&
      !filters.ageGroups.includes(consumer.ageGroup)
    ) {
      return false;
    }

    // Location filter
    if (filters.location?.state && consumer.location?.state !== filters.location.state) {
      return false;
    }

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        consumer.displayName.toLowerCase().includes(query) ||
        consumer.handle.toLowerCase().includes(query) ||
        (consumer.tagline && consumer.tagline.toLowerCase().includes(query)) ||
        (consumer.bio && consumer.bio.toLowerCase().includes(query))
      );
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zygo-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading community profiles...</p>
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
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/community"
            className="inline-flex items-center text-zygo-red hover:text-zygo-red/80 transition-colors"
          >
            ← Back to Community Hub
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Community <span className="text-zygo-red">Profiles</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with families, parents, grandparents, and children in our community. Share
            experiences, find support, and grow together.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zygo-red focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProfiles.length}</span> of{' '}
            <span className="font-semibold">{profiles.length}</span> community members
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <div
              key={profile.consumer.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Profile Image */}
              <div className="h-48 bg-gradient-to-br from-zygo-blue to-zygo-mint relative">
                {profile.consumer.profileImage && (
                  <img
                    src={profile.consumer.profileImage}
                    alt={profile.consumer.displayName}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold mb-1">
                    {profile.consumer.displayName}
                  </h3>
                  <p className="text-white/90 text-sm">@{profile.consumer.handle}</p>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6">
                {/* Role and Age Group */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-zygo-red/10 text-zygo-red px-3 py-1 rounded-full text-sm font-medium">
                    {profile.consumer.role}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {profile.consumer.ageGroup}
                  </span>
                </div>

                {/* Tagline */}
                {profile.consumer.tagline && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {profile.consumer.tagline}
                  </p>
                )}

                {/* Location */}
                {profile.consumer.location && (
                  <p className="text-gray-500 text-xs mb-4">
                    📍 {profile.consumer.location.suburb && `${profile.consumer.location.suburb}, `}
                    {profile.consumer.location.state}
                  </p>
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
          ))}
        </div>

        {/* Empty State */}
        {filteredProfiles.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-800 mb-2">No profiles found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find community members.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ isActiveOnly: true, privacyLevel: ['public', 'family'] });
                }}
                className="bg-zygo-red text-white px-4 py-2 rounded hover:bg-zygo-red/90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityProfiles;

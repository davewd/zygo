import type { AgeGroup, CommunitySearchFilters, UserRole } from '@zygo/types';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@zygo/ui';
import {
  ArrowLeft,
  Baby,
  Calendar,
  Filter,
  Grid3X3,
  Heart,
  List,
  MapPin,
  Search,
  Star,
  User,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMMUNITY_PROFILES } from '../../data/community/primaryConsumers';

const CommunityProfiles = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<CommunitySearchFilters>({
    isActiveOnly: true,
    privacyLevel: ['public', 'family'],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Filter profiles based on search and filters
  const filteredProfiles = COMMUNITY_PROFILES.filter((profile) => {
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

  const roleLabels: Record<UserRole, string> = {
    parent: 'Parent',
    grandparent: 'Grandparent',
    child: 'Child',
    guardian: 'Guardian',
    caregiver: 'Caregiver',
  };

  const ageGroupLabels: Record<AgeGroup, string> = {
    infant: 'Infant',
    toddler: 'Toddler',
    preschool: 'Preschool',
    child: 'Child',
    adolescent: 'Adolescent',
    adult: 'Adult',
    senior: 'Senior',
  };

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

  const ProfileCard = ({ profile }: { profile: (typeof COMMUNITY_PROFILES)[0] }) => {
    const { consumer, stats } = profile;
    const RoleIcon = getRoleIcon(consumer.role);

    return (
      <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
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
            <div className="text-right">
              <span className="text-xs bg-zygo-mint/20 text-gray-700 px-2 py-1 rounded-full">
                {roleLabels[consumer.role]}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {consumer.tagline && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{consumer.tagline}</p>
          )}

          {consumer.location?.suburb && consumer.location?.state && (
            <div className="flex items-center text-gray-500 text-xs mb-3">
              <MapPin className="w-3 h-3 mr-1" />
              {consumer.location.suburb}, {consumer.location.state}
            </div>
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
              <div className="font-semibold text-zygo-yellow">{stats.milestonesShared}</div>
              <div className="text-gray-500">Milestones</div>
            </div>
          </div>

          {consumer.followedProviders.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Connected to providers:</p>
              <div className="flex flex-wrap gap-1">
                {consumer.followedProviders.slice(0, 2).map((provider, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-zygo-blue/10 text-gray-600 px-2 py-1 rounded"
                  >
                    {provider.providerName}
                  </span>
                ))}
                {consumer.followedProviders.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{consumer.followedProviders.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}

          <Link to={`/community/profiles/${consumer.id}`}>
            <Button className="w-full bg-zygo-red hover:bg-zygo-red/90 text-white text-sm group-hover:transform group-hover:scale-105 transition-all">
              View Profile
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/community"
            className="inline-flex items-center text-zygo-red hover:text-zygo-red/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Community Hub
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

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search profiles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zygo-red/20 focus:border-zygo-red"
              />
            </div>

            {/* View and Filter Controls */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-zygo-red' : 'text-gray-600'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-zygo-red' : 'text-gray-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="mt-4 bg-gray-50">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Role</h4>
                    <div className="space-y-2">
                      {Object.entries(roleLabels).map(([role, label]) => (
                        <label key={role} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={filters.roles?.includes(role as UserRole) || false}
                            onChange={(e) => {
                              const newRoles = filters.roles || [];
                              setFilters({
                                ...filters,
                                roles: e.target.checked
                                  ? [...newRoles, role as UserRole]
                                  : newRoles.filter((r) => r !== role),
                              });
                            }}
                            className="mr-2 rounded border-gray-300 text-zygo-red focus:ring-zygo-red"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Age Group</h4>
                    <div className="space-y-2">
                      {Object.entries(ageGroupLabels).map(([ageGroup, label]) => (
                        <label key={ageGroup} className="flex items-center text-sm">
                          <input
                            type="checkbox"
                            checked={filters.ageGroups?.includes(ageGroup as AgeGroup) || false}
                            onChange={(e) => {
                              const newAgeGroups = filters.ageGroups || [];
                              setFilters({
                                ...filters,
                                ageGroups: e.target.checked
                                  ? [...newAgeGroups, ageGroup as AgeGroup]
                                  : newAgeGroups.filter((ag) => ag !== ageGroup),
                              });
                            }}
                            className="mr-2 rounded border-gray-300 text-zygo-red focus:ring-zygo-red"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Other</h4>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={filters.isActiveOnly || false}
                          onChange={(e) =>
                            setFilters({ ...filters, isActiveOnly: e.target.checked })
                          }
                          className="mr-2 rounded border-gray-300 text-zygo-red focus:ring-zygo-red"
                        />
                        Active users only
                      </label>
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={filters.hasProviderConnections || false}
                          onChange={(e) =>
                            setFilters({ ...filters, hasProviderConnections: e.target.checked })
                          }
                          className="mr-2 rounded border-gray-300 text-zygo-red focus:ring-zygo-red"
                        />
                        Has provider connections
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProfiles.length}</span> of{' '}
            <span className="font-semibold">{COMMUNITY_PROFILES.length}</span> community members
          </p>
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}
          >
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.consumer.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No profiles found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or filters to find more community members.
            </p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  isActiveOnly: true,
                  privacyLevel: ['public', 'family'],
                });
              }}
              variant="outline"
              className="border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-zygo-mint/20 to-zygo-blue/20 border-0">
            <CardHeader>
              <CardTitle className="text-center text-gray-800 flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2 text-zygo-red" />
                Join Our Community
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
                Connect with other families, share experiences, and build meaningful relationships
                within our supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/feed">
                  <Button className="bg-zygo-red hover:bg-zygo-red/90 text-white">
                    View Community Feed
                  </Button>
                </Link>
                <Link to="/community/providers">
                  <Button
                    variant="outline"
                    className="border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white"
                  >
                    Find Service Providers
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

export default CommunityProfiles;

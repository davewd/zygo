import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProviderCard, type ProviderCardData } from '../../components/providers';
import { useServiceProviders } from '../../hooks/useComplexData';

const CommunityProviders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Use the specialized hook for service providers
  const {
    providers: filteredProviders,
    allProviders: providers,
    availableSpecialties,
    stats,
    loading,
    error,
    retry,
  } = useServiceProviders(searchQuery, selectedSpecialty);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zygo-red mx-auto mb-4"></div>
            <p className="text-gray-600">Loading service providers...</p>
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
                onClick={retry}
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
            Community <span className="text-zygo-red">Service Providers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with trusted service providers in our community. Find healthcare professionals,
            educators, childcare specialists, and more.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zygo-red focus:border-transparent"
              />
            </div>

            {/* Specialty Filter */}
            <div className="min-w-48">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zygo-red focus:border-transparent"
              >
                <option value="">All Specialties</option>
                {availableSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-sm text-zygo-red'
                    : 'text-gray-600 hover:text-gray-800'
                } transition-colors`}
              >
                <span className="sr-only">Grid view</span>⚏
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm text-zygo-red'
                    : 'text-gray-600 hover:text-gray-800'
                } transition-colors`}
              >
                <span className="sr-only">List view</span>☰
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProviders.length}</span> of{' '}
            <span className="font-semibold">{providers.length}</span> service providers
            {stats && (
              <span className="text-sm text-gray-500 block mt-1">
                {stats.verified} verified • {stats.byAvailability.telehealth} telehealth •{' '}
                {stats.byAvailability.inPerson} in-person
              </span>
            )}
          </p>
        </div>

        {/* Providers Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          }`}
        >
          {filteredProviders.map((provider) => {
            // Transform the provider data to match ProviderCardData interface
            const providerCardData: ProviderCardData = {
              id: provider.id,
              firstName: provider.fullName.split(' ')[0],
              lastName: provider.fullName.split(' ').slice(1).join(' '),
              title: provider.title,
              profileImage: provider.profileImage,
              bio: provider.bio,
              credentials: provider.credentials.map((cred) => ({
                title: cred.title,
                abbreviation: cred.abbreviation,
                issuingBody: cred.issuingBody,
                verified: cred.verified,
              })),
              specializations: provider.specializations,
              yearsExperience: provider.yearsExperience,
              availability: provider.availability,
            };

            return (
              <ProviderCard
                key={provider.id}
                provider={providerCardData}
                variant="default"
                showBio={true}
                showExperience={true}
                showAvailability={true}
                showConnectionInfo={false}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProviders.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-800 mb-2">No providers found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find service providers.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('');
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

export default CommunityProviders;

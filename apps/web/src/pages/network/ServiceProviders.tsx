import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProviderCard, type ProviderCardData } from '../../components/providers';
import { useServiceProviders } from '../../hooks/useComplexData';

const ServiceProviders = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Use the specialized hook for service providers
  const {
    providers: allProviders,
    availableSpecialties,
    stats,
    loading,
    error,
    retry,
  } = useServiceProviders();

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

  // Group providers by category/specialization for better organization
  const providersByCategory = allProviders.reduce((acc, provider) => {
    const primarySpecialization = provider.specializations[0] || 'Other';
    if (!acc[primarySpecialization]) {
      acc[primarySpecialization] = [];
    }
    acc[primarySpecialization].push(provider);
    return acc;
  }, {} as Record<string, typeof allProviders>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Service <span className="text-zygo-red">Providers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover trusted healthcare professionals, educators, childcare specialists, and
            wellness practitioners in our network.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-zygo-red mb-2">{allProviders.length}</div>
            <div className="text-gray-600">Total Providers</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-zygo-red mb-2">
              {Object.keys(providersByCategory).length}
            </div>
            <div className="text-gray-600">Specializations</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-zygo-red mb-2">
              {allProviders.filter((p) => p.availability.telehealth).length}
            </div>
            <div className="text-gray-600">Telehealth Available</div>
          </div>
        </div>

        {/* Featured Providers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProviders.slice(0, 6).map((provider) => {
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
        </div>

        {/* Browse by Specialization */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Specialization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(providersByCategory).map(([category, categoryProviders]) => (
              <Link
                key={category}
                to={`/community/providers?specialization=${encodeURIComponent(category)}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-zygo-red"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{category}</h3>
                <p className="text-gray-600 mb-3">
                  {(categoryProviders as any[]).length} provider
                  {(categoryProviders as any[]).length !== 1 ? 's' : ''} available
                </p>
                <div className="text-zygo-red font-medium text-sm">Explore {category} →</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-zygo-mint/20 to-zygo-blue/20 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Looking for a specific service?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our advanced search helps you find exactly what you need based on location,
              specialization, availability, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/community/providers/search"
                className="bg-zygo-red hover:bg-zygo-red/90 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Advanced Search
              </Link>
              <Link
                to="/community/centers"
                className="border border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Browse Centers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;

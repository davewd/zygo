import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getAllServiceProviders,
  searchProviders,
  getProvidersBySpecialization 
} from '../../lib/api/providers';

// Define the service provider type from the API
interface ServiceProvider {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
  profileImage?: string;
  bio: string;
  credentials: {
    title: string;
    abbreviation?: string;
    issuingBody: string;
    verified: boolean;
  }[];
  services: string[];
  specializations: string[];
  languages: string[];
  yearsExperience: number;
  availability: {
    inPerson: boolean;
    telehealth: boolean;
    homeVisits: boolean;
    emergency: boolean;
  };
  centerId?: string;
}

const CommunityProviders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // API state management
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableSpecialties, setAvailableSpecialties] = useState<string[]>([]);

  // Load service providers on component mount
  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true);
        const response = await getAllServiceProviders();
        setProviders(response.data);
        
        // Extract unique specializations for filter
        const specialties = Array.from(
          new Set(response.data.flatMap(provider => provider.specializations))
        ).sort();
        setAvailableSpecialties(specialties);
        
        setError(null);
      } catch (err) {
        console.error('Failed to load service providers:', err);
        setError('Failed to load service providers. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, []);

  // Filter providers based on search and specialty
  const filteredProviders = providers.filter((provider) => {
    // Specialty filter
    if (selectedSpecialty && !provider.specializations.includes(selectedSpecialty)) {
      return false;
    }

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        provider.firstName.toLowerCase().includes(query) ||
        provider.lastName.toLowerCase().includes(query) ||
        provider.bio.toLowerCase().includes(query) ||
        provider.specializations.some(spec => spec.toLowerCase().includes(query)) ||
        provider.services.some(service => service.toLowerCase().includes(query))
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
                <span className="sr-only">Grid view</span>
                ⚏
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list'
                    ? 'bg-white shadow-sm text-zygo-red'
                    : 'text-gray-600 hover:text-gray-800'
                } transition-colors`}
              >
                <span className="sr-only">List view</span>
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProviders.length}</span> of{' '}
            <span className="font-semibold">{providers.length}</span> service providers
          </p>
        </div>

        {/* Providers Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Provider Image */}
              <div className="h-48 bg-gradient-to-br from-zygo-blue to-zygo-mint relative">
                {provider.profileImage && (
                  <img
                    src={provider.profileImage}
                    alt={`${provider.firstName} ${provider.lastName}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold mb-1">
                    {provider.firstName} {provider.lastName}
                  </h3>
                  {provider.title && (
                    <p className="text-white/90 text-sm">{provider.title}</p>
                  )}
                </div>
              </div>

              {/* Provider Content */}
              <div className="p-6">
                {/* Credentials */}
                {provider.credentials.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {provider.credentials.slice(0, 2).map((credential, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium"
                      >
                        {credential.abbreviation || credential.title}
                      </span>
                    ))}
                    {provider.credentials.length > 2 && (
                      <span className="text-gray-500 text-xs">
                        +{provider.credentials.length - 2} more
                      </span>
                    )}
                  </div>
                )}

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.specializations.slice(0, 3).map((specialization) => (
                    <span
                      key={specialization}
                      className="bg-zygo-red/10 text-zygo-red px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {specialization}
                    </span>
                  ))}
                  {provider.specializations.length > 3 && (
                    <span className="text-gray-500 text-sm">
                      +{provider.specializations.length - 3} more
                    </span>
                  )}
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {provider.bio}
                </p>

                {/* Experience */}
                <p className="text-gray-500 text-xs mb-4">
                  ⭐ {provider.yearsExperience} years experience
                </p>

                {/* Availability */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.availability.inPerson && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      In-Person
                    </span>
                  )}
                  {provider.availability.telehealth && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      Telehealth
                    </span>
                  )}
                  {provider.availability.homeVisits && (
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                      Home Visits
                    </span>
                  )}
                </div>

                {/* View Profile Button */}
                <Link
                  to={`/network/providers/${provider.id}`}
                  className="block w-full bg-zygo-red hover:bg-zygo-red/90 text-white text-center py-3 rounded-lg transition-colors font-medium"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getAllServiceProviders
} from '../../lib/api/serviceProviders';

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
  pricing?: {
    consultationFee?: number;
    followUpFee?: number;
    currency: string;
  };
  centerId?: string;
}

const ServiceProviders = () => {
  // API state management
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load service providers on component mount
  useEffect(() => {
    const loadProviders = async () => {
      try {
        setLoading(true);
        const response = await getAllServiceProviders();
        setProviders(response);
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

  // Group providers by category/specialization for better organization
  const providersByCategory = providers.reduce((acc, provider) => {
    const primarySpecialization = provider.specializations[0] || 'Other';
    if (!acc[primarySpecialization]) {
      acc[primarySpecialization] = [];
    }
    acc[primarySpecialization].push(provider);
    return acc;
  }, {} as Record<string, ServiceProvider[]>);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zygo-cream/30 to-white">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Service <span className="text-zygo-red">Providers</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover trusted healthcare professionals, educators, childcare specialists, and wellness
            practitioners in our network.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-zygo-red mb-2">{providers.length}</div>
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
              {providers.filter(p => p.availability.telehealth).length}
            </div>
            <div className="text-gray-600">Telehealth Available</div>
          </div>
        </div>

        {/* Featured Providers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.slice(0, 6).map((provider) => (
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
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            credential.verified
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {credential.verified && '✓ '}
                          {credential.abbreviation || credential.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {provider.specializations.slice(0, 2).map((specialization) => (
                      <span
                        key={specialization}
                        className="bg-zygo-red/10 text-zygo-red px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {specialization}
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {provider.bio}
                  </p>

                  {/* Experience */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-gray-600 text-sm">
                      {provider.yearsExperience} years experience
                    </span>
                  </div>

                  {/* Availability */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {provider.availability.inPerson && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                        🏥 In-Person
                      </span>
                    )}
                    {provider.availability.telehealth && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                        💻 Telehealth
                      </span>
                    )}
                    {provider.availability.homeVisits && (
                      <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs flex items-center gap-1">
                        🏠 Home Visits
                      </span>
                    )}
                  </div>

                  {/* Pricing */}
                  {provider.pricing?.consultationFee && (
                    <div className="text-gray-600 text-sm mb-4">
                      Consultation: ${provider.pricing.consultationFee} {provider.pricing.currency}
                    </div>
                  )}

                  {/* View Profile Button */}
                  <Link
                    to={`/network/providers/${provider.id}`}
                    className="block w-full bg-zygo-red hover:bg-zygo-red/90 text-white text-center py-3 rounded-lg transition-colors font-medium"
                  >
                    View Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse by Specialization */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse by Specialization</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(providersByCategory).map(([category, categoryProviders]) => (
              <Link
                key={category}
                to={`/network/providers?specialization=${encodeURIComponent(category)}`}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border-l-4 border-zygo-red"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{category}</h3>
                <p className="text-gray-600 mb-3">
                  {categoryProviders.length} provider{categoryProviders.length !== 1 ? 's' : ''} available
                </p>
                <div className="text-zygo-red font-medium text-sm">
                  Explore {category} →
                </div>
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
                to="/network/providers/search"
                className="bg-zygo-red hover:bg-zygo-red/90 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Advanced Search
              </Link>
              <Link
                to="/network/centers"
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

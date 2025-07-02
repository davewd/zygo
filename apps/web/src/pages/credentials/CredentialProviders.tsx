import type { CredentialProvider } from '@zygo/types/src/credentials';
import { Award, Building, Filter, Globe, Loader2, Search, Shield } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAsyncData } from '../../hooks/useAsyncData';
import { getCredentialProviders } from '../../lib/api/credentials';

const CredentialProviders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCountry, setFilterCountry] = useState<string>('all');
  
  // Use the new useAsyncData hook to manage credential providers data
  const { data: providers = [], loading, error, retry } = useAsyncData(async () => {
    const response = await getCredentialProviders();
    return response.data || [];
  }, []);

  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === 'all' || provider.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, filterType, providers]);

  const uniqueTypes = [...new Set(providers.map((p) => p.type))];
  const uniqueCountries = ['Australia']; // Since this is an Australian-focused app

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'government':
        return <Shield className="w-5 h-5" />;
      case 'certification-body':
        return <Award className="w-5 h-5" />;
      case 'professional-association':
        return <Building className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'government':
        return 'bg-blue-100 text-blue-800';
      case 'certification-body':
        return 'bg-green-100 text-green-800';
      case 'professional-association':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Credential Providers</h1>
        <p className="text-gray-600">
          Browse and search through our comprehensive database of credential providers and
          certification bodies.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-zygo-red" />
          <span className="ml-2 text-gray-600">Loading credential providers...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      {/* Content - only show when not loading and no error */}
      {!loading && !error && (
        <>
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search providers..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                  value={filterCountry}
                  onChange={(e) => setFilterCountry(e.target.value)}
                >
                  <option value="all">All Countries</option>
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProviders.length} of {providers.length} providers
            </p>
          </div>

          {/* Provider Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <Link
                key={provider.id}
                to={`/credentials/providers/${provider.id}`}
                className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 p-6 block"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(provider.type)}
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {provider.abbreviation || provider.name}
                      </h3>
                      {provider.abbreviation && (
                        <p className="text-sm text-gray-600">{provider.name}</p>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(provider.type)}`}>
                    {provider.type.replace('-', ' ')}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{provider.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    Australia
                  </span>
                  <span>{provider.credentialsIssued?.length || 0} credentials issued</span>
                </div>

                {provider.verificationMethods?.verificationUrl && (
                  <div className="mt-3 flex space-x-2">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Online Verification Available
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CredentialProviders;

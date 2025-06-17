import { Calendar, Globe, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CREDENTIAL_PROVIDERS } from '../../data/credentials/credentialProviders_new';

const CredentialSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [onlineVerificationOnly, setOnlineVerificationOnly] = useState(false);
  const [apiAccessOnly, setApiAccessOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'country' | 'established'>('name');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedProviders = useMemo(() => {
    let filtered = CREDENTIAL_PROVIDERS.filter((provider) => {
      if (!provider.isActive) return false;

      const matchesSearch =
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.abbreviation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.credentialsIssued?.some((cred) =>
          cred.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType = selectedType === 'all' || provider.type === selectedType;
      const matchesCountry = selectedCountry === 'all' || provider.country === selectedCountry;
      const matchesOnlineVerification =
        !onlineVerificationOnly || provider.verificationMethods?.online;
      const matchesApiAccess = !apiAccessOnly || provider.verificationMethods?.api;

      return (
        matchesSearch &&
        matchesType &&
        matchesCountry &&
        matchesOnlineVerification &&
        matchesApiAccess
      );
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'country':
          return a.country.localeCompare(b.country);
        case 'established':
          return (b.establishedYear || 0) - (a.establishedYear || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedType, selectedCountry, onlineVerificationOnly, apiAccessOnly, sortBy]);

  const uniqueTypes = [...new Set(CREDENTIAL_PROVIDERS.map((p) => p.type))];
  const uniqueCountries = [...new Set(CREDENTIAL_PROVIDERS.map((p) => p.country))].sort();

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
    setSelectedCountry('all');
    setOnlineVerificationOnly(false);
    setApiAccessOnly(false);
    setSortBy('name');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'government':
        return '🏛️';
      case 'certification-body':
        return '🏅';
      case 'professional-association':
        return '🏢';
      default:
        return '🌐';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Credential Search</h1>
        <p className="text-gray-600">
          Use advanced filters and search options to find specific credential providers and
          certifications.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search providers, credentials, organizations..."
              className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
            {(selectedType !== 'all' ||
              selectedCountry !== 'all' ||
              onlineVerificationOnly ||
              apiAccessOnly) && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Provider Type
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  {uniqueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="all">All Countries</option>
                  {uniqueCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'country' | 'established')}
                >
                  <option value="name">Name</option>
                  <option value="country">Country</option>
                  <option value="established">Established Year</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={onlineVerificationOnly}
                  onChange={(e) => setOnlineVerificationOnly(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-700">Online verification available</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={apiAccessOnly}
                  onChange={(e) => setApiAccessOnly(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-700">API access available</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Found {filteredAndSortedProviders.length} provider
          {filteredAndSortedProviders.length !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAndSortedProviders.map((provider) => (
          <div key={provider.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getTypeIcon(provider.type)}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {provider.abbreviation || provider.name}
                  </h3>
                  {provider.abbreviation && (
                    <p className="text-sm text-gray-600">{provider.name}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {provider.type.replace('-', ' ')}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{provider.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Globe className="w-4 h-4 mr-2" />
                {provider.country}
              </div>
              {provider.establishedYear && (
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Est. {provider.establishedYear}
                </div>
              )}
            </div>

            {provider.credentialsIssued && provider.credentialsIssued.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {provider.credentialsIssued.slice(0, 3).map((credential, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {credential.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  ))}
                  {provider.credentialsIssued.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                      +{provider.credentialsIssued.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {provider.verificationMethods?.online && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Online Verification
                  </span>
                )}
                {provider.verificationMethods?.api && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    API Access
                  </span>
                )}
              </div>

              <Link
                to={`/credentials/providers/${provider.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedProviders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <button
            onClick={clearFilters}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default CredentialSearch;

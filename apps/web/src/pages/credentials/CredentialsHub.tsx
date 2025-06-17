import { Award, Filter, Globe, Search, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CREDENTIAL_PROVIDERS } from '../../data/credentials/credentialProviders_new';

const CredentialsHub = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const activeProviders = CREDENTIAL_PROVIDERS.filter((p) => p.isActive);
  const governmentBodies = activeProviders.filter((p) => p.type === 'government');
  const certificationBodies = activeProviders.filter((p) => p.type === 'certification-body');
  const professionalAssociations = activeProviders.filter(
    (p) => p.type === 'professional-association'
  );

  const recentProviders = activeProviders
    .sort((a, b) => (b.establishedYear || 0) - (a.establishedYear || 0))
    .slice(0, 6);

  const featuredProviders = [
    activeProviders.find((p) => p.id === 'ahpra'),
    activeProviders.find((p) => p.id === 'iblce'),
    activeProviders.find((p) => p.id === 'tennis-australia'),
    activeProviders.find((p) => p.id === 'swimming-australia'),
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Credentials Hub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore, verify, and manage professional credentials from trusted providers worldwide.
          Your gateway to professional verification and credentialing.
        </p>
      </div>

      {/* Quick Search */}
      <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Quick Search</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search providers, credentials, or organizations..."
              className="pl-12 pr-4 py-4 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <Link
              to={`/credentials/providers${
                searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ''
              }`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Browse All Providers
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Providers</p>
              <p className="text-2xl font-bold text-gray-900">{activeProviders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Gov Bodies</p>
              <p className="text-2xl font-bold text-gray-900">{governmentBodies.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cert Bodies</p>
              <p className="text-2xl font-bold text-gray-900">{certificationBodies.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Prof Assocs</p>
              <p className="text-2xl font-bold text-gray-900">{professionalAssociations.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Providers */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Providers</h2>
          <Link
            to="/credentials/providers"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProviders.map((provider) => (
            <Link
              key={provider?.id}
              to={`/credentials/providers/${provider?.id}`}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 p-6 block"
            >
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  {provider?.abbreviation || provider?.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{provider?.description}</p>
                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {provider?.country}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Link
          to="/credentials/providers"
          className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 p-6 block"
        >
          <div className="text-center">
            <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Providers</h3>
            <p className="text-gray-600">
              Explore our comprehensive database of credential providers and certification bodies.
            </p>
          </div>
        </Link>

        <Link
          to="/credentials/verify"
          className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 p-6 block"
        >
          <div className="text-center">
            <div className="p-4 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4">
              <Award className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Credentials</h3>
            <p className="text-gray-600">
              Quickly verify professional credentials and certifications online.
            </p>
          </div>
        </Link>

        <Link
          to="/credentials/search"
          className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 p-6 block"
        >
          <div className="text-center">
            <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4">
              <Filter className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Search</h3>
            <p className="text-gray-600">
              Use advanced filters to find specific credentials or providers.
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Providers */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
          <Link
            to="/credentials/providers"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProviders.slice(0, 3).map((provider) => (
            <Link
              key={provider.id}
              to={`/credentials/providers/${provider.id}`}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 p-6 block"
            >
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                {provider.abbreviation || provider.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{provider.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{provider.country}</span>
                <span>Est. {provider.establishedYear}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CredentialsHub;

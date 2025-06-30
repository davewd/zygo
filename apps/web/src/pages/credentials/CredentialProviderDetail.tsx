import type { CredentialProvider } from '@zygo/types/src/credentials';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  ExternalLink,
  Globe,
  Mail,
  Phone,
  Shield,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCredentialProviderById } from '../../lib/api/credentialProviders';

const CredentialProviderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<CredentialProvider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProvider = async () => {
      if (!id) {
        setError('No provider ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getCredentialProviderById(id);
        if (response.success && response.data) {
          setProvider(response.data);
          setError(null);
        } else {
          setProvider(null);
          setError(response.error || 'Provider not found');
        }
      } catch (err) {
        console.error('Failed to load credential provider:', err);
        setError('Failed to load credential provider. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProvider();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading provider details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏢</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Provider not found</h3>
          <p className="text-gray-600 mb-4">
            The credential provider you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/credentials/providers"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Browse All Providers
          </Link>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'government':
        return <Shield className="w-6 h-6" />;
      case 'certification-body':
        return <CheckCircle className="w-6 h-6" />;
      case 'professional-association':
        return <Globe className="w-6 h-6" />;
      default:
        return <Globe className="w-6 h-6" />;
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link
          to="/credentials/providers"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Providers
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gray-50 rounded-full">{getTypeIcon(provider.type)}</div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
              {provider.abbreviation && (
                <p className="text-lg text-gray-600 mt-1">{provider.abbreviation}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className={`px-3 py-1 text-sm rounded-full ${getTypeColor(provider.type)}`}>
              {provider.type.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </span>
            <div className="flex items-center">
              {provider.isActive ? (
                <span className="flex items-center text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Active
                </span>
              ) : (
                <span className="flex items-center text-red-600 text-sm">
                  <XCircle className="w-4 h-4 mr-1" />
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">{provider.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Globe className="w-5 h-5 mr-2" />
              <span className="font-medium">Country:</span>
              <span className="ml-2">{provider.country}</span>
            </div>
            {provider.establishedYear && (
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="font-medium">Established:</span>
                <span className="ml-2">{provider.establishedYear}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {provider.website && (
              <div className="flex items-center text-gray-600">
                <ExternalLink className="w-5 h-5 mr-2" />
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      {provider.contactInfo && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {provider.contactInfo.email && (
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3" />
                <a
                  href={`mailto:${provider.contactInfo.email}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {provider.contactInfo.email}
                </a>
              </div>
            )}
            {provider.contactInfo.phone && (
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3" />
                <a
                  href={`tel:${provider.contactInfo.phone}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {provider.contactInfo.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Verification Methods */}
      {provider.verificationMethods && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${
                  provider.verificationMethods.online ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              <span
                className={provider.verificationMethods.online ? 'text-gray-900' : 'text-gray-500'}
              >
                Online Verification
              </span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${
                  provider.verificationMethods.manual ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              <span
                className={provider.verificationMethods.manual ? 'text-gray-900' : 'text-gray-500'}
              >
                Manual Verification
              </span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${
                  provider.verificationMethods.api ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              <span
                className={provider.verificationMethods.api ? 'text-gray-900' : 'text-gray-500'}
              >
                API Access
              </span>
            </div>
          </div>
          {provider.verificationMethods.verificationUrl && (
            <div className="mt-4 pt-4 border-t">
              <a
                href={provider.verificationMethods.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Verification Portal
              </a>
            </div>
          )}
        </div>
      )}

      {/* Credentials Issued */}
      {provider.credentialsIssued && provider.credentialsIssued.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Credentials Issued</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {provider.credentialsIssued.map((credential, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 text-sm font-medium text-gray-700"
              >
                {credential.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialProviderDetail;

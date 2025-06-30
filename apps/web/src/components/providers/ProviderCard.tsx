import { Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ProviderCardData {
  id?: string;
  firstName?: string;
  lastName?: string;
  name?: string; // For cases where we have a single name field
  title?: string;
  profileImage?: string;
  bio?: string;
  credentials?: Array<{
    title: string;
    abbreviation?: string;
    verified?: boolean;
  }>;
  specializations?: string[];
  tags?: string[];
  yearsExperience?: number;
  availability?: {
    inPerson?: boolean;
    telehealth?: boolean;
    homeVisits?: boolean;
    emergency?: boolean;
  };
  centerName?: string;
  status?: 'active' | 'past' | 'current' | 'interested';
  dateFollowed?: string;
  location?: {
    suburb?: string;
    state?: string;
  };
}

interface ProviderCardProps {
  provider: ProviderCardData;
  variant?: 'default' | 'connected'; // 'connected' for profile connections, 'default' for general listings
  showBio?: boolean;
  showExperience?: boolean;
  showAvailability?: boolean;
  showConnectionInfo?: boolean;
  className?: string;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  variant = 'default',
  showBio = true,
  showExperience = true,
  showAvailability = true,
  showConnectionInfo = false,
  className = '',
}) => {
  // Determine provider name
  const providerName =
    provider.name ||
    (provider.firstName && provider.lastName
      ? `${provider.firstName} ${provider.lastName}`
      : provider.firstName || provider.lastName || 'Unknown Provider');

  // Generate provider ID for navigation
  const providerId = provider.id || providerName.toLowerCase().replace(/\s+/g, '-');

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'past':
        return 'bg-gray-100 text-gray-600';
      case 'current':
        return 'bg-blue-100 text-blue-700';
      case 'interested':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Provider Header */}
      <div
        className={`relative ${
          variant === 'connected' ? 'h-32' : 'h-48'
        } bg-gradient-to-br from-zygo-blue to-zygo-mint`}
      >
        {provider.profileImage && (
          <img
            src={provider.profileImage}
            alt={providerName}
            className="w-full h-full object-cover"
          />
        )}

        {/* Header content positioning */}
        <div
          className={`absolute ${
            variant === 'connected' ? 'bottom-3 left-3 right-3' : 'bottom-4 left-4 right-4'
          }`}
        >
          <h3
            className={`text-white font-bold mb-1 ${
              variant === 'connected' ? 'text-lg' : 'text-xl'
            }`}
          >
            {providerName}
          </h3>
          {provider.title && (
            <p className={`text-white/90 ${variant === 'connected' ? 'text-sm' : 'text-sm'}`}>
              {provider.title}
            </p>
          )}
        </div>

        {/* Status badge for connected variant */}
        {variant === 'connected' && provider.status && (
          <div className="absolute top-3 right-3">
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(provider.status)}`}>
              {provider.status}
            </span>
          </div>
        )}
      </div>

      {/* Provider Content */}
      <div className="p-6">
        {/* Center/Location info */}
        {provider.centerName && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{provider.centerName}</span>
          </div>
        )}

        {provider.location?.suburb && provider.location?.state && (
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span>
              {provider.location.suburb}, {provider.location.state}
            </span>
          </div>
        )}

        {/* Credentials */}
        {provider.credentials && provider.credentials.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {provider.credentials.slice(0, 2).map((credential, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  credential.verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {credential.verified && '✓ '}
                {credential.abbreviation || credential.title}
              </span>
            ))}
            {provider.credentials.length > 2 && (
              <span className="text-gray-500 text-xs">+{provider.credentials.length - 2} more</span>
            )}
          </div>
        )}

        {/* Specializations/Tags */}
        {(provider.specializations || provider.tags) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {(provider.specializations || provider.tags)?.slice(0, 3).map((item, index) => (
              <span
                key={index}
                className="bg-zygo-red/10 text-zygo-red px-3 py-1 rounded-full text-sm font-medium"
              >
                {item}
              </span>
            ))}
            {(provider.specializations || provider.tags) &&
              (provider.specializations?.length || provider.tags?.length || 0) > 3 && (
                <span className="text-gray-500 text-sm">
                  +{(provider.specializations?.length || provider.tags?.length || 0) - 3} more
                </span>
              )}
          </div>
        )}

        {/* Bio */}
        {showBio && provider.bio && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{provider.bio}</p>
        )}

        {/* Experience */}
        {showExperience && provider.yearsExperience && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-500">⭐</span>
            <span className="text-gray-600 text-sm">
              {provider.yearsExperience} years experience
            </span>
          </div>
        )}

        {/* Availability */}
        {showAvailability && provider.availability && (
          <div className="flex flex-wrap gap-2 mb-4">
            {provider.availability.inPerson && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">In-Person</span>
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
            {provider.availability.emergency && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Emergency</span>
            )}
          </div>
        )}

        {/* Connection Info */}
        {showConnectionInfo && provider.dateFollowed && (
          <div className="flex items-center text-gray-500 text-xs mb-3">
            <Clock className="w-3 h-3 mr-1" />
            <span>Connected since {formatDate(provider.dateFollowed)}</span>
          </div>
        )}

        {/* View Profile Button */}
        <Link
          to={`/community/providers/${providerId}`}
          className="block w-full bg-zygo-red hover:bg-zygo-red/90 text-white text-center py-3 rounded-lg transition-colors font-medium"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ProviderCard;

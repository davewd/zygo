import type { CredentialDefinition } from '@zygo/types/src/credentials';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CREDENTIAL_PROVIDERS } from '../../lib/api/credentials';

interface ClickableCredentialCardProps {
  credential: CredentialDefinition;
  className?: string;
}

/**
 * Helper function to map credential issuingBody to credential provider ID
 * This function attempts to match the issuingBody with provider names or abbreviations
 */
const mapIssuingProviderIdToProviderId = (issuingProviderId: string): string | null => {
  // Find provider by exact ID match
  const provider = CREDENTIAL_PROVIDERS.find((p) => p.id === issuingProviderId);

  if (provider) return provider.id;

  // If no exact match, return null (provider not found)
  return null;
};

/**
 * Reusable credential card component that makes credentials clickable
 * and navigates to credential provider detail pages
 */
export const ClickableCredentialCard: React.FC<ClickableCredentialCardProps> = ({
  credential,
  className = '',
}) => {
  const navigate = useNavigate();

  const providerId = mapIssuingProviderIdToProviderId(credential.issuingProviderId);

  // Get provider name for display
  const provider = CREDENTIAL_PROVIDERS.find((p) => p.id === credential.issuingProviderId);
  const providerName = provider?.name || 'Unknown Provider';

  const isClickable = providerId !== null;

  const handleClick = () => {
    if (providerId) {
      navigate(`/credentials/providers/${providerId}`);
    }
  };

  const baseClasses = 'flex items-start p-4 border rounded-lg';
  const interactiveClasses = isClickable
    ? 'cursor-pointer hover:border-zygo-red/50 hover:bg-gray-50 transition-colors'
    : '';

  return (
    <div
      className={`${baseClasses} ${interactiveClasses} ${className}`}
      onClick={handleClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      title={isClickable ? `Click to view ${providerName} details` : undefined}
    >
      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className={`font-semibold text-gray-800 ${isClickable ? 'hover:text-zygo-red' : ''}`}>
          {credential.title}
        </h4>
        {credential.abbreviation && (
          <p className="text-zygo-red font-medium">{credential.abbreviation}</p>
        )}
        <p className={`text-gray-600 text-sm ${isClickable ? 'hover:text-gray-800' : ''}`}>
          {providerName}
          {isClickable && (
            <span className="ml-2 text-xs text-blue-600">(Click to view provider details)</span>
          )}
        </p>
        {credential.verificationRequired && (
          <span className="inline-block mt-2 bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
            ✓ Verification Required
          </span>
        )}
      </div>
    </div>
  );
};

export default ClickableCredentialCard;

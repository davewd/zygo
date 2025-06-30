import type { PersonalCredential } from '@zygo/types/src/credentials';
import { Badge } from '@zygo/ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { CREDENTIAL_DEFINITIONS } from '../../lib/api/credentials';
import { CredentialService } from '../../services/credentialService';

interface CredentialBadgeProps {
  credential: PersonalCredential;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  onClick?: (credential: PersonalCredential) => void;
}

export const CredentialBadge: React.FC<CredentialBadgeProps> = ({
  credential,
  size = 'md',
  showDetails = false,
  onClick,
}) => {
  const displayInfo = CredentialService.getCredentialDisplayInfo(credential);

  const getVariant = () => {
    if (displayInfo.isExpired) return 'destructive';
    if (displayInfo.isExpiringSoon) return 'warning';
    if (displayInfo.verificationStatus === 'verified') return 'success';
    if (displayInfo.verificationStatus === 'pending') return 'secondary';
    return 'outline';
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'text-xs px-2 py-1';
      case 'lg':
        return 'text-base px-4 py-2';
      default:
        return 'text-sm px-3 py-1';
    }
  };

  return (
    <Badge
      variant={getVariant()}
      className={`${getSizeClass()} ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
      onClick={() => onClick?.(credential)}
      title={showDetails ? undefined : `${displayInfo.title} - ${displayInfo.issuingProvider}`}
    >
      <span className="flex items-center gap-1">
        <span>{displayInfo.abbreviation || displayInfo.title}</span>
        {displayInfo.displayBadge && (
          <span className="text-xs">{displayInfo.displayBadge.icon}</span>
        )}
      </span>
    </Badge>
  );
};

interface CredentialCardProps {
  credential: PersonalCredential;
  onVerify?: (credential: PersonalCredential) => void;
  onRenew?: (credential: PersonalCredential) => void;
  onEdit?: (credential: PersonalCredential) => void;
  onDelete?: (credential: PersonalCredential) => void;
}

export const CredentialCard: React.FC<CredentialCardProps> = ({
  credential,
  onVerify,
  onRenew,
  onEdit,
  onDelete,
}) => {
  const displayInfo = CredentialService.getCredentialDisplayInfo(credential);
  const definition = CREDENTIAL_DEFINITIONS.find((d) => d.id === credential.credentialDefinitionId);

  const getStatusColor = () => {
    if (displayInfo.isExpired) return 'text-red-600 bg-red-50';
    if (displayInfo.isExpiringSoon) return 'text-orange-600 bg-orange-50';
    if (displayInfo.verificationStatus === 'verified') return 'text-green-600 bg-green-50';
    if (displayInfo.verificationStatus === 'pending') return 'text-blue-600 bg-blue-50';
    return 'text-gray-600 bg-gray-50';
  };

  const verificationUrl = CredentialService.getVerificationUrl(credential);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{displayInfo.title}</h3>
          {displayInfo.abbreviation && (
            <p className="text-sm text-gray-600">{displayInfo.abbreviation}</p>
          )}
          {definition?.providerId ? (
            <Link
              to={`/credentials/providers/${definition.providerId}`}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              {displayInfo.issuingProvider}
            </Link>
          ) : (
            <p className="text-sm text-gray-600">{displayInfo.issuingProvider}</p>
          )}
        </div>

        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {displayInfo.displayBadge?.icon} {displayInfo.displayBadge?.text}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
        {displayInfo.issueYear && (
          <div>
            <span className="font-medium">Issued:</span> {displayInfo.issueYear}
          </div>
        )}
        {displayInfo.expiryDate && (
          <div>
            <span className="font-medium">Expires:</span>{' '}
            {new Date(displayInfo.expiryDate).toLocaleDateString()}
          </div>
        )}
        <div>
          <span className="font-medium">Type:</span> {displayInfo.type}
        </div>
        <div>
          <span className="font-medium">Category:</span> {displayInfo.category.replace('-', ' ')}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2">
        {displayInfo.verificationStatus !== 'verified' && onVerify && (
          <button
            onClick={() => onVerify(credential)}
            className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Verify
          </button>
        )}

        {displayInfo.canRenew && onRenew && (
          <button
            onClick={() => onRenew(credential)}
            className="text-xs px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
          >
            Renew
          </button>
        )}

        {verificationUrl && (
          <a
            href={verificationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Verify Online
          </a>
        )}

        {onEdit && (
          <button
            onClick={() => onEdit(credential)}
            className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            Edit
          </button>
        )}

        {onDelete && (
          <button
            onClick={() => onDelete(credential)}
            className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

interface CredentialSummaryProps {
  credentials: PersonalCredential[];
  showCounts?: boolean;
  showCategories?: boolean;
}

export const CredentialSummary: React.FC<CredentialSummaryProps> = ({
  credentials,
  showCounts = true,
  showCategories = false,
}) => {
  const summary = CredentialService.generateCredentialSummary(credentials);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Credential Summary</h3>

      {showCounts && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{summary.totalCredentials}</div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{summary.verifiedCredentials}</div>
            <div className="text-xs text-gray-600">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{summary.expiringCredentials}</div>
            <div className="text-xs text-gray-600">Expiring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{summary.expiredCredentials}</div>
            <div className="text-xs text-gray-600">Expired</div>
          </div>
        </div>
      )}

      {showCategories && Object.keys(summary.byCategory).length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">By Category</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(summary.byCategory).map(([category, count]) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category.replace('-', ' ')}: {count}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {summary.highestLevelCredentials.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-700 mb-2">Highest Level Credentials</h4>
          <div className="flex flex-wrap gap-2">
            {summary.highestLevelCredentials.map((credential) => (
              <CredentialBadge key={credential.id} credential={credential} size="sm" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface CredentialListProps {
  credentials: PersonalCredential[];
  onCredentialClick?: (credential: PersonalCredential) => void;
  onVerify?: (credential: PersonalCredential) => void;
  onRenew?: (credential: PersonalCredential) => void;
  onEdit?: (credential: PersonalCredential) => void;
  onDelete?: (credential: PersonalCredential) => void;
  groupBy?: 'category' | 'type' | 'provider' | 'status';
  showSummary?: boolean;
}

export const CredentialList: React.FC<CredentialListProps> = ({
  credentials,
  onCredentialClick,
  onVerify,
  onRenew,
  onEdit,
  onDelete,
  groupBy,
  showSummary = false,
}) => {
  const groupCredentials = () => {
    if (!groupBy) return { 'All Credentials': credentials };

    const grouped: Record<string, PersonalCredential[]> = {};

    credentials.forEach((credential) => {
      const displayInfo = CredentialService.getCredentialDisplayInfo(credential);
      let key: string;

      switch (groupBy) {
        case 'category':
          key = displayInfo.category.replace('-', ' ');
          break;
        case 'type':
          key = displayInfo.type;
          break;
        case 'provider':
          key = displayInfo.issuingProvider;
          break;
        case 'status':
          key = displayInfo.verificationStatus;
          break;
        default:
          key = 'All';
      }

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(credential);
    });

    return grouped;
  };

  const groupedCredentials = groupCredentials();

  return (
    <div className="space-y-6">
      {showSummary && <CredentialSummary credentials={credentials} showCounts showCategories />}

      {Object.entries(groupedCredentials).map(([groupName, groupCredentials]) => (
        <div key={groupName}>
          {groupBy && (
            <h3 className="font-semibold text-gray-900 mb-3 capitalize">
              {groupName} ({groupCredentials.length})
            </h3>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groupCredentials.map((credential) => (
              <CredentialCard
                key={credential.id}
                credential={credential}
                onVerify={onVerify}
                onRenew={onRenew}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}

      {credentials.length === 0 && (
        <div className="text-center py-8 text-gray-500">No credentials found.</div>
      )}
    </div>
  );
};

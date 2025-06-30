import React from 'react';
import { Link } from 'react-router-dom';
import { FeedItemTypeMap, ActorType } from '../../../lib/api/feed';
import { formatDate } from './feedUtils';
import { PrivacyIndicator } from './PrivacyIndicator';

/**
 * Generate the appropriate profile link based on actor type
 */
const getProfileLink = (author: FeedItemTypeMap['author']): string | null => {
  const actorType = author.actorType as string;
  
  switch (actorType) {
    case ActorType.COMMUNITY_MEMBER:
    case 'community_member':
      // Community members link to community profiles using their handle
      return `/community/profiles/${author.handle}`;
    
    case ActorType.SERVICE_PROVIDER:
    case 'service_provider':
      // Service providers link to provider profiles using their providerId or handle
      const providerId = (author as any).providerId || author.handle;
      return `/network/providers/${providerId}`;
    
    case ActorType.SERVICE_CENTER:
    case 'service_center':
      // Service centers link to center profiles using their centerId or handle
      const centerId = (author as any).centerId || author.handle;
      return `/network/centers/${centerId}`;
    
    case 'organization':
      // Organizations may not have profile pages, return null for now
      return null;
    
    case 'system':
      // System posts don't have profile pages
      return null;
    
    default:
      // Fallback to community profiles for unknown types
      return `/community/profiles/${author.handle}`;
  }
};

interface FeedItemHeaderProps {
  item: FeedItemTypeMap;
  className?: string;
  avatarClassName?: string;
  children?: React.ReactNode;
  customHeader?: React.ReactNode;
}

export const FeedItemHeader: React.FC<FeedItemHeaderProps> = ({
  item,
  className = '',
  avatarClassName = '',
  children,
  customHeader,
}) => {
  if (customHeader) {
    return <>{customHeader}</>;
  }

  const profileLink = getProfileLink(item.author);

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <img
        src={item.author.avatar}
        alt={item.author.name}
        className={`w-12 h-12 rounded-full object-cover ${avatarClassName}`}
        onError={(e) => {
          const img = e.currentTarget;
          if (img.src !== 'https://via.placeholder.com/48') {
            img.src = 'https://via.placeholder.com/48';
          }
        }}
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          {profileLink ? (
            <Link
              to={profileLink}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {item.author.name}
            </Link>
          ) : (
            <span className="font-semibold text-gray-900">
              {item.author.name}
            </span>
          )}
          {item.author.verified && (
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <span className="text-gray-500 text-sm">@{item.author.handle}</span>
          {item.sponsoredData && <span className="text-gray-400 text-sm">• Sponsored</span>}
          {(item as any).hasReferences && (
            <span className="text-amber-600 text-sm">• Referenced</span>
          )}
        </div>
        <p className="text-gray-500 text-sm">{formatDate(item.metadata.createdAt)}</p>
        {children}
      </div>
      <PrivacyIndicator privacy={item.privacy} />
    </div>
  );
};

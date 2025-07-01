import React from 'react';
import { Link } from 'react-router-dom';
import { FeedItemTypeMap } from '../../../lib/api/feed';

// Context data structure - this would be part of the feed item's metadata
interface ContextData {
  type: 'profile_milestone' | 'profile_activity' | 'collaboration' | 'custom';
  profileName?: string;
  profileId?: string;
  profileType?: 'family_member' | 'service_provider' | 'community_member';
  activityName?: string;
  activityId?: string;
  activityType?: 'milestone' | 'event' | 'goal' | 'assessment';
  customText?: string;
}

interface FeedItemContextProps {
  item: FeedItemTypeMap & {
    context?: ContextData;
  };
  className?: string;
}

/**
 * Generates appropriate link based on profile type and ID
 */
const getProfileLink = (profileType: string, profileId: string): string => {
  switch (profileType) {
    case 'family_member':
      return `/family/members/${profileId}`;
    case 'service_provider':
      return `/community/providers/${profileId}`;
    case 'community_member':
      return `/community/profiles/${profileId}`;
    default:
      return `/community/profiles/${profileId}`;
  }
};

/**
 * Generates appropriate link based on activity type and ID
 */
const getActivityLink = (activityType: string, activityId: string): string => {
  switch (activityType) {
    case 'milestone':
      return `/timeline/milestone/${activityId}`;
    case 'event':
      return `/events/${activityId}`;
    case 'goal':
      return `/goals/${activityId}`;
    case 'assessment':
      return `/assessments/${activityId}`;
    default:
      return `/timeline/milestone/${activityId}`;
  }
};

/**
 * Renders context information about what the feed item relates to
 * Examples:
 * - "Isabella Dawson working on Emotional Intelligence"
 * - "Dr. Sarah Chen collaborating with John Smith"
 * - Custom context text
 */
export const FeedItemContext: React.FC<FeedItemContextProps> = ({ item, className = '' }) => {
  // Don't render if no context data
  if (!item.context) {
    return null;
  }

  const { context } = item;

  const renderContextContent = () => {
    switch (context.type) {
      case 'profile_milestone':
        return (
          <span className="text-sm text-gray-600">
            {context.profileName && context.profileId && context.profileType ? (
              <Link
                to={getProfileLink(context.profileType, context.profileId)}
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {context.profileName}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{context.profileName}</span>
            )}
            <span className="mx-1">working on</span>
            {context.activityName && context.activityId && context.activityType ? (
              <Link
                to={getActivityLink(context.activityType, context.activityId)}
                className="font-medium text-purple-600 hover:text-purple-800 hover:underline transition-colors"
              >
                {context.activityName}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{context.activityName}</span>
            )}
          </span>
        );

      case 'profile_activity':
        return (
          <span className="text-sm text-gray-600">
            {context.profileName && context.profileId && context.profileType ? (
              <Link
                to={getProfileLink(context.profileType, context.profileId)}
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {context.profileName}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{context.profileName}</span>
            )}
            <span className="mx-1">posted about</span>
            {context.activityName && context.activityId && context.activityType ? (
              <Link
                to={getActivityLink(context.activityType, context.activityId)}
                className="font-medium text-green-600 hover:text-green-800 hover:underline transition-colors"
              >
                {context.activityName}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{context.activityName}</span>
            )}
          </span>
        );

      case 'collaboration':
        return (
          <span className="text-sm text-gray-600">
            {context.profileName && context.profileId && context.profileType ? (
              <Link
                to={getProfileLink(context.profileType, context.profileId)}
                className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {context.profileName}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{context.profileName}</span>
            )}
            <span className="mx-1">collaborating with</span>
            {context.activityName && context.activityId && context.activityType ? (
              <Link
                to={getActivityLink(context.activityType, context.activityId)}
                className="font-medium text-amber-600 hover:text-amber-800 hover:underline transition-colors"
              >
                {context.activityName}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{context.activityName}</span>
            )}
          </span>
        );

      case 'custom':
        return <span className="text-sm text-gray-600">{context.customText}</span>;

      default:
        return null;
    }
  };

  const contextContent = renderContextContent();

  if (!contextContent) {
    return null;
  }

  return (
    <div className={`flex items-center py-1 ${className}`}>
      <div className="flex items-center space-x-2 w-full">
        {/* Context indicator icon */}
        <div className="w-1.5 h-1.5 bg-blue-300 rounded-full flex-shrink-0" />

        {/* Context content */}
        <div className="flex-1 min-w-0">{contextContent}</div>
      </div>
    </div>
  );
};

// Export the context data interface for use in other components
export type { ContextData };

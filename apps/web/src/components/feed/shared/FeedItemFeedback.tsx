import {
  Activity,
  Award,
  Baby,
  Building,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Hash,
  Heart,
  MapPin,
  MessageCircle,
  Share,
  Stethoscope,
  ThumbsUp,
  Users,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { ActorType, FeedItemTypeMap } from '../../../lib/api/feed';
import { formatStats } from './feedUtils';

interface PeerLike {
  providerId: string;
  providerName: string;
  credentials: string[];
  specializations: string[];
  dateLiked: string;
}

interface FeedItemFeedbackProps {
  item: FeedItemTypeMap;
  className?: string;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onHashtagClick?: (hashtag: string) => void;
  // Extended props for peer likes functionality
  peerLikes?: {
    count: number;
    likedBy: PeerLike[];
  };
  // Show hashtags extracted from content
  showHashtags?: boolean;
  isLiked?: boolean;
}

export const FeedItemFeedback: React.FC<FeedItemFeedbackProps> = ({
  item,
  className = '',
  onLike,
  onComment,
  onShare,
  onHashtagClick,
  peerLikes,
  showHashtags = true,
  isLiked = false,
}) => {
  const [showPeerLikes, setShowPeerLikes] = useState(false);
  const [showAllHashtags, setShowAllHashtags] = useState(false);

  // Extract hashtags from post content
  const hashtags = useMemo(() => {
    if (!item.post && !item.description) return [];

    const content = item.post || item.description || '';
    const hashtagRegex = /#(\w+)/g;
    const matches = content.match(hashtagRegex);

    return matches ? matches.map((tag) => tag.substring(1)) : [];
  }, [item.post, item.description]);

  const displayedHashtags = showAllHashtags ? hashtags : hashtags.slice(0, 3);

  // Get actor-specific badge and info
  const getActorBadge = () => {
    switch (item.author.actorType) {
      case ActorType.COMMUNITY_MEMBER:
        return {
          icon:
            item.author.role === 'parent'
              ? Baby
              : item.author.role === 'grandparent'
              ? Heart
              : item.author.role === 'child'
              ? Activity
              : Users,
          text: item.author.role || 'Community Member',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          description: item.author.location
            ? `${item.author.location.suburb}, ${item.author.location.state}`
            : undefined,
        };
      case ActorType.SERVICE_PROVIDER:
        return {
          icon: item.author.title?.includes('Dr')
            ? Stethoscope
            : item.author.specializations?.some((s) => s.toLowerCase().includes('education'))
            ? GraduationCap
            : Award,
          text: item.author.title || 'Service Provider',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          description: item.author.centerName
            ? `at ${item.author.centerName}`
            : item.author.yearsExperience
            ? `${item.author.yearsExperience} years experience`
            : undefined,
        };
      case ActorType.SERVICE_CENTER:
        return {
          icon: Building,
          text: item.author.organizationType
            ? `${
                item.author.organizationType.charAt(0).toUpperCase() +
                item.author.organizationType.slice(1)
              } Center`
            : 'Service Center',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-700',
          description: item.author.features ? `${item.author.features.length} services` : undefined,
        };
      default:
        return {
          icon: Users,
          text: 'Community',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
        };
    }
  };

  const actorBadge = getActorBadge();

  return (
    <div className={`pt-4 space-y-3 ${className}`}>
      {/* Hashtags Section */}
      {showHashtags && hashtags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <Hash className="w-4 h-4 text-gray-400" />
          {displayedHashtags.map((hashtag, index) => (
            <button
              key={index}
              onClick={() => onHashtagClick?.(hashtag)}
              className="text-sm bg-gray-100 hover:bg-zygo-red hover:text-white text-gray-700 px-2 py-1 rounded-md transition-colors duration-200"
            >
              #{hashtag}
            </button>
          ))}
          {hashtags.length > 3 && (
            <button
              onClick={() => setShowAllHashtags(!showAllHashtags)}
              className="text-sm text-gray-500 hover:text-zygo-red transition-colors flex items-center"
            >
              {showAllHashtags ? (
                <>
                  <span>Show less</span>
                  <ChevronUp className="w-3 h-3 ml-1" />
                </>
              ) : (
                <>
                  <span>+{hashtags.length - 3} more</span>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Actor Information */}
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center space-x-3">
          {/* Actor Badge */}
          <div
            className={`flex items-center space-x-2 px-3 py-1 rounded-full ${actorBadge.bgColor}`}
          >
            <actorBadge.icon className={`w-4 h-4 ${actorBadge.textColor}`} />
            <span className={`text-sm font-medium ${actorBadge.textColor}`}>{actorBadge.text}</span>
          </div>

          {/* Additional Info */}
          {actorBadge.description && (
            <span className="text-sm text-gray-500">{actorBadge.description}</span>
          )}
        </div>

        {/* Credentials/Specializations for Service Providers */}
        {item.author.actorType === ActorType.SERVICE_PROVIDER && item.author.credentials && (
          <div className="flex flex-wrap gap-1">
            {item.author.credentials.slice(0, 2).map((credential, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded ${
                  credential.verified
                    ? 'bg-zygo-red/10 text-zygo-red border border-zygo-red/20'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {credential.abbreviation || credential.title}
                {credential.verified && <Award className="w-3 h-3 inline ml-1" />}
              </span>
            ))}
            {item.author.credentials.length > 2 && (
              <span className="text-xs text-gray-500">
                +{item.author.credentials.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Location for Community Members */}
        {item.author.actorType === ActorType.COMMUNITY_MEMBER && item.author.location && (
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            <span>
              {item.author.location.suburb}, {item.author.location.state}
            </span>
          </div>
        )}

        {/* Organization Type for Service Centers */}
        {item.author.actorType === ActorType.SERVICE_CENTER && item.author.organizationType && (
          <div className="flex items-center text-sm text-gray-500">
            <Building className="w-3 h-3 mr-1" />
            <span className="capitalize">{item.author.organizationType}</span>
          </div>
        )}
      </div>

      {/* Main Feedback Row */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        {/* Left side - Like button and Peer Reactions */}
        <div className="flex items-center space-x-4">
          {/* Like Button */}
          <button
            className={`flex items-center space-x-2 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50 ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
            onClick={onLike}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{formatStats(item.stats.likes)}</span>
          </button>

          {/* Peer Reactions */}
          {peerLikes && peerLikes.count > 0 && (
            <button
              onClick={() => setShowPeerLikes(!showPeerLikes)}
              className="flex items-center text-sm text-gray-600 hover:text-zygo-red transition-colors group"
            >
              <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{peerLikes.count}</span>
              <span className="text-gray-400 ml-1">peer likes</span>
              <ChevronDown
                className={`w-3 h-3 ml-1 transition-transform ${showPeerLikes ? 'rotate-180' : ''}`}
              />
            </button>
          )}
        </div>

        {/* Right side - Comments and Shares */}
        <div className="flex items-center space-x-4 text-gray-500">
          <button
            className="flex items-center space-x-1 hover:text-blue-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
            onClick={onComment}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{formatStats(item.stats.comments)}</span>
          </button>
          <button
            className="flex items-center space-x-1 hover:text-purple-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
            onClick={onShare}
          >
            <Share className="w-4 h-4" />
            <span className="text-sm">{formatStats(item.stats.shares)}</span>
          </button>
        </div>
      </div>

      {/* Peer Likes Dropdown */}
      {showPeerLikes && peerLikes && peerLikes.likedBy.length > 0 && (
        <div className="mt-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center mb-3">
            <Users className="w-4 h-4 text-zygo-red mr-2" />
            <h4 className="text-sm font-medium text-gray-700">
              Liked by fellow healthcare providers
            </h4>
          </div>
          <div className="space-y-3">
            {peerLikes.likedBy.slice(0, 5).map((peer) => (
              <div
                key={peer.providerId}
                className="flex items-center justify-between bg-white rounded-md p-3 shadow-sm"
              >
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800">{peer.providerName}</span>
                    <div className="flex items-center ml-2 space-x-1">
                      {peer.credentials.slice(0, 2).map((cred, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                        >
                          {cred}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {peer.specializations.slice(0, 2).join(', ')}
                    {peer.specializations.length > 2 && ` +${peer.specializations.length - 2} more`}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(peer.dateLiked).toLocaleDateString()}
                  </div>
                </div>
                <ThumbsUp className="w-4 h-4 text-zygo-red flex-shrink-0" />
              </div>
            ))}
            {peerLikes.likedBy.length > 5 && (
              <div className="text-center">
                <button className="text-sm text-zygo-red hover:text-zygo-red/80 font-medium">
                  View all {peerLikes.likedBy.length} peer likes
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

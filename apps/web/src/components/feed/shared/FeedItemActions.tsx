import {
  ChevronDown,
  Hash,
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  ThumbsUp,
  Users,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { formatStats } from './feedUtils';

interface PeerLike {
  providerId: string;
  providerName: string;
  credentials: string[];
  specializations: string[];
  dateLiked: string;
}

interface FeedItemActionsProps {
  item: FeedItemTypeMap;
  className?: string;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
  onHashtagClick?: (hashtag: string) => void;
  showHashtags?: boolean;
  peerLikes?: {
    count: number;
    likedBy: PeerLike[];
  };
}

export const FeedItemActions: React.FC<FeedItemActionsProps> = ({
  item,
  className = '',
  onLike,
  onComment,
  onRepost,
  onShare,
  onHashtagClick,
  showHashtags = true,
  peerLikes,
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

  return (
    <div className={`pt-4 border-t border-gray-100 ${className}`}>
      {/* Hashtags Section */}
      {showHashtags && hashtags.length > 0 && (
        <div className="mb-4">
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
                    <ChevronDown className="w-3 h-3 ml-1 rotate-180" />
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
        </div>
      )}

      {/* Peer Likes Section - Above main actions */}
      {peerLikes && peerLikes.count > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowPeerLikes(!showPeerLikes)}
            className="flex items-center text-sm text-gray-600 hover:text-zygo-red transition-colors group w-full justify-between"
          >
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{peerLikes.count} peer likes</span>
              <span className="text-gray-400 ml-1">from service providers</span>
            </div>
            <ChevronDown
              className={`w-3 h-3 transition-transform ${showPeerLikes ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Peer Likes Dropdown */}
          {showPeerLikes && peerLikes.likedBy.length > 0 && (
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
                        {peer.specializations.length > 2 &&
                          ` +${peer.specializations.length - 2} more`}
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
      )}

      {/* Main Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
            onClick={onLike}
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm">{formatStats(item.stats?.likes)}</span>
          </button>
          <button
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
            onClick={onComment}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{formatStats(item.stats?.comments)}</span>
          </button>
          <button
            className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
            onClick={onRepost}
          >
            <Repeat2 className="w-4 h-4" />
            <span className="text-sm">{formatStats(item.stats?.reposts)}</span>
          </button>
          <button
            className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
            onClick={onShare}
          >
            <Share className="w-4 h-4" />
            <span className="text-sm">{formatStats(item.stats?.shares)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

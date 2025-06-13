import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';
import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { formatStats } from './feedUtils';

interface FeedItemActionsProps {
  item: FeedItemTypeMap;
  className?: string;
  onLike?: () => void;
  onComment?: () => void;
  onRepost?: () => void;
  onShare?: () => void;
}

export const FeedItemActions: React.FC<FeedItemActionsProps> = ({
  item,
  className = '',
  onLike,
  onComment,
  onRepost,
  onShare,
}) => {
  return (
    <div className={`flex items-center justify-between pt-4 border-t border-gray-100 ${className}`}>
      <div className="flex items-center space-x-6">
        <button
          className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
          onClick={onLike}
        >
          <Heart className="w-4 h-4" />
          <span className="text-sm">{formatStats(item.stats.likes)}</span>
        </button>
        <button
          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
          onClick={onComment}
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{formatStats(item.stats.comments)}</span>
        </button>
        <button
          className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
          onClick={onRepost}
        >
          <Repeat2 className="w-4 h-4" />
          <span className="text-sm">{formatStats(item.stats.reposts)}</span>
        </button>
        <button
          className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
          onClick={onShare}
        >
          <Share className="w-4 h-4" />
          <span className="text-sm">{formatStats(item.stats.shares)}</span>
        </button>
      </div>
    </div>
  );
};

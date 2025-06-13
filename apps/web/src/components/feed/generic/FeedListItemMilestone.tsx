import { Button } from '@zygo/ui';
import { Calendar, Heart, MessageCircle, Repeat2, Share, Trophy } from 'lucide-react';
import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';

interface FeedListItemMilestoneProps {
  item: FeedItemTypeMap;
}

export const FeedListItemMilestone: React.FC<FeedListItemMilestoneProps> = ({ item }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatStats = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className="space-y-4">
      {/* Milestone Header with special styling */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="text-purple-700 font-semibold text-sm">MILESTONE</span>
          </div>
          <div className="flex items-center space-x-1 text-purple-600 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(item.metadata.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <img
            src={item.author.avatar}
            alt={item.author.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/48';
            }}
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">{item.author.name}</h3>
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
            </div>
            <p className="text-purple-700 text-sm font-medium">Achieved a milestone!</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {item.title && (
          <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
            <span>🎉</span>
            <span>{item.title}</span>
          </h2>
        )}
        {item.post && <p className="text-gray-800 leading-relaxed text-lg">{item.post}</p>}
        {item.description && <p className="text-gray-600">{item.description}</p>}
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title || 'Milestone image'}
            className="w-full rounded-lg object-cover max-h-96 border-2 border-yellow-200"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Celebration Banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
        <div className="flex items-center justify-center space-x-2 text-orange-600">
          <span className="text-lg">🎊</span>
          <span className="font-medium">Congratulations on this amazing milestone!</span>
          <span className="text-lg">🎊</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500 hover:text-red-500"
          >
            <Heart className="w-4 h-4" />
            <span>{formatStats(item.stats.likes)}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{formatStats(item.stats.comments)}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
          >
            <Repeat2 className="w-4 h-4" />
            <span>{formatStats(item.stats.reposts)}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-500 hover:text-purple-500"
          >
            <Share className="w-4 h-4" />
            <span>{formatStats(item.stats.shares)}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

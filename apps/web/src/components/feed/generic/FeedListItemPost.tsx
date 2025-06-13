import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemPostProps {
  item: FeedItemTypeMap;
}

export const FeedListItemPost: React.FC<FeedListItemPostProps> = ({ item }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <FeedItemHeader item={item} />

      {/* Content */}
      <div className="space-y-3">
        {item.title && <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>}
        {item.post && <p className="text-gray-800 leading-relaxed">{item.post}</p>}
        {item.description && <p className="text-gray-600">{item.description}</p>}
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title || 'Post image'}
            className="w-full rounded-lg object-cover max-h-96"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
      </div>

      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};

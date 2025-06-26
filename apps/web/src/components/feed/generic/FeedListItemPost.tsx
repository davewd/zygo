import DOMPurify from 'dompurify';
import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemPostProps {
  item: FeedItemTypeMap;
}

// Helper function to safely render HTML content
const createSafeMarkup = (html: string) => {
  return { __html: DOMPurify.sanitize(html) };
};

export const FeedListItemPost: React.FC<FeedListItemPostProps> = ({ item }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <FeedItemHeader item={item} />

      {/* Content */}
      <div className="space-y-3">
        {item.title && <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>}
        {item.post && (
          <div
            className="text-gray-800 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={createSafeMarkup(item.post)}
          />
        )}
        {item.description && (
          <div
            className="text-gray-600 prose max-w-none"
            dangerouslySetInnerHTML={createSafeMarkup(item.description)}
          />
        )}
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

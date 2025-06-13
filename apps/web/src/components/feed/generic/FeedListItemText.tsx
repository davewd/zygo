import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemTextProps {
  item: FeedItemTypeMap;
}

export const FeedListItemText: React.FC<FeedListItemTextProps> = ({ item }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <FeedItemHeader item={item} />

      {/* Content */}
      <div className="space-y-3">
        {item.title && <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>}
        <div className="prose prose-gray max-w-none">
          {item.description && (
            <p className="text-gray-800 leading-relaxed text-lg">{item.description}</p>
          )}
          {item.post && (
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{item.post}</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};

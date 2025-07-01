import { ExternalLink } from 'lucide-react';
import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemContext, FeedItemHeader, type ContextData } from '../shared';

interface FeedListItemLinkProps {
  item: FeedItemTypeMap & {
    context?: ContextData;
  };
}

export const FeedListItemLink: React.FC<FeedListItemLinkProps> = ({ item }) => {
  const handleLinkClick = () => {
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-4">
      {/* Context (if available) */}
      <FeedItemContext item={item} />

      {/* Separator line between context and header */}
      {item.context && <div className="border-t border-gray-200" />}

      {/* Header */}
      <FeedItemHeader item={item} />

      {/* Link Preview Card */}
      <div
        className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
        onClick={handleLinkClick}
      >
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.title || 'Link preview'}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        )}
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
              {item.description && (
                <p className="text-gray-600 text-sm mt-1 line-clamp-3">{item.description}</p>
              )}
              {item.domain && <p className="text-gray-400 text-xs mt-2">{item.domain}</p>}
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Post content if available */}
      {item.post && <p className="text-gray-800 leading-relaxed">{item.post}</p>}

      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};

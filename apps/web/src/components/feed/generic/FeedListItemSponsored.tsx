import { ExternalLink, ZoomIn } from 'lucide-react';
import React, { useState } from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemSponsoredProps {
  item: FeedItemTypeMap;
}

export const FeedListItemSponsored: React.FC<FeedListItemSponsoredProps> = ({ item }) => {
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const handleCTAClick = () => {
    if (item.sponsoredData?.ctaUrl) {
      window.open(item.sponsoredData.ctaUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <FeedItemHeader item={item} />

      {/* Content */}
      <div className="space-y-3">
        {item.title && <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>}
        {item.post && <p className="text-gray-800 leading-relaxed">{item.post}</p>}
        {item.description && <p className="text-gray-600">{item.description}</p>}
      </div>

      {/* Image */}
      {item.imageUrl && (
        <div className="relative group">
          <img
            src={item.imageUrl}
            alt={item.title || 'Sponsored content'}
            className={`w-full rounded-lg object-cover cursor-pointer transition-all duration-300 ${
              isImageExpanded ? 'max-h-none' : 'max-h-96'
            }`}
            onClick={() => setIsImageExpanded(!isImageExpanded)}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
            <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          {!isImageExpanded && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
              Click to expand
            </div>
          )}
        </div>
      )}

      {/* Call to Action */}
      {item.sponsoredData?.ctaText && item.sponsoredData?.ctaUrl && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
          <button
            onClick={handleCTAClick}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>{item.sponsoredData.ctaText}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};

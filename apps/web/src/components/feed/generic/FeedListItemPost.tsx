import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemPostProps {
  item: FeedItemTypeMap;
  peerLikes?: {
    count: number;
    likedBy: Array<{
      providerId: string;
      providerName: string;
      credentials: string[];
      specializations: string[];
      dateLiked: string;
    }>;
  };
  onHashtagClick?: (hashtag: string) => void;
}

// Helper function to safely render HTML content
const createSafeMarkup = (html: string) => {
  return { __html: DOMPurify.sanitize(html) };
};

// Helper function to truncate HTML content to approximately 200 characters
const truncateHtmlContent = (html: string, maxLength: number = 200): string => {
  // First, strip HTML tags to count actual text length
  const textContent = html.replace(/<[^>]*>/g, '');

  if (textContent.length <= maxLength) {
    return html;
  }

  // If we need to truncate, find a good breaking point
  let truncatedText = textContent.substring(0, maxLength);
  const lastSpaceIndex = truncatedText.lastIndexOf(' ');

  if (lastSpaceIndex > maxLength * 0.8) {
    truncatedText = truncatedText.substring(0, lastSpaceIndex);
  }

  // Try to preserve some basic HTML structure for the truncated content
  const paragraphMatch = html.match(/<p[^>]*>.*?<\/p>/i);
  if (paragraphMatch && paragraphMatch[0].replace(/<[^>]*>/g, '').length <= maxLength) {
    return paragraphMatch[0];
  }

  return `<p>${truncatedText}...</p>`;
};

export const FeedListItemPost: React.FC<FeedListItemPostProps> = ({
  item,
  peerLikes,
  onHashtagClick,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Determine if content needs truncation (use post content for length check)
  const fullContent = item.post || item.description || '';
  const textContent = fullContent.replace(/<[^>]*>/g, '');
  const needsTruncation = textContent.length > 200;
  const displayContent = expanded ? fullContent : truncateHtmlContent(fullContent, 200);

  return (
    <div className="space-y-4">
      {/* Header */}
      <FeedItemHeader item={item} />

      {/* Content */}
      <div className="space-y-3">
        {item.title && <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>}
        {(item.post || item.description) && (
          <div
            className="text-gray-800 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={createSafeMarkup(displayContent)}
          />
        )}

        {/* Show More/Less Button */}
        {needsTruncation && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 px-4 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-gray-700 transition-colors"
          >
            {expanded ? 'Show Less' : 'Show More'}
          </button>
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
      <FeedItemActions item={item} peerLikes={peerLikes} onHashtagClick={onHashtagClick} />
    </div>
  );
};

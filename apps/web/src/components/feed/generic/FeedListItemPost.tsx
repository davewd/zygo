import DOMPurify from 'dompurify';
import { BookOpen } from 'lucide-react';
import React, { useState } from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemPostProps {
  item: FeedItemTypeMap & {
    hasReferences?: boolean;
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
  };
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

// Helper function to extract references section from post content
const extractReferences = (content: string) => {
  const referencesRegex = /<h4>References & further resources:<\/h4>\s*<ol>(.*?)<\/ol>/s;
  const match = content.match(referencesRegex);

  if (!match) return null;

  // Extract individual list items
  const listItemsRegex = /<li>(.*?)<\/li>/gs;
  const items = [...match[1].matchAll(listItemsRegex)];

  return items.map((item) => item[1].trim());
};

// Helper function to remove references section from main content
const removeReferencesFromContent = (content: string) => {
  const referencesRegex = /<h4>References & further resources:<\/h4>\s*<ol>.*?<\/ol>/s;
  return content.replace(referencesRegex, '').trim();
};

// Helper function to make links in references clickable
const processReferenceLinks = (reference: string) => {
  // Find all URLs in the reference text and make them clickable
  const urlRegex = /(https?:\/\/[^\s<>"]+)/gi;
  return reference.replace(
    urlRegex,
    '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 underline">$1</a>'
  );
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
  const [showReferences, setShowReferences] = useState(false);

  // Extract references if they exist
  const references = item.hasReferences ? extractReferences(item.post || '') : null;
  const mainContent = item.hasReferences
    ? removeReferencesFromContent(item.post || '')
    : item.post || item.description || '';

  // Determine if content needs truncation (use main content for length check, excluding references)
  const textContent = mainContent.replace(/<[^>]*>/g, '');
  const needsTruncation = textContent.length > 200;
  const displayContent = expanded ? mainContent : truncateHtmlContent(mainContent, 200);

  return (
    <div className="space-y-4">
      {/* Header */}
      <FeedItemHeader item={item} />

      {/* Content */}
      <div className="space-y-3">
        {item.title && <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>}
        {displayContent && (
          <div
            className="text-gray-800 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={createSafeMarkup(displayContent)}
          />
        )}

        {/* Show More/Less Button for main content */}
        {needsTruncation && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-600 underline hover:text-gray-800 text-sm transition-colors"
          >
            {expanded ? 'Show less' : 'Show more'}
          </button>
        )}

        {/* References Section - Only show when content is expanded or if content doesn't need truncation */}
        {references && references.length > 0 && (expanded || !needsTruncation) && (
          <div className="mt-4">
            <button
              onClick={() => setShowReferences(!showReferences)}
              className="flex items-center space-x-2 text-gray-600 underline hover:text-gray-800 text-sm transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>{showReferences ? 'Hide references' : 'Show references'}</span>
            </button>

            {showReferences && (
              <div className="mt-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <h4 className="text-sm font-semibold text-amber-800">
                    References & Further Resources
                  </h4>
                </div>
                <ol className="space-y-2 text-sm text-amber-900">
                  {references.map((reference, index) => (
                    <li key={index} className="flex">
                      <span className="text-amber-600 font-medium mr-2 flex-shrink-0">
                        {index + 1}.
                      </span>
                      <div
                        className="flex-1"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(processReferenceLinks(reference)),
                        }}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
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

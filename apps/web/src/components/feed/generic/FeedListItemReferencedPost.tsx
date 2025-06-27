import DOMPurify from 'dompurify';
import { BookOpen } from 'lucide-react';
import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedListItemPost } from './FeedListItemPost';

interface FeedListItemReferencedPostProps {
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
  onHashtagClick?: (hashtag: string) => void;
}

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

export const FeedListItemReferencedPost: React.FC<FeedListItemReferencedPostProps> = ({
  item,
  onHashtagClick,
}) => {
  const references = item.hasReferences ? extractReferences(item.post || '') : null;
  const mainContent = item.hasReferences ? removeReferencesFromContent(item.post || '') : item.post;

  // Create modified item without references in the main content
  const modifiedItem = {
    ...item,
    post: mainContent,
  };

  return (
    <div className="space-y-4">
      {/* Render the standard post content (without references) */}
      <FeedListItemPost
        item={modifiedItem}
        peerLikes={item.peerLikes}
        onHashtagClick={onHashtagClick}
      />

      {/* References Card */}
      {references && references.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-semibold text-amber-800">References & Further Resources</h4>
          </div>
          <ol className="space-y-2 text-sm text-amber-900">
            {references.map((reference, index) => (
              <li key={index} className="flex">
                <span className="text-amber-600 font-medium mr-2 flex-shrink-0">{index + 1}.</span>
                <div
                  className="flex-1"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(reference) }}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

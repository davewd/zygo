import { Trophy } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemMilestoneProps {
  item: FeedItemTypeMap;
}

export const FeedListItemMilestone: React.FC<FeedListItemMilestoneProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // If we have a specific milestone ID, navigate to the milestone detail page
    if (item.milestoneId) {
      navigate(`/timeline/milestone/${item.milestoneId}`);
    } else {
      // Fallback to the timeline page if no specific milestone ID is available
      navigate('/timeline');
    }
  };

  return (
    <div>
      {/* Standard Header with milestone indicator as child */}
      <FeedItemHeader item={item}>
        <div className="flex items-center space-x-2 text-purple-600 text-sm font-medium">
          <Trophy className="w-4 h-4" />
          <span>Lily Achieved a milestone!</span>
        </div>
      </FeedItemHeader>

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
        <div
          className="space-y-4 cursor-pointer hover:bg-gray-50 p-4 rounded-lg transition-colors"
          onClick={handleClick}
        >
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src={item.author.avatar}
                    alt={item.author.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (img.src !== 'https://via.placeholder.com/48') {
                        img.src = 'https://via.placeholder.com/48';
                      }
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">Lily Dawson</h3>
                      {item.author.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-2.5 h-2.5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                      <span className="text-gray-500 text-sm">@{item.author.handle}.Lily</span>
                    </div>
                    <p className="text-purple-700 text-sm font-medium">First Steps !</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Milestone image display */}
            {item.imageUrl && (
              <div className="mt-3">
                <img
                  src={item.imageUrl}
                  alt={item.title || 'Milestone image'}
                  className="w-full rounded-lg object-cover max-h-96 border-2 border-purple-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};

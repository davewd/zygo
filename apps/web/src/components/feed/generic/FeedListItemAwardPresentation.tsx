import { Calendar, Clock, MapPin, Trophy } from 'lucide-react';
import React, { useState } from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemAwardPresentationProps {
  item: FeedItemTypeMap;
}

export const FeedListItemAwardPresentation: React.FC<FeedListItemAwardPresentationProps> = ({
  item,
}) => {
  // Extract award-specific data
  const awardData = item.awardData;
  const [expanded, setExpanded] = useState(false);

  if (!awardData) {
    // Fallback if no award data
    return null;
  }

  // Text truncation logic
  const postContent = item.post || '';
  const maxLength = 200;
  const needsTruncation = postContent.length > maxLength;
  const displayContent =
    needsTruncation && !expanded ? postContent.substring(0, maxLength) + '...' : postContent;

  return (
    <div className="space-y-4">
      {/* Header with milestone badge */}
      <FeedItemHeader item={item}>
        <div className="flex items-center space-x-2 text-blue-600 text-sm font-medium">
          <Trophy className="w-4 h-4" />
          <span>Lily received an Award</span>
        </div>
      </FeedItemHeader>

      {/* Content */}
      <div className="space-y-3">
        {item.title && <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>}
        {item.post && (
          <div>
            <p className="text-gray-800 leading-relaxed">{displayContent}</p>
            {needsTruncation && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-gray-600 underline hover:text-gray-800 text-sm transition-colors mt-2"
              >
                {expanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Award Information Section */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-3">
        <h3 className="font-semibold text-gray-900 mb-2">🏆 Award Details</h3>
        <div className="flex items-center space-x-3">
          {/* School Logo */}
          {awardData.school?.logo && (
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-white rounded-full border-2 border-yellow-300 flex items-center justify-center shadow-sm">
                <img
                  src={awardData.school.logo}
                  alt={`${awardData.school.name} Logo`}
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Award Details */}
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm mb-1">{awardData.awardType}</h4>
            <p className="text-gray-700 text-xs mb-1">
              <span className="font-medium">{awardData.recipient.name}</span>
              {awardData.recipient.grade && ` (${awardData.recipient.grade})`} will be receiving
              this award from <span className="font-medium">{awardData.presenter.name}</span>
              {awardData.presenter.title && ` (${awardData.presenter.title})`}
            </p>

            {/* Recognition */}
            {awardData.achievements && awardData.achievements.length > 0 && (
              <div className="mb-2">
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  {awardData.achievements[0]}
                </span>
              </div>
            )}

            <div className="flex items-center space-x-1">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                {awardData.school?.name || 'School Event'}
              </span>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                Award Ceremony
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Information Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">📅 Bronte Weekly Assembly</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-gray-600">at</span>
            <a
              href="/services/bronte-public-school"
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              {awardData.school?.name || 'Bronte Public School'}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="font-medium text-gray-900">{awardData.presentationDate}</span>
            {awardData.presentationTime && (
              <>
                <Clock className="w-4 h-4 text-purple-600 ml-2" />
                <span className="font-medium text-gray-900">{awardData.presentationTime}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};

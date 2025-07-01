import { Badge, Calendar, MapPin, Users } from 'lucide-react';
import React, { useState } from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemHeader } from '../shared';

interface FeedListItemEventFollowUpProps {
  item: FeedItemTypeMap;
}

export const FeedListItemEventFollowUp: React.FC<FeedListItemEventFollowUpProps> = ({ item }) => {
  const [expandedPhotos, setExpandedPhotos] = useState<{ [key: number]: boolean }>({});

  const eventFollowUpData = item.eventFollowUpData;

  if (!eventFollowUpData) {
    return null;
  }

  const togglePhotoExpand = (index: number) => {
    setExpandedPhotos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const eventHeader = (
    <div>
      <FeedItemHeader item={item} />

      {/* Event Follow-up Header with Icon */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mt-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-green-700 font-semibold text-sm">EVENT FOLLOW-UP</span>
          </div>
          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">
            {eventFollowUpData.serviceNetwork?.name || 'Community Event'}
          </div>
        </div>

        {item.title && <h2 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h2>}
        {item.post && <p className="text-gray-800 leading-relaxed">{item.post}</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <FeedItemHeader item={item} customHeader={eventHeader} />

      {/* Badge Section */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Badge className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{eventFollowUpData.badge.text}</h3>
            {eventFollowUpData.badge.details && (
              <p className="text-sm text-gray-600">{eventFollowUpData.badge.details}</p>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-gray-700">
              {eventFollowUpData.eventDate}
              {eventFollowUpData.eventTime && ` at ${eventFollowUpData.eventTime}`}
            </span>
          </div>

          {eventFollowUpData.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-700">{eventFollowUpData.location}</span>
            </div>
          )}

          {eventFollowUpData.score && (
            <div className="flex items-center space-x-2">
              <Badge className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-700 font-medium">
                Score: {eventFollowUpData.score}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Photo Grid Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-4 h-4 mr-2 text-gray-600" />
          Photos from The Match ({eventFollowUpData.photos.length})
        </h4>

        <div className="grid grid-cols-2 gap-4">
          {eventFollowUpData.photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={photo.url}
                alt={photo.caption || `Match photo ${index + 1}`}
                className={`w-full rounded-lg object-cover cursor-pointer transition-all duration-300 ${
                  expandedPhotos[index] ? 'max-h-none' : 'h-48'
                }`}
                onClick={() => togglePhotoExpand(index)}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Photo overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white text-xs bg-black bg-opacity-60 px-2 py-1 rounded">
                  Click to {expandedPhotos[index] ? 'collapse' : 'expand'}
                </div>
              </div>

              {/* Photo caption */}
              {photo.caption && (
                <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-60 text-white text-xs p-2 rounded">
                  {photo.caption}
                  {photo.sharedBy && (
                    <div className="text-xs opacity-75 mt-1">Shared by {photo.sharedBy}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};

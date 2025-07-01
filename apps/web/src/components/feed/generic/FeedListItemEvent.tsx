import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedItemActions, FeedItemContext, FeedItemHeader, type ContextData } from '../shared';

interface FeedListItemEventProps {
  item: FeedItemTypeMap & {
    context?: ContextData;
  };
}

export const FeedListItemEvent: React.FC<FeedListItemEventProps> = ({ item }) => {
  // Extract event-specific data (could be extended in the future)
  const eventData = item.eventData || {
    date: '2025-06-20',
    time: '10:00 AM',
    location: 'Bronte Public School Assembly Hall',
    attendees: 1,
  };

  const eventHeader = (
    <div>
      {/* Context (if available) */}
      <FeedItemContext item={item} />

      {/* Separator line between context and header */}
      {item.context && <div className="border-t border-gray-200 mb-4" />}

      <FeedItemHeader item={item} />

      {/* Event Header with Icon */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mt-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="text-blue-700 font-semibold text-sm">UPCOMING EVENT</span>
          </div>
          <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded">Private Event</div>
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

      {/* Event Details Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="space-y-4">
          {/* Event Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold text-gray-900">{eventData.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold text-gray-900">{eventData.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold text-gray-900">{eventData.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Attending</p>
                <p className="font-semibold text-gray-900">{eventData.attendees} person</p>
              </div>
            </div>
          </div>

          {/* School Logo and Award Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              {/* Bronte Public School Logo */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-white rounded-full border-2 border-yellow-300 flex items-center justify-center shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=64&h=64&fit=crop&crop=center"
                    alt="Bronte Public School Logo"
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      // Fallback to a generic school icon if image fails to load
                      e.currentTarget.style.display = 'none';
                      const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                      if (nextElement) {
                        nextElement.style.display = 'flex';
                      }
                    }}
                  />
                  <div
                    className="w-12 h-12 bg-blue-500 rounded-full hidden items-center justify-center text-white font-bold text-lg"
                    style={{ display: 'none' }}
                  >
                    BPS
                  </div>
                </div>
              </div>

              {/* Award Information */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">🎉 Award Ceremony</h3>
                <p className="text-gray-700 text-sm mb-2">
                  <span className="font-medium">@Lily</span> will be receiving an award at the
                  school assembly
                </p>
                <div className="flex items-center space-x-2">
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                    Bronte Public School
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                    School Assembly
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Event Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>📍 Add to Calendar</span>
              <span>🔗 Share Event</span>
              <span>📝 Add Note</span>
            </div>
            <div className="text-sm text-gray-500">Private event • Only you can see this</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <FeedItemActions item={item} />
    </div>
  );
};

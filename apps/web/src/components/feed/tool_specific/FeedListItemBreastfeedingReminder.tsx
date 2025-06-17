import { Baby, Clock, ExternalLink } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { DismissReminderButton, FeedItemHeader } from '../shared';

interface FeedListItemBreastfeedingReminderProps {
  item: FeedItemTypeMap;
}

export const FeedListItemBreastfeedingReminder: React.FC<
  FeedListItemBreastfeedingReminderProps
> = ({ item }) => {
  const breastfeedingHeader = (
    <div>
      <FeedItemHeader item={item}>
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
            <Clock className="w-3 h-3 text-white" />
          </div>
          <span className="text-amber-700 font-semibold text-xs">REMINDER</span>
        </div>
      </FeedItemHeader>
    </div>
  );

  return (
    <div className="space-y-3">
      {/* Header */}
      <FeedItemHeader item={item} customHeader={breastfeedingHeader} />

      {/* Reminder Content - Half Size */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center space-x-4">
          {/* Icon and Message */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
              <Baby className="w-6 h-6 text-pink-600" />
            </div>
          </div>

          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Time for a feed?</h4>
            <p className="text-gray-600 text-sm mb-3">
              {item.post && <p className="text-gray-700 text-sm leading-relaxed">{item.post}</p>}
            </p>

            <Link to="/tools/postnatal/breastfeeding-timer">
              <button className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 h-auto rounded-md inline-flex items-center justify-center gap-2 font-medium transition-colors">
                <Clock className="w-4 h-4" />
                Start Breastfeeding Timer
                <ExternalLink className="w-3 h-3" />
              </button>
            </Link>
          </div>
        </div>

        {/* Quick Stats or Tips */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>💡 Tip: Regular tracking can help prevent Mastitus</span>
          </div>
        </div>
      </div>
      {/* Dismiss Reminder Button */}
      <DismissReminderButton item={item} className="mt-2" />
    </div>
  );
};

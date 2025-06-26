import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { DismissReminderButton, FeedItemHeader } from '../shared';

interface ReminderAction {
  label: string;
  url: string;
  icon: LucideIcon;
  className?: string;
}

interface ReminderConfig {
  type: string;
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  icon: LucideIcon;
  iconBackgroundColor: string;
  iconColor: string;
  title: string;
  description?: string;
  action?: ReminderAction;
  tip?: string;
}

interface FeedListItemReminderProps {
  item: FeedItemTypeMap;
  config: ReminderConfig;
}

export const FeedListItemReminder: React.FC<FeedListItemReminderProps> = ({ item, config }) => {
  const reminderHeader = (
    <div>
      <FeedItemHeader item={item}>
        <div className="flex items-center space-x-2 mb-2">
          <div
            className={`w-6 h-6 ${config.iconBackgroundColor} rounded-full flex items-center justify-center`}
          >
            <config.icon className={`w-3 h-3 ${config.iconColor}`} />
          </div>
          <span className={`${config.textColor} font-semibold text-xs`}>REMINDER</span>
        </div>
      </FeedItemHeader>
    </div>
  );

  return (
    <div className="space-y-3">
      {/* Header */}
      <FeedItemHeader item={item} customHeader={reminderHeader} />

      {/* Reminder Content */}
      <div className={`bg-white border ${config.borderColor} rounded-lg p-4`}>
        <div className="flex items-center space-x-4">
          {/* Icon and Message */}
          <div className="flex-shrink-0">
            <div
              className={`w-12 h-12 ${config.backgroundColor} rounded-full flex items-center justify-center`}
            >
              <config.icon className={`w-6 h-6 ${config.textColor}`} />
            </div>
          </div>

          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">{config.title}</h4>
            <div className="text-gray-600 text-sm mb-3">
              {config.description && <p className="mb-2">{config.description}</p>}
              {item.post && <p className="text-gray-700 text-sm leading-relaxed">{item.post}</p>}
            </div>

            {config.action && (
              <Link to={config.action.url}>
                <button
                  className={`text-white text-sm px-4 py-2 h-auto rounded-md inline-flex items-center justify-center gap-2 font-medium transition-colors ${
                    config.action.className || 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  <config.action.icon className="w-4 h-4" />
                  {config.action.label}
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        {config.tip && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>💡 Tip: {config.tip}</span>
            </div>
          </div>
        )}
      </div>

      {/* Dismiss Reminder Button */}
      <DismissReminderButton item={item} className="mt-2" />
    </div>
  );
};

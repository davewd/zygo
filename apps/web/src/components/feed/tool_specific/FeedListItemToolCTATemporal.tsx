import { Activity, CalendarDays, LucideIcon, Sun } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FeedItemTypeMap } from '../../../lib/api/feed';

// Icon mapping for converting string names to actual icons
const iconMap: Record<string, LucideIcon> = {
  Sun,
  CalendarDays,
  Activity,
};

interface FeedListItemToolCTATemporalProps {
  item: FeedItemTypeMap & {
    toolCTATemporalData?: {
      backgroundGradient: string;
      borderColor: string;
      icon: string;
      iconColor: string;
      headerText: string;
      description: string;
      actions: Array<{
        label: string;
        url: string;
        icon: string;
        isPrimary?: boolean;
      }>;
    };
  };
}

export const FeedListItemToolCTATemporal: React.FC<FeedListItemToolCTATemporalProps> = ({
  item,
}) => {
  const { toolCTATemporalData } = item;

  console.log('FeedListItemToolCTATemporal - item:', item);
  console.log('FeedListItemToolCTATemporal - toolCTATemporalData:', toolCTATemporalData);

  if (!toolCTATemporalData) {
    console.log('No toolCTATemporalData found, returning null');
    return null;
  }

  const HeaderIcon = iconMap[toolCTATemporalData.icon] || Sun;

  return (
    <div
      className={`${toolCTATemporalData.backgroundGradient} ${toolCTATemporalData.borderColor} border-0 rounded-lg p-8 text-center`}
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center justify-center">
        <HeaderIcon className={`w-6 h-6 mr-2 ${toolCTATemporalData.iconColor}`} />
        {toolCTATemporalData.headerText}
      </h3>
      <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto mb-6">
        {toolCTATemporalData.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {toolCTATemporalData.actions.map((action, index) => {
          const ActionIcon = iconMap[action.icon] || Activity;
          return (
            <Link key={index} to={action.url}>
              <button
                className={`px-6 py-3 rounded-lg flex items-center ${
                  action.isPrimary
                    ? 'bg-zygo-red hover:bg-zygo-red/90 text-white'
                    : 'border border-zygo-red text-zygo-red hover:bg-zygo-red hover:text-white'
                }`}
              >
                <ActionIcon className="w-4 h-4 mr-2" />
                {action.label}
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

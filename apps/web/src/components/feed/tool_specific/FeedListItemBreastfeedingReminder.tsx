import { Baby, Clock } from 'lucide-react';
import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedListItemReminder } from '../generic/FeedListItemReminder';

interface FeedListItemBreastfeedingReminderProps {
  item: FeedItemTypeMap;
}

export const FeedListItemBreastfeedingReminder: React.FC<
  FeedListItemBreastfeedingReminderProps
> = ({ item }) => {
  const breastfeedingConfig = {
    type: 'breastfeeding',
    backgroundColor: 'bg-gradient-to-r from-pink-100 to-purple-100',
    borderColor: 'border-gray-200',
    textColor: 'text-pink-600',
    icon: Baby,
    iconBackgroundColor: 'bg-amber-500',
    iconColor: 'text-white',
    title: 'Time for a feed?',
    action: {
      label: 'Start Breastfeeding Timer',
      url: '/tools/postnatal/breastfeeding-timer',
      icon: Clock,
      className: 'bg-pink-500 hover:bg-pink-600',
    },
    tip: 'Regular tracking can help prevent Mastitus',
  };

  return <FeedListItemReminder item={item} config={breastfeedingConfig} />;
};

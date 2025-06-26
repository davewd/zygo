import { Book, ExternalLink } from 'lucide-react';
import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';
import { FeedListItemReminder } from '../generic/FeedListItemReminder';

interface FeedListItemLibraryBookReminderProps {
  item: FeedItemTypeMap;
}

export const FeedListItemLibraryBookReminder: React.FC<FeedListItemLibraryBookReminderProps> = ({
  item,
}) => {
  const libraryBookConfig = {
    type: 'library_book',
    backgroundColor: 'bg-gradient-to-r from-blue-100 to-indigo-100',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    icon: Book,
    iconBackgroundColor: 'bg-blue-500',
    iconColor: 'text-white',
    title: 'Library Book Due Soon',
    description: "Don't forget to return your library books on time to avoid late fees.",
    action: {
      label: 'View Library Account',
      url: '/services/library',
      icon: ExternalLink,
      className: 'bg-blue-500 hover:bg-blue-600',
    },
    tip: 'You can usually renew books online if no one else has reserved them',
  };

  return <FeedListItemReminder item={item} config={libraryBookConfig} />;
};

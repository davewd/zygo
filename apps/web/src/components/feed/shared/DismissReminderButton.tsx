import { X } from 'lucide-react';
import React from 'react';
import { FeedItemTypeMap } from '../../../lib/api/feed';

interface DismissReminderButtonProps {
  item: FeedItemTypeMap;
  onDismiss?: (itemId: string) => void;
  className?: string;
}

export const DismissReminderButton: React.FC<DismissReminderButtonProps> = ({
  item,
  onDismiss,
  className = '',
}) => {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss(item.id);
    }
    // You can add additional dismiss logic here
    // For example, marking the reminder as dismissed in the backend
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleDismiss}
        className={`bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 h-auto rounded-md inline-flex items-center justify-center gap-2 font-medium transition-colors ${className}`}
      >
        <X className="w-4 h-4" />
        Dismiss Reminder
      </button>
    </div>
  );
};

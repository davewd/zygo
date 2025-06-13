import React, { memo } from 'react';
import { FeedItemType, FeedItemTypeMap } from '../../lib/api/feed';
import { FeedListItemImage } from './generic/FeedListItemImage';
import { FeedListItemLink } from './generic/FeedListItemLink';
import { FeedListItemMilestone } from './generic/FeedListItemMilestone';
import { FeedListItemPost } from './generic/FeedListItemPost';
import { FeedListItemText } from './generic/FeedListItemText';
import { FeedListItemToolBreastFeeding } from './tool_specific/FeedListItemToolBreastFeeding';

interface FeedListItemProps {
  item: FeedItemTypeMap;
  className?: string;
}

// Base polymorphic FeedListItem component that renders different types
const FeedListItem: React.FC<FeedListItemProps> = ({ item, className }) => {
  const renderContent = () => {
    switch (item.type) {
      case FeedItemType.POST:
        return <FeedListItemPost item={item} />;
      case FeedItemType.LINK:
        return <FeedListItemLink item={item} />;
      case FeedItemType.IMAGE:
        return <FeedListItemImage item={item} />;
      case FeedItemType.MILESTONE:
        return <FeedListItemMilestone item={item} />;
      case FeedItemType.TEXT:
        return <FeedListItemText item={item} />;
      case FeedItemType.BREASTFEEDING_TOOL:
        return <FeedListItemToolBreastFeeding item={item} />;
      case FeedItemType.VIDEO:
        return <FeedListItemPost item={item} />; // Fallback to post for now
      case FeedItemType.POLL:
        return <FeedListItemPost item={item} />; // Fallback to post for now
      default:
        return <FeedListItemPost item={item} />; // Default fallback
    }
  };

  return (
    <div
      className={`p-4 hover:shadow-md transition-shadow duration-200 rounded-lg border bg-card text-card-foreground shadow-sm ${
        className || ''
      }`}
    >
      {renderContent()}
    </div>
  );
};

export default memo(
  FeedListItem,
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
);

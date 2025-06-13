import { Card } from '@zygo/ui';
import React, { memo } from 'react';
import { FeedItemType, FeedItemTypeMap } from '../../lib/api/feed';
import { FeedListItemImage } from './FeedListItemImage';
import { FeedListItemLink } from './FeedListItemLink';
import { FeedListItemMilestone } from './FeedListItemMilestone';
import { FeedListItemPost } from './FeedListItemPost';
import { FeedListItemText } from './FeedListItemText';

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
      case FeedItemType.VIDEO:
        return <FeedListItemPost item={item} />; // Fallback to post for now
      case FeedItemType.POLL:
        return <FeedListItemPost item={item} />; // Fallback to post for now
      default:
        return <FeedListItemPost item={item} />; // Default fallback
    }
  };

  return (
    <Card className={`p-4 hover:shadow-md transition-shadow duration-200 ${className || ''}`}>
      {renderContent()}
    </Card>
  );
};

export default memo(
  FeedListItem,
  (prevProps, nextProps) => prevProps.item.id === nextProps.item.id
);

import React, { memo } from 'react';
import { FeedItemType, FeedItemTypeMap } from '../../lib/api/feed';
import { FeedListItemEvent } from './generic/FeedListItemEvent';
import { FeedListItemImage } from './generic/FeedListItemImage';
import { FeedListItemLink } from './generic/FeedListItemLink';
import { FeedListItemMilestone } from './generic/FeedListItemMilestone';
import { FeedListItemPost } from './generic/FeedListItemPost';
import { FeedListItemReferencedPost } from './generic/FeedListItemReferencedPost';
import { FeedListItemSponsored } from './generic/FeedListItemSponsored';
import { FeedListItemText } from './generic/FeedListItemText';
import { FeedListItemBreastfeedingDaily } from './tool_specific/FeedListItemBreastfeedingDaily';
import { FeedListItemBreastfeedingReminder } from './tool_specific/FeedListItemBreastfeedingReminder';
import { FeedListItemBreastfeedingWeekly } from './tool_specific/FeedListItemBreastfeedingWeekly';
import { FeedListItemLibraryBookReminder } from './tool_specific/FeedListItemLibraryBookReminder';

interface FeedListItemProps {
  item: FeedItemTypeMap;
  className?: string;
  onHashtagClick?: (hashtag: string) => void;
  peerLikes?: {
    count: number;
    likedBy: Array<{
      providerId: string;
      providerName: string;
      credentials: string[];
      specializations: string[];
      dateLiked: string;
    }>;
  };
}

// Base polymorphic FeedListItem component that renders different types
const FeedListItem: React.FC<FeedListItemProps> = ({
  item,
  className,
  peerLikes,
  onHashtagClick,
}) => {
  const renderContent = () => {
    switch (item.type) {
      case FeedItemType.POST:
        // Check if this post has references
        if ((item as any).hasReferences) {
          return <FeedListItemReferencedPost item={item as any} onHashtagClick={onHashtagClick} />;
        }
        return (
          <FeedListItemPost item={item} peerLikes={peerLikes} onHashtagClick={onHashtagClick} />
        );
      case FeedItemType.LINK:
        return <FeedListItemLink item={item} />;
      case FeedItemType.IMAGE:
        return <FeedListItemImage item={item} />;
      case FeedItemType.MILESTONE:
        return <FeedListItemMilestone item={item} />;
      case FeedItemType.TEXT:
        return <FeedListItemText item={item} />;
      case FeedItemType.BREASTFEEDING_DAILY_SUMMARY:
        return <FeedListItemBreastfeedingDaily item={item} />;
      case FeedItemType.BREASTFEEDING_WEEKLY_SUMMARY:
        return <FeedListItemBreastfeedingWeekly item={item} />;
      case FeedItemType.BREASTFEEDING_REMINDER:
        return <FeedListItemBreastfeedingReminder item={item} />;
      case FeedItemType.LIBRARY_BOOK_REMINDER:
        return <FeedListItemLibraryBookReminder item={item} />;
      case FeedItemType.SPONSORED:
        return <FeedListItemSponsored item={item} />;
      case FeedItemType.EVENT:
        return <FeedListItemEvent item={item} />;
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

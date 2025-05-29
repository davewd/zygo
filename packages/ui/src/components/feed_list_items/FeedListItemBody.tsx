import { FeedItem, FeedItemType } from "@zygo/types/feed";
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FeedListItemBody_Image } from './FeedListItemBody_Image';
import { FeedListItemBody_Link } from './FeedListItemBody_Link';
import { FeedListItemBody_Text } from './FeedListItemBody_Text';
import { FeedListItemBody_Video } from './FeedListItemBody_Video';

interface FeedListItemBodyProps {
  item: FeedItem;
}

export const FeedListItemBody: React.FC<FeedListItemBodyProps> = ({ item }) => {
  const renderContent = () => {
    switch (item.type) {
      case FeedItemType.LINK:
        return <FeedListItemBody_Link {...item} />;
      case FeedItemType.TEXT:
        return <FeedListItemBody_Text {...item} />;
      case FeedItemType.IMAGE:
        return <FeedListItemBody_Image {...item} />;
      case FeedItemType.VIDEO:
        return <FeedListItemBody_Video {...item} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
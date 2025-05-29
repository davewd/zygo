import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { FeedItem } from '../../packages/types/feed';
import { FeedListItemActions } from './FeedListItemActions';
import { FeedListItemBody } from './FeedListItemBody';
import { FeedListItemComments } from './FeedListItemComments';
import { FeedListItemHeader } from './FeedListItemHeader';
import { FeedListItemPost } from './FeedListItemPost';
import { FeedListItemStats } from './FeedListItemStats';

interface FeedListItemProps {
  feedItem: FeedItem;
}

const FeedListItem: React.FC<FeedListItemProps> = ({ feedItem }) => {
  console.log('Re-rendering: ', feedItem);
  return (
    <View style={styles.container}>
      <FeedListItemHeader item={feedItem} />
      <FeedListItemPost item={feedItem} />
      <FeedListItemBody item={feedItem} />
      <FeedListItemStats comments={feedItem.stats.comments} shares={feedItem.stats.shares} likes={feedItem.stats.likes} />
      <FeedListItemActions item={feedItem} />
      <FeedListItemComments item={feedItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
  },
  name: {
    height: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'darkslategrey',
    alignSelf: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default memo(
  FeedListItem,
  (prevProps, nextProps) => prevProps.feedItem.id === nextProps.feedItem.id
);
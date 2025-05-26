import { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FeedItem } from './types';

type FeedListItemType = {
  feedItem: FeedItem;
};

const FeedListItem = ({ feedItem }) => {
  console.log('Re-rendering: ', feedItem);
  return (
    <View style={styles.container}>
          <Text style={styles.name}>{feedItem.title}</Text>
          <Text style={styles.name}>{feedItem.name}</Text>
      <Image source={{ uri: feedItem.image }} style={styles.image} />
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
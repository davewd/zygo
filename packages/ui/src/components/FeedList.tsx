import { useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { FeedItem } from '@zygo/types/feed';
import results_data from '../data/list.json';
import FeedListItem from './feed_list_items/FeedListItem';

const FeedList = () => {
  useEffect(() => {
    console.log('Feed Data on mount:', results_data);
  }, []);

  const renderItem: ListRenderItem<FeedItem> = ({ item }) => <FeedListItem feedItem={item} />;

  return (
    <FlatList<FeedItem>
      data={results_data.results}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 10 }}
    />
  );
};

export default FeedList;

import { FeedItem, FeedItemType } from '@zygo/types/feed';
import { useEffect } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import results_data from './data/list.json';
import FeedListItem from './feed_list_items/FeedListItem';

const FeedList = () => {
  // Validate and transform the data to ensure it matches FeedItem type
  const transformedData: FeedItem[] = results_data.results.map((item) => ({
    ...item,
    type: item.type as FeedItemType, // This ensures type safety for the defined types
  }));

  useEffect(() => {
    console.log('Feed Data on mount:', transformedData);
  }, []);

  const renderItem: ListRenderItem<FeedItem> = ({ item }) => <FeedListItem feedItem={item} />;

  return (
    <FlatList<FeedItem>
      data={transformedData}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 10 }}
    />
  );
};

export default FeedList;

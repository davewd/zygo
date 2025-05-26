import { useEffect } from "react";
import { FlatList } from "react-native";
import results_data from "../data/list.json";
import FeedListItem from "./FeedListItem";



const FeedList = () => {
  useEffect(() => {
    console.log("Feed Data on mount:", results_data);
  }, []);

  const renderItem = ({ item }) => <FeedListItem feedItem={item} />;
  return (
    <FlatList
      data={results_data.results}
      renderItem={renderItem}
      contentContainerStyle={{ gap: 10 }}
    />
  );
};

export default FeedList;

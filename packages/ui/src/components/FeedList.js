import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { FlatList } from "react-native";
import results_data from "../data/list.json";
import FeedListItem from "./feed_list_items/FeedListItem";
const FeedList = () => {
    useEffect(() => {
        console.log("Feed Data on mount:", results_data);
    }, []);
    const renderItem = ({ item }) => _jsx(FeedListItem, { feedItem: item });
    return (_jsx(FlatList, { data: results_data.results, renderItem: renderItem, contentContainerStyle: { gap: 10 } }));
};
export default FeedList;

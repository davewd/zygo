import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { FeedListItemActions } from './FeedListItemActions';
import { FeedListItemBody } from './FeedListItemBody';
import { FeedListItemComments } from './FeedListItemComments';
import { FeedListItemHeader } from './FeedListItemHeader';
import { FeedListItemPost } from './FeedListItemPost';
import { FeedListItemStats } from './FeedListItemStats';
const FeedListItem = ({ feedItem }) => {
    console.log('Re-rendering: ', feedItem);
    return (_jsxs(View, { style: styles.container, children: [_jsx(FeedListItemHeader, { item: feedItem }), _jsx(FeedListItemPost, { item: feedItem }), _jsx(FeedListItemBody, { item: feedItem }), _jsx(FeedListItemStats, { comments: feedItem.stats.comments, shares: feedItem.stats.shares, likes: feedItem.stats.likes }), _jsx(FeedListItemActions, { item: feedItem }), _jsx(FeedListItemComments, { item: feedItem })] }));
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
export default memo(FeedListItem, (prevProps, nextProps) => prevProps.feedItem.id === nextProps.feedItem.id);

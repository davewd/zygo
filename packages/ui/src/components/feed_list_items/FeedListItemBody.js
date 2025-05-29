import { jsx as _jsx } from "react/jsx-runtime";
import { FeedItemType } from '@/packages/types/src/feed';
import { StyleSheet, View } from 'react-native';
import { FeedListItemBody_Image } from './FeedListItemBody_Image';
import { FeedListItemBody_Link } from './FeedListItemBody_Link';
import { FeedListItemBody_Text } from './FeedListItemBody_Text';
import { FeedListItemBody_Video } from './FeedListItemBody_Video';
export const FeedListItemBody = ({ item }) => {
    const renderContent = () => {
        switch (item.type) {
            case FeedItemType.LINK:
                return _jsx(FeedListItemBody_Link, Object.assign({}, item));
            case FeedItemType.TEXT:
                return _jsx(FeedListItemBody_Text, Object.assign({}, item));
            case FeedItemType.IMAGE:
                return _jsx(FeedListItemBody_Image, Object.assign({}, item));
            case FeedItemType.VIDEO:
                return _jsx(FeedListItemBody_Video, Object.assign({}, item));
            default:
                return null;
        }
    };
    return (_jsx(View, { style: styles.container, children: renderContent() }));
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

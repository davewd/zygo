import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
export const FeedListItemPost = ({ item }) => {
    return (_jsxs(ThemedView, { style: styles.container, children: [_jsxs(View, { style: styles.headerRow, children: [_jsx(Image, { source: { uri: item.author.avatar }, style: styles.avatar }), _jsxs(View, { style: styles.authorInfo, children: [_jsxs(View, { style: styles.nameRow, children: [_jsx(ThemedText, { type: "defaultBold", children: item.author.name }), item.author.verified && (_jsx(Image, { source: require('../../assets/images/verified.png'), style: styles.verifiedBadge })), _jsxs(ThemedText, { style: styles.handle, children: ["@", item.author.handle] }), _jsx(ThemedText, { style: styles.timestamp, children: item.metadata.createdAt })] }), _jsx(ThemedText, { children: item.post })] })] }), _jsxs(View, { style: styles.actions, children: [_jsx(Pressable, { style: styles.actionButton, children: _jsx(ThemedText, { children: item.stats.comments }) }), _jsx(Pressable, { style: styles.actionButton, children: _jsx(ThemedText, { children: item.stats.reposts }) }), _jsx(Pressable, { style: styles.actionButton, children: _jsx(ThemedText, { children: item.stats.likes }) }), _jsx(Pressable, { style: styles.actionButton, children: _jsx(ThemedText, { children: "Share" }) })] })] }));
};
const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e8ed',
    },
    headerRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    authorInfo: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 4,
    },
    verifiedBadge: {
        width: 16,
        height: 16,
    },
    handle: {
        color: '#536471',
    },
    timestamp: {
        color: '#536471',
        marginLeft: 'auto',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
});

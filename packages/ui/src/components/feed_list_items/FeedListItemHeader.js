import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
export const FeedListItemHeader = ({ item }) => {
    return (_jsxs(View, { style: styles.container, children: [_jsx(ThemedText, { type: "subtitle", style: styles.title, children: item.title }), _jsx(View, { style: styles.line })] }));
};
const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    title: {
        marginBottom: 8,
    },
    line: {
        height: 1,
        backgroundColor: '#E5E7EB',
        width: '100%',
    },
});

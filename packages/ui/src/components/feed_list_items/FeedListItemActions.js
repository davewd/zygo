import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
export const FeedListItemActions = ({ item }) => {
    return (_jsx(View, { style: styles.container, children: _jsxs(ThemedText, { children: ["Actions for item ", item.id] }) }));
};
const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
});

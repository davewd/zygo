import { jsx as _jsx } from "react/jsx-runtime";
import FeedList from '@zygo/ui/FeedList';
import { ThemedView } from '@zygo/ui/ThemedView';
import { StyleSheet } from 'react-native';
export default function PostScreen() {
    return (_jsx(ThemedView, { style: styles.container, children: _jsx(FeedList, {}) }));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

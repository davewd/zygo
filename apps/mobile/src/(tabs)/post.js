import { jsx as _jsx } from "react/jsx-runtime";
import { ThemedText } from '@zygo/ui/ThemedText';
import { ThemedView } from '@zygo/ui/ThemedView';
import { StyleSheet } from 'react-native';
export default function PostScreen() {
    return (_jsx(ThemedView, { style: styles.container, children: _jsx(ThemedText, { type: "title", children: "Post" }) }));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

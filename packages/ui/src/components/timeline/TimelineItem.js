import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
export const TimelineItem = ({ title, description, timestamp, image, children, isLast = false }) => {
    return (_jsxs(View, { style: styles.container, children: [_jsxs(View, { style: styles.timelineLeft, children: [_jsx(View, { style: styles.dot }), !isLast && _jsx(View, { style: styles.line })] }), _jsxs(View, { style: styles.content, children: [_jsx(ThemedText, { type: "subtitle", children: title }), _jsx(ThemedText, { type: "body", children: description }), _jsx(ThemedText, { type: "caption", children: timestamp }), image && (_jsx(Image, { source: { uri: image }, style: styles.image, resizeMode: "cover" })), children && _jsx(View, { style: styles.childrenContainer, children: children })] })] }));
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    timelineLeft: {
        alignItems: 'center',
        marginRight: 12,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#6B7280',
    },
    line: {
        width: 2,
        flex: 1,
        backgroundColor: '#E5E7EB',
        marginTop: 4,
    },
    content: {
        flex: 1,
        paddingBottom: 16,
    },
    childrenContainer: {
        marginTop: 8,
        paddingLeft: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 8,
    },
});

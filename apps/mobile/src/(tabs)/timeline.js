import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import timelineData from '@/data/timeline.json';
import { ThemedText } from '@zygo/ui/ThemedText';
import { ThemedView } from '@zygo/ui/ThemedView';
import { TimelineItem } from '@zygo/ui/timeline/TimelineItem';
import { format, parseISO } from 'date-fns';
import { ScrollView, StyleSheet } from 'react-native';
const renderTimelineEvent = (event, isLast = false) => {
    const formattedDate = format(parseISO(event.date), 'MMM d, yyyy');
    return (_jsx(TimelineItem, { title: event.title, description: event.description, timestamp: formattedDate, image: event.image, isLast: isLast, children: event.children.map((child, index) => renderTimelineEvent(child, index === event.children.length - 1)) }, event.id));
};
export default function TimelineScreen() {
    return (_jsxs(ThemedView, { style: styles.container, children: [_jsx(ThemedText, { type: "title", style: styles.header, children: "Timeline" }), _jsx(ScrollView, { style: styles.scrollView, children: timelineData.results.map((event, index) => renderTimelineEvent(event, index === timelineData.results.length - 1)) })] }));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
});

import timelineData from '@/data/timeline.json';
import { TimelineEvent } from '@/types/timeline';
import { ThemedText } from '@zygo/ui/ThemedText';
import { ThemedView } from '@zygo/ui/ThemedView';
import { TimelineItem } from '@zygo/ui/timeline/TimelineItem';
import { format, parseISO } from 'date-fns';
import { ScrollView, StyleSheet } from 'react-native';

const renderTimelineEvent = (event: TimelineEvent, isLast = false) => {
  const formattedDate = format(parseISO(event.date), 'MMM d, yyyy');
  
  return (
    <TimelineItem 
      key={event.id}
      title={event.title}
      description={event.description}
      timestamp={formattedDate}
      image={event.image}
      isLast={isLast}
    >
      {event.children.map((child, index) => 
        renderTimelineEvent(child, index === event.children.length - 1)
      )}
    </TimelineItem>
  );
};

export default function TimelineScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Timeline</ThemedText>
      <ScrollView style={styles.scrollView}>
        {timelineData.results.map((event, index) => 
          renderTimelineEvent(event, index === timelineData.results.length - 1)
        )}
      </ScrollView>
    </ThemedView>
  );
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
import FeedList from '@/components/FeedList';
import { ThemedView } from '@/components/ThemedView';
import { StyleSheet } from 'react-native';

export default function PostScreen() {
  return (
    <ThemedView style={styles.container}>
      <FeedList/>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import { ThemedText, ThemedView } from '@zygo/ui-native';
import { StyleSheet } from 'react-native';

export default function PostScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Post</ThemedText>
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

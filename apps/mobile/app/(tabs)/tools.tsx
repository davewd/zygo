import { ThemedText } from '@zygo/ui/ThemedText';
import { ThemedView } from '@zygo/ui/ThemedView';
import { StyleSheet } from 'react-native';

export default function PostScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Tools</ThemedText>
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
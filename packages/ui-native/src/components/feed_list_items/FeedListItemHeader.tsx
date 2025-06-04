import { FeedItemTypeMap } from '@zygo/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
interface FeedListHeaderProps {
  item: FeedItemTypeMap;
}

export const FeedListItemHeader: React.FC<FeedListHeaderProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        {item.title}
      </ThemedText>
      <View style={styles.line} />
    </View>
  );
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

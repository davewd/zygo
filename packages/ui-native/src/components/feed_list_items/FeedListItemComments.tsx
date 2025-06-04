import { FeedItemTypeMap } from '@zygo/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface FeedListItemActionsProps {
  item: FeedItemTypeMap;
}

export const FeedListItemComments: React.FC<FeedListItemActionsProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      <ThemedText>Comments for item {item.id}</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

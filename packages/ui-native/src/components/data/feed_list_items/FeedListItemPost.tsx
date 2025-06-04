import { FeedItemTypeMap } from '@zygo/types';
import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../../ThemedText';
import { ThemedView } from '../../ThemedView';

interface FeedListItemPostProps {
  item: FeedItemTypeMap;
}

export const FeedListItemPost: React.FC<FeedListItemPostProps> = ({ item }) => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <Image source={{ uri: item.author.avatar }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <View style={styles.nameRow}>
            <ThemedText type="defaultBold">{item.author.name}</ThemedText>
            {item.author.verified && (
              <Image
                source={require('../../assets/images/verified.png')}
                style={styles.verifiedBadge}
              />
            )}
            <ThemedText style={styles.handle}>@{item.author.handle}</ThemedText>
            <ThemedText style={styles.timestamp}>{item.metadata.createdAt}</ThemedText>
          </View>
          <ThemedText>{item.post}</ThemedText>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton}>
          <ThemedText>{item.stats.comments}</ThemedText>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <ThemedText>{item.stats.reposts}</ThemedText>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <ThemedText>{item.stats.likes}</ThemedText>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <ThemedText>Share</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  authorInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  verifiedBadge: {
    width: 16,
    height: 16,
  },
  handle: {
    color: '#536471',
  },
  timestamp: {
    color: '#536471',
    marginLeft: 'auto',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

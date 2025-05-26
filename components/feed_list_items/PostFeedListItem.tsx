import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface PostFeedItemProps {
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  timestamp: string;
  stats: {
    comments: number;
    reposts: number;
    likes: number;
  };
}

export default function PostFeedListItem({ 
  author,
  content,
  timestamp,
  stats 
}: PostFeedItemProps) {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <Image
          source={{ uri: author.avatar }}
          style={styles.avatar}
        />
        <View style={styles.authorInfo}>
          <View style={styles.nameRow}>
            <ThemedText type="defaultBold">{author.name}</ThemedText>
            {author.verified && (
              <Image
                source={require('../../assets/images/verified.png')}
                style={styles.verifiedBadge}
              />
            )}
            <ThemedText style={styles.handle}>@{author.handle}</ThemedText>
            <ThemedText style={styles.timestamp}>{timestamp}</ThemedText>
          </View>
          <ThemedText>{content}</ThemedText>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Pressable style={styles.actionButton}>
          <ThemedText>{stats.comments}</ThemedText>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <ThemedText>{stats.reposts}</ThemedText>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <ThemedText>{stats.likes}</ThemedText>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <ThemedText>Share</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

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
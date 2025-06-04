import { Image } from 'expo-image';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export function Header() {
  return (
    <ThemedView style={styles.header}>
      <Image
        source={{ uri: "../assets/images/example_copy/sample-avatar-001.jpg" }} // Replace with your avatar URL
        style={styles.avatar}
      />
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#536471"
        />
      </View>

      <View style={styles.notificationContainer}>
        <Pressable>
          <IconSymbol 
            name="bell.fill" // You'll need to add this mapping to IconSymbol.tsx
            size={24}
            color="#1D9BF0"
          />
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>3</ThemedText>
          </View>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
        padding: 12,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
    height: 60,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  searchInput: {
    backgroundColor: '#EFF3F4',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
  },
  notificationContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#F91880',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
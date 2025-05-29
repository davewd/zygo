import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface TimelineItemProps {
  title: string;
  description: string;
  timestamp: string;
  image?: string;
  children?: React.ReactNode;
  isLast?: boolean;
}

export const TimelineItem = ({ 
  title, 
  description, 
  timestamp, 
  image, 
  children, 
  isLast = false 
}: TimelineItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.timelineLeft}>
        <View style={styles.dot} />
        {!isLast && <View style={styles.line} />}
      </View>
      <View style={styles.content}>
        <ThemedText type="subtitle">{title}</ThemedText>
        <ThemedText type="body">{description}</ThemedText>
        <ThemedText type="caption">{timestamp}</ThemedText>
        {image && (
          <Image 
            source={{ uri: image }} 
            style={styles.image} 
            resizeMode="cover"
          />
        )}
        {children && <View style={styles.childrenContainer}>{children}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6B7280',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingBottom: 16,
  },
  childrenContainer: {
    marginTop: 8,
    paddingLeft: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 8,
  },
});
import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface VideoProps {
  videoUrl?: string;
  description?: string;
  thumbnail?: string;
}

export const FeedListItemBody_Video: React.FC<VideoProps> = ({ 
  videoUrl,
  description,
  thumbnail 
}) => {
  return (
    <View>
      <View style={{ width: '100%', height: 200, backgroundColor: '#f0f0f0' }}>
        {/* Video player placeholder */}
      </View>
      {description && (
        <ThemedText type="body">{description}</ThemedText>
      )}
    </View>
  );
};
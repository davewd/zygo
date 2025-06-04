import React from 'react';
import { Image, View } from 'react-native';
import { ThemedText } from '../../ThemedText';

interface ImageProps {
  imageUrl?: string;
  description?: string;
}

export const FeedListItemBody_Image: React.FC<ImageProps> = ({ imageUrl, description }) => {
  return (
    <View>
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: 200 }}
          resizeMode="cover"
        />
      )}
      {description && <ThemedText type="body">{description}</ThemedText>}
    </View>
  );
};

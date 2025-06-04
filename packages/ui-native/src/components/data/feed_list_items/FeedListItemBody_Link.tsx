import React from 'react';
import { Pressable, View } from 'react-native';
import { ThemedText } from '../../ThemedText';

interface LinkProps {
  url?: string;
  title?: string;
  description?: string;
}

export const FeedListItemBody_Link: React.FC<LinkProps> = ({ url, title, description }) => {
  return (
    <Pressable>
      <View>
        <ThemedText type="subtitle">{title}</ThemedText>
        <ThemedText type="body">{description}</ThemedText>
        <ThemedText type="caption">{url}</ThemedText>
      </View>
    </Pressable>
  );
};

import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../../ThemedText';

interface TextProps {
  description?: string;
}

export const FeedListItemBody_Text: React.FC<TextProps> = ({ description }) => {
  return (
    <View>
      <ThemedText type="body">{description}</ThemedText>
    </View>
  );
};

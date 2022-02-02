import { Image, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';

import { styles } from './styles';

export const OnBoardingItem = (props: {
  item: { id: number; title: string; description: string; image: string };
}) => {
  const { item } = props;
  const { title, description, image } = item;
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={{
          uri: image,
        }}
        style={[styles.image, { width, resizeMode: 'contain' }]}
      />

      <View style={{ flex: 0.3, marginTop: 15, paddingTop: 5, paddingHorizontal: 8 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

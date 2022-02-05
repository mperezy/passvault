import React from 'react';
import { View, Animated, useWindowDimensions } from 'react-native';

import { styles } from './styles';

export function Paginator({ data, scrollX }: Props) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((_: any, i: number) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return <Animated.View key={i} style={[styles.dot, { width: dotWidth, opacity }]} />;
      })}
    </View>
  );
}

interface Props {
  data: any;
  scrollX: any;
}

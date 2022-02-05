import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import { appColors } from 'utils/constants';

import { styles } from './styles';

export const NextButton = ({ scrollTo, percentage }: Props) => {
  const size = 80;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue: any) =>
    Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset = circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          // @ts-ignore
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      // @ts-ignore
      [percentage]
    );

    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation='-90' origin={center}>
          <Circle
            stroke={appColors.maximumTintColorSlider}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke={appColors.primaryDark}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            // strokeDashoffset={circumference - (circumference * 100) / 100}
          />
        </G>
      </Svg>
      <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={scrollTo}>
        <AntDesign name='arrowright' size={20} color='#FFF' />
      </TouchableOpacity>
    </View>
  );
};

interface Props {
  scrollTo: any;
  percentage: any;
}

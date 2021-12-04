import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

import { trackMarkStyles, styles } from './styles';
import { useDispatch } from 'react-redux';
import { setLength } from 'reduxStore/slices/passwordSlice';

// source code: https://snack.expo.dev/@miblanchard/@miblanchard-react-native-slider

const SliderContainer = (props: {
  children: React.ReactElement;
  sliderValue?: Array<number>;
  trackMarks?: Array<number>;
}) => {
  const dispatch = useDispatch();
  const DEFAULT_VALUE = 10;
  const { sliderValue, trackMarks } = props;
  const [value, setValue] = useState(sliderValue ? sliderValue : DEFAULT_VALUE);
  let renderTrackMarkComponent: React.ReactNode;

  useEffect(() => {
    dispatch(setLength({ length: value }));
  }, [value]);

  if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
    renderTrackMarkComponent = (index: number) => {
      const currentMarkValue = trackMarks[index];
      const currentSliderValue = value || (Array.isArray(value) && value[0]) || 0;
      const style =
        currentMarkValue > Math.max(currentSliderValue)
          ? trackMarkStyles.activeMark
          : trackMarkStyles.inactiveMark;
      return <View style={style} />;
    };
  }

  const renderChildren = () => {
    return React.Children.map(props.children, (child: React.ReactElement) => {
      if (!!child && child.type === Slider) {
        return React.cloneElement(child, {
          onValueChange: setValue,
          renderTrackMarkComponent,
          trackMarks,
          value,
        });
      }

      return child;
    });
  };

  return <View style={styles.sliderContainer}>{renderChildren()}</View>;
};

export default SliderContainer;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setLength } from 'reduxStore/slices/passwordSlice';

import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { trackMarkStyles, styles } from './styles';

// Reference: https://youtu.be/MwSudWtT7ps?t=271

const SliderContainer = (props: { defaultValue: number; handleGeneratePassword: any }) => {
  const { defaultValue, handleGeneratePassword } = props;
  const [value, setValue] = useState(defaultValue);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLength({ length: value }));
    handleGeneratePassword();
  }, [value]);
  return (
    <View style={styles.sliderContainer}>
      <Slider
        step={1}
        value={defaultValue}
        minimumValue={6}
        maximumValue={50}
        minimumTrackTintColor='#3091e0'
        maximumTrackTintColor='#d3d3d3'
        thumbTintColor='#3091e0'
        onValueChange={setValue}
      />
    </View>
  );
};

export default SliderContainer;

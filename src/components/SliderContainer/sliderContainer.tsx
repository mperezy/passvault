import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { generatePassword, setLength } from 'reduxStore/slices/passwordSlice';

import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

import { trackMarkStyles, styles } from './styles';
import { appColors } from 'utils/constants';

// Reference: https://youtu.be/MwSudWtT7ps?t=271

const SliderContainer = (props: { defaultValue: number; handleGeneratePassword: any }) => {
  const { defaultValue, handleGeneratePassword } = props;
  const [value, setValue] = useState(defaultValue);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNaN(value)) {
      dispatch(setLength({ length: value }));
      dispatch(generatePassword());
    }
  }, [value]);

  return (
    <View style={styles.sliderContainer}>
      <Slider
        step={1}
        value={defaultValue}
        minimumValue={6}
        maximumValue={50}
        minimumTrackTintColor={appColors.primary}
        maximumTrackTintColor={appColors.maximumTintColorSlider}
        thumbTintColor={appColors.primary}
        onValueChange={setValue}
      />
    </View>
  );
};

export default SliderContainer;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { generatePassword, selectPasswordPicked, setLength } from 'reduxStore/slices/passwordSlice';

import { View } from 'react-native';
import Slider from '@react-native-community/slider';

import { appColors } from 'utils/constants';
import { styles } from './styles';

// Reference: https://youtu.be/MwSudWtT7ps?t=271

const SliderContainer = ({ defaultValue }: Props) => {
  const [value, setValue] = useState(defaultValue);
  const passwordPicked = useSelector(selectPasswordPicked);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Number.isNaN(value) && !passwordPicked) {
      // TODO: This flow needs to be updated in future
      /* If there was a password picked for the edit flow
       * a new password won't be generated.
       * */
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

interface Props {
  defaultValue: number;
}

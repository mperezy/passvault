import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { generatePassword, selectPasswordPicked, setLength } from 'reduxStore/slices/passwordSlice';

import { View } from 'react-native';
import Slider from '@react-native-community/slider';

import { appColors } from 'utils/constants';
import { styles } from './styles';

// Reference: https://youtu.be/MwSudWtT7ps?t=271

const SliderContainer = ({ switchEnabled, defaultValue }: Props) => {
  const [value, setValue] = useState(defaultValue);
  const passwordPicked = useSelector(selectPasswordPicked);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Number.isNaN(value) && !passwordPicked && !switchEnabled) {
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
        disabled={switchEnabled}
        step={1}
        value={switchEnabled ? 0 : defaultValue}
        minimumValue={switchEnabled ? 0 : 6}
        maximumValue={switchEnabled ? 1 : 50}
        minimumTrackTintColor={switchEnabled ? appColors.disabledColorSlider : appColors.primary}
        maximumTrackTintColor={
          switchEnabled ? appColors.disabledColorSlider : appColors.maximumTintColorSlider
        }
        thumbTintColor={switchEnabled ? appColors.disabledColorSlider : appColors.primary}
        onValueChange={setValue}
      />
    </View>
  );
};

export default SliderContainer;

interface Props {
  switchEnabled: boolean;
  defaultValue: number;
}

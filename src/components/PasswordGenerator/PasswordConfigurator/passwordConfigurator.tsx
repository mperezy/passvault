import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import { checkBox } from 'components/PasswordGenerator/styles';
import { setIsNumbers, setIsSymbols } from 'reduxStore/slices/configuratorSlice';
import { generatePassword } from 'reduxStore/slices/passwordSlice';

/* Reference for checkbox usage: [
  https://docs.expo.dev/versions/latest/sdk/checkbox/,
  https://snack.expo.dev/
]
 */

export const PasswordConfigurator = () => {
  const dispatch = useDispatch();

  const [isEasy2ReadChecked, setEasy2ReadChecked] = useState(true);
  const [isAllCharChecked, setAllCharChecked] = useState(false);

  const [isUppercaseChecked, setUppercaseChecked] = useState(true);
  const [isLowercaseChecked, setLowercaseChecked] = useState(true);
  const [isNumbersChecked, setNumbersChecked] = useState(false);
  const [isSymbolsChecked, setSymbolsChecked] = useState(false);

  const [isNumbersCheckDisabled, setNumbersCheckeDisabled] = useState(true);
  const [isSymbolsCheckeDisabled, setSymbolsCheckeDisabled] = useState(true);

  const handleRightCheckboxesGivenLeftCheckboxes = () => {
    if (!isEasy2ReadChecked || isAllCharChecked) {
      setUppercaseChecked(true);
      setLowercaseChecked(true);

      setNumbersChecked(false);
      setSymbolsChecked(false);
      setNumbersCheckeDisabled(true);
      setSymbolsCheckeDisabled(true);
    } else {
      setNumbersChecked(true);
      setSymbolsChecked(true);
      setNumbersCheckeDisabled(false);
      setSymbolsCheckeDisabled(false);
    }

    dispatch(setIsNumbers({ isNumbers: !isNumbersChecked }));
    dispatch(setIsSymbols({ isSymbols: !isSymbolsChecked }));
    dispatch(generatePassword());
  };

  const handleEasy2ReadCheckbox = (value: boolean) => {
    setEasy2ReadChecked(value);
    setAllCharChecked(!value);

    handleRightCheckboxesGivenLeftCheckboxes();
  };

  const handleAllCharCheckbox = (value: boolean) => {
    setAllCharChecked(value);
    setEasy2ReadChecked(!value);

    handleRightCheckboxesGivenLeftCheckboxes();
  };

  return (
    <View style={checkBox.container}>
      {/* Left checkboxes */}
      <View style={{ flexDirection: 'column', marginLeft: -40 }}>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isEasy2ReadChecked}
            onValueChange={handleEasy2ReadCheckbox}
            color={isEasy2ReadChecked ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Easy to read</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isAllCharChecked}
            onValueChange={handleAllCharCheckbox}
            color={isAllCharChecked ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>All characters</Text>
        </View>
      </View>

      {/* Right checkboxes */}
      <View style={{ flexDirection: 'column' }}>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isUppercaseChecked}
            onValueChange={setUppercaseChecked}
            color={isUppercaseChecked ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Uppercase</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isLowercaseChecked}
            onValueChange={setLowercaseChecked}
            color={isLowercaseChecked ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Lowercase</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isNumbersChecked}
            onValueChange={setNumbersChecked}
            color={isNumbersChecked ? '#3091e0' : undefined}
            disabled={isNumbersCheckDisabled}
          />
          <Text style={checkBox.paragraph}>Numbers</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isSymbolsChecked}
            onValueChange={setSymbolsChecked}
            color={isSymbolsChecked ? '#3091e0' : undefined}
            disabled={isSymbolsCheckeDisabled}
          />
          <Text style={checkBox.paragraph}>Symbols</Text>
        </View>
      </View>
    </View>
  );
};

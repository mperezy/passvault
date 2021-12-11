import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import { checkBox } from 'components/PasswordGenerator/styles';
import {
  setIsLowerCase,
  setIsNumbers,
  setIsSymbols,
  setIsUpperCase,
} from 'reduxStore/slices/configuratorSlice';
import { generatePassword } from 'reduxStore/slices/passwordSlice';

import {
  handleLeftCheckboxes,
  handleRightCheckboxes,
  updateConfiguratorStateAndGeneratePassword,
} from 'utils/configuratorUtils';

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
    setUppercaseChecked(true);
    setLowercaseChecked(true);

    if (!isEasy2ReadChecked || isAllCharChecked) {
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

    dispatch(setIsUpperCase({ isUpperCase: isUppercaseChecked }));
    dispatch(setIsLowerCase({ isLowerCase: isLowercaseChecked }));
    dispatch(setIsNumbers({ isNumbers: !isNumbersChecked }));
    dispatch(setIsSymbols({ isSymbols: !isSymbolsChecked }));
    dispatch(generatePassword());
  };

  return (
    <View style={checkBox.container}>
      {/* Left checkboxes */}
      <View style={{ flexDirection: 'column', marginLeft: -40 }}>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isEasy2ReadChecked}
            onValueChange={(value: boolean) =>
              handleLeftCheckboxes(
                value,
                setEasy2ReadChecked,
                setAllCharChecked,
                handleRightCheckboxesGivenLeftCheckboxes
              )
            }
            color={isEasy2ReadChecked ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Easy to read</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isAllCharChecked}
            onValueChange={(value: boolean) => {
              handleLeftCheckboxes(
                value,
                setAllCharChecked,
                setEasy2ReadChecked,
                handleRightCheckboxesGivenLeftCheckboxes
              );
            }}
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
            onValueChange={(value: boolean) => {
              handleRightCheckboxes(
                value,
                setUppercaseChecked,
                isLowercaseChecked,
                isNumbersChecked,
                isSymbolsChecked
              );

              updateConfiguratorStateAndGeneratePassword(
                dispatch,
                setIsUpperCase,
                generatePassword,
                { isUpperCase: !isUppercaseChecked }
              );
            }}
            color={isUppercaseChecked ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Uppercase</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isLowercaseChecked}
            onValueChange={(value: boolean) => {
              handleRightCheckboxes(
                value,
                setLowercaseChecked,
                isUppercaseChecked,
                isNumbersChecked,
                isSymbolsChecked
              );

              updateConfiguratorStateAndGeneratePassword(
                dispatch,
                setIsLowerCase,
                generatePassword,
                { isLowerCase: !isLowercaseChecked }
              );
            }}
            color={isLowercaseChecked ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Lowercase</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isNumbersChecked}
            onValueChange={(value: boolean) => {
              handleRightCheckboxes(
                value,
                setNumbersChecked,
                isUppercaseChecked,
                isLowercaseChecked,
                isSymbolsChecked
              );

              updateConfiguratorStateAndGeneratePassword(dispatch, setIsNumbers, generatePassword, {
                isNumbers: !isNumbersChecked,
              });
            }}
            color={isNumbersChecked ? '#3091e0' : undefined}
            disabled={isNumbersCheckDisabled}
          />
          <Text style={checkBox.paragraph}>Numbers</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isSymbolsChecked}
            onValueChange={(value: boolean) => {
              handleRightCheckboxes(
                value,
                setSymbolsChecked,
                isUppercaseChecked,
                isLowercaseChecked,
                isNumbersChecked
              );

              updateConfiguratorStateAndGeneratePassword(dispatch, setIsSymbols, generatePassword, {
                isSymbols: !isSymbolsChecked,
              });
            }}
            color={isSymbolsChecked ? '#3091e0' : undefined}
            disabled={isSymbolsCheckeDisabled}
          />
          <Text style={checkBox.paragraph}>Symbols</Text>
        </View>
      </View>
    </View>
  );
};

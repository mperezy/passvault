import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';

import { checkBox } from 'components/PasswordGenerator/styles';
import {
  setIsUpperCase,
  setIsLowerCase,
  setIsNumbers,
  setIsSymbols,
  setIsUpperCaseAndIsLowerCase,
  setIsNumbersAndIsSymbols,
  selectIsUpperCase,
  selectIsLowerCase,
  selectIsNumbers,
  selectIsSymbols,
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

  const isUpperCase = useSelector(selectIsUpperCase);
  const isLowerCase = useSelector(selectIsLowerCase);
  const isNumbers = useSelector(selectIsNumbers);
  const isSymbols = useSelector(selectIsSymbols);

  const [isEasy2ReadChecked, setEasy2ReadChecked] = useState(true);
  const [isAllCharChecked, setAllCharChecked] = useState(false);

  const [isNumbersCheckDisabled, setNumbersCheckDisabled] = useState(true);
  const [isSymbolsCheckDisabled, setSymbolsCheckDisabled] = useState(true);

  const handleRightCheckboxesGivenLeftCheckboxes = () => {
    dispatch(setIsUpperCaseAndIsLowerCase({ isUpperCase: true, isLowerCase: true }));

    if (!isEasy2ReadChecked || isAllCharChecked) {
      dispatch(setIsNumbersAndIsSymbols({ isNumbers: false, isSymbols: false }));
    } else {
      dispatch(setIsNumbersAndIsSymbols({ isNumbers: true, isSymbols: true }));
    }

    setNumbersCheckDisabled(isNumbers);
    setSymbolsCheckDisabled(isSymbols);

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
            onValueChange={(value: boolean) => {
              handleLeftCheckboxes(
                value,
                setEasy2ReadChecked,
                setAllCharChecked,
                handleRightCheckboxesGivenLeftCheckboxes
              );
            }}
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
            value={isUpperCase}
            onValueChange={(value: boolean) => {
              handleRightCheckboxes(
                value,
                isLowerCase,
                isNumbers,
                isSymbols,
                dispatch,
                setIsUpperCase,
                { isUpperCase: value }
              );

              updateConfiguratorStateAndGeneratePassword(dispatch, generatePassword);
            }}
            color={isUpperCase ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Uppercase</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isLowerCase}
            onValueChange={(value: boolean) => {
              handleRightCheckboxes(
                value,
                isUpperCase,
                isNumbers,
                isSymbols,
                dispatch,
                setIsLowerCase,
                { isLowerCase: value }
              );

              updateConfiguratorStateAndGeneratePassword(dispatch, generatePassword);
            }}
            color={isLowerCase ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Lowercase</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isNumbers}
            onValueChange={(value: boolean) => {
              handleRightCheckboxes(
                value,
                isUpperCase,
                isLowerCase,
                isSymbols,
                dispatch,
                setIsNumbers,
                {
                  isNumbers: value,
                }
              );

              updateConfiguratorStateAndGeneratePassword(dispatch, generatePassword);
            }}
            color={isNumbers ? '#3091e0' : undefined}
            disabled={isNumbersCheckDisabled}
          />
          <Text style={checkBox.paragraph}>Numbers</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isSymbols}
            onValueChange={(value: boolean) => {
              handleRightCheckboxes(
                value,
                isUpperCase,
                isLowerCase,
                isNumbers,
                dispatch,
                setIsSymbols,
                {
                  isSymbols: value,
                }
              );

              updateConfiguratorStateAndGeneratePassword(dispatch, generatePassword);
            }}
            color={isSymbols ? '#3091e0' : undefined}
            disabled={isSymbolsCheckDisabled}
          />
          <Text style={checkBox.paragraph}>Symbols</Text>
        </View>
      </View>
    </View>
  );
};

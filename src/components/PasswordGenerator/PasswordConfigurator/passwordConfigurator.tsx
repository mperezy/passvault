import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Text, View, ToastAndroid, Platform } from 'react-native';
import Checkbox from 'expo-checkbox';

import { checkBox } from 'components/PasswordGenerator/styles';
import {
  setIsEasy2Read,
  setIsAllChar,
  setIsUpperCase,
  setIsLowerCase,
  setIsNumbers,
  setIsSymbols,
  setIsUpperCaseAndIsLowerCase,
  setIsNumbersAndIsSymbols,
  selectIsEasy2Read,
  selectIsAllChar,
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

  const isEasy2Read = useSelector(selectIsEasy2Read);
  const isAllChar = useSelector(selectIsAllChar);

  const isUpperCase = useSelector(selectIsUpperCase);
  const isLowerCase = useSelector(selectIsLowerCase);
  const isNumbers = useSelector(selectIsNumbers);
  const isSymbols = useSelector(selectIsSymbols);

  const handleRightCheckboxesGivenLeftCheckboxes = () => {
    dispatch(setIsUpperCaseAndIsLowerCase({ isUpperCase: true, isLowerCase: true }));

    if (!isEasy2Read || isAllChar) {
      dispatch(setIsNumbersAndIsSymbols({ isNumbers: false, isSymbols: false }));
    } else {
      dispatch(setIsNumbersAndIsSymbols({ isNumbers: true, isSymbols: true }));
    }

    dispatch(generatePassword());
  };

  return (
    <View style={checkBox.container}>
      {/* Left checkboxes */}
      <View style={{ flexDirection: 'column', marginLeft: -40 }}>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isEasy2Read}
            onValueChange={(value: boolean) => {
              handleLeftCheckboxes(
                dispatch,
                setIsEasy2Read,
                setIsAllChar,
                'isEasy2Read',
                'isAllChar',
                value,
                handleRightCheckboxesGivenLeftCheckboxes
              );
            }}
            color={isEasy2Read ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Easy to read</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isAllChar}
            onValueChange={(value: boolean) => {
              handleLeftCheckboxes(
                dispatch,
                setIsAllChar,
                setIsEasy2Read,
                'isAllChar',
                'isEasy2Read',
                value,
                handleRightCheckboxesGivenLeftCheckboxes
              );
            }}
            color={isAllChar ? '#3091e0' : undefined}
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
            disabled={!isAllChar}
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
            disabled={!isAllChar}
          />
          <Text style={checkBox.paragraph}>Symbols</Text>
        </View>
      </View>
    </View>
  );
};

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { View } from 'react-native';

import { CustomCheckBox } from 'components/PasswordConfigurator/CustomCheckBox/customCheckBox';
import { checkBox } from 'screens/PasswordGenerator/styles';
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
import { appColors } from 'utils/constants';

/* Reference for checkbox usage: [
  https://docs.expo.dev/versions/latest/sdk/checkbox/,
  https://snack.expo.dev/
]
 */

export const PasswordConfigurator = ({ switchEnabled }: Props) => {
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
      <View style={{ flexDirection: 'column', marginLeft: -20 }}>
        <View style={checkBox.section}>
          <CustomCheckBox
            label='Easy to read'
            isChecked={isEasy2Read}
            disabled={switchEnabled}
            color={appColors.primary}
            onPress={() => {
              handleLeftCheckboxes(
                dispatch,
                setIsEasy2Read,
                setIsAllChar,
                'isEasy2Read',
                'isAllChar',
                !isEasy2Read,
                handleRightCheckboxesGivenLeftCheckboxes
              );
            }}
          />
        </View>
        <View style={checkBox.section}>
          <CustomCheckBox
            label='All characters'
            isChecked={isAllChar}
            disabled={switchEnabled}
            color={appColors.primary}
            onPress={() => {
              handleLeftCheckboxes(
                dispatch,
                setIsAllChar,
                setIsEasy2Read,
                'isAllChar',
                'isEasy2Read',
                !isAllChar,
                handleRightCheckboxesGivenLeftCheckboxes
              );
            }}
          />
        </View>
      </View>

      {/* Right checkboxes */}
      <View style={{ flexDirection: 'column' }}>
        <View style={checkBox.section}>
          <CustomCheckBox
            label='Uppercase'
            isChecked={isUpperCase}
            disabled={switchEnabled}
            color={appColors.primary}
            onPress={() => {
              handleRightCheckboxes(
                !isUpperCase,
                isLowerCase,
                isNumbers,
                isSymbols,
                dispatch,
                setIsUpperCase,
                { isUpperCase: !isUpperCase }
              );

              updateConfiguratorStateAndGeneratePassword(dispatch);
            }}
          />
        </View>
        <View style={checkBox.section}>
          <CustomCheckBox
            label='Lowercase'
            isChecked={isLowerCase}
            disabled={switchEnabled}
            color={appColors.primary}
            onPress={() => {
              handleRightCheckboxes(
                !isLowerCase,
                isUpperCase,
                isNumbers,
                isSymbols,
                dispatch,
                setIsLowerCase,
                { isLowerCase: !isLowerCase }
              );

              updateConfiguratorStateAndGeneratePassword(dispatch);
            }}
          />
        </View>
        <View style={checkBox.section}>
          <CustomCheckBox
            label='Numbers'
            isChecked={isNumbers}
            disabled={!isAllChar || switchEnabled}
            color={appColors.primary}
            onPress={() => {
              handleRightCheckboxes(
                !isNumbers,
                isUpperCase,
                isLowerCase,
                isSymbols,
                dispatch,
                setIsNumbers,
                {
                  isNumbers: !isNumbers,
                }
              );

              updateConfiguratorStateAndGeneratePassword(dispatch);
            }}
          />
        </View>
        <View style={checkBox.section}>
          <CustomCheckBox
            label='Symbols'
            isChecked={isSymbols}
            disabled={!isAllChar || switchEnabled}
            color={appColors.primary}
            onPress={() => {
              handleRightCheckboxes(
                !isSymbols,
                isUpperCase,
                isLowerCase,
                isNumbers,
                dispatch,
                setIsSymbols,
                {
                  isSymbols: !isSymbols,
                }
              );

              updateConfiguratorStateAndGeneratePassword(dispatch);
            }}
          />
        </View>
      </View>
    </View>
  );
};

interface Props {
  switchEnabled: boolean;
}

import React from 'react';
import { View, StatusBar } from 'react-native';
import { appColors } from 'utils/constants';

/*
 * For more reference check this snack:
 *   https://snack.expo.dev/@ahmed_gaber/safe-area-context?platform=ios
 */

export const CustomStatusbar = () => {
  return (
    <StatusBar animated={true} barStyle={'light-content'} backgroundColor={appColors.primaryDark} />
  );
};

export default CustomStatusbar;

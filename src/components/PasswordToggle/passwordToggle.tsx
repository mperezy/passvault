import React from 'react';
import { View } from 'react-native';
import { CustomCheckBox } from 'components/PasswordConfigurator/CustomCheckBox/customCheckBox';
import { appColors } from 'utils/constants';

export const PasswordToggle = ({ hidePassword, action }: Props) => (
  <View style={{ marginTop: 10 }}>
    <CustomCheckBox
      label='Show password'
      isChecked={hidePassword}
      color={appColors.primary}
      onPress={action}
    />
  </View>
);

interface Props {
  hidePassword: boolean;
  action: any;
}

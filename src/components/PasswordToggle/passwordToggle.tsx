import React from 'react';
import { View } from 'react-native';
import { CustomCheckBox } from 'components/PasswordConfigurator/CustomCheckBox/customCheckBox';
import { appColors } from 'utils/constants';

export const PasswordToggle = (props: { hidePassword: boolean; action: any }) => {
  const { hidePassword, action } = props;
  return (
    <View style={{ marginTop: 10 }}>
      <CustomCheckBox
        label='Show password'
        isChecked={hidePassword}
        color={appColors.primary}
        onPress={action}
      />
    </View>
  );
};

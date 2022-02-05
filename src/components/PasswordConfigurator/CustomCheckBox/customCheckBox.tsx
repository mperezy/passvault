import React from 'react';

import { Text, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

export const CustomCheckBox = ({ label, isChecked, disabled, color, onPress }: Props) => (
  <TouchableOpacity
    disabled={disabled}
    style={{ flexDirection: 'row', alignItems: 'center' }}
    onPress={onPress}
  >
    <Checkbox
      style={{ margin: 8 }}
      value={isChecked}
      disabled={disabled}
      color={isChecked ? color : undefined}
    />
    <Text style={{ fontSize: 14, opacity: !disabled ? 1 : 0.3 }}>{label}</Text>
  </TouchableOpacity>
);

const defaultProps = {
  disabled: false,
};

interface Props {
  label: string;
  isChecked: boolean;
  disabled?: boolean;
  color: string;
  onPress: any;
}

CustomCheckBox.defaultProps = defaultProps;

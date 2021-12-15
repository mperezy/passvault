import React from 'react';

import { Text, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';

export const CustomCheckBox = (props: {
  label: string;
  isChecked: boolean;
  disabled?: boolean;
  color: string;
  onPress: any;
}) => {
  const { label, isChecked, disabled, color, onPress } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={{ flexDirection: 'row', alignItems: 'center' }}
      onPress={onPress}
    >
      <Checkbox
        style={{ margin: 8 }}
        value={isChecked}
        disabled={disabled !== null ? disabled : false}
        color={isChecked ? color : undefined}
      />
      <Text style={{ fontSize: 15, opacity: !disabled ? 1 : 0.3 }}>{label}</Text>
    </TouchableOpacity>
  );
};

import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { checkBox } from 'components/PasswordGenerator/styles';
import Checkbox from 'expo-checkbox';

/* Reference for checkbox usage: [
  https://docs.expo.dev/versions/latest/sdk/checkbox/,
  https://snack.expo.dev/
]
 */

export const PasswordConfigurator = () => {
  const [isUppercaseChecked, setUppercaseChecked] = useState(false);
  const [isLowercaseChecked, setLowercaseChecked] = useState(false);
  const [isNumbersChecked, setNumbersChecked] = useState(false);
  const [isSymbolsChecked, setSymbolsChecked] = useState(false);
  const [isEasy2ReadChecked, setEasy2ReadChecked] = useState(false);
  const [isAllCharChecked, setAllCharChecked] = useState(false);

  return (
    <View style={checkBox.container}>
      <View style={{ flexDirection: 'column', marginLeft: -40 }}>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isEasy2ReadChecked}
            onValueChange={setEasy2ReadChecked}
            color={isEasy2ReadChecked ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Easy to read</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isAllCharChecked}
            onValueChange={setAllCharChecked}
            color={isAllCharChecked ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>All characters</Text>
        </View>
      </View>

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
          />
          <Text style={checkBox.paragraph}>Numbers</Text>
        </View>
        <View style={checkBox.section}>
          <Checkbox
            style={checkBox.checkbox}
            value={isSymbolsChecked}
            onValueChange={setSymbolsChecked}
            color={isSymbolsChecked ? '#3091e0' : undefined}
          />
          <Text style={checkBox.paragraph}>Symbols</Text>
        </View>
      </View>
    </View>
  );
};

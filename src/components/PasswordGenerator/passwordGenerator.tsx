import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

import SliderContainer from 'components/PasswordGenerator/SliderContainer/sliderContainer';
import { PasswordConfigurator } from 'components/PasswordGenerator/PasswordConfigurator/passwordConfigurator';

import { shadow, screen, passwordStyle, configuration, checkBox } from './styles';
import { useSelector } from 'react-redux';
import { selectPasswordLength } from 'reduxStore/slices/passwordSlice';

// Reference for Icons usage: https://icons.expo.fyi/

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const passwordLength = useSelector(selectPasswordLength);

  return (
    <View style={screen.container}>
      <View style={[passwordStyle.container, shadow.container]}>
        <View style={passwordStyle.inputContainer}>
          <TextInput style={passwordStyle.input} value={password} editable={false} />
          <View style={passwordStyle.icons}>
            <MaterialCommunityIcons
              style={{ marginRight: 5 }}
              name='content-copy'
              size={24}
              color='grey'
            />
            <Ionicons name='reload' size={24} color='grey' />
          </View>
        </View>
      </View>

      <View style={[configuration.container, shadow.container]}>
        <View style={configuration.textContainer}>
          <Text style={configuration.textHeader}>Configure your password</Text>
        </View>

        <View style={configuration.passwordLengthContainer}>
          <Text style={{ fontSize: 17 }}>Password length</Text>
          <View style={configuration.lengthSliderContainer}>
            <TextInput style={configuration.inputLength} value={passwordLength.toString()} />
            <SliderContainer defaultValue={10} />
          </View>
        </View>

        <PasswordConfigurator />
      </View>
    </View>
  );
};

export default PasswordGenerator;

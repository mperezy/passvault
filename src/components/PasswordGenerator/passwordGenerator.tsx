import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Slider } from '@miblanchard/react-native-slider';
import SliderContainer from 'components/PasswordList/SliderContainer/sliderContainer';
import Checkbox from 'expo-checkbox';

import { shadow, screen, passwordStyle, configuration, checkBox } from './styles';
import { useSelector } from 'react-redux';
import { selectPasswordLength } from 'reduxStore/slices/passwordSlice';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [isUppercaseChecked, setUppercaseChecked] = useState(false);
  const [isLowercaseChecked, setLowercaseChecked] = useState(false);
  const [isNumbersChecked, setNumbersChecked] = useState(false);
  const [isSymbolsChecked, setSymbolsChecked] = useState(false);
  const [isEasy2ReadChecked, setEasy2ReadChecked] = useState(false);
  const [isAllCharChecked, setAllCharChecked] = useState(false);
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
          <View style={[configuration.lengthSliderContainer, shadow.container]}>
            <TextInput style={configuration.inputLength} value={passwordLength.toString()} />
            <SliderContainer>
              <Slider
                step={1}
                animateTransitions
                maximumTrackTintColor='#d3d3d3'
                maximumValue={50}
                minimumTrackTintColor='#3091e0'
                minimumValue={6}
                thumbTintColor='#3091e0'
              />
            </SliderContainer>
          </View>
        </View>
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
      </View>
    </View>
  );
};

export default PasswordGenerator;

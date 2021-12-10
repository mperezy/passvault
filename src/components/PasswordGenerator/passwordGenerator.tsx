import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectPasswordLength } from 'reduxStore/slices/passwordSlice';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native';

import { Snackbar } from 'react-native-paper';

import Checkbox from 'expo-checkbox';
import SliderContainer from 'components/PasswordGenerator/SliderContainer/sliderContainer';
import { PasswordConfigurator } from 'components/PasswordGenerator/PasswordConfigurator/passwordConfigurator';
import { shadow, screen, passwordStyle, configuration, checkBox } from './styles';

// Reference for Icons usage: https://icons.expo.fyi/

const MySnackBar = (props: {
  message: string;
  isSnackbarVisible: boolean;
  setSnackbarVisible: any;
}) => {
  const { message, isSnackbarVisible, setSnackbarVisible } = props;
  return (
    <Snackbar
      visible={isSnackbarVisible}
      onDismiss={() => setSnackbarVisible(!isSnackbarVisible)}
      duration={1500}
    >
      {message}
    </Snackbar>
  );
};

const PasswordGenerator = () => {
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [password, setPassword] = useState('');
  const passwordLength = useSelector(selectPasswordLength);

  const handleCopyButton = () => {
    if (Platform.OS === 'web') {
      alert('The password was copied to clipboard');
    } else {
      setSnackbarMessage('The password was copied to clipboard');
      setSnackbarVisible(true);
    }
  };

  const handleRefreshButton = () => {
    if (Platform.OS === 'web') {
      alert('Regenerating new password...');
    } else {
      setSnackbarMessage('Regenerating new password...');
      setSnackbarVisible(true);
    }
  };

  return (
    <View style={screen.container}>
      <View style={[passwordStyle.container, shadow.container]}>
        <View style={passwordStyle.inputContainer}>
          <TextInput style={passwordStyle.input} value={password} editable={false} />
          <View style={passwordStyle.icons}>
            <TouchableOpacity onPress={handleCopyButton}>
              <MaterialCommunityIcons
                style={{ marginRight: 10 }}
                name='content-copy'
                size={24}
                color='grey'
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRefreshButton}>
              <Ionicons name='reload' size={24} color='grey' />
            </TouchableOpacity>
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

      <MySnackBar
        message={snackbarMessage}
        isSnackbarVisible={isSnackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
      />
    </View>
  );
};

export default PasswordGenerator;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  generatePassword,
  selectPassword,
  selectPasswordLength,
} from 'reduxStore/slices/passwordSlice';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
  Platform,
} from 'react-native';

import Checkbox from 'expo-checkbox';
import { CustomCheckBox } from 'components/PasswordGenerator/PasswordConfigurator/CustomCheckBox/customCheckBox';
import SliderContainer from 'components/PasswordGenerator/SliderContainer/sliderContainer';
import { PasswordConfigurator } from 'components/PasswordGenerator/PasswordConfigurator/passwordConfigurator';
import { CustomSnackBar } from 'components/common/CustomSnackBar';
import { shadow, screen, passwordStyle, configuration, checkBox } from './styles';

import { getPasswordGenerated } from 'utils/localStorageFuncs';
import { showToastMessage } from 'utils/toastAndroidMessage';

const PasswordGenerator = () => {
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [password, setPassword] = useState('');

  const passwordFromState = useSelector(selectPassword);
  const passwordLength = useSelector(selectPasswordLength);

  const dispatch = useDispatch();

  const handleGeneratePassword = () => {
    dispatch(generatePassword());
  };

  useEffect(() => {
    handleGeneratePassword();
  }, []);

  useEffect(() => {
    setPassword(passwordFromState);
  }, [passwordFromState]);

  const handleCopyButton = () => {
    getPasswordGenerated()
      .then((password: any | string) => {
        if (Platform.OS === 'android') {
          showToastMessage('The password was copied to clipboard');
        } else {
          setSnackbarMessage('The password was copied to clipboard');
          setSnackbarVisible(true);
        }

        Clipboard.setString(password.password);
      })
      .catch((err: any) => {
        console.log({ err });
        Clipboard.setString('');
      });
  };
  const handleRefreshButton = () => {
    if (Platform.OS === 'android') {
      showToastMessage('New password generated');
    } else {
      setSnackbarMessage('New password generated');
      setSnackbarVisible(true);
    }

    handleGeneratePassword();
  };

  return (
    <View style={screen.container}>
      <View style={[passwordStyle.container, shadow.container]}>
        <View style={passwordStyle.inputContainer}>
          <TextInput
            showSoftInputOnFocus={false}
            caretHidden={true}
            style={passwordStyle.input}
            value={password}
          />
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
            <TextInput
              showSoftInputOnFocus={false}
              caretHidden={true}
              style={configuration.inputLength}
              keyboardType={'numeric'}
              value={passwordLength.toString()}
            />
            <SliderContainer defaultValue={10} handleGeneratePassword={handleGeneratePassword} />
          </View>
        </View>

        <PasswordConfigurator />
      </View>

      <CustomSnackBar
        message={snackbarMessage}
        isSnackbarVisible={isSnackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
      />
    </View>
  );
};

export default PasswordGenerator;

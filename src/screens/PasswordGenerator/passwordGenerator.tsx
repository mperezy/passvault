import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
  generatePassword,
  selectIsCreateMode,
  selectIsEditMode,
  selectPassword,
  selectPasswordLength,
  setIsCreateMode,
  setIsEditMode,
} from 'reduxStore/slices/passwordSlice';
import { selectUserId } from 'reduxStore/slices/userSlice';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
  Platform,
  BackHandler,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Checkbox from 'expo-checkbox';

import { CustomCheckBox } from 'components/PasswordConfigurator/CustomCheckBox/customCheckBox';
import SliderContainer from 'components/SliderContainer/sliderContainer';
import { PasswordConfigurator } from 'components/PasswordConfigurator/passwordConfigurator';
import { CustomSnackbar } from 'components/CustomSnackbar/customSnackbar';

import { shadow, screen, passwordStyle, configuration, checkBox } from './styles';
import { getPasswordGenerated } from 'utils/localStorageFuncs';
import { showInfoMessage } from 'utils/infoMessages';

export const PasswordGenerator = (props: { navigation: any }) => {
  const { navigation } = props;
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [password, setPassword] = useState('');

  const passwordFromState = useSelector(selectPassword);
  const passwordLength = useSelector(selectPasswordLength);

  const isCreateMode = useSelector(selectIsCreateMode);
  const isEditMode = useSelector(selectIsEditMode);

  const userId = useSelector(selectUserId);

  const screenTitle = isEditMode
    ? 'Password Edit'
    : `Password Generator ${!userId ? '(Only)' : ''}`;

  const dispatch = useDispatch();

  const handleGeneratePassword = () => {
    if (!isEditMode) {
      dispatch(generatePassword());
      if (userId) {
        showInfoMessage(
          "You're about to create a new password",
          setSnackbarMessage,
          setSnackbarVisible
        );
      }
    }
  };

  const resetCreateEditMode = () => {
    if (isEditMode) {
      dispatch(setIsEditMode({ isEditMode: !isEditMode }));
    }

    if (isCreateMode) {
      dispatch(setIsCreateMode({ isCreateMode: !isCreateMode }));
    }
  };

  const handleBackAction = () => {
    resetCreateEditMode();
    navigation.navigate(userId ? 'PasswordList' : 'Login');
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackAction);
    handleGeneratePassword();

    return () => {
      resetCreateEditMode();
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: screenTitle,
    });
  });

  useEffect(() => {
    setPassword(passwordFromState);
  }, [passwordFromState]);

  const handleCopyButton = () => {
    getPasswordGenerated()
      .then((password: any | string) => {
        showInfoMessage(
          'The password was copied to clipboard',
          setSnackbarMessage,
          setSnackbarVisible
        );

        const password2Clipboard = isEditMode ? passwordFromState : password.password;

        Clipboard.setString(password2Clipboard);
      })
      .catch((err: any) => {
        console.log({ err });
        Clipboard.setString('');
      });
  };
  const handleRefreshButton = () => {
    showInfoMessage('New password generated', setSnackbarMessage, setSnackbarVisible);
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

        <Divider style={{ backgroundColor: 'grey' }} />

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
            <SliderContainer
              defaultValue={isEditMode ? passwordFromState.length : 10}
              handleGeneratePassword={handleGeneratePassword}
            />
          </View>
        </View>

        <Divider style={{ backgroundColor: 'grey' }} />

        <PasswordConfigurator />
      </View>

      <CustomSnackbar
        message={snackbarMessage}
        isSnackbarVisible={isSnackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
      />
    </View>
  );
};

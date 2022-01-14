import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { StackNavigationProp } from '@react-navigation/native-stack';

import {
  generatePassword,
  selectIsCreateMode,
  selectIsEditMode,
  selectPassword,
  selectPasswordLength,
  setIsCreateMode,
  setIsEditMode,
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
  BackHandler,
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
  const navigation = useNavigation<StackNavigationProp<{ route: {} }>>();
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [password, setPassword] = useState('');

  const passwordFromState = useSelector(selectPassword);
  const passwordLength = useSelector(selectPasswordLength);

  const isCreateMode = useSelector(selectIsCreateMode);
  const isEditMode = useSelector(selectIsEditMode);

  const dispatch = useDispatch();

  const handleGeneratePassword = () => {
    if (!isEditMode) {
      dispatch(generatePassword());
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
    navigation.goBack(null);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackAction);
    handleGeneratePassword();

    return () => {
      resetCreateEditMode();
    };
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

        const password2Clipboard = isEditMode ? passwordFromState : password.password;

        Clipboard.setString(password2Clipboard);
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
            <SliderContainer
              defaultValue={isEditMode ? passwordFromState.length : 10}
              handleGeneratePassword={handleGeneratePassword}
            />
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

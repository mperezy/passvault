import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectIsCreateMode,
  selectIsEditMode,
  selectPassword,
  selectPasswordLength,
} from 'reduxStore/slices/passwordSlice';
import { selectUserId } from 'reduxStore/slices/userSlice';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Clipboard,
  BackHandler,
  Platform,
  ScrollView,
} from 'react-native';
import { Divider } from 'react-native-paper';
import Checkbox from 'expo-checkbox';

import { CustomCheckBox } from 'components/PasswordConfigurator/CustomCheckBox/customCheckBox';
import SliderContainer from 'components/SliderContainer/sliderContainer';
import { PasswordConfigurator } from 'components/PasswordConfigurator/passwordConfigurator';
import { CreateEditPasswordConfigurator } from 'components/CreateEditPasswordConfigurator/createEditPasswordConfigurator';
import { CustomSnackbar } from 'components/CustomSnackbar/customSnackbar';

import { cardView, shadow, screen, passwordStyle, configuration, checkBox } from './styles';
import { getPasswordGenerated } from 'utils/localStorageFuncs';
import { infoMessages } from 'utils/constants';
import { showInfoMessage } from 'utils/infoMessages';
import {
  resetCreateEditMode,
  handleGeneratePassword,
  showAuthenticatedMessage,
} from 'utils/configuratorUtils';

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

  const _handleGeneratePassword = () => {
    handleGeneratePassword(isEditMode, userId, dispatch, setSnackbarMessage, setSnackbarVisible);
  };

  const handleCopyButton = () => {
    getPasswordGenerated()
      .then((password: any | string) => {
        const password2Clipboard = isEditMode ? passwordFromState : password.password;

        if (Platform.OS === 'android') {
          showInfoMessage(infoMessages.copied2Clipboard);
        } else {
          setSnackbarMessage(infoMessages.copied2Clipboard);
          setSnackbarVisible(true);
        }

        Clipboard.setString(password2Clipboard);
      })
      .catch((err: any) => {
        console.log({ err });
        Clipboard.setString('');
      });
  };

  const handleRefreshButton = () => {
    if (Platform.OS === 'android') {
      showInfoMessage(infoMessages.newPassword);
    } else {
      setSnackbarMessage(infoMessages.newPassword);
      setSnackbarVisible(true);
    }

    _handleGeneratePassword();
  };

  const handleBackAction = () => {
    resetCreateEditMode(isEditMode, isCreateMode, dispatch);
    navigation.navigate(userId ? 'PasswordList' : 'Login');
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackAction);

    if (Platform.OS === 'android') {
      showAuthenticatedMessage(userId, isCreateMode);
    } else {
      setSnackbarMessage(infoMessages.about2CreatePassword);
      setSnackbarVisible(true);
    }

    _handleGeneratePassword();

    return () => {
      resetCreateEditMode(isEditMode, isCreateMode, dispatch);
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

  return (
    <>
      <ScrollView>
        <View style={screen.container}>
          <View style={[cardView.container, passwordStyle.container, shadow.container]}>
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

          <View style={[cardView.container, configuration.container, shadow.container]}>
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
                  handleGeneratePassword={_handleGeneratePassword}
                />
              </View>
            </View>

            <Divider style={{ backgroundColor: 'grey' }} />

            <PasswordConfigurator />
          </View>

          {(isCreateMode || isEditMode) && (
            <CreateEditPasswordConfigurator navigation={navigation} />
          )}
        </View>
      </ScrollView>

      <CustomSnackbar
        message={snackbarMessage}
        isSnackbarVisible={isSnackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
      />
    </>
  );
};

import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logger } from 'react-native-logs';

import {
  generatePassword,
  selectIsCreateMode,
  selectIsEditMode,
  selectPassword,
  setPassword,
} from 'reduxStore/slices/passwordSlice';
import { selectUserId } from 'reduxStore/slices/userSlice';
import {
  resetSnackbar,
  selectSnackbarMessage,
  selectSnackbarVisible,
  setSnackbarMessage,
  setSnackbarVisible,
} from 'reduxStore/slices/uiElementsSlice';

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
  Keyboard,
} from 'react-native';
import { Divider, Switch } from 'react-native-paper';

import SliderContainer from 'components/SliderContainer/sliderContainer';
import { PasswordConfigurator } from 'components/PasswordConfigurator/passwordConfigurator';
import { CreateEditPasswordConfigurator } from 'components/CreateEditPasswordConfigurator/createEditPasswordConfigurator';

import { CustomSnackbar } from 'components/CustomSnackbar/customSnackbar';
import { getPasswordGenerated } from 'utils/localStorageFuncs';
import { appColors, infoMessages } from 'utils/constants';
import { showInfoMessage } from 'utils/infoMessages';
import { resetConfigurationState, showAuthenticatedMessage } from 'utils/configuratorUtils';
import { cardView, shadow, screen, passwordStyle, configuration } from './styles';

const log = logger.createLogger();

export const PasswordGenerator = ({ navigation }: Props) => {
  const scrollViewRef = useRef();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [switchEnabled, setSwitchEnabled] = useState(false);
  const [password, mSetPassword] = useState('');

  const snackbarMessage = useSelector(selectSnackbarMessage);
  const snackbarVisible = useSelector(selectSnackbarVisible);

  const passwordFromState = useSelector(selectPassword);

  const isCreateMode = useSelector(selectIsCreateMode);
  const isEditMode = useSelector(selectIsEditMode);

  const userId = useSelector(selectUserId);

  const screenTitle = isEditMode
    ? 'Password Edit'
    : `Password Generator ${!userId ? '(Only)' : ''}`;

  const dispatch = useDispatch();

  const handleCopyButton = () => {
    getPasswordGenerated()
      .then((password: any | string) => {
        const password2Clipboard = isEditMode ? passwordFromState : password.password;

        if (Platform.OS === 'android') {
          showInfoMessage(infoMessages.copied2Clipboard);
        } else {
          dispatch(setSnackbarMessage({ snackbarMessage: infoMessages.copied2Clipboard }));
          dispatch(setSnackbarVisible({ snackbarVisible: true }));
        }

        Clipboard.setString(password2Clipboard);
      })
      .catch((err: any) => {
        log.error('From handleCopyButton: ', { err });
        Clipboard.setString('');
      });
  };

  const handleRefreshButton = () => {
    if (Platform.OS === 'android') {
      showInfoMessage(infoMessages.newPassword);
    } else {
      dispatch(setSnackbarMessage({ snackbarMessage: infoMessages.newPassword }));
      dispatch(setSnackbarVisible({ snackbarVisible: true }));
    }

    dispatch(generatePassword());
  };

  const handleBackAction = () => {
    resetConfigurationState(dispatch);
    navigation.navigate(userId ? 'PasswordList' : 'Login');
    return true;
  };

  const handleOnDismissSnackbar = () => {
    dispatch(resetSnackbar());
  };

  const handleOnChangePassword = (text: string) => {
    if (switchEnabled) {
      mSetPassword(text);
    }
  };

  const handleOnBlurPassword = () => {
    if (switchEnabled) {
      dispatch(setPassword({ password }));
    }
  };

  const handleSwitch = () => {
    setSwitchEnabled(!switchEnabled);
    if (switchEnabled) {
      mSetPassword('');
      dispatch(generatePassword());
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackAction);

    if (Platform.OS === 'android') {
      showAuthenticatedMessage(userId, isCreateMode);
    } else {
      dispatch(setSnackbarMessage({ snackbarMessage: infoMessages.about2CreatePassword }));
      dispatch(setSnackbarVisible({ snackbarVisible: true }));
    }

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      resetConfigurationState(dispatch);
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (isKeyboardVisible) {
      // @ts-ignore
      scrollViewRef.current.scrollToEnd({ animating: true });
    }
  }, [isKeyboardVisible]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: screenTitle,
    });
  });

  return (
    <>
      {/* @ts-ignore */}
      <ScrollView ref={scrollViewRef}>
        <View style={screen.container}>
          <View style={[cardView.container, passwordStyle.container, shadow.container]}>
            <View style={passwordStyle.inputContainer}>
              <TextInput
                showSoftInputOnFocus={false}
                caretHidden
                style={passwordStyle.input}
                value={switchEnabled ? password : passwordFromState}
                onChangeText={handleOnChangePassword}
                onBlur={handleOnBlurPassword}
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

            {isCreateMode && (
              <>
                <View style={configuration.switchToggle}>
                  <Text style={{ fontSize: 17 }}>Place your own password:</Text>
                  <Switch
                    style={{ marginLeft: 10 }}
                    value={switchEnabled}
                    onValueChange={handleSwitch}
                    color={appColors.primary}
                  />
                </View>

                <Divider style={{ backgroundColor: 'grey' }} />
              </>
            )}

            <View style={configuration.passwordLengthContainer}>
              <Text style={{ fontSize: 17 }}>Password length</Text>
              <View style={configuration.lengthSliderContainer}>
                <TextInput
                  showSoftInputOnFocus={false}
                  caretHidden
                  style={configuration.inputLength}
                  keyboardType='numeric'
                  value={passwordFromState.length.toString()}
                />
                <SliderContainer
                  switchEnabled={switchEnabled}
                  defaultValue={isEditMode ? passwordFromState.length : 10}
                />
              </View>
            </View>

            <Divider style={{ backgroundColor: 'grey' }} />

            <PasswordConfigurator switchEnabled={switchEnabled} />
          </View>

          {(isCreateMode || isEditMode) && (
            <CreateEditPasswordConfigurator navigation={navigation} />
          )}
        </View>
      </ScrollView>

      <CustomSnackbar
        message={snackbarMessage}
        isSnackbarVisible={snackbarVisible}
        onDismiss={handleOnDismissSnackbar}
      />
    </>
  );
};

interface Props {
  navigation: any;
}

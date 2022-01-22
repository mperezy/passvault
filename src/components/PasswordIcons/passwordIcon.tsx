import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { setIsEditMode, setPassword } from 'reduxStore/slices/passwordSlice';

import { Clipboard, TouchableOpacity, View } from 'react-native';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { icons } from 'components/PasswordItem/styles';

import { showInfoMessage } from 'utils/infoMessages';

export const PasswordIcons = (props: {
  passwordGenerated: string;
  passwordVisible: boolean;
  setPasswordVisible: any;
  setSnackbarVisible: any;
  setSnackbarMessage: any;
  navigation: any;
}) => {
  const dispatch = useDispatch();

  const {
    passwordGenerated,
    passwordVisible,
    setPasswordVisible,
    setSnackbarVisible,
    setSnackbarMessage,
    navigation,
  } = props;

  const handleShowHidePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCopyButton = () => {
    showInfoMessage('The password was copied to clipboard', setSnackbarMessage, setSnackbarVisible);
    Clipboard.setString(passwordGenerated);
  };

  return (
    <View style={icons.container}>
      <TouchableOpacity onPress={handleShowHidePassword}>
        <Entypo
          style={icons.singleIcon}
          name={passwordVisible ? 'eye' : 'eye-with-line'}
          size={18}
          color='grey'
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCopyButton}>
        <MaterialCommunityIcons
          style={icons.singleIcon}
          name='content-copy'
          size={18}
          color='grey'
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(setIsEditMode({ isEditMode: true }));
          dispatch(setPassword({ password: passwordGenerated }));
          navigation.navigate('PasswordGenerator');
        }}
      >
        <FontAwesome style={{ marginRight: 5 }} name='edit' size={18} color='grey' />
      </TouchableOpacity>
      <Ionicons name='trash' size={18} color='#DB4437' />
    </View>
  );
};

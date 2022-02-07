import React from 'react';
import { useDispatch } from 'react-redux';

import {
  setIsDeleteMode,
  setIsEditMode,
  setPassword,
  setPasswordDescriptionPicked,
  setPasswordIdPicked,
  setPasswordPicked,
} from 'reduxStore/slices/passwordSlice';

import { Clipboard, Platform, TouchableOpacity, View } from 'react-native';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { icons } from 'components/PasswordItem/styles';

import { appColors, infoMessages } from 'utils/constants';
import { showInfoMessage } from 'utils/infoMessages';
import { setSocialMediaPicked } from 'reduxStore/slices/socialMediaSlice';
import {
  setModalMessage,
  setModalTitle,
  setModalVisible,
  setSnackbarMessage,
  setSnackbarVisible,
} from 'reduxStore/slices/uiElementsSlice';

export const PasswordIcons = ({
  passwordId,
  socialMedia,
  description,
  passwordGenerated,
  passwordVisible,
  setPasswordVisible,
  navigation,
}: Props) => {
  const dispatch = useDispatch();

  const mSocialMedia = socialMedia.charAt(0).toUpperCase() + socialMedia.slice(1);

  const handleShowHidePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCopyButton = () => {
    if (Platform.OS === 'android') {
      showInfoMessage(infoMessages.copied2Clipboard);
    } else {
      dispatch(setSnackbarMessage({ snackbarMessage: infoMessages.copied2Clipboard }));
      dispatch(setSnackbarVisible({ snackbarVisible: true }));
    }

    Clipboard.setString(passwordGenerated);
  };

  const handleEditButton = () => {
    dispatch(setIsEditMode({ isEditMode: true }));
    dispatch(setPasswordIdPicked({ passwordIdPicked: passwordId }));
    dispatch(setPasswordPicked({ passwordPicked: passwordGenerated }));
    dispatch(setPassword({ password: passwordGenerated }));
    dispatch(setPasswordDescriptionPicked({ passwordDescriptionPicked: description }));
    dispatch(setSocialMediaPicked({ socialMediaPicked: socialMedia }));
    navigation.navigate('PasswordGenerator');
  };

  const handleDeleteButton = () => {
    dispatch(setIsDeleteMode({ isDeleteMode: true }));
    dispatch(setPasswordIdPicked({ passwordIdPicked: passwordId }));
    dispatch(setModalTitle({ modalTitle: 'Delete password warning' }));
    dispatch(
      setModalMessage({
        modalMessage: `Are you sure you want to delete this ${mSocialMedia}'s password?`,
      })
    );
    dispatch(setModalVisible({ modalVisible: true }));
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
      <TouchableOpacity onPress={handleEditButton}>
        <FontAwesome style={{ marginRight: 5 }} name='edit' size={18} color='grey' />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteButton}>
        <Ionicons name='trash' size={18} color={appColors.red} />
      </TouchableOpacity>
    </View>
  );
};

interface Props {
  passwordId: string;
  socialMedia: string;
  description: string;
  passwordGenerated: string;
  passwordVisible: boolean;
  setPasswordVisible: any;
  navigation: any;
}

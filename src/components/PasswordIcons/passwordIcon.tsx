import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import {
  deletePasswordFromFirebase,
  setIsEditMode,
  setPasswordIdPicked,
  setPasswordPicked,
} from 'reduxStore/slices/passwordSlice';

import { Alert, Clipboard, Platform, TouchableOpacity, View } from 'react-native';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { icons } from 'components/PasswordItem/styles';

import { infoMessages, PasswordIconsI } from 'utils/constants';
import { showInfoMessage } from 'utils/infoMessages';
import { setSocialMediaPicked } from 'reduxStore/slices/socialMediaSlice';

export const PasswordIcons = (props: PasswordIconsI) => {
  const dispatch = useDispatch();

  const {
    passwordId,
    socialMedia,
    passwordGenerated,
    passwordVisible,
    setPasswordVisible,
    setSnackbarVisible,
    setSnackbarMessage,
    navigation,
  } = props;

  const _socialMedia = socialMedia.charAt(0).toUpperCase() + socialMedia.slice(1);

  const handleShowHidePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCopyButton = () => {
    if (Platform.OS === 'android') {
      showInfoMessage(infoMessages.copied2Clipboard);
    } else {
      setSnackbarMessage(infoMessages.copied2Clipboard);
      setSnackbarVisible(true);
    }

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
          dispatch(setPasswordIdPicked({ passwordIdPicked: passwordId }));
          dispatch(setPasswordPicked({ passwordPicked: passwordGenerated }));
          dispatch(setSocialMediaPicked({ socialMediaPicked: socialMedia }));
          navigation.navigate('PasswordGenerator');
        }}
      >
        <FontAwesome style={{ marginRight: 5 }} name='edit' size={18} color='grey' />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Delete password warning',
            `Are you sure you want to delete this ${_socialMedia}'s password?`,
            [
              {
                text: 'No',
                style: 'cancel',
              },
              { text: 'Yes', onPress: () => dispatch(deletePasswordFromFirebase({ passwordId })) },
            ]
          );
        }}
      >
        <Ionicons name='trash' size={18} color='#DB4437' />
      </TouchableOpacity>
    </View>
  );
};

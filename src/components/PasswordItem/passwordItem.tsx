import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// @ts-ignore
import { StackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  Clipboard,
} from 'react-native';

import { setIsEditMode, setPassword } from 'reduxStore/slices/passwordSlice';

import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  imageSourceRetriever,
  socialMediaIcon,
  socialMediaIconColor,
} from 'utils/imageDataRetriever';
import { showInfoMessage } from 'utils/infoMessages';

import { icons, item, input } from './styles';

interface PasswordI {
  passwordGenerated: string;
  socialMedia: string;
  setSnackbarVisible: any;
  setSnackbarMessage: any;
}

const SocialMediaIcon = (props: { style: any; socialMedia: string }) => {
  const { style, socialMedia } = props;

  if (['amazon', 'discord', 'google', 'slack', 'okta', 'outlook', 'twitch'].includes(socialMedia)) {
    const imageSource = imageSourceRetriever(socialMedia);

    return <Image style={style} source={imageSource} />;
  } else {
    const getSocialMedia: any = socialMediaIcon(socialMedia);
    const socialMediaColor = socialMediaIconColor(socialMedia);

    return <AntDesign style={style} name={getSocialMedia} size={24} color={socialMediaColor} />;
  }
};

const PasswordIcons = (props: {
  passwordGenerated: string;
  passwordVisible: boolean;
  setPasswordVisible: any;
  setSnackbarVisible: any;
  setSnackbarMessage: any;
}) => {
  const navigation = useNavigation<StackNavigationProp<{ route: {} }>>();
  const dispatch = useDispatch();

  const {
    passwordGenerated,
    passwordVisible,
    setPasswordVisible,
    setSnackbarVisible,
    setSnackbarMessage,
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

const PasswordItem = (props: PasswordI) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { passwordGenerated, socialMedia, setSnackbarVisible, setSnackbarMessage } = props;

  return (
    <View style={item.container}>
      <View style={item.iconPasswordWrapper}>
        <SocialMediaIcon style={icons.socialMedia} socialMedia={socialMedia} />
        <TextInput
          style={input.container}
          showSoftInputOnFocus={false}
          caretHidden={true}
          value={passwordGenerated}
          secureTextEntry={!passwordVisible}
        />
      </View>
      <PasswordIcons
        passwordGenerated={passwordGenerated}
        passwordVisible={passwordVisible}
        setPasswordVisible={setPasswordVisible}
        setSnackbarVisible={setSnackbarVisible}
        setSnackbarMessage={setSnackbarMessage}
      />
    </View>
  );
};

export default PasswordItem;

import React, { useState } from 'react';

import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  Clipboard,
} from 'react-native';
import { icons, item, input } from './styles';
import { Snackbar } from 'react-native-paper';

import {
  imageSourceRetriever,
  socialMediaIcon,
  socialMediaIconColor,
} from 'utils/imageDataRetriever';
import { showToastMessage } from 'utils/toastAndroidMessage';

interface PasswordI {
  passwordGenerated: string;
  socialMedia: string;
  setSnackbarVisible: any;
  setSnackbarMessage: any;
}

const SocialMediaIcon = (props: { socialMedia: string }) => {
  const { socialMedia } = props;

  if (['amazon', 'discord', 'google', 'slack', 'okta', 'outlook', 'twitch'].includes(socialMedia)) {
    const imageSource = imageSourceRetriever(socialMedia);

    return <Image style={{ width: 24, height: 24 }} source={imageSource} />;
  } else {
    const getSocialMedia: any = socialMediaIcon(socialMedia);
    const socialMediaColor = socialMediaIconColor(socialMedia);

    return <AntDesign name={getSocialMedia} size={24} color={socialMediaColor} />;
  }
};

const PasswordIcons = (props: {
  passwordGenerated: string;
  passwordVisible: boolean;
  setPasswordVisible: any;
  setSnackbarVisible: any;
  setSnackbarMessage: any;
}) => {
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
    if (Platform.OS === 'android') {
      showToastMessage('The password was copied to clipboard');
    } else {
      setSnackbarMessage('The password was copied to clipboard');
      setSnackbarVisible(true);
    }

    Clipboard.setString(passwordGenerated);
  };

  return (
    <View style={icons.container}>
      <TouchableOpacity onPress={handleShowHidePassword}>
        <Entypo
          style={{ marginRight: 10 }}
          name={passwordVisible ? 'eye' : 'eye-with-line'}
          size={18}
          color='grey'
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCopyButton}>
        <MaterialCommunityIcons
          style={{ marginRight: 10 }}
          name='content-copy'
          size={18}
          color='grey'
        />
      </TouchableOpacity>
      <FontAwesome style={{ marginRight: 5 }} name='edit' size={18} color='grey' />
      <Ionicons name='trash' size={18} color='#DB4437' />
    </View>
  );
};

const PasswordItem = (props: PasswordI) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { passwordGenerated, socialMedia, setSnackbarVisible, setSnackbarMessage } = props;

  return (
    <View style={item.container}>
      <SocialMediaIcon socialMedia={socialMedia} />
      <TextInput
        style={input.container}
        value={passwordGenerated}
        secureTextEntry={!passwordVisible}
      />
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

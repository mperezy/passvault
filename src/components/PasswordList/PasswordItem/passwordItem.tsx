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
  ToastAndroid,
} from 'react-native';
import { icons, item, input } from './styles';
import { Snackbar } from 'react-native-paper';
import {
  imageSourceRetriever,
  socialMediaIcon,
  socialMediaIconColor,
} from 'utils/imageDataRetriever';

interface PasswordI {
  passwordGenerated: string;
  socialMedia: string;
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

const showToastMessage = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const PasswordIcons = (props: {
  passwordGenerated: string;
  passwordVisible: boolean;
  setPasswordVisible: any;
}) => {
  const { passwordGenerated, passwordVisible, setPasswordVisible } = props;

  const handleShowHidePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleCopyButton = () => {
    showToastMessage('The password was copied to clipboard');

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
      <FontAwesome style={{ marginRight: 5 }} name='edit' size={18} color='#0F9D58' />
      <Ionicons name='trash' size={18} color='#DB4437' />
    </View>
  );
};

const PasswordItem = (props: PasswordI) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { passwordGenerated, socialMedia } = props;

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
      />
    </View>
  );
};

export default PasswordItem;

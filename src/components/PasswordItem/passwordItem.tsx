import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

import { SocialMediaIcon } from 'components/SocialMediaIcon/socialMediaIcon';
import { PasswordIcons } from 'components/PasswordIcons/passwordIcon';

import { icons, item } from './styles';

import { PasswordItemI } from 'utils/constants';

const PasswordItem = (props: PasswordItemI) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    passwordId,
    passwordGenerated,
    socialMedia,
    description,
    setSnackbarVisible,
    setSnackbarMessage,
    navigation,
  } = props;

  return (
    <View style={item.container}>
      <View style={item.socialIconAndPasswordInfo}>
        <SocialMediaIcon style={icons.socialMedia} socialMedia={socialMedia} />
        <View style={item.passwordAndDescription}>
          <Text style={item.descriptionTextLabel}>{description}</Text>
          <TextInput
            style={item.passwordInput}
            showSoftInputOnFocus={false}
            caretHidden={true}
            value={passwordGenerated}
            secureTextEntry={!passwordVisible}
          />
        </View>
      </View>
      <PasswordIcons
        passwordId={passwordId}
        socialMedia={socialMedia}
        description={description}
        passwordGenerated={passwordGenerated}
        passwordVisible={passwordVisible}
        setPasswordVisible={setPasswordVisible}
        setSnackbarVisible={setSnackbarVisible}
        setSnackbarMessage={setSnackbarMessage}
        navigation={navigation}
      />
    </View>
  );
};

export default PasswordItem;

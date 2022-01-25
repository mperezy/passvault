import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import { SocialMediaIcon } from 'components/SocialMediaIcon/socialMediaIcon';
import { PasswordIcons } from 'components/PasswordIcons/passwordIcon';

import { icons, item, input } from './styles';

import { PasswordItemI } from 'utils/constants';

const PasswordItem = (props: PasswordItemI) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    passwordId,
    passwordGenerated,
    socialMedia,
    setSnackbarVisible,
    setSnackbarMessage,
    navigation,
  } = props;

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
        passwordId={passwordId}
        socialMedia={socialMedia}
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

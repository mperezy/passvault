import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { SocialMediaIcon } from 'components/SocialMediaIcon/socialMediaIcon';
import { PasswordIcons } from 'components/PasswordIcons/passwordIcon';

import { icons, item } from './styles';

export const PasswordItem = ({
  passwordId,
  passwordGenerated,
  socialMedia,
  description,
  navigation,
}: Props) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={item.container}>
      <View style={item.socialIconAndPasswordInfo}>
        <SocialMediaIcon style={icons.socialMedia} socialMedia={socialMedia} />
        <View style={item.passwordAndDescription}>
          <Text style={item.descriptionTextLabel}>{description}</Text>
          <TextInput
            style={item.passwordInput}
            showSoftInputOnFocus={false}
            caretHidden
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
        navigation={navigation}
      />
    </View>
  );
};

interface Props {
  passwordId: string;
  passwordGenerated: string;
  socialMedia: string;
  description: string;
  navigation: DrawerNavigationProp<any>;
}

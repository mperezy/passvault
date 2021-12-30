import React from 'react';
import { View, Text } from 'react-native';

interface PasswordI {
  passwordGenerated: string;
  socialMedia: string;
}

function PasswordItem(props: PasswordI) {
  const { passwordGenerated, socialMedia } = props;

  return (
    <View>
      <Text>
        {socialMedia} {passwordGenerated}
      </Text>
    </View>
  );
}

export default PasswordItem;

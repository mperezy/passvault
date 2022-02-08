import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setUserData, unsetUserData } from 'reduxStore/slices/userSlice';

import { View, Text, Image, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import { auth, signUp } from 'services/firebase';

import { shadow } from 'screens/PasswordGenerator/styles';
import styles from 'screens/Login/styles';

export const SignUp = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUserData({ id: user.uid, email: user.email }));
          navigation.navigate('Drawer');
        } else {
          dispatch(unsetUserData());
        }
      }),
    [navigation]
  );

  const handleSignUp = () => {
    signUp(username);
    setUsername('');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.loginImage} source={require('assets/main/passvault-512px.png')} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Username'
          value={username}
          style={[styles.input, shadow.container]}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linkContainer}>
        <TouchableOpacity
          onPress={() => {
            // @ts-ignore
            navigation.navigate('Login');
          }}
          style={styles.link}
        >
          <Text style={styles.linkText}>Go to Login if you have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

interface Props {
  navigation: NavigationProp<any>;
}

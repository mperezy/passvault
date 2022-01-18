import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectRequest,
  setIsRequest,
  unsetIsRequest,
} from 'reduxStore/slices/applicationStatusSlice';

import { setUserData, unsetUserData } from 'reduxStore/slices/userSlice';

import { Image, Text, TextInput, Platform, View, TouchableOpacity } from 'react-native';
import { Popable } from 'react-native-popable';

import { LoadingIndicator } from 'components/LoadingIndicator/loadingIndicator';
import { shadow } from 'screens/PasswordGenerator/styles';

import { setUserData2LS } from 'utils/localStorageFuncs';
import { auth, signIn } from 'services/firebase';

import styles from './styles';

// Reference for popover: https://github.com/eveningkid/react-native-popable

export const Login = (props: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const isRequesting = useSelector(selectRequest);
  const { navigation } = props;

  useEffect(() => {
    dispatch(setIsRequest({ isRequest: true }));
  }, []);

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUserData({ id: user.uid, email: user.email }));
          dispatch(unsetIsRequest());
          navigation.replace('CustomDrawer');
        } else {
          dispatch(unsetUserData());
          dispatch(unsetIsRequest());
        }
      }),
    [navigation]
  );

  const handleLogin = () => {
    signIn(username, password);
  };

  return (
    <>
      {isRequesting && <LoadingIndicator />}
      {!isRequesting && (
        <View style={styles.container}>
          <Image style={styles.loginImage} source={require('assets/main/passvault-512px.png')} />
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Username'
              value={username}
              style={[styles.input, shadow.container]}
              onChangeText={(text: string) => setUsername(text)}
            />
            <TextInput
              placeholder='Password'
              value={password}
              style={[styles.input, shadow.container]}
              onChangeText={(text: string) => setPassword(text)}
              secureTextEntry
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('SignUp');
              }}
              style={[styles.button, styles.buttonOutLine]}
            >
              <Text style={styles.buttonOutLineText}>Sign up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.linkContainer}>
            <TouchableOpacity
              onPress={() => {
                // @ts-ignore
                navigation.navigate('PasswordGenerator');
              }}
              style={styles.link}
            >
              <Text style={styles.linkText}>Use it without an account </Text>
            </TouchableOpacity>
            <Popable
              action='hover'
              position={'bottom'}
              content='You can use the app for free but you can only generate passwords and not store them.'
            >
              <Image style={styles.tooltipImage} source={require('assets/info-icon.png')} />
            </Popable>
          </View>
        </View>
      )}
    </>
  );
};

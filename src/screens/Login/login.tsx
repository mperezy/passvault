import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectRequest,
  setIsRequest,
  unsetIsRequest,
} from 'reduxStore/slices/applicationStatusSlice';
import { setUserData, unsetUserData } from 'reduxStore/slices/userSlice';

import { setUserData2LS } from 'utils/localStorageFuncs';
import { Image, Text, TextInput, Platform, View, TouchableOpacity } from 'react-native';

import { Popable } from 'react-native-popable';
// @ts-ignore

import { StackNavigationProp } from '@react-navigation/native-stack';

import { auth } from 'services/firebase';

import { LoadingIndicator } from 'components/LoadingIndicator/loadingIndicator';
import { shadow } from 'screens/PasswordGenerator/styles';
import styles from './styles';

// Reference for popover: https://github.com/eveningkid/react-native-popable

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const isRequesting = useSelector(selectRequest);
  const navigation = useNavigation<StackNavigationProp<{ route: {} }>>();

  useEffect(() => {
    dispatch(setIsRequest({ isRequest: true }));
  }, []);

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUserData({ id: user.uid, email: user.email }));
          dispatch(unsetIsRequest());
          navigation.replace('PasswordList');
        } else {
          dispatch(unsetUserData());
          dispatch(unsetIsRequest());
        }
      }),
    [navigation]
  );

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(`${username}@example.com`, password)
      .then((userCredentials) => {
        const { user } = userCredentials;

        setUserData2LS(user?.uid, user?.email);
      })
      .catch((error) => {
        alert(error.message);
        console.log({ exception: error.message });
      });
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

export default Login;

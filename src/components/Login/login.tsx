import React, { useEffect, useState } from 'react';

import {
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { auth } from 'src/services/firebase';

import styles from './styles';
import { Popable } from 'react-native-popable';
import { useDispatch } from 'react-redux';
import { setUserData, unsetUserData } from 'reduxStore/slices/userSlice';
import { setUserData2LS } from 'utils/localStorageFuncs';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUserData({ id: user.uid, email: user.email }));
          navigation.replace('PasswordList');
        } else {
          dispatch(unsetUserData());
        }
      }),
    [navigation]
  );

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCreds) => {
        const { user } = userCreds;

        setUserData2LS(user?.uid, user?.email);
      })
      .catch((error) => {
        alert(error.message);
        console.log({ exception: error.message });
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Image style={styles.loginImage} source={require('assets/main/passvault-512px.png')} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder='Email'
          value={email}
          style={styles.input}
          onChangeText={(text: string) => setEmail(text)}
        />
        <TextInput
          placeholder='Password'
          value={password}
          style={styles.input}
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
    </KeyboardAvoidingView>
  );
};

export default Login;

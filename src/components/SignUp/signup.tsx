import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { setUserData, unsetUserData } from 'reduxStore/slices/userSlice';

import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// @ts-ignore
import { StackNavigationProp } from '@react-navigation/native-stack';

import { auth } from 'services/firebase';
import { shadow } from 'components/PasswordGenerator/styles';
import styles from 'components/Login/styles';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<{ route: {} }>>();

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

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(`${username}@example.com`, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        console.log({ user });
        setUsername('');
        setPassword('');
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
          placeholder='Username'
          value={username}
          style={[styles.input, shadow.container]}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder='Password'
          value={password}
          style={[styles.input, shadow.container]}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
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
    </KeyboardAvoidingView>
  );
};

export default SignUp;

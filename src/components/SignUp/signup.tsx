import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'src/services/firebase';
import styles from 'components/Login/styles';
import { setUserData, unsetUserData } from 'reduxStore/slices/userSlice';
import { shadow } from 'components/PasswordGenerator/styles';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUserData({ id: user.uid, email: user.email }, {}));
          navigation.replace('PasswordList');
        } else {
          dispatch(unsetUserData());
        }
      }),
    [navigation]
  );

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const { user } = userCredentials;
        console.log({ user });
        setEmail('');
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
          placeholder='Email'
          value={email}
          style={[styles.input, shadow.container]}
          onChangeText={(text) => setEmail(text)}
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

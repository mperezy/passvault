import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectRequest,
  setIsRequest,
  unsetIsRequest,
} from 'reduxStore/slices/applicationStatusSlice';

import { setUserData, unsetUserData } from 'reduxStore/slices/userSlice';

import { Image, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { usePopover } from 'react-native-modal-popover';

import { LoadingIndicator } from 'components/LoadingIndicator/loadingIndicator';
import { CustomPopover } from 'components/Popover/popover';
import { shadow } from 'screens/PasswordGenerator/styles';

import { auth, signIn } from 'services/firebase';

import styles from './styles';

// Reference for popover: https://github.com/eveningkid/react-native-popable

export const Login = ({ navigation }: Props) => {
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();
  const isRequesting = useSelector(selectRequest);

  const { openPopover, closePopover, popoverVisible, touchableRef, popoverAnchorRect } =
    usePopover();

  useEffect(() => {
    dispatch(setIsRequest());
  }, []);

  useEffect(
    () =>
      auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(setUserData({ id: user.uid, email: user.email }));
          dispatch(unsetIsRequest());
          navigation.replace('Drawer');
        } else {
          dispatch(unsetUserData());
          dispatch(unsetIsRequest());
        }
      }),
    [navigation]
  );

  const handleLogin = () => {
    signIn(username);
    setUsername('');
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

            <CustomPopover
              popoverVisible={popoverVisible}
              closePopover={closePopover}
              popoverAnchorRect={popoverAnchorRect}
              touchableRef={touchableRef}
              onPress={openPopover}
            />
          </View>
        </View>
      )}
    </>
  );
};

interface Props {
  navigation: any;
}

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { getPasswordsFromFirebase, unsetPasswords } from 'reduxStore/slices/passwordSlice';

import { clearUserDataFromLS } from 'utils/localStorageFuncs';

import { View, Text, TouchableOpacity } from 'react-native';
// @ts-ignore
import { StackNavigationProp } from '@react-navigation/native-stack';

import { auth, passwordsCollection } from 'services/firebase';
import styles from './styles';

const PasswordList = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<{ route: {} }>>();

  useEffect(() => {
    passwordsCollection.onSnapshot(() => {
      dispatch(getPasswordsFromFirebase());
    });
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        clearUserDataFromLS();
        dispatch(unsetPasswords());
        navigation.replace('Login');
      })
      .catch((error) => {
        console.log({ exception: error.message });
      });
  };

  return (
    <View>
      <Text>Here will be the list of password stored.</Text>

      {/* TODO: Delete this temporal sign out handler */}
      <TouchableOpacity onPress={handleSignOut}>
        <View style={styles.navButtonContainer}>
          <Text style={styles.navButton}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordList;

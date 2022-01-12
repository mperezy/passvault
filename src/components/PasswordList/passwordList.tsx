import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { StackNavigationProp } from '@react-navigation/native-stack';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import PasswordItem from 'components/PasswordList/PasswordItem/passwordItem';
import styles from './styles';

import { clearUserDataFromLS } from 'utils/localStorageFuncs';
import { auth, passwordsCollection } from 'services/firebase';

import {
  getPasswordsFromFirebase,
  selectPasswords,
  unsetPasswords,
} from 'reduxStore/slices/passwordSlice';

import { selectUserEmail } from 'reduxStore/slices/userSlice';

interface PasswordI {
  id: string;
  createdAt: number;
  password_generated: string;
  social_media: string;
}

const PasswordList = () => {
  const navigation = useNavigation<StackNavigationProp<{ route: {} }>>();
  const dispatch = useDispatch();
  const scrollViewRef = useRef();

  const userEmail = useSelector(selectUserEmail);
  const userName = userEmail ? userEmail.substring(0, userEmail.indexOf('@')) : '';
  const passwords = useSelector(selectPasswords);

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
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.navWrapper}>
          <Text style={styles.sectionTitle}>{userName}'s passwords</Text>
          <TouchableOpacity onPress={handleSignOut}>
            <View style={styles.navButtonContainer}>
              <Text style={styles.navButton}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          // ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.items}>
            {passwords.map((passwordItem: PasswordI) => (
              <PasswordItem
                key={passwordItem.id}
                passwordGenerated={passwordItem.password_generated}
                socialMedia={passwordItem.social_media}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default PasswordList;

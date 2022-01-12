import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { StackNavigationProp } from '@react-navigation/native-stack';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';

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
import { CustomSnackBar } from 'components/common/CustomSnackBar';

interface PasswordI {
  id: string;
  createdAt: number;
  password_generated: string;
  social_media: string;
}

const PasswordList = () => {
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [scrollIsClose2Bottom, setScrollIsClose2Bottom] = useState(false);

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

  const handleScrollIsClose2Bottom = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    const result =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

    setScrollIsClose2Bottom(result);
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
          onScroll={handleScrollIsClose2Bottom}
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
                setSnackbarVisible={setSnackbarVisible}
                setSnackbarMessage={setSnackbarMessage}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <FAB
        style={{
          position: 'absolute',
          margin: 26,
          right: 0,
          bottom: isSnackbarVisible ? 40 : 0,
          backgroundColor: '#3091e0',
        }}
        color={'#FFF'}
        visible={!scrollIsClose2Bottom}
        icon='plus'
        onPress={() => {
          // @ts-ignore
          navigation.navigate('PasswordGenerator');
        }}
      />
      <CustomSnackBar
        message={snackbarMessage}
        isSnackbarVisible={isSnackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
      />
    </View>
  );
};

export default PasswordList;

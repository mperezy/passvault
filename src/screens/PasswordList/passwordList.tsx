import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// @ts-ignore
import { StackNavigationProp } from '@react-navigation/native-stack';

import { View, TouchableOpacity, ScrollView, BackHandler, Platform } from 'react-native';
import { FAB } from 'react-native-paper';

import PasswordItem from 'components/PasswordItem/passwordItem';
import styles from './styles';

import { clearUserDataFromLS } from 'utils/localStorageFuncs';
import { auth, passwordsCollection } from 'services/firebase';

import {
  getPasswordsFromFirebase,
  selectPasswords,
  setIsCreateMode,
  unsetPasswords,
} from 'reduxStore/slices/passwordSlice';

import { selectUserEmail } from 'reduxStore/slices/userSlice';
import { CustomSnackbar } from 'components/CustomSnackbar/customSnackbar';
import { MaterialIcons } from '@expo/vector-icons';

interface PasswordI {
  id: string;
  createdAt: number;
  password_generated: string;
  social_media: string;
}

export const PasswordList = (props: { navigation: any }) => {
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [scrollIsClose2Bottom, setScrollIsClose2Bottom] = useState(false);

  const { navigation } = props;
  const dispatch = useDispatch();
  const scrollViewRef = useRef();

  const passwords = useSelector(selectPasswords);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });
    passwordsCollection.onSnapshot(() => {
      dispatch(getPasswordsFromFirebase());
    });
  }, []);

  const handleScrollIsClose2Bottom = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = Platform.OS === 'web' ? 7 : 10;
    const result =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

    setScrollIsClose2Bottom(result);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        // ref={scrollViewRef}
        scrollEventThrottle={16}
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
          dispatch(setIsCreateMode({ isCreateMode: true }));
          navigation.navigate('PasswordGenerator');
        }}
      />
      <CustomSnackbar
        message={snackbarMessage}
        isSnackbarVisible={isSnackbarVisible}
        setSnackbarVisible={setSnackbarVisible}
      />
    </View>
  );
};

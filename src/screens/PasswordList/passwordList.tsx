import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPasswordsFromFirebase,
  selectPasswords,
  setIsCreateMode,
} from 'reduxStore/slices/passwordSlice';
import { selectRequest } from 'reduxStore/slices/applicationStatusSlice';

import { View, ScrollView, BackHandler, Platform } from 'react-native';
import { FAB } from 'react-native-paper';

import PasswordItem from 'components/PasswordItem/passwordItem';
import { LoadingIndicator } from 'components/LoadingIndicator/loadingIndicator';
import { CustomSnackbar } from 'components/CustomSnackbar/customSnackbar';

import { passwordsCollection } from 'services/firebase';

import { appColors, PasswordI } from 'utils/constants';
import styles from './styles';

export const PasswordList = (props: { navigation: any }) => {
  const [isSnackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [scrollIsClose2Bottom, setScrollIsClose2Bottom] = useState(false);

  const { navigation } = props;
  const dispatch = useDispatch();
  const scrollViewRef = useRef();

  const passwords = useSelector(selectPasswords);
  const isRequesting = useSelector(selectRequest);

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
    <>
      {isRequesting && <LoadingIndicator />}
      {!isRequesting && (
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
              {passwords.map((passwordItem: PasswordI) => {
                console.log();
                return (
                  <PasswordItem
                    key={passwordItem.id}
                    passwordId={passwordItem.id}
                    passwordGenerated={passwordItem.password_generated}
                    socialMedia={passwordItem.social_media}
                    setSnackbarVisible={setSnackbarVisible}
                    setSnackbarMessage={setSnackbarMessage}
                    navigation={navigation}
                  />
                );
              })}
            </View>
          </ScrollView>
          <FAB
            style={{
              position: 'absolute',
              margin: 26,
              right: 0,
              bottom: isSnackbarVisible ? 40 : 0,
              backgroundColor: appColors.primary,
            }}
            color={appColors.textTint}
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
      )}
    </>
  );
};

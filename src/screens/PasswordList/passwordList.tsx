import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  deletePasswordFromFirebase,
  editPasswordFromFirebase,
  getPasswordsFromFirebase,
  selectIsDeleteMode,
  selectIsEditMode,
  selectPasswords,
  setIsCreateMode,
} from 'reduxStore/slices/passwordSlice';
import { selectRequest } from 'reduxStore/slices/applicationStatusSlice';
import {
  resetModal,
  resetSnackbar,
  selectModalMessage,
  selectModalTitle,
  selectModalVisible,
  selectSnackbarMessage,
  selectSnackbarVisible,
} from 'reduxStore/slices/uiElementsSlice';

import { View, ScrollView, BackHandler, Platform } from 'react-native';
import { FAB } from 'react-native-paper';

import { PasswordItem } from 'components/PasswordItem/passwordItem';
import { LoadingIndicator } from 'components/LoadingIndicator/loadingIndicator';
import { CustomSnackbar } from 'components/CustomSnackbar/customSnackbar';
import { CustomModal as Modal } from 'components/CustomModal/customModal';

import { passwordsCollection } from 'services/firebase';

import { appColors, PasswordI } from 'utils/constants';
import styles from './styles';

export const PasswordList = ({ navigation }: Props) => {
  const snackbarVisible = useSelector(selectSnackbarVisible);
  const snackbarMessage = useSelector(selectSnackbarMessage);

  const modalTitle = useSelector(selectModalTitle);
  const modalMessage = useSelector(selectModalMessage);
  const modalVisible = useSelector(selectModalVisible);

  const isEditMode = useSelector(selectIsEditMode);
  const isDeleteMode = useSelector(selectIsDeleteMode);

  const [scrollIsClose2Bottom, setScrollIsClose2Bottom] = useState(false);

  const dispatch = useDispatch();

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

  const handleOnDismissSnackbar = () => {
    dispatch(resetSnackbar());
  };

  const handleOnPressFAB = () => {
    dispatch(setIsCreateMode({ isCreateMode: true }));
    navigation.navigate('PasswordGenerator');
  };

  const handleModalToggle = () => {
    dispatch(resetModal());
  };
  const handleModalOnSubmit = () => {
    if (isDeleteMode) {
      dispatch(deletePasswordFromFirebase());
    } else if (isEditMode) {
      dispatch(editPasswordFromFirebase());
      navigation.navigate('PasswordList');
    }
    dispatch(resetModal());
  };

  return (
    <>
      {isRequesting && <LoadingIndicator />}
      {!isRequesting && (
        <View style={styles.container}>
          <ScrollView
            scrollEventThrottle={16}
            onScroll={handleScrollIsClose2Bottom}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.items}>
              {passwords.map(({ id, description, passwordGenerated, socialMedia }: PasswordI) => (
                <PasswordItem
                  key={id}
                  passwordId={id}
                  passwordGenerated={passwordGenerated}
                  socialMedia={socialMedia}
                  description={description}
                  navigation={navigation}
                />
              ))}
            </View>
          </ScrollView>
          <FAB
            style={[styles.fab, { bottom: snackbarVisible ? 40 : 0 }]}
            color={appColors.textTint}
            visible={!scrollIsClose2Bottom}
            icon='plus'
            onPress={handleOnPressFAB}
          />
          <CustomSnackbar
            message={snackbarMessage}
            isSnackbarVisible={snackbarVisible}
            onDismiss={handleOnDismissSnackbar}
          />
          <Modal
            visible={modalVisible}
            toggle={handleModalToggle}
            onSubmit={handleModalOnSubmit}
            title={modalTitle}
            message={modalMessage}
            okButtonMessage='Yes'
            cancelButtonMessage='No'
          />
        </View>
      )}
    </>
  );
};

interface Props {
  navigation: any;
}

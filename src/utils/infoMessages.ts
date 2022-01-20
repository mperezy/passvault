import { ToastAndroid, Platform } from 'react-native';

export const showInfoMessage = (
  message: string,
  setSnackBarMessage: any,
  setSnackBarVisible: any
) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    setSnackBarMessage(message);
    setSnackBarMessage(true);
  }
};

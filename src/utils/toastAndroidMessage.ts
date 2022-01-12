import { ToastAndroid } from 'react-native';

export const showToastMessage = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

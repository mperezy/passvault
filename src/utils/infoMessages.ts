import { ToastAndroid } from 'react-native';

export const showInfoMessage = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

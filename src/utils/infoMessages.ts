import { ToastAndroid, Platform, Alert } from 'react-native';

export const showInfoMessage = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const customAlertMessage = (title: string, message: string, action: any) => {
  if (Platform.OS === 'web') {
    const response = confirm(message);
    if (response) {
      action();
    }
  } else {
    return Alert.alert(title, message, [
      {
        text: 'No',
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => action() },
    ]);
  }
};

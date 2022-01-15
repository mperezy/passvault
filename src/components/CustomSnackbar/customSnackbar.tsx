import React from 'react';
import { Snackbar } from 'react-native-paper';

// Reference for Icons usage: https://icons.expo.fyi/

export const CustomSnackbar = (props: {
  message: string;
  isSnackbarVisible: boolean;
  setSnackbarVisible: any;
}) => {
  const { message, isSnackbarVisible, setSnackbarVisible } = props;
  return (
    <Snackbar
      visible={isSnackbarVisible}
      onDismiss={() => setSnackbarVisible(!isSnackbarVisible)}
      duration={1500}
    >
      {message}
    </Snackbar>
  );
};

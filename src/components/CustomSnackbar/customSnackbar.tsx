import React from 'react';
import { Snackbar } from 'react-native-paper';

// Reference for Icons usage: https://icons.expo.fyi/

export const CustomSnackbar = ({ message, isSnackbarVisible, onDismiss }: Props) => (
  <Snackbar visible={isSnackbarVisible} onDismiss={onDismiss} duration={1500}>
    {message}
  </Snackbar>
);

interface Props {
  message: string;
  isSnackbarVisible: boolean;
  onDismiss: any;
}

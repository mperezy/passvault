import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { appColors } from 'utils/constants';

import { styles } from './styles';

export const CustomModal = (props: {
  visible: boolean;
  toggle: any;
  onSubmit: any;
  title: string;
  message: string;
  okButtonMessage: string;
  cancelButtonMessage: string;
}) => {
  const { visible, toggle, onSubmit, title, message, okButtonMessage, cancelButtonMessage } = props;

  return (
    <Modal isVisible={visible} onBackdropPress={toggle} onBackButtonPress={toggle}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <MaterialIcons.Button name='close' onPress={toggle} backgroundColor={appColors.red}>
              No
            </MaterialIcons.Button>
          </View>
          <View style={styles.button}>
            <MaterialIcons.Button
              name='check'
              onPress={onSubmit}
              backgroundColor={appColors.primary}
            >
              Yes
            </MaterialIcons.Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

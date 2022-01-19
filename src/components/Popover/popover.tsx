import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Popover } from 'react-native-modal-popover';
import { Feather } from '@expo/vector-icons';

import { popoverMessage } from 'utils/constants';
import { popoverStyles } from './styles';

export const CustomPopover = (props: {
  popoverVisible: boolean;
  closePopover: any;
  popoverAnchorRect: any;
  touchableRef: any;
  onPress: any;
}) => {
  const { popoverVisible, closePopover, popoverAnchorRect, touchableRef, onPress } = props;
  return (
    <>
      <TouchableOpacity ref={touchableRef} onPress={onPress}>
        <Feather name='info' size={20} color='black' />
      </TouchableOpacity>
      <Popover
        contentStyle={popoverStyles.content}
        arrowStyle={popoverStyles.arrow}
        backgroundStyle={popoverStyles.background}
        visible={popoverVisible}
        onClose={closePopover}
        fromRect={popoverAnchorRect}
        placement='top'
        supportedOrientations={['portrait', 'landscape']}
      >
        <Text>{popoverMessage}</Text>
      </Popover>
    </>
  );
};

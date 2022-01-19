import { Dimensions, StyleSheet } from 'react-native';

export const popoverStyles = StyleSheet.create({
  content: {
    width: Dimensions.get('screen').width * 0.45,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  arrow: {
    borderTopColor: 'white',
  },
  background: {
    backgroundColor: 'rgba(66,66,66,0.5)',
  },
});

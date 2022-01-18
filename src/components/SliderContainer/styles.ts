import { Platform, StyleSheet } from 'react-native';

const borderWidth = 4;

export const styles = StyleSheet.create({
  sliderContainer: {
    width: Platform.OS === 'web' ? '85%' : '80%',
    paddingVertical: 10,
    paddingLeft: 10,
    flexDirection: 'column',
  },
});

export const trackMarkStyles = StyleSheet.create({
  activeMark: {
    borderColor: 'red',
    borderWidth,
    left: -borderWidth / 2,
  },
  inactiveMark: {
    borderColor: 'grey',
    borderWidth,
    left: -borderWidth / 2,
  },
});

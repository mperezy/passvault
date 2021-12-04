import { StyleSheet } from 'react-native';

const borderWidth = 4;

export const styles = StyleSheet.create({
  sliderContainer: {
    width: '80%',
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

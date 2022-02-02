import { StyleSheet } from 'react-native';
import { appColors } from 'utils/constants';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  button: {
    position: 'absolute',
    backgroundColor: appColors.primary,
    borderRadius: 100,
    padding: 15,
  },
});

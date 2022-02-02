import { StyleSheet } from 'react-native';
import { appColors } from 'utils/constants';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 15,
    marginVertical: 5,
    marginBottom: 10,
  },

  dot: {
    height: 10,
    borderRadius: 10,
    backgroundColor: appColors.primaryDark,
    marginHorizontal: 8,
  },
});

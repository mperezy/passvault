import { StyleSheet } from 'react-native';
import { appColors } from 'utils/constants';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  image: {
    flex: 0.7,
    borderRadius: 3,
    justifyContent: 'center',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 5,
    color: appColors.primaryDark,
    textAlign: 'center',
  },

  description: {
    fontSize: 14,
    color: 'grey',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});

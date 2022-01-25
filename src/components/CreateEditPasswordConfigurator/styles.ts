import { StyleSheet } from 'react-native';

export const savePassword = StyleSheet.create({
  container: {
    padding: 10,
  },

  dropdown: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
    marginBottom: 10,
  },

  textLabel: { fontSize: 17, marginRight: 5, marginBottom: 5 },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});

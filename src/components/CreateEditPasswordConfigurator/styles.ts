import { Platform, StyleSheet } from 'react-native';

export const createEditPassword = StyleSheet.create({
  container: {
    padding: 10,
  },

  userInputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 10,
    marginBottom: 5,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Platform.OS === 'web' ? 7 : 8,
    paddingVertical: Platform.OS === 'web' ? 6 : 3,
    marginBottom: 5,
  },

  dropdown: {
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: Platform.OS === 'web' ? 7 : 8,
    paddingVertical: Platform.OS === 'web' ? 6 : 3,
  },

  textLabel: { fontSize: 17, marginRight: 5, marginBottom: 5 },

  descriptionLengthIndicator: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
});

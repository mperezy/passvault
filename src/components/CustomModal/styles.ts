import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

  title: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  message: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },

  input: {
    width: '90%',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 20,
    paddingVertical: 3,
    paddingHorizontal: 15,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },

  button: {
    paddingHorizontal: 5,
  },
});

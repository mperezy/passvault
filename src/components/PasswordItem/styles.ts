import { Platform, StyleSheet } from 'react-native';

export const item = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  socialIconAndPasswordInfo: { flex: 1, width: '50%', flexDirection: 'row', alignItems: 'center' },

  passwordAndDescription: {
    width: '81%',
    paddingHorizontal: 5,
    flexDirection: 'column',
  },

  descriptionTextLabel: { fontSize: 13, marginBottom: 5 },

  passwordInput: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' ? 15 : 14,
  },
});

export const icons = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  socialMedia: { width: 24, height: 24, marginRight: 10 },

  singleIcon: {
    marginRight: 10,
  },
});

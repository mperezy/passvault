import { Platform, StyleSheet } from 'react-native';

export const icons = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  singleIcon: {
    marginRight: 10,
  },

  socialMedia: { width: 24, height: 24, marginRight: 10 },
});

export const item = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 17,
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

  iconPasswordWrapper: { width: '50%', flexDirection: 'row', alignItems: 'center' },
});

export const input = StyleSheet.create({
  container: {
    width: '100%',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' ? 16 : 13,
  },
});

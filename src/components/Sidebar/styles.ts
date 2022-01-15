import { StyleSheet, Platform } from 'react-native';

export const imageBackground = StyleSheet.create({
  container: {
    width: undefined,
    padding: 16,
    paddingTop: 48,
  },
  name: {
    marginTop: 60,
    paddingHorizontal: 5,
    color: '#F0F0F0',
    backgroundColor: 'rgba(48, 145, 224, 0.6)',
    borderRadius: 5,
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
});

export const divider = StyleSheet.create({
  divider: {
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: '#464646',
  },
});

export const signout = StyleSheet.create({
  container: {
    backgroundColor: '#F3BBBB',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingLeft: Platform.OS === 'web' ? 19 : 17,
  },
  icon: {
    marginRight: 32,
  },
  text: {
    color: '#F11D1D',
  },
});

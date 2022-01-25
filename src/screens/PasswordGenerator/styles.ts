import { Platform, StyleSheet } from 'react-native';

export const screen = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
});

export const shadow = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export const cardView = StyleSheet.create({
  container: {
    width: '90%',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
  },
});

export const passwordStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  inputContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    width: Platform.OS === 'web' ? '85%' : '75%',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 10,
    textAlign: 'left',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' ? 16 : 20,
  },
  icons: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const configuration = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  textContainer: {
    margin: 10,
    justifyContent: 'flex-start',
  },
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  passwordLengthContainer: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inputLength: {
    width: Platform.OS === 'web' ? '15%' : '20%',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'white',
    paddingHorizontal: 7,
    paddingVertical: 10,
    marginRight: 5,
    borderRadius: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  lengthSliderContainer: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export const checkBox = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});

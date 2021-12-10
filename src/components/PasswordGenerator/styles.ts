import { StyleSheet } from 'react-native';

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

export const screen = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const passwordStyle = StyleSheet.create({
  container: {
    width: '90%',
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    flexDirection: 'row',
  },
  inputContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  input: {
    width: '75%',
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'white',
    paddingHorizontal: 100,
    paddingVertical: 7,
    borderRadius: 10,
    textAlign: 'center',
  },
  icons: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export const configuration = StyleSheet.create({
  container: {
    width: '90%',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
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
    margin: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  inputLength: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  lengthSliderContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export const checkBox = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-evenly',
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

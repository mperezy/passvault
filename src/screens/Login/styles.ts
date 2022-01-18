import { StyleSheet } from 'react-native';
import { appColors } from 'utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: { width: '80%' },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: appColors.primary,
    width: '70%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutLine: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: appColors.primary,
    borderWidth: 2,
  },
  buttonOutLineText: {
    color: '#4F4F4F',
    fontWeight: '700',
    fontSize: 16,
  },
  loginImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  tooltipImage: {},
  linkContainer: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  link: {},
  linkText: {
    fontSize: 15,
  },
});

export default styles;

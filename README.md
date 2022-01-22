# Passvault

- Passvault is a mobile/web application built in *react-native* using **Expo Go** framework which allows
us to generate random, configurable and possibly secure passwords, and if the user wants to, store them
by creating an account.

## Requirements

- Nodejs (By [nvm](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/?target=_blank) or [directly](https://nodejs.org/en/?target=_blank))
- [Yarn](https://linuxize.com/post/how-to-install-yarn-on-ubuntu-20-04/?target=_blank)
- [expo-cli](https://docs.expo.dev/get-started/installation/?target=_blank)

## Dependencies used

- **React ReduxJS Toolkit**: In order to manage a store to and write easy reducers and actions for app's state.
- **Redux Saga**: In order to manage redux side effect and consume API services, in this case Firebase.
- **Firebase**: In order to use Authentication for users management and Firestore Database to handling password storing.
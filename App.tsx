import React from 'react';

import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import Login from 'screens/Login/login';
import SignUp from 'screens/SignUp/signup';
import PasswordGenerator from 'screens/PasswordGenerator/passwordGenerator';
import PasswordList from 'screens/PasswordList/passwordList';

import store from 'reduxStore/store/index';
import { devWarnings } from 'utils/constants';

if (process.env.ENV === 'dev') {
  LogBox.ignoreLogs(devWarnings);
}

declare global {
  interface Window {
    store: any;
  }
}

window.store = store;
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name='PasswordGenerator' component={PasswordGenerator} />
          <Stack.Screen name='PasswordList' component={PasswordList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

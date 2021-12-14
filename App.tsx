import React from 'react';

import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import Login from 'components/Login/login';
import SignUp from 'components/SignUp/signup';
import PasswordGenerator from 'components/PasswordGenerator/passwordGenerator';

import PasswordList from 'components/PasswordList/passwordList';
import store from './src/redux/store/index';

if (process.env.ENV === 'dev') {
  LogBox.ignoreLogs([
    'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
  ]);
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

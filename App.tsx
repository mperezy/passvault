import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import Login from 'components/Login/login';
import SignUp from 'components/SignUp/signup';
import PasswordGenerator from 'components/PasswordGenerator/passwordGenerator';
import PasswordList from 'components/PasswordList/passwordList';

import store from './src/redux/store/index';

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

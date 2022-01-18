import React from 'react';

import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { Login } from 'screens/Login/login';
import { SignUp } from 'screens/SignUp/signup';
import { PasswordGenerator } from 'screens/PasswordGenerator/passwordGenerator';
import { CustomDrawer } from 'screens/Drawer/drawer';

import store from 'reduxStore/store/index';
import { devWarnings } from 'utils/constants';
// import { CustomStatusbar } from 'components/CustomStatusbar/customStatusbar';

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
      {/*<CustomStatusbar />*/}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            statusBarStyle: 'dark',
          }}
        >
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen
            name='PasswordGenerator'
            component={PasswordGenerator}
            options={{
              title: 'Password Generator (Only)',
              headerStyle: {
                backgroundColor: '#3091e0',
              },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name='CustomDrawer'
            component={CustomDrawer}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

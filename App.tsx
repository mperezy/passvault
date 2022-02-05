import React, { useEffect, useState } from 'react';

import { LogBox, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from 'react-redux';
import { OnBoarding } from 'screens/OnBoarding/onBoarding';
import { Login } from 'screens/Login/login';
import { SignUp } from 'screens/SignUp/signup';
import { PasswordGenerator } from 'screens/PasswordGenerator/passwordGenerator';
import { Drawer } from 'screens/Drawer/drawer';

import store from 'reduxStore/store/index';
import { devWarnings } from 'utils/constants';
import { CustomStatusbar } from 'components/CustomStatusbar/customStatusbar';
import { getOnBoardingViewed } from 'utils/localStorageFuncs';
import { LoadingIndicator } from 'components/LoadingIndicator/loadingIndicator';

if (process.env.ENV === 'dev') {
  LogBox.ignoreLogs(devWarnings);
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    store: any;
  }
}

window.store = store;
const Stack = createNativeStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [onBoardingViewed, setOnBoardingViewed] = useState(false);

  useEffect(() => {
    getOnBoardingViewed()
      .then((value) => {
        if (value === 'false' || value === undefined) {
          setOnBoardingViewed(false);
        } else {
          setOnBoardingViewed(true);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error checking is first launch: ', { err });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (onBoardingViewed === null) {
    return null;
  }
  return (
    <Provider store={store}>
      <CustomStatusbar />
      <NavigationContainer>
        <Stack.Navigator>
          {loading && (
            <Stack.Screen
              name='Loading'
              component={LoadingIndicator}
              options={{ headerShown: false }}
            />
          )}
          {!onBoardingViewed && Platform.OS !== 'web' && (
            <Stack.Screen
              name='OnBoarding'
              component={OnBoarding}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen
            name='PasswordGenerator'
            component={PasswordGenerator}
            options={{
              headerStyle: {
                backgroundColor: '#3091e0',
              },
              headerTintColor: '#FFF',
            }}
          />
          <Stack.Screen
            name='Drawer'
            component={Drawer}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

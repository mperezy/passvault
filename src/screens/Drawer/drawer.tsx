import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { PasswordList } from 'screens/PasswordList/passwordList';
import { PasswordGenerator } from 'screens/PasswordGenerator/passwordGenerator';
import { CustomSidebar } from 'components/Sidebar/sidebar';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const Drawer = createDrawerNavigator();

export const CustomDrawer = (props: { navigation: any }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width: Dimensions.get('window').width * 0.7,
        },
        drawerActiveBackgroundColor: '#9ac8fc',
        drawerActiveTintColor: '#3091e0',
        drawerItemStyle: {
          borderRadius: 5,
        },
      }}
      drawerContent={(props) => <CustomSidebar {...props} />}
    >
      <Drawer.Screen
        name='PasswordList'
        component={PasswordList}
        options={{
          title: 'Password List',
          headerStyle: {
            backgroundColor: '#3091e0',
          },
          headerTintColor: '#FFF',
          drawerIcon: ({ color, size }) => <Feather name='list' size={size * 0.75} color={color} />,
        }}
      />
      <Drawer.Screen
        name='PasswordGenerator'
        component={PasswordGenerator}
        options={{
          title: 'Password Generator',
          headerStyle: {
            backgroundColor: '#3091e0',
          },
          headerTintColor: '#FFF',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='engine-outline' size={size * 0.75} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

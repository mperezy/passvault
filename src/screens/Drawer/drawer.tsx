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
        // drawerHideStatusBarOnOpen: true,
        drawerStatusBarAnimation: 'slide',
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
          drawerIcon: ({ tintColor }) => <Feather name='list' size={24} color={tintColor} />,
        }}
      />
      <Drawer.Screen
        name='PasswordGenerator'
        component={PasswordGenerator}
        options={{
          title: 'Password Generator',
          drawerIcon: ({ tintColor }) => (
            <MaterialCommunityIcons name='engine-outline' size={24} color={tintColor} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

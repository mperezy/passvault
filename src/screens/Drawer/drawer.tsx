import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { PasswordList } from 'screens/PasswordList/passwordList';
import { CustomSidebar } from 'components/CustomSidebar/customSidebar';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';

const CustomDrawer = createDrawerNavigator();

export const Drawer = (props: { navigation: any }) => {
  return (
    <CustomDrawer.Navigator
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
      <CustomDrawer.Screen
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
    </CustomDrawer.Navigator>
  );
};

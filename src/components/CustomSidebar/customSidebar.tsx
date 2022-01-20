import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Image, View, Text, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Divider, Drawer } from 'react-native-paper';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { selectUserEmail } from 'reduxStore/slices/userSlice';
import { unsetPasswords, setIsCreateMode } from 'reduxStore/slices/passwordSlice';

import { signOut } from 'services/firebase';

import { imageBackground, divider, signout } from './styles';

export const CustomSidebar = (props: any) => {
  const userEmail = useSelector(selectUserEmail);
  const name = userEmail ? userEmail.substring(0, userEmail.indexOf('@')) : '';
  const userName = name.charAt(0).toUpperCase() + name.slice(1);
  const { navigation } = props;
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(dispatch(unsetPasswords()), navigation.replace('Login'));
  };

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('assets/img/sidebar-banner.png')}
        style={imageBackground.container}
      >
        <Text style={imageBackground.name}>Hi there, {userName} !</Text>
      </ImageBackground>
      <Drawer.Section title='Pages'>
        <ScrollView style={{ paddingTop: 10 }}>
          <DrawerItemList {...props} />
          <DrawerItem
            label='Password Generator'
            icon={({ color, size }) => (
              <MaterialCommunityIcons name='engine-outline' size={size * 0.75} color={color} />
            )}
            onPress={() => {
              navigation.closeDrawer();
              dispatch(setIsCreateMode({ isCreateMode: true }));
              navigation.navigate('PasswordGenerator');
            }}
          />
        </ScrollView>
      </Drawer.Section>

      <Drawer.Section>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialIcons name='logout' size={size * 0.75} color={color} />
          )}
          label='Sign out'
          onPress={handleSignOut}
        />
      </Drawer.Section>
    </SafeAreaProvider>
  );
};

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DrawerItemList, DrawerItem, DrawerNavigationProp } from '@react-navigation/drawer';
import { Text, ScrollView, ImageBackground } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Drawer } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { selectUserEmail } from 'reduxStore/slices/userSlice';
import { unsetPasswords, setIsCreateMode } from 'reduxStore/slices/passwordSlice';

import { signOut } from 'services/firebase';

import {
  DrawerDescriptorMap,
  // eslint-disable-next-line import/no-unresolved
} from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerNavigationState, ParamListBase } from '@react-navigation/routers';
import { imageBackground } from './styles';

export const CustomSidebar = (props: Props) => {
  const userEmail = useSelector(selectUserEmail);
  const name = userEmail ? userEmail.substring(0, userEmail.indexOf('@')) : '';
  const userName = name.charAt(0).toUpperCase() + name.slice(1);
  const { navigation } = props;
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut().then(() => {
      dispatch(unsetPasswords());
      navigation.replace('Login');
    });
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

interface Props {
  state: DrawerNavigationState<ParamListBase>;
  navigation: any;
  descriptors: DrawerDescriptorMap;
}

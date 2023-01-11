import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import SideBarContents from './SideBarContents';
import TabNavigation from '../Tab/TabNavigation';
import { Index } from '@mobile-nx-apps/clinc-container-v1';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      backBehavior="histroy"
      screenOptions={{
        swipeEnabled: true,
        drawerPosition: 'right',
        gestureEnabled: true,
      }}
      drawerContent={(props) => <SideBarContents {...props} />}
    >
      <Drawer.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Index}
        options={{ headerShown: false, swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

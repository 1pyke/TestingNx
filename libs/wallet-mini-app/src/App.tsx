import { Center, Text } from 'native-base';
import React from 'react';
import WalletIndex from "@mobile-nx-apps/wallet-mini-app";
import Landing from "./Features/LandingPage/Screens/Landing";
import DrawerNavigator from "./Navigator/Drawer/DrawerNavigator";
import {
  NavigationContainer,
} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <DrawerNavigator/>
    </NavigationContainer>
  );
};

export default App;

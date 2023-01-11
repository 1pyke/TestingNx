import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBarContents from './SideBarContents';
import TabNavigation from '../Tab/TabNavigation';
import Auth from '../StackNavigators/AuthPages/Auth';
import { ReferralIndex } from '@mobile-nx-apps/referral-mini-app';
import { HRindex } from '@mobile-nx-apps/hr-mini-app';
import { WalletIndex } from '@mobile-nx-apps/wallet-mini-app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducers } from '@mobile-nx-apps/auth-store';
import { Spinner } from 'native-base';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const layoutSore = useSelector((state) => state.finalLayoutStore);
  useEffect(() => {
    console.log('ppppppppp', layoutSore.searchFlag);
  }, [layoutSore.searchFlag]);
  const authStore = useSelector((state) => state.AuthStore);
  async function checkLogged(params) {
    try {
      let accessToken = await AsyncStorage.getItem('accessToken');
      let user = await AsyncStorage.getItem('user');
      accessToken = JSON.parse(accessToken);
      user = JSON.parse(user);
      if (accessToken && user) {
        await dispatch(reducers.logout());
        await dispatch(reducers.login({ accessToken, user }));
      }
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setLoader(true);
    checkLogged();
  }, []);
  return loader ? (
    <Spinner
      mt="250"
      color="#194569"
      size="lg"
      accessibilityLabel="Loading posts"
    />
  ) : (
    <Drawer.Navigator
      useLegacyImplementation
      backBehavior="histroy"
      screenOptions={{
        drawerPosition: 'right',
        gestureEnabled: true,
      }}
      drawerContent={(props) => <SideBarContents {...props} />}
    >
      {authStore.accessToken ? (
        <>
          <Drawer.Screen
            name="AllScreens"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Drawer.Screen
            name="Referral"
            component={ReferralIndex}
            options={{
              headerShown: false,
              swipeEnabled: false,
            }}
          />
          <Drawer.Screen
            name="HRindex"
            component={HRindex}
            options={{ headerShown: false, swipeEnabled: false }}
          />

          <Drawer.Screen
            name="WalletIndex"
            component={WalletIndex}
            options={{ headerShown: false, swipeEnabled: false }}
          />
        </>
      ) : (
        <Drawer.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false, swipeEnabled: false }}
        />
      )}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

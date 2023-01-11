import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import CustomSideMenu from './CustomSideMenu';
import TabNavigator from '../Tab/TabNavigator';
import {
  getAllTemplatesData,
  getAllEstablishment,
} from '../../services/service';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAllEstablishment,
  setPartners,
} from '../../Features/Feature1/referralSlice-store';
import { Index } from '@mobile-nx-apps/clinc-container-v1';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const authStore = useSelector((state) => state.AuthStore);
  const [establishment, setEstablishment] = useState(null);
  const dispatch = useDispatch();

  const getPartnersForEstablishments = (myArr) => {
    try {
      let partners = [];
      for (let i = 0; i < myArr.length; i++) {
        if (myArr[i].id === authStore?.user?.establishment?.id) {
          for (let j = 0; j < myArr[i]?.partners.length; j++) {
            partners.push(myArr[i].partners[j].id);
          }
        }
      }

      dispatch(setPartners(partners));
      return partners;
    } catch (error) {
      console.error(error);
    }
  };

  const getInfo = async () => {
    try {
      let response = await getAllEstablishment();
      dispatch(setAllEstablishment(response));
      setEstablishment(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      getInfo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log(
      authStore?.user?.facility,
      'AuthStore from ------/////////------'
    );
    // console.log('here we is useEffect ');
    if (establishment && authStore?.user) {
      console.warn('im inside useEffect if condition');
      let partners = getPartnersForEstablishments([...establishment]);
      let response = async () => {
        await getAllTemplatesData(
          {
            owners: [...partners, authStore?.user?.establishment.id],
            facility: authStore?.user?.facility,
            limit: 6,
            offset: 1,
          },
          dispatch,
          1
        );
      };
      response();
    }
  }, [establishment]);

  return (
    <Drawer.Navigator
      useLegacyImplementation
      backBehavior="histroy"
      screenOptions={{
        swipeEnabled: true,
        drawerPosition: 'right',
        gestureEnabled: true,
      }}
      drawerContent={(props) => <CustomSideMenu {...props} />}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
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

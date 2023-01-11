import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//////////////////Components///////////////////
import { CustomFooter } from './CustomFooter';
import WalletStack from '../Stack/WalletStack';
import { CustomHeader } from '../Stack/CustomHeader';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomFooter {...props} />}
      backBehavior="history"
    >
      <Tab.Screen
        name="stackNavigator"
        component={WalletStack}
        options={{ header: (props) => <CustomHeader {...props} /> }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

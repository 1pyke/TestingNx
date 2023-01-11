import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//////////////////Components///////////////////
import { CustomFooter } from './CustomFooter';
import { CustomHeader } from '../StackNavigators/CustomHeader';
import HrStackIndex from '../StackNavigators/HrStackIndex';
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomFooter {...props} />}
      backBehavior="history"
    >
      <Tab.Screen
        name="HrStackIndex"
        component={HrStackIndex}
        options={{ header: (props) => <CustomHeader {...props} /> }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

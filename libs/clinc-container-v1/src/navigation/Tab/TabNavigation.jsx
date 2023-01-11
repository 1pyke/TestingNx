import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//////////////////Components///////////////////
import CustomFooter from './CustomFooter';
import CustomHeader from '../StackNavigators/CustomHeader';
import index from '../StackNavigators/FeaturesScreens';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomFooter {...props} />}
      backBehavior="history"
    >
      <Tab.Screen
        name="stackNavigator"
        component={index}
        options={{ header: (props) => <CustomHeader {...props} /> }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

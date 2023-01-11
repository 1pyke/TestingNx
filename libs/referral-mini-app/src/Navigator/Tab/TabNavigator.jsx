import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackIndex from '../Stack/StackIndex';
import { CustomFooter } from './CustomFooter';
import { CustomHeader } from '../Stack/CustomHeader';
// import Stack from '../Stack/featureNavigator';
// import Header from '../Stack/Header';
const Tabs = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tabs.Navigator
      backBehavior="history"
      tabBar={(props) => <CustomFooter {...props} />}
    >
      <Tabs.Screen
        options={{ header: (props) => <CustomHeader {...props} /> }}
        name="StackNavigator"
        component={StackIndex} />
    </Tabs.Navigator>
  )
}

export default TabNavigation
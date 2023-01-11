import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../../../Feature/Dashboard/Dashboard';
import DashboradCards from '../../../Feature/Dashboard/components/DashboradCards';

const Stack = createNativeStackNavigator();
const DashboradScreens = () => {
  return (
    <Stack.Navigator screenOptions={{
        animation:'slide_from_right',
        gestureEnabled:true,
        headerBackButtonMenuEnabled:false,
        headerShown: false
      }}>
    <Stack.Screen
    name="Dashboard"
    component={Dashboard}
  />
   <Stack.Screen
            name="DashboradCards"
            component={DashboradCards}
          />
    </Stack.Navigator>
  )
}

export default DashboradScreens
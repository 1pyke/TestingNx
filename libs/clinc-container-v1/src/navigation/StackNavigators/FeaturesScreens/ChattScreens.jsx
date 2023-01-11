import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chatt from '../../../Feature/Chatt/Screens/Chatt';

const Stack = createNativeStackNavigator();
const ChattScrenns = () => {
  return (
    <Stack.Navigator screenOptions={{
        animation:'slide_from_right',
        gestureEnabled:true,
        headerBackButtonMenuEnabled:false,
        headerShown: false
    }}>
        <Stack.Screen
            name="Chatt"
            component={Chatt}
          />
    </Stack.Navigator>
  )
}

export default ChattScrenns
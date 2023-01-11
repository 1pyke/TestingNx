import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './StackNavigators/Home';
import Vouchers from '../../Features/Feature1/Screens/Vouchers';
import VoucherDetails from '../../Features/Feature1/Screens/VoucherDetails';

const Stacks = createNativeStackNavigator();

const Stack = () => {
  return (
    <Stacks.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        gestureEnabled: true,
        headerBackButtonMenuEnabled: false,
        headerShown: false,
      }}
    >
      <Stacks.Screen name="Vouchers" component={Vouchers} />
      <Stacks.Screen name="VoucherDetails" component={VoucherDetails} />
      <Stacks.Screen name="Home" component={Home} />
    </Stacks.Navigator>
  );
};

export default Stack;

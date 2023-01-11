import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../Features/LandingPage/Screens/Landing';
import Transactions from '../../Features/LandingPage/Screens/Transactions';
import CashIn from '../../Features/LandingPage/Screens/CashIn';
import CashDataScreen from '../../Features/LandingPage/Screens/CashDataScreen';
import TransactionDetails from '../../Features/LandingPage/Screens/TransactionDetails';
const Stack = createNativeStackNavigator();
const WalletStack = () => {
  const screenOptions = {
    animation: 'slide_from_right',
    gestureEnabled: true,
    headerBackButtonMenuEnabled: false,
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="transactions" component={Transactions} />
      <Stack.Screen name={'cash-in'} component={CashIn} />
      <Stack.Screen name={'cash-details'} component={CashDataScreen} />
      <Stack.Screen
        name={'transactions-details'}
        component={TransactionDetails}
      />
    </Stack.Navigator>
  );
};

export default WalletStack;

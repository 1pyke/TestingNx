import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppointmentsReceptionist from '../../../Feature/Dashboard/components/AppointmentsReceptionist';
import AppointmentsReceptionistProfile from '../../../Feature/MyProfile/Screens/AppointmentsReceptionistProfile';

const Stack = createNativeStackNavigator();

const AppointmentScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        gestureEnabled: true,
        headerBackButtonMenuEnabled: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="AppointmentsReceptionist"
        component={AppointmentsReceptionist}
      />
      <Stack.Screen
        name="AppointmentsReceptionistProfile"
        component={AppointmentsReceptionistProfile}
      />
    </Stack.Navigator>
  );
};

export default AppointmentScreens;

import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HRScreens from './FeaturesScreens/HRScreens';
import LeaveScreen from '../../Feature/HR/screens/LeaveScreen';
import AttendanceHistoryForEmployee from '../../Feature/HR/screens/AttendanceHistoryForEmployee';
import MissingPunchScreen from '../../Feature/HR/screens/MissingPunchScreen';
///manger screens
import LeaveScreenManager from '../../Feature/HR/screens/LeaveScreenManager';
import MissingPunchScreenManager from '../../Feature/HR/screens/MissingPunchScreenManager';
import TimeAttendanceManager from '../../Feature/HR/screens/TimeAttendanceManager';
import ActionsScreenManager from '../../Feature/HR/screens/ActionsScreenManager';
import MyProfileScreen from '../../Feature/HR/screens/MyProfile/MyProfileScreen';
const HrStackIndex = () => {
  const Stacks = createNativeStackNavigator();

  return (
    <Stacks.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        gestureEnabled: true,
        headerBackButtonMenuEnabled: false,
        headerShown: false,
      }}
    >
      {/* <Stacks.Screen name="HRScreens" component={HRScreens} /> */}
      <Stacks.Screen name="LeaveScreen" component={LeaveScreen} />
      <Stacks.Screen
        name="AttendanceHistoryForEmployee"
        component={AttendanceHistoryForEmployee}
      />
      {/*<Stacks.Screen name="MissingPunchScreen" component={MissingPunchScreen} />*/}
      <Stacks.Screen name="LeaveScreenManager" component={LeaveScreenManager} />
      {/*<Stacks.Screen*/}
      {/*  name="MissingPunchScreenManager"*/}
      {/*  component={MissingPunchScreenManager}*/}
      {/*/>*/}
      <Stacks.Screen
        name="TimeAttendanceManager"
        component={TimeAttendanceManager}
      />
      <Stacks.Screen
        name="ActionsScreenManager"
        component={ActionsScreenManager}
      />
      <Stacks.Screen name="MyProfileScreen" component={MyProfileScreen} />
    </Stacks.Navigator>
  );
};

export default HrStackIndex;

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AttendanceHistoryForEmployee from '../../../Feature/HR/screens/AttendanceHistoryForEmployee';
// import AllLeaveRequestsHistory from '../../../Feature/HR/screens/AllLeaveRequestsHistory';
// import AllTimeAttendanceHistory from '../../../Feature/HR/screens/AllTimeAttendanceHistory';
// import MissingPunchHistory from '../../../Feature/HR/screens/MissingPunchHistory';
// import LeaveHistoryForEmployee from '../../../Feature/HR/screens/LeaveHistoryForEmployee';
// import HrManager from '../../../Feature/HR/screens/ManagerProvider';
// import
const Stack = createNativeStackNavigator();

const HRScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_bottom',
        gestureEnabled: true,
        headerBackButtonMenuEnabled: false,
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
            name="HrManager"
            component={HrManager}

          />
          <Stack.Screen
            name="LeaveHistoryForEmployee"
            component={LeaveHistoryForEmployee}

          />
          <Stack.Screen
            name="AttendanceHistoryForEmployee"
            component={AttendanceHistoryForEmployee}

          />
          <Stack.Screen
            name="AllLeaveRequestsHistory"
            component={AllLeaveRequestsHistory}

          />
          <Stack.Screen
            name="AllTimeAttendanceHistory"
            component={AllTimeAttendanceHistory}

          />
          <Stack.Screen
            name="MissingPunchHistory"
            component={MissingPunchHistory}

          /> */}
    </Stack.Navigator>
  );
};

export default HRScreens;

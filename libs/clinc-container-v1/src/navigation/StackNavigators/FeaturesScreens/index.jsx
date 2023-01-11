import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Components
import SearchScreen from '../../../Feature/Search/SearchScreen';
import Header from '../../../sharedComponents/FinalLayout/Header';
import BillingLandingPage from '../../../Feature/Billing/Screens/BillingLandingPage';
import ProviderLandingPage from '../../../Feature/Provider/Screens/ProviderLandingPage';
import ProviderFullView from '../../../Feature/Provider/Screens/ProviderFullView';
import TasksLandingPage from '../../../Feature/Tasks/Screens/TasksLandingPage';
import TasksCharts from '../../../Feature/Tasks/Screens/TasksCharts';
import Calendar from '../../../sharedComponents/calendar/screens/Calendar.jsx';
import LibraryTest from '../../../sharedComponents/FinalLayout/LibraryTest';
import CreateTask from '../../../Feature/Tasks/Screens/CreateTask';
import TaskFullView from '../../../Feature/Tasks/Screens/TaskFullView';
import HeaderSearch from '../../../sharedComponents/FinalLayout/HeaderSearch';
import AppointmentScreens from './AppointmentScreens';
import DashboradScreens from './DashboradScreens';
import ChattScreens from './ChattScreens';
import Agora from '../../../Feature/agora/Agora';
import AgoraVidoCall from '../../../Feature/agora/AgoraVidoCall';
import {
  AppointmenIndex,
  CreateAppointments,
  AppointmentDetails,
  Reschedule,
  ConsumerCard,
  SelectPatient,
  MyConsumers,
} from '@mobile-nx-apps/appointment-mini-app';
import { DashboardIcons } from '@mobile-nx-apps/quick-actions-mini-app';
import { AllServices, ServiceFullView } from '@mobile-nx-apps/service-mini-app';

import AppointmentsReceptionistProfile from '../../../Feature/MyProfile/Screens/AppointmentsReceptionistProfile';
// import DailyRoutineIndex from '@mobile-nx-apps/DailyRoutine'

const Stack = createNativeStackNavigator();
const Index = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        gestureEnabled: true,
        headerBackButtonMenuEnabled: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="DashboradScreens" component={DashboradScreens} />
      <Stack.Screen name="MyConsumers" component={MyConsumers} />
      <Stack.Screen name="ConsumerCard" component={ConsumerCard} />
      <Stack.Screen name="ServiceFullView" component={ServiceFullView} />
      <Stack.Screen name="AllServices" component={AllServices} />
      <Stack.Screen name="DashboardIcons" component={DashboardIcons} />
      <Stack.Screen name="Agora" component={Agora} />
      <Stack.Screen name="AgoraVidoCall" component={AgoraVidoCall} />
      <Stack.Screen name="Reschedule" component={Reschedule} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen name="AppointmentScreens" component={AppointmentScreens} />
      <Stack.Screen name="ChattScreens" component={ChattScreens} />
      <Stack.Screen name="LibraryTest" component={LibraryTest} />
      <Stack.Screen name="BillingLandingPage" component={BillingLandingPage} />
      <Stack.Screen name="AppointmenIndex" component={AppointmenIndex} />
      <Stack.Screen name="CreateAppointments" component={CreateAppointments} />
      <Stack.Screen
        name="AppointmentsReceptionistProfile"
        component={AppointmentsReceptionistProfile}
      />
      <Stack.Screen
        name="ProviderLandingPage"
        component={ProviderLandingPage}
      />
      <Stack.Screen name="ProviderFullView" component={ProviderFullView} />
      <Stack.Screen
        name="TasksCharts"
        component={TasksCharts}
        options={{ title: 'Tasks', header: (props) => <Header {...props} /> }}
      />
      <Stack.Screen
        name="TasksLandingPage"
        component={TasksLandingPage}
        options={{ title: 'Tasks' }}
      />
      <Stack.Screen name="calendar" component={Calendar} />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ header: (props) => <HeaderSearch {...props} /> }}
      />
      <Stack.Screen name="createTask" component={CreateTask} />
      <Stack.Screen name="TaskFullView" component={TaskFullView} />
    </Stack.Navigator>
  );
};

export default Index;

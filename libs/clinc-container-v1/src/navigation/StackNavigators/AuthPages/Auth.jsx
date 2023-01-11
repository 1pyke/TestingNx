import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingAuth from '../../../Feature/CIAM/screens/LandingAuth';
import SignIn from '../../../Feature/CIAM/screens/Signin';
import ForgetPassword from '../../../Feature/CIAM/screens/ForgetPassword';
import SignUp from '../../../Feature/CIAM/screens/Signup';

const Stack = createNativeStackNavigator();
const Auth = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade_from_bottom',
        gestureEnabled: true,
        headerBackButtonMenuEnabled: false,
      }}
    >
      <Stack.Screen
        name="LandingAuth"
        component={LandingAuth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTitle: '',
          headerBackTitle: 'Back',
          headerBackTitleStyle: { fontSize: '20' },
          headerStyle: { backgroundColor: '#FFFAFA' },
          headerShadowVisible: false,
          headerTintColor: '#5f84a2',
        }}
      />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTitle: '',
          headerBackTitle: 'Back',
          headerBackTitleStyle: { fontSize: '20' },
          headerStyle: { backgroundColor: '#FFFAFA' },
          headerShadowVisible: false,
          headerTintColor: '#5f84a2',
        }}
      />
    </Stack.Navigator>
  );
};

export default Auth;

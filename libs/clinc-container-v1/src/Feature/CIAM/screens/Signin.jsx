import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Spinner,
  View,
  KeyboardAvoidingView,
} from 'native-base';
import { useDispatch } from 'react-redux';
import { closeloginFlagHandler } from '../../../sharedComponents/FinalLayout/store-finalLayout';
import { reducers } from '@mobile-nx-apps/auth-store';
import { useFocusEffect } from '@react-navigation/native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { requestBuilder } from '../../../requestBuilder';
const SignIn = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [userObj, setUserObj] = useState({
    username: '',
    password: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  }

  useFocusEffect(
    React.useCallback(() => {
      dispatch(closeloginFlagHandler());
      setIsAuthenticated(false);
    }, [])
  );
  const signInAuthentication = async (results) => {
    if (results.data.accessToken) {
      try {
        console.log('this is decoded', results);
        await dispatch(reducers.login(results.data));
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    } else {
      dispatch(closeloginFlagHandler());
      setLoader(false);
      setIsAuthenticated(true);
    }
  };
  const signInHandler = async () => {
    setLoader(true);
    try {
      const request = await requestBuilder('ciam/user/signin', {
        username: userObj.username,
        password: userObj.password,
        cimMtEstablishmentId:
          'CIM-CIE-JOR-f4a79461-1292-40a2-8a31-327210267be8',
        cimMtFacilityId: 'CIM-CIF-JOR-bd8e072d-1614-4e3b-93f2-7055978ec2cb',
        firebaseToken: 'Test-ing Firebase',
      });
      // cimMtEstablishmentId:
      //     'CIM-CIE-JOR-d4d7dece-84dd-4056-a0ef-f7c0eadd1562',
      //   cimMtFacilityId: 'CIM-CIF-JOR-bd19e686-ceb4-4abd-b849-3b13323ad206',
      signInAuthentication(request);
    } catch (error) {
      console.log('====================================');
      console.log(error.response);
      console.log('====================================');
      dispatch(closeloginFlagHandler());
      setLoader(false);
      setIsAuthenticated(true);
    }
  };
  return (
    <KeyboardAvoidingView
      h={{
        base: '100%',
        lg: 'auto',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View w={'100%'} h={'100%'} bg={'#FFFAFA'}>
        {loader && (
          <Spinner
            mt="250"
            color="#194569"
            size="lg"
            accessibilityLabel="Loading posts"
          />
        )}
        {loader === false && (
          <Center flex={1} px="3" w="100%" mb={'30%'}>
            <Box safeArea p="2" py="8" w="90%" maxW="290">
              <Heading
                size="lg"
                fontWeight="600"
                color="#5F84A2"
                _dark={{ color: 'warmGray.50' }}
              >
                Laser Avenue
              </Heading>
              <Heading
                mt="1"
                _dark={{ color: 'warmGray.200' }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
              >
                Sign in to continue!
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Email ID</FormControl.Label>
                  <Input
                    onChangeText={(value) =>
                      setUserObj({ ...userObj, username: value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Password</FormControl.Label>
                  <Input
                    onChangeText={(value) =>
                      setUserObj({ ...userObj, password: value })
                    }
                    type="password"
                  />
                  <Link
                    _text={{
                      fontSize: 'xs',
                      fontWeight: '500',
                      color: '#5F84A2',
                      textDecorationLine: 'none',
                    }}
                    onPress={() => navigation.navigate('ForgetPassword')}
                    alignSelf="flex-end"
                    mt="1"
                  >
                    Forget Password?
                  </Link>
                </FormControl>
                {isAuthenticated && (
                  <FormControl.Label>
                    <Text style={{ textAlign: 'center', color: 'red' }}>
                      {' '}
                      The Email address or Password you entered is invalid{' '}
                    </Text>
                  </FormControl.Label>
                )}
                <Button
                  mt="2"
                  style={{ backgroundColor: 'rgba(25, 69, 105, 1)' }}
                  onPress={() => signInHandler()}
                >
                  Sign in
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text
                    fontSize="sm"
                    color="coolGray.600"
                    _dark={{ color: 'warmGray.200' }}
                  >
                    I'm a new user.{' '}
                  </Text>
                  <Link
                    _text={{
                      color: '#5F84A2',
                      fontWeight: 'medium',
                      fontSize: 'sm',
                      textDecorationLine: 'none',
                    }}
                    onPress={() => navigation.navigate('SignUp')}
                  >
                    Sign Up
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};
export default SignIn;

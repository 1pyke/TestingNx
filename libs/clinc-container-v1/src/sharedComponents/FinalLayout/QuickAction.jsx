import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Modal,
  Stagger,
  useDisclose,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { View, Platform, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { requestBuilder } from '../../requestBuilder';
// import {
//   updateCheckStatus,
//   updateCheckInTrue,
//   updateCheckInFalse,
//   updateCheckOutTrue,
//   updateCheckOutFalse,
// } from '../../Feature/HR/store-Hr';

const QuickAction = ({ navigation }) => {
  // const hrStore = useSelector((state) => state.hrStore);
  // const [checkOutFlag,setCheckOutFlag] = useState(hrStore.checkOutFlag)
  // const [checkInFlag,setcheckInFlag] = useState(hrStore.checkInFlag)
  const dispatch = useDispatch();
  const dashboardStore = useSelector((state) => state.dashboard);

  const [isBiometricSupport, setisBiometricSupport] = useState(false);
  const [isAuthenticatedOnCheckIn, setIsAuthenticatedOnCheckIn] =
    useState(false);
  const [isAuthenticatedOnCheckOut, setIsAuthenticatedOnCheckOut] =
    useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setisBiometricSupport(compatible);
    })();
  });

  async function onAuthenticateCheckIn() {
    try {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authnticate with Touch Id',
        fallbackLabel: 'Enter Password',
      });
      console.log(auth);
      if (auth.success) {
        checkInHandler();
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
    // .then(result =>{
    // setIsAuthenticatedOnCheckIn(result.success);
    // console.log(result)
    // })
  }
  async function onAuthenticateCheckOut() {
    try {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authnticate with Touch Id',
        fallbackLabel: 'Enter Password',
      });
      if (auth.success) {
        checkOutHandler();
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
    // auth.then(result =>{
    //   setIsAuthenticatedOnCheckOut(result.success);
    //   console.log(result.success)
    // })
  }
  //CheckIn Handler
  async function checkInHandler() {
    // try {
    //   await axios(
    //     requestBuilder('hr', '/checkInClicked', 'post', {
    //       providerUuid: dashboardStore.providerId,
    //       employeeName:hrStore.employeesData[0].firstName + ' ' +hrStore.employeesData[0].lastName,
    //       EmployeeId:hrStore.employeesData[0].id,
    //     })
    //   )
    // dispatch(updateCheckInTrue());
    // dispatch(updateCheckOutFalse());
    // dispatch(updateCheckStatus());
    //     onToggle()
    // } catch (error) {
    //   console.log(error);
    // }
  }
  //Chevkin Handler

  //Checkout Handler
  async function checkOutHandler() {
    try {
      await axios(
        requestBuilder('hr', '/checkOutClicked', 'put', {
          providerUuid: dashboardStore.providerId,
          status: 'out',
        })
      );
      // dispatch(updateCheckInFalse());
      // dispatch(updateCheckOutTrue());
      // dispatch(updateCheckStatus());
      onToggle();
    } catch (error) {
      console.log(error);
    }
  }
  //Checkout Handler
  const { isOpen, onToggle } = useDisclose();
  const createTaskNavigate = () => {
    navigation.navigate('createTask');
    onToggle();
  };
  const openQuickAction = () => {
    onToggle();
    setModalVisible(!modalVisible);
    // const checkInFlag = hrStore.checkInFlag
  };
  const calendarNavigate = () => {
    navigation.navigate('CreateAppointments');
    onToggle();
    setModalVisible(!modalVisible);
    console.log(
      '/////////////////',
      navigation.getState()?.routes[0]?.state?.routes[0]?.state?.routes[
        navigation?.getState()?.routes[0]?.state?.routes[0]?.state?.routes
          .length - 1
      ].name
    );
  };
  const createNotificationNavigate = () => {
    navigation.navigate('CreateNotification');
    onToggle();
    setModalVisible(!modalVisible);
  };
  return (
    <View>
      {navigation?.getState()?.routes[0]?.state?.routes[0]?.state?.routes[
        navigation?.getState()?.routes[0]?.state?.routes[0]?.state?.routes
          .length - 1
      ].name !== 'CreateAppointments' && (
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            position: 'absolute',
            zIndex: 10,
          }}
        >
          <Box
            alignItems="center"
            minH="220"
            style={{
              position: 'absolute',
              bottom: Platform.OS === 'ios' ? 45 : 45,
              zIndex: 10,
            }}
          >
            <Modal isOpen={modalVisible} onClose={() => openQuickAction()}>
              <Stagger
                visible={isOpen}
                initial={{
                  opacity: 0,
                  scale: 0,
                  translateY: 20,
                }}
                animate={{
                  translateY: 0,
                  scale: 1,
                  opacity: 1,
                  transition: {
                    type: 'spring',
                    mass: 0.8,
                    stagger: {
                      offset: 30,
                      reverse: true,
                    },
                  },
                }}
                exit={{
                  translateX: 20,
                  scale: 0.9,
                  opacity: 0,
                  transition: {
                    duration: 100,
                    stagger: {
                      offset: 30,
                      reverse: true,
                    },
                  },
                }}
              >
                {/* <View> */}
                {/* {!hrStore.checkInFlag  && (
 <IconButton onPress={onAuthenticateCheckIn} mb="4" variant="solid" bg="indigo.500" colorScheme="indigo" borderRadius="full" icon={<Icon as={MaterialCommunityIcons} size="6" name="account-multiple-check" _dark={{
  color: "warmGray.50"
}} color="black" />} />
      )}
      {!hrStore.checkOutFlag && (
        <IconButton  onPress={onAuthenticateCheckOut} mb="4" variant="solid" bg="indigo.500" colorScheme="indigo" borderRadius="full" icon={<Icon as={Ionicons} size="6" name="enter-outline" _dark={{
        color: "warmGray.50"
      }} color="black" />} />
      )} */}
                {/* </View> */}
                <IconButton
                  ml={32}
                  mr={2}
                  left={'25%'}
                  top={'480%'}
                  onPress={calendarNavigate}
                  mb="3"
                  variant="solid"
                  bg="#91AEC4"
                  colorScheme="#91AEC4"
                  borderRadius="full"
                  icon={
                    <Icon
                      as={MaterialCommunityIcons}
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      size="7"
                      name="book-plus-outline"
                      color="#194569"
                    />
                  }
                />
                <IconButton
                  mr={3}
                  left={'25%'}
                  top={Platform.OS === 'ios' ? '440%' : '410%'}
                  onPress={createNotificationNavigate}
                  mb="3"
                  variant="solid"
                  bg="#91AEC4"
                  colorScheme="#91AEC4"
                  borderRadius="full"
                  icon={
                    <Icon
                      as={MaterialCommunityIcons}
                      size="7"
                      name="bell-plus-outline"
                      _dark={{
                        color: '#00796b',
                      }}
                      color="#194569"
                    />
                  }
                />
                <IconButton
                  left={60}
                  top={Platform.OS === 'ios' ? '460%' : '410%'}
                  onPress={createNotificationNavigate}
                  mb="3"
                  variant="solid"
                  bg="#91AEC4"
                  colorScheme="#91AEC4"
                  borderRadius="full"
                  icon={
                    <Icon
                      as={Ionicons}
                      size="7"
                      name="enter-outline"
                      _dark={{
                        color: '#00796b',
                      }}
                      color="#194569"
                    />
                  }
                />
              </Stagger>
            </Modal>
          </Box>
          <HStack alignItems="center">
            <IconButton
              variant="solid"
              borderRadius="full"
              size="lg"
              onPress={openQuickAction}
              bg={modalVisible ? '#194569' : '#5F84A2'}
              shadow={9}
              icon={
                <Icon
                  as={MaterialCommunityIcons}
                  size="xl"
                  name="lightning-bolt-outline"
                  color="white"
                />
              }
            />
          </HStack>
        </View>
      )}
    </View>
  );
};

export default QuickAction;
const style = StyleSheet.create({});

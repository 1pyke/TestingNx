import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, Pressable } from 'react-native';
import {
  Button,
  HStack,
  Box,
  Heading,
  Avatar,
  Center,
  VStack,
} from 'native-base';
import { FlatList, Spacer, NativeBaseProvider } from 'native-base';
import axios from 'axios';
import { requestBuilder } from '../../../requestBuilder';
import Icon from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
function Appointment({ navigation }) {
  const dashboardStore = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      getAppointments();
    }, [])
  );

  const [data, setData] = useState([]);
  const [appointmentData, setAppointmentData] = useState([]);
  const [ALLappointmentNumber, setALLappointmentNumber] = useState(0);

  async function getAppointments() {
    try {
      await axios(requestBuilder('appointments', '/appointments', 'get')).then(
        (results) => appontmentHandler(results)
      );
    } catch (error) {
      console.log('errrrore', error);
    }
  }
  function appontmentHandler(results) {
    if (results.data.success) {
      setALLappointmentNumber(results.data.Appointments.length);
      let rr = [];
      for (let i = 0; i < results.data.Appointments.length; i++) {
        if (i < 5) {
          rr.push({
            fullName: results.data.Appointments[i].doctorname,
            avatarUrl:
              'https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=2000',
            id: results.data.Appointments[i].appid,
            timeStamp: results.data.Appointments[i].start,
            recentText: results.data.Appointments[i].patientname,
          });
        }
      }
      rr.sort((a, b) => a.timeStamp - b.timeStamp);
      setAppointmentData(rr);
    } else {
      setAppointmentData([]);
      setALLappointmentNumber(0);
      hightStyle();
    }
  }
  function hightStyle() {
    if (ALLappointmentNumber >= 5) {
      return 760;
    }
    if (ALLappointmentNumber == 0) {
      return 350;
    }
    if (ALLappointmentNumber < 5 && ALLappointmentNumber > 0) {
      return parseInt(ALLappointmentNumber) * 200;
    }
  }
  function styleAppoint(params) {
    return {
      backgroundColor: '#EEEEEE',
      marginTop: 110,
      width: '90%',
      marginLeft: '5%',
      marginBottom: 80,
      height: hightStyle(),
    };
  }

  return (
    <View>
      <View>
        <Box
          shadow={9}
          style={styleAppoint()}
          w="90%"
          rounded="xl"
          _text={{
            fontSize: 'md',
            fontWeight: 'medium',
            color: 'warmGray.50',
          }}
        >
          <Pressable
            variant="ghost"
            onPress={() => navigation.navigate('AppointmentLandingPage')}
          >
            <Avatar
              shadow={9}
              bg="teal"
              alignSelf="center"
              size="xl"
              style={{ position: 'absolute', top: -30 }}
            ></Avatar>
          </Pressable>
          <VStack space={3} mt="100">
            <Box>
              <Center fontSize="xl">
                <Text style={{ fontSize: 20, color: 'gray.200' }}>
                  {' '}
                  TOTAL APPOINTMENTS
                </Text>
              </Center>
              <Center pb="20">
                <Text style={{ fontSize: 30, color: 'teal' }}>
                  + {ALLappointmentNumber}
                </Text>
              </Center>
              <HStack style={{ marginBottom: 30 }}>
                {ALLappointmentNumber <= 5 && ALLappointmentNumber !== 0 && (
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 17,
                      color: 'teal',
                      marginBottom: 18,
                      paddingTop: 6,
                    }}
                  >
                    Next {ALLappointmentNumber} Appointments
                  </Text>
                )}
                {ALLappointmentNumber > 5 && (
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 17,
                      color: 'teal',
                      marginBottom: 18,
                      paddingTop: 6,
                    }}
                  >
                    Next 5 Appointments
                  </Text>
                )}

                {ALLappointmentNumber == 0 && (
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 17,
                      color: 'teal',
                      marginBottom: 18,
                      paddingTop: 6,
                    }}
                  >
                    No Appointments{' '}
                  </Text>
                )}
                <Button
                  variant="ghost"
                  bg="#d4d4d4"
                  onPress={() => navigation.navigate('AppointmentLandingPage')}
                  style={{ width: 69, height: 32, marginLeft: 80 }}
                  shadow={1}
                >
                  <Text style={{ fontSize: 10 }}>See More</Text>
                </Button>
              </HStack>
              {appointmentData.map((item) => (
                <Box
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: 'gray.600',
                  }}
                  borderColor="gray.300"
                  pl="4"
                  pr="5"
                  py="2"
                >
                  <HStack
                    shadow={1}
                    space={3}
                    justifyContent="space-between"
                    style={{ height: 70, paddingTop: 20 }}
                  >
                    <Avatar
                      size="48px"
                      source={{
                        uri: item.avatarUrl,
                      }}
                    />
                    <VStack>
                      <Text style={{ color: '#191A19' }}>{item.fullName}</Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: 'warmGray.200',
                        }}
                      >
                        Patient Name : {item.recentText}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Icon
                      name="calendar"
                      style={{ position: 'absolute', right: '27%' }}
                    />
                    <Text
                      style={{ fontSize: 10, position: 'absolute', right: 0 }}
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800"
                    >
                      {' '}
                      {item.timeStamp}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </Box>
          </VStack>
        </Box>
      </View>
    </View>
  );
}

export default Appointment;

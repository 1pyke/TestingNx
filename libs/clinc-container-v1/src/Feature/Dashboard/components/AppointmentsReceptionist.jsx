import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {
  HStack,
  Box,
  Heading,
  Avatar,
  Center,
  VStack,
  Button,
  Spacer,
} from 'native-base';
import axios from 'axios';
import { requestBuilder } from '../../../requestBuilder';
import Icon from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  modalVisibleHandler,
  AdditionalAppointmentDataHandler,
  fullViewAppHandler,
} from '../store-dashboard';
function Appointment({ navigation }) {
  const dashboardStore = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const [appointmentData, setAppointmentData] = useState([]);
  const [date, setDate] = useState(
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10)
  );
  useFocusEffect(
    React.useCallback(() => {
      console.log('dashboardStoredashboardStore', dashboardStore.providerId);
      getAppointments();
    }, [])
  );
  useFocusEffect(
    React.useCallback(() => {
      getAppointments();
    }, [dashboardStore.FullViewAppFlag])
  );
  function AddPriorityColor(payload) {
    if (payload === 'low') {
      return '#54BAB9';
    }
    if (payload === 'high') {
      return '#BB6464';
    }
    if (payload === 'medium') {
      return '#C6D57E';
    }
  }
  async function getAppointments() {
    setAppointmentData([]);
    try {
      await axios(
        requestBuilder('appointments', '/appointments/Date/:date', 'get', {
          date,
        })
      ).then((results) => {
        if (results.data.Response) {
          let appointmentData = results.data.Response;
          // console.log('qqqqqqqqq', appointmentData);

          for (let i = 0; i < appointmentData.length; i++) {
            if (appointmentData[i].TimeFrom == null) {
              appointmentData[i].TimefromParsed = 24;
              console.log('xxxxxxxxxxx');
            } else {
              let TimefromParsed =
                appointmentData[i].TimeFrom[0] +
                appointmentData[i].TimeFrom[1] +
                '.' +
                appointmentData[i].TimeFrom[3] +
                appointmentData[i].TimeFrom[4];
              appointmentData[i].TimefromParsed = parseFloat(TimefromParsed);
              console.log('mmmmmmmmmm');
            }
          }

          let sortedData = appointmentData.sort(function (a, b) {
            return a.TimefromParsed - b.TimefromParsed;
          });
          setAppointmentData(sortedData);
          dispatch(
            AdditionalAppointmentDataHandler(
              sortedData.slice(4, sortedData.length)
            )
          );
        }
      });
    } catch (error) {
      console.log('errrrore', error);
    }

    // if (appointmentData.length > 5) {

    // }
  }
  function stautsColor(status) {
    if (status === 'Scheduled' || status === 'Confirmed') return 'white';
    else if (status === 'Completed') return 'gray';
    else return 'lightgray';
  }
  return (
    <View>
      <View>
        <Box
          shadow={9}
          style={styles.styleAppoint}
          w="90%"
          rounded="xl"
          _text={{
            fontSize: 'md',
            fontWeight: 'medium',
          }}
        >
          <View>
            <Image style={styles.image1} />
          </View>
          <VStack space={3} mt="100" mb="3">
            <Box>
              <View style={{ position: 'absolute', top: -80, right: 10 }}>
                <Center fontSize="xl">
                  <Text style={{ fontSize: 14, color: 'teal' }}>
                    {' '}
                    TODAY APPOINTMENTS
                  </Text>
                </Center>
                <Center pb="20">
                  <Text style={{ fontSize: 30, color: 'teal' }}>
                    {appointmentData.length}
                  </Text>
                </Center>
              </View>
              {appointmentData.slice(0, 4).map((item, index, row) => {
                return (
                  <TouchableOpacity
                    onPress={() => dispatch(fullViewAppHandler(item))}
                    style={{ padding: 8 }}
                  >
                    <View>
                      <Box style={styles.section22}>
                        <HStack
                          style={{
                            borderLeftWidth: 8,
                            borderColor: AddPriorityColor(item.Priorty),
                            borderRadius: 10,
                            backgroundColor: stautsColor(item.Status),
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.0,
                            elevation: 24,
                          }}
                          space={3}
                          justifyContent="space-between"
                        >
                          <Avatar
                            size="44px"
                            style={{ marginTop: 15, marginLeft: 3 }}
                            source={
                              item.Consumer_img
                                ? { uri: item.Consumer_img }
                                : {
                                    uri: 'https://myupchar-banner.s3.ap-south-1.amazonaws.com/widget/avatar/doctor-avatar-female.png',
                                  }
                            }
                          />
                          <VStack>
                            <Heading
                              bold
                              style={{
                                color: '#346751', //change this
                                paddingTop: 4,
                                fontSize: 14,
                                marginBottom: 10,
                              }}
                            >
                              PN:{item.Consumer_Name}
                            </Heading>
                            {item.services.length > 2 && (
                              <View>
                                <Text
                                  style={{
                                    position: 'absolute',
                                    left: '25%',
                                    bottom: -10,
                                    fontSize: 10,
                                    color: 'red',
                                  }}
                                >
                                  ...More
                                </Text>
                                <Text>
                                  Services:{' '}
                                  {item.services
                                    .slice(0, 2)
                                    .map((item, index, row) => (
                                      <Text
                                        style={{
                                          fontSize: 12,
                                        }}
                                      >
                                        {item.Services_name}
                                        {index + 1 !== row.length && (
                                          <Text
                                            style={{
                                              color: 'red',
                                              fontSize: 15,
                                            }}
                                          >
                                            {' '}
                                            ,{' '}
                                          </Text>
                                        )}
                                      </Text>
                                    ))}{' '}
                                </Text>
                              </View>
                            )}
                            {item.services.length <= 2 && (
                              <Text
                                style={{
                                  marginBottom: Platform.OS === 'ios' ? 15 : 0,
                                }}
                              >
                                Services:{' '}
                                {item.services.map((item, index, row) => (
                                  <Text
                                    style={{
                                      fontSize: Platform.OS === 'ios' ? 9 : 12,
                                      flexWrap: 'wrap',
                                    }}
                                  >
                                    {item.Services_name}
                                    {index + 1 !== row.length && (
                                      <Text
                                        style={{
                                          color: 'red',
                                          fontSize: 15,
                                        }}
                                      >
                                        {' '}
                                        ,{' '}
                                      </Text>
                                    )}
                                  </Text>
                                ))}
                              </Text>
                            )}
                          </VStack>
                          <Spacer />
                          <Text
                            style={{
                              fontSize: 10,
                              position: 'absolute',
                              right: 0,
                              top: 10,
                            }}
                          >
                            <Icon
                              name="md-time-outline"
                              style={{ position: 'absolute', right: '27%' }}
                            />{' '}
                            {item.TimeFrom} To{' '}
                            <Icon
                              name="md-time-outline"
                              style={{ position: 'absolute', right: '27%' }}
                            />
                            {item.TimeTo}{' '}
                          </Text>
                        </HStack>
                      </Box>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Box>
          </VStack>
          {appointmentData.length > 4 && (
            <TouchableOpacity>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Button
                  style={{ backgroundColor: 'teal' }}
                  onPress={() => {
                    dispatch(modalVisibleHandler());
                  }}
                >
                  Show More
                </Button>
              </View>
            </TouchableOpacity>
          )}
        </Box>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image1: {
    position: 'absolute',
    top: -40,
    left: 20,
    width: 100,
    height: 100,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  section22: {
    marginBottom: 4,
    shadowColor: 'teal',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 5,
  },
  styleAppoint: {
    backgroundColor: 'white',
    marginTop: 50,
    width: '90%',
    marginLeft: '5%',
    marginBottom: 80,
    padding: 6,
  },
});
export default Appointment;

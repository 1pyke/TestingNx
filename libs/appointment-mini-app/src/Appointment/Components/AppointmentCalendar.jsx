import { Agenda } from 'react-native-calendars';
import React, { useEffect, useState } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { Images } from '@mobile-nx-apps/clinc-container-v1';
import {
  AspectRatio,
  Box,
  HStack,
  Image,
  View,
  Text,
  Spinner,
  Heading,
  VStack,
} from 'native-base';
import { ScrollView } from 'native-base';
import AppointmentRenderItemActions from './AppointmentRenderItemActions';
import { useSelector } from 'react-redux';
const { requestBuilder } = require('../../../requestBuilder');

const AppointmentCalendar = ({ setValue }) => {
  const facilityDetails = useSelector(
    (state) => state.AuthStore.user.facility.id
  );
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    getAllAppointment();
    console.log(facilityDetails, 'useruseruseruser');
    wait(1).then(() => setRefreshing(false));
  };
  const [loader, setLoader] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [getAllAppointments, setAllAppointments] = useState();
  const getAllAppointment = async () => {
    try {
      const result = await requestBuilder('/appointments/getAppointments', {
        date: selectedDate,
        recordStatus: 'LATEST',
        facility: facilityDetails.id,
      });
      setAllAppointments(result.data);
      setLoader(false);
      // dispacth(increment(getAllAppointments.rows.length));
      console.log(result.data.rows.length, '///////');
      await setValue(result.data.rows.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllAppointment();
  }, [selectedDate]);
  const CreateAppointmentCalendarTime = () => {
    return (
      <>
        {loader && (
          <View
            bg={'#FFFAFA'}
            h={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Spinner accessibilityLabel="Loading posts" />
            <Heading alignSelf={'center'} color="#5F84A2" fontSize="md">
              Loading
            </Heading>
          </View>
        )}
        {loader === false && (
          <ScrollView
            h={'100%'}
            bg={'#FFFAFA'}
            refreshControl={
              <RefreshControl
                tintColor={'#5F84A2'}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
            {getAllAppointments.rows.length > 0 ? (
              <View h={'100%'}>
                {getAllAppointments?.rows?.map((Appointment, i) => (
                  <HStack
                    mb={Platform.OS === 'ios' ? '9%' : '5%'}
                    h={180}
                    maxW={'86%'}
                  >
                    <Box
                      mb={Platform.OS === 'ios' ? '9%' : '5%'}
                      h={'100%'}
                      alignItems="center"
                    >
                      <Box
                        justifyContent={'center'}
                        height={'100%'}
                        w={'95%'}
                        rounded="lg"
                        overflow="hidden"
                        borderColor="coolGray.200"
                        borderWidth="1"
                        _light={{
                          backgroundColor: 'gray.50',
                        }}
                      >
                        <AppointmentRenderItemActions
                          appointmentDetails={Appointment}
                        />
                        <HStack ml={'3%'}>
                          <AspectRatio w="25%" bottom={'5%'} ratio={16 / 9}>
                            <Image
                              size={70}
                              borderRadius={100}
                              source={
                                Appointment?.consumer?.image
                                  ? { uri: Appointment?.consumer?.image }
                                  : Images.Doctor
                              }
                              alt="image"
                            />
                          </AspectRatio>
                          <VStack bottom={'3%'} w={'100%'}>
                            <Text
                              color={'rgba(0,0,0,0.6)'}
                              mb={'2%'}
                              fontSize={12}
                            >
                              Provider : {Appointment?.provider?.name?.en}
                            </Text>
                            <Text
                              color={'rgba(0,0,0,0.6)'}
                              fontSize={12}
                              mb={'2%'}
                            >
                              Consumer : {Appointment?.consumer?.name?.en}
                            </Text>
                            <Text color={'rgba(0,0,0,0.6)'} fontSize={12}>
                              Status : {Appointment.status.name.en}
                            </Text>
                            {/* <Button
                              onPress={() => {
                                console.log(getAllAppointments.rows.length);
                              }}
                            >
                              CliCK me
                            </Button> */}
                          </VStack>
                        </HStack>
                        <HStack>
                          <Text fontSize={12} color={'muted.400'} ml={'15%'}>
                            {
                              Appointment?.services[0]?.service?.serviceInfo
                                ?.name?.en
                            }
                          </Text>
                          <Text
                            fontSize={12}
                            color={'muted.400'}
                            ml={'15%'}
                            mb={'4%'}
                          >
                            {Appointment?.timeFrom} - {Appointment?.timeTo}
                          </Text>
                        </HStack>
                      </Box>
                    </Box>
                  </HStack>
                ))}
              </View>
            ) : (
              <Text
                alignSelf={'center'}
                justifyContent={'center'}
                color={'#5F84A2'}
              >
                {' '}
                No Appointments in this date
              </Text>
            )}
          </ScrollView>
        )}
      </>
    );
  };
  return (
    <View bg={'#FFFAFA'} h={'100%'} w={'100%'} flex={1}>
      <Agenda
        minDate={new Date(new Date().setDate(new Date().getDate()))
          .toISOString()
          .slice(0, 10)}
        enableSwipeMonths={false}
        pagingEnabled={true}
        onDayPress={(day) => {
          setLoader(true);
          console.log('im out side');
          setSelectedDate(day.dateString);
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#5F84A2',
            selectedTextColor: '#FFFAFA',
          },
        }}
        pastScrollRange={2}
        futureScrollRange={2}
        hideExtraDays={true}
        markingType={'custom'}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        renderEmptyData={CreateAppointmentCalendarTime}
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: '#5F84A2',
          agendaTodayColor: 'red',
          agendaKnobColor: '#5F84A2',
          calendarBackground: '#FFFAFA',
        }}
      />
    </View>
  );
};

export default AppointmentCalendar;

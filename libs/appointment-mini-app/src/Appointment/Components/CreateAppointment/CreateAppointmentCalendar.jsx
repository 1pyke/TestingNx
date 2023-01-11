import { Agenda } from 'react-native-calendars';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import {
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  ScrollView,
  Spinner,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import { setNewAppointment } from '../../store-Appointment';
import { useDispatch, useSelector } from 'react-redux';
const { requestBuilder } = require('../../../requestBuilder');
const AppointmentCalendar = ({ setValidations }) => {
  const [modalVisible2, setModalVisible2] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const appointmentStore = useSelector((state) => state.AppointmentStore);
  const [week, setWeek] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [selectedTimeFrom, setSelectedTimeFrom] = useState();
  const [selectedTimeTo, setSelectedTimeTo] = useState();
  const [dayName, setDayName] = useState(new Date().toDateString().slice(0, 3));
  const [workingHours, setWorkingHours] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDayHours, setSelectedDayHours] = useState([]);
  const [flag, setflag] = useState(false);
  useEffect(() => {
    dispatch(
      setNewAppointment({
        name: 'date',
        value: selectedDate,
      })
    );
    dispatch(
      setNewAppointment({
        name: 'timeFrom',
        value: selectedTimeFrom,
      })
    );
    dispatch(
      setNewAppointment({
        name: 'timeTo',
        value: selectedTimeTo,
      })
    );
    console.log(selectedTimeFrom, '_________________');
    console.log(selectedTimeTo, '_________________');
  }, [selectedTimeTo]);
  useEffect(() => {
    console.log();
    if (workingHours?.length > 0)
      setSelectedDayHours(
        workingHours.filter(
          (day) =>
            day?.day?.en?.slice(0, 3).toLowerCase() === dayName.toLowerCase()
        )
      );
  }, [dayName, workingHours]);
  useEffect(() => {
    if (selectedDayHours.length > 0) {
      let days = [];
      let hours = +selectedDayHours[0]?.time[0]?.from?.slice(0, 2);
      let mins = +selectedDayHours[0]?.time[0]?.from?.slice(3, 5);
      mins -= 15;
      while (
        hours < selectedDayHours[0]?.time[0]?.to?.slice(0, 2) &&
        hours + '' + mins !==
          +selectedDayHours[0]?.time[0]?.to?.slice(0, 2) +
            '' +
            +selectedDayHours[0]?.time[0]?.to?.slice(3, 5)
      ) {
        mins += 15;
        if (mins === 60) {
          hours += 1;
          mins = 0;
        }
        let testMins = mins.length === 1 ? '0' + mins : mins;
        // console.log(selectedDate+' '+selectedDayHours[0]?.time[0]?.from,new Date(selectedDate,selectedDayHours[0]?.time[0]?.from).getTime(),'++++++++++');
        // console.log(hours+''+mins, +(new Date().getHours()+''+new Date().getMinutes()), +(hours+''+mins) > +(new Date().getHours()+''+new Date().getMinutes()), '______');
        if (selectedDate === new Date().toISOString().slice(0, 10)) {
          if (+hours >= +new Date().getHours()) days.push(hours + ':' + mins);
        } else {
          days.push(hours + ':' + mins);
        }
      }
      // filter available times by appointments
      for (let i = 0; i < appointments.length; i++) {
        console.log(appointments[i].timeFrom, '||||', appointments[i].timeTo);
        let timeFrom =
          +appointments[i].timeFrom?.slice(0, 2) +
          '' +
          +appointments[i].timeFrom?.slice(3, 5);
        let timeTo =
          +appointments[i].timeTo?.slice(0, 2) +
          '' +
          +appointments[i].timeTo?.slice(3, 5);
        let hoursFrom = +appointments[i].timeFrom?.slice(0, 2);
        let minsFrom = +appointments[i].timeFrom?.slice(3, 5);
        let flag = false;
        for (let j = 0; j < days.length; j++) {
          if (days[j].split(':').join('') === timeFrom) flag = true;
          // console.log(days[j].split(':').join(''), timeTo, '~~~~~~~~~~~~~!!!');
          if (days[j].split(':').join('') >= timeTo) flag = false;
          if (flag) {
            days.splice(j, 1);
            j--;
            mins += 15;
            if (mins === 60) {
              hoursFrom += 1;
              minsFrom = 0;
            }
          }
        }
      }
      setWeek(days);
    }
  }, [selectedDayHours, appointments]);
  // getWorkingHours
  useEffect(() => {
    async function getWorkingHours() {
      try {
        const result = await requestBuilder(
          '/hr/profile/getEmployeeWithWorkingHours',
          {
            ids: [appointmentStore?.body?.provider?.cimMtUserId],
          }
        );
        setWorkingHours(
          result?.data[0]?.contract?.shiftTemplate?.shiftTemplateDays
        );
        if (workingHours.length > 1) {
          setflag(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getWorkingHours();
  }, [appointmentStore?.body?.provider]);
  // getWorkingHours
  useEffect(() => {
    async function getAppointments() {
      try {
        const result = await requestBuilder('/appointments/getAppointments', {
          provider: appointmentStore?.body?.provider?.id,
          date: selectedDate,
          recordStatus: 'LATEST',
          facility: 'FAC-FCF-JOR-1bf94704-d0c4-4766-ad03-0c2f26fecd46',
        });
        setAppointments(result.data.rows);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    }
    getAppointments();
  }, [selectedDate]);
  ///////////////////////////////////////////////////////////
  const AppointmentStore = useSelector((state) => state.AppointmentStore);
  const [loader, setLoader] = useState(true);
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
        <ScrollView bg={'#FFFAFA'}>
          {loader === false && (
            <VStack>
              <Heading
                color={'#5F84A2'}
                fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                mt={5}
              >
                Available Time
              </Heading>
              <HStack w="100%" my={5} mx={2} alignSelf="center" flexWrap="wrap">
                {week?.length > 1 ? (
                  week.map((time, i) => (
                    <Button
                      key={i}
                      bg={
                        +selectedTimeFrom?.split(':')[0] +
                          ':' +
                          +selectedTimeFrom?.split(':')[1] ===
                        time
                          ? '#5F84A2'
                          : '#FFFAFA'
                      }
                      borderRadius={10}
                      borderWidth={2}
                      borderColor={'#5F84A2'}
                      onPress={async () => {
                        setValidations(true);
                        let hours = time.split(':')[0];
                        let mins = time.split(':')[1];
                        let durationHours = 0;
                        let durationMins = 0;
                        for (
                          let i = 0;
                          i < appointmentStore?.body?.services?.length;
                          i++
                        ) {
                          durationHours +=
                            +appointmentStore?.body?.services[
                              i
                            ]?.serviceName?.duration.split(':')[0];
                          durationMins +=
                            +appointmentStore?.body?.services[
                              i
                            ]?.serviceName?.duration.split(':')[1];
                          if (durationMins === 60) {
                            durationHours += 1;
                            durationMins = 0;
                          }
                        }
                        hours = +hours + durationHours;
                        mins = +mins + durationMins;
                        if (mins === 60) {
                          hours += 1;
                          mins = 0;
                        }
                        mins = mins.toString().length === 1 ? '0' + mins : mins;

                        if (
                          +(hours + '' + mins) >
                          +(
                            selectedDayHours[0]?.time[0]?.to.split(':')[0] +
                            '' +
                            selectedDayHours[0]?.time[0]?.to.split(':')[1]
                          )
                        ) {
                          if (!modalVisible2) {
                            console.log('cant fit the time');
                            await setSelectedTimeFrom(null);
                            setflag(true);
                          } else {
                            setflag(false);

                            let hh =
                              time.split(':')[0].length === 1
                                ? '0' + time.split(':')[0]
                                : time.split(':')[0];
                            let mm =
                              time.split(':')[1].length === 1
                                ? '0' + time.split(':')[1]
                                : time.split(':')[1];
                            await setSelectedTimeFrom(hh + ':' + mm);
                            hours =
                              hours.toString().length === 1
                                ? '0' + hours
                                : hours + '';
                            mins =
                              mins.toString().length === 1
                                ? '0' + mins
                                : mins + '';
                            setLoader(false);
                            await setSelectedTimeTo(hours + ':' + mins);
                          }
                        } else {
                          let hh =
                            time.split(':')[0].length === 1
                              ? '0' + time.split(':')[0]
                              : time.split(':')[0];
                          let mm =
                            time.split(':')[1].length === 1
                              ? '0' + time.split(':')[1]
                              : time.split(':')[1];
                          await setSelectedTimeFrom(hh + ':' + mm);
                          hours =
                            hours.toString().length === 1
                              ? '0' + hours
                              : hours + '';
                          mins =
                            mins.toString().length === 1
                              ? '0' + mins
                              : mins + '';
                          setLoader(false);
                          await setSelectedTimeTo(hours + ':' + mins);
                        }
                        // changigStore();
                      }}
                      w="22%"
                      m={1}
                    >
                      <VStack alignItems="center" w="100%">
                        <Text
                          fontWeight="bold"
                          fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                          color={
                            +selectedTimeFrom?.split(':')[0] +
                              ':' +
                              +selectedTimeFrom?.split(':')[1] ===
                            time
                              ? '#FFFAFA'
                              : '#5F84A2'
                          }
                        >
                          {time.split(':')[0].length === 1
                            ? '0' + time.split(':')[0]
                            : time.split(':')[0]}
                          :
                          {time.split(':')[1].length === 1
                            ? '0' + time.split(':')[1]
                            : time.split(':')[1]}
                        </Text>
                      </VStack>
                    </Button>
                  ))
                ) : (
                  <Center
                    h={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Heading color={'#194569'}>No Available Times</Heading>
                  </Center>
                )}
              </HStack>
            </VStack>
          )}
          {flag && (
            <Center>
              <Modal
                isOpen={flag}
                onClose={() => setflag(false)}
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
              >
                <Modal.Content>
                  <Modal.CloseButton />
                  <Modal.Header bg={'#194569'}>
                    <Text color={'white'}>Appointments at Doctor Vacation</Text>
                  </Modal.Header>
                  <Modal.Body>
                    <Text color={'#194569'}>
                      Are you sure you want to book an Appointment out of the
                      doctor's working hours ?
                    </Text>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button
                        onPress={() => {
                          setflag(false);
                          setModalVisible2(false);
                        }}
                        variant="ghost"
                        colorScheme="blueGray"
                      >
                        Decline
                      </Button>
                      <Button
                        bg={'#5F84A2'}
                        onPress={() => {
                          setModalVisible2(true);
                          setflag(false);
                        }}
                      >
                        Confirm
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </Center>
          )}
        </ScrollView>
      </>
    );
  };
  const dispatch = useDispatch();
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
          setSelectedDate(day.dateString);
          setDayName(new Date(day.timestamp).toDateString().slice(0, 3));
          setSelectedTimeFrom();
          setSelectedTimeTo();
          setModalVisible2(false);
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
      {/* <CreateAppointmentCalendarTime /> */}
    </View>
  );
};
export default AppointmentCalendar;

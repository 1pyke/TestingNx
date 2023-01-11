import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Platform, ScrollView } from 'react-native';
import requestBuilder from '../../../../requestBuilder';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from '@expo/vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Title from '../shared/Title';
import FormInput from '../shared/FormInput';
import { getFormattedDate } from '../../util/dateFormatting';
import {
  Text,
  HStack,
  Button,
  VStack,
  Select,
  CheckIcon,
  Input,
  Modal,
} from 'native-base';

const MissingPunchRequestModal = ({
  showMissingPunchDialog,
  setShowMissingPunchDialog,
  timeAttendanceData,
  employeeData,
}) => {
  const tokenStore = useSelector((state) => state.dashboard);
  const [employeeLeaveInformation, setEmployeeLeaveInformation] = useState({
    name: employeeData.firstName ? employeeData.firstName : '',
  });
  const [position, setPosition] = useState('');
  const [selectedDateForCheckIn, setSelectedDateForCheckIn] = useState('');
  const [selectedDateForCheckOut, setSelectedDateForCheckOut] = useState('');
  const [timesStatus, setTimesStatus] = useState(false);
  const [checkInstatus, setCheckInstatus] = useState(false);
  const [checkOutStatus, setCheckOutStatus] = useState(false);
  ///////////////////////
  const [missingDaysArrForCheckIn, setMissingDaysArrForCheckIn] = useState([]);
  const [missingDaysArrForCheckOut, setMissingDaysArrForCheckOut] = useState(
    []
  );
  ////////////////////////////
  const [reasonForMissingPunch, setReasonForMissingPunch] = useState('');
  const [dateInform, setDateInform] = useState({
    missingPunchDateForCheckInAndOut: new Date(),
    missingPunchDateForCheckInAndOutPicker: '',
    showDateInOut: false,
  });
  const [timeOneInform, setTimeOneInform] = useState({
    timeFromForMissingPunch: new Date(),
    showTimeOne: false,
    timeFromForMissingPunchPicker: '',
    timePickerCheckInStatus: true,
  });
  const [timeTwoInform, setTimeTwoInform] = useState({
    timeToForMissingPunch: new Date(),
    showTimeTwo: false,
    timeToForMissingPunchPicker: '',
    timePickerCheckOutStatus: true,
  });
  ///////////////////////////
  ///toggeling status for showing check in  or check out
  const handleSelectType = (status) => {
    setPosition(status);
    if (status == 'Check In & Check Out') {
      setTimesStatus(true);
      setCheckInstatus(false);
      setCheckOutStatus(false);
    } else if (status == 'Check In') {
      setCheckInstatus(true);
      setTimesStatus(false);
      setCheckOutStatus(false);
    } else {
      setCheckOutStatus(true);
      setCheckInstatus(false);
      setTimesStatus(false);
    }
  };
  /////////////////////////
  ///handle time change for check and check out together
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    let hourS = currentDate.getHours() + '';
    if (hourS.length === 1) hourS = '0' + hourS;
    let minutes = currentDate.getMinutes() + '';
    if (minutes.length === 1) minutes = '0' + minutes;
    if (Platform.OS === 'ios') {
      setTimeOneInform({
        ...timeOneInform,
        timeFromForMissingPunchPicker: hourS + ':' + minutes,
        timeFromForMissingPunch: currentDate,
        // showTimeOne: false,
        timePickerCheckInStatus: false,
      });
    } else {
      setTimeOneInform({
        ...timeOneInform,
        timeFromForMissingPunchPicker: hourS + ':' + minutes,
        timeFromForMissingPunch: currentDate,
        showTimeOne: false,
        timePickerCheckInStatus: false,
      });
    }
    //  setTimeFromForMissingPunch(currentDate);
    // setShowTimeOne(false);
    // setTimePickerCheckInStatus(false);
  };

  const showTime = () => {
    setTimeOneInform({ ...timeOneInform, showTimeOne: true });
  };
  const onChangeTime2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    let hourS = currentDate.getHours() + '';
    if (hourS.length === 1) hourS = '0' + hourS;
    let minutes = currentDate.getMinutes() + '';
    if (minutes.length === 1) minutes = '0' + minutes;
    if (Platform.OS === 'ios') {
      setTimeTwoInform({
        ...timeTwoInform,
        timeToForMissingPunchPicker: hourS + ':' + minutes,
        timeToForMissingPunch: currentDate,
        // showTimeTwo: false,
        timePickerCheckOutStatus: false,
      });
    } else {
      setTimeTwoInform({
        ...timeTwoInform,
        timeToForMissingPunchPicker: hourS + ':' + minutes,
        timeToForMissingPunch: currentDate,
        showTimeTwo: false,
        timePickerCheckOutStatus: false,
      });
    }
  };

  const showTime2 = () => {
    setTimeTwoInform({ ...timeTwoInform, showTimeTwo: true });
  };
  ///////////////////////////////////////////
  ///missing days for check in and out that's bring list of missed days for employee
  const missingDaysForCheckIn = () => {
    let arr = [];

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = getFormattedDate(new Date());
    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let thisMonth = firstDay.toISOString().slice(0, 10);

    timeAttendanceData.forEach((item) => {
      if (
        item.date >= thisMonth &&
        item.date < currentDate &&
        (item.checkIn === null || item.checkIn == '' || item.checkIn == 'null')
      ) {
        arr.push(item.date);
      }
    });
    if (arr.length > 0) {
      setMissingDaysArrForCheckIn(arr);
    } else {
      setMissingDaysArrForCheckIn([]);
    }
    return arr;
  };
  const missingDaysForCheckOut = () => {
    let arr = [];
    let todayDate = new Date();
    let day = todayDate.getDate();
    let month = todayDate.getMonth() + 1;
    let year = todayDate.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-0${month}-${day}`;
    // let todayDate = new Date().toISOString().slice(0, 10);
    let date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let thisMonth = firstDay.toISOString().slice(0, 10);
    // console.log(todayDate, "todayDate");
    timeAttendanceData.forEach((item) => {
      if (
        item.date >= thisMonth &&
        item.date < currentDate &&
        (item.checkOut == null ||
          item.checkOut == '' ||
          item.checkOut == 'null')
      ) {
        arr.push(item.date);
      }
    });
    if (arr.length > 0) {
      setMissingDaysArrForCheckOut(arr);
    } else {
      setMissingDaysArrForCheckOut([]);
    }
    return arr;
  };
  /////////////////////////

  const handleReasonChangeMissingPunch = (e) => {
    let val = e.nativeEvent.text;
    setReasonForMissingPunch(val);
  };
  //////////////////////////
  const onChangeDate = (event, selectedDate) => {
    let realDate = getFormattedDate(selectedDate);
    const currentDate = selectedDate;
    setDateInform({
      ...dateInform,
      missingPunchDateForCheckInAndOut: currentDate,
      missingPunchDateForCheckInAndOutPicker: realDate,
      showDateInOut: false,
    });
  };
  const showDateMissingPunch = () => {
    setDateInform({
      ...dateInform,
      showDateInOut: true,
    });
  };
  ////////////////////////////
  useEffect(() => {
    setSelectedDateForCheckIn(selectedDateForCheckIn); // This will always use latest value of count
  }, [selectedDateForCheckIn]);

  /////////////////////////////
  const handleSubmitRequestForMissingPunch = (
    position,
    selectedDateForCheckIn,
    selectedDateForCheckOut
  ) => {
    try {
      // if (Platform.OS === 'ios') {
      // let timeOne = timeOneInform['timeFromForMissingPunch']
      //   .toLocaleTimeString()
      //   .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
      // var hours1 = Number(timeOne.match(/^(\d+)/)[1]);
      // var minutes1 = Number(timeOne.match(/:(\d+)/)[1]);
      // var AMPM1 = timeOne.match(/\s(.*)$/)[1];
      // if (AMPM1 === 'PM' && hours1 < 12) hours1 = hours1 + 12;
      // if (AMPM1 === 'AM' && hours1 === 12) hours1 = hours1 - 12;
      // var sHours1 = hours1.toString();
      // var sMinutes1 = minutes1.toString();
      // if (hours1 < 10) sHours1 = '0' + sHours1;
      // if (minutes1 < 10) sMinutes1 = '0' + sMinutes1;
      // let finalTimeOne = sHours1 + ':' + sMinutes1;
      // ///////
      // let timeTwo = timeTwoInform['timeToForMissingPunch']
      //   .toLocaleTimeString()
      //   .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');

      // var hours = Number(timeTwo.match(/^(\d+)/)[1]);
      // var minutes = Number(timeTwo.match(/:(\d+)/)[1]);
      // var AMPM = timeTwo.match(/\s(.*)$/)[1];
      // if (AMPM === 'PM' && hours < 12) hours = hours + 12;
      // if (AMPM === 'AM' && hours === 12) hours = hours - 12;
      // var sHours = hours.toString();
      // var sMinutes = minutes.toString();
      // if (hours < 10) sHours = '0' + sHours;
      // if (minutes < 10) sMinutes = '0' + sMinutes;
      // let finalTimeTwo = sHours + ':' + sMinutes;
      // let { name } = employeeLeaveInformation;
      if (position == 'Check In') {
        const typePicker = position !== '';
        const checkInDatePicker = selectedDateForCheckIn !== '';
        const reasonPicker = reasonForMissingPunch !== '';

        if (
          !typePicker ||
          !checkInDatePicker ||
          !reasonPicker ||
          timeOneInform['timePickerCheckInStatus']
        ) {
          Alert.alert('Ivalid Inputs', 'Please fill all inputs');
          return;
        }
        axios(
          requestBuilder('hr', '/hr/missingPunchRequestCheckIn', 'put', {
            providerUuid: tokenStore.providerId,
            timeFromForMissingPunch: timeOneInform['timeFromForMissingPunch']
              .toLocaleTimeString()
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
            reasonForMissingPunchRequest: reasonForMissingPunch,
            applyDateForMissingPunch: selectedDateForCheckIn,
          })
        ).then(() => {
          Alert.alert('Missing Punch', 'Request sent successfully', [
            { text: 'Okay', onPress: () => setShowMissingPunchDialog(false) },
          ]);
        });
      } else if (position == 'Check In & Check Out') {
        const typePicker = position !== '';
        const reasonPicker = reasonForMissingPunch !== '';

        if (
          !typePicker ||
          !reasonPicker ||
          timeOneInform['timePickerCheckInStatus'] ||
          timeTwoInform['timePickerCheckOutStatus']
        ) {
          Alert.alert('Ivaild Inputs', 'Please fill all inputs');
          return;
        }
        console.log(
          timeOneInform['timeFromForMissingPunch']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          timeOneInform['timeFromForMissingPunch']
        );
        axios(
          requestBuilder('hr', '/hr/missingPunchForBoth', 'post', {
            providerUuid: tokenStore.providerId,
            employeeName: employeeData.firstName,
            timeFromForMissingPunch: timeOneInform['timeFromForMissingPunch']
              .toLocaleTimeString()
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
            timeToForMissingPunch: timeTwoInform['timeToForMissingPunch']
              .toLocaleTimeString()
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
            applyDateForMissingPunch:
              dateInform['missingPunchDateForCheckInAndOutPicker'],

            reasonForMissingPunchRequest: reasonForMissingPunch,
            EmployeeId: 6,
          })
        ).then((resp) => {
          Alert.alert('Missing Punch', 'Request sent successfully', [
            { text: 'Okay', onPress: () => setShowMissingPunchDialog(false) },
          ]);
        });
      } else {
        const typePicker = position !== '';
        const checkOutDatePicker = selectedDateForCheckOut !== '';
        const reasonPicker = reasonForMissingPunch !== '';

        if (
          !typePicker ||
          !checkOutDatePicker ||
          !reasonPicker ||
          timeTwoInform['timePickerCheckOutStatus']
        ) {
          Alert.alert('Ivalid Inputs', 'Please fill all inputs');
          return;
        }
        axios(
          requestBuilder('hr', '/hr/missingPunchRequestCheckOut', 'put', {
            timeToForMissingPunch: timeTwoInform['timeToForMissingPunch']
              .toLocaleTimeString()
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
            reasonForMissingPunchRequest: reasonForMissingPunch,
            providerUuid: tokenStore.providerId,
            applyDateForMissingPunch: selectedDateForCheckOut,
          })
        ).then(() => {
          Alert.alert('Missing Punch', 'Request sent successfully', [
            { text: 'Okay', onPress: () => setShowMissingPunchDialog(false) },
          ]);
        });
      }
      // }
      //  else {
      // if (position == 'Check In') {
      //   const typePicker = position !== '';
      //   const checkInDatePicker = selectedDateForCheckIn !== '';
      //   const reasonPicker = reasonForMissingPunch !== '';

      //   if (
      //     !typePicker ||
      //     !checkInDatePicker ||
      //     !reasonPicker ||
      //     timeOneInform['timePickerCheckInStatus']
      //   ) {
      //     Alert.alert('Ivalid Inputs', 'Please fill all inputs');
      //     return;
      //   }
      //   axios(
      //     requestBuilder('hr', '/hr/missingPunchRequestCheckIn', 'put', {
      //       providerUuid: tokenStore.providerId,
      //       timeFromForMissingPunch: timeOneInform['timeFromForMissingPunch']
      //         .toLocaleTimeString()
      //         .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
      //       reasonForMissingPunchRequest: reasonForMissingPunch,
      //       applyDateForMissingPunch: selectedDateForCheckIn,
      //     })
      //   ).then(() => {
      //     Alert.alert('Missing Punch', 'Request sent successfully', [
      //       { text: 'Okay', onPress: () => setShowMissingPunchDialog(false) },
      //     ]);
      //   });
      // } else if (position == 'Check In & Check Out') {
      //   const typePicker = position !== '';
      //   const reasonPicker = reasonForMissingPunch !== '';

      //   if (
      //     !typePicker ||
      //     !reasonPicker ||
      //     timeOneInform['timePickerCheckInStatus'] ||
      //     timeTwoInform['timePickerCheckOutStatus']
      //   ) {
      //     Alert.alert('Ivaild Inputs', 'Please fill all inputs');
      //     return;
      //   }

      //   axios(
      //     requestBuilder('hr', '/hr/missingPunchForBoth', 'post', {
      //       providerUuid: tokenStore.providerId,
      //       employeeName: employeeData.firstName,
      //       timeFromForMissingPunch: timeOneInform['timeFromForMissingPunch']
      //         .toLocaleTimeString()
      //         .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
      //       timeToForMissingPunch: timeTwoInform['timeToForMissingPunch']
      //         .toLocaleTimeString()
      //         .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
      //       applyDateForMissingPunch:
      //         dateInform['missingPunchDateForCheckInAndOutPicker'],

      //       reasonForMissingPunchRequest: reasonForMissingPunch,
      //       EmployeeId: 6,
      //     })
      //   ).then((resp) => {
      //     Alert.alert('Missing Punch', 'Request sent successfully', [
      //       { text: 'Okay', onPress: () => setShowMissingPunchDialog(false) },
      //     ]);
      //   });
      // } else {
      //   const typePicker = position !== '';
      //   const checkOutDatePicker = selectedDateForCheckOut !== '';
      //   const reasonPicker = reasonForMissingPunch !== '';
      //   if (
      //     !typePicker ||
      //     !checkOutDatePicker ||
      //     !reasonPicker ||
      //     timeTwoInform['timePickerCheckOutStatus']
      //   ) {
      //     Alert.alert('Ivalid Inputs', 'Please fill all inputs');
      //     return;
      //   }
      //   axios(
      //     requestBuilder('hr', '/hr/missingPunchRequestCheckOut', 'put', {
      //       timeToForMissingPunch: timeTwoInform['timeToForMissingPunch']
      //         .toLocaleTimeString()
      //         .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
      //       reasonForMissingPunchRequest: reasonForMissingPunch,
      //       providerUuid: tokenStore.providerId,
      //       applyDateForMissingPunch: selectedDateForCheckOut,
      //     })
      //   ).then(() => {
      //     Alert.alert('Missing Punch', 'Request sent successfully', [
      //       { text: 'Okay', onPress: () => setShowMissingPunchDialog(false) },
      //     ]);
      //   });
      // }
      // }
    } catch (error) {
      console.log(error);
    }
  };
  function handleOnChangeInput(inputIdentifier, enteredValue) {
    setEmployeeLeaveInformation((currentValues) => {
      return {
        ...currentValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  useEffect(() => {
    setMissingDaysArrForCheckIn(missingDaysArrForCheckIn);
  }, [missingDaysArrForCheckIn]);

  return (
    <Modal
      isOpen={showMissingPunchDialog}
      avoidKeyboard
      height="100%"
      safeAreaTop={true}
    >
      <Modal.Content width="100%" style={styles.bottomModal}>
        <Modal.Header>
          <Title style={styles.title}>Missing Punch Request</Title>
        </Modal.Header>
        <Modal.Body>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              <View>
                {/* <HStack space={5} justifyContent="center" mt={10}> */}

                <View>
                  <View style={styles.due_date_con}>
                    <View
                      style={{
                        height: 50,
                        justifyContent: 'center',
                        width: '30%',
                      }}
                    >
                      <Text style={styles.titleText}>Name:</Text>
                    </View>
                    <View style={styles.create_val}>
                      <FormInput
                        textInputConfig={{
                          value: employeeData.firstName,
                          isDisabled: true,
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View style={[styles.due_date_con, { marginBottom: 20 }]}>
                  <View
                    style={{
                      height: 50,
                      justifyContent: 'center',
                      width: '30%',
                    }}
                  >
                    <Text style={styles.titleText}>Type:</Text>
                  </View>
                  <View
                    style={[styles.create_val, { justifyContent: 'center' }]}
                  >
                    <RNPickerSelect
                      onValueChange={(nextValue) => handleSelectType(nextValue)}
                      style={pickerSelectStyles}
                      // accessibilityLabel="Select a position for Menu"
                      useNativeAndroidPickerStyle={false}
                      items={[
                        {
                          label: 'Check In & Check Out',
                          value: 'Check In & Check Out',
                        },
                        { label: 'Check In', value: 'Check In' },
                        { label: 'Check Out', value: 'Check Out' },
                      ]}
                    />
                  </View>
                </View>

                {position == 'Check In & Check Out' && (
                  // <HStack w="100%" mb={3}>
                  <View style={styles.due_date_con}>
                    <View
                      style={{
                        height: 50,
                        justifyContent: 'center',
                        width: '30%',
                      }}
                    >
                      <Text style={styles.titleText}>Date :</Text>
                    </View>
                    {Platform.OS === 'ios' ? (
                      <>
                        <View style={styles.create_val}>
                          {dateInform['showDateInOut'] && (
                            <DateTimePicker
                              style={{ flex: 1, width: '100%' }}
                              value={
                                dateInform['missingPunchDateForCheckInAndOut']
                              }
                              mode="date"
                              display="default"
                              onChange={onChangeDate}
                              minimumDate={
                                new Date(
                                  new Date().getFullYear(),
                                  new Date().getMonth()
                                )
                              }
                              maximumDate={new Date()}
                            />
                          )}
                        </View>
                        <View>
                          <Text style={styles.create_text_val}>
                            <Icon
                              name="calendar"
                              size={30}
                              color="#2a416a"
                              onPress={showDateMissingPunch}
                            />
                          </Text>
                        </View>
                      </>
                    ) : (
                      <View style={styles.create_val}>
                        <View>
                          <Text style={styles.create_text_val}>
                            {' '}
                            {
                              dateInform[
                                'missingPunchDateForCheckInAndOutPicker'
                              ]
                            }{' '}
                          </Text>
                        </View>
                        <Icon
                          name="calendar"
                          size={30}
                          color="#2a416a"
                          onPress={showDateMissingPunch}
                        />
                        {dateInform['showDateInOut'] && (
                          <DateTimePicker
                            style={{ flex: 1, width: '100%' }}
                            value={
                              dateInform['missingPunchDateForCheckInAndOut']
                            }
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                            minimumDate={
                              new Date(
                                new Date().getFullYear(),
                                new Date().getMonth()
                              )
                            }
                            maximumDate={new Date()}
                          />
                        )}
                      </View>
                    )}
                  </View>
                  // </HStack>
                )}
                <VStack>
                  {(timesStatus || checkInstatus) && (
                    <View style={styles.due_date_con}>
                      <View
                        style={{
                          height: 50,
                          justifyContent: 'center',
                          width: '30%',
                        }}
                      >
                        <Text style={styles.titleText}>Time From :</Text>
                      </View>
                      {Platform.OS === 'ios' ? (
                        <>
                          <View style={styles.create_val}>
                            {timeOneInform['showTimeOne'] && (
                              <DateTimePicker
                                style={{ flex: 1, width: '100%' }}
                                value={timeOneInform['timeFromForMissingPunch']}
                                mode="time"
                                display="default"
                                onChange={onChangeTime}
                              />
                            )}
                          </View>
                          <View>
                            <Text style={styles.create_text_val}>
                              <Icon
                                name="clock-o"
                                size={30}
                                color="#2a416a"
                                onPress={showTime}
                              />
                            </Text>
                          </View>
                        </>
                      ) : (
                        <View style={styles.create_val}>
                          <View>
                            <Text style={styles.create_text_val}>
                              {' '}
                              {
                                timeOneInform['timeFromForMissingPunchPicker']
                              }{' '}
                            </Text>
                          </View>
                          <Icon
                            name="clock-o"
                            size={30}
                            color="#2a416a"
                            onPress={showTime}
                          />
                          {timeOneInform['showTimeOne'] && (
                            <DateTimePicker
                              style={{ flex: 1, width: '100%' }}
                              value={timeOneInform['timeFromForMissingPunch']}
                              mode="time"
                              display="default"
                              onChange={onChangeTime}
                            />
                          )}
                        </View>
                      )}
                    </View>
                  )}
                  {(timesStatus || checkOutStatus) && (
                    <View style={styles.due_date_con}>
                      <View
                        style={{
                          height: 50,
                          justifyContent: 'center',
                          width: '30%',
                        }}
                      >
                        <Text style={styles.titleText}>Time To :</Text>
                      </View>
                      {Platform.OS === 'ios' ? (
                        <>
                          <View style={styles.create_val}>
                            {timeTwoInform['showTimeTwo'] && (
                              <DateTimePicker
                                style={{ flex: 1, width: '100%' }}
                                value={timeTwoInform['timeToForMissingPunch']}
                                mode="time"
                                display="default"
                                onChange={onChangeTime2}
                              />
                            )}
                          </View>
                          <View>
                            <Text style={styles.create_text_val}>
                              <Icon
                                name="clock-o"
                                size={30}
                                color="#2a416a"
                                onPress={showTime2}
                              />
                            </Text>
                          </View>
                        </>
                      ) : (
                        <View style={styles.create_val}>
                          <View>
                            <Text style={styles.create_text_val}>
                              {' '}
                              {
                                timeTwoInform['timeToForMissingPunchPicker']
                              }{' '}
                            </Text>
                          </View>
                          <Icon
                            name="clock-o"
                            size={30}
                            color="#2a416a"
                            onPress={showTime2}
                          />
                          {timeTwoInform['showTimeTwo'] && (
                            <DateTimePicker
                              style={{ flex: 1, width: '100%' }}
                              value={timeTwoInform['timeToForMissingPunch']}
                              mode="time"
                              display="default"
                              onChange={onChangeTime2}
                            />
                          )}
                        </View>
                      )}
                    </View>
                  )}
                </VStack>
                {checkInstatus && Platform.OS === 'ios' && (
                  <RNPickerSelect
                    onValueChange={(nextValue) =>
                      setSelectedDateForCheckIn(nextValue)
                    }
                    onOpen={missingDaysForCheckIn}
                    style={pickerSelectStyles}
                    items={missingDaysArrForCheckIn?.map((val, i) => ({
                      label: val,
                      value: val,
                    }))}
                  />
                )}
                {checkInstatus && Platform.OS === 'android' && (
                  <Select
                    selectedValue={selectedDateForCheckIn}
                    onValueChange={(nextValue) =>
                      setSelectedDateForCheckIn(nextValue)
                    }
                    onOpen={missingDaysForCheckIn}
                    _selectedItem={{
                      bg: 'cyan.600',
                      endIcon: <CheckIcon size={4} />,
                    }}
                    m={3}
                    w="100%"
                    accessibilityLabel="Select Date"
                  >
                    {missingDaysArrForCheckIn?.map((val) => (
                      <Select.Item label={val} value={val} />
                    ))}
                  </Select>
                )}

                {checkOutStatus &&
                  Platform.OS === 'ios' &&
                  missingDaysArrForCheckOut !== null && (
                    <RNPickerSelect
                      onValueChange={(nextValue) =>
                        setSelectedDateForCheckOut(nextValue)
                      }
                      onOpen={() => missingDaysForCheckOut()}
                      style={pickerSelectStyles}
                      // accessibilityLabel="Select a position for Menu"
                      items={missingDaysArrForCheckOut?.map((val, i) => ({
                        label: val,
                        value: val,
                      }))}
                    />
                  )}
                {checkOutStatus &&
                  Platform.OS === 'android' &&
                  missingDaysArrForCheckOut !== null && (
                    <Select
                      selectedValue={selectedDateForCheckOut}
                      onValueChange={(nextValue) =>
                        setSelectedDateForCheckOut(nextValue)
                      }
                      onOpen={() => missingDaysForCheckOut()}
                      _selectedItem={{
                        bg: 'cyan.600',
                        endIcon: <CheckIcon size={4} />,
                      }}
                      m={3}
                      w="100%"
                      accessibilityLabel="Select Date"
                    >
                      {missingDaysArrForCheckOut?.map((val) => (
                        <Select.Item label={val} value={val} />
                      ))}
                    </Select>
                  )}

                <Input
                  variant="underlined"
                  placeholder="Reason"
                  onChange={(e) => handleReasonChangeMissingPunch(e)}
                />
              </View>
            </View>
          </ScrollView>
        </Modal.Body>

        <Modal.Footer>
          <HStack space={5} justifyContent="center">
            <Button
              size="sm"
              onPress={() => {
                setShowMissingPunchDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="secondary"
              // disabled={true}
              onPress={() =>
                handleSubmitRequestForMissingPunch(
                  position,
                  selectedDateForCheckIn,
                  selectedDateForCheckOut
                )
              }
            >
              Submit
            </Button>
          </HStack>
        </Modal.Footer>
        {/* </HStack> */}
      </Modal.Content>
    </Modal>
  );
};

export default MissingPunchRequestModal;

const styles = StyleSheet.create({
  wrapperContainer: {
    marginHorizontal: 16,
  },
  bottomModal: {
    marginBottom: 0,
    marginTop: 'auto',
  },

  title: {
    marginVertical: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  create_val: {
    width: '50%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  create_text_val: {
    width: Platform.OS === 'ios' ? 100 : 200,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    padding: 10,
  },
  due_date_con: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginVertical: 10,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 0,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginVertical: 10,
    marginHorizontal: 0,
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
});

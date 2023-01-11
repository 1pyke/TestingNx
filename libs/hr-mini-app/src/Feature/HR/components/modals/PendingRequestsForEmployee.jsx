import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import requestBuilder from '../../../../requestBuilder';
import axios from 'axios';
import Title from '../shared/Title';
import { useDispatch } from 'react-redux';
import { changeLeaveRequetsUIFlag } from '../../store-Hr';
import { Text, HStack, Button, VStack, Input, Modal } from 'native-base';
import Icon from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormInput from '../shared/FormInput';
//////////////////////////////////////////
const PendingRequestsForEmployee = ({
  setShowPendingRequestsModal,
  showPendingRequestsModal,
  requestData,
}) => {
  /////////////////////////////////////
  const dispatch = useDispatch();
  const [employeeLeaveInformation, setEmployeeLeaveInformation] = useState({
    leaveDate: new Date().toISOString().slice(0, 10),
    requestedDays: requestData.howManyDaysEmployeeAskedFor
      ? requestData.howManyDaysEmployeeAskedFor.toString()
      : null,
    requestedHours: '',
  });
  const [
    howManyHoursEmployeeAskForBusinessLeaveForDb,
    setHowManyHoursEmployeeAskForBusinessLeaveForDb,
  ] = useState(0);
  const [requestedDaysStatus, setRequestedDaysStatus] = useState(false);
  const [equalDates, setEqualDates] = useState(false);

  ///////////////////////////////////////
  ///initial values for date
  const [dateInform, setDateInform] = useState({
    dateFromToUpdateRequestFromEmployee: new Date(),
    dateFromToUpdateRequestFromEmployeePicker: requestData.DateFrom,
    dateToToUpdateRequestFromEmployee: new Date(),
    dateToToUpdateRequestFromEmployeePicker: requestData.dateTo,
    ///////////////////
    showDatePicker1: false,
    showDatePicker2: false,
    dateOneStatus: true,
    dateTwoStatus: true,
  });
  ////////////////////////////////
  ///initial values for time
  const [timeInform, setTimeInform] = useState({
    timeFromToUpdateRequestFromEmployee: new Date(),
    timeFromToUpdateRequestFromEmployeePicker: requestData.timeFrom,
    timeToToUpdateRequestFromEmployee: new Date(),
    timeToToUpdateRequestFromEmployeePicker: requestData.timeTo,
    showTimePicker1: false,
    showTimePicker2: false,
    timeOneStatus: true,
    timeTwoStatus: true,
  });

  ////////////////////////////////////////////
  ///functions
  useEffect(() => {
    handleHoursFormating();
  }, []);
  const handleHoursFormating = () => {
    let hours = requestData.howManyHoursEmployeeAskedFor / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    setEmployeeLeaveInformation({
      ...employeeLeaveInformation,
      requestedHours: rhours + ':' + rminutes,
    });
  };
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1 + '';
    if (month.length === 1) month = '0' + month;
    let day = currentDate.getDate() + '';
    if (day.length === 1) day = '0' + day;
    if (Platform.OS === 'ios') {
      setDateInform({
        ...dateInform,
        dateFromToUpdateRequestFromEmployee: currentDate,
        dateFromToUpdateRequestFromEmployeePicker:
          year + '-' + month + '-' + day,
        dateOneStatus: false,
      });
    } else {
      setDateInform({
        ...dateInform,
        dateFromToUpdateRequestFromEmployee: currentDate,
        dateFromToUpdateRequestFromEmployeePicker:
          year + '-' + month + '-' + day,
        showDatePicker1: false,
        dateOneStatus: false,
      });
    }

    // setDateFromToUpdateRequestFromEmployeePicker(
    //   year + '-' + month + '-' + day
    // );
    // setDateFromToUpdateRequestFromEmployee(currentDate);
    // setDateOneStatus(false);
  };
  const onChangeDate2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1 + '';
    if (month.length === 1) month = '0' + month;
    let day = currentDate.getDate() + '';
    if (day.length === 1) day = '0' + day;
    setDateInform({
      ...dateInform,
      dateToToUpdateRequestFromEmployee: currentDate,
      dateToToUpdateRequestFromEmployeePicker: year + '-' + month + '-' + day,
      showDatePicker2: false,
      dateTwoStatus: false,
    });
    // setDateToToUpdateRequestFromEmployeePicker(year + '-' + month + '-' + day);
    // setDateToToUpdateRequestFromEmployee(currentDate);
    // setDateTwoStatus(false);
    const dateTimeInParts = dateInform['dateFromToUpdateRequestFromEmployee']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateTimeInParts2 = selectedDate.toISOString().split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateOne = dateTimeInParts[0]; // "2021-08-31"
    const dateTwo = dateTimeInParts2[0]; // "2021-08-31"

    if (dateOne == dateTwo) {
      toggelingTimeStatus();
    } else {
      setEqualDates(false);
      requestedDaysFormatting(selectedDate);
    }
  };
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    let hourS = currentDate.getHours() + '';
    if (hourS.length === 1) hourS = '0' + hourS;
    let minutes = currentDate.getMinutes() + '';
    if (minutes.length === 1) minutes = '0' + minutes;
    if (Platform.OS === 'ios') {
      setTimeInform({
        ...timeInform,
        timeFromToUpdateRequestFromEmployee: currentDate,
        timeFromToUpdateRequestFromEmployeePicker: hourS + ':' + minutes,
        timeOneStatus: false,
      });
    } else {
      setTimeInform({
        ...timeInform,
        timeFromToUpdateRequestFromEmployee: currentDate,
        timeFromToUpdateRequestFromEmployeePicker: hourS + ':' + minutes,
        showTimePicker1: false,
        timeOneStatus: false,
      });
    }
  };

  const showTime = () => {
    setTimeInform({
      ...timeInform,
      showTimePicker1: true,
    });
  };
  const toggelingTimeStatus = () => {
    setRequestedDaysStatus(true);
    setEqualDates(true);
  };
  const onChangeTime2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    let hourS = currentDate.getHours() + '';
    if (hourS.length === 1) hourS = '0' + hourS;
    let minutes = currentDate.getMinutes() + '';
    if (minutes.length === 1) minutes = '0' + minutes;
    if (Platform.OS === 'ios') {
      setTimeInform({
        ...timeInform,
        timeToToUpdateRequestFromEmployee: currentDate,
        timeToToUpdateRequestFromEmployeePicker: hourS + ':' + minutes,
        timeTwoStatus: false,
      });
      requestedHoursFormatting(selectedDate);
    } else {
      setTimeInform({
        ...timeInform,
        timeToToUpdateRequestFromEmployee: currentDate,
        timeToToUpdateRequestFromEmployeePicker: hourS + ':' + minutes,
        showTimePicker2: false,
        timeTwoStatus: false,
      });
    }
  };

  const showTime2 = () => {
    setTimeInform({
      ...timeInform,
      showTimePicker2: true,
    });
  };
  const showDate = () => {
    setDateInform({
      ...dateInform,
      showDatePicker1: true,
    });
  };
  const showDate2 = () => {
    setDateInform({
      ...dateInform,
      showDatePicker2: true,
    });
  };
  /////////////////////////////////////////////////////////
  const requestedDaysFormatting = (selectedDate) => {
    var date1 = new Date(dateInform['dateFromToUpdateRequestFromEmployee']);
    var date2 = new Date(selectedDate);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days =
      (Difference_In_Time / (1000 * 3600 * 24)).toFixed(0) * 1;
    if (Difference_In_Days <= 0) {
      return setEmployeeLeaveInformation({
        ...employeeLeaveInformation,
        requestedDays: null,
      });
    } else {
      setEmployeeLeaveInformation({
        ...employeeLeaveInformation,
        requestedDays: (1 + Difference_In_Days).toString(),
      });
    }
  };
  const requestedHoursFormatting = (selectedDate) => {
    if (timeInform['timeFromToUpdateRequestFromEmployee'] != selectedDate) {
      let actualTimeInMilliseconds =
        selectedDate.valueOf() -
        timeInform['timeFromToUpdateRequestFromEmployee'].valueOf();
      let howManyHoursEmployeeAskForBusinessLeave =
        actualTimeInMilliseconds / (60 * 1000); //to convert it for munites and save it in database

      setHowManyHoursEmployeeAskForBusinessLeaveForDb({
        howManyHoursEmployeeAskForBusinessLeaveForDb:
          howManyHoursEmployeeAskForBusinessLeave,
      });

      let hours = howManyHoursEmployeeAskForBusinessLeave / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      setEmployeeLeaveInformation({
        ...employeeLeaveInformation,
        requestedHours: rhours + ':' + rminutes,
      });
    } else {
      setHowManyHoursEmployeeAskForBusinessLeaveForDb({
        howManyHoursEmployeeAskForBusinessLeaveForDb: 0,
      });
      setEmployeeLeaveInformation({
        ...employeeLeaveInformation,
        howManyHoursEmployeeAskForBusinessLeave: '0',
      });
    }
  };

  const handleUpdateRequest = async () => {
    const dateTimeInParts = dateInform['dateFromToUpdateRequestFromEmployee']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateTimeInParts2 = dateInform['dateToToUpdateRequestFromEmployee']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateOne = dateTimeInParts[0]; // "2021-08-31"
    const dateTwo = dateTimeInParts2[0]; // "2021-08-31"
    try {
      if (requestData.DateFrom != requestData.dateTo) {
        if (dateInform['dateOneStatus'] || dateInform['dateTwoStatus']) {
          Alert.alert('Ivalid Inputs', 'Please fill all inputs');
          return;
        }
        await axios(
          requestBuilder('hr', '/updateLeaveForEmployee', 'put', {
            leaveIdUpdate: requestData.id,
          })
        );
        await axios(
          requestBuilder('hr', '/leaveApplication', 'post', {
            employeeName: requestData.employeeName,
            providerUuid: requestData.providerUuid,
            applyDate: employeeLeaveInformation.leaveDate,
            ///////////////
            DateFrom: dateOne,
            dateTo: dateTwo,
            ///////////////
            leaveType: requestData.leaveType,
            subLeaveType: requestData.subLeaveType,
            isApproved: 'updated',
            //////////////
            howManyDaysEmployeeAskForBusinessLeave:
              employeeLeaveInformation.requestedDays,
            ///////////////
            reasonFromManager: requestData.reasonFromManager,
            EmployeeId: requestData.EmployeeId,
          })
        );
        dispatch(changeLeaveRequetsUIFlag());
        Alert.alert('Leave Request', 'Request sent successfully', [
          { text: 'Okay', onPress: () => setShowPendingRequestsModal(false) },
        ]);
      } else {
        // if (Platform.OS === 'ios') {
        //   let timeOne = timeInform['timeFromToUpdateRequestFromEmployee']
        //     .toLocaleTimeString()
        //     .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
        //   var hours1 = Number(timeOne.match(/^(\d+)/)[1]);
        //   var minutes1 = Number(timeOne.match(/:(\d+)/)[1]);
        //   var AMPM1 = timeOne.match(/\s(.*)$/)[1];
        //   if (AMPM1 === 'PM' && hours1 < 12) hours1 = hours1 + 12;
        //   if (AMPM1 === 'AM' && hours1 === 12) hours1 = hours1 - 12;
        //   var sHours1 = hours1.toString();
        //   var sMinutes1 = minutes1.toString();
        //   if (hours1 < 10) sHours1 = '0' + sHours1;
        //   if (minutes1 < 10) sMinutes1 = '0' + sMinutes1;
        //   let finalTimeOne = sHours1 + ':' + sMinutes1;

        //   ////////////////////////////////
        //   let timeTwo = timeInform['timeToToUpdateRequestFromEmployee']
        //     .toLocaleTimeString()
        //     .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');

        //   var hours = Number(timeTwo.match(/^(\d+)/)[1]);
        //   var minutes = Number(timeTwo.match(/:(\d+)/)[1]);
        //   var AMPM = timeTwo.match(/\s(.*)$/)[1];
        //   if (AMPM === 'PM' && hours < 12) hours = hours + 12;
        //   if (AMPM === 'AM' && hours === 12) hours = hours - 12;
        //   var sHours = hours.toString();
        //   var sMinutes = minutes.toString();
        //   if (hours < 10) sHours = '0' + sHours;
        //   if (minutes < 10) sMinutes = '0' + sMinutes;
        //   let finalTimeTwo = sHours + ':' + sMinutes;

        //   if (timeInform['timeOneStatus'] || timeInform['timeTwoStatus']) {
        //     Alert.alert('Ivalid Inputs', 'Please fill all inputs');
        //     return;
        //   }
        //   await axios(
        //     requestBuilder('hr', '/updateLeaveForEmployee', 'put', {
        //       leaveIdUpdate: requestData.id,
        //     })
        //   );

        //   await axios(
        //     requestBuilder('hr', '/leaveApplication', 'post', {
        //       employeeName: requestData.employeeName,
        //       providerUuid: requestData.providerUuid,
        //       applyDate: employeeLeaveInformation.leaveDate,
        //       ///////////////
        //       DateFrom: dateOne,
        //       dateTo: dateTwo,
        //       ///////////////
        //       timeFrom: finalTimeOne,
        //       timeTo: finalTimeTwo,
        //       ///////////////
        //       leaveType: requestData.leaveType,
        //       subLeaveType: requestData.subLeaveType,
        //       isApproved: 'updated',
        //       //////////////
        //       howManyHoursEmployeeAskForBusinessLeave:
        //         howManyHoursEmployeeAskForBusinessLeaveForDb.howManyHoursEmployeeAskForBusinessLeaveForDb,
        //       ///////////////
        //       reasonFromManager: requestData.reasonFromManager,
        //       EmployeeId: requestData.EmployeeId,
        //     })
        //   );
        //   dispatch(changeLeaveRequetsUIFlag());
        //   Alert.alert('Leave Request', 'Request sent successfully', [
        //     { text: 'Okay', onPress: () => setShowPendingRequestsModal(false) },
        //   ]);
        // }
        // else {
        if (timeInform['timeOneStatus'] || timeInform['timeTwoStatus']) {
          Alert.alert('Ivalid Inputs', 'Please fill all inputs');
          return;
        }
        await axios(
          requestBuilder('hr', '/updateLeaveForEmployee', 'put', {
            leaveIdUpdate: requestData.id,
          })
        );

        await axios(
          requestBuilder('hr', '/leaveApplication', 'post', {
            employeeName: requestData.employeeName,
            providerUuid: requestData.providerUuid,
            applyDate: employeeLeaveInformation.leaveDate,
            ///////////////
            DateFrom: dateOne,
            dateTo: dateTwo,
            ///////////////
            timeFrom: timeInform['timeFromToUpdateRequestFromEmployee']
              .toLocaleTimeString()
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
            timeTo: timeInform['timeToToUpdateRequestFromEmployee']
              .toLocaleTimeString()
              .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
            ///////////////
            leaveType: requestData.leaveType,
            subLeaveType: requestData.subLeaveType,
            isApproved: 'updated',
            //////////////
            howManyHoursEmployeeAskForBusinessLeave:
              howManyHoursEmployeeAskForBusinessLeaveForDb.howManyHoursEmployeeAskForBusinessLeaveForDb,
            ///////////////
            reasonFromManager: requestData.reasonFromManager,
            EmployeeId: requestData.EmployeeId,
          })
        );
        dispatch(changeLeaveRequetsUIFlag());
        Alert.alert('Leave Request', 'Request sent successfully', [
          { text: 'Okay', onPress: () => setShowPendingRequestsModal(false) },
        ]);
        // }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      isOpen={showPendingRequestsModal}
      avoidKeyboard
      height="100%"
      safeAreaTop={true}
    >
      <Modal.Content width="95%" style={styles.bottomModal}>
        <Modal.Header>
          <Title style={styles.title}>Pending Request </Title>
        </Modal.Header>

        <Modal.Body>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              <View>
                {/* <Icon
              style={{ fontSize: 25, alignSelf: 'flex-end' }}
              name="close"
              onPress={() => setShowPendingRequestsModal(false)}
            /> */}
                <View style={styles.due_date_con}>
                  <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text style={styles.titleText}>Name:</Text>
                  </View>
                  <View style={styles.create_val}>
                    {/* <Input
                  style={[styles.create_text_val, { padding: 30 }]}
                  variant="unstyled"
                  value={requestData.employeeName}
                  isDisabled={true}
                /> */}
                    <FormInput
                      style={{ paddingHorzintal: 30 }}
                      textInputConfig={{
                        value: requestData.employeeName,
                        isDisabled: true,
                      }}
                    />
                  </View>
                </View>

                {requestData.DateFrom != requestData.dateTo ? (
                  <VStack>
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Date From :</Text>
                      </View>
                      <View style={styles.create_val}>
                        <View>
                          <Text style={styles.create_text_val}>
                            {' '}
                            {
                              dateInform[
                                'dateFromToUpdateRequestFromEmployeePicker'
                              ]
                            }{' '}
                          </Text>
                        </View>
                        <Icon
                          name="calendar"
                          size={30}
                          color="#2a416a"
                          onPress={showDate}
                        />
                        {dateInform['showDatePicker1'] && (
                          <DateTimePicker
                            style={{ flex: 1, width: '100%' }}
                            value={
                              dateInform['dateFromToUpdateRequestFromEmployee']
                            }
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                            minimumDate={new Date()}
                          />
                        )}
                      </View>
                    </View>

                    {/* <Input
                  variant="underlined"
                  label="Date From"
                  value={dateFromToUpdateRequestFromEmployeePicker}
                  w="45%"
                /> */}
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Date To :</Text>
                      </View>
                      <View style={styles.create_val}>
                        <View>
                          <Text style={styles.create_text_val}>
                            {' '}
                            {
                              dateInform[
                                'dateToToUpdateRequestFromEmployeePicker'
                              ]
                            }{' '}
                          </Text>
                        </View>
                        <Icon
                          name="calendar"
                          size={30}
                          color="#2a416a"
                          onPress={showDate2}
                        />
                        {dateInform['showDatePicker2'] && (
                          <DateTimePicker
                            style={{ flex: 1, width: '100%' }}
                            value={
                              dateInform['dateToToUpdateRequestFromEmployee']
                            }
                            mode="date"
                            display="default"
                            onChange={onChangeDate2}
                            minimumDate={
                              dateInform['dateFromToUpdateRequestFromEmployee']
                            }
                          />
                        )}
                      </View>
                    </View>
                  </VStack>
                ) : (
                  <VStack>
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Time From :</Text>
                      </View>
                      <View style={styles.create_val}>
                        <View>
                          <Text style={styles.create_text_val}>
                            {' '}
                            {
                              timeInform[
                                'timeFromToUpdateRequestFromEmployeePicker'
                              ]
                            }{' '}
                          </Text>
                        </View>
                        <Icon
                          name="clock-o"
                          size={30}
                          color="#2a416a"
                          onPress={showTime}
                        />
                        {timeInform['showTimePicker1'] && (
                          <DateTimePicker
                            style={{ width: '100%' }}
                            value={
                              timeInform['timeFromToUpdateRequestFromEmployee']
                            }
                            mode="time"
                            display="default"
                            onChange={onChangeTime}
                          />
                        )}
                      </View>
                    </View>
                    {/*                
                <Input
                  variant="underlined"
                  label="Time From"
                  value={timeFromToUpdateRequestFromEmployeePicker}
                  w="45%"
                /> */}
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Time To :</Text>
                      </View>
                      <View style={styles.create_val}>
                        <View>
                          <Text style={styles.create_text_val}>
                            {' '}
                            {
                              timeInform[
                                'timeToToUpdateRequestFromEmployeePicker'
                              ]
                            }{' '}
                          </Text>
                        </View>
                        <Icon
                          name="clock-o"
                          size={30}
                          color="#2a416a"
                          onPress={showTime2}
                        />
                        {timeInform['showTimePicker2'] && (
                          <DateTimePicker
                            style={{ width: '100%' }}
                            value={
                              timeInform['timeToToUpdateRequestFromEmployee']
                            }
                            mode="time"
                            display="default"
                            onChange={onChangeTime2}
                          />
                        )}
                      </View>
                    </View>

                    {/* <Input
                  variant="underlined"
                  label="Time From"
                  value={timeToToUpdateRequestFromEmployeePicker}
                  w="45%"
                /> */}
                  </VStack>
                )}
                <VStack>
                  <View style={styles.due_date_con}>
                    <View style={{ height: 50, justifyContent: 'center' }}>
                      <Text style={styles.titleText}>Apply Date:</Text>
                    </View>
                    <View style={styles.create_val}>
                      {/* <Input
                    style={[styles.create_text_val, { padding: 30 }]}
                    variant="unstyled"
                    value={employeeLeaveInformation['leaveDate']}
                    isDisabled={true}
                  /> */}
                      <FormInput
                        style={[{ width: 150 }]}
                        textInputConfig={{
                          value:
                            employeeLeaveInformation['leaveDate'].toString(),
                          isDisabled: true,
                        }}
                      />
                    </View>
                  </View>
                  {/* <Input
                variant="underlined"
                value={employeeLeaveInformation['leaveDate']}
                isDisabled={true}
                w="45%"
              /> */}
                  {requestData.DateFrom != requestData.dateTo ? (
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Days #:</Text>
                      </View>
                      <View style={styles.create_val}>
                        {/* <Input
                      style={[styles.create_text_val, { padding: 30 }]}
                      variant="unstyled"
                      value={employeeLeaveInformation['requestedDays']}
                      isDisabled={true}
                    /> */}
                        <FormInput
                          style={{ paddingHorzintal: 30 }}
                          textInputConfig={{
                            value:
                              employeeLeaveInformation[
                                'requestedDays'
                              ].toString(),
                            isDisabled: true,
                          }}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Hours #:</Text>
                      </View>
                      <View style={styles.create_val}>
                        {/* <Input
                      style={[styles.create_text_val, { padding: 30 }]}
                      variant="unstyled"
                      value={employeeLeaveInformation['requestedHours']}
                      isDisabled={true}
                    /> */}
                        <FormInput
                          style={{ paddingHorizontal: 30 }}
                          textInputConfig={{
                            value: employeeLeaveInformation['requestedHours'],
                            isDisabled: true,
                          }}
                        />
                      </View>
                    </View>
                    // <Input
                    //   variant="underlined"
                    //   value={employeeLeaveInformation['requestedHours']}
                    //   isDisabled={true}
                    //   w="45%"
                    // />
                  )}
                </VStack>
                <View style={styles.due_date_con}>
                  <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text style={styles.titleText}>Reason:</Text>
                  </View>
                  <View style={styles.create_val}>
                    <Input
                      variant="unstyled"
                      value={requestData.subLeaveType}
                      isDisabled={true}
                    />
                  </View>
                </View>

                {/* <Input
              variant="underlined"
              value={requestData.subLeaveType}
              isDisabled={true}
            /> */}
                <View style={styles.due_date_con}>
                  <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text style={styles.titleText}>Manager Reason:</Text>
                  </View>
                  <View style={styles.create_val}>
                    <Input
                      style={[styles.create_text_val, { padding: 30 }]}
                      variant="unstyled"
                      value={requestData.reasonFromManager}
                      isDisabled={true}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={5} justifyContent="center">
            <Button
              size="sm"
              onPress={() => {
                setShowPendingRequestsModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="secondary"
              onPress={() => handleUpdateRequest()}
            >
              Update
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
const styles = StyleSheet.create({
  wrapperContainer: {
    marginHorizontal: 16,
  },
  bottomModal: {
    marginBottom: 0,
    marginTop: 'auto',
  },

  title: {
    marginVertical: 16,
    textAlign: 'center',
    fontSize: 20,
  },

  due_date_con: {
    marginTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  create_val: {
    width: '70%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  create_text_val: {
    width: 130,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
});
export default PendingRequestsForEmployee;

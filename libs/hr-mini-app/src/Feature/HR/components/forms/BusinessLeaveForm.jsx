import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, ScrollView, Modal } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewLeaveRequest,
  switchingLeaveTypes,
  changeLeaveRequetsUIFlag,
} from '../../store-Hr';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '@expo/vector-icons/FontAwesome';
import { VStack } from 'native-base';
import { StyleSheet, View, Alert, Text, Platform } from 'react-native';

import { TextInput } from 'react-native-paper';
import PersonalLeaveForm from './PersonalLeaveForm';
import SickLeaveForm from './SickLeaveForm';
import FormInput from '../shared/FormInput';
import Title from '../shared/Title';
/////////////////////////////////////////////////
function BusinessLeaveForm({ employeeData }) {
  const dispatch = useDispatch();
  const hrStore = useSelector((state) => state.hrStore);
  const dashboard = useSelector((state) => state.dashboard);

  const [employeeLeaveInformation, setEmployeeLeaveInformation] = useState({
    name: employeeData
      ? employeeData.firstName + ' ' + employeeData.lastName
      : '',
    leaveDate: new Date().toISOString().slice(0, 10),
    requestedDays: '0',
    requestedHours: '0',
    howManyHoursEmployeeAskForBusinessLeave: '0',
    businessLeaveType: null,
    reasonForBusineesLeave: null,
  });
  const [selectModalType, setSelectModalType] = useState('');
  const [
    howManyHoursEmployeeAskForBusinessLeaveForDb,
    setHowManyHoursEmployeeAskForBusinessLeaveForDb,
  ] = useState(0);
  const [requestedDaysStatus, setRequestedDaysStatus] = useState(false);
  const [reasonStatus, setReasonStatus] = useState(false);
  const [equalDates, setEqualDates] = useState(false);
  /////////////////
  /// initial values for date information
  const [dateInform, setDateInform] = useState({
    businessLeaveDateFrom: new Date(),
    due_date: '',
    businessLeaveDateTo: new Date(),
    businessLeaveDateToPicker: '',
    ///////////////////
    showDatePicker1: false,
    showDatePicker2: false,
    dateOneStatus: true,
    dateTwoStatus: true,
  });
  ////////////////////////
  /// initial values for time information
  const [timeInform, setTimeInform] = useState({
    timeFromForBusinessLeave: new Date(),
    timeFromForBusinessLeavePicker: '',
    timeToForBusinessLeave: new Date(),
    timeToForBusinessLeavePicker: '',
    showTimePicker1: false,
    showTimePicker2: false,
    timeOneStatus: true,
    timeTwoStatus: true,
  });
  /////////////////////////
  ///functions
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
        businessLeaveDateFrom: currentDate,
        due_date: year + '-' + month + '-' + day,
        dateOneStatus: false,
      });
    } else {
      setDateInform({
        ...dateInform,
        businessLeaveDateFrom: currentDate,
        due_date: year + '-' + month + '-' + day,
        businessLeaveDateTo: new Date(),
        showDatePicker1: false,
        dateOneStatus: false,
      });
    }
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
      businessLeaveDateTo: currentDate,
      businessLeaveDateToPicker: year + '-' + month + '-' + day,
      showDatePicker2: false,
      dateTwoStatus: false,
    });
    const dateTimeInParts = dateInform['businessLeaveDateFrom']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateTimeInParts2 = selectedDate.toISOString().split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateOne = dateTimeInParts[0]; // "2021-08-31"
    const dateTwo = dateTimeInParts2[0]; // "2021-08-31"
    if (dateOne == dateTwo) {
      toggelingTimeStatus();
    } else {
      setRequestedDaysStatus(false);
      setEqualDates(false);
      requestedDaysFormatting(selectedDate);
    }
  };
  ///////////////////////////////////////////////
  ///handling time change and picker

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    let hourS = currentDate.getHours() + '';
    if (hourS.length === 1) hourS = '0' + hourS;
    let minutes = currentDate.getMinutes() + '';
    if (minutes.length === 1) minutes = '0' + minutes;
    if (Platform.OS === 'ios') {
      setTimeInform({
        ...timeInform,
        timeFromForBusinessLeave: currentDate,
        timeFromForBusinessLeavePicker: hourS + ':' + minutes,
        timeOneStatus: false,
      });
    } else {
      setTimeInform({
        ...timeInform,
        timeFromForBusinessLeave: currentDate,
        timeFromForBusinessLeavePicker: hourS + ':' + minutes,
        timeOneStatus: false,
        showTimePicker1: false,
      });
    }
  };

  const showTime = () => {
    setTimeInform({
      ...timeInform,
      showTimePicker1: true,
    });
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
        timeToForBusinessLeave: currentDate,
        timeToForBusinessLeavePicker: hourS + ':' + minutes,
        timeTwoStatus: false,
      });

      requestedHoursFormatting(selectedDate);
    } else {
      setTimeInform({
        ...timeInform,
        timeToForBusinessLeave: currentDate,
        timeToForBusinessLeavePicker: hourS + ':' + minutes,
        showTimePicker2: false,
        timeTwoStatus: false,
      });
      requestedHoursFormatting(selectedDate);
    }
  };

  const showTime2 = () => {
    setTimeInform({
      ...timeInform,
      showTimePicker2: true,
    });
  };

  /////////////////////////////////////////////
  const toggelingTimeStatus = () => {
    setRequestedDaysStatus(true);
    setEqualDates(true);
  };
  function handleOnChangeInput(inputIdentifier, enteredValue) {
    setEmployeeLeaveInformation((currentValues) => {
      return {
        ...currentValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

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
    let date1 = new Date(dateInform['businessLeaveDateFrom']);
    let date2 = new Date(selectedDate);
    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days =
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
    if (timeInform['timeFromForBusinessLeave'] != selectedDate) {
      let actualTimeInMilliseconds =
        selectedDate.valueOf() -
        timeInform['timeFromForBusinessLeave'].valueOf();

      let howManyHoursEmployeeAskForBusinessLeave =
        actualTimeInMilliseconds / (60 * 1000); //to convert it for munites and save it in database

      setHowManyHoursEmployeeAskForBusinessLeaveForDb({
        howManyHoursEmployeeAskForBusinessLeaveForDb:
          howManyHoursEmployeeAskForBusinessLeave,
      });
      //here to display it in 12 hours formmat
      let hours = howManyHoursEmployeeAskForBusinessLeave / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      setEmployeeLeaveInformation({
        ...employeeLeaveInformation,
        howManyHoursEmployeeAskForBusinessLeave: rhours + ':' + rminutes,
      });
      // }
    } else {
      setEmployeeLeaveInformation({
        ...employeeLeaveInformation,
        howManyHoursEmployeeAskForBusinessLeaveForDb: 0,
      });
      setEmployeeLeaveInformation({
        ...employeeLeaveInformation,
        howManyHoursEmployeeAskForBusinessLeave: '0',
      });
    }
  };
  useEffect(() => {
    setHowManyHoursEmployeeAskForBusinessLeaveForDb(
      howManyHoursEmployeeAskForBusinessLeaveForDb
    ); // This will always use latest value of count
  }, [howManyHoursEmployeeAskForBusinessLeaveForDb]);
  /////////////////////////////////////////////////////////
  const checkReasonStatus = (optionType) => {
    setEmployeeLeaveInformation({
      ...employeeLeaveInformation,
      businessLeaveType: optionType,
    });
    if (optionType == 'other') {
      setReasonStatus(true);
    }
  };

  ///////////////////////////////////////////
  async function submitLeaveRequest(event) {
    event.preventDefault();
    /////////////////////////////////////////
    const dateTimeInParts = dateInform['businessLeaveDateFrom']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateTimeInParts2 = dateInform['businessLeaveDateTo']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateOne = dateTimeInParts[0]; // "2021-08-31"
    const dateTwo = dateTimeInParts2[0]; // "2021-08-31"
    try {
      /////////////////////////////////////////
      if (dateOne == dateTwo) {
        let { name, businessLeaveType, reasonForBusineesLeave } =
          employeeLeaveInformation;

        if (
          !businessLeaveType ||
          timeInform['timeOneStatus'] ||
          timeInform['timeTwoStatus']
        ) {
          Alert.alert('Ivalid Inputs', 'Please fill all inputs');
          return;
        }
        let leaveObject = {
          providerName: name,
          providerUuid: dashboard.providerId,
          DateFrom: dateOne,
          dateTo: dateTwo,
          timeFrom: timeInform['timeFromForBusinessLeave']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          timeTo: timeInform['timeToForBusinessLeave']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          applyDate: new Date().toISOString().slice(0, 10),

          leaveType: 'business',
          subLeaveType: businessLeaveType,
          howManyHoursEmployeeAskForBusinessLeave:
            howManyHoursEmployeeAskForBusinessLeaveForDb.howManyHoursEmployeeAskForBusinessLeaveForDb,
          reasonFromEmployee: reasonForBusineesLeave,
          EmployeeId: employeeData.id,
        };
        await dispatch(createNewLeaveRequest(leaveObject));
        dispatch(changeLeaveRequetsUIFlag());

        // dispatch(switchingLeaveTypes('Business'));
        Alert.alert('Leave Request', 'Request sent successfully', [
          {
            text: 'Okay',
            onPress: () => dispatch(switchingLeaveTypes('Business')),
          },
        ]);
        // }
      } else {
        let { name, businessLeaveType, requestedDays, reasonForBusineesLeave } =
          employeeLeaveInformation;

        if (
          !businessLeaveType ||
          dateInform['dateOneStatus'] ||
          dateInform['dateTwoStatus']
        ) {
          Alert.alert('Ivalid Inputs', 'Please fill all inputs');
          return;
        }
        let leaveObject = {
          providerName: name,
          providerUuid: dashboard.providerId,
          DateFrom: dateOne,
          dateTo: dateTwo,
          applyDate: new Date().toISOString().slice(0, 10),
          leaveType: 'business',
          subLeaveType: businessLeaveType,
          howManyDaysEmployeeAskForBusinessLeave: requestedDays,
          reasonFromEmployee: reasonForBusineesLeave,
          EmployeeId: employeeData.id,
        };

        await dispatch(createNewLeaveRequest(leaveObject));
        dispatch(changeLeaveRequetsUIFlag());

        // dispatch(switchingLeaveTypes('Business'));
        Alert.alert('Leave Request', 'Request sent successfully', [
          {
            text: 'Okay',
            onPress: () => dispatch(switchingLeaveTypes('Business')),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <SickLeaveForm employeeData={employeeData} />
      <PersonalLeaveForm employeeData={employeeData} />
      <Modal
        isOpen={hrStore.isModalVisible}
        avoidKeyboard
        height="100%"
        safeAreaTop={true}
      >
        <Modal.Content width="100%" style={styles.bottomModal}>
          <Modal.Header>
            {Platform.OS === 'ios' ? (
              <RNPickerSelect
                style={pickerSelectStyles}
                placeholder={{
                  label: 'Select leave type',
                  value: { selectModalType },
                }}
                onValueChange={(optionType) => setSelectModalType(optionType)}
                onDonePress={(value) =>
                  dispatch(switchingLeaveTypes(selectModalType))
                }
                value={selectModalType}
                items={[
                  { label: 'Business', value: 'Business' },
                  { label: 'Sick', value: 'Sick' },
                  { label: 'Personal', value: 'Personal' },
                ]}
              />
            ) : (
              <RNPickerSelect
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                placeholder={{ label: 'Select leave type', value: null }}
                onValueChange={(value) => dispatch(switchingLeaveTypes(value))}
                value={selectModalType}
                items={[
                  { label: 'Business', value: 'Business' },
                  { label: 'Sick', value: 'Sick' },
                  { label: 'Personal', value: 'Personal' },
                ]}
              />
            )}
            <Title style={styles.title}>Business Request Leave</Title>
          </Modal.Header>
          <Modal.Body>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.wrapperContainer}>
                <View>
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
                            value: employeeLeaveInformation['name'],
                            isDisabled: true,
                          }}
                        />
                      </View>
                    </View>

                    <VStack>
                      <View style={styles.due_date_con}>
                        <View
                          style={{
                            height: 50,
                            justifyContent: 'center',
                            width: '30%',
                          }}
                        >
                          <Text style={styles.titleText}>Date From :</Text>
                        </View>
                        {Platform.OS === 'ios' ? (
                          <>
                            <View style={styles.create_val}>
                              {dateInform['showDatePicker1'] && (
                                <DateTimePicker
                                  style={{ flex: 1, width: '100%' }}
                                  value={dateInform['businessLeaveDateFrom']}
                                  mode="date"
                                  display="default"
                                  onChange={onChangeDate}
                                  minimumDate={new Date()}
                                />
                              )}
                            </View>
                            <View>
                              <Text style={styles.create_text_val}>
                                <Icon
                                  name="calendar"
                                  size={30}
                                  color="#2a416a"
                                  onPress={showDate}
                                />
                              </Text>
                            </View>
                          </>
                        ) : (
                          <View style={styles.create_val}>
                            <View>
                              <Text style={styles.create_text_val}>
                                {' '}
                                {dateInform['due_date']}{' '}
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
                                value={dateInform['businessLeaveDateFrom']}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                                minimumDate={new Date()}
                              />
                            )}
                          </View>
                        )}
                      </View>
                      <View style={styles.due_date_con}>
                        <View
                          style={{
                            height: 50,
                            justifyContent: 'center',
                            width: '30%',
                          }}
                        >
                          <Text style={styles.titleText}>Date To :</Text>
                        </View>
                        {Platform.OS === 'ios' ? (
                          <>
                            <View style={styles.create_val}>
                              {dateInform['showDatePicker2'] && (
                                <DateTimePicker
                                  style={{ flex: 1, width: '100%' }}
                                  value={dateInform['businessLeaveDateTo']}
                                  mode="date"
                                  display="default"
                                  onChange={onChangeDate2}
                                  minimumDate={
                                    dateInform['businessLeaveDateFrom']
                                  }
                                />
                              )}
                            </View>

                            <View>
                              <Text style={styles.create_text_val}>
                                <Icon
                                  name="calendar"
                                  size={30}
                                  color="#2a416a"
                                  onPress={showDate2}
                                />
                              </Text>
                            </View>
                          </>
                        ) : (
                          <View style={styles.create_val}>
                            <View>
                              <Text style={styles.create_text_val}>
                                {' '}
                                {dateInform['businessLeaveDateToPicker']}{' '}
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
                                value={dateInform['businessLeaveDateTo']}
                                mode="date"
                                display="default"
                                onChange={onChangeDate2}
                                minimumDate={new Date()}
                              />
                            )}
                          </View>
                        )}
                      </View>
                    </VStack>
                    {equalDates && (
                      <VStack>
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
                              <View
                                style={[styles.create_val, { width: '40%' }]}
                              >
                                {timeInform['showTimePicker1'] && (
                                  <DateTimePicker
                                    style={{ width: '100%' }}
                                    value={
                                      timeInform['timeFromForBusinessLeave']
                                    }
                                    mode="time"
                                    display="default"
                                    onChange={onChangeTime}
                                  />
                                )}
                              </View>

                              <View>
                                <Text style={[styles.create_text_val]}>
                                  {' '}
                                  <Icon
                                    name="clock-o"
                                    size={30}
                                    color="#2a416a"
                                    onPress={showTime}
                                  />{' '}
                                </Text>
                              </View>
                            </>
                          ) : (
                            <View style={styles.create_val}>
                              <View>
                                <Text style={styles.create_text_val}>
                                  {' '}
                                  {
                                    timeInform['timeFromForBusinessLeavePicker']
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
                                  value={timeInform['timeFromForBusinessLeave']}
                                  mode="time"
                                  display="default"
                                  onChange={onChangeTime}
                                />
                              )}
                            </View>
                          )}
                        </View>
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
                              <View
                                style={[styles.create_val, { width: '40%' }]}
                              >
                                {timeInform['showTimePicker2'] && (
                                  <DateTimePicker
                                    style={{ width: '100%' }}
                                    value={timeInform['timeToForBusinessLeave']}
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
                                  />{' '}
                                </Text>
                              </View>
                            </>
                          ) : (
                            <View style={styles.create_val}>
                              <View>
                                <Text style={styles.create_text_val}>
                                  {' '}
                                  {
                                    timeInform['timeToForBusinessLeavePicker']
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
                                  value={timeInform['timeToForBusinessLeave']}
                                  mode="time"
                                  display="default"
                                  onChange={onChangeTime2}
                                />
                              )}
                            </View>
                          )}
                        </View>
                      </VStack>
                    )}

                    <VStack>
                      <View style={styles.due_date_con}>
                        <View
                          style={{
                            height: 50,
                            justifyContent: 'center',
                            width: 150,
                          }}
                        >
                          <Text style={styles.titleText}>Apply Date:</Text>
                        </View>
                        <View style={styles.create_val}>
                          <FormInput
                            style={[{ width: 150 }]}
                            textInputConfig={{
                              value:
                                employeeLeaveInformation[
                                  'leaveDate'
                                ].toString(),
                              isDisabled: true,
                            }}
                          />
                        </View>
                      </View>

                      {!requestedDaysStatus && (
                        <View style={styles.due_date_con}>
                          <View
                            style={{
                              height: 50,
                              justifyContent: 'center',
                              width: '30%',
                            }}
                          >
                            <Text style={styles.titleText}>Days #:</Text>
                          </View>
                          <View style={styles.create_val}>
                            <FormInput
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
                      )}
                      {requestedDaysStatus && (
                        <View style={styles.due_date_con}>
                          <View
                            style={{
                              height: 50,
                              justifyContent: 'center',
                              width: '30%',
                            }}
                          >
                            <Text style={styles.titleText}>Hours #:</Text>
                          </View>
                          <View style={styles.create_val}>
                            <View>
                              {/* <Input
                              style={[styles.create_text_val, { padding: 30 }]}
                              variant="unstyled"
                              value={
                                employeeLeaveInformation[
                                  'howManyHoursEmployeeAskForBusinessLeave'
                                ]
                              }
                              isDisabled={true}
                              w="48%"
                            /> */}
                              <FormInput
                                textInputConfig={{
                                  value:
                                    employeeLeaveInformation[
                                      'howManyHoursEmployeeAskForBusinessLeave'
                                    ],
                                  isDisabled: true,
                                }}
                              />
                            </View>
                          </View>
                        </View>
                      )}
                    </VStack>
                    {Platform.OS === 'ios' ? (
                      <View style={[styles.due_date_con, { marginBottom: 20 }]}>
                        <View style={{ height: 50, justifyContent: 'center' }}>
                          <Text style={styles.titleText}>Status:</Text>
                        </View>
                        <View
                          style={[
                            styles.create_val,
                            { justifyContent: 'center' },
                          ]}
                        >
                          <RNPickerSelect
                            placeholder={{
                              label: 'Select Reason',
                              value: null,
                            }}
                            style={pickerSelectStyles}
                            onValueChange={(optionType) =>
                              checkReasonStatus(optionType)
                            }
                            items={[
                              { label: 'conference', value: 'conference' },
                              {
                                label: 'work from another country',
                                value: 'work from another country',
                              },
                              {
                                label: 'outsource patient',
                                value: 'outsource patient',
                              },
                              { label: 'other', value: 'other' },
                            ]}
                          />
                        </View>
                      </View>
                    ) : (
                      <View>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Select Reason',
                            value: null,
                          }}
                          style={pickerSelectStyles}
                          useNativeAndroidPickerStyle={false}
                          onValueChange={(optionType) =>
                            checkReasonStatus(optionType)
                          }
                          items={[
                            { label: 'conference', value: 'conference' },
                            {
                              label: 'work from another country',
                              value: 'work from another country',
                            },
                            {
                              label: 'outsource patient',
                              value: 'outsource patient',
                            },
                            { label: 'other', value: 'other' },
                          ]}
                        />
                      </View>
                    )}

                    <View>
                      <TextInput
                        onChangeText={handleOnChangeInput.bind(
                          this,
                          'reasonForBusineesLeave'
                        )}
                        value={
                          employeeLeaveInformation['reasonForBusineesLeave']
                        }
                        mode="flat"
                        activeUnderlineColor="#009688"
                        label="Note"
                      />
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Modal.Body>

          <Modal.Footer>
            <View style={styles.btnsContainer}>
              <View style={styles.Buttons}>
                <Button
                  android_ripple={{ color: 'blue' }}
                  onPress={() => dispatch(switchingLeaveTypes('Business'))}
                >
                  Cancel
                </Button>
              </View>
              <View style={styles.Buttons}>
                <Button onPress={submitLeaveRequest}>submit</Button>
              </View>
            </View>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
const styles = StyleSheet.create({
  wrapperContainer: {
    marginHorizontal: 16,
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  bottomModal: {
    marginBottom: 0,
    marginTop: 'auto',
  },

  due_date_con: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },

  create_val: {
    width: '50%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  create_text_val: {
    width: Platform.OS === 'ios' ? 100 : 180,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },

  TextInput: {
    width: '49%',
  },
  btnsContainer: {
    flexDirection: 'row',
  },

  Buttons: {
    // flex: 1,
    marginHorizontal: 8,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 10,
  },
});
export default BusinessLeaveForm;

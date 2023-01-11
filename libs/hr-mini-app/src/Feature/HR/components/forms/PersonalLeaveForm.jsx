import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewLeaveRequest,
  switchingLeaveTypes,
  changeLeaveRequetsUIFlag,
} from '../../store-Hr';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '@expo/vector-icons/FontAwesome';
import { Button, VStack, Modal } from 'native-base';
import {
  StyleSheet,
  View,
  Alert,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import FormInput from '../shared/FormInput';
import Title from '../shared/Title';

const PersonalLeaveForm = ({ employeeData }) => {
  const dispatch = useDispatch();
  const hrStore = useSelector((state) => state.hrStore);
  const dashboard = useSelector((state) => state.dashboard);
  const [selectModalType, setSelectModalType] = useState('');

  const [employeeLeaveInformation, setEmployeeLeaveInformation] = useState({
    name: employeeData
      ? employeeData.firstName + ' ' + employeeData.lastName
      : '',

    leaveDate: new Date().toISOString().slice(0, 10),
    requestedDays: '0',
    requestedHours: '0',
    howManyHoursEmployeeAskedForPersonalLeave: '0',
    // howManyHoursEmployeeAskedForPersonalLeaveForDb: 0,
    personalLeaveType: null,
    reasonForPersonalLeave: null,
  });
  const [
    howManyHoursEmployeeAskedForPersonalLeaveForDb,
    setHowManyHoursEmployeeAskedForPersonalLeaveForDb,
  ] = useState(0);
  const [requestedDaysStatus, setRequestedDaysStatus] = useState(false);

  /////////////////////////////////////
  ///initial values for date information
  const [dateInform, setDateInform] = useState({
    personalLeaveDateFrom: new Date(),
    due_date: '',
    personalLeaveDateTo: new Date(),
    personalLeaveDateToPicker: '',
    ///////////////////
    showDatePicker1: false,
    showDatePicker2: false,
    dateOneStatus: true,
    dateTwoStatus: true,
  });
  ///////////////////////////
  ///initial values for time information
  const [timeInform, setTimeInform] = useState({
    timeFromForPersonalLeave: new Date(),
    timeFromForPersonalLeavePicker: '',
    timeToForPersonalLeave: new Date(),
    timeToForPersonalLeavePicker: '',
    showTimePicker1: false,
    showTimePicker2: false,
    timeOneStatus: true,
    timeTwoStatus: true,
  });
  ////////////////////////////////
  const [reasonStatus, setReasonStatus] = useState(false);
  const [equalDates, setEqualDates] = useState(false);
  //////////////////////////////////
  /// functions
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
        personalLeaveDateFrom: currentDate,
        due_date: year + '-' + month + '-' + day,
        dateOneStatus: false,
      });
    } else {
      setDateInform({
        ...dateInform,
        personalLeaveDateFrom: currentDate,
        due_date: year + '-' + month + '-' + day,
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
      personalLeaveDateTo: currentDate,
      personalLeaveDateToPicker: year + '-' + month + '-' + day,
      showDatePicker2: false,
      dateTwoStatus: false,
    });
    const dateTimeInParts = dateInform['personalLeaveDateFrom']
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
        timeFromForPersonalLeave: currentDate,
        timeFromForPersonalLeavePicker: hourS + ':' + minutes,
        timeOneStatus: false,
      });
    } else {
      setTimeInform({
        ...timeInform,
        timeFromForPersonalLeave: currentDate,
        timeFromForPersonalLeavePicker: hourS + ':' + minutes,
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
        timeToForPersonalLeave: currentDate,
        timeToForPersonalLeavePicker: hourS + ':' + minutes,
        timeTwoStatus: false,
      });
      requestedHoursFormatting(selectedDate);
    } else {
      setTimeInform({
        ...timeInform,
        timeToForPersonalLeave: currentDate,
        timeToForPersonalLeavePicker: hourS + ':' + minutes,
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
    var date1 = new Date(dateInform['personalLeaveDateFrom']);
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
    if (timeInform['timeFromForPersonalLeave'] != selectedDate) {
      let actualTimeInMilliseconds =
        selectedDate.valueOf() -
        timeInform['timeFromForPersonalLeave'].valueOf();
      let howManyHoursEmployeeAskedForPersonalLeave =
        actualTimeInMilliseconds / (60 * 1000); //to convert it for munites and save it in database

      setHowManyHoursEmployeeAskedForPersonalLeaveForDb({
        howManyHoursEmployeeAskedForPersonalLeaveForDb:
          howManyHoursEmployeeAskedForPersonalLeave,
      });

      let hours = howManyHoursEmployeeAskedForPersonalLeave / 60;
      let rhours = Math.floor(hours);
      let minutes = (hours - rhours) * 60;
      let rminutes = Math.round(minutes);
      setEmployeeLeaveInformation({
        ...employeeLeaveInformation,
        howManyHoursEmployeeAskedForPersonalLeave: rhours + ':' + rminutes,
      });
    } else {
      setHowManyHoursEmployeeAskedForPersonalLeaveForDb({
        howManyHoursEmployeeAskedForPersonalLeaveForDb: 0,
      });

      setEmployeeLeaveInformation({
        ...employeeLeaveInformation,
        howManyHoursEmployeeAskedForPersonalLeave: '0',
      });
    }
  };
  useEffect(() => {
    setHowManyHoursEmployeeAskedForPersonalLeaveForDb(
      howManyHoursEmployeeAskedForPersonalLeaveForDb
    ); // This will always use latest value of count
  }, [howManyHoursEmployeeAskedForPersonalLeaveForDb]);
  /////////////////////////////////////////////////////////
  const checkReasonStatus = (optionType) => {
    setEmployeeLeaveInformation({
      ...employeeLeaveInformation,
      personalLeaveType: optionType,
    });
    if (optionType == 'other') {
      setReasonStatus(true);
    }
  };
  // const resetFields=()=>{

  // }
  ///////////////////////////////////////////
  async function submitLeaveRequest(event) {
    event.preventDefault();
    /////////////////////////////////////////
    const dateTimeInParts = dateInform['personalLeaveDateFrom']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateTimeInParts2 = dateInform['personalLeaveDateTo']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateOne = dateTimeInParts[0]; // "2021-08-31"
    const dateTwo = dateTimeInParts2[0]; // "2021-08-31"

    /////////////////////////////////////////
    try {
      if (dateOne == dateTwo) {
        let { name, personalLeaveType, reasonForPersonalLeave } =
          employeeLeaveInformation;
        // if (Platform.OS === 'ios') {
        //   let timeOne = timeInform['timeFromForPersonalLeave']
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
        //   let timeTwo = timeInform['timeToForPersonalLeave']
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
        //   if (
        //     !personalLeaveType ||
        //     timeInform['timeOneStatus'] ||
        //     timeInform['timeTwoStatus']
        //   ) {
        //     Alert.alert('Ivalid Inputs', 'Please fill all inputs');
        //     return;
        //   }
        //   let leaveObject = {
        //     providerName: name,
        //     providerUuid: dashboard.providerId,
        //     DateFrom: dateOne,
        //     dateTo: dateTwo,
        //     timeFrom: finalTimeOne,
        //     timeTo: finalTimeTwo,
        //     applyDate: new Date().toISOString().slice(0, 10),

        //     leaveType: 'personal',
        //     subLeaveType: personalLeaveType,
        //     howManyHoursEmployeeAskForBusinessLeave:
        //       howManyHoursEmployeeAskedForPersonalLeaveForDb.howManyHoursEmployeeAskedForPersonalLeaveForDb,
        //     reasonFromEmployee: reasonForPersonalLeave,
        //     EmployeeId: employeeData.id,
        //   };

        //   await dispatch(createNewLeaveRequest(leaveObject));
        //   dispatch(changeLeaveRequetsUIFlag());

        //   // dispatch(switchingLeaveTypes('Personal'));
        //   Alert.alert('Leave Request', 'Request sent successfully', [
        //     {
        //       text: 'Okay',
        //       onPress: () => dispatch(switchingLeaveTypes('Personal')),
        //     },
        //   ]);
        // }
        //  else {
        if (
          !personalLeaveType ||
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
          timeFrom: timeInform['timeFromForPersonalLeave']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          timeTo: timeInform['timeToForPersonalLeave']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          applyDate: new Date().toISOString().slice(0, 10),

          leaveType: 'personal',
          subLeaveType: personalLeaveType,
          howManyHoursEmployeeAskForBusinessLeave:
            howManyHoursEmployeeAskedForPersonalLeaveForDb.howManyHoursEmployeeAskedForPersonalLeaveForDb,
          reasonFromEmployee: reasonForPersonalLeave,
          EmployeeId: employeeData.id,
        };

        await dispatch(createNewLeaveRequest(leaveObject));
        dispatch(changeLeaveRequetsUIFlag());

        // dispatch(switchingLeaveTypes('Personal'));
        Alert.alert('Leave Request', 'Request sent successfully', [
          {
            text: 'Okay',
            onPress: () => dispatch(switchingLeaveTypes('Personal')),
          },
        ]);
        // }
      } else {
        let { name, personalLeaveType, requestedDays, reasonForPersonalLeave } =
          employeeLeaveInformation;

        if (
          !personalLeaveType ||
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

          leaveType: 'personal',
          subLeaveType: personalLeaveType,
          howManyDaysEmployeeAskForBusinessLeave: requestedDays,

          reasonFromEmployee: reasonForPersonalLeave,
          EmployeeId: employeeData.id,
        };

        await dispatch(createNewLeaveRequest(leaveObject));
        // dispatch(switchingLeaveTypes('Personal'));
        dispatch(changeLeaveRequetsUIFlag());

        Alert.alert('Leave Request', 'Request sent successfully', [
          {
            text: 'Okay',
            onPress: () => dispatch(switchingLeaveTypes('Personal')),
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      isOpen={hrStore.personalModal}
      avoidKeyboard
      height="100%"
      safeAreaTop={true}
    >
      <Modal.Content width="100%" style={styles.bottomModal}>
        <Modal.Header>
          {Platform.OS === 'ios' ? (
            <RNPickerSelect
              style={pickerSelectStyles}
              placeholder={{ label: 'Select leave type', value: null }}
              onValueChange={(optionType) =>
                dispatch(switchingLeaveTypes(optionType))
              }
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
              items={[
                { label: 'Business', value: 'Business' },
                { label: 'Sick', value: 'Sick' },
                { label: 'Personal', value: 'Personal' },
              ]}
            />
          )}

          <Title style={styles.title}>Personal Request Leave</Title>
        </Modal.Header>
        <Modal.Body>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              <View>
                <View style={{ marginTop: 10 }}>
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
                                value={dateInform['personalLeaveDateFrom']}
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
                              value={dateInform['personalLeaveDateFrom']}
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
                                value={dateInform['personalLeaveDateTo']}
                                mode="date"
                                display="default"
                                onChange={onChangeDate2}
                                minimumDate={
                                  dateInform['personalLeaveDateFrom']
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
                              {dateInform['personalLeaveDateToPicker']}{' '}
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
                              value={dateInform['personalLeaveDateTo']}
                              mode="date"
                              display="default"
                              onChange={onChangeDate2}
                              minimumDate={dateInform['personalLeaveDateFrom']}
                            />
                          )}
                        </View>
                      )}
                    </View>
                  </VStack>
                </View>
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
                          <View style={styles.create_val}>
                            {timeInform['showTimePicker1'] && (
                              <DateTimePicker
                                style={{ width: '100%' }}
                                value={timeInform['timeFromForPersonalLeave']}
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
                                timeInform['timeFromForPersonalLeavePicker']
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
                              value={timeInform['timeFromForPersonalLeave']}
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
                        <Text style={styles.titleText}>Time From :</Text>
                      </View>
                      {Platform.OS === 'ios' ? (
                        <>
                          <View style={styles.create_val}>
                            {timeInform['showTimePicker2'] && (
                              <DateTimePicker
                                style={{ width: '100%' }}
                                value={timeInform['timeToForPersonalLeave']}
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
                              {timeInform['timeToForPersonalLeavePicker']}{' '}
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
                              value={timeInform['timeToForPersonalLeave']}
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
                        width: '30%',
                      }}
                    >
                      <Text style={styles.titleText}>Apply Date:</Text>
                    </View>
                    <View style={styles.create_val}>
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
                        <View>
                          <Text>
                            <FormInput
                              textInputConfig={{
                                value:
                                  employeeLeaveInformation[
                                    'requestedDays'
                                  ].toString(),
                                isDisabled: true,
                              }}
                            />
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  {requestedDaysStatus && (
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Hours #:</Text>
                      </View>
                      <View style={styles.create_val}>
                        <View>
                          <FormInput
                            style={{ paddingHorzintal: 30 }}
                            textInputConfig={{
                              value:
                                employeeLeaveInformation[
                                  'howManyHoursEmployeeAskedForPersonalLeave'
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
                    <View
                      style={{
                        height: 50,
                        justifyContent: 'center',
                        width: '30%',
                      }}
                    >
                      <Text style={styles.titleText}>Status:</Text>
                    </View>
                    <View
                      style={[styles.create_val, { justifyContent: 'center' }]}
                    >
                      <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={{ label: 'Select Reason', value: null }}
                        onValueChange={(optionType) =>
                          checkReasonStatus(optionType)
                        }
                        items={[
                          { label: 'Casual leave', value: 'Casual leave' },
                          {
                            label: 'Religious holidays',
                            value: 'Religious holidays',
                          },
                          {
                            label: 'Maternity leave',
                            value: 'Maternity leave',
                          },
                          {
                            label: 'Paternity leave',
                            value: 'Paternity leave',
                          },
                          {
                            label: 'Bereavement leave',
                            value: 'Bereavement leave',
                          },
                          { label: 'other', value: 'other' },
                        ]}
                      />
                    </View>
                  </View>
                ) : (
                  <View>
                    <RNPickerSelect
                      style={pickerSelectStyles}
                      useNativeAndroidPickerStyle={false}
                      placeholder={{ label: 'Select Reason', value: null }}
                      onValueChange={(optionType) =>
                        checkReasonStatus(optionType)
                      }
                      items={[
                        { label: 'Casual leave', value: 'Casual leave' },
                        {
                          label: 'Religious holidays',
                          value: 'Religious holidays',
                        },
                        { label: 'Maternity leave', value: 'Maternity leave' },
                        { label: 'Paternity leave', value: 'Paternity leave' },
                        {
                          label: 'Bereavement leave',
                          value: 'Bereavement leave',
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
                      'reasonForPersonalLeave'
                    )}
                    value={employeeLeaveInformation['reasonForPersonalLeave']}
                    mode="flat"
                    activeUnderlineColor="#009688"
                    label="Note"
                  />
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
                onPress={() => dispatch(switchingLeaveTypes('Personal'))}
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
    width: Platform.OS === 'ios' ? 100 : 180,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },

  due_date_con: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },

  TextInput: {
    width: '49%',
  },
  btnsContainer: {
    flexDirection: 'row',
  },

  Buttons: {
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
export default PersonalLeaveForm;

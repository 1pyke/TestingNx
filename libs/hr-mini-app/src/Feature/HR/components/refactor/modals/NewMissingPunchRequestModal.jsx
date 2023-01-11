import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Platform, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from '@expo/vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import Title from '../../shared/Title';
import FormInput from '../../shared/FormInput';
import {
  createNewMissingService,
  createNewMissingInService,
} from '../../../util/http';
import { getFormattedDate } from '../../../util/dateFormatting';
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

const NewMissingPunchRequestModal = ({
  showMissingPunchDialog,
  setShowMissingPunchDialog,
  timeAttendanceData,
  employeeData,
}) => {
  const tokenStore = useSelector((state) => state.dashboard);
  // const [employeeLeaveInformation, setEmployeeLeaveInformation] = useState({
  //   name: employeeData.firstName ? employeeData.firstName : '',
  // });
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
    try {
      ///here we get all days thats have check out only and missing check in
      let arr = [];
      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      let firstDay = new Date(y, m, 1);
      let thisMonth = firstDay.toISOString().slice(0, 10); //here we get first day at month we currently in
      timeAttendanceData.row.timeAttendance?.forEach((item) => {
        if (
          item.date >= thisMonth &&
          item.date < getFormattedDate(new Date()) &&
          item.inStatus === null
        ) {
          arr.push({
            date: item.date,
            recordId: item.id,
          });
        }
      });

      if (arr.length > 0) {
        setMissingDaysArrForCheckIn(arr);
      } else {
        setMissingDaysArrForCheckIn([]);
      }
      return arr;
    } catch (error) {
      console.log(error);
    }
  };
  const missingDaysForCheckOut = () => {
    try {
      ///here we get all days thats have check in only and missing check out

      let arr = [];
      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      let firstDay = new Date(y, m, 1);
      let thisMonth = firstDay.toISOString().slice(0, 10);
      timeAttendanceData.row.timeAttendance?.forEach((item) => {
        if (
          item.date >= thisMonth &&
          item.date < getFormattedDate(new Date()) &&
          item.outStatus == null
        ) {
          arr.push({
            date: item.date,
            recordId: item.id,
          });
        }
      });
      if (arr.length > 0) {
        setMissingDaysArrForCheckOut(arr);
      } else {
        setMissingDaysArrForCheckOut([]);
      }
      return arr;
    } catch (error) {
      console.log(error);
    }
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
  const handleSubmitRequestForMissingPunch = async (
    position,
    selectedDateForCheckIn,
    selectedDateForCheckOut
  ) => {
    try {
      //here to submit request and hit the api depending on action type
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
        await createNewMissingService({
          recordId: selectedDateForCheckIn.recordId,
          timeIn: timeOneInform['timeFromForMissingPunch']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          employeeReason: { ar: '', en: reasonForMissingPunch },
          inStatus: { id: '2', name: { ar: '', en: 'Missing' } },
          createdBy: {
            id: '1',
            user: { ar: '', en: 'beshir' },
            system: 'agents',
            chanel: '12',
          },
        });
        Alert.alert('Missing Punch', 'Request sent successfully', [
          { text: 'Okay', onPress: () => setShowMissingPunchDialog(false) },
        ]);

        // this.resetFields();
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

        await createNewMissingInService({
          employee: {
            id: 'HHRS-HRP-JOR-c89d9ac1-087a-4f82-9e4e-34693d108151',
            img: null,
            name: { ar: '', en: 'beshir' },
          },
          timeIn: timeOneInform['timeFromForMissingPunch']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          date: dateInform['missingPunchDateForCheckInAndOutPicker'],
          inStatus: { id: '2', name: { ar: '', en: 'Missing' } },
          employeeReason: { ar: '', en: reasonForMissingPunch },
          createdBy: {
            id: '1',
            user: { ar: '', en: 'beshir' },
            system: 'agents',
            chanel: '12',
          },
        });
        await createNewMissingInService({
          employee: {
            id: 'HHRS-HRP-JOR-c89d9ac1-087a-4f82-9e4e-34693d108151',
            img: null,
            name: { ar: '', en: 'beshir' },
          },

          timeOut: timeTwoInform['timeToForMissingPunch']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          date: dateInform['missingPunchDateForCheckInAndOutPicker'],
          outStatus: { id: '2', name: { ar: '', en: 'Missing' } },
          employeeReason: { ar: '', en: reasonForMissingPunch },
          createdBy: {
            id: '1',
            user: { ar: '', en: 'beshir' },
            system: 'agents',
            chanel: '12',
          },
        });

        Alert.alert('Missing Punch', 'Request sent successfully', [
          { text: 'Okay', onPress: () => setShowMissingPunchDialog(false) },
        ]);
        // this.resetFields();
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
        await createNewMissingService({
          recordId: selectedDateForCheckOut.recordId,
          timeOut: timeTwoInform['timeToForMissingPunch']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          employeeReason: { ar: '', en: reasonForMissingPunch },

          outStatus: { id: '2', name: { ar: '', en: 'Missing' } },
          createdBy: {
            id: '1',
            user: { ar: '', en: 'beshir' },
            system: 'agents',
            chanel: '12',
          },
        });
        Alert.alert('Missing Punch', 'Request sent successfully', [
          { text: 'Okay', onPress: () => setShowMissingPunchDialog(false) },
        ]);
        // this.resetFields();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // function handleOnChangeInput(inputIdentifier, enteredValue) {
  //   setEmployeeLeaveInformation((currentValues) => {
  //     return {
  //       ...currentValues,
  //       [inputIdentifier]: enteredValue,
  //     };
  //   });
  // }
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
                {checkInstatus && Platform.OS === 'ios' && (
                  <RNPickerSelect
                    onValueChange={(nextValue) =>
                      setSelectedDateForCheckIn(nextValue)
                    }
                    onOpen={missingDaysForCheckIn}
                    style={pickerSelectStyles}
                    items={missingDaysArrForCheckIn?.map((val, i) => ({
                      label: val.date,
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
                      <Select.Item label={val.date} value={val} />
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
                        label: val.date,
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
                        <Select.Item label={val.date} value={val} />
                      ))}
                    </Select>
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

export default NewMissingPunchRequestModal;

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

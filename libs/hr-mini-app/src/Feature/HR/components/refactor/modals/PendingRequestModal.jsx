import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Platform } from 'react-native';

import Title from '../shared/Title';
import { useDispatch } from 'react-redux';
import { changeLeaveRequetsUIFlag } from '../../store-Hr';
import { Text, HStack, Button, VStack, Input, Modal } from 'native-base';
import Icon from '@expo/vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormInput from '../shared/FormInput';
import { updateLeaveRequestService } from '../../../util/http';
//////////////////////////////////////////
const PendingRequestModal = ({
  setShowPendingRequestsModal,
  showPendingRequestsModal,
  requestData,
}) => {
  /////////////////////////////////////
  const dispatch = useDispatch();
  const AuthStore = useSelector((state) => state.AuthStore);
  const hrStore = useSelector((state) => state.hrStore);

  const [facilityId, setFacilityId] = useState(
    'FAC-FCF-JOR-1bf94704-d0c4-4766-ad03-0c2f26fecd46'
  );
  const [employeeId, setEmployeeId] = useState(
    'HRS-HRP-JOR-1730c46d-3b82-4010-b89f-a18a4e4dfd0b'
  );


  const [employeeLeaveInformation, setEmployeeLeaveInformation] = useState({
    leaveDate: new Date().toISOString().slice(0, 10),
    requestedDays: requestData.totalDays
      ? requestData.totalDays.toString()
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
    dateFromToUpdateRequestFromEmployeePicker: requestData.dateFrom,
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
    console.log(requestData, 'requestDatarequestDatarequestDatarequestData');
    const dateTimeInParts = dateInform['dateFromToUpdateRequestFromEmployee']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateTimeInParts2 = dateInform['dateToToUpdateRequestFromEmployee']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateOne = dateTimeInParts[0]; // "2021-08-31"
    const dateTwo = dateTimeInParts2[0]; // "2021-08-31"
    try {
      if (requestData.dateFrom != requestData.dateTo) {
        if (dateInform['dateOneStatus'] || dateInform['dateTwoStatus']) {
          Alert.alert('Ivalid Inputs', 'Please fill all inputs');
          return;
        }

        await updateLeaveRequestService({
          recordId: requestData.id,
          status: {
            id: '5',
            name: {
              ar: '',
              en: 'Updated',
            },
          },
          dateFrom: dateOne,
          dateTo: dateTwo,
          totalDays: employeeLeaveInformation.requestedDays,
          facility: {
            id: AuthStore.user.facility.id || facilityId,
            name: AuthStore.user.facility.name || {
              en: 'Facility Name',
              ar: 'Facility Name',
            },
          },
          // totalHours: this.howManyHoursEmployeeAskForBusinessLeaveForDb,
          createdBy: {
            id: AuthStore.user.id || employeeId,
            user: AuthStore.user.name || {
              en: 'Employee Name',
              ar: 'Employee Name',
            },
            system: 'agents',
            chanel: '12',
          },
        });
        // dispatch(changeLeaveRequetsUIFlag());
        Alert.alert('Leave Request', 'Request sent successfully', [
          { text: 'Okay', onPress: () => setShowPendingRequestsModal(false) },
        ]);
      } else {
        if (timeInform['timeOneStatus'] || timeInform['timeTwoStatus']) {
          Alert.alert('Ivalid Inputs', 'Please fill all inputs');
          return;
        }

        updateLeaveRequestService({
          recordId: requestData.id,
          status: {
            id: '5',
            name: {
              ar: '',
              en: 'Updated',
            },
          },
          timeFrom: timeInform['timeFromToUpdateRequestFromEmployee']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          timeTo: timeInform['timeToToUpdateRequestFromEmployee']
            .toLocaleTimeString()
            .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3'),
          totalHours:
            howManyHoursEmployeeAskForBusinessLeaveForDb.howManyHoursEmployeeAskForBusinessLeaveForDb,
          createdBy: {
            id: AuthStore.user.id || employeeId,
            user: AuthStore.user.name || {
              en: 'Employee Name',
              ar: 'Employee Name',
            },
            system: 'agents',
            chanel: '12',
          },
          facility: {
            id: AuthStore.user.facility.id || facilityId,
            name: AuthStore.user.facility.name || {
              en: 'Facility Name',
              ar: 'Facility Name',
            },
          },
        });
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
                {requestData.dateFrom != requestData.dateTo ? (
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
                  </VStack>
                )}
                <VStack>
                  {requestData.DateFrom != requestData.dateTo ? (
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Days #:</Text>
                      </View>
                      <View style={styles.create_val}>
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
                        <FormInput
                          style={{ paddingHorizontal: 30 }}
                          textInputConfig={{
                            value: employeeLeaveInformation['requestedHours'],
                            isDisabled: true,
                          }}
                        />
                      </View>
                    </View>
                  )}
                </VStack>
                <View style={styles.due_date_con}>
                  <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text style={styles.titleText}>Reason:</Text>
                  </View>
                  <View style={styles.create_val}>
                    <Input
                      variant="unstyled"
                      value={requestData.subType.name.en}
                      isDisabled={true}
                    />
                  </View>
                </View>

                <View style={styles.due_date_con}>
                  <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text style={styles.titleText}>Manager Reason:</Text>
                  </View>
                  <View style={styles.create_val}>
                    <Input
                      style={[styles.create_text_val, { padding: 30 }]}
                      variant="unstyled"
                      value={requestData.managerReason}
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
    color: '#194569',
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
export default PendingRequestModal;

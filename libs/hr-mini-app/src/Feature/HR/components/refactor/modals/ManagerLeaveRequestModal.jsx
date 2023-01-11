import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import requestBuilder from '../../../../requestBuilder';
import { changeLeaveRequetsUIFlagManager } from '../../store-Hr';
import {useDispatch, useSelector} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import Title from '../../shared/Title';
import { Text, HStack, Button, Input, VStack, Modal } from 'native-base';
import { updateLeaveRequestService } from '../../../util/http';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

function ManagerLeaveRequestModal({ showModal, setshowModal, targetReq }) {
  const AuthStore = useSelector((state) => state.AuthStore);
  const hrStore = useSelector((state) => state.hrStore);

  const [facilityId, setFacilityId] = useState(
    'FAC-FCF-JOR-1bf94704-d0c4-4766-ad03-0c2f26fecd46'
  );
  const [employeeId, setEmployeeId] = useState(
    'HRS-HRP-JOR-1730c46d-3b82-4010-b89f-a18a4e4dfd0b'
  );

  const [position, setPosition] = useState('');
  const [reason, setReason] = useState('');
  const [hoursFormmat, setHoursFormmat] = useState('');
  const [managerReason, setManagerReason] = React.useState('');
  const [color, setColor] = useState(0);

  const handleChange = (text) => setManagerReason(text);
  //   useEffect(() => {
  //     handleHoursFormating();
  //   }, []);
  const dispatch = useDispatch();

  //   const handleHoursFormating = () => {
  //     let hours = targetReq.howManyHoursEmployeeAskedFor / 60;
  //     let rhours = Math.floor(hours);
  //     let minutes = (hours - rhours) * 60;
  //     let rminutes = Math.round(minutes);
  //     setHoursFormmat(rhours + ':' + rminutes);
  //   };
  //   const handleSubmitRequest = async (position) => {
  //     try {
  //       if (position == 'On Hold') {
  //         const validReason = reason !== '';

  //         if (!validReason) {
  //           Alert.alert('Ivalid Inputs', 'Please fill all inputs');
  //           return;
  //         }
  //         await axios(
  //           requestBuilder('hr', '/updateLeaveForEmployee', 'put', {
  //             leaveIdUpdate: targetReq.id,
  //           })
  //         );
  //         await axios(
  //           requestBuilder('hr', '/leaveApplication', 'post', {
  //             employeeName: targetReq.employeeName,
  //             providerUuid: targetReq.providerUuid,
  //             applyDate: targetReq.applyDate,
  //             ///////////////

  //             DateFrom: targetReq.DateFrom,
  //             dateTo: targetReq.dateTo,
  //             ///////////////

  //             timeFrom: targetReq.timeFrom,
  //             timeTo: targetReq.timeTo,
  //             ///////////////
  //             leaveType: targetReq.leaveType,
  //             subType.name.en: targetReq.subType.name.en,
  //             isApproved: 'on hold',
  //             //////////////

  //             howManyDaysEmployeeAskForBusinessLeave:
  //               targetReq.howManyDaysEmployeeAskedFor,
  //             howManyHoursEmployeeAskForBusinessLeave:
  //               targetReq.howManyHoursEmployeeAskedFor,
  //             ///////////////
  //             reasonFromManager: reason,

  //             EmployeeId: targetReq.EmployeeId,
  //           })
  //         );
  //         dispatch(changeLeaveRequetsUIFlagManager());

  //         Alert.alert('Leave Request', 'Request sent successfully', [
  //           { text: 'Okay', onPress: () => setshowModal(false) },
  //         ]);
  //       }
  //       ///////////////////////////////////////////////////////////////////////////////////////////accept and reject
  //       else if (position == 'Accept') {
  //         try {
  //           await axios(
  //             requestBuilder('hr', '/acceptRejectLeaveRequest', 'put', {
  //               leaveId: targetReq.id,
  //               requestedDays: targetReq.howManyDaysEmployeeAskedFor,
  //               requestedHours: targetReq.howManyHoursEmployeeAskedFor,
  //               providerUuid: targetReq.providerUuid,
  //               leaveType: targetReq.leaveType,
  //             })
  //           );
  //           dispatch(changeLeaveRequetsUIFlagManager());

  //           Alert.alert('Leave Request', 'Leave request is accepted', [
  //             { text: 'Okay', onPress: () => setshowModal(false) },
  //           ]);
  //         } catch (error) {
  //           console.log(error, 'error');
  //         }
  //       }
  //       /////////////////////////////////////////////////////////////////////
  //       else if (position == 'Refuse') {
  //         await axios(
  //           requestBuilder('hr', '/acceptRejectLeaveRequest', 'put', {
  //             leaveIdReject: targetReq.id,
  //             typeFromRefused: targetReq.leaveType,
  //           })
  //         );
  //         dispatch(changeLeaveRequetsUIFlagManager());

  //         Alert.alert('Leave Request', 'Leave request is refused', [
  //           { text: 'Okay', onPress: () => setshowModal(false) },
  //         ]);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const onChange = (e) => {
    let val = e.nativeEvent.text;
    setReason(val);
  };
  const handleSubmitRequest = async (action) => {
    await updateLeaveRequestService({
      recordId: targetReq.id,
      status: action,
      managerReason: managerReason,
      facility: {
        id: AuthStore.user.facility.id,
        name: AuthStore.user.facility.name || {
          en: 'Facility Name',
          ar: 'Facility Name',
        },
      },
      createdBy: {
        id: AuthStore.user.id,
        user: AuthStore.user.name || {
          en: 'Employee Name',
          ar: 'Employee Name',
        },
        system: 'agents',
        chanel: '12',
      },
    });
    Alert.alert('Leave Request', 'Request submitted successfully', [
      {
        text: 'Okay',
        onPress: () => setshowModal(false),
      },
    ]);
  };
  return (
    <Modal isOpen={showModal} height="100%" safeAreaTop={true}>
      <Modal.Content width="100%" style={styles.bottomModal}>
        <Modal.Header>
          <Title style={styles.title}> Leave Request </Title>
        </Modal.Header>
        <Modal.Body>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              <View>
                <View style={styles.due_date_con}>
                  <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text style={[styles.titleText]}>Name:</Text>
                  </View>
                  <View
                    style={[styles.create_val, { justifyContent: 'center' }]}
                  >
                    <Text>{targetReq.employee.name.en}</Text>
                  </View>
                </View>

                {targetReq.dateFrom != targetReq.dateTo ? (
                  <VStack>
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Date From:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text>{targetReq.dateFrom}</Text>
                      </View>
                    </View>
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Date To:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text>{targetReq.dateTo}</Text>
                      </View>
                    </View>
                  </VStack>
                ) : (
                  <VStack>
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Date:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text>{targetReq.dateFrom}</Text>
                      </View>
                    </View>
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Time From:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text>{targetReq.timeFrom}</Text>
                      </View>
                    </View>
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Time To:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text>{targetReq.timeTo}</Text>
                      </View>
                    </View>
                  </VStack>
                )}
                <VStack>
                  {/* {targetReq.dateFrom != targetReq.dateTo ? (
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Days #:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text>
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.due_date_con}>
                      <View style={{ height: 50, justifyContent: 'center' }}>
                        <Text style={styles.titleText}>Hours #:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        {hoursFormmat}
                      </View>
                    </View>
                  )} */}
                </VStack>
                <View style={[styles.due_date_con, { marginBottom: 20 }]}>
                  <View style={{ height: 50, justifyContent: 'center' }}>
                    <Text style={styles.titleText}>Reason:</Text>
                  </View>
                  <View
                    style={[styles.create_val, { justifyContent: 'center' }]}
                  >
                    <Text>{targetReq.subType.name.en}</Text>
                  </View>
                </View>
                {/* {Platform.OS === 'ios' ? (
                  <View style={[styles.due_date_con, { marginBottom: 20 }]}>
                    <View style={{ height: 50, justifyContent: 'center' }}>
                      <Text style={styles.titleText}>Status:</Text>
                    </View>
                    <View
                      style={[styles.create_val, { justifyContent: 'center' }]}
                    >
                      <RNPickerSelect
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: 'Select status', value: null }}
                        onValueChange={(nextValue) => setPosition(nextValue)}
                        items={[
                          {
                            label: 'Accept',
                            value: {
                              id: '2',
                              name: { ar: '', en: 'Accepted' },
                            },
                          },
                          {
                            label: 'Refuse',
                            value: {
                              id: '3',
                              name: { ar: '', en: 'Rejected' },
                            },
                          },
                          {
                            label: 'On Hold',
                            value: {
                              id: '4',
                              name: { ar: '', en: 'Pending' },
                            },
                          },
                        ]}
                      />

                    </View>
                  </View>
                ) : (
                  <View>
                    <RNPickerSelect
                      style={pickerSelectStyles}
                      useNativeAndroidPickerStyle={false}
                      placeholder={{ label: 'Select status', value: null }}
                      onValueChange={(nextValue) => setPosition(nextValue)}
                      items={[
                        {
                          label: 'Accept',
                          value: {
                            id: '2',
                            name: { ar: '', en: 'Accepted' },
                          },
                        },
                        {
                          label: 'Refuse',
                          value: {
                            id: '3',
                            name: { ar: '', en: 'Rejected' },
                          },
                        },
                        {
                          label: 'On Hold',
                          value: {
                            id: '4',
                            name: { ar: '', en: 'Pending' },
                          },
                        },
                      ]}
                    />
                  </View>
                )} */}
                <View style={{ marginBottom: 10 }}>
                  <HStack justifyContent="space-around">
                    <Icon
                      m="2"
                      ml="3"
                      size={26}
                      color={color === 1 ? 'green' : 'gray'}
                      name="check-outline"
                      onPress={() => {
                        setPosition({
                          id: '2',
                          name: { ar: '', en: 'Accepted' },
                        });
                        setColor(1);
                      }}
                    />
                    <Icon
                      m="2"
                      ml="3"
                      size={26}
                      color={color === 2 ? 'red' : 'gray'}
                      name="close-circle-outline"
                      onPress={() => {
                        setPosition({
                          id: '3',
                          name: { ar: '', en: 'Rejected' },
                        });
                        setColor(2);
                      }}
                    />
                    <Icon
                      m="2"
                      ml="3"
                      size={26}
                      color={color === 3 ? 'orange' : 'gray'}
                      name="pause-circle-outline"
                      onPress={() => {
                        setPosition({
                          id: '4',
                          name: { ar: '', en: 'Pending' },
                        });
                        setColor(3);
                      }}
                    />
                  </HStack>
                </View>
                {position !== '' && position.name.en == 'Pending' && (
                  <Input
                    variant="underlined"
                    placeholder="Reason"
                    value={managerReason}
                    onChangeText={handleChange}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <HStack space={5} justifyContent="center">
            <Button
              size="sm"
              onPress={() => {
                setshowModal(false);
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="secondary"
              onPress={() => handleSubmitRequest(position)}
            >
              Submit
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapperContainer: {
    marginHorizontal: 16,
  },
  title: {
    marginVertical: 8,
    textAlign: 'center',
    fontSize: 20,
    color: '#194569',
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
    width: '70%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  create_text_val: {
    width: 220,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    padding: 30,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
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
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 10,
  },
});
export default ManagerLeaveRequestModal;

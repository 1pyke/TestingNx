import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../store-Hr';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Pressable,
  Text,
  Box,
  HStack,
  VStack,
  IconButton,
  Divider,
  Center,
  Input,
} from 'native-base';
import PendingRequestsForEmployee from '../modals/PendingRequestsForEmployee';
import ShowEmployeeLeaveModal from '../modals/ShowLeaveRequestEmployeeModal';
import FilterModal from '../modals/FilterModal';
const EmployeeLeaveRequests = ({
  allLeaveRequestsDataForEmployee,
  pendingRequestsForEmployee,
  acceptedrejectedRequests,
  employeeUuid,
  noRequestsMessage,
  role,
  leaveRequestsData,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showEmployeeLeaveModal, setShowEmployeeLeaveModal] = useState(false);
  const [targetReq, setTargetReq] = useState();
  const [showFilterModal, setShowFilterModal] = useState(false);

  // const [allLeaveRequestsDataForEmployee, setAllLeaveRequestsDataForEmployee] =
  //   useState([]);
  const [showPendingRequestsModal, setShowPendingRequestsModal] =
    useState(false);
  const [requestData, setRequestData] = useState(false);
  const [typesGroupValues, setTypesGroupValues] = React.useState([]);
  const [statusGroupValues, setStatusGroupValues] = React.useState([]);
  const [dateInform, setDateInform] = useState({
    businessLeaveDateFrom: new Date(),
    due_date: '',
    showDatePicker1: false,
  });

  // const [pendingRequestsForEmployee, setPendingRequestsForEmployee] = useState(
  //   []
  // );
  ///to handle filter on date
  const onChangeDateCallback = (event, selectedDate) => {
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
      });
    } else {
      setDateInform({
        ...dateInform,
        businessLeaveDateFrom: currentDate,
        due_date: year + '-' + month + '-' + day,
        businessLeaveDateTo: new Date(),
        showDatePicker1: false,
      });
    }
  };

  ///to handle filter on leave type
  const handleCallbackTypesFilter = (childData) => {
    setTypesGroupValues(childData);
  };

  ///to handle filter on leave status

  const handleCallbackStatusFilter = (childData) => {
    setStatusGroupValues(childData);
  };
  ///to handle filter button
  async function handleFilterAction(event) {
    event.preventDefault();
    /////////////////////////////////////////
    const dateTimeInParts = dateInform['businessLeaveDateFrom']
      .toISOString()
      .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    const dateOne = dateTimeInParts[0]; // "2021-08-31"
    try {
      console.log('hiiiiiiiiiii');
    } catch (error) {
      console.log(error);
    }
  }

  const statusBorderColor = (status) => {
    switch (status) {
      case 'New':
        return 'blue';
      case 'Updated':
        return 'orange';
      case 'Accepted':
        return 'green';

      case 'Rejected':
        return 'red';
    }
  };

  const typeBorderColor = (status) => {
    switch (status) {
      case 'business':
        return '#000080';

      case 'personal':
        return '#fa8072';
      case 'accepted':
        return '#2e8b57';

      case 'sick':
        return '#c0c0c0';

      default:
        return 'pink';
    }
  };

  return (
    <View>
      {noRequestsMessage == 'filled' ? (
        <ScrollView>
          <View style={styles.gridItem}>
            <Input
              placeholder="Search Employees"
              width="100%"
              borderRadius="4"
              py="3"
              px="1"
              fontSize={14}
              InputLeftElement={
                <Icon
                  m="2"
                  ml="3"
                  size={26}
                  color="#5f84a2"
                  name="filter-outline"
                  onPress={() => setShowFilterModal(true)}
                />
              }
              // InputRightElement={
              //   <Icon
              //     m="2"
              //     mr="3"
              //     size="6"
              //     color="gray.400"
              //     as={<MaterialIcons name="mic" />}
              //   />
              // }
            />
            {/* <HStack space={10}> */}
            {/* <Text fontSize="xl">Leave Requsets</Text> */}
            {/* {role != 'not employee' && (
                <IconButton
                  bg={'#5f84a2'}
                  shadow={9}
                  w="35"
                  h="35"
                  style={styles.QuickActionsBtn}
                  variant="solid"
                  borderRadius="full"
                  size="sm"
                  onPress={() => dispatch(toggleModal())}
                  icon={
                    <Icon
                      style={{ fontSize: 16, color: 'white' }}
                      name="plus"
                    />
                  }
                />
              )} */}

            {/* </HStack> */}
            <Divider my="3" />
            {noRequestsMessage == 'filled' ? (
              <ScrollView>
                {allLeaveRequestsDataForEmployee?.map((el, index) => {
                  if (el.DateFrom == el.dateTo) {
                    return (
                      <Pressable
                        onPress={() => {
                          setShowEmployeeLeaveModal(!showEmployeeLeaveModal);
                          setTargetReq(el);
                        }}
                      >
                        <View
                          style={{
                            padding: 10,
                            marginTop: 10,
                            marginRight: 10,
                            height: 130,
                            borderRadius: 12,
                            elevation: 4,
                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOpacity: 0.25,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 8,
                            borderLeftWidth: 3,
                            borderLeftColor: typeBorderColor(el.leaveType),
                          }}
                          key={index}
                        >
                          <HStack
                            space={5}
                            h="100"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <VStack>
                              <Text style={{ fontSize: 16, fontWeight: '600' }}>
                                {el.subLeaveType}
                              </Text>
                              <HStack space={7}>
                                <Box>
                                  <Text>
                                    {el.timeFrom} - {el.timeTo}
                                  </Text>
                                </Box>

                                <Box
                                  style={{
                                    borderWidth: 2,
                                    borderRadius: 5,
                                    borderColor: statusBorderColor(
                                      el.isApproved
                                    ),
                                    padding: 2,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: statusBorderColor(el.isApproved),
                                    }}
                                  >
                                    {el.isApproved}
                                  </Text>
                                </Box>
                              </HStack>
                            </VStack>
                          </HStack>
                        </View>
                      </Pressable>
                    );
                  } else {
                    return (
                      <Pressable
                        onPress={() => {
                          setShowEmployeeLeaveModal(!showEmployeeLeaveModal);
                          setTargetReq(el);
                        }}
                      >
                        <View
                          style={{
                            padding: 10,
                            marginTop: 10,
                            borderRadius: 12,
                            elevation: 4,
                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOpacity: 0.25,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 8,
                            borderLeftWidth: 3,
                            borderLeftColor: typeBorderColor(el.leaveType),
                            marginRight: 10,
                            height: 130,
                          }}
                          key={index}
                        >
                          <HStack
                            space={5}
                            h="100"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <VStack>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '600',
                                  marginBottom: 5,
                                }}
                              >
                                {el.subLeaveType}
                              </Text>
                              <HStack space={7}>
                                <Box style={{ marginBottom: 5 }}>
                                  <Text>
                                    {el.DateFrom.slice(5)} -{' '}
                                    {el.dateTo.slice(5)}
                                  </Text>
                                </Box>

                                <Box
                                  style={{
                                    borderWidth: 2,
                                    borderRadius: 5,
                                    borderColor: statusBorderColor(
                                      el.isApproved
                                    ),
                                    padding: 2,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: statusBorderColor(el.isApproved),
                                    }}
                                  >
                                    {el.isApproved}
                                  </Text>
                                </Box>
                              </HStack>
                            </VStack>
                          </HStack>
                        </View>
                      </Pressable>
                    );
                  }
                })}

                {pendingRequestsForEmployee?.map((el, index) => {
                  if (el.DateFrom == el.dateTo) {
                    return (
                      <Pressable
                        onPress={() => {
                          setShowPendingRequestsModal(
                            !showPendingRequestsModal
                          );
                          setRequestData(el);
                        }}
                      >
                        <View
                          style={{
                            padding: 10,
                            marginTop: 10,
                            borderRadius: 12,
                            elevation: 4,
                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOpacity: 0.25,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 8,
                            borderLeftWidth: 3,
                            borderLeftColor: typeBorderColor(el.leaveType),
                            marginRight: 10,
                            height: 130,
                          }}
                          key={index}
                        >
                          <HStack
                            space={5}
                            h="100"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <VStack>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '600',
                                  marginBottom: 5,
                                }}
                              >
                                {el.subLeaveType}
                              </Text>
                              <HStack space={7}>
                                <Box style={{ marginBottom: 5 }}>
                                  <Text>
                                    {el.timeFrom} - {el.timeTo}
                                  </Text>
                                </Box>

                                <Box
                                  style={{
                                    borderWidth: 3,
                                    borderRadius: 5,
                                    borderColor: statusBorderColor(
                                      el.isApproved
                                    ),
                                    padding: 2,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: statusBorderColor(el.isApproved),
                                    }}
                                  >
                                    {el.isApproved}
                                  </Text>
                                </Box>
                              </HStack>
                            </VStack>
                          </HStack>
                        </View>
                      </Pressable>
                    );
                  } else {
                    return (
                      <Pressable
                        onPress={() => {
                          setShowPendingRequestsModal(
                            !showPendingRequestsModal
                          );
                          setRequestData(el);
                        }}
                      >
                        <View
                          style={{
                            padding: 10,
                            marginTop: 10,
                            borderRadius: 12,
                            elevation: 4,
                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOpacity: 0.25,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 8,
                            borderLeftColor: typeBorderColor(el.leaveType),
                            marginRight: 10,
                            height: 130,
                          }}
                          key={index}
                        >
                          <HStack
                            space={5}
                            h="100"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <VStack>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '600',
                                  marginBottom: 5,
                                }}
                              >
                                {el.subLeaveType}
                              </Text>
                              <HStack space={7}>
                                <Box style={{ marginBottom: 5 }}>
                                  <Text>
                                    {el.DateFrom} - {el.dateTo}
                                  </Text>
                                </Box>

                                <Box
                                  style={{
                                    borderWidth: 3,
                                    borderRadius: 5,
                                    borderColor: statusBorderColor(
                                      el.isApproved
                                    ),
                                    padding: 2,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: statusBorderColor(el.isApproved),
                                    }}
                                  >
                                    {el.isApproved}
                                  </Text>
                                </Box>
                              </HStack>
                            </VStack>
                          </HStack>
                        </View>
                      </Pressable>
                    );
                  }
                })}
                {showPendingRequestsModal && (
                  <PendingRequestsForEmployee
                    requestData={requestData}
                    showPendingRequestsModal={showPendingRequestsModal}
                    setShowPendingRequestsModal={setShowPendingRequestsModal}
                  />
                )}
                {showEmployeeLeaveModal && (
                  <ShowEmployeeLeaveModal
                    targetReq={targetReq}
                    showEmployeeLeaveModal={showEmployeeLeaveModal}
                    setShowEmployeeLeaveModal={setShowEmployeeLeaveModal}
                  />
                )}
                {acceptedrejectedRequests?.map((el, index) => {
                  if (el.DateFrom == el.dateTo) {
                    return (
                      <Pressable
                        onPress={() => {
                          setShowEmployeeLeaveModal(!showEmployeeLeaveModal);
                          setTargetReq(el);
                        }}
                      >
                        <View
                          style={{
                            padding: 10,
                            marginTop: 10,
                            borderRadius: 12,
                            elevation: 4,
                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOpacity: 0.25,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 8,
                            borderLeftColor: typeBorderColor(el.leaveType),
                            marginRight: 10,
                            height: 130,
                          }}
                          key={index}
                        >
                          <HStack
                            space={5}
                            h="100"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <VStack>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '600',
                                  marginBottom: 5,
                                }}
                              >
                                {el.subLeaveType}
                              </Text>
                              <HStack space={7}>
                                <Box style={{ marginBottom: 5 }}>
                                  <Text>
                                    {el.timeFrom} - {el.timeTo}
                                  </Text>
                                </Box>

                                <Box
                                  style={{
                                    borderWidth: 2,
                                    borderRadius: 5,
                                    borderColor: statusBorderColor(
                                      el.isApproved
                                    ),
                                    padding: 2,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: statusBorderColor(el.isApproved),
                                    }}
                                  >
                                    {el.isApproved}
                                  </Text>
                                </Box>
                              </HStack>
                            </VStack>
                          </HStack>
                        </View>
                      </Pressable>
                    );
                  } else {
                    return (
                      <Pressable
                        onPress={() => {
                          setShowEmployeeLeaveModal(!showEmployeeLeaveModal);
                          setTargetReq(el);
                        }}
                      >
                        <View
                          style={{
                            padding: 10,
                            marginTop: 10,
                            borderRadius: 12,
                            elevation: 4,
                            backgroundColor: 'white',
                            shadowColor: 'black',
                            shadowOpacity: 0.25,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 8,
                            borderLeftWidth: 3,
                            borderLeftColor: typeBorderColor(el.leaveType),
                            marginRight: 10,
                            height: 130,
                          }}
                          key={index}
                        >
                          <HStack
                            space={5}
                            h="100"
                            justifyContent="flex-start"
                            alignItems="center"
                          >
                            <VStack>
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: '600',
                                  marginBottom: 5,
                                }}
                              >
                                {el.subLeaveType}
                              </Text>
                              <HStack space={7}>
                                <Box style={{ marginBottom: 5 }}>
                                  <Text>
                                    {el.DateFrom} - {el.dateTo}
                                  </Text>
                                </Box>

                                <Box
                                  style={{
                                    borderWidth: 2,
                                    borderRadius: 5,
                                    borderColor: statusBorderColor(
                                      el.isApproved
                                    ),
                                    padding: 2,
                                  }}
                                >
                                  <Text
                                    style={{
                                      color: statusBorderColor(el.isApproved),
                                    }}
                                  >
                                    {el.isApproved}
                                  </Text>
                                </Box>
                              </HStack>
                            </VStack>
                          </HStack>
                        </View>
                      </Pressable>
                    );
                  }
                })}
              </ScrollView>
            ) : (
              <Center>
                <Text style={{ fontSize: 20 }}>There's No Requests Yet</Text>
              </Center>
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.gridItem}>
          <HStack space={10}>
            <Text fontSize="xl">Leave Requsets</Text>
            {role != 'not employee' && (
              <IconButton
                bg={'#80CBC4'}
                shadow={9}
                w="35"
                h="35"
                style={styles.QuickActionsBtn}
                variant="solid"
                borderRadius="full"
                size="sm"
                onPress={() => dispatch(toggleModal())}
                icon={
                  <Icon style={{ fontSize: 16, color: 'white' }} name="plus" />
                }
              />
            )}
          </HStack>
          <Divider my="3" />

          <Center>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
              There's No Requests Yet
            </Text>
          </Center>
        </View>
      )}
      <FilterModal
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        handleCallbackTypes={handleCallbackTypesFilter}
        typesGroupValues={typesGroupValues}
        handleCallbackStatus={handleCallbackStatusFilter}
        statusGroupValues={statusGroupValues}
        onChangeDateCallback={onChangeDateCallback}
        dateInform={dateInform}
        setDateInform={setDateInform}
        handleFilterAction={handleFilterAction}
        type="employeeLeaves"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: '100%',
    width: '93%',
    padding: 15,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  leaveRequest: {
    width: '100%',
    height: 100,
    borderLeftWidth: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
    margin: 3,
  },
  container: {
    flex: 1,
  },
});

export default EmployeeLeaveRequests;

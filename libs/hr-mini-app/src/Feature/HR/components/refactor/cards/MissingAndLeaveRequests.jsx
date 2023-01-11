// import { View, Text } from 'react-native';
// import React from 'react';

// const MissingAndLeaveRequests = () => {
//   return (
//     <View>
//       <Text>MissingAndLeaveRequests</Text>
//     </View>
//   );
// };

// export default MissingAndLeaveRequests;

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';
import {
  Pressable,
  Box,
  HStack,
  VStack,
  Divider,
  Center,
  Platform,
  Text,
  Input,
  Avatar,
  IconButton,
} from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import FilterModal from '../../modals/FilterModal';
import ManagerLeaveRequestModal from '../modals/ManagerLeaveRequestModal';
import { useFocusEffect } from '@react-navigation/native';
import {
  getTimeAttendanceDataService,
  acceptMissingInService,
  acceptMissingOutService,
  rejectMissingInService,
  rejectMissingOutService,
} from '../../../util/http';
const MissingAndLeaveRequests = ({ allLeaveRequestsData }) => {
  const [showModal, setshowModal] = useState(false);
  const [targetReq, settargetReq] = useState();
  const [employeesNames, setEmployeesNames] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [employeesGroupValues, setEmployeesGroupValues] = React.useState([]);
  const [typesGroupValues, setTypesGroupValues] = React.useState([]);
  const [leaveCompStatus, setLeaveCompStatus] = useState(true);
  const [missingCompStatus, setMissingCompStatus] = useState(true);
  const [ready, setReady] = useState(false);
  const [dateInform, setDateInform] = useState({
    businessLeaveDateFrom: new Date(),
    due_date: '',
    showDatePicker1: false,
  });
  ////////////////////////
  ///missing states
  const [checkinMissingRequests, setCheckinMissingRequests] = useState();
  const [checkoutMissingRequests, setCheckoutMissingRequests] = useState();
  const [missingPunchUIFlag, setMissingPunchUIFlag] = useState(false);
  /////////////////////////////////////////////////////
  ///missing functions
  useFocusEffect(
    React.useCallback(() => {
      let response = async () => {
        const data = await getTimeAttendanceDataService({
          limit: 0,
          offset: 0,
          arrayId: null,
          inStatusId: ['2'],
          outStatusId: null,
          dateFrom: null,
          dateTo: null,
        });

        setCheckinMissingRequests(
          data.data.row.timeAttendance.length > 0
            ? data.data.row.timeAttendance
            : null
        );
      };
      response();
    }, [missingPunchUIFlag])
  );
  useFocusEffect(
    React.useCallback(() => {
      let response = async () => {
        const data = await getTimeAttendanceDataService({
          limit: 0,
          offset: 0,
          arrayId: null,
          inStatusId: null,
          outStatusId: ['2'],
          dateFrom: null,
          dateTo: null,
        });

        setCheckoutMissingRequests(
          data.data.row.timeAttendance.length > 0
            ? data.data.row.timeAttendance
            : null
        );
      };
      response();
    }, [missingPunchUIFlag])
  );

  const handleAccept = async (item, type) => {
    Alert.alert('Alert', 'Are you Sure ?', [
      {
        text: 'Yes',
        style: 'default',
        onPress: () => handleAcceptAlert(item, type),
      },
      { text: 'No', style: 'cancel' },
    ]);
  };
  const handleAcceptAlert = async (item, type) => {
    if (type == 'in') {
      await acceptMissingInService({
        recordId: item.id,
        inStatus: {
          id: '4',
          name: {
            ar: '',
            en: 'missingAccepted',
          },
        },
        timeOut: 'null',
        createdBy: {
          id: '1',
          user: { ar: '', en: 'beshir khaled' },
          system: 'agents',
          chanel: '12',
        },
      });

      setMissingPunchUIFlag(!missingPunchUIFlag);
    } else if (type == 'out') {
      await acceptMissingOutService({
        recordId: item.id,
        outStatus: {
          id: '4',
          name: {
            ar: '',
            en: 'missingAccepted',
          },
        },
        createdBy: {
          id: '1',
          user: { ar: '', en: 'beshir khaled' },
          system: 'agents',
          chanel: '12',
        },
      });

      setMissingPunchUIFlag(!missingPunchUIFlag);
    }
  };
  const handleRefuseAlert = (item, type) => {
    Alert.alert('Alert', 'Are you Sure ?', [
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => handleRefuse(item, type),
      },
      { text: 'No', style: 'cancel' },
    ]);
  };
  const handleRefuse = async (item, type) => {
    if (type == 'in') {
      await rejectMissingInService({
        recordId: item.id,
        inStatus: {
          id: '5',
          name: {
            ar: '',
            en: 'missingRejected',
          },
        },
        createdBy: {
          id: '1',
          user: { ar: '', en: 'beshir khaled' },
          system: 'agents',
          chanel: '12',
        },
      });
      setMissingPunchUIFlag(!missingPunchUIFlag);
    } else if (type == 'out') {
      await rejectMissingOutService({
        recordId: item.id,
        outStatus: {
          id: '5',
          name: {
            ar: '',
            en: 'missingRejected',
          },
        },
        createdBy: {
          id: '1',
          user: { ar: '', en: 'beshir khaled' },
          system: 'agents',
          chanel: '12',
        },
      });
      setMissingPunchUIFlag(!missingPunchUIFlag);
    }
  };
  const renderCheckinRequests = (itemData) => {
    try {
      return (
        <View
          style={{
            padding: 10,
            marginHorizontal: 13,
            marginVertical: 10,
            borderRadius: 12,
            elevation: 4,
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOpacity: 0.25,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            borderLeftColor: '#00bfff',
            borderLeftWidth: 3,
          }}
        >
          <HStack space={5} h="100" justifyContent="center" alignItems="center">
            <HStack
              space={5}
              h="100"
              justifyContent="center"
              alignItems="center"
            >
              {itemData.item.employee.img !== null ? (
                <Avatar
                  bg="green.500"
                  source={{
                    uri: itemData.item.employee.img,
                  }}
                >
                  AJ
                </Avatar>
              ) : (
                <Avatar
                  bg="green.500"
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU',
                  }}
                >
                  AJ
                </Avatar>
              )}
              <VStack>
                <Box>
                  <Text style={{ fontWeight: '500', fontSize: 16 }}>
                    {' '}
                    Check In{' '}
                  </Text>
                </Box>
                <Box>
                  <Text>
                    At:
                    <Text style={{ fontWeight: '500', fontSize: 15 }}>
                      {itemData.item.timeIn}
                    </Text>{' '}
                  </Text>
                </Box>

                {itemData.item.employeeReason && (
                  <Box>
                    <Text>
                      Reason:
                      <Text
                        style={{
                          fontWeight: '500',
                          fontSize: 15,
                        }}
                      >
                        {itemData.item.employeeReason.en}
                      </Text>
                    </Text>
                  </Box>
                )}
                <Box>
                  <Text>
                    Date:
                    <Text style={{ fontWeight: '500', fontSize: 14 }}>
                      {itemData.item.date}
                    </Text>
                  </Text>
                </Box>
              </VStack>
            </HStack>
            <HStack
              space={5}
              h="100"
              justifyContent="center"
              alignItems="center"
            >
              <VStack>
                <Box
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: statusBorderColor2(
                      itemData.item.inStatus.name.en
                    ),
                    padding: 2,
                  }}
                >
                  <Text
                    style={{
                      color: statusBorderColor2(itemData.item.inStatus.name.en),
                    }}
                  >
                    New
                  </Text>
                </Box>

                {/* <Box w="90%" alignItems="flex-start" mt={3}> */}

                <HStack justifyContent="center" mt={4} space={5}>
                  <IconButton
                    onPress={() => handleAccept(itemData.item, 'in')}
                    w="35"
                    h="35"
                    mb="4"
                    variant="solid"
                    bg="#4DB6AC"
                    colorScheme="green"
                    borderRadius="full"
                    icon={
                      <Ionicons
                        style={{ fontSize: 15 }}
                        name="checkmark"
                        color="white"
                      />
                    }
                  />
                  <IconButton
                    onPress={() => handleRefuseAlert(itemData.item, 'in')}
                    w="35"
                    h="35"
                    mb="4"
                    variant="solid"
                    bg="#ff4500"
                    colorScheme="red"
                    borderRadius="full"
                    icon={
                      <Ionicons
                        style={{ fontSize: 15 }}
                        name="close"
                        color="white"
                      />
                    }
                  />
                </HStack>
                {/* </Box> */}
              </VStack>
            </HStack>
          </HStack>
        </View>
      );
    } catch (error) {
      console.log(error);
    }
  };

  const renderCheckoutRequests = (itemData) => {
    return (
      <View
        style={{
          padding: 10,
          marginHorizontal: 8,
          marginVertical: 10,
          borderRadius: 12,
          elevation: 4,
          backgroundColor: 'white',
          shadowColor: 'black',
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          borderLeftColor: '#00bfff',
          borderLeftWidth: 3,
        }}
      >
        <HStack space={5} h="100" justifyContent="center" alignItems="center">
          <HStack space={5} h="100" justifyContent="center" alignItems="center">
            {itemData.item.employee.img !== null ? (
              <Avatar
                bg="green.500"
                source={{
                  uri: itemData.item.employee.img,
                }}
              >
                AJ
              </Avatar>
            ) : (
              <Avatar
                bg="green.500"
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU',
                }}
              >
                AJ
              </Avatar>
            )}
            <VStack>
              <Box>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>
                  {' '}
                  Check Out{' '}
                </Text>
              </Box>
              <Box>
                <Text>
                  At:
                  <Text style={{ fontWeight: '500', fontSize: 15 }}>
                    {itemData.item.timeOut}
                  </Text>{' '}
                </Text>
              </Box>

              {itemData.item.employeeReason && (
                <Box>
                  <Text>
                    Reason:
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: 15,
                      }}
                    >
                      {itemData.item.employeeReason.en}
                    </Text>
                  </Text>
                </Box>
              )}
              <Box>
                <Text>
                  Date:
                  <Text style={{ fontWeight: '500', fontSize: 14 }}>
                    {itemData.item.date}
                  </Text>
                </Text>
              </Box>
            </VStack>
          </HStack>
          <HStack space={5} h="100" justifyContent="center" alignItems="center">
            <VStack>
              <Box
                style={{
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: statusBorderColor2(
                    itemData.item.outStatus.name.en
                  ),
                  padding: 2,
                }}
              >
                <Text
                  style={{
                    color: statusBorderColor2(itemData.item.outStatus.name.en),
                  }}
                >
                  New
                </Text>
              </Box>

              {/* <Box w="90%" alignItems="flex-start" mt={3}> */}

              <HStack justifyContent="center" mt={4} space={5}>
                <IconButton
                  onPress={() => handleAccept(itemData.item, 'out')}
                  w="35"
                  h="35"
                  mb="4"
                  variant="solid"
                  bg="#4DB6AC"
                  colorScheme="green"
                  borderRadius="full"
                  icon={
                    <Ionicons
                      style={{ fontSize: 15 }}
                      name="checkmark"
                      color="white"
                    />
                  }
                />
                <IconButton
                  onPress={() => handleRefuseAlert(itemData.item, 'out')}
                  w="35"
                  h="35"
                  mb="4"
                  variant="solid"
                  bg="#ff4500"
                  colorScheme="red"
                  borderRadius="full"
                  icon={
                    <Ionicons
                      style={{ fontSize: 15 }}
                      name="close"
                      color="white"
                    />
                  }
                />
              </HStack>
              {/* </Box> */}
            </VStack>
          </HStack>
        </HStack>
      </View>
    );
  };
  ///////////////////////////////////////
  // const onChangeDateCallback = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   let year = currentDate.getFullYear();
  //   let month = currentDate.getMonth() + 1 + '';
  //   if (month.length === 1) month = '0' + month;
  //   let day = currentDate.getDate() + '';
  //   if (day.length === 1) day = '0' + day;
  //   if (Platform.OS === 'ios') {
  //     setDateInform({
  //       ...dateInform,
  //       businessLeaveDateFrom: currentDate,
  //       due_date: year + '-' + month + '-' + day,
  //     });
  //   } else {
  //     setDateInform({
  //       ...dateInform,
  //       businessLeaveDateFrom: currentDate,
  //       due_date: year + '-' + month + '-' + day,
  //       businessLeaveDateTo: new Date(),
  //       showDatePicker1: false,
  //     });
  //   }
  // };

  ///to handle filter on employee name
  // const handleCallbackEmployees = (childData) => {
  //   setEmployeesGroupValues(childData);
  // };
  ///to handle filter on leave type
  const handleCallbackTypesFilter = (childData) => {
    setTypesGroupValues(childData);
  };

  ///to handle filter button
  async function handleFilterAction(event) {
    event.preventDefault();

    try {
      if (typesGroupValues[0] == 'leaves') {
        setMissingCompStatus(false);
        setLeaveCompStatus(true);
        setShowFilterModal(false);
      } else if (typesGroupValues[0] == 'missing') {
        setLeaveCompStatus(false);
        setMissingCompStatus(true);
        setShowFilterModal(false);
      } else {
        setLeaveCompStatus(true);
        setMissingCompStatus(true);
        setShowFilterModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const statusBorderColor = (status) => {
    switch (status) {
      case 'new':
        return 'blue';
      case 'updated':
        return 'orange';
      case 'Accepted':
        return 'green';

      case 'Rejected':
        return 'red';
      case 'Pending':
        return '#fabb18';
    }
  };
  const statusBorderColor2 = (status) => {
    switch (status) {
      case 'Missing':
        return 'blue';

      case 'accepted':
        return 'green';

      case 'refused':
        return 'red';
    }
  };
  ///////////////////////////////////////
  const renderEmployeesCards = (itemData) => {
    return (
      <View>
        {itemData.item.dateFrom == itemData.item.dateTo ? (
          // <ScrollView>
          // <ScrollView style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              marginHorizontal: 8,
              marginVertical: 10,
              borderRadius: 12,
              elevation: 4,
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOpacity: 0.25,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              borderLeftColor: '#000080',
              borderLeftWidth: 3,
            }}
          >
            <Pressable
              onPress={() => {
                setshowModal(!showModal);
                settargetReq(itemData.item);
              }}
            >
              <HStack
                space={3}
                h="100"
                justifyContent="center"
                alignItems="center"
              >
                {itemData.item.employee.img !== null ? (
                  <Avatar
                    bg="green.500"
                    source={{
                      uri: itemData.item.employee.img,
                    }}
                  >
                    AJ
                  </Avatar>
                ) : (
                  <Avatar
                    bg="green.500"
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU',
                    }}
                  >
                    AJ
                  </Avatar>
                )}
                <VStack space={5}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>
                    {itemData.item.employee.name.en}
                  </Text>
                  <HStack space={7}>
                    <Box>
                      <Text>{itemData.item.type.name.en}</Text>
                    </Box>
                    <Box>
                      <Text>
                        {itemData.item.timeFrom}- {itemData.item.timeTo}
                      </Text>
                    </Box>

                    <Box
                      style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: statusBorderColor(
                          itemData.item.status.name.en
                        ),
                        padding: 3,
                      }}
                    >
                      <Text
                        style={{
                          color: statusBorderColor(
                            itemData.item.status.name.en
                          ),
                          padding: 3,
                        }}
                      >
                        {itemData.item.status.name.en}
                      </Text>
                    </Box>
                  </HStack>
                </VStack>
              </HStack>
              {/* </Box> */}
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              marginHorizontal: 8,
              marginVertical: 10,
              borderRadius: 12,
              elevation: 4,
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOpacity: 0.25,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              borderLeftColor: '#000080',
              borderLeftWidth: 3,
            }}
            onPress={() => {
              setshowModal(!showModal);
              settargetReq(itemData.item);
            }}
          >
            <Pressable
              onPress={() => {
                setshowModal(!showModal);
                settargetReq(itemData.item);
              }}
            >
              <HStack
                space={3}
                h="100"
                justifyContent="center"
                alignItems="center"
              >
                {itemData.item.employee.img !== null ? (
                  <Avatar
                    bg="green.500"
                    source={{
                      uri: itemData.item.employee.img,
                    }}
                  >
                    AJ
                  </Avatar>
                ) : (
                  <Avatar
                    bg="green.500"
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU',
                    }}
                  >
                    AJ
                  </Avatar>
                )}
                <VStack space={5}>
                  <Text style={{ fontSize: 16, fontWeight: '600' }}>
                    {itemData.item.employee.name.en}
                  </Text>
                  <HStack space={7}>
                    <Box>
                      <Text fontSize={16}>{itemData.item.type.name.en}</Text>
                    </Box>
                    <Box>
                      <Text>
                        {itemData.item.dateFrom.slice(5)} -{' '}
                        {itemData.item.dateTo.slice(5)}
                      </Text>
                    </Box>
                    <Box
                      style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        borderColor: statusBorderColor(
                          itemData.item.status.name.en
                        ),
                      }}
                    >
                      <Text
                        style={{
                          color: statusBorderColor(
                            itemData.item.status.name.en
                          ),
                          padding: 3,
                        }}
                      >
                        {itemData.item.status.name.en}
                      </Text>
                    </Box>
                  </HStack>
                </VStack>
              </HStack>
              {/* </Box> */}
            </Pressable>
          </View>
          // </ScrollView>
        )}

        {showModal && (
          <ManagerLeaveRequestModal
            targetReq={targetReq}
            setshowModal={setshowModal}
            showModal={showModal}
          />
        )}
      </View>
    );
  };
  return (
    <ScrollView>
      {/* <Text>ManagerLeaveRequestsCard</Text> */}

      <View style={styles.gridItem}>
        <HStack space={10}>
          <Input
            placeholder="Search Employees"
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize="14"
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
        </HStack>
        {/* <HStack style={{ justifyContent: 'space-around', marginTop: 10 }}>
          <Box alignItems="center">
            <Text
              fontSize="xl"
              bold
              style={{
                color: '#194569',
              }}
            >
              4
            </Text>
            <Text
              style={{
                color: '#194569',
              }}
              bold
            >
              New Requests
            </Text>
          </Box>
          <Box alignItems="center">
            <Text
              fontSize="xl"
              bold
              style={{
                color: '#ffb300',
              }}
            >
              2
            </Text>
            <Text
              style={{
                color: '#ffb300',
              }}
              bold
            >
              On Hold Requests
            </Text>
          </Box>
        </HStack> */}
        <Divider my="3" />
        {allLeaveRequestsData.length > 0 ? (
          <View>
            {leaveCompStatus && (
              <FlatList
                data={allLeaveRequestsData}
                keyExtractor={(item) => item.id}
                renderItem={renderEmployeesCards}
                contentStyle={{ padding: 10, marginVertical: 10 }}
              />
            )}
            {missingCompStatus && (
              <View>
                <FlatList
                  data={checkinMissingRequests}
                  keyExtractor={(item) => item.id}
                  renderItem={renderCheckinRequests}
                  contentStyle={{ padding: 10, marginVertical: 10 }}
                />
                <FlatList
                  data={checkoutMissingRequests}
                  keyExtractor={(item) => item.id}
                  renderItem={renderCheckoutRequests}
                  contentStyle={{ padding: 10, marginVertical: 10 }}
                />
              </View>
            )}
          </View>
        ) : (
          <Center>
            <Text style={{ fontSize: 20 }}>There's no requests yet</Text>
          </Center>
        )}
        {
          <FilterModal
            showFilterModal={showFilterModal}
            setShowFilterModal={setShowFilterModal}
            handleCallbackTypes={handleCallbackTypesFilter}
            typesGroupValues={typesGroupValues}
            dateInform={dateInform}
            setDateInform={setDateInform}
            handleFilterAction={handleFilterAction}
            employeesGroupValues={employeesGroupValues}
            employeesNames={employeesNames}
            type="missingAndLeaves"
          />
        }
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  gridItem: {
    // flex: 1,
    margin: 16,
    // height: 200,
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
  listTab: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  btnTab: {
    width: Dimensions.get('window').width / 2.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    // borderColor: '#ebebbeb',
    padding: 15,
  },

  textTab: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: '#4dccc6',
  },
  textTabActive: {
    color: '#fff',
  },
  QuickActionsBtn: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 50,
    height: 50,
    zIndex: 10,
  },

  card: {
    // justifyContent: 'center',
    //alignItems: 'center',
    width: '100%',
    height: '80%',
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    padding: 5,
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
});

export default MissingAndLeaveRequests;

import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  FlatList,
  Platform,
} from 'react-native';
import {
  Text,
  Box,
  HStack,
  Center,
  VStack,
  IconButton,
  Divider,
  Input,
  Avatar,
} from 'native-base';
import FilterModal from '../modals/FilterModal';
import { getAllTimeAttendance } from '../../store-Hr';
import { useDispatch } from 'react-redux';
import requestBuilder from '../../../../requestBuilder';
import axios from 'axios';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import {
  getTimeAttendanceDataService,
  acceptMissingInService,
  acceptMissingOutService,
  rejectMissingInService,
  rejectMissingOutService,
} from '../../util/http';

const DisplayAllMissingPunchRequests = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [checkinMissingRequests, setCheckinMissingRequests] = useState();
  const [checkinMissingRequestsDynamic, setCheckinMissingRequestsDynamic] =
    useState();
  const [checkoutMissingRequests, setCheckoutMissingRequests] = useState();
  const [checkoutMissingRequestsDynamic, setCheckoutMissingRequestsDynamic] =
    useState();
  const [missingPunchUIFlag, setMissingPunchUIFlag] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [typesGroupValues, setTypesGroupValues] = React.useState([]);
  const [statusGroupValues, setStatusGroupValues] = React.useState([]);
  const [checkInCompStatus, setcheckInCompStatus] = React.useState(true);
  const [checkOutCompStatus, setcheckOutCompStatus] = React.useState(true);
  const [dateInform, setDateInform] = useState({
    businessLeaveDateFrom: new Date(),
    due_date: '',
    showDatePicker1: false,
  });
  useFocusEffect(
    React.useCallback(() => {
      let response = async () => {
        const data = await getTimeAttendanceDataService({
          limit: 0,
          offset: 0,
          arrayId: null,
          inStatusId: ['2', '3', '4', '5'],
          outStatusId: null,
          dateFrom: null,
          dateTo: null,
        });

        setCheckinMissingRequests(
          data.data.row.timeAttendance.length > 0
            ? data.data.row.timeAttendance
            : null
        );
        setCheckinMissingRequestsDynamic(
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
          outStatusId: ['2', '3', '4', '5'],
          dateFrom: null,
          dateTo: null,
        });
        setCheckoutMissingRequests(
          data.data.row.timeAttendance.length > 0
            ? data.data.row.timeAttendance
            : null
        );
        setCheckoutMissingRequestsDynamic(
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
          id: '4',
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
          id: '4',
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
  const statusBorderColor = (status) => {
    switch (status) {
      case 'Missing':
        return 'blue';

      case 'missingAccepted':
        return 'green';

      case 'missingRejected':
        return 'red';
    }
  };
  ///callback functions
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
    // const dateTimeInParts = dateInform['businessLeaveDateFrom']
    //   .toISOString()
    //   .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
    // const dateOne = dateTimeInParts[0]; // "2021-08-31"
    ///////////////////////////////////

    try {
      if (typesGroupValues && statusGroupValues.length === 0) {
        console.log(
          typesGroupValues,
          statusGroupValues,
          'statusGroupValuesstatusGroupValuesstatusGroupValues'
        );
        if (typesGroupValues[0] == 'In') {
          setcheckOutCompStatus(false);
          setcheckInCompStatus(true);
        } else if (typesGroupValues[0] == 'Out') {
          setcheckInCompStatus(false);
          setcheckOutCompStatus(true);
        } else {
          setcheckOutCompStatus(true);

          setcheckInCompStatus(true);
        }
        // return typesGroupValues[0] == 'in'
        //   ? setcheckOutCompStatus(false)
        //   : typesGroupValues[0] == 'out'
        //   ? setcheckInCompStatus(false)
        //   : null;
      } else if (statusGroupValues) {
        console.log(
          statusGroupValues,
          'statusGroupValuesstatusGroupValues'
          // checkinMissingRequests
        );

        const filterDataArr = checkinMissingRequests.filter((ele) => {
          let filterId;
          switch (statusGroupValues[0]) {
            case 'accepted':
              filterId = '3';
              break;
            case 'rejected':
              filterId = '4';
              break;
            case 'new':
              filterId = '2';
              break;
            default:
              filterId = '';
              break;
          }
          console.log(filterId, 'filterIdfilterId');
          return filterId ? ele?.inStatus?.id === filterId : true;
        });
        setCheckinMissingRequestsDynamic(filterDataArr);
        const filterDataArr2 = checkoutMissingRequests.filter((ele) => {
          let filterId;
          switch (statusGroupValues[0]) {
            case 'accepted':
              filterId = '3';
              break;
            case 'rejected':
              filterId = '4';
              break;
            case 'new':
              filterId = '2';
              break;
            default:
              filterId = '';
              break;
          }
          return filterId ? ele?.outStatus?.id === filterId : true;
        });
        setCheckoutMissingRequestsDynamic(filterDataArr2);
      }
      setShowFilterModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  ////////////////////////////////////////////////////
  const renderCheckinRequests = (itemData) => {
    try {
      return (
        <Box
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
            <HStack
              space={5}
              h="100"
              justifyContent="center"
              alignItems="center"
            >
                <Avatar
                  bg="green.500"
                  source={{
                    uri: itemData.item.employee.img ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU',
                  }}
                >
                  AJ
                </Avatar>
              <VStack>
                <Box>
                  <Text style={{ fontWeight: '500', fontSize: 16 }}>
                    Check In
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
                    borderColor: statusBorderColor(
                      itemData.item.inStatus.name.en
                    ),
                    padding: 2,
                  }}
                >
                  {itemData.item.inStatus.id == 2 ? (
                    <Text
                      style={{
                        color: statusBorderColor(
                          itemData.item.inStatus.name.en
                        ),
                      }}
                    >
                      New
                    </Text>
                  ) : itemData.item.inStatus.id == 3 ? (
                    <Text
                      style={{
                        color: statusBorderColor(
                          itemData.item.inStatus.name.en
                        ),
                      }}
                    >
                      Accepted
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: statusBorderColor(
                          itemData.item.inStatus.name.en
                        ),
                      }}
                    >
                      Rejected
                    </Text>
                  )}
                </Box>

                {/* <Box w="90%" alignItems="flex-start" mt={3}> */}
                {itemData.item.inStatus.id == 2 && (
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
                )}

                {/* </Box> */}
              </VStack>
            </HStack>
          </HStack>
        </Box>
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
              <Avatar
                bg="green.500"
                source={{
                  uri: itemData.item.employee.img ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiCoHLktPNbzYjYcrFoYnlmxX5SfRKCIJQsA&usqp=CAU' ,
                }}
              >
                AJ
              </Avatar>
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
                  borderColor: statusBorderColor(
                    itemData.item.outStatus.name.en
                  ),
                  padding: 2,
                }}
              >
                {itemData.item.outStatus.id == 2 ? (
                  <Text
                    style={{
                      color: statusBorderColor(itemData.item.outStatus.name.en),
                    }}
                  >
                    New
                  </Text>
                ) : itemData.item.outStatus.id == 3 ? (
                  <Text
                    style={{
                      color: statusBorderColor(itemData.item.outStatus.name.en),
                    }}
                  >
                    Accepted
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: statusBorderColor(itemData.item.outStatus.name.en),
                    }}
                  >
                    Rejected
                  </Text>
                )}
              </Box>

              {/* <Box w="90%" alignItems="flex-start" mt={3}> */}
              {itemData.item.outStatus.id == 2 && (
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
              )}
            </VStack>
          </HStack>
        </HStack>
      </View>
    );
  };
  return (
    <ScrollView>
      <Box
        bg={'#f0f0f0'}
        flex={1}
        justifyContent="center"
        alignItems="center"
        p={2}
        >
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
        />
        <Divider my="3" />
        <ScrollView>
          {checkoutMissingRequests || checkinMissingRequests ? (
            <View>
              {checkInCompStatus && (
                <FlatList
                  data={checkinMissingRequestsDynamic}
                  keyExtractor={(item) => item.id}
                  renderItem={renderCheckinRequests}
                  contentStyle={{ padding: 10, marginVertical: 10 }}
                />
              )}
              {checkOutCompStatus && (
                <FlatList
                  data={checkoutMissingRequestsDynamic}
                  keyExtractor={(item) => item.id}
                  renderItem={renderCheckoutRequests}
                  contentStyle={{ padding: 10, marginVertical: 10 }}
                />
              )}
            </View>
          ) : (
            <Center>
              <Text style={{ fontSize: 20 }}>There's no requests yet</Text>
            </Center>
          )}
        </ScrollView>
      </Box>
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
        type="missingPunchManager"
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  card: {
    // justifyContent: 'center',
    //alignItems: 'center',
    width: '93%',
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
  gridItem: {
    flex: 1,
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
    marginBottom: 14,
  },
});
export default DisplayAllMissingPunchRequests;

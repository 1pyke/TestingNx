import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Platform, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
// import { toggleModal } from '../../store-Hr';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Pressable,
  Text,
  Box,
  HStack,
  VStack,
  Divider,
  Input,
  IconButton,
  Heading,
} from 'native-base';
import PendingRequestModal from '../modals/PendingRequestModal';
import LeaveRequestDetailsModal from '../modals/LeaveRequestDetailsModal';
import FilterModal from '../../modals/FilterModal';
import NewLeaveRequest from '../modals/NewLeaveRequest';
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
const EmployeeLeaveRequestsCard = ({
  acceptedrejectedRequests,
  pendingRequestsForEmployee,
  allLeaveRequestsDataForEmployee,
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
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    try {
      event.preventDefault();
      /////////////////////////////////////////
      const dateTimeInParts = dateInform['businessLeaveDateFrom']
        .toISOString()
        .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
      const dateOne = dateTimeInParts[0]; // "2021-08-31"
      console.log('hiiiiiiiiiii');
    } catch (error) {
      console.log(error);
    }
  }

  const statusBorderColor = (status) => {
    switch (status) {
      case 'new':
        return 'blue';
      case 'on hold':
        return '#ffb300';
      case 'Accepted':
        return 'green';

      case 'Rejected':
        return 'red';
      case 'Pending':
        return '#fabb18';
    }
  };

  const statusIcon = (status) => {
    switch (status) {
      case 'new':
        return <Entypo name="new" size={24} color="black" />;
      case 'on hold':
        return (
          <MaterialCommunityIcons
            name="progress-clock"
            size={24}
            color="black"
          />
        );
      case 'Accepted':
        return <AntDesign name="checkcircleo" size={24} color="#20AA3F" />;
      case 'Rejected':
        return (
          <Ionicons name="ios-alert-circle-outline" size={24} color="red" />
        );
      case 'Pending':
        return <Feather name="loader" size={24} color="#FF9C72" />;
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
  ///flatlist components
  const oldLeaveRequests = (itemData) => {
    if (itemData.item.dateFrom == itemData.item.dateTo) {
      return (
        <Pressable
          onPress={() => {
            setShowEmployeeLeaveModal(!showEmployeeLeaveModal);
            setTargetReq(itemData.item);
          }}
        >
          <Box
            bg="#fff"
            rounded="lg"
            w="100%"
            p={4}
            my={2}
            style={{
              shadowColor: '#000',
              elevation: 2,
            }}
            borderColor="#000"
            borderWidth={1}
            shadow={2}
          >
            <HStack space={2} justifyContent="center" alignItems="flex-start">
              <VStack flex={1} space={1}>
                <HStack alignItems={'space-between'} space={1}>
                  <Heading size="md" color="#194569">
                    {itemData?.item?.type?.name?.en  || itemData?.item?.type?.name?.ar || 'N/A'}
                  </Heading>
                </HStack>
                <HStack
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}
                  space={2}
                >
                  <Heading size="xs" color="muted.400">
                    {itemData.item.subType.name?.en}
                  </Heading>
                  <Heading size="xs" color="muted.400">
                    {itemData.item.timeFrom} - {itemData.item.timeTo}
                  </Heading>
                  <Heading>{statusIcon(itemData.item.status.name.en)}</Heading>
                </HStack>
              </VStack>
              {/*aaaaaaaaaa*/}
              {/*<VStack>*/}
              {/*  <Text*/}
              {/*    style={{*/}
              {/*      fontSize: 16,*/}
              {/*      fontWeight: '600',*/}
              {/*      marginBottom: 5,*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    {itemData.item.type.name.en}*/}
              {/*  </Text>*/}
              {/*  <HStack space={3} justifyContent="space-around">*/}
              {/*    <Box style={{ width: '33%' }}>*/}
              {/*      <Text>{itemData.item.subType.name.en}</Text>*/}
              {/*    </Box>*/}
              {/*    <VStack>*/}
              {/*      <Box style={{ marginBottom: 5 }}>*/}
              {/*        <Text>*/}
              {/*          {itemData.item.timeFrom} - {itemData.item.timeTo}*/}
              {/*        </Text>*/}
              {/*      </Box>*/}

              {/*      <Box*/}
              {/*        style={{*/}
              {/*          borderWidth: 2,*/}
              {/*          borderRadius: 5,*/}
              {/*          borderColor: statusBorderColor(*/}
              {/*            itemData.item.status.name.en*/}
              {/*          ),*/}
              {/*          padding: 2,*/}
              {/*        }}*/}
              {/*      >*/}
              {/*        <Text*/}
              {/*          style={{*/}
              {/*            color: statusBorderColor(*/}
              {/*              itemData.item.status.name.en*/}
              {/*            ),*/}
              {/*          }}*/}
              {/*        >*/}
              {/*          {itemData.item.status.name.en}*/}
              {/*        </Text>*/}
              {/*      </Box>*/}
              {/*    </VStack>*/}
              {/*  </HStack>*/}
              {/*</VStack>*/}
            </HStack>
          </Box>
        </Pressable>
      );
    } else {
      return (
        <Pressable
          onPress={() => {
            setShowEmployeeLeaveModal(!showEmployeeLeaveModal);
            setTargetReq(itemData.item);
          }}
        >
          <Box
            bg="#fff"
            rounded="lg"
            w="100%"
            p={4}
            my={2}
            style={{
              shadowColor: '#000',
              elevation: 2,
            }}
            borderColor="#000"
            borderWidth={1}
            shadow={2}
          >
            <HStack space={2} justifyContent="center" alignItems="flex-start">
              <VStack flex={1} space={1}>
                <HStack alignItems={'space-between'} space={1}>
                  <Heading size="md" color="#194569">
                    {itemData.item.type.name.en}
                  </Heading>
                </HStack>

                <HStack
                  justifyContent={'space-between'}
                  alignItems={'flex-end'}
                  space={2}
                >
                  <Heading size="xs" color="muted.400">
                    {itemData.item.subType.name.en}
                  </Heading>
                  <Heading size="xs" color="muted.400">
                    {itemData.item.dateFrom.slice(5)} -{' '}
                    {itemData.item.dateTo.slice(5)}
                  </Heading>
                  <Heading>{statusIcon(itemData.item.status.name.en)}</Heading>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </Pressable>
      );
    }
  };

  const newLeaveRequests = (itemData) => {
    if (itemData.item.dateFrom == itemData.item.dateTo) {
      return (
        <Pressable
          onPress={() => {
            setShowEmployeeLeaveModal(!showEmployeeLeaveModal);
            setTargetReq(itemData.item);
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
              borderLeftColor: typeBorderColor(itemData.item.type.name.en),
            }}
          >
            <HStack
              space={5}
              h="100"
              justifyContent="space-around"
              alignItems="center"
            >
              <VStack>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>
                  {itemData.item.type.name.en}
                </Text>
                <HStack space={3} justifyContent="space-around">
                  <Box style={{ width: '33%' }}>
                    <Text>{itemData.item.subType.name.en}</Text>
                  </Box>
                  <VStack>
                    <Box>
                      <Text>
                        {itemData.item.timeFrom} - {itemData.item.timeTo}
                      </Text>
                    </Box>

                    <Box
                      style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: statusBorderColor(
                          itemData.item.status.name.en
                        ),
                        padding: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: statusBorderColor(
                            itemData.item.status.name.en
                          ),
                        }}
                      >
                        {itemData.item.status.name.en}
                      </Text>
                    </Box>
                  </VStack>
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
            setTargetReq(itemData.item);
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
              borderLeftColor: typeBorderColor(itemData.item.type.name.en),
              marginRight: 10,
              height: 130,
            }}
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
                  {itemData.item.type.name.en}
                </Text>
                <HStack space={3}>
                  <Box style={{ width: '35%' }}>
                    <Text>{itemData.item.subType.name.en}</Text>
                  </Box>
                  <Box style={{ marginBottom: 5 }}>
                    <Text>
                      {itemData.item.dateFrom.slice(5)} -{' '}
                      {itemData.item.dateTo.slice(5)}
                    </Text>
                  </Box>

                  <Box
                    style={{
                      borderWidth: 2,
                      borderRadius: 5,
                      borderColor: statusBorderColor(
                        itemData.item.status.name.en
                      ),
                      padding: 2,
                    }}
                  >
                    <Text
                      style={{
                        color: statusBorderColor(itemData.item.status.name.en),
                      }}
                    >
                      {itemData.item.status.name.en}
                    </Text>
                  </Box>
                </HStack>
              </VStack>
            </HStack>
          </View>
        </Pressable>
      );
    }
  };
  const renderPendingRequestsForEmployee = (itemData) => {
    if (itemData.item.dateFrom == itemData.item.dateTo) {
      return (
        <Pressable
          onPress={() => {
            setShowPendingRequestsModal(!showPendingRequestsModal);
            setRequestData(itemData.item);
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
              borderLeftColor: typeBorderColor(itemData.item.type.name.en),
              marginRight: 10,
              height: 130,
            }}
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
                  {itemData.item.type.name.en}
                </Text>
                <HStack space={3} justifyContent="space-around">
                  <Box style={{ width: '33%' }}>
                    <Text>{itemData.item.subType.name.en}</Text>
                  </Box>
                  <VStack>
                    <Box style={{ marginBottom: 5 }}>
                      <Text>
                        {itemData.item.timeFrom} - {itemData.item.timeTo}
                      </Text>
                    </Box>

                    <Box
                      style={{
                        borderWidth: 3,
                        borderRadius: 5,
                        borderColor: statusBorderColor(
                          itemData.item.status.name.en
                        ),
                        padding: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: statusBorderColor(
                            itemData.item.status.name.en
                          ),
                        }}
                      >
                        {itemData.item.status.name.en}
                      </Text>
                    </Box>
                  </VStack>
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
            setShowPendingRequestsModal(!showPendingRequestsModal);
            setRequestData(itemData.item);
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
              borderLeftColor: typeBorderColor(itemData.item.type.name.en),
              marginRight: 10,
              height: 130,
            }}
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
                  {itemData.item.type.name.en}
                </Text>
                <HStack space={3} justifyContent="space-around">
                  <Box style={{ width: '33%' }}>
                    <Text>{itemData.item.subType.name.en}</Text>
                  </Box>
                  <VStack>
                    <Box style={{ marginBottom: 5 }}>
                      <Text>
                        {itemData.item.dateFrom} - {itemData.item.dateTo}
                      </Text>
                    </Box>

                    <Box
                      style={{
                        borderWidth: 3,
                        borderRadius: 5,
                        borderColor: statusBorderColor(
                          itemData.item.status.name.en
                        ),
                        padding: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: statusBorderColor(
                            itemData.item.status.name.en
                          ),
                        }}
                      >
                        {itemData.item.status.name.en}
                      </Text>
                    </Box>
                  </VStack>
                </HStack>
              </VStack>
            </HStack>
          </View>
        </Pressable>
      );
    }
  };
  return (
    <Box bg={'#f0f0f0'} flex={1} p={2}>
      <ScrollView>
        <Box>
          <ScrollView showsVerticalScrollIndicator={false}>
            {showPendingRequestsModal && (
              <PendingRequestModal
                requestData={requestData}
                showPendingRequestsModal={showPendingRequestsModal}
                setShowPendingRequestsModal={setShowPendingRequestsModal}
              />
            )}
            {showEmployeeLeaveModal && (
              <LeaveRequestDetailsModal
                targetReq={targetReq}
                showEmployeeLeaveModal={showEmployeeLeaveModal}
                setShowEmployeeLeaveModal={setShowEmployeeLeaveModal}
              />
            )}
            <FlatList
              data={acceptedrejectedRequests}
              keyExtractor={(item) => item.id}
              renderItem={oldLeaveRequests}
              contentStyle={{ padding: 10, marginVertical: 10 }}
            />
            <FlatList
              data={allLeaveRequestsDataForEmployee}
              keyExtractor={(item) => item.id}
              renderItem={newLeaveRequests}
              contentStyle={{ padding: 10, marginVertical: 10 }}
            />
            <FlatList
              data={pendingRequestsForEmployee}
              keyExtractor={(item) => item.id}
              renderItem={renderPendingRequestsForEmployee}
              contentStyle={{ padding: 10, marginVertical: 10 }}
            />
          </ScrollView>
        </Box>
      </ScrollView>

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
      <NewLeaveRequest
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  // gridItem: {
  //   height: '100%',
  //   borderRadius: 8,
  //   shadowColor: 'black',
  //   shadowOpacity: 0.25,
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowRadius: 8,
  //   backgroundColor: 'white',
  // },
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

export default EmployeeLeaveRequestsCard;

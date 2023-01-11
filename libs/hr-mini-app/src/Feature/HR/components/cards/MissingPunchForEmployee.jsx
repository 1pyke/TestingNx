import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import { getTimeAttendanceDataService } from '../../util/http';

import {
  Text,
  Box,
  HStack,
  VStack,
  IconButton,
  Divider,
  Center,
  ScrollView,
} from 'native-base';

const MissingPunchForEmployee = ({ setShowMissingPunchDialog }) => {
  const [checkinMissingRequests, setCheckinMissingRequests] = useState();
  const [checkoutMissingRequests, setCheckoutMissingRequests] = useState(null);

  useEffect(() => {
    let response = async () => {
      const data = await getTimeAttendanceDataService({
        limit: 0,
        offset: 0,
        arrayId: null,
        inStatusId: ['2', '3', '4'],
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
  }, []);
  useEffect(() => {
    let response = async () => {
      const data = await getTimeAttendanceDataService({
        limit: 0,
        offset: 0,
        arrayId: null,
        inStatusId: null,
        outStatusId: ['2', '3', '4'],
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
  }, []);

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
  //////////////////////////
  const renderCheckinRequests = (itemData) => {
    return (
      <View
        style={{
          padding: 10,
          marginVertical: 10,
          marginHorizontal: 13,
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
            <VStack>
              <Box>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>
                  {' '}
                  Check In{' '}
                </Text>
              </Box>

              <Box>
                <Text>
                  At:{' '}
                  <Text style={{ fontWeight: '500', fontSize: 15 }}>
                    {itemData.item.timeIn}
                  </Text>
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
                  Date:{' '}
                  <Text style={{ fontWeight: '500', fontSize: 14 }}>
                    {itemData.item.date.slice(5)}
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
                    itemData.item.inStatus.name.en
                  ),
                  padding: 2,
                }}
              >
                {itemData.item.inStatus.id == 2 && (
                  <Text
                    style={{
                      color: statusBorderColor(itemData.item.inStatus.name.en),
                    }}
                  >
                    New
                  </Text>
                )}
                {itemData.item.inStatus.id == 3 && (
                  <Text
                    style={{
                      color: statusBorderColor(itemData.item.inStatus.name.en),
                    }}
                  >
                    Accepted
                  </Text>
                )}
                {itemData.item.inStatus.id == 4 && (
                  <Text
                    style={{
                      color: statusBorderColor(itemData.item.inStatus.name.en),
                    }}
                  >
                    Rejected
                  </Text>
                )}
              </Box>
            </VStack>
          </HStack>
        </HStack>
      </View>
    );
  };
  const renderCheckoutRequests = (itemData) => {
    return (
      <View
        style={{
          padding: 10,
          marginVertical: 10,
          marginHorizontal: 13,
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
            <VStack>
              <Box>
                <Text style={{ fontWeight: '500', fontSize: 16 }}>
                  {' '}
                  Check Out{' '}
                </Text>
              </Box>

              <Box>
                <Text>
                  At:{' '}
                  <Text style={{ fontWeight: '500', fontSize: 15 }}>
                    {itemData.item.timeOut}
                  </Text>
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
                  Date:{' '}
                  <Text style={{ fontWeight: '500', fontSize: 14 }}>
                    {itemData.item.date.slice(5)}
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
                {itemData.item.outStatus.id == 2 && (
                  <Text
                    style={{
                      color: statusBorderColor(itemData.item.outStatus.name.en),
                    }}
                  >
                    new
                  </Text>
                )}
                {itemData.item.outStatus.id == 3 && (
                  <Text
                    style={{
                      color: statusBorderColor(itemData.item.outStatus.name.en),
                    }}
                  >
                    Accepted
                  </Text>
                )}
                {itemData.item.outStatus.id == 4 && (
                  <Text
                    style={{
                      color: statusBorderColor(itemData.item.outStatus.name.en),
                    }}
                  >
                    Rejected
                  </Text>
                )}
              </Box>
            </VStack>
          </HStack>
        </HStack>
      </View>
    );
  };

  ////////////////

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.gridItem}>
        <HStack space={10}>
          <Text fontSize="xl">Missing Punch Requests</Text>
          {/* <IconButton
            bg={'#5f84a2'}
            shadow={9}
            w="35"
            h="35"
            style={styles.QuickActionsBtn}
            variant="solid"
            borderRadius="full"
            size="sm"
            onPress={() => setShowMissingPunchDialog(true)}
            icon={<Icon style={{ fontSize: 16, color: 'white' }} name="plus" />}
          /> */}
        </HStack>
        <Divider my="3" />

        {checkinMissingRequests !== null || checkoutMissingRequests !== null ? (
          <View>
            <FlatList
              data={checkinMissingRequests}
              keyExtractor={(item) => item.id}
              renderItem={renderCheckinRequests}
              contentStyle={{ padding: 10, marginVertical: 10 }}
              showsVerticalScrollIndicator={false}
            />
            <FlatList
              data={checkoutMissingRequests}
              keyExtractor={(item) => item.id}
              renderItem={renderCheckoutRequests}
              contentStyle={{ padding: 10, marginVertical: 10 }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <Center>
            <Text style={{ fontSize: 20 }}>There's no requests yet</Text>
          </Center>
        )}
      </View>
    </ScrollView>
  );
};

export default MissingPunchForEmployee;
const styles = StyleSheet.create({
  gridItem: {
    // flex: 1,
    margin: 16,
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

  container: {
    flex: 1,
  },
});

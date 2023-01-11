import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getAllTimeAttendance } from '../../store-Hr';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Pressable,
  Text,
  Box,
  HStack,
  Button,
  Flex,
  Center,
  Avatar,
  VStack,
  Container,
  Content,
  Tabs,
  Tab,
  IconButton,
  FlatList,
} from 'native-base';

const MissingPunchHistoryTable = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const hrStore = useSelector((state) => state.hrStore);
  const [allAttendanceData, setAllAttendanceData] = useState([]);
  useEffect(() => {
    if (hrStore.timeAttendanceLoading == false) {
      let dateOffset = 24 * 60 * 60 * 1000 * 30;
      let myDate = new Date();
      myDate.setTime(myDate.getTime() - dateOffset);
      let beforeThirtyDays = myDate.toISOString().slice(0, 10);

      //   // console.log(beforeOneDay, 'beforeOneDay');
      let todayDate = new Date().toISOString().slice(0, 10);
      let arr1 = hrStore.timeAttendanceInfo.filter(
        (element) =>
          (element.statusForMissingPunsh == 'accepted' ||
            element.statusForMissingPunsh == 'rejected') &&
          (element.status == 'missing punch (both)' ||
            element.status == 'missing punch (checkIn)' ||
            element.status == 'missing punch (checkOut)')
      );

      setAllAttendanceData(arr1.length > 0 ? arr1 : null);
    } else {
      dispatch(
        getAllTimeAttendance({
          type: 'requestsMissing',
        })
      );
    }
  }, [hrStore.timeAttendanceLoading]);

  const statusBorderColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'green';

      case 'rejected':
        return 'red';
    }
  };
  const typeBorderColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'green';

      case 'rejected':
        return 'red';
    }
  };

  return (
    <View>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Name</DataTable.Title>
          {/* <DataTable.Title> Date</DataTable.Title> */}
          <DataTable.Title> From-To</DataTable.Title>

          {/* <DataTable.Title>To</DataTable.Title> */}
          <DataTable.Title>Type</DataTable.Title>
        </DataTable.Header>
        {allAttendanceData.map((el, index) => {
          return (
            <DataTable.Row
              style={{
                borderLeftColor: typeBorderColor(el.statusForMissingPunsh),
                borderLeftWidth: 4,
              }}
              key={el.id}
            >
              <DataTable.Cell>{el.employeeName}</DataTable.Cell>
              {/* <DataTable.Cell>{el.date}</DataTable.Cell> */}

              <DataTable.Cell>
                {el.checkIn}--{el.checkOut}
              </DataTable.Cell>
              {/* <DataTable.Cell>{el.checkOut}</DataTable.Cell> */}
              {el.status == 'missing punch (both)' ? (
                <DataTable.Cell>In&Out</DataTable.Cell>
              ) : el.status == 'missing punch (checkIn)' ? (
                <DataTable.Cell>In</DataTable.Cell>
              ) : (
                <DataTable.Cell>Out</DataTable.Cell>
              )}
            </DataTable.Row>
          );
        })}
      </DataTable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});
export default MissingPunchHistoryTable;

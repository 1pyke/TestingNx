import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getAllTimeAttendance } from '../../store-Hr';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';

import { View, StyleSheet } from 'react-native';

const AllTimeAttendanceHistoryTable = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const hrStore = useSelector((state) => state.hrStore);
  const [allAttendanceData, setAllAttendanceData] = useState([]);
  const [filtredDataAttendance, setFiltredDataAttendance] = useState([]);
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
          (element.date != todayDate &&
            element.status == 'out' &&
            (element.checkIn != null || element.checkIn != '') &&
            (element.checkOut != null || element.checkOut != '')) ||
          (element.statusForMissingPunsh == 'accepted' &&
            element.status != 'out')
      );
      let arr2 = hrStore.timeAttendanceInfo.filter(
        (element) =>
          (element.date != todayDate &&
            element.status == 'out' &&
            (element.checkIn != null || element.checkIn != '') &&
            (element.checkOut != null || element.checkOut != '')) ||
          (element.statusForMissingPunsh == 'rejected' &&
            element.status == 'missing punch (checkIn)')
      );
      let arr3 = hrStore.timeAttendanceInfo.filter(
        (element) =>
          (element.date != todayDate &&
            element.status == 'out' &&
            (element.checkIn != null || element.checkIn != '') &&
            (element.checkOut != null || element.checkOut != '')) ||
          (element.statusForMissingPunsh == 'rejected' &&
            element.status == 'missing punch (checkOut)')
      );
      setAllAttendanceData(
        arr1.length > 0 ? arr1 : arr2.length > 0 ? arr2 : arr3
      );
      setFiltredDataAttendance(
        arr1.length > 0 ? arr1 : arr2.length > 0 ? arr2 : arr3
      );
    } else {
      dispatch(
        getAllTimeAttendance({
          type: 'requestsMissing',
        })
      );
    }
  }, [hrStore.timeAttendanceLoading]);
  return (
    <View>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title> Check In</DataTable.Title>
          <DataTable.Title> Check Out</DataTable.Title>
        </DataTable.Header>
        {allAttendanceData?.map((el) => {
          return (
            <DataTable.Row>
              <DataTable.Cell>{el.employeeName}</DataTable.Cell>
              <DataTable.Cell>{el.date}</DataTable.Cell>

              <DataTable.Cell>{el.checkIn}</DataTable.Cell>
              <DataTable.Cell>{el.checkOut}</DataTable.Cell>
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
export default AllTimeAttendanceHistoryTable;

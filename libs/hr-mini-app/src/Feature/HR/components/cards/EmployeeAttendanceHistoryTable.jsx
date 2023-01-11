import React, { useEffect, useState } from 'react';
// import { useRoute } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';
import {
  getTimeAttendanceDataService,
  getTimeAttendanceEmployeeService,
  totalAttendanceHoursService
} from '../../util/http';
import {calculateHours, getFormattedDate} from '../../util/dateFormatting';
import { View, StyleSheet } from 'react-native';
import { Heading } from 'native-base';
import {useSelector} from "react-redux";

const EmployeeAttendanceHistoryTable = () => {
  // const route = useRoute();
  // const dispatch = useDispatch();
  // const hrStore = useSelector((state) => state.hrStore);
  // const tokenStore = useSelector((state) => state.dashboard);
  const AuthStore = useSelector((state) => state.AuthStore);
  const hrStore = useSelector((state) => state.hrStore);
  const [facilityId, setFacilityId] = useState(
    'FAC-FCF-JOR-1bf94704-d0c4-4766-ad03-0c2f26fecd46'
  );
  const [allAttendanceData, setAllAttendanceData] = useState([]);
  useEffect(() => {
    try {
      let response = async () => {
        // const data = await getTimeAttendanceDataService({
        //   limit: 0,
        //   offset: 0,
        //   arrayId: ['HRS-HRP-JOR-c89d9ac1-087a-4f82-9e4e-34693d108151'],
        //   inStatus: null,
        //   outStatus: null,
        //   dateFrom: null,
        //   dateTo: null,
        // });
        const todayAttendance = await totalAttendanceHoursService({
          // today_date: getFormattedDate(new Date()),
          id: hrStore.employeeId || "HRS-HRP-JOR-a79df774-0955-4891-bf2f-3a194de60cc7",
          facilityId: AuthStore.user.facility.id ||facilityId,
          date_from:"NULL",
          date_to:"NULL"
        });
        // const json = data.data.row.timeAttendance;
        // let dateOffset = 24 * 60 * 60 * 1000 * 30;
        // let myDate = new Date();
        // myDate.setTime(myDate.getTime() - dateOffset);

        //   // console.log(beforeOneDay, 'beforeOneDay');
        // let arr1 = json?.filter(
        //   (element) =>
        //     (element.timeIn !== null &&
        //       element.inStatus !== null &&
        //       element.inStatus.id == 1 &&
        //       element.inStatus.id != 2 &&
        //       element.inStatus.id != 3 &&
        //       element.outStatus !== null &&
        //       element.outStatus.id != 2 &&
        //       element.outStatus.id != 3) ||
        //     (element.outStatus !== null &&
        //       element.outStatus.id == 1 &&
        //       element.outStatus.id != 2 &&
        //       element.inStatus !== null &&
        //       element.inStatus.id != 2 &&
        //       element.inStatus.id != 3 &&
        //       element.outStatus.id != 3) ||
        //     (element.timeIn !== null &&
        //       element.inStatus !== null &&
        //       element.inStatus.id == 4 &&
        //       element.inStatus.id != 2 &&
        //       element.inStatus.id != 3 &&
        //       element.outStatus.id != 2 &&
        //       element.outStatus !== null &&
        //       element.outStatus.id != 2 &&
        //       element.outStatus.id != 3) ||
        //     (element.timeOut !== null &&
        //       element.outStatus !== null &&
        //       element.outStatus.id == 4 &&
        //       element.inStatus !== null &&
        //       element.inStatus.id != 2 &&
        //       element.inStatus.id != 3 &&
        //       element.outStatus.id != 2 &&
        //       element.outStatus.id != 3) ||
        //     (element.timeIn !== null &&
        //       element.inStatus !== null &&
        //       element.inStatus.id == 1 &&
        //       element.timeOut !== null &&
        //       element.outStatus !== null &&
        //       element.outStatus.id == 1 &&
        //       element.outStatus.id != 2 &&
        //       element.inStatus.id != 2 &&
        //       element.inStatus.id != 3 &&
        //       element.outStatus.id != 3) ||
        //     (element.timeIn !== null &&
        //       element.inStatus !== null &&
        //       element.inStatus.id == 4 &&
        //       element.timeOut !== null &&
        //       element.outStatus !== null &&
        //       element.outStatus.id == 4 &&
        //       element.outStatus.id != 2 &&
        //       element.inStatus.id != 2 &&
        //       element.inStatus.id != 3 &&
        //       element.outStatus.id != 3)
        // );

        const arr = [];
        // const arr = [];
        // console.log(json, 'jssssssssssssessso');
        // json?.forEach((element) => {
        //   arr.push({
        //     recordId: element.id,
        //     employeeId: element.employee.id,
        //     date: element.date,
        //     checkIn:
        //       (element.inStatus !== null &&
        //         element.inStatus.id == 1 &&
        //         element.inStatus.id != 2 &&
        //         element.inStatus.id != 4) ||
        //       (element.inStatus !== null &&
        //         element.inStatus.id == 3 &&
        //         element.inStatus.id != 2 &&
        //         element.inStatus.id != 4)
        //         ? element.timeIn
        //         : null,
        //     checkOut:
        //       (element.outStatus !== null &&
        //         element.outStatus.id == 1 &&
        //         element.outStatus.id != 2 &&
        //         element.outStatus.id != 4) ||
        //       (element.outStatus !== null &&
        //         element.outStatus.id == 3 &&
        //         element.outStatus.id != 2 &&
        //         element.outStatus.id != 4)
        //         ? element.timeOut
        //         : null,
        //     totalHours:
        //       ((element.inStatus !== null &&
        //         element.inStatus.id == 1 &&
        //         element.inStatus.id != 2 &&
        //         element.inStatus.id != 4) ||
        //         (element.inStatus !== null &&
        //           element.inStatus.id == 3 &&
        //           element.inStatus.id != 2 &&
        //           element.inStatus.id != 4)) &&
        //       ((element.outStatus !== null &&
        //         element.outStatus.id == 1 &&
        //         element.outStatus.id != 2 &&
        //         element.outStatus.id != 4) ||
        //         (element.outStatus !== null &&
        //           element.outStatus.id == 3 &&
        //           element.outStatus.id != 2 &&
        //           element.outStatus.id != 4))
        //         ? calculateHours(element.timeIn, element.timeOut)
        //         : null,
        //   });
        // });
        // this.timeAttendanceData = arr;
        // todayAttendance?.forEach((element, index) => {
        //   console.log(element, 'todayAttendance1');
        //   arr.push({
        //     employeeName: element.name,
        //     date: element.date,
        //     checkIn: element.type.id == 1 ? element.time : "",
        //     checkOut: element.type.id == 2 ? element.time : "",
        //     totalHours: calculateHours(
        //       element.time,
        //       todayAttendance.data.rows[index + 1].time
        //     ),
        //   });
        // });
        setAllAttendanceData(todayAttendance);
        // setAllAttendanceData(arr1.length > 0 ? arr1 : null);
      };
      response();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <View>
      <Heading size={'lg'} color={'#000'} p={4}>
        Attendance
      </Heading>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title> Check In</DataTable.Title>
          <DataTable.Title> Check Out</DataTable.Title>
          <DataTable.Title> TH</DataTable.Title>
          {/*<DataTable.Title> TBH</DataTable.Title>*/}
        </DataTable.Header>
        {allAttendanceData?.map((el, index) => {
          return (
            <DataTable.Row key={index}>
              <DataTable.Cell>{el.date}</DataTable.Cell>

              <DataTable.Cell>{el.checkIn}</DataTable.Cell>
              <DataTable.Cell>{el.checkOut}</DataTable.Cell>
              <DataTable.Cell>{el.TH}</DataTable.Cell>
              {/*<DataTable.Cell>{el.TBH}</DataTable.Cell>*/}
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
export default EmployeeAttendanceHistoryTable;

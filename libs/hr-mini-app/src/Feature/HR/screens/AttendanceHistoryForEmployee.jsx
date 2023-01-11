import React from 'react';
import EmployeeAttendanceHistoryTable from '../components/cards/EmployeeAttendanceHistoryTable';
import { View, ScrollView } from 'react-native';
const AttendanceHistoryForEmployee = () => {
  return (
    <ScrollView>
      <View style={{ marginBottom: 80 }}>
        <EmployeeAttendanceHistoryTable />
      </View>
    </ScrollView>
  );
};

export default AttendanceHistoryForEmployee;

import React from 'react';
import Title from '../components/shared/Title';
import AllTimeAttendanceHistoryTable from '../components/cards/AllTimeAttendanceHistoryTable';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const AllTimeAttendanceHistory = () => {
  return (
    <ScrollView>
      <View style={{ marginBottom: 80 }}>
        {/* <Title>Time Attendance History</Title> */}
        <AllTimeAttendanceHistoryTable />
      </View>
    </ScrollView>
  );
};

export default AllTimeAttendanceHistory;

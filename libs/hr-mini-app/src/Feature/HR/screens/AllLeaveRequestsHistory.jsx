import React from 'react';
import Title from '../components/shared/Title';
import AllLeaveRequestsHistoryTable from '../components/cards/AllLeaveRequestsHistoryTable';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const AllLeaveRequestsHistory = () => {
  return (
    <ScrollView>
      <View style={{ marginBottom: 80 }}>
        {/* <Title> Leave Requests History</Title> */}
        <AllLeaveRequestsHistoryTable />
      </View>
    </ScrollView>
  );
};

export default AllLeaveRequestsHistory;

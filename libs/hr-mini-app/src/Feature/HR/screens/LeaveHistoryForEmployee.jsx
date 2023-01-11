import React from 'react';
import Title from '../components/shared/Title';
import EmployeeLeaveHistoryTable from '../components/cards/EmployeeLeaveHistoryTable';
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'native-base';
const LeaveHistoryForEmployee = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ marginBottom: 80 }}>
          {/* <Title>Leaave Requests History</Title> */}
          <EmployeeLeaveHistoryTable />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaveHistoryForEmployee;

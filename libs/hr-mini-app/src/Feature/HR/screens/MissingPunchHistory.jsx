import React from 'react';
import Title from '../components/shared/Title';
import { View } from 'react-native';
import { ScrollView } from 'native-base';
import MissingPunchHistoryTable from '../components/cards/MissingPunchHistoryTable';
const MissingPunchHistory = () => {
  return (
    <ScrollView>
      <View style={{ marginBottom: 80 }}>
        {/* <Title>Missing Punch History</Title> */}
        <MissingPunchHistoryTable />
      </View>
    </ScrollView>
  );
};

export default MissingPunchHistory;

import { Box, Heading, Text, View } from 'native-base';
import { DataTable } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const EmergencyContactInfo = ({ emergencyContactInfo, onEdit }) => {
  console.log(emergencyContactInfo, 'familyInfo');
  return (
    <View>
      <Heading size="md" color="#194569" style={{ marginTop: '5%' }} ml={3}>
        Emergency Contact
      </Heading>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title> Relationship</DataTable.Title>
          <DataTable.Title> Phone </DataTable.Title>
        </DataTable.Header>
        {emergencyContactInfo.length > 0 ? (
          emergencyContactInfo.map((el) => {
            return (
              <DataTable.Row>
                <DataTable.Cell>
                  {el?.name?.en || el?.name?.ar || 'N/A'}
                </DataTable.Cell>
                <DataTable.Cell>
                  {el?.relation?.name?.en || el?.relation?.name?.ar || 'N/A'}
                </DataTable.Cell>
                <DataTable.Cell>{el?.phone?.number || 'N/A'}</DataTable.Cell>
              </DataTable.Row>
            );
          })
        ) : (
          <DataTable.Row>
            <DataTable.Cell>No Data</DataTable.Cell>
          </DataTable.Row>
        )}
      </DataTable>
    </View>
  );
};

export default EmergencyContactInfo;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});

import {Box, Heading, Text, View} from 'native-base';
import { DataTable } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const FamilyInfo = ({ familyInfo, onEdit }) => {
  console.log(familyInfo, 'familyInfo');
  return (
    <View>
      <Heading size="md" color="#194569" style={{ marginTop: '5%' }} ml={3}>
        Family Information
      </Heading>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title> Relationship</DataTable.Title>
          <DataTable.Title> Date of Birth</DataTable.Title>
        </DataTable.Header>
        {
          familyInfo.length > 0 ? familyInfo.map((el) => {
            return (
              <DataTable.Row>
                <DataTable.Cell>
                  {el?.name?.en || el?.name?.ar || 'N/A'}
                </DataTable.Cell>
                <DataTable.Cell>
                  {el?.relation?.name?.en || el?.relation?.name?.ar || 'N/A'}
                </DataTable.Cell>
                <DataTable.Cell>{el?.dob || 'N/A'}</DataTable.Cell>
              </DataTable.Row>
            );
          }) : <DataTable.Row>
                <DataTable.Cell>
                  No Data
                </DataTable.Cell>
              </DataTable.Row>
        }
      </DataTable>
    </View>
  );
};

export default FamilyInfo;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});

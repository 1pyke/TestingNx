import * as React from 'react';
// import { FlatList } from 'native-base';
import DataTable, { COL_TYPES } from 'react-native-datatable-component';
import { StyleSheet, View, Text } from 'react-native';
const Table = () => {
  const data = [
    { name: 'Divyesh', age: 21, gender: 'male' },
    { name: 'Nikhil', age: 22, gender: 'male' },
    { name: 'Rajesh', age: 21, gender: 'male' },
  ];

  //   const colSettings = [
  //     { name: 'name', type: COL_TYPES.STRING, width: '30%' },
  //     { name: 'age', type: COL_TYPES.INT, width: '30%' },
  //     { name: 'gender', type: COL_TYPES.STRING, width: '30%' },
  //   ];
  const colNames = ['name', 'age', 'gender'];
  return (
    <View style={styles.container}>
      <DataTable
        data={data}
        colNames={colNames}
        backgroundColor={'#acaaab33'}
        headerLabelStyle={{ color: 'black', fontSize: 12 }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 50,
    width: '90%',
    alignSelf: 'center',
  },
});
export default Table;

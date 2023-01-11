import React, { useEffect, useState } from 'react';
import { getAllLeaveRequests } from '../../store-Hr';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Center } from 'native-base';
const AllLeaveRequestsHistoryTable = () => {
  const dispatch = useDispatch();
  const hrStore = useSelector((state) => state.hrStore);
  const [allLeaveRequestsData, setAllLeaveRequestsData] = useState([]);
  const [filtredData, setFiltredData] = useState([]);
  useEffect(() => {
    if (hrStore.leaveRequestsLoading == false) {
      let dateOffset = 24 * 60 * 60 * 1000 * 30;
      let myDate = new Date();
      myDate.setTime(myDate.getTime() - dateOffset);
      let beforeThirtyDays = myDate.toISOString().slice(0, 10);

      //   // console.log(beforeOneDay, 'beforeOneDay');
      let arr1 = hrStore.leaveInfo.filter(
        (element) => element.applyDate >= beforeThirtyDays
      );
      // let arr2 = hrStore.leaveInfo.filter(
      //   (element) =>  element.DateFrom == element.dateTo
      // );
      setAllLeaveRequestsData(arr1.length > 0 ? arr1 : null);
      setFiltredData(arr1.length > 0 ? arr1 : null);
    } else {
      dispatch(getAllLeaveRequests({ employeeUuid: null }));
    }
  }, [hrStore.leaveRequestsLoading]);
  const statusBorderColor = (status) => {
    switch (status) {
      case 'New':
        return 'blue';
      case 'updated':
        return 'orange';
      case 'accepted':
        return 'green';

      case 'refused':
        return 'red';
    }
  };
  const switchingStatus = (status) => {
    let updatedStatusArr = [];
    if (status !== 'all') {
      filtredData.forEach((item) => {
        if (item.isApproved == status) {
          updatedStatusArr.push(item);
        }
      });
    } else {
      updatedStatusArr = filtredData;
    }

    setAllLeaveRequestsData(updatedStatusArr);
  };

  return (
    <View>
      {allLeaveRequestsData.length > 0 ? (
        <View>
          <RNPickerSelect
            placeholder={{ label: 'Select Status', value: null }}
            onValueChange={(optionType) => switchingStatus(optionType)}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            items={[
              { label: 'all', value: 'all' },
              { label: 'accepted', value: 'accepted' },
              { label: 'refused', value: 'refused' },
              { label: 'pending', value: 'pending' },
              { label: 'updated', value: 'updated' },
            ]}
          />
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Apply Date</DataTable.Title>
              <DataTable.Title> From-To</DataTable.Title>
            </DataTable.Header>
            {allLeaveRequestsData?.map((el) => {
              return (
                <DataTable.Row
                  style={{
                    borderLeftColor: statusBorderColor(el.isApproved),
                    borderLeftWidth: 4,
                    marginBottom: 5,
                  }}
                  key={el.id}
                >
                  <DataTable.Cell style={{ maxWidth: 200 }}>
                    {el.employeeName}
                  </DataTable.Cell>
                  <DataTable.Cell style={{ maxWidth: 100 }}>
                    {el.applyDate.slice(5)}
                  </DataTable.Cell>

                  {el.DateFrom != el.dateTo ? (
                    <>
                      <DataTable.Cell>
                        {el.DateFrom.slice(5)}--{el.dateTo.slice(5)}
                      </DataTable.Cell>
                      {/* <DataTable.Cell>{el.dateTo.slice(5)}</DataTable.Cell> */}
                    </>
                  ) : (
                    <>
                      <DataTable.Cell style={{ maxWidth: 200 }}>
                        {el.timeFrom.slice(0, 5)}--{el.timeTo.slice(0, 5)}
                      </DataTable.Cell>
                      {/* <DataTable.Cell>{el.timeTo}</DataTable.Cell> */}
                    </>
                  )}

                  {/* <DataTable.Cell>{el.subLeaveType}</DataTable.Cell> */}
                </DataTable.Row>
              );
            })}
          </DataTable>
        </View>
      ) : (
        <Center>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>
            There's No Requests Yet
          </Text>
        </Center>
      )}
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
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginTop: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 10,
  },
});
export default AllLeaveRequestsHistoryTable;

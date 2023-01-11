// import React, { useEffect, useState } from 'react';
// import { useRoute } from '@react-navigation/native';
// import { getAllLeaveRequests } from '../../store-Hr';
// import { useDispatch, useSelector } from 'react-redux';
// import { DataTable } from 'react-native-paper';
// // import requestBuilder from '../../../requestRebuilder ';
// import axios from 'axios';
// import RNPickerSelect from 'react-native-picker-select';

// import { View, StyleSheet } from 'react-native';
// import { Pressable, Text, Box } from 'native-base';
// const EmployeeLeaveHistoryTable = () => {
//   const route = useRoute();
//   const dispatch = useDispatch();
//   const hrStore = useSelector((state) => state.hrStore);
//   const [allLeaveRequestsData, setAllLeaveRequestsData] = useState([]);
//   const [filtredData, setFiltredData] = useState([]);
//   useEffect(() => {
//     try {
//       let response = async () => {
//         const data = await axios(
//           requestBuilder('hr', '/getAllLeavingsForEmployees', 'post', {
//             providerUuid: route.params.employeeUuid,
//             dateFromFiltred: null,
//             dateToFiltred: null,
//           })
//         );
//         const json = data.data.resp;
//         // setEmployeeData(json[0]);
//         let dateOffset = 24 * 60 * 60 * 1000 * 30;
//         let myDate = new Date();
//         myDate.setTime(myDate.getTime() - dateOffset);
//         let beforeThirtyDays = myDate.toISOString().slice(0, 10);

//         //   // console.log(beforeOneDay, 'beforeOneDay');
//         let arr1 = json.filter(
//           (element) => element.applyDate >= beforeThirtyDays
//         );
//         // let arr2 = json.filter(
//         //   (element) =>  element.DateFrom == element.dateTo
//         // );
//         setAllLeaveRequestsData(arr1.length > 0 ? arr1 : null);
//         setFiltredData(arr1.length > 0 ? arr1 : null);
//         // setRequestComponentStatus(true);
//         return json;
//       };
//       const result = response();
//     } catch (error) {
//       console.log(error);
//     }
//   }, [hrStore.leaveRequestsLoading]);

//   const statusBorderColor = (status) => {
//     switch (status) {
//       case 'New':
//         return 'blue';
//       case 'updated':
//         return 'orange';
//       case 'accepted':
//         return 'green';

//       case 'refused':
//         return 'red';
//     }
//   };
//   const switchingStatus = (status) => {
//     let updatedStatusArr = [];
//     if (status !== 'all') {
//       filtredData.forEach((item) => {
//         if (item.isApproved == status) {
//           updatedStatusArr.push(item);
//         }
//       });
//     } else {
//       updatedStatusArr = filtredData;
//     }

//     setAllLeaveRequestsData(updatedStatusArr);
//   };
//   return (
//     <View>
//       <RNPickerSelect
//         style={pickerSelectStyles}
//         useNativeAndroidPickerStyle={false}
//         placeholder={{ label: 'Select Status', value: null }}
//         onValueChange={(optionType) => switchingStatus(optionType)}
//         items={[
//           { label: 'all', value: 'all' },
//           { label: 'accepted', value: 'accepted' },
//           { label: 'refused', value: 'refused' },
//           { label: 'pending', value: 'pending' },
//           { label: 'updated', value: 'updated' },
//         ]}
//       />
//       <DataTable style={styles.container}>
//         <DataTable.Header style={styles.tableHeader}>
//           <DataTable.Title>Apply Date</DataTable.Title>
//           <DataTable.Title> From</DataTable.Title>
//           <DataTable.Title> To</DataTable.Title>
//           <DataTable.Title> Type</DataTable.Title>
//         </DataTable.Header>
//         {allLeaveRequestsData.map((el) => {
//           return (
//             <DataTable.Row
//               style={{
//                 borderLeftColor: statusBorderColor(el.isApproved),
//                 borderLeftWidth: 4,
//                 marginBottom: 5,
//               }}
//             >
//               <DataTable.Cell>{el.applyDate.slice(5)}</DataTable.Cell>

//               {el.DateFrom != el.dateTo ? (
//                 <>
//                   <DataTable.Cell>{el.DateFrom.slice(5)}</DataTable.Cell>
//                   <DataTable.Cell>{el.dateTo.slice(5)}</DataTable.Cell>
//                 </>
//               ) : (
//                 <>
//                   <DataTable.Cell>{el.timeFrom}</DataTable.Cell>
//                   <DataTable.Cell>{el.timeTo}</DataTable.Cell>
//                 </>
//               )}
//               <DataTable.Cell>{el.subLeaveType}</DataTable.Cell>
//             </DataTable.Row>
//           );
//         })}
//       </DataTable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 15,
//   },
//   tableHeader: {
//     backgroundColor: '#DCDCDC',
//   },
// });
// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 16,
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     marginHorizontal: 10,
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 4,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//   },
//   inputAndroid: {
//     fontSize: 16,
//     paddingHorizontal: 10,
//     marginHorizontal: 10,
//     marginTop: 10,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 8,
//     color: 'black',
//     paddingRight: 30, // to ensure the text is never behind the icon
//     marginVertical: 10,
//   },
// });
// export default EmployeeLeaveHistoryTable;

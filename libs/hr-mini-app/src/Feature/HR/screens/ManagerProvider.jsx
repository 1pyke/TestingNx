// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   ScrollView,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Dimensions,
//   FlatList,
//   RefreshControl,
// } from 'react-native';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// import DisplayAllMissingPunchRequests from '../components/modals/DisplayAllMissingPunchRequests';
// import requestBuilder from '../../requestRebuilder ';
// import {
//   Pressable,
//   Text,
//   Box,
//   HStack,
//   VStack,
//   IconButton,
//   Divider,
//   Center,
// } from 'native-base';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import LeaveModal from '../components/shared/modal';
// import EmployeeCard from '../components/cards/EmployeeCard';
// function HrManager({ navigation }) {
//   const [allLeaveRequestsData, setAllLeaveRequestsData] = useState([]);
//   const hrStore = useSelector((state) => state.hrStore);
//   const [showModal, setshowModal] = useState(false);
//   const [targetReq, settargetReq] = useState();
//   const [refreshing, setRefreshing] = React.useState(false);
//   ///////////////////////////////////////////
//   ///functions
//   const wait = (timeout) => {
//     return new Promise((resolve) => setTimeout(resolve, timeout));
//   };
//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     let response = async () => {
//       const data = await axios(
//         requestBuilder('hr', '/getAllLeavingsForEmployees', 'post', {
//           providerUuid: null,
//           dateFromFiltred: null,
//           dateToFiltred: null,
//         })
//       );
//       const json = data.data.resp;
//       let dateOffset = 24 * 60 * 60 * 1000; //5 days
//       let myDate = new Date();
//       myDate.setTime(myDate.getTime() - dateOffset);
//       let beforeOneDay = myDate.toISOString().slice(0, 10);
//       let arr1 = json.filter(
//         (element) =>
//           (element.isApproved == 'New' || element.isApproved == 'updated') &&
//           element.status == 'latest'
//       );
//       let arr2 = json.filter(
//         (element) =>
//           element.status == 'latest' &&
//           element.applyDate >= beforeOneDay &&
//           (element.isApproved == 'accepted' || element.isApproved == 'refused')
//       );

//       setAllLeaveRequestsData(arr1.length > 0 ? arr1 : arr2);
//       return json;
//     };
//     response();
//     wait(2000).then(() => setRefreshing(false));
//   }, []);

//   useEffect(() => {
//     try {
//       let response = async () => {
//         const data = await axios(
//           requestBuilder('hr', '/getAllLeavingsForEmployees', 'post', {
//             providerUuid: null,
//             dateFromFiltred: null,
//             dateToFiltred: null,
//           })
//         );
//         const json = data.data.resp;
//         let dateOffset = 24 * 60 * 60 * 1000; //5 days
//         let myDate = new Date();
//         myDate.setTime(myDate.getTime() - dateOffset);
//         let beforeOneDay = myDate.toISOString().slice(0, 10);
//         let arr1 = json.filter(
//           (element) =>
//             (element.isApproved == 'New' || element.isApproved == 'updated') &&
//             element.status == 'latest'
//         );
//         let arr2 = json.filter(
//           (element) =>
//             element.status == 'latest' &&
//             element.applyDate >= beforeOneDay &&
//             (element.isApproved == 'accepted' ||
//               element.isApproved == 'refused')
//         );

//         setAllLeaveRequestsData(arr1.length > 0 ? arr1 : arr2);
//         return json;
//       };
//       response();
//     } catch (error) {
//       console.log(error);
//     }
//   }, [hrStore.leaveRequestsUIFlagManager]);

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

//   const listTab = [{ status: 'Request' }, { status: 'Employees' }];
//   const [status, setStatus] = useState('Request');
//   const [showCompo, setShowCompo] = useState(true);
//   const setStatusFilter = (status) => {
//     if (status !== 'Request') {
//       setShowCompo(false);
//     } else {
//       setShowCompo(true);
//     }
//     setStatus(status);
//   };
//   const handleViewHistory = () => {
//     navigation.navigate('AllLeaveRequestsHistory');
//   };
//   const renderEmployeesCards = (itemData) => {
//     return (
//       <View>
//         {itemData.item.DateFrom == itemData.item.dateTo ? (
//           // <ScrollView>
//           // <ScrollView style={styles.card}>
//           <View
//             style={{
//               flexDirection: 'row',
//               padding: 10,
//               marginHorizontal: 13,
//               marginVertical: 10,
//               borderRadius: 12,
//               elevation: 4,
//               backgroundColor: 'white',
//               shadowColor: 'black',
//               shadowOpacity: 0.25,
//               shadowOffset: { width: 0, height: 2 },
//               shadowRadius: 8,
//               borderLeftColor: '#000080',
//               borderLeftWidth: 3,
//             }}
//           >
//             <Pressable
//               onPress={() => {
//                 setshowModal(!showModal);
//                 settargetReq(itemData.item);
//               }}
//             >
//               <HStack
//                 space={5}
//                 h="100"
//                 justifyContent="center"
//                 alignItems="center"
//               >
//                 <VStack>
//                   <Text style={{ fontSize: 16, fontWeight: '600' }}>
//                     {itemData.item.employeeName}
//                   </Text>
//                   <Box>
//                     <Text>
//                       From: {itemData.item.timeFrom} To {itemData.item.timeTo}
//                     </Text>
//                   </Box>
//                   <Box style={{ flexDirection: 'row' }}>
//                     Type: <Text>{itemData.item.leaveType}</Text>
//                   </Box>
//                   <Box
//                     style={{
//                       borderWidth: 1,
//                       borderRadius: 5,
//                       borderColor: statusBorderColor(itemData.item.isApproved),
//                       padding: 3,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: statusBorderColor(itemData.item.isApproved),
//                         padding: 3,
//                       }}
//                     >
//                       {itemData.item.isApproved}
//                     </Text>
//                   </Box>
//                 </VStack>
//               </HStack>
//               {/* </Box> */}
//             </Pressable>
//           </View>
//         ) : (
//           <View
//             style={{
//               flexDirection: 'row',
//               padding: 10,
//               marginHorizontal: 13,
//               marginVertical: 10,
//               borderRadius: 12,
//               elevation: 4,
//               backgroundColor: 'white',
//               shadowColor: 'black',
//               shadowOpacity: 0.25,
//               shadowOffset: { width: 0, height: 2 },
//               shadowRadius: 8,
//               borderLeftColor: '#000080',
//               borderLeftWidth: 3,
//             }}
//             onPress={() => {
//               setshowModal(!showModal);
//               settargetReq(itemData.item);
//             }}
//           >
//             <Pressable
//               onPress={() => {
//                 setshowModal(!showModal);
//                 settargetReq(itemData.item);
//               }}
//             >
//               <HStack
//                 space={5}
//                 h="100"
//                 justifyContent="center"
//                 alignItems="center"
//               >
//                 <VStack>
//                   <Text style={{ fontSize: 16, fontWeight: '600' }}>
//                     {itemData.item.employeeName}
//                   </Text>
//                   <Box>
//                     <Text>
//                       From: {itemData.item.DateFrom} To {itemData.item.dateTo}
//                     </Text>
//                   </Box>
//                   <Box style={{ flexDirection: 'row' }}>
//                     Type:<Text>{itemData.item.leaveType}</Text>
//                   </Box>
//                   <Box
//                     style={{
//                       borderWidth: 1,
//                       borderRadius: 5,
//                       borderColor: statusBorderColor(itemData.item.isApproved),
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: statusBorderColor(itemData.item.isApproved),
//                         padding: 3,
//                       }}
//                     >
//                       {itemData.item.isApproved}
//                     </Text>
//                   </Box>
//                 </VStack>
//               </HStack>
//               {/* </Box> */}
//             </Pressable>
//           </View>
//           // </ScrollView>
//         )}

//         {showModal && (
//           <LeaveModal
//             targetReq={targetReq}
//             setshowModal={setshowModal}
//             showModal={showModal}
//           />
//         )}
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView>
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//       >
//         {showCompo ? (
//           <>
//             <View style={styles.listTab}>
//               {listTab.map((e) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.btnTab,
//                     status === e.status && styles.btnTabActive,
//                   ]}
//                   onPress={() => setStatusFilter(e.status)}
//                 >
//                   <Text
//                     style={[
//                       styles.textTab,
//                       status === e.status && styles.textTabActive,
//                     ]}
//                   >
//                     {e.status}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             {/* <Button onPress={handleViewHistory}>View History</Button> */}
//             {/* <View style={styles.gridItem}>
//               <HStack space={10}>
//                 <Text fontSize="xl">Leave Requsets</Text>

//                 <IconButton
//                   bg={'#80CBC4'}
//                   shadow={9}
//                   w="35"
//                   h="35"
//                   variant="solid"
//                   borderRadius="full"
//                   size="sm"
//                   onPress={handleViewHistory}
//                   icon={
//                     <Icon
//                       style={{ fontSize: 16, color: 'white' }}
//                       name="history"
//                     />
//                   }
//                 />
//               </HStack>
//               <Divider my="3" />
//               {allLeaveRequestsData.length > 0 ? (
//                 <FlatList
//                   data={allLeaveRequestsData}
//                   keyExtractor={(item) => item.id}
//                   renderItem={renderEmployeesCards}
//                   contentStyle={{ padding: 10, marginVertical: 10 }}
//                   horizontal
//                   showsHorizontalScrollIndicator={false}
//                 />
//               ) : (
//                 <Center>
//                   <Text style={{ fontSize: 20 }}>There's no requests yet</Text>
//                 </Center>
//               )}
//             </View> */}
//             <DisplayAllMissingPunchRequests />
//           </>
//         ) : (
//           <>
//             <View style={styles.listTab}>
//               {listTab.map((e) => (
//                 <TouchableOpacity
//                   style={[
//                     styles.btnTab,
//                     status === e.status && styles.btnTabActive,
//                   ]}
//                   onPress={() => setStatusFilter(e.status)}
//                 >
//                   <Text
//                     style={[
//                       styles.textTab,
//                       status === e.status && styles.textTabActive,
//                     ]}
//                   >
//                     {e.status}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//             <EmployeeCard />
//           </>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 10,
//     justifyContent: 'center',
//   },
//   gridItem: {
//     flex: 1,
//     margin: 16,
//     // height: 200,
//     width: '93%',
//     padding: 15,
//     borderRadius: 8,
//     elevation: 4,
//     shadowColor: 'black',
//     shadowOpacity: 0.25,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     backgroundColor: 'white',
//     overflow: 'hidden',
//   },
//   listTab: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   btnTab: {
//     width: Dimensions.get('window').width / 2.5,
//     flexDirection: 'row',
//     borderWidth: 0.5,
//     // borderColor: '#ebebbeb',
//     padding: 15,
//   },

//   textTab: {
//     fontSize: 16,
//   },
//   btnTabActive: {
//     backgroundColor: '#4dccc6',
//   },
//   textTabActive: {
//     color: '#fff',
//   },
//   QuickActionsBtn: {
//     position: 'absolute',
//     right: 20,
//     top: 20,
//     width: 50,
//     height: 50,
//     zIndex: 10,
//   },

//   card: {
//     // justifyContent: 'center',
//     //alignItems: 'center',
//     width: '100%',
//     height: '80%',
//     borderRadius: 6,
//     elevation: 3,
//     backgroundColor: '#fff',
//     shadowOffset: { width: 1, height: 1 },
//     shadowColor: '#333',
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     marginHorizontal: 4,
//     marginVertical: 6,
//     padding: 5,
//   },
//   cardContent: {
//     marginHorizontal: 18,
//     marginVertical: 10,
//   },
//   leaveRequest: {
//     width: '100%',
//     height: 100,
//     borderLeftWidth: 5,
//     shadowOffset: { width: 1, height: 1 },
//     shadowColor: '#333',
//     shadowOpacity: 0.3,
//     shadowRadius: 2,
//     elevation: 4,
//     margin: 3,
//   },
// });

// export default HrManager;
// ///  //

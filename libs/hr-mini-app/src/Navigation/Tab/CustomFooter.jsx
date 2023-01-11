// import React, { useState } from 'react';
// import { StyleSheet, View, Platform } from 'react-native';
// import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { Center, Icon, HStack, Pressable } from 'native-base';

// ////////////////// Components //////////////////
// // import QuickAction from '../../sharedComponents/FinalLayout/QuickAction';
// function CustomFooter() {
//   const [selected, setSelected] = useState(1);

//   const navigation = useNavigation();

//   function homeHandler() {
//     setSelected(1);
//     navigation.navigate('Dashboard');
//   }
//   function chattHandler() {
//     setSelected(2);
//     navigation.navigate('ChattScreens');
//   }
//   function qrHandler() {
//     setSelected(3);
//     navigation.navigate('LibraryTest');
//   }
//   function notificationHandler() {
//     setSelected(4);
//     navigation.navigate('NotificationIndex');
//   }
//   function myProfile() {
//     setSelected(5);
//     navigation.navigate('AppointmentsReceptionistProfile');
//   }
//   return (
//     <View>
//       <View style={styles.QuickActionsBtn}>
//         {/* <QuickAction navigation={navigation}/> */}
//       </View>
//       <HStack
//         bg="white"
//         alignItems="center"
//         shadow={6}
//         borderTopRadius={20}
//         safeAreaBottom
//       >
//         <Pressable
//           cursor="pointer"
//           opacity={
//             selected === 1 &&
//             navigation.getState().routes[3]?.state.routes[0].state.routes[
//               navigation.getState().routes[3].state.routes[0].state.routes
//                 .length - 1
//             ].name === 'Dashboard'
//               ? 1
//               : 0.5
//           }
//           py="3"
//           flex={1}
//           onPress={() => {
//             homeHandler();
//           }}
//         >
//           <Center>
//             <Icon
//               as={<MaterialCommunityIcons name="home" />}
//               color={'#00796B'}
//               size={Platform.OS === 'ios' ? 'xl' : 'lg'}
//             />
//           </Center>
//         </Pressable>
//         <Pressable
//           cursor="pointer"
//           opacity={
//             selected === 2 &&
//             navigation.getState().routes[3]?.state.routes[0].state.routes[
//               navigation.getState().routes[3].state.routes[0].state.routes
//                 .length - 1
//             ].name === 'Chatt'
//               ? 1
//               : 0.5
//           }
//           py="3"
//           flex={1}
//           onPress={() => {
//             chattHandler();
//           }}
//         >
//           <Center>
//             <Icon
//               as={<MaterialCommunityIcons name="chat-processing-outline" />}
//               color={'#00796B'}
//               size={Platform.OS === 'ios' ? 'xl' : 'lg'}
//             />
//           </Center>
//         </Pressable>
//         <Pressable
//           cursor="pointer"
//           opacity={
//             selected === 3 &&
//             navigation.getState().routes[3]?.state.routes[0].state.routes[
//               navigation.getState().routes[3].state.routes[0].state.routes
//                 .length - 1
//             ].name === 'LibraryTest'
//               ? 1
//               : 0.5
//           }
//           py="3"
//           flex={1}
//           onPress={() => {
//             qrHandler();
//           }}
//         >
//           <Center>
//             <Icon
//               as={<MaterialCommunityIcons name="qrcode-scan" />}
//               color={'teal.700'}
//               size={Platform.OS === 'ios' ? 'xl' : 'lg'}
//             />
//           </Center>
//         </Pressable>
//         <Pressable
//           cursor="pointer"
//           opacity={
//             selected === 4 &&
//             navigation.getState().routes[3]?.state.routes[0].state.routes[
//               navigation.getState().routes[3].state.routes[0].state.routes
//                 .length - 1
//             ].name === 'NotificationIndex'
//               ? 1
//               : 0.5
//           }
//           py="3"
//           flex={1}
//           onPress={() => {
//             notificationHandler();
//           }}
//         >
//           <Center>
//             <Icon
//               as={<MaterialIcons name="notifications" />}
//               color={'teal.700'}
//               size={Platform.OS === 'ios' ? 'xl' : 'lg'}
//             />
//           </Center>
//         </Pressable>
//         <Pressable
//           cursor="pointer"
//           opacity={
//             selected === 5 &&
//             navigation.getState().routes[3]?.state.routes[0].state.routes[
//               navigation.getState().routes[3].state.routes[0].state.routes
//                 .length - 1
//             ].name === 'AppointmentsReceptionistProfile'
//               ? 4
//               : 0.4
//           }
//           py="3"
//           flex={1}
//           onPress={myProfile}
//         >
//           <Center>
//             <Icon
//               as={<MaterialCommunityIcons name="account-circle" />}
//               color={'teal.700'}
//               size={Platform.OS === 'ios' ? 'xl' : 'lg'}
//             />
//           </Center>
//         </Pressable>
//       </HStack>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   QuickActionsBtn: {
//     position: 'absolute',
//     right: 20,
//     bottom: Platform.OS === 'ios' ? 95 : 55,
//     width: 50,
//     height: 50,
//   },
// });

// export default CustomFooter;
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { Center, IconButton } from 'native-base';
// import React, { useState } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';

// import MyHr from '../../Feature/HR/screens/MyHr';
// import LeaveScreen from '../../Feature/HR/screens/LeaveScreen';
// import AttendanceHistoryForEmployee from '../../Feature/HR/screens/AttendanceHistoryForEmployee';
// import MissingPunchScreen from '../../Feature/HR/screens/MissingPunchScreen';
// import LeaveScreenManager from '../../Feature/HR/screens/LeaveScreenManager';
// import MissingPunchScreenManager from '../../Feature/HR/screens/MissingPunchScreenManager';
// import TimeAttendanceManager from '../../Feature/HR/screens/TimeAttendanceManager';
// import MyHrQuickAction from '../../Feature/HR/components/shared/MyHrQuickActions';
// import ActionsScreenManager from '../../Feature/HR/screens/ActionsScreenManager';
// // import HrManager from '../../Feature/HR/screens/ManagerProvider';

// const Tab = createBottomTabNavigator();

// const CustomFooter = () => {
//   const [myHrQuickActionStatus, setMyHrQuickActionStatus] = useState(false);

//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarShowLabel: false,
//         tabBarStyle: {
//           position: 'absolute',
//           // bottom: 50,
//           // left: 20,
//           // right: 20,
//           elevation: 0,
//           backgroundColor: '#ffffff',
//           borderRadius: 15,
//           height: 90,
//           ...styles.shadow,
//         },
//       }}
//     >
//       {/* <Tab.Screen
//         name="MyHR"
//         component={MyHr}
//         options={{
//           tabBarIcon: ({ foucsed }) => (
//             <View>
//               <Image
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintColor: foucsed ? '#e32f45' : '#748c94',
//                 }}
//               />
//               <Text
//                 style={{ color: foucsed ? '#e32f45' : '#748c94', fontSize: 12 }}
//               >
//                 Home
//               </Text>
//             </View>
//           ),
//         }}
//       /> */}
//       <Tab.Screen
//         name="Employee Leaves"
//         component={LeaveScreen}
//         options={{
//           tabBarIcon: ({ foucsed }) => (
//             <View>
//               <Center>
//                 <Icon
//                   style={{ fontSize: 30, color: '#5f84a2' }}
//                   name="account-arrow-right"
//                 />
//               </Center>
//               <Text
//                 style={{
//                   color: foucsed ? '#e32f45' : '#748c94',
//                   fontSize: 12,
//                 }}
//               >
//                 Leaves
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="AttendanceHistoryForEmployee"
//         component={AttendanceHistoryForEmployee}
//         options={{
//           tabBarIcon: ({ foucsed }) => (
//             <View>
//               <Icon
//                 style={{ fontSize: 30, color: '#5f84a2' }}
//                 name="calendar-month"
//               />
//               <Text
//                 style={{
//                   color: foucsed ? '#e32f45' : '#748c94',
//                   fontSize: 12,
//                 }}
//               >
//                 Attendance
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Employee Missing Requests"
//         component={MissingPunchScreen}
//         options={{
//           tabBarIcon: ({ foucsed }) => (
//             <View>
//               <Center>
//                 <Icon
//                   style={{ fontSize: 30, color: '#5f84a2' }}
//                   name="account-clock-outline"
//                 />
//               </Center>
//               <Text
//                 style={{
//                   color: foucsed ? '#e32f45' : '#748c94',
//                   fontSize: 12,
//                 }}
//               >
//                 Missing
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       {/* ///manager screens */}
//       <Tab.Screen
//         name="LeaveScreenManager"
//         component={LeaveScreenManager}
//         options={{
//           tabBarIcon: ({ foucsed }) => (
//             <View>
//               {/* <Image
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintColor: foucsed ? '#e32f45' : '#748c94',
//                 }}
//               /> */}

//               <Center>
//                 <Icon
//                   style={{ fontSize: 30, color: '#5f84a2' }}
//                   name="account-arrow-right"
//                 />
//               </Center>
//               <Text
//                 style={{
//                   color: foucsed ? '#e32f45' : '#748c94',
//                   fontSize: 12,
//                 }}
//               >
//                 LManager
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Missing Requests"
//         component={MissingPunchScreenManager}
//         options={{
//           tabBarIcon: ({ foucsed }) => (
//             <View>
//               <Center>
//                 <Icon
//                   style={{ fontSize: 30, color: '#5f84a2' }}
//                   name="account-clock-outline"
//                 />
//               </Center>
//               <Text
//                 style={{
//                   color: foucsed ? '#e32f45' : '#748c94',
//                   fontSize: 12,
//                 }}
//               >
//                 MManager
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="TimeAttendanceManager"
//         component={TimeAttendanceManager}
//         options={{
//           tabBarIcon: ({ foucsed }) => (
//             <View>
//               <Center>
//                 <Icon
//                   style={{ fontSize: 30, color: '#5f84a2' }}
//                   name="calendar-month"
//                 />
//               </Center>
//               <Text
//                 style={{
//                   color: foucsed ? '#e32f45' : '#748c94',
//                   fontSize: 12,
//                 }}
//               >
//                 MTime
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Actions"
//         component={ActionsScreenManager}
//         options={{
//           tabBarIcon: ({ foucsed }) => (
//             <View>
//               <Center>
//                 <Icon
//                   style={{ fontSize: 30, color: '#5f84a2' }}
//                   name="calendar-month"
//                 />
//               </Center>
//               <Text
//                 style={{
//                   color: foucsed ? '#e32f45' : '#748c94',
//                   fontSize: 12,
//                 }}
//               >
//                 Actions
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       {/* <Tab.Screen name="HrManager" component={HrManager} /> */}
//     </Tab.Navigator>
//   );
// };
// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#755d50',
//     shadowOffset: {
//       width: 0,
//       height: 10,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
// });
// export default CustomFooter;
////////////////////////////////////////////////////
import React from 'react';
import { View } from 'native-base';

import { Text, Icon, HStack, Center, Pressable } from 'native-base';
import {
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
  FontAwesome,
} from '@expo/vector-icons';
import MyHrQuickAction from '../../Feature/HR/components/shared/MyHrQuickActions';
const CustomFooter = ({ navigation }) => {
  const [selected, setSelected] = React.useState(1);
  const handleNavigation = (nav, page, s) => {
    nav.navigate(page);
    setSelected(s);
  };
  const homeHandleNavigation = (nav, page, s) => {
    nav.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
    setSelected(s);
  };
  return (
    <View>
      <View justifyContent={'flex-end'} alignItems={'flex-end'} mr={2} mb={2}>
        <MyHrQuickAction />
      </View>
      <HStack bg="muted.50" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          cursor="pointer"
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => homeHandleNavigation(navigation, 'Home', 0)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 0 ? 'home' : 'home-outline'}
                />
              }
              color="#194569"
              size="sm"
            />
            <Text color="#194569" fontSize={12}>
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => handleNavigation(navigation, 'MyProfileScreen', 1)}
        >
          <Center>
            {/*profile screen icon*/}
            <FontAwesome name="user-circle" size={24} color="black" />
            <Text color="#194569" fontSize={12}>
              Profile
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => handleNavigation(navigation, 'LeaveScreen', 1)}
        >
          <Center>
            <Ionicons
              name={selected === 2 ? 'walk' : 'walk-outline'}
              size={24}
              color="black"
            />
            <Text color="#194569" fontSize={12}>
              Leaves
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() =>
            handleNavigation(navigation, 'AttendanceHistoryForEmployee', 2)
          }
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 2 ? 'wallet' : 'wallet-outline'}
                />
              }
              color="#194569"
              size="sm"
            />
            <Text color="#194569" fontSize={12}>
              Attendance
            </Text>
          </Center>
        </Pressable>
        {/*<Pressable*/}
        {/*  cursor="pointer"*/}
        {/*  opacity={selected === 3 ? 1 : 0.7}*/}
        {/*  py="2"*/}
        {/*  flex={1}*/}
        {/*  onPress={() => handleNavigation(navigation, 'MissingPunchScreen', 3)}*/}
        {/*>*/}
        {/*  <Center>*/}
        {/*    <FontAwesome name="calendar-minus-o" size={24} color="black" />*/}
        {/*    <Text color="#194569" fontSize={12}>*/}
        {/*      Missing*/}
        {/*    </Text>*/}
        {/*  </Center>*/}
        {/*</Pressable>*/}
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.7}
          py="2"
          flex={1}
          onPress={() => handleNavigation(navigation, 'LeaveScreenManager', 3)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <Ionicons
                  name={
                    selected === 3
                      ? 'md-notifications'
                      : 'md-notifications-outline'
                  }
                />
              }
              color="#194569"
              size="sm"
            />
            <Text color="#194569" fontSize={12}>
              Lmanager
            </Text>
          </Center>
        </Pressable>
        {/*<Pressable*/}
        {/*  cursor="pointer"*/}
        {/*  opacity={selected === 3 ? 1 : 0.7}*/}
        {/*  py="2"*/}
        {/*  flex={1}*/}
        {/*  onPress={() =>*/}
        {/*    handleNavigation(navigation, 'MissingPunchScreenManager', 3)*/}
        {/*  }*/}
        {/*>*/}
        {/*  <Center>*/}
        {/*    <Icon*/}
        {/*      mb="1"*/}
        {/*      as={*/}
        {/*        <Ionicons*/}
        {/*          name={*/}
        {/*            selected === 3*/}
        {/*              ? 'md-notifications'*/}
        {/*              : 'md-notifications-outline'*/}
        {/*          }*/}
        {/*        />*/}
        {/*      }*/}
        {/*      color="#194569"*/}
        {/*      size="sm"*/}
        {/*    />*/}
        {/*    <Text color="#194569" fontSize={12}>*/}
        {/*      MMissing*/}
        {/*    </Text>*/}
        {/*  </Center>*/}
        {/*</Pressable>*/}
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.7}
          py="2"
          flex={1}
          onPress={() =>
            handleNavigation(navigation, 'TimeAttendanceManager', 3)
          }
        >
          <Center>
            <Icon
              mb="1"
              as={
                <Ionicons
                  name={
                    selected === 3
                      ? 'md-notifications'
                      : 'md-notifications-outline'
                  }
                />
              }
              color="#194569"
              size="sm"
            />
            <Text color="#194569" fontSize={12}>
              MAttendance
            </Text>
          </Center>
        </Pressable>
        {/*<Pressable*/}
        {/*  cursor="pointer"*/}
        {/*  opacity={selected === 3 ? 1 : 0.7}*/}
        {/*  py="2"*/}
        {/*  flex={1}*/}
        {/*  onPress={() => handleNavigation(navigation, 'LeaveScreenManager', 3)}*/}
        {/*>*/}
        {/*  <Center>*/}
        {/*    <Icon*/}
        {/*      mb="1"*/}
        {/*      as={*/}
        {/*        <Ionicons*/}
        {/*          name={*/}
        {/*            selected === 3*/}
        {/*              ? 'md-notifications'*/}
        {/*              : 'md-notifications-outline'*/}
        {/*          }*/}
        {/*        />*/}
        {/*      }*/}
        {/*      color="#194569"*/}
        {/*      size="sm"*/}
        {/*    />*/}
        {/*    <Text color="#194569" fontSize={12}>*/}
        {/*      Lmanager*/}
        {/*    </Text>*/}
        {/*  </Center>*/}
        {/*</Pressable>*/}
        <Pressable
          cursor="pointer"
          opacity={selected === 3 ? 1 : 0.7}
          py="2"
          flex={1}
          onPress={() =>
            handleNavigation(navigation, 'ActionsScreenManager', 3)
          }
        >
          <Center>
            <Icon
              mb="1"
              as={
                <Ionicons
                  name={
                    selected === 3
                      ? 'md-notifications'
                      : 'md-notifications-outline'
                  }
                />
              }
              color="#194569"
              size="sm"
            />
            <Text color="#194569" fontSize={12}>
              Actions
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </View>
  );
};
export { CustomFooter };

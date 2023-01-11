import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import FilterModal from '../modals/FilterModal';
import { Text, Box, HStack, Center, Input, Divider, Avatar } from 'native-base';
import {
  getTimeAttendanceEmployeeService,
  getEmployeesInforamtionService,
} from '../../util/http';
import { getFormattedDate } from '../../util/dateFormatting';
const TimeAttendanceCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [employeesGroupValues, setEmployeesGroupValues] = React.useState([]);
  const [typesGroupValues, setTypesGroupValues] = React.useState([]);
  const [allTimeAttendance, setAllTimeAttendance] = useState('');
  const [allTimeAttendanceDynamic, setAllTimeAttendanceDynamic] = useState('');
  const [employeesInform, setEmployeesInform] = useState(0);
  const [employeesCounterIn, setEmployeesCounterIn] = useState(0);
  const [AllAttendance, setAllAttendance] = useState([]);
  const [searchField, setrSearchField] = useState('');
  const AuthStore = useSelector((state) => state.AuthStore);
  const hrStore = useSelector((state) => state.hrStore);
  useEffect(() => {
    try {
      let response = async () => {
        const data = await getTimeAttendanceEmployeeService({
          today_date: getFormattedDate(new Date()),
          facilityId: AuthStore.user.facility.id,
        });
        const json = data?.data?.data?.response || [];
        let arr = [];
        json?.forEach((element) => {
          // let test = element.name.en.split(' ');
          // let firstName = test[0];
          // let secondName = test[1];
          // let lastName = test[2];
          arr.push({
            employeeId: element.id,
            employeeName: element?.name?.en,
            employeeImage: element?.image ? element.image : null,
            employeeOccupation:
              element.occupation !== null
                ? element?.occupation?.name?.en
                : null,
            employeeGender: element.gender ? element?.gender?.name?.en : null,
            emplpoyeeAttendance: element?.timeAttendance,
          });
        });
        setAllAttendance(json);
        // setAllTimeAttendance(arr);
        // this.allEmployeesDataFixed = arr;
        // setAllTimeAttendance(json);
        // setAllTimeAttendanceDynamic(arr);

        //   // console.log(beforeOneDay, 'beforeOneDay');

        // setAllAttendanceData(arr1.length > 0 ? arr1 : null);
      };
      response();
    } catch (error) {
      console.log(error, 'get attendance data for manager error');
    }
  }, []);
  console.log(AuthStore.user.facility.id, 'AuthStore.user.facility.id');
  useEffect(() => {
    try {
      let response = async () => {
        const data = await getEmployeesInforamtionService({
          limit: 0,
          offset: 0,
        });
        setEmployeesInform(data.data.results);
      };
      response();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    try {
      countEmployees();
    } catch (error) {
      console.log(error);
    }
  }, []);

  ///functions

  ///to handle filter on employee name
  const handleCallbackEmployees = (childData) => {
    setEmployeesGroupValues(childData);
  };
  ///to handle filter on leave type
  const handleCallbackTypesFilter = (childData) => {
    setTypesGroupValues(childData);
  };
  const handleChange = (text) => setrSearchField(text);

  const searchingForEmployee = () => {
    try {
      setAllTimeAttendanceDynamic(
        allTimeAttendance.filter((employee) =>
          employee.employeeName
            .toLowerCase()
            .includes(searchField.toLowerCase())
        )
      );
    } catch (error) {
      console.log(error.message, 'searching error');
    }
  };
  ///to handle filter button
  async function handleFilterAction(event) {
    event.preventDefault();
    /////////////////////////////////////////

    try {
      // console.log(allTimeAttendance, 'allTimeAttendanceallTimeAttendance');
      // const filterDataArr = allTimeAttendance.filter((ele) => {
      //   console.log(ele.status, 'elelelelelel');
      //   return typesGroupValues ? ele.status === typesGroupValues[0] : true;
      // });
      // setAllTimeAttendanceDynamic(filterDataArr);
      // return;
      ///////////////////////////////////////
      try {
        if (typesGroupValues[0] == 'In') {
          const arr = [];
          allTimeAttendance?.forEach((element) => {
            if (
              element.emplpoyeeAttendance !== null &&
              (element.emplpoyeeAttendance[0].in_status !== null) &
                (element.emplpoyeeAttendance[0].out_status === null)
            ) {
              arr.push(element);
            }
          });

          setAllTimeAttendanceDynamic(arr);
          setShowFilterModal(false);
        } else if (typesGroupValues[0] == 'Out') {
          const arr = [];
          allTimeAttendance?.forEach((element) => {
            if (
              (element.emplpoyeeAttendance !== null &&
                element.emplpoyeeAttendance[0].in_status !== null &&
                element.emplpoyeeAttendance[0].out_status !== null) ||
              element.emplpoyeeAttendance === null
            ) {
              arr.push(element);
            }
          });

          setAllTimeAttendanceDynamic(arr);
          setShowFilterModal(false);
        } else {
          const arr = [];
          allTimeAttendance?.forEach((element) => {
            arr.push(element);
          });
          setAllTimeAttendanceDynamic(arr);
          setShowFilterModal(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const countEmployees = async () => {
    try {
      // here we get all employees time attendance for today and check who in or out then we reflect that on donut chart
      let arr = [];
      let employeesCounterIn = 0;
      console.log(AllAttendance.length, 'AllAttendanceAllAttendance');
      // console.log(allTimeAttendance, 'allTimeAttendanceallTimeAttendance');
      await AllAttendance?.forEach((element) => {
        if (
          (element.timeAttendance !== null &&
            element.timeAttendance[0]?.type?.id == '1' &&
            element.timeAttendance[0]?.status?.id == '1') ||
          (element.timeAttendance !== null &&
            element.timeAttendance[0]?.type?.id == '5' &&
            element.timeAttendance[0]?.status?.id == '1')
        ) {
          arr.push(element);
        }
      });
      setEmployeesCounterIn(arr.length);
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(allTimeAttendance,"allTimeAttendanceallTimeAttendance");
  const renderTimeAttendance = (itemData) => {
    return (
      <View
        style={{
          padding: 10,
          marginHorizontal: 13,
          marginVertical: 10,
          borderRadius: 12,
          elevation: 4,
          backgroundColor: 'white',
          shadowColor: 'black',
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          width: 300,
        }}
      >
        <HStack
          style={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Box>
            {itemData.item.employeeImage ? (
              <Avatar
                style={{ marginTop: 20 }}
                bg="pink.600"
                size="md"
                source={{
                  uri: itemData.item.employeeImage,
                }}
              >
                {/* {itemData.item.profileImg} */}
              </Avatar>
            ) : (
              <Avatar
                style={{ marginTop: 20 }}
                bg="pink.600"
                size="md"
                // source={{
                //   uri: itemData.item.image,
                // }}
              >
                {/* {itemData.item.profileImg} */}
              </Avatar>
            )}
          </Box>
          <Box>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
              {itemData.item.employeeName}
            </Text>
          </Box>
          <Box>
            {itemData.item.emplpoyeeAttendance === null ? (
              <Text>OUT</Text>
            ) : itemData.item.emplpoyeeAttendance !== null &&
              itemData.item.emplpoyeeAttendance[0].time_in &&
              itemData.item.emplpoyeeAttendance[0].time_out === null ? (
              <Text>IN</Text>
            ) : itemData.item.emplpoyeeAttendance !== null &&
              itemData.item.emplpoyeeAttendance[0].time_in &&
              itemData.item.emplpoyeeAttendance[0].time_out !== null ? (
              <Text>OUT</Text>
            ) : null}
          </Box>
        </HStack>
      </View>
    );
  };
  return (
    <ScrollView>
      <View style={styles.gridItem}>
        <Input
          placeholder="Search Employees"
          width="100%"
          borderRadius="4"
          py="3"
          px="1"
          fontSize={14}
          value={searchField}
          onChangeText={handleChange}
          InputLeftElement={
            <Icon
              m="2"
              ml="3"
              size={26}
              color="#5f84a2"
              name="filter-outline"
              onPress={() => setShowFilterModal(true)}
            />
          }
          InputRightElement={
            <Icon
              m="2"
              mr="3"
              size={26}
              color="#5f84a2"
              name="magnify"
              onPress={searchingForEmployee}
            />
          }
        />
        <HStack style={{ justifyContent: 'space-around', marginTop: 10 }}>
          <Box alignItems="center">
            <Text
              fontSize="xl"
              bold
              style={{
                color: 'green',
              }}
            >
              {employeesCounterIn}
            </Text>
            <Text
              style={{
                color: 'green',
              }}
              bold
            >
              Employees IN
            </Text>
          </Box>
          <Box alignItems="center">
            <Text fontSize="xl" bold>
              {employeesInform - employeesCounterIn}
            </Text>
            <Text bold>Employees OUT</Text>
          </Box>
        </HStack>
        <Divider my="3" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {allTimeAttendanceDynamic ? (
            <FlatList
              data={allTimeAttendanceDynamic}
              keyExtractor={(item) => item.id}
              renderItem={renderTimeAttendance}
              contentStyle={{ padding: 10, marginVertical: 10 }}
            />
          ) : (
            <Center>
              <Text style={{ fontSize: 20 }}>There's no requests yet</Text>
            </Center>
          )}
        </ScrollView>
        <FilterModal
          showFilterModal={showFilterModal}
          setShowFilterModal={setShowFilterModal}
          handleCallbackTypes={handleCallbackTypesFilter}
          typesGroupValues={typesGroupValues}
          handleFilterAction={handleFilterAction}
          handleCallbackEmployees={handleCallbackEmployees}
          employeesGroupValues={employeesGroupValues}
          // employeesNames={employeesNames}
          type="attendanceForManager"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  card: {
    // justifyContent: 'center',
    //alignItems: 'center',
    width: '93%',
    height: '80%',
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    padding: 5,
  },
  gridItem: {
    flex: 1,
    margin: 16,
    // height: 200,
    width: '93%',
    padding: 15,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },
  leaveRequest: {
    width: '100%',
    height: 100,
    borderLeftWidth: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
    marginBottom: 14,
  },
});
export default TimeAttendanceCard;

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  Pressable,
  Box,
  HStack,
  VStack,
  Divider,
  Center,
  Platform,
  Text,
  Input,
  Avatar,
  Heading,
} from 'native-base';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import FilterModal from '../../modals/FilterModal';
import { useSelector, useDispatch } from 'react-redux';
import LeaveModal from '../components/shared/modal';
import { getAllEmployees } from '../../../store-Hr';
import { getLeaveRequestService } from '../../../util/http';
import ManagerLeaveRequestModal from '../modals/ManagerLeaveRequestModal';
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import LeaveRequestCardComponent from './LeaveRequestCardComponent';
const ManagerLeaveRequestsCard = () => {
  const hrStore = useSelector((state) => state.hrStore);
  const AuthStore = useSelector((state) => state.AuthStore);
  const [showModal, setshowModal] = useState(false);
  const [targetReq, settargetReq] = useState();
  const [employeesNames, setEmployeesNames] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [employeesGroupValues, setEmployeesGroupValues] = React.useState([]);
  const [typesGroupValues, setTypesGroupValues] = React.useState([]);
  const [statusGroupValues, setStatusGroupValues] = React.useState([]);
  const [dateInform, setDateInform] = useState({
    businessLeaveDateFrom: new Date(),
    due_date: '',
    showDatePicker1: false,
  });
  const [facilityId, setFacilityId] = useState(
    'FAC-FCF-JOR-1bf94704-d0c4-4766-ad03-0c2f26fecd46'
  );
  //////////////////////////////////
  const [allLeaveRequestsData, setAllLeaveRequestsData] = useState([]);
  const [allLeaveRequestsDataDynamic, setAllLeaveRequestsDataDynamic] =
    useState([]);
  useEffect(() => {
    try {
      let response = async () => {
        const data = await getLeaveRequestService({
          limit: 0,
          offset: 0,
          arrayId: null,
          leaveTypeId: null,
          subLeaveType: null,
          leaveStatus: null,
          facilityId: AuthStore.user.facility.id ||facilityId,

        });
        const json = data.row.leaves || [];
        let dateOffset = 24 * 60 * 60 * 1000; //5 days
        let myDate = new Date();
        myDate.setTime(myDate.getTime() - dateOffset);
        let beforeOneDay = myDate.toISOString().slice(0, 10);
        setAllLeaveRequestsData(json.length > 0 ? json : null);
        setAllLeaveRequestsDataDynamic(json.length > 0 ? json : null);
        return json;
      };
      response();
    } catch (error) {
      console.log(error);
    }
  }, [hrStore.leaveRequestsUIFlagManager]);
  ///functions
  ///to handle filter on date
  const onChangeDateCallback = (event, selectedDate) => {
    const currentDate = selectedDate;
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1 + '';
    if (month.length === 1) month = '0' + month;
    let day = currentDate.getDate() + '';
    if (day.length === 1) day = '0' + day;
    if (Platform.OS === 'ios') {
      setDateInform({
        ...dateInform,
        businessLeaveDateFrom: currentDate,
        due_date: year + '-' + month + '-' + day,
      });
    } else {
      setDateInform({
        ...dateInform,
        businessLeaveDateFrom: currentDate,
        due_date: year + '-' + month + '-' + day,
        businessLeaveDateTo: new Date(),
        showDatePicker1: false,
      });
    }
  };

  ///to handle filter on employee name
  const handleCallbackEmployees = (childData) => {
    setEmployeesGroupValues(childData);
  };
  ///to handle filter on leave type
  const handleCallbackTypesFilter = (childData) => {
    setTypesGroupValues(childData);
  };

  ///to handle filter on leave status

  const handleCallbackStatusFilter = (childData) => {
    setStatusGroupValues(childData);
  };
  ///to handle filter button
  async function handleFilterAction(event) {
    try {
      event.preventDefault();
      /////////////////////////////////////////
      const dateTimeInParts = dateInform['businessLeaveDateFrom']
        .toISOString()
        .split('T'); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
      const dateOne = dateTimeInParts[0]; // "2021-08-31"
      console.log(
        // typesGroupValues,
        // 'typesGroupValuestypesGroupValues',
        // allLeaveRequestsData,
        // typesGroupValues[0],
        statusGroupValues
      );
      const filterDataArr = allLeaveRequestsData.filter((ele) => {
        // console.log(ele.type.name.en, 'ele.type.name.enele.type.name.en');
        return (
          (typesGroupValues[0]
            ? ele.type.name.en.toLowerCase() == typesGroupValues[0]
            : true) &&
          (statusGroupValues
            ? ele.status.name.en.toLowerCase() ==
              statusGroupValues[0].toLowerCase()
            : true)
        );
        //  &&
        // (dates ? ele.date >= dates[0] && ele.date <= dates[1] : true)
      });
      // console.log(filterDataArr, 'filterDataArrfilterDataArr');
      setAllLeaveRequestsDataDynamic(filterDataArr);
      setShowFilterModal(false);
      return;
    } catch (error) {
      console.log(error);
    }
  }
  ///////////////////////////////////////
  const renderEmployeesCards = (itemData) => {
    return (
      <View>
        {itemData.item.dateFrom == itemData.item.dateTo ? (
          <Box
            style={{
              padding: 15,
              marginVertical: 10,
              borderRadius: 12,
              elevation: 4,
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOpacity: 0.25,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 8,
              borderLeftColor: '#00bfff',
              borderLeftWidth: 3,
            }}
          >
            {itemData.item.status.name.en == 'new' ? (
              <Pressable
                onPress={() => {
                  setshowModal(!showModal);
                  settargetReq(itemData.item);
                }}
              >
                <LeaveRequestCardComponent
                  employeeName={itemData.item.employee.name.en}
                  leaveType={itemData.item.type.name.en}
                  LeaveStatus={itemData.item.status.name.en}
                  LeaveFrom={itemData.item.timeFrom}
                  LeaveTo={itemData.item.timeTo}
                  image={itemData.item.employee.image}
                />
              </Pressable>
            ) : (
              <LeaveRequestCardComponent
                employeeName={itemData.item.employee.name.en}
                leaveType={itemData.item.type.name.en}
                LeaveStatus={itemData.item.status.name.en}
                LeaveFrom={itemData.item.timeFrom}
                LeaveTo={itemData.item.timeTo}
                image={itemData.item.employee.image}
              />
            )}
          </Box>
        ) : (
          <Box
            bg="#fff"
            rounded="lg"
            w="100%"
            p={4}
            my={2}
            borderWidth={1}
            shadow={2}
            style={{
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
            }}
          >
            {itemData.item.status.name.en == 'new' ? (
              <Pressable
                onPress={() => {
                  setshowModal(!showModal);
                  settargetReq(itemData.item);
                }}
              >
                <LeaveRequestCardComponent
                  employeeName={itemData.item.employee.name.en}
                  leaveType={itemData.item.type.name.en}
                  LeaveSubType={itemData.item.subType.name.en}
                  LeaveStatus={itemData.item.status.name.en}
                  LeaveFrom={itemData.item.dateFrom.slice(5)}
                  LeaveTo={itemData.item.dateTo.slice(5)}
                  image={itemData.item.employee.image}
                />
              </Pressable>
            ) : (
              <LeaveRequestCardComponent
                employeeName={itemData.item.employee.name.en}
                leaveType={itemData.item.type.name.en}
                LeaveSubType={itemData.item.subType.name.en}
                LeaveStatus={itemData.item.status.name.en}
                LeaveFrom={itemData.item.dateFrom.slice(5)}
                LeaveTo={itemData.item.dateTo.slice(5)}
                image={itemData.item.employee.image}
              />
            )}
          </Box>
        )}
        {showModal && (
          <ManagerLeaveRequestModal
            targetReq={targetReq}
            setshowModal={setshowModal}
            showModal={showModal}
          />
        )}
      </View>
    );
  };
  return (
    <ScrollView>
      <Box style={styles.gridItem}>
        <HStack space={10}>
          <Input
            placeholder="Search Employees"
            width="100%"
            borderRadius="4"
            py="3"
            px="1"
            fontSize={14}
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
          />
        </HStack>
        <Divider my="3" />
        {allLeaveRequestsDataDynamic.length > 0 ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={allLeaveRequestsDataDynamic}
              keyExtractor={(item) => item.id}
              renderItem={renderEmployeesCards}
              contentStyle={{ padding: 10, marginVertical: 10 }}
            />
          </ScrollView>
        ) : (
          <Center>
            <Text style={{ fontSize: 20 }}>There's no requests yet</Text>
          </Center>
        )}
        {
          <FilterModal
            showFilterModal={showFilterModal}
            setShowFilterModal={setShowFilterModal}
            handleCallbackTypes={handleCallbackTypesFilter}
            typesGroupValues={typesGroupValues}
            handleCallbackStatus={handleCallbackStatusFilter}
            statusGroupValues={statusGroupValues}
            onChangeDateCallback={onChangeDateCallback}
            dateInform={dateInform}
            setDateInform={setDateInform}
            handleFilterAction={handleFilterAction}
            handleCallbackEmployees={handleCallbackEmployees}
            employeesGroupValues={employeesGroupValues}
            employeesNames={employeesNames}
            type="managerLeaves"
          />
        }
      </Box>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  gridItem: {
    margin: 16,
  },
});

export default ManagerLeaveRequestsCard;

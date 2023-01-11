import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCheckInFlag,
  updateCheckOutFlag,
  updateBreakOutFlag,
  updateBreakInFlag,
} from '../../store-Hr';
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Stagger,
  useDisclose,
} from 'native-base';

import * as LocalAuthentication from 'expo-local-authentication';
import * as Location from 'expo-location';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
  cancelCronJobForEmployee,
  checkEmployeeStatusCronJob,
  checkInService,
  checkOutService,
  createTimeAttendanceService,
  getLeaveRequestService,
  getTodayTimeAttendanceForEmployeeService,
} from '../../util/http';
import { Ionicons } from '@expo/vector-icons';
import NewLeaveRequest from '../refactor/modals/NewLeaveRequest';
import { getTimeAttendanceDataService } from '../../util/http';
import {
  checkBetweenTime,
  formatTotalSpentBreakTimes,
  getFormattedDate,
  setRepetitionForCronJob,
  timeForNow,
} from '../../util/dateFormatting';
import { useFocusEffect } from '@react-navigation/native';
import NewMissingPunchRequestModal from '../refactor/modals/NewMissingPunchRequestModal';

const MyHrQuickActions = () => {
  const { isOpen, onToggle } = useDisclose();
  const dispatch = useDispatch();
  const [showMissingPunchDialog, setShowMissingPunchDialog] = useState(false);
  const [timeAttendanceData2, setTimeAttendanceData2] = useState();
  const AuthStore = useSelector((state) => state.AuthStore);
  const hrStore = useSelector((state) => state.hrStore);
  //////////////////////////
  const [isModalVisible, setIsModalVisible] = useState(false);

  /////////////////
  const [timeAttendanceData, setTimeAttendanceData] = useState([]);
  const [recordId, setRecordId] = useState('');
  ///////////////////////////////////////////////////////////////////////////

  const [status, setStatus] = useState('');
  const [isBiometricSupport, setisBiometricSupport] = useState(false);

  const [leaveRequestData, setLeaveRequestData] = useState(null);
  const [breakOutTimeNow, setBreakOutTimeNow] = useState(
    timeForNow(new Date())
  );

  const [employeeId, setEmployeeId] = useState(
    'HRS-HRP-JOR-1730c46d-3b82-4010-b89f-a18a4e4dfd0b'
  );
  const [facilityId, setFacilityId] = useState(
    'FAC-FCF-JOR-1bf94704-d0c4-4766-ad03-0c2f26fecd46'
  );

  const [shiftTemplateId, setShiftTemplateId] = useState('');

  const [breakDuration, setBreakDuration] = useState(0);
  //////
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setisBiometricSupport(compatible);
    })();
  }, []);
  useFocusEffect(
    React.useCallback(async () => {
      try {
        await checkBtnsStatus(timeAttendanceData);
        // response();
      } catch (e) {
        console.log(e);
      }
    }, [
      hrStore.updateCheckInFlag,
      hrStore.updateCheckOutFlag,
      hrStore.updateBreakInFlag,
      hrStore.updateBreakOutFlag,
    ])
  );
  useFocusEffect(
    React.useCallback(() => {
      CheckLocation();
    }, [])
  );

  const CheckLocation = async () => {
    await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
    }).then(async (location) => {
      let lat1 = location.coords.latitude;
      let lon1 = location.coords.longitude;
      let lat2 = 31.9713089;
      let lon2 = 35.8350942;

      let distance = haversine(lat1, lon1, lat2, lon2);
      if (distance !== 0 && distance * 1000 <= 50) {
        console.log('in building');
        setStatus('in building');
      } else if (distance !== 0) {
        console.log('out building');
        setStatus('out building');
      }
    });
  };

  ///////////////////////////////////////////////////
  async function onAuthenticateCheckIn() {
    try {
      await CheckLocation();
      if (status === 'in building') {
        const auth = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with Touch Id',
          fallbackLabel: 'Enter Password',
        });
        if (auth.success) {
          await checkInHandler();
        } else {
          return;
        }
      } else {
        Alert.alert('Location Alert', `You are out of establishment `);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function onAuthenticateCheckOut() {
    try {
      await CheckLocation();
      if (status === 'in building') {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with Touch Id',
        fallbackLabel: 'Enter Password',
      });
      if (auth.success) {
      await checkOutHandler();
      } else {
        return;
      }
      } else {
        Alert.alert('Location Alert', `You are out of establishment : `);
      }
    } catch (error) {
      console.log(error);
    }
  }
  /////////////////////////////////////////////////////////////////
  /////////////

  const todayTimeAttendance = async () => {
    try {
      const data = await getTodayTimeAttendanceForEmployeeService({
        employeeId: [hrStore.employeeId],
        date: getFormattedDate(new Date()),
        facilityId: AuthStore?.user?.facility.id,
      });
      const json = data;
      setTimeAttendanceData(json);
      await checkBtnsStatus(json);
      await getLeaveRequests({
        employeeId: [hrStore.employeeId],
        facilityId: AuthStore?.user?.facility.id,
      });
      return json;
    } catch (error) {
      console.log(error);
    }
  };

  const themes = {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    red: '#D14124',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    test: '#009688',
    blue1: '#194569',
    blue2: '#5F84A2',
    blue3: '#91AEC4',
    blue4: '#B7D0E1',
    blue5: '#CADEED',
    blue6: '#DBECF4',
    yellow1: '#FFB300',
    yellow2: '#FABB18',
    pink1: '#FF828B',
  };

  useEffect(() => {
    todayTimeAttendance().then((r) => console.log(''));
  }, []);
  ///////////////////
  const checkBtnsStatus = async (json) => {
    try {
      if (json?.rows.length > 0) {
        json.rows.forEach((item) => {
          if (item.type.id == '1') {
            dispatch(updateCheckOutFlag(true));
            dispatch(updateCheckInFlag(false));
            dispatch(updateBreakOutFlag(true));
            dispatch(updateBreakInFlag(false));
          } else if (item.type.id == '2') {
            dispatch(updateCheckOutFlag(false));
            dispatch(updateCheckInFlag(true));
            dispatch(updateBreakOutFlag(false));
            dispatch(updateBreakInFlag(false));
          } else if (item.type.id == '6') {
            dispatch(updateCheckOutFlag(false));
            dispatch(updateCheckInFlag(false));
            dispatch(updateBreakOutFlag(false));
            dispatch(updateBreakInFlag(true));
          } else if (item.type.id == '5') {
            dispatch(updateCheckOutFlag(true));
            dispatch(updateCheckInFlag(false));
            dispatch(updateBreakOutFlag(true));
            dispatch(updateBreakInFlag(false));
          }
        });
      } else {
        //if there is no attendance for today , then enable check in button
        dispatch(updateCheckInFlag(true));
        dispatch(updateCheckOutFlag(false));
        dispatch(updateBreakOutFlag(false));
        dispatch(updateBreakInFlag(false));
      }
    } catch (error) {
      console.log(error, 'check in and out status error');
    }
  };
  const checkInHandler = async () => {
    try {
      let type = {
        id: '1',
        name: {
          ar: 'تسجيل دخول',
          en: 'Check In',
        },
      };
      let status = {
        id: '1',
        name: {
          ar: 'مقبول',
          en: 'Accepted',
        },
      };
      const res = await timeAttendanceDTO(type, status);
      //show success message
      Alert.alert('Success', 'Check In Successfully');
    } catch (error) {
      console.log(error);
    }

    // await axios(
    //   requestRebuilder('hr', '/checkInClicked', 'post', {
    //     providerUuid: employeeUuid,
    //     employeeName: employeeData.firstName + ' ' + employeeData.lastName,
    //     EmployeeId: employeeData.id,
    //   })
    // )
    // .then((results) => {
    // setCheckInNew(DateAndTimeHandler());
    // dispatch(updateCheckInTrue());

    // dispatch(updateCheckOutFalse());

    // dispatch(updateCheckStatus());
    // });
    // }
    // else alert('please be sure to be in the establishment');
  };
  //
  const getLeaveRequests = async (payload) => {
    try {
      let path = await getLeaveRequestService({
        limit: payload.limit ? payload.limit : 0,
        offset: payload.offset ? payload.offset : 0,
        arrayId: payload.employeeId ? payload.employeeId : null,
        leaveTypeId: payload.leaveTypeId ? payload.leaveTypeId : null,
        subLeaveType: payload.subLeaveType ? payload.subLeaveType : null,
        leaveStatus: payload.leaveStatus ? payload.leaveStatus : null,
        facilityId: payload.facilityId,
      });
      setLeaveRequestData(path);
      return path;
    } catch (error) {
      console.log(error);
    }
  };

  const breakOutLogic = async () => {
    try {
      let timeTo;
      let type = {
        id: '6',
        name: {
          ar: 'تسجيل مغادرة',
          en: 'Break Out',
        },
        isLeave: 'false',
      };
      let status = {
        id: '1',
        name: {
          ar: 'مقبول',
          en: 'Accepted',
        },
      };
      let leaves = leaveRequestData.row.leaves || [];
      //check if there is any leaves for today and the same time and status is accepted
      // if there is any leave, then add note to tell him , he is in a leave and id employee
      let userHasLeaves = false;
      leaves.length > 0 &&
        leaves.forEach((item) => {
          if (
            item.status.id == '2' &&
            item.dateFrom == getFormattedDate(new Date()) &&
            item.dateTo == getFormattedDate(new Date()) &&
            item.timeFrom <= breakOutTimeNow &&
            item.timeTo >= breakOutTimeNow
          ) {
            userHasLeaves = true;
            //1- get time to for the leave
            timeTo = item.timeTo;
          }
        });
      if (userHasLeaves) {
        console.log('he has a leave');
        // 2- cron job for returned timeTo,
        // check employee last status,
        // if it still breaks out,then send notify to emp and manger,
        // if status in don't do anything
        type = {
          id: '6',
          name: {
            ar: 'تسجيل مغادرة',
            en: 'Break Out',
          },
          isLeave: 'true',
        };
        await timeAttendanceDTO(type, status);
        //show success message
        Alert.alert('Success', 'Break Out Successfully');
        let cronDTO = {
          issueType: 'NOTIFICATION',
          issueId: hrStore.employeeId,
          repetition: `${timeTo.split(':')[1]} ${timeTo.split(':')[0]} * * *`,
          endPoint: '/hr/timeAttendance/checkEmployeeStatus',
        };
        let cronJob = await checkEmployeeStatusCronJob(cronDTO);
      } else {
        let totalSpentBreak = await calculateBreakDuration(); // in minutes //break duration is 60m
        let result = breakDuration - totalSpentBreak;
        console.log(totalSpentBreak, 'totalSpentBreak');
        console.log(result, 'result');
        if (result > 0) {
          // start cron job after result of result value the cron job will start
          // checkEmployeeStatusCronJob
          await timeAttendanceDTO(type, status);
          //show success message
          let repetition = formatTotalSpentBreakTimes(result);
          let timeNow = timeForNow(new Date());
          let time = setRepetitionForCronJob(repetition, timeNow);
          let cronDTO = {
            issueType: 'NOTIFICATION',
            issueId: hrStore.employeeId,
            repetition: `${time.split(':')[1]} ${time.split(':')[0]} * * *`,
            endPoint: '/hr/timeAttendance/checkEmployeeStatus',
          };
          let cronJob = await checkEmployeeStatusCronJob(cronDTO);
          Alert.alert('Success', 'Break Out Successfully');
        } else {
          let alert = Alert.alert(
            'Warning',
            'You Exceeded Your Break Time',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Break Out',
                onPress: async () => {
                  await timeAttendanceDTO(type, status);
                  //show success message
                  Alert.alert('Success', 'Break Out Successfully');
                },
              },
            ],
            { cancelable: false }
          );
        }
      }
    } catch (e) {
      console.log(e, 'break out error,line 490');
    }
  };

  const breakInLogic = async () => {
    try {
      let type = {
        id: '5',
        name: {
          ar: 'تسجيل رجوع من المغادرة',
          en: 'Break In',
        },
        isLeave: 'false',
      };
      let status = {
        id: '1',
        name: {
          ar: 'مقبول',
          en: 'Accepted',
        },
      };
      // await  addAttachment
      await timeAttendanceDTO(type, status);
      //if check the break duration is 60m, then stop cron job after break in
      let todayAttendance = await todayTimeAttendance({
        employeeId: [hrStore.employeeId],
        date: getFormattedDate(new Date()),
        limit: 1,
        offset: 1,
        facilityId: AuthStore.user.facility.id,
      });
      let maxTime =
        timeAttendanceData.rows[0].time ||
        todayAttendance.rows[0].time ||
        timeForNow(new Date());
      let timeNow = timeForNow(new Date());
      let repetition = formatTotalSpentBreakTimes(breakDuration);
      let time = setRepetitionForCronJob(maxTime, repetition);
      // let finalTime = this.getDifferenceBetweenTimes(time,timeNow)
      //function to check if time now is less than time
      //if yes, then stop cron job
      //if no, then continue cron job

      let calculateDifferenceTime = checkBetweenTime(maxTime, timeNow);
      if (calculateDifferenceTime) {
        //cancel
        let cronDTO = {
          id: hrStore.employeeId,
        };
        let cronJob = await cancelCronJobForEmployee(cronDTO);
      }
      //show success message
      Alert.alert('Success', 'Break In Successfully');
    } catch (e) {
      console.log(e, 'break in error,line 490');
    }
  };
  const checkOutHandler = async () => {
    try {
      let type = {
        id: '2',
        name: {
          ar: 'تسجيل خروج',
          en: 'Check Out',
        },
      };
      let status = {
        id: '1',
        name: {
          ar: 'مقبول',
          en: 'Accepted',
        },
      };
      const res = await timeAttendanceDTO(type, status);
      //show success message
      Alert.alert('Success', 'Check Out Successfully');
    } catch (error) {
      console.log(error);
    }
  };
  const timeAttendanceDTO = async (type, status) => {
    try {
      // this.loading = true;
      let checkInDTO = {
        employee: {
          id: hrStore.employeeId,
          img: null,
          name: hrStore.employeeFullProfile?.name || '',
        },
        facility: {
          id: AuthStore.user.facility.id,
          name: AuthStore.user.facility.name,
        },
        createdBy: {
          id: AuthStore.user.id,
          user: {
            id: AuthStore.user?.id,
            name: AuthStore.user?.name,
          },
          system: 'agents',
          chanel: '12',
        },
        date: getFormattedDate(new Date()),
        type: type,
        status: status,
        time: timeForNow(new Date()),
      };
      let response = await createTimeAttendanceService(checkInDTO);
      if (response.status === 200) {
        await checkBtnsStatus(timeAttendanceData);
      }
    } catch (e) {
      console.log(e, 'check in error');
    }
  };
  const calculateBreakDuration = async () => {
    try {
      //get all activities for the employee for today, then calculate duration between break out time and break in time,
      // so the calculated is for one break , ex : break out on 10:00 , break in : 10:10 ,
      // so first break spend is 10m
      // then check if there is more one break or no , as the same scenario
      let todayBreaks = await getTodayTimeAttendanceForEmployeeService({
        employeeId: [hrStore.employeeId],
        date: getFormattedDate(new Date()),
        facilityId: AuthStore.user.facility.id || facilityId,
      });
      // loop through todayBreaks and check if the type is break out or break in and status is accepted,
      // then save the time in array
      // then calculate the duration between the two times
      let breakOutTimes = [];
      let breakInTimes = [];
      //every break is break out and break in should be related , so the break in time should be after the break out time
      // so the break out time should be less than the break in time
      todayBreaks.rows.forEach((item) => {
        if (item.type.id == '6' && item.status.id == '1') {
          breakOutTimes.push(item.time);
        } else if (item.type.id == '5' && item.status.id == '1') {
          breakInTimes.push(item.time);
        }
      });
      let totalSpentBreak = 0;
      //split the : and get the minutes and hours and calculate the duration
      breakOutTimes.forEach((item, index) => {
        let breakOutTime = item.split(':');
        let breakInTime = breakInTimes[index].split(':');
        let breakOutHours = parseInt(breakOutTime[0]);
        let breakOutMinutes = parseInt(breakOutTime[1]);
        let breakInHours = parseInt(breakInTime[0]);
        let breakInMinutes = parseInt(breakInTime[1]);
        let breakOutTotalMinutes = breakOutHours * 60 + breakOutMinutes;
        let breakInTotalMinutes = breakInHours * 60 + breakInMinutes;
        let breakDurationInMinutes = breakInTotalMinutes - breakOutTotalMinutes;
        totalSpentBreak += breakDurationInMinutes;
      });
      return totalSpentBreak;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Center position={'absolute'}>
      <Box alignItems="center" minH="220">
        <Stagger
          visible={isOpen}
          initial={{
            opacity: 0,
            scale: 0,
            // translateY: 34,
          }}
          animate={{
            translateY: 0,
            scale: 1,
            opacity: 1,
            transition: {
              type: 'spring',
              mass: 0.8,
              stagger: {
                // offset: 30,
                reverse: true,
              },
            },
          }}
          exit={{
            // translateY: 34,
            scale: 0.5,
            opacity: 0,
            transition: {
              duration: 100,
              stagger: {
                // offset: 30,
                reverse: true,
              },
            },
          }}
        >
          <IconButton
            onPress={onAuthenticateCheckIn}
            mb="4"
            variant="solid"
            borderRadius="full"
            bg={!hrStore.isCheckedIn ? 'grey' : themes.blue2}
            icon={
              <Ionicons
                style={{ fontSize: 30 }}
                name="enter-outline"
                color="white"
              />
            }
          />
          {/*break out icon */}
          <IconButton
            onPress={breakOutLogic}
            disabled={!hrStore.isBreakedOut}
            mb="4"
            variant="solid"
            borderRadius="full"
            bg={!hrStore.isBreakedOut ? 'grey' : themes.blue2}
            icon={
              <MaterialCommunityIcons name={'coffee'} size={30} color="white" />
            }
          />
          {/*break in icon */}
          <IconButton
            onPress={breakInLogic}
            disabled={!hrStore.isBreakedIn}
            mb="4"
            variant="solid"
            borderRadius="full"
            bg={!hrStore.isBreakedIn ? 'grey' : themes.blue2}
            icon={
              <Ionicons
                style={{ fontSize: 30 }}
                name="enter-outline"
                color="white"
              />
            }
          />
          <IconButton
            onPress={onAuthenticateCheckOut}
            disabled={!hrStore.isCheckedOut}
            mb="4"
            variant="solid"
            // bg="yellow.400"
            // colorScheme="yellow"
            borderRadius="full"
            bg={!hrStore.isCheckedOut ? 'grey' : themes.red}
            colorScheme={!hrStore.isCheckedOut ? '#065f46' : '#6ee7b7'}
            icon={
              <Ionicons
                style={{ fontSize: 30 }}
                name="exit-outline"
                color="white"
              />
            }
          />
          <IconButton
            onPress={() => setIsModalVisible(true)}
            mb="4"
            variant="solid"
            bg="teal.400"
            colorScheme="teal"
            borderRadius="full"
            icon={
              <Ionicons
                style={{ fontSize: 30 }}
                name="ios-walk-outline"
                color="white"
              />
            }
          />
          {/*<IconButton*/}
          {/*  onPress={() => setShowMissingPunchDialog(true)}*/}
          {/*  mb="4"*/}
          {/*  variant="solid"*/}
          {/*  bg="red.500"*/}
          {/*  colorScheme="red"*/}
          {/*  borderRadius="full"*/}
          {/*  icon={*/}
          {/*    <Ionicons*/}
          {/*      style={{ fontSize: 30 }}*/}
          {/*      name="md-add-outline"*/}
          {/*      color="white"*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
        </Stagger>
      </Box>
      <HStack alignItems="center">
        <IconButton
          variant="solid"
          borderRadius="full"
          size="lg"
          onPress={onToggle}
          bg="cyan.400"
          icon={
            <Icon
              as={MaterialCommunityIcons}
              size="6"
              name="dots-horizontal"
              color="warmGray.50"
              _dark={{
                color: 'warmGray.50',
              }}
            />
          }
        />
      </HStack>
      <NewLeaveRequest
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
      <NewMissingPunchRequestModal
        showMissingPunchDialog={showMissingPunchDialog}
        setShowMissingPunchDialog={setShowMissingPunchDialog}
        timeAttendanceData={timeAttendanceData2}
        // employeeData={employeeData}
      />
    </Center>
  );
};

export default MyHrQuickActions;
function haversine(lat1, lon1, lat2, lon2) {
  // distance between latitudes
  // and longitudes
  let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
  let dLon = ((lon2 - lon1) * Math.PI) / 180.0;

  // convert to radiansa
  lat1 = (lat1 * Math.PI) / 180.0;
  lat2 = (lat2 * Math.PI) / 180.0;

  // apply formulae
  let a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  let rad = 6377.830272;
  let c = 2 * Math.asin(Math.sqrt(a));
  return rad * c;
}

import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tomorrowDate } from '../util/dateFormatting';
import axios from 'axios';
import EmployeeLeaveRequests from '../components/cards/employeeLeaveRequests';
import BusinessLeaveForm from '../components/forms/BusinessLeaveForm';
import { getLeaveRequestService } from '../util/http';
import EmployeeLeaveRequestsCard from '../components/refactor/cards/EmployeeLeaveRequestsCard';
/////
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { useFocusEffect } from '@react-navigation/native';
import { Box, Heading } from 'native-base';
const LOCATION_TRACKING = 'location-tracking';
//////
const { requestBuilder } = require('../../../requestBuilder');

const LeaveScreen = () => {
  const [pendingRequestsForEmployee, setPendingRequestsForEmployee] = useState(
    []
  );
  const [noRequestsMessage, setNoRequestsMessage] = useState('');
  const [allLeaveRequestsDataForEmployee, setAllLeaveRequestsDataForEmployee] =
    useState([]);
  const [acceptedrejectedRequests, setAcceptedrejectedRequests] = useState([]);
  const [employeeRequestsStatusCompo, setEmployeeRequestsStatusCompo] =
    useState(false);
  const [requestComponentStatus, setRequestComponentStatus] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [leaveRequestsData, setLeaveRequestsData] = useState(null);
  const [locationData, setLocationData] = useState([]);

  const hrStore = useSelector((state) => state.hrStore);
  const AuthStore = useSelector((state) => state.AuthStore);
  const dispatch = useDispatch();

  /////////////////////////////////////
  useEffect(() => {
    const config = async () => {
      let res1 = await Location.requestForegroundPermissionsAsync();
      let res2 = await Location.requestBackgroundPermissionsAsync();

      if (res1.status !== 'granted' && res2.status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        console.log('Permission to access location granted');
      }
    };

    config();
  }, []);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     async function watchPos(params) {
  //       await Location.watchPositionAsync(
  //         {
  //           accuracy: Location.Accuracy.BestForNavigation,
  //           distanceInterval: 0,
  //           timeInterval: 1000 * 60,
  //         },
  //         async (location) => {
  //           let status = '';
  //
  //           let lat1 = location.coords.latitude;
  //           let lon1 = location.coords.longitude;
  //           let lat2 = 31.9713089;
  //           let lon2 = 35.8350942;
  //
  //           let distance = haversine(lat1, lon1, lat2, lon2);
  //           if (distance * 1000 <= 5) {
  //             status = 'in building';
  //           } else {
  //             status = 'out building';
  //           }
  //
  //           // await axios
  //           //   .post(
  //           //     "https://20wvd.mocklab.io/thing/8",
  //           //     `from watch // ${status} // ${new Date(
  //           //       Date.now()
  //           //     ).toLocaleString()}: ${lat1},${lon1} `
  //           //   )
  //           //   .then((res) => console.log(res?.data));
  //         }
  //       ).then((loc) => {
  //         setLocationData(locationData.push(loc));
  //       });
  //     }
  //     watchPos();
  //   }, [])
  // );
  // useFocusEffect(
  //   React.useCallback(() => {
  //     async function BackgroundPos(params) {
  //       const hasStarted = await BackgroundFetch.getStatusAsync();
  //
  //       if (hasStarted === 3) {
  //         try {
  //           await BackgroundFetch.registerTaskAsync(LOCATION_TRACKING, {
  //             minimumInterval: 60,
  //             stopOnTerminate: false,
  //             startOnBoot: true,
  //           });
  //         } catch (err) {
  //           console.log('Task Register failed:', err);
  //         }
  //       }
  //     }
  //
  //     BackgroundPos();
  //   }, [])
  // );

  /////////////////////////////////
  // useEffect(() => {
  //   try {
  //     let response = async () => {
  //       const data = requestBuilder('/hr/getAllEmployees', {
  //         uuid: 'c843d756-84a6-4643-95ba-0e6620dc6202',
  //       });
  //       const json = data.data;
  //       setEmployeeData(json[0]);
  //       // setRequestComponentStatus(true);
  //       return json;
  //     };
  //     response();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  useEffect(() => {
    try {
      let response = async () => {
        const data = await getLeaveRequestService({
          limit: 0,
          offset: 0,
          arrayId: [hrStore.employeeId],
          leaveTypeId: null,
          subLeaveType: null,
          leaveStatus: null,
        });
        const json = data?.row?.leaves || [];
        let arr1 = json.filter((element) => element.status.id == 1);
        let arr3 = json.filter(
          (element) =>
            element.status.name.en == 'Accepted' || element.status.id == 3
        );
        let arr2 = json.filter(
          (element) => element.status.name.en == 'Pending'
        );
        setAllLeaveRequestsDataForEmployee(arr1.length > 0 ? arr1 : null);
        setPendingRequestsForEmployee(arr2.length > 0 ? arr2 : null);
        setAcceptedrejectedRequests(arr3.length > 0 ? arr3.slice(0, 6) : null);
        if (arr1.length > 0 || arr2.length > 0 || arr3.length > 0) {
          setNoRequestsMessage('filled');
          setEmployeeRequestsStatusCompo(true);
        } else {
          setNoRequestsMessage('no requests yet');
          setEmployeeRequestsStatusCompo(true);
        }

        return json;
      };
      response();
    } catch (error) {
      console.log(error);
    }
  }, [hrStore.employeeId]);

  return (
    <Box bg={'#f0f0f0'} flex={1} p={2}>
      <Heading p={4} size={'lg'}>
        Leaves
      </Heading>
      <EmployeeLeaveRequestsCard
        leaveRequestsData={leaveRequestsData}
        allLeaveRequestsDataForEmployee={allLeaveRequestsDataForEmployee}
        acceptedrejectedRequests={acceptedrejectedRequests}
        pendingRequestsForEmployee={pendingRequestsForEmployee}
      />
      {requestComponentStatus && (
        <BusinessLeaveForm employeeData={employeeData} />
      )}
    </Box>
  );
};

export default LeaveScreen;
// TaskManager.defineTask(LOCATION_TRACKING, async () => {
//   let status;
//   const location = await Location.getCurrentPositionAsync({
//     accuracy: Location.Accuracy.BestForNavigation,
//     timeInterval: 0,
//     distanceInterval: 0,
//   });
//
//   let lat1 = location.coords.latitude;
//   let lon1 = location.coords.longitude;
//   let lat2 = 31.9713089;
//   let lon2 = 35.8350942;
//
//   let distance = await haversine(lat1, lon1, lat2, lon2);
//   console.log(distance * 1000);
//   if (distance * 1000 <= 5) {
//     console.log('in building');
//     status = 'in building';
//   } else {
//     console.log('out building');
//     status = 'in building';
//   }
//   // await axios
//   //   .post(
//   //     "https://20wvd.mocklab.io/thing/8",
//   //     `from background // ${status} // ${new Date(
//   //       Date.now()
//   //     ).toLocaleString()}: ${lat1},${lon1} `
//   //   )
//   //   .then((res) => console.log(res?.data));
// });
//
// function haversine(lat1, lon1, lat2, lon2) {
//   // distance between latitudes
//   // and longitudes
//   let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
//   let dLon = ((lon2 - lon1) * Math.PI) / 180.0;
//
//   // convert to radiansa
//   lat1 = (lat1 * Math.PI) / 180.0;
//   lat2 = (lat2 * Math.PI) / 180.0;
//
//   // apply formulae
//   let a =
//     Math.pow(Math.sin(dLat / 2), 2) +
//     Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
//   let rad = 6377.830272;
//   let c = 2 * Math.asin(Math.sqrt(a));
//   return rad * c;
// }

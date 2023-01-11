import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import requestBuilder from '../../../requestBuilder';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { StyleSheet, View, RefreshControl, SafeAreaView } from 'react-native';
import { ScrollView, Center } from 'native-base';
import { getTimeAttendanceDataService } from '../util/http';
import MyHrQuickAction from '../components/shared/MyHrQuickActions';

import ActualWorkingHoursForEmployee from '../components/charts/ActualWorkingHoursForEmployee';

function MyHr() {
  const dispatch = useDispatch();
  const hrStore = useSelector((state) => state.hrStore);
  const route = useRoute();
  const [componentReady, setComponentReady] = useState(false);
  const [timeAttendanceData2, setTimeAttendanceData2] = useState();

  const [myHrQuickActionStatus, setMyHrQuickActionStatus] = useState(false);

  const [employeeData, setEmployeeData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  ////////////////////////////////////////
  ///functions
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   let response = async () => {
  //     const json = await httpRequest('/getAllTimeAttendance', {
  //       providerUuid: 'c843d756-84a6-4643-95ba-0e6620dc6202',
  //       date: null,
  //       type: 'historyAttendanceForEmployee',
  //     });
  //     setTimeAttendanceData2(json);
  //   };
  //   response();
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      try {
        // let response = async () => {
        //   const json = await httpRequest('/getAllTimeAttendance', {
        //     providerUuid: 'c843d756-84a6-4643-95ba-0e6620dc6202',
        //     date: null,
        //     type: 'historyAttendanceForEmployee',
        //   });
        let response = async () => {
          const json = await getTimeAttendanceDataService({
            arrayId: ['HRS-HRP-JOR-c89d9ac1-087a-4f82-9e4e-34693d108151'],
          });

          setTimeAttendanceData2(json);

          // if (
          //   json[json.length - 1].checkOut === null &&
          //   json[json.length - 1].date === getFormattedDate(new Date()) &&
          //   json[json.length - 1].checkIn !== null
          // ) {
          //   dispatch(updateCheckOutFalse());
          //   dispatch(updateCheckInTrue());
          // }
          // let arr = [];
          // let firstArr = [];
          // let currentDate = getFormattedDate(new Date());
          // var dateOffset = 24 * 60 * 60 * 1000 * 30; //5 days
          // var myDate = new Date();
          // myDate.setTime(myDate.getTime() - dateOffset);
          // // let beforeThirtyDays = myDate.toISOString().slice(0, 10);
          // let date2 = new Date(),
          //   y = date2.getFullYear(),
          //   m = date2.getMonth();
          // let firstDay = new Date(y, m, 1);
          // let onlyDate = firstDay.toISOString().slice(0, 10);
          // ///////////////

          // json?.forEach((element) => {
          //   if (
          //     element.date >= onlyDate &&
          //     element.date < currentDate &&
          //     element.totalHoursPerDay != null &&
          //     (((element.status == 'out' ||
          //       element.statusForMissingPunsh == 'accepted') &&
          //       element.checkIn != null &&
          //       element.checkOut != null) ||
          //       (element.status == 'missing punch (both)' &&
          //         element.statusForMissingPunsh == 'accepted') ||
          //       (element.status == 'missing punch (checkIn)' &&
          //         element.statusForMissingPunsh == 'accepted') ||
          //       (element.status == 'missing punch (checkOut)' &&
          //         element.statusForMissingPunsh == 'accepted'))
          //   ) {
          //     arr.push({
          //       totalHours: element.totalHoursPerDay,
          //       date: element.date,
          //     });
          //   }
          // });
          // ////////////////divide into 4 arrays (4 weeks)
          // let week1 = [];
          // let week2 = [];
          // let week3 = [];
          // let week4 = [];
          // let allWeeks = [];
          // arr.forEach((element) => {
          //   if (
          //     element.date >= dateHelper(30) &&
          //     element.date <= dateHelper(23) &&
          //     element.date != currentDate
          //   ) {
          //     week1.push(element.totalHours);
          //   } else if (
          //     element.date >= dateHelper(22) &&
          //     element.date <= dateHelper(17) &&
          //     element.date != currentDate
          //   ) {
          //     week2.push(element.totalHours);
          //   } else if (
          //     element.date >= dateHelper(16) &&
          //     element.date <= dateHelper(9) &&
          //     element.date != currentDate
          //   ) {
          //     week3.push(element.totalHours);
          //   } else if (
          //     element.date >= dateHelper(8) &&
          //     element.date <= dateHelper(1) &&
          //     element.date != currentDate
          //   ) {
          //     week4.push(element.totalHours);
          //   }
          // });
          // allWeeks = [...allWeeks, week1, week2, week3, week4];

          // let allWeeksValid = [];
          // allWeeks.forEach((el) => {
          //   if (el.length >= 1) {
          //     allWeeksValid.push(el);
          //   }
          // });

          // ////////////////////
          // const res2 = [];
          // allWeeksValid.forEach((item) => {
          //   let sum = item
          //     .reduce((a, b) => parseFloat(a) + parseFloat(b))
          //     .toFixed(2);
          //   res2.push(sum);
          // });
          // firstArr = res2.slice(0, 4);
          // setTimeAttendanceData(firstArr);
          setComponentReady(true);
        };
        response();
      } catch (e) {
        console.log(e);
      }
    }, [])
  );
  useEffect(() => {
    try {
      let response = async () => {
        const data = await axios(
          requestBuilder('hr', '/getAllEmployees', 'post', {
            uuid: 'c843d756-84a6-4643-95ba-0e6620dc6202',
          })
        );
        const json = data.data;
        setEmployeeData(json[0]);
        return json;
      };
      response();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <SafeAreaView>
      <MyHrQuickAction
        myHrQuickActionStatus={myHrQuickActionStatus}
        setMyHrQuickActionStatus={setMyHrQuickActionStatus}
        employeeData={employeeData}
        employeeUuid={'c843d756-84a6-4643-95ba-0e6620dc6202'}
      />
      <ScrollView>
        <View>
          <Center>
            <ScrollView style={styles.card}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {componentReady && (
                  <ActualWorkingHoursForEmployee
                    timeAttendanceData={timeAttendanceData2}
                  />
                )}
              </ScrollView>
            </ScrollView>
          </Center>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
export default MyHr;

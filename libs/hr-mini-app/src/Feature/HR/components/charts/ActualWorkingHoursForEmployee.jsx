import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getFormattedDate } from '../../util/dateFormatting';
import { Text, Box, HStack, IconButton } from 'native-base';
import Icon from '@expo/vector-icons/FontAwesome';

import Title from '../shared/Title';
const ActualWorkingHoursForEmployee = ({ timeAttendanceData }) => {
  const dashboard = useSelector((state) => state.dashboard);

  const [percentageForMonthHours, setPercentageForMonthHours] = useState(0);
  const [actualWorkingHoursPerMonth, setActualWorkingHoursPerMonth] =
    useState(0);
  const [percentageForWeekHours, setPercentageForWeekHours] = useState(0);
  const [actualWorkingHoursPerWeek, setActualWorkingHoursPerWeek] = useState(0);
  const [percentageForTodayHours, setPercentageForTodayHours] = useState(0);
  const [actualWorkingHoursPerToday, setActualWorkingHoursPerToday] =
    useState(0);
  // const [rowIdForCheckIn, setRowIdForCheckIn] = useState();
  const navigation = useNavigation();
  ////////////////////////////////////
  ///render month fun.
  useEffect(() => {
    todayHours();
    workingHoursPerWeek();
    workingHoursPerMonth();
  }, [timeAttendanceData]);
  // ///render month fun.

  ///calculate today's hours for employee
  const todayHours = () => {
    try {
      let todayDate = getFormattedDate(new Date());
      let arrayForActualHoursChart = [];
      timeAttendanceData?.forEach((el) => {
        if (el.providerUuid == dashboard.providerId && el.date == todayDate) {
          arrayForActualHoursChart.push(el);
        }
      });

      let checkedInAt;
      if (arrayForActualHoursChart.length > 0) {
        let rowIdForCheckIn =
          arrayForActualHoursChart[arrayForActualHoursChart.length - 1];

        if (
          rowIdForCheckIn.checkIn != null &&
          rowIdForCheckIn.checkOut == null
        ) {
          checkedInAt = rowIdForCheckIn.checkIn;
        } else {
          checkedInAt = 0;
        }
      } else {
        checkedInAt = 0;
      }
      if (checkedInAt != 0 && checkedInAt !== undefined) {
        let time = new Date().toLocaleTimeString('en-GB', {
          // en-US can be set to 'default' to use user's browser settings
          hour: '2-digit',
          minute: '2-digit',
        });
        let findHours;

        if (time.length >= 5) {
          findHours = parseInt(time.slice(0, 2)) + time.slice(3, 5) / 60;
        } else {
          findHours = parseInt(time.slice(0, 1)) + time.slice(2, 4) / 60;
        }
        let checkedInHours =
          parseInt(checkedInAt.slice(0, 2)) + checkedInAt.slice(3, 5) / 60;

        setPercentageForTodayHours((findHours - checkedInHours) / 9);
        setActualWorkingHoursPerToday((findHours - checkedInHours).toFixed(1));
      } else {
        setPercentageForTodayHours(0);
        setActualWorkingHoursPerToday(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  ///calculate week's hours for employee
  const workingHoursPerWeek = () => {
    try {
      let curr = new Date(); // get current date
      let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
      let dayBefore = first - 1; // First day is the day of the month - the day of the week
      let last = first + 5; // last day is the first day + 6
      let firstday = new Date(curr.setDate(dayBefore));
      let lastday = new Date(curr.setDate(last));
      let actualFirst = firstday.toISOString().slice(0, 10);
      let actualSecond = lastday.toISOString().slice(0, 10);

      let checkedInAt = [];
      timeAttendanceData?.forEach((element) => {
        if (
          getFormattedDate(new Date(element.date)) >= actualFirst &&
          getFormattedDate(new Date(element.date)) < actualSecond &&
          getFormattedDate(new Date(element.date)) !==
            getFormattedDate(new Date()) &&
          element.totalHoursPerDay > 0
          //   ||
          // (element.date >= actualFirst &&
          //   element.date < actualSecond &&
          //   element.statusForMissingPunsh == 'accepted' &&
          //   element.checkIn != null &&
          //   element.checkOut != null)
        ) {
          checkedInAt.push(element.totalHoursPerDay);
        }
      });
      if (checkedInAt.length >= 1) {
        let sum = checkedInAt.reduce((a, b) => a + b);
        setPercentageForWeekHours(sum / 45);
        setActualWorkingHoursPerWeek(sum.toFixed(1));
      } else {
        setPercentageForWeekHours('0%');
        setActualWorkingHoursPerWeek(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  ///calculate month's hours for employee
  const workingHoursPerMonth = () => {
    try {
      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      let firstDay = new Date(y, m, 1);
      let onlyDate = firstDay.toISOString().slice(0, 10);

      let arr = [];
      timeAttendanceData?.forEach((item) => {
        if (
          item.date >= onlyDate &&
          item.date < getFormattedDate(new Date()) &&
          item.totalHoursPerDay > 0
          //  ||
          // (item.date >= onlyDate &&
          //   item.date < getFormattedDate(new Date()) &&
          //   item.statusForMissingPunsh == 'accepted' &&
          //   item.checkIn != null &&
          //   item.checkOut != null)
        ) {
          arr.push(item.totalHoursPerDay);
        }
      });
      if (arr.length > 0) {
        let sum = arr.reduce((a, b) => a + b);
        // console.log(sum);
        let finishedHours = sum.toFixed(1);
        setPercentageForMonthHours(finishedHours / 180);
        setActualWorkingHoursPerMonth(finishedHours);
      } else {
        setPercentageForMonthHours(0);
        setActualWorkingHoursPerMonth(0);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const goTimeHistory = () => {
    navigation.navigate('AttendanceHistoryForEmployee', {
      employeeUuid: dashboard.providerId,
    });
  };
  return (
    <View style={styles.gridItem}>
      <HStack space={10}>
        <Title style={styles.title}>Actual working hrs</Title>
        {/* <Button onPress={goTimeHistory}>Time Attendance History</Button> */}

        <IconButton
          bg={'#80CBC4'}
          shadow={9}
          w="35"
          h="35"
          variant="solid"
          borderRadius="full"
          size="sm"
          onPress={() => goTimeHistory()}
          icon={
            <Icon style={{ fontSize: 16, color: 'white' }} name="history" />
          }
        />
      </HStack>
      <Box mb={3}>
        <Text>Today</Text>
        <Text
          fontSize="xs"
          _light={{
            color: 'violet.500',
          }}
          _dark={{
            color: 'violet.400',
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          {actualWorkingHoursPerToday}/9
        </Text>
        {percentageForTodayHours && (
          <ProgressBar progress={percentageForTodayHours} color="red" />
        )}
      </Box>
      <Box mb={3}>
        <Text>Week</Text>
        <Text
          fontSize="xs"
          _light={{
            color: 'violet.500',
          }}
          _dark={{
            color: 'violet.400',
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          {actualWorkingHoursPerWeek}/45
        </Text>
        {percentageForWeekHours > 0 && (
          <ProgressBar progress={percentageForWeekHours} color="red" />
        )}
      </Box>
      <Box>
        <Text>Month</Text>
        <Text
          fontSize="xs"
          _light={{
            color: 'violet.500',
          }}
          _dark={{
            color: 'violet.400',
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          {actualWorkingHoursPerMonth}/180
        </Text>
        {percentageForMonthHours > 0 && (
          <ProgressBar progress={percentageForMonthHours} color="red" />
        )}
      </Box>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  gridItem: {
    flex: 1,
    margin: 16,
    maxHeight: 300,
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
});
export default ActualWorkingHoursForEmployee;

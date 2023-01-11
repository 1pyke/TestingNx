import React, { useEffect, useState } from 'react';
import { BarChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimeAttendance } from '../../store-Hr';
import Card from '../shared/Card';
import Title from '../shared/Title';
import { View, StyleSheet, Dimensions } from 'react-native';
const EmployeeHoursPerWeek = ({ timeAttendanceData }) => {
  const dispatch = useDispatch();
  const hrStore = useSelector((state) => state.hrStore);

  let dataChar2 = {
    labels: ['Week1', 'Week2', 'Week3', 'Week4'],
    datasets: [
      {
        data: timeAttendanceData,
      },
    ],
  };

  return (
    <View style={styles.gridItem}>
      <Title style={styles.title}>Avg workinh hrs/week</Title>
      <BarChart
        withVerticalLabels={true}
        showBarTops={true}
        data={dataChar2}
        width={Dimensions.get('window').width - 70}
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={9}
        chartConfig={{
          decimalPlaces: 0,

          backgroundColor: '#10b981',
          backgroundGradientFrom: '#d1fae5',
          backgroundGradientTo: '#6ee7b7',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          borderRadius: 16,
          margin: 12,
          padding: 5,
        }}
        accessor="population"
        absolute //for the absolute number remove if you want percentage
      />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  gridItem: {
    flex: 1,
    margin: 16,
    maxHeight: 400,
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
export default EmployeeHoursPerWeek;

import React from 'react';
import { View } from 'react-native';
import { Center } from 'native-base';

const BarThreeD = () => {
  const barData = [
    {
      value: 230,
      label: 'أسنان',
      frontColor: '#4ABFF4',
      sideColor: '#23A7F3',
      topColor: '#92e6f6',
    },
    {
      value: 180,
      label: 'جلدية',
      frontColor: '#79C3DB',
      sideColor: '#68BCD7',
      topColor: '#9FD4E5',
    },
    {
      value: 195,
      label: 'اطفال',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
    },
    {
      value: 250,
      label: 'تجميل',
      frontColor: '#4ADDBA',
      sideColor: '#36D9B2',
      topColor: '#7DE7CE',
    },
    {
      value: 320,
      label: 'باطنية',
      frontColor: '#91E3E3',
      sideColor: '#85E0E0',
      topColor: '#B0EAEB',
    },
  ];
  return (
    <View>
      <View style={{ marginLeft: 20, marginBottom: 100 }}>
        {/* <BarChart
        showFractionalValue
        showYAxisIndices
        hideRules
        noOfSections={4}
        maxValue={400}
        data={barData}
        barWidth={40}
        sideWidth={15}
        isThreeD
        side="right"
      /> */}
      </View>
    </View>
  );
};

export default BarThreeD;

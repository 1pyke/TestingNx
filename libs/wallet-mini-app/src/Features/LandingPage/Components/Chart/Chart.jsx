import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const Chart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const chartConfig = {
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };
  const screenWidth = Dimensions.get('window').width - 16;
  return (
    <BarChart
      data={data}
      width={screenWidth}
      height={220}
      yAxisLabel={'Rs'}
      chartConfig={chartConfig}
      style={graphStyle}
    />
  );
};

export default Chart;

const graphStyle = {
  marginVertical: 8,
  borderRadius: 16,
};

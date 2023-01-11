import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Tasks = ({ navigation }) => {
  return (
    <View style={{ height: '16%' }}>
      <TouchableOpacity
        width={'40%'}
        onPress={() => {
          navigation.navigate('TasksCharts');
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            height: '20%',
          }}
        >
          <View
            style={{
              height: 120,
              justifyContent: 'center',
              width: '90%',
              paddingTop: 10,
              backgroundColor: '#DBECF4',
              borderRadius: Platform.OS === 'ios' ? '10%' : 0,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: '#5F84A2',
                fontWeight: '400',
                marginLeft: '10%',
                marginTop: Platform.OS === 'ios' ? '10%' : 0,
              }}
            >
              My Tasks For Today{' '}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: '300',
                color: 'gray',
                marginLeft: '15%',
                marginTop: '2%',
                marginBottom: Platform.OS === 'ios' ? '10%' : 0,
              }}
            >
              New 5 tasks of 9{' '}
            </Text>
          </View>
          {/* <TouchableOpacity
                  width={'40%'}
                  onPress={() => {
                    navigation.navigate('TasksCharts');
                  }}
                  style={{
                    marginRight: '7%',
                    color: 'teal',
                    height: Platform.OS === 'ios' ? 100 : 50,
                  }}
                >
                  <     
                    radius={41}
                    value={5}
                    delay={1000}
                    maxValue={10}
                    progressValueColor={'#00796B'}
                    titleColor={'white'}
                    activeStrokeColor={'#00796B'}
                    strokeColorConfig={[
                      { color: '#00796B', value: 0 },
                      { color: 'skyblue', value: 4 },
                      { color: 'yellowgreen', value: 8 },
                      { color: 'red', value: 10 },
                    ]}
                  /> */}
          {/* {carouselItems.length - 1} */}
          {/* </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({});

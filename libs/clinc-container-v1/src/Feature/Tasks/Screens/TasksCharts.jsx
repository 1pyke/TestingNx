import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { ProgressChart, PieChart } from 'react-native-chart-kit';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskas } from '../store-tasks';
import { requestBuilder } from '../../../requestBuilder';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const MyPieChart = ({ values }) => {
  return (
    <>
      <Text style={style.header}>Total Tasks Priority</Text>
      <PieChart
        data={[
          {
            name: 'Low',
            population: values.low,
            color: 'yellow',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'Meduim',
            population: values.med,
            color: 'orange',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: 'High',
            population: values.hi,
            color: 'red',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
        ]}
        width={Dimensions.get('window').width}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 4,
          borderRadius: 16,
          marginLeft: '9%',
        }}
        accessor="population"
        paddingLeft="15"
        absolute //for the absolute number remove if you want percentage
      />
    </>
  );
};

const MyProgressChart = ({ values }) => {
  const data = {
    labels: Object.keys(values) || [],
    data: Object.values(values) || [],
  };
  let x = 0;
  return (
    <>
      <Text style={style.header}>Tasks Status</Text>
      <ProgressChart
        data={data}
        width={Dimensions.get('window').width + 10}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => {
            if (x == 14) x = 0;
            x += 1;
            switch (x) {
              case 1:
                return `rgba(138, 63, 252,${opacity})`;

              case 2:
                return `rgba(36, 161, 72,${opacity})`;

              case 3:
                return `rgba(241, 194, 27,${opacity})`;

              case 4:
                return `rgba(8, 189, 186,${opacity})`;

              default:
                return `rgba(0,0,0,${opacity})`;
            }
          },
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 4,
          borderRadius: 16,
          marginLeft: '-5%',
        }}
      />
    </>
  );
};

export default function TasksCharts({ navigation }) {
  const dispatch = useDispatch();
  const [priority, setpriority] = useState({ low: 0, med: 0, hi: 0 });
  const [status, setstatus] = useState({
    New: 0,
    onhold: 0,
    progress: 0,
    completed: 0,
  });

  const state = useSelector((state) => {
    return {
      token: state.tasks.token,
      // user_id: state.tasks.user_id,
      // user_name: state.tasks.user_name,
      user_id: state.dashboard.userToken.userId,
      user_name: `${state.dashboard.userToken.firstName} ${state.dashboard.userToken.lastName}`,
      tasks: state.tasks.tasks,
      userToken: state.dashboard.userToken,
    };
  });

  useFocusEffect(
    React.useCallback(() => {
      if (state.user_id) {
        getAssigned();
        let low = 0,
          med = 0,
          hi = 0,
          New = 0,
          onhold = 0,
          progress = 0,
          completed = 0;
        state.tasks.map((task) => {
          switch (task.priority) {
            case 1:
              low += 1;
              break;
            case 2:
              med += 1;
              break;
            case 3:
              hi += 1;
              break;
          }
          switch (task.status) {
            case 'New':
              New += 1;
              break;
            case 'onhold':
              onhold += 1;
              break;
            case 'progress':
              progress += 1;
              break;
            case 'completed':
              completed += 1;
              break;
          }
        });
        setpriority({
          low,
          med,
          hi,
        });
        setstatus({
          New: New && Math.trunc((New / state.tasks.length) * 10) / 10,
          onhold: onhold && Math.trunc((onhold / state.tasks.length) * 10) / 10,
          progress:
            progress && Math.trunc((progress / state.tasks.length) * 10) / 10,
          completed:
            completed && Math.trunc((completed / state.tasks.length) * 10) / 10,
        });
      }
    }, [state.tasks])
  );
  //   useEffect(() => {
  //     dispatch(getAllTasks());
  //     //   dispatch(getTodayTasks());
  //     //   dispatch(getTomorrowTasks());
  //     //   dispatch(getThisWeek());
  //     //   dispatch(getLastWeek());
  //   }, []);

  const getAssigned = async () => {
    try {
      // let data = await axios({
      //   method: 'POST',
      //   url: 'https://api.development.agentsoncloud.com/external/public/',
      //   headers: {
      //     'requsted-service': 'tasks',
      //     'requsted-path': '/tasks/assignedToMe/:id',
      //     'requsted-method': 'get',
      //   },
      //   data: {
      //     id: state.user_id,
      //   },
      // });
      const data = await axios(
        requestBuilder('tasks', '/tasks/assignedToMe/:id', 'get', {
          id: state.user_id,
        })
      );
      data.data.forEach((element) => {
        element.created =
          element.created_date.split('-').reverse().join('-') +
          ' at ' +
          element.created_time;
        element.deadline =
          element.due_date.split('-').reverse().join('-') +
          ' at ' +
          element.due_time;
      });
      dispatch(getTaskas(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={{ marginBottom: '30%' }}>
        <View>
          <TouchableOpacity
            style={style.tabView}
            onPress={() => navigation.navigate('TasksLandingPage')}
          >
            <View style={style.tab}>
              <Text style={style.tabText}> Tasks </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={style.pie}>
          <View style={style.countCont}>
            <View style={style.count}>
              <Text style={{ textAlign: 'center', fontSize: 22 }}>
                {state.tasks.length} tasks
              </Text>
              <Text style={{ textAlign: 'center' }}>Assigned</Text>
            </View>
          </View>
          {state.tasks && <MyPieChart values={priority} />}
        </View>
        <View>{state.tasks && <MyProgressChart values={status} />}</View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 15,
    marginTop: '10%',
    marginBottom: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
  },
  pie: {
    position: 'relative',
    marginTop: '-5%',
  },
  countCont: {
    width: '100%',
    height: 140,
    position: 'absolute',
    top: '36.5%',
    borderRadius: 100,
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  count: {
    width: 140,
    height: 140,
    position: 'absolute',
    right: '43%',
    borderRadius: 100,
    backgroundColor: 'white',
    zIndex: 1,
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
  },

  tabView: {
    marginHorizontal: 120,
    marginVertical: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#04b9a7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#04b9a7',
  },
  tabText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});

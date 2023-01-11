import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  LogBox,
  Modal,
  Pressable,
  Alert,
  Switch,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Icon from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { requestBuilder } from '../../../requestBuilder';

DropDownPicker.setMode('BADGE');

export default function CreateTask({ navigation }) {
  const [open, setOpen] = useState(false);
  const [selctedUsers, setSelctedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [descreption, setDescreption] = useState('');
  const [activePriority, setActivePriority] = useState(3);
  const [due_date, setDue_date] = useState('');
  const [due_time, setDue_time] = useState('');
  const [assigned, setAssigned] = useState([]);
  const [claimed, setClaimed] = useState(true);
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');

  ////////
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
  ///////

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getUsers();
  }, []);

  useEffect(() => {
    const arr = [];
    selctedUsers.forEach((element) => {
      const user = users.find((ele) => {
        return element === ele.user_id;
      });
      arr.push(user);
    });
    setAssigned(arr);
  }, [selctedUsers]);

  const getUsers = async () => {
    try {
      // const res = await axios.get(
      //   'https://62207663ce99a7de195a41c3.mockapi.io/users/users'
      // );
      const res = await axios(requestBuilder('ciam', '/v1/users', 'get'));
      const arr = [];
      res.data.forEach((ele) => {
        arr.push({
          user_id: ele.userId,
          user_name: `${ele.firstName} ${ele.lastName}`,
        });
      });
      setUsers(arr);
    } catch (error) {
      console.log('ciam error', error);
    }
  };

  //////////////////////// date and time picker //////////////////

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1 + '';
    if (month.length === 1) month = '0' + month;
    let day = currentDate.getDate() + '';
    if (day.length === 1) day = '0' + day;
    setDue_date(year + '-' + month + '-' + day);
    setDate(currentDate);
  };
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    let hourS = currentDate.getHours() + '';
    if (hourS.length === 1) hourS = '0' + hourS;
    let minutes = currentDate.getMinutes() + '';
    if (minutes.length === 1) minutes = '0' + minutes;
    setDue_time(hourS + ':' + minutes);
    setDate(currentDate);
  };

  const showDate = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      minimumDate: new Date(),
    });
  };

  const showTime = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeTime,
      mode: 'time',
      is24Hour: false,
    });
  };

  ///////////////////////////////////////////////////
  ///////// handle inpust text ///////////////////////

  const changeSubject = (str) => {
    setSubject(str);
  };

  const changeDescreption = (str) => {
    setDescreption(str);
  };

  const changeHour = (num) => {
    // if (num.length == 1) setHour('0' + num);
    setHour(num);
  };
  const changeMinutes = (num) => {
    // if (num.length == 1) setMinutes('0' + num);
    setMinutes(num);
  };

  ///////////////////// restPage ///////////////////////////////
  const restPage = () => {
    setSubject('');
    setDescreption('');
    setActivePriority(3);
    setDue_date('');
    setDue_time('');
    setHour('');
    setMinutes('');
    setSelctedUsers([]);
    setAssigned([]);
  };

  ///////////////////// create task  //////////////////////////

  const createTask = async () => {
    try {
      if (
        !subject.trim() ||
        !descreption.trim() ||
        !due_date ||
        !due_time ||
        hour == '' ||
        minutes == ''
      ) {
        Alert.alert(
          'Please Fill All Inputs',
          'Please fill all inputs before click on this button',
          [
            {
              text: 'Understood',
              style: 'submit',
            },
          ],
          { cancelable: true }
        );
        return;
      }
      if (!claimed && selctedUsers.length === 0) {
        Alert.alert(
          'Please Assinge one user at least',
          `When you choose not claimed (not general) task. you must assigne one user at least`,
          [
            {
              text: 'Understood',
              style: 'submit',
            },
          ],
          { cancelable: true }
        );
        return;
      }
      ///////////////// create task here ////////////////////
      let today = new Date();
      let created_date = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      let createdHour =
        today.getHours() + ''.length == 1
          ? '0' + today.getHours()
          : today.getHours() + '';
      let min = today.getMinutes() + '';
      if (min.length === 1) min = '0' + min;
      let created_time = createdHour + ':' + min;

      let estimated_time, hh, mm;
      if (hour.length === 1) hh = '0' + hour;
      else hh = hour;
      if (minutes.length === 1) mm = '0' + minutes;
      else mm = minutes;
      estimated_time = hh + ':' + mm;

      const newTask = {
        creator: state.user_id,
        creator_name: state.user_name,
        subject: subject,
        description: descreption,
        status: 'New',
        claimed: claimed,
        priority: activePriority,
        created_date,
        created_time,
        due_date: due_date,
        due_time: due_time,
        estimated_time,
        work_status: 'created',
        attachment: '',
        refrenced: '',
      };

      const users_id = [];
      assigned.forEach((element) => {
        users_id.push({ id: element.user_id, name: element.user_name });
      });
      if (claimed) {
        console.log(users_id);
        // const res = await axios.post('http://10.0.2.2:30122/tasks', newTask);
        const res = await axios(
          requestBuilder('tasks', '/tasks', 'post', {
            ...newTask,
          })
        );
        if (res.status) {
          // const as = await axios.post(
          //   'http://10.0.2.2:30122/tasks/task/assigneUser',
          //   { task_id: res.data.task_id, user_id: users_id }
          // );
          const as = await axios(
            requestBuilder('tasks', '/tasks/task/assigneUser', 'post', {
              id: state.user_id,
              task_id: res.data.task_id,
              user_id: users_id,
            })
          );
        }
      } else {
        users_id.forEach(async (ele) => {
          // const res = await axios.post('http://10.0.2.2:30122/tasks', newTask);
          const res = await axios(
            requestBuilder('tasks', '/tasks', 'post', newTask)
          );
          if (res.status) {
            // const as = await axios.post(
            //   'http://10.0.2.2:30122/tasks/task/assigneUser',
            //   { task_id: res.data.task_id, user_id: [ele] }
            // );
            const as = await axios(
              requestBuilder('tasks', '/tasks/task/assigneUser', 'post', {
                task_id: res.data.task_id,
                user_id: [ele],
              })
            );
          }
        });
      }

      Alert.alert(
        'Created Successfully',
        `Your Task (${newTask.subject}) was Created Successfully`,
        [
          {
            text: 'Create another task',
            onPress: restPage,
            style: 'cancel',
          },
          {
            text: 'Go Home',
            onPress: () => navigation.navigate('TasksLandingPage'),
          },
        ]
      );
    } catch (error) {
      console.log('error');
    }
  };

  ///////////////////////////////////////////////////////////////////

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={style.container}>
          <View>
            <View style={style.subject}>
              <Text style={style.titleText}>Subject :</Text>
              <TextInput
                style={style.subjectInput}
                placeholder="enter task subject"
                onChangeText={changeSubject}
                value={subject}
              />
            </View>
            <View style={style.subject}>
              <Text style={style.titleText}>Description :</Text>
              <TextInput
                style={style.decsInput}
                placeholder="enter task subject"
                multiline={true}
                numberOfLines={3}
                onChangeText={changeDescreption}
                value={descreption}
              />
            </View>
            <View style={style.priority_con}>
              <Text style={style.titleText}> Priority : </Text>
              <View style={style.tabs}>
                <TouchableOpacity
                  style={
                    activePriority === 3
                      ? [style.tabView, style.acitve]
                      : style.tabView
                  }
                  onPress={() => {
                    setActivePriority(3);
                  }}
                >
                  <View>
                    <Text
                      style={
                        activePriority === 3
                          ? [style.tabText, style.activeText]
                          : style.tabText
                      }
                    >
                      Low
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    activePriority === 2
                      ? [style.tabView, style.acitve]
                      : style.tabView
                  }
                  onPress={() => {
                    setActivePriority(2);
                  }}
                >
                  <View>
                    <Text
                      style={
                        activePriority === 2
                          ? [style.tabText, style.activeText]
                          : style.tabText
                      }
                    >
                      Meduim
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    activePriority === 1
                      ? [style.tabView, style.acitve]
                      : style.tabView
                  }
                  onPress={() => {
                    setActivePriority(1);
                  }}
                >
                  <View>
                    <Text
                      style={
                        activePriority === 1
                          ? [style.tabText, style.activeText]
                          : style.tabText
                      }
                    >
                      High
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.checkboxContainer}>
              <Text style={style.titleText}>Claimed</Text>
              {/* <CheckBox value={claimed} onValueChange={setClaimed} /> */}
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={claimed ? '#1867c0' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={setClaimed}
                value={claimed}
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
              />
            </View>
            <View style={style.due_date_con}>
              <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={style.titleText}>Due Date :</Text>
              </View>
              <View style={style.create_val}>
                <View>
                  <Text style={style.create_text_val}> {due_date} </Text>
                </View>
                <Icon
                  name="calendar"
                  size={30}
                  color="#2a416a"
                  onPress={showDate}
                />
              </View>
            </View>
            <View style={style.due_date_con}>
              <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={style.titleText}>Due Time :</Text>
              </View>
              <View style={style.create_val}>
                <View>
                  <Text style={style.create_text_val}> {due_time} </Text>
                </View>
                <Icon
                  name="clock-o"
                  size={30}
                  color="#2a416a"
                  onPress={showTime}
                />
              </View>
            </View>
            <View>
              {/*  ///////////////////////////////////////////// */}
              <View style={style.estimated_time_con}>
                <Text style={style.estimated_timeText}>Estimated time :</Text>
                <View style={style.estimated_time}>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="HH"
                    style={{ width: '45%' }}
                    value={hour}
                    onChangeText={changeHour}
                  />
                  <TextInput
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="MM"
                    style={{ width: '45%' }}
                    value={minutes}
                    onChangeText={changeMinutes}
                  />
                </View>
              </View>
            </View>
            <View style={style.assigne_con}>
              <View>
                <Text style={style.titleText}>Assine users</Text>
              </View>
              <View style={style.users}>
                {assigned.map((ele, i) => {
                  return (
                    <View key={i} style={style.oneUser}>
                      <Text style={style.oneUser_text}> {ele.user_name} </Text>
                    </View>
                  );
                })}
              </View>
              <View>
                <TouchableOpacity>
                  <Icon
                    name="plus"
                    size={30}
                    color="#2a416a"
                    onPress={() => setModalVisible(true)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={style.Add_button_con}>
            <Pressable style={style.button} onPress={createTask}>
              <Text style={style.textStyle}>Add New Task</Text>
            </Pressable>
          </View>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={style.centeredView2}>
            <View style={style.modalView}>
              <View style={style.button_con}>
                <Pressable
                  style={style.button}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={style.textStyle}>Save</Text>
                </Pressable>
              </View>
              <View style={style.assignedCon}>
                <View style={style.assignedPicker}>
                  <DropDownPicker
                    open={open}
                    value={selctedUsers}
                    items={users}
                    setOpen={setOpen}
                    setValue={setSelctedUsers}
                    setItems={setUsers}
                    multiple={true}
                    min={0}
                    schema={{
                      label: 'user_name',
                      value: 'user_id',
                    }}
                    placeholder="Select Users"
                    searchable={true}
                    searchPlaceholder="Search by user name"
                    badgeStyle={{
                      padding: 5,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}
                    badgeColors={['white']}
                    badgeDotColors={['red']}
                    badgeTextStyle={{
                      fontStyle: 'italic',
                      color: 'blue',
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 100,
  },
  titleText: {
    width: 90,
    fontSize: 15,
    color: '#2a416a',
  },
  subject: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  priority_con: {
    borderBottomWidth: 2,
    borderColor: '#eee',
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectInput: {
    width: '70%',
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
  },
  decsInput: {
    width: '70%',
    margin: 12,
    // borderWidth: 1,
    padding: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabView: {
    width: '25%',
    padding: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tabText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 13,
  },

  acitve: {
    backgroundColor: '#1867c0',
  },
  activeText: {
    color: 'white',
  },

  due_date_con: {
    marginTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  create_val: {
    width: '70%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  create_text_val: {
    width: 130,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  centeredView2: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  assigne_con: {
    marginTop: 25,
    minHeight: 20,
    paddingBottom: 10,
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  users: {
    width: '65%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  oneUser: {
    padding: 4,
    margin: 4,
    backgroundColor: '#1867c0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1867c0',
  },
  oneUser_text: {
    color: 'white',
    fontSize: 12,
  },
  modalView: {
    width: '100%',
    height: 550,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingTop: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button_con: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    backgroundColor: '#009688',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#009688',
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  assignedCon: {
    width: '100%',
    // flex: 1,
    marginTop: 15,
    paddingBottom: 20,
    height: 500,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  assignedPicker: {
    width: '90%',
  },
  assignedText: {
    fontSize: 15,
    color: '#2a416a',
  },
  Add_button_con: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 13,
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  claimed_text: {
    fontSize: 15,
    color: '#2a416a',
  },
  estimated_time_con: {
    marginTop: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 13,
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  estimated_time: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  estimated_timeText: {
    width: '35%',
    fontSize: 15,
    color: '#2a416a',
  },
});

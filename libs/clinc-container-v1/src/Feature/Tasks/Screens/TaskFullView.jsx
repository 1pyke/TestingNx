import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  LogBox,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteTask } from '../store-tasks';
import DropDownPicker from 'react-native-dropdown-picker';
import { Modal, Radio } from 'native-base';
import Icon from '@expo/vector-icons/FontAwesome';
import Comments from './Comments';
import axios from 'axios';
import { requestBuilder } from '../../../requestBuilder';

export default function TaskFullView({ route, navigation }) {
  const [task, setTask] = useState(null);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selctedUsers, setSelctedUsers] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [checked, setChecked] = useState('');
  const [seeMore, setSeeMore] = useState(false);

  const dispatch = useDispatch();
  let { task_id, type } = route.params;
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

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getTaskInfo();
    getAssignedUsers();
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

  const getTaskInfo = async () => {
    try {
      const res = await axios(
        requestBuilder('tasks', '/tasks/oneTask/:id', 'get', {
          id: task_id,
        })
      );
      setTask(res.data);
      setChecked(res.data.status);
    } catch (error) {
      console.log('getTaskInfo', error.message);
    }
  };
  const getAssignedUsers = async () => {
    try {
      // const res = await axios.get(
      //   `http://10.0.2.2:30122/tasks/task/assign/${task_id}`
      // );
      const res = await axios(
        requestBuilder('tasks', '/tasks/task/assign/:id', 'get', {
          id: task_id,
        })
      );
      setAssignedUsers(res.data);
      setAssigned(res.data);
      const arr = [];
      res.data.forEach((ele) => {
        arr.push(ele.user_id);
      });
      setSelctedUsers(arr);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUsers = async () => {
    try {
      // const res = await axios.get(
      //   'https://62207663ce99a7de195a41c3.mockapi.io/users/users'
      // );
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
      console.log(error);
    }
  };

  const claimeTask = async () => {
    try {
      // const res = await axios.put(
      //   `http://10.0.2.2:30122/tasks/task/claimme/${task_id}`,
      //   {
      //     userId: state.user_id,
      //     user_name: state.user_name,
      //   }
      // );
      const res = await axios(
        requestBuilder('tasks', '/tasks/task/claimme/:id', 'put', {
          id: task_id,
          userId: state.user_id,
          user_name: state.user_name,
        })
      );
      if (res.status === 200) {
        getTaskInfo();
        getAssignedUsers();
        navigation.navigate('TaskFullView', {
          task_id: task_id,
          type: 'assigned',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openDialogDeleteTask = () => {
    Alert.alert('Delete this task', `Do you want to delete this task ?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Yes', onPress: deleteTask },
    ]);
  };
  const deleteTask = async () => {
    try {
      // const res = await axios.delete(
      //   `http://10.0.2.2:30122/tasks/deleteTask/${task_id}`
      // );
      const res = await axios(
        requestBuilder('tasks', '/tasks/deleteTask/:id', 'delete', {
          id: task_id,
        })
      );
      if (res.status === 200) {
        dispatch(setDeleteTask(task_id));
        Alert.alert(`Task was deleted Successfully`, '', [
          {
            text: 'Go Home',
            onPress: () => navigation.navigate('TasksLandingPage'),
            style: 'cancel',
          },
        ]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const openStatusDialog = () => {
    setStatusModalVisible(true);
  };
  const changeStatus = async () => {
    // const res = await axios.put(
    //   `http://10.0.2.2:30122/tasks/task/changeStatus/${task_id}`,
    //   {
    //     newStatus: checked,
    //   }
    // );
    const res = await axios(
      requestBuilder('tasks', '/tasks/task/changeStatus/:id', 'put', {
        id: task_id,
        newStatus: checked,
      })
    );
    getTaskInfo();
    setStatusModalVisible(false);
  };

  const handleReassigne = async () => {
    try {
      setModalVisible(false);
      const users_id = [];
      assigned.forEach((element) => {
        users_id.push({ id: element.user_id, name: element.user_name });
      });
      if (task.claimed || (!task.claimed && users_id.length === 1)) {
        // const res = await axios.post(
        //   'http://10.0.2.2:30122/tasks/task/assigneUser',
        //   {
        //     task_id: task_id,
        //     user_id: users_id,
        //   }
        // );
        const res = await axios(
          requestBuilder('tasks', '/tasks/task/assigneUser', 'post', {
            task_id: task_id,
            user_id: users_id,
          })
        );
        if (res.status) {
          getAssignedUsers();
        }
      } else {
        const newTask = {
          creator: state.user_id,
          creator_name: state.user_name,
          subject: task.subject,
          description: task.description,
          status: 'New',
          claimed: task.claimed,
          priority: task.priority,
          created_date: task.created_date,
          created_time: task.created_time,
          due_date: task.due_date,
          due_time: task.due_time,
          estimated_time: task.estimated_time,
          work_status: 'created',
          attachment: task.attachment,
          refrenced: task.refrenced,
        };
        // const resData = await axios.get(
        //   `http://10.0.2.2:30122/tasks/task/assign/${task_id}`
        // );
        const resData = await axios(
          requestBuilder('tasks', '/tasks/task/assign/:id', 'get', {
            id: task_id,
          })
        );
        const oldAssignedUsers = [];
        resData.data.forEach((ele) => {
          oldAssignedUsers.push(ele.user_id);
        });

        let chick = false;
        users_id.forEach(async (ele) => {
          try {
            if (!oldAssignedUsers.includes(ele.id)) {
              // const res = await axios.post(
              //   'http://10.0.2.2:30122/tasks',
              //   newTask
              // );
              const res = await axios(
                requestBuilder('tasks', '/tasks', 'post', {
                  ...newTask,
                })
              );
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
            } else {
              chick = true;
              // await axios.post('http://10.0.2.2:30122/tasks/task/assigneUser', {
              //   task_id: task_id,
              //   user_id: [ele],
              // });
              await axios(
                requestBuilder('tasks', '/tasks/task/assigneUser', 'post', {
                  task_id: task_id,
                  user_id: [ele],
                })
              );
            }
            if (!chick) {
              // await axios.post(`http://10.0.2.2:30122/tasks/task/resetAssign`, {
              //   task_id: task_id,
              // });
              // await axios({
              //   method: 'POST',
              //   url: 'https://api.development.agentsoncloud.com/external/public/',
              //   headers: {
              //     'requsted-service': 'tasks',
              //     'requsted-path': '/tasks/task/resetAssign',
              //     'requsted-method': 'post',
              //   },
              //   data: {
              //     task_id: task_id,
              //   },
              // });
              await axios(
                requestBuilder('tasks', '/tasks/task/resetAssign', 'post', {
                  task_id: task_id,
                })
              );
            }
          } catch (error) {
            console.log('error handleReassigne in for ', error.message);
          }
        });
        getAssignedUsers();
      }
    } catch (error) {
      console.log('error handleReassigne ', error.message);
    }
  };

  function handleBackButtonClick() {
    setStatusModalVisible(false);
  }

  return (
    <ScrollView>
      {task ? (
        <View style={style.container}>
          <View style={style.headrs}>
            <Text style={style.subject_text}> {task?.subject} </Text>
            <View style={style.actions}>
              {type === 'general' ? (
                <TouchableOpacity style={style.claim_btn} onPress={claimeTask}>
                  <View>
                    <Text style={style.deleteText}> Claime </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
              {state.user_id === task.creator ? (
                <TouchableOpacity
                  style={style.delete_btn}
                  onPress={openDialogDeleteTask}
                >
                  <View>
                    <Text style={style.deleteText}> Delete </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          {/* -------------------------------- body ------------------------------------------------ */}

          <View style={style.body}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}
            >
              <View style={{ flexDirection: 'row', width: '48%' }}>
                <Text style={{ color: 'rgb(0, 0, 0)', fontSize: 15 }}>
                  By :{' '}
                </Text>
                <Text style={{ color: 'rgb(0, 0, 0)', fontSize: 15 }}>
                  {` ${task.creator_name}`}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', width: '51%' }}>
                <Text style={{ color: 'rgb(0, 0, 0)', fontSize: 13 }}>
                  Created at :
                </Text>
                <Text style={{ color: 'rgb(0, 0, 0)', fontSize: 13 }}>
                  {` ${task.created_date} at ${task.created_time}`}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}
            >
              <View style={{ flexDirection: 'row', width: '48%' }}>
                <Text style={{ color: 'rgb(0, 0, 0)', fontSize: 15 }}>
                  Priority :
                </Text>
                <Text
                  style={
                    task.priority === 1
                      ? style.high
                      : task.priority === 2
                      ? style.meduim
                      : style.low
                  }
                >
                  {task.priority === 1
                    ? '  High'
                    : task.priority === 2
                    ? '  Meduim'
                    : '  Low'}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', width: '51%' }}>
                <Text style={{ color: 'rgb(0, 0, 0)', fontSize: 13 }}>
                  Deadline :
                </Text>
                <Text style={{ color: 'rgb(0, 0, 0)', fontSize: 13 }}>
                  {` ${task.due_date} at ${task.due_time}`}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '48%',
                }}
              >
                <Text style={{ color: 'rgb(0, 0, 0)', fontSize: 15 }}>
                  Status :
                </Text>
                <Text
                  style={{
                    color: 'rgb(0, 0, 0)',
                    fontSize: 15,
                    marginRight: 5,
                  }}
                  onPress={openStatusDialog}
                >
                  {` ${task.status}`}
                </Text>
                <Icon
                  name="pencil"
                  size={15}
                  color="#009688"
                  onPress={openStatusDialog}
                />
              </View>
              <View style={{ flexDirection: 'row', width: '51%' }}>
                <Text style={{ color: 'rgb(0, 0, 0)', fontSize: 15 }}>
                  Activity status :
                </Text>
                <Text style={{ color: 'rgb(0, 0, 0)', fontSize: 15 }}>
                  {task.work_status}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: 20 }}>
              <Text
                style={{
                  color: 'rgb(0, 0, 0)',
                  fontSize: 16,
                  marginBottom: 15,
                }}
              >
                Description :
              </Text>
              {seeMore ? (
                <View>
                  <Text>
                    {task.description}
                    <Text
                      style={{ color: 'blue', fontWeight: 'bold' }}
                      onPress={() => {
                        setSeeMore(false);
                      }}
                    >
                      see less
                    </Text>
                  </Text>
                </View>
              ) : task.description.split(' ').length > 30 ? (
                <View>
                  <Text>
                    {task.description.split(' ').slice(0, 30).join(' ')}
                    <Text
                      style={{ color: 'blue', fontWeight: 'bold' }}
                      onPress={() => {
                        setSeeMore(true);
                      }}
                    >
                      see more
                    </Text>
                  </Text>
                </View>
              ) : (
                <Text>
                  {task.description.split(' ').slice(0, 30).join(' ')}
                </Text>
              )}
            </View>
          </View>
          {/* ---------------------------- assigned users  ---------------------------------------------------- */}

          <View style={style.assinee_con}>
            <View style={style.assigned_heades}>
              <Text style={style.assigned_text}>Assigned to :</Text>
              {state.user_id === task.creator ? (
                <TouchableOpacity
                  style={style.reassigne_btn}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                >
                  <View>
                    <Text style={style.reassigneText}> Reassigne </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={style.assigned_Con}>
              {assignedUsers.length ? (
                assignedUsers.map((ele, i) => {
                  return (
                    <View key={i} style={style.oneUser}>
                      <Text style={style.oneUser_text}> {ele.user_name} </Text>
                    </View>
                  );
                })
              ) : (
                <Text>There is no user assigned to this task</Text>
              )}
            </View>
          </View>

          {/* -------------------------------- comments  ------------------------------------------------ */}

          <View>
            <Comments
              navigation={navigation}
              id={task.task_id}
              type="task"
              taskCreator={task.creator}
              userId={state.user_id}
              userName={state.user_name}
            />
          </View>

          {/* --------------------------------- Modal ----------------------------------------------- */}
          <Modal
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
            _backdrop={{
              bg: 'coolGray.800',
            }}
            h="100%"
            {...style[
              {
                bottom: {
                  marginBottom: 0,
                  marginTop: 'auto',
                },
              }
            ]}
          >
            <View style={style.centeredView2}>
              <View style={style.modalView}>
                <View style={style.button_con}>
                  <Pressable style={style.button} onPress={handleReassigne}>
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
          <TouchableOpacity
            style={{ backgroundColor: 'red' }}
            Press={() => handleBackButtonClick()}
          >
            <Modal
              isOpen={statusModalVisible}
              onClose={() => setStatusModalVisible(false)}
              _backdrop={{
                bg: 'coolGray.800',
              }}
              w="100%"
              h="100%"
              {...style[
                {
                  bottom: {
                    marginBottom: 0,
                    marginTop: 'auto',
                  },
                }
              ]}
            >
              <View style={style.centeredView2}>
                <View style={style.modalViewStatus}>
                  <View style={style.button_con}>
                    <Pressable style={style.button} onPress={changeStatus}>
                      <Text style={style.textStyle}>Save</Text>
                    </Pressable>
                  </View>
                  <View style={{ padding: 15, paddingTop: 25 }}>
                    <Radio.Group
                      onChange={(value) => setChecked(value)}
                      value={checked}
                    >
                      <Radio
                        label="on hold"
                        value="on hold"
                        style={style.radio}
                      >
                        on hold
                      </Radio>
                      <Radio
                        label="progress"
                        value="progress"
                        style={style.radio}
                      >
                        progress
                      </Radio>
                      <Radio
                        label="completed"
                        value="completed"
                        style={style.radio}
                      >
                        completed
                      </Radio>
                    </Radio.Group>
                  </View>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    paddingBottom: '30%',
  },
  headrs: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  subject_text: {
    width: '50%',
    fontSize: 22,
    color: 'black',
  },
  actions: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  delete_btn: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#ff5252',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff5252',
  },
  claim_btn: {
    marginRight: 20,
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: '#2A416A',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2A416A',
  },
  deleteText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  /* ------------------------- body ------------------------------------- */

  body: {
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#eee',
  },

  high: {
    color: '#ff5252',
    fontSize: 15,
  },
  meduim: {
    color: '#fb8c00',
    fontSize: 15,
  },
  low: {
    color: '#4caf50',
    fontSize: 15,
  },

  /* -------------------------------------------------------------- */
  assinee_con: {
    marginTop: 25,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#eee',
  },

  reassigne_btn: {
    marginTop: 5,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 6,
    paddingLeft: 6,
    backgroundColor: '#2A416A',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2A416A',
  },
  reassigneText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
  assigned_heades: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  assigned_text: {
    width: '73%',
    fontSize: 18,
    color: 'black',
    margin: 4,
  },
  assigned_Con: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingHorizontal: 10,
  },
  oneUser: {
    padding: 5,
    margin: 4,
    backgroundColor: '#1867c0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1867c0',
  },
  oneUser_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  /* ---------------------------------------------------------- */
  centeredView2: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '100%',
    height: 380,
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
  modalViewStatus: {
    width: '100%',
    height: 280,
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
  radio: {
    margin: 5,
  },
});

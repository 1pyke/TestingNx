import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SaveModalHandler, closeStatusModal } from '../store-dashboard';
import { Modal, Radio } from 'native-base';
import { requestBuilder } from '../../../requestBuilder';
import axios from 'axios';

const App = () => {
  const dashboardStore = useSelector((state) => state.dashboard);
  const [checked, setChecked] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('xxxxxxxxxxxx', dashboardStore.taskStatus.task_id);
  }, [checked]);
  return (
    <View style={styles.centeredView}>
      <TouchableWithoutFeedback
        onPress={() =>
          !dashboardStore.statusModal && dispatch(SaveModalHandler())
        }
      >
        <Modal
          isOpen={dashboardStore.statusModal}
          onClose={() => dispatch(closeStatusModal())}
          _backdrop={{
            bg: 'coolGray.800',
          }}
          w="100%"
          h="100%"
          {...styles[
            {
              bottom: {
                marginBottom: 0,
                marginTop: 'auto',
              },
            }
          ]}
        >
          <View style={styles.centeredView2}>
            <View style={styles.modalViewStatus}>
              <View style={styles.button_con}>
                <Pressable
                  style={styles.button}
                  onPress={async () => {
                    try {
                      const res = await axios(
                        requestBuilder(
                          'tasks',
                          '/tasks/task/changeStatus/:id',
                          'put',
                          {
                            id: dashboardStore.taskStatus.task_id,
                            newStatus: checked,
                          }
                        )
                      ).then((results) =>
                        console.log('ssssssssssssssssss', results)
                      );
                    } catch (error) {
                      console.log('zzzzzzzzzzzzz', error);
                    }
                    dispatch(SaveModalHandler());
                  }}
                >
                  <Text style={styles.textStyle}>Save</Text>
                </Pressable>
              </View>
              <View style={{ padding: 15, paddingTop: 25 }}>
                <Radio.Group
                  onChange={(value) => setChecked(value)}
                  value={checked}
                >
                  <Radio label="on hold" value="on hold" style={styles.radio}>
                    on hold
                  </Radio>
                  <Radio label="progress" value="progress" style={styles.radio}>
                    progress
                  </Radio>
                  <Radio
                    label="completed"
                    value="completed"
                    style={styles.radio}
                  >
                    completed
                  </Radio>
                </Radio.Group>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
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

export default App;

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  ScrollView,
  Modal,
  HStack,
  Checkbox,
  Box,
  Stack,
  Divider,
  Heading,
  FlatList,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '@expo/vector-icons/FontAwesome';
import { VStack } from 'native-base';
import { StyleSheet, View, Text, Platform } from 'react-native';
import ExpandComponent from '../shared/ExpandComponent';
import Title from '../shared/Title';
/////////////////////////////////////////////////
function FilterModal({
  showFilterModal,
  setShowFilterModal,
  type,
  handleCallbackTypes,
  handleCallbackStatus,
  typesGroupValues,
  statusGroupValues,
  dateInform,
  setDateInform,
  handleFilterAction,
}) {
  return (
    <Modal
      isOpen={showFilterModal}
      avoidKeyboard
      height="100%"
      safeAreaTop={true}
    >
      <Modal.Content width="100%" style={styles.bottomModal}>
        <Modal.Header>
          <Title style={styles.title}>Filter</Title>
        </Modal.Header>
        <Modal.Body>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              {(type === 'employeeLeaves' || type == 'managerLeaves') && (
                <Box mt={3}>
                  <Text mx="3" alignItems="center" flexDirection="row">
                    Types
                  </Text>
                  <Divider
                    my="2"
                    _light={{
                      bg: '#e5e5e5',
                    }}
                  />
                  <Checkbox.Group
                    m={2}
                    value={typesGroupValues}
                    onChange={(value) => {
                      handleCallbackTypes(value);
                    }}
                    accessibilityLabel="choose numbers"
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox value="business">Business</Checkbox>
                    <Checkbox value="sick">Sick</Checkbox>
                    <Checkbox value="personal">Personal</Checkbox>
                  </Checkbox.Group>
                </Box>
              )}

              {(type == 'attendanceForManager' ||
                type == 'missingPunchManager') && (
                <Box mt={3}>
                  <Text mx="3" alignItems="center" flexDirection="row">
                    Types
                  </Text>
                  <Divider
                    my="2"
                    _light={{
                      bg: '#e5e5e5',
                    }}
                  />

                  <Checkbox.Group
                    value={typesGroupValues}
                    onChange={(value) => {
                      handleCallbackTypes(value);
                    }}
                    accessibilityLabel="choose numbers"
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox value="All">All</Checkbox>
                    <Checkbox value="In">In</Checkbox>
                    <Checkbox value="Out">Out</Checkbox>
                  </Checkbox.Group>
                </Box>
              )}
              {type == 'missingAndLeaves' && (
                <Box mt={3}>
                  <Text mx="3" alignItems="center" flexDirection="row">
                    Types
                  </Text>
                  <Divider
                    my="2"
                    _light={{
                      bg: '#e5e5e5',
                    }}
                  />

                  <Checkbox.Group
                    value={typesGroupValues}
                    onChange={(value) => {
                      handleCallbackTypes(value);
                    }}
                    accessibilityLabel="choose numbers"
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox value="All">All</Checkbox>
                    <Checkbox value="leaves">Leaves</Checkbox>
                    <Checkbox value="missing">Missing</Checkbox>
                  </Checkbox.Group>
                </Box>
              )}
              <Divider
                my="2"
                _light={{
                  bg: '#e5e5e5',
                }}
                _dark={{
                  bg: 'muted.50',
                }}
              />
              {/* {type == 'missingPunchManager' && (
                <ExpandComponent
                  data={data}
                  handleCallbackEmployees={handleCallbackEmployees}
                  employeesGroupValues={employeesGroupValues}
                />
              )} */}
              <Divider
                my="2"
                _light={{
                  bg: '#e5e5e5',
                }}
                _dark={{
                  bg: 'muted.50',
                }}
              />
              {(type === 'employeeLeaves' || type == 'managerLeaves') && (
                <Box mt={3}>
                  <Text mx="3" alignItems="center" flexDirection="row">
                    Status
                  </Text>
                  <Divider
                    my="2"
                    _light={{
                      bg: '#e5e5e5',
                    }}
                  />
                  <HStack>
                    {statusGroupValues.map((el) => {
                      return (
                        <Box
                          alignItems="center"
                          style={{
                            borderWidth: 1,
                            borderRadius: '30%',
                            backgroundColor: '#194569',
                            width: '24%',
                            padding: 3,
                            margin: 4,
                          }}
                          _text={{
                            fontSize: 'sm',
                            fontWeight: 'medium',
                            color: 'warmGray.50',
                            letterSpacing: 'md',
                          }}
                        >
                          {el}
                        </Box>
                      );
                    })}
                  </HStack>

                  <Checkbox.Group
                    value={statusGroupValues}
                    onChange={(value) => {
                      handleCallbackStatus(value);
                    }}
                    accessibilityLabel="choose numbers"
                  >
                    <Checkbox value="new" my={1}>
                      New
                    </Checkbox>
                    <Checkbox value="accepted" my={1}>
                      Accepted
                    </Checkbox>
                    <Checkbox value="rejected" my={1}>
                      Rejected
                    </Checkbox>
                    <Checkbox value="pending" my={1}>
                      Pending
                    </Checkbox>
                  </Checkbox.Group>
                </Box>
              )}
              {type == 'missingPunchManager' && (
                <Box mt={3}>
                  <Text mx="3" alignItems="center" flexDirection="row">
                    Status
                  </Text>
                  <Divider
                    my="2"
                    _light={{
                      bg: '#e5e5e5',
                    }}
                  />
                  <HStack>
                    {statusGroupValues.map((el) => {
                      return (
                        <Box
                          alignItems="center"
                          style={{
                            borderWidth: 1,
                            borderRadius: '30%',
                            backgroundColor: '#194569',
                            width: '24%',
                            padding: 3,
                            margin: 4,
                          }}
                          _text={{
                            fontSize: 'sm',
                            fontWeight: 'medium',
                            color: 'warmGray.50',
                            letterSpacing: 'md',
                          }}
                        >
                          {el}
                        </Box>
                      );
                    })}
                  </HStack>

                  <Checkbox.Group
                    value={statusGroupValues}
                    onChange={(value) => {
                      handleCallbackStatus(value);
                    }}
                    accessibilityLabel="choose numbers"
                  >
                    <Checkbox value="all" my={1}>
                      All
                    </Checkbox>
                    <Checkbox value="new" my={1}>
                      New
                    </Checkbox>
                    <Checkbox value="accepted" my={1}>
                      Accepted
                    </Checkbox>
                    <Checkbox value="rejected" my={1}>
                      Rejected
                    </Checkbox>
                  </Checkbox.Group>
                </Box>
              )}
              {/* </HStack> */}
            </View>
          </ScrollView>
        </Modal.Body>

        <Modal.Footer>
          <View style={styles.btnsContainer}>
            <View style={styles.Buttons}>
              <Button
                style={styles.filterBtn}
                _text={{
                  color: 'white',
                }}
                onPress={handleFilterAction}
              >
                Filter
              </Button>
            </View>
            <View style={styles.Buttons}>
              <Button
                // android_ripple={{ color: 'blue' }}
                onPress={() => setShowFilterModal(false)}
                style={styles.cancelBtn}
                _text={{
                  color: 'black',
                }}
              >
                Cancel
              </Button>
            </View>
          </View>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
const styles = StyleSheet.create({
  wrapperContainer: {
    marginHorizontal: 16,
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  bottomModal: {
    marginBottom: 0,
    marginTop: 'auto',
  },

  due_date_con: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },

  create_val: {
    width: '50%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  create_text_val: {
    width: Platform.OS === 'ios' ? 100 : 180,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },

  btnsContainer: {
    flexDirection: 'column',
    height: 100,
    flex: 1,
  },

  Buttons: {
    flex: 1,
    marginHorizontal: 8,
  },
  filterBtn: {
    backgroundColor: '#194569',
  },
  cancelBtn: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 1,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginVertical: 10,
  },
});
export default FilterModal;

import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Title from '../shared/Title';
import { Text, HStack, Button, Modal, VStack, Box } from 'native-base';
const ShowLeaveRequestEmployeeModal = ({
  targetReq,
  setShowEmployeeLeaveModal,
  showEmployeeLeaveModal,
}) => {
  const [hoursFormmat, setHoursFormmat] = useState('');
  useEffect(() => {
    handleHoursFormating();
  }, []);

  const handleHoursFormating = () => {
    let hours = targetReq.howManyHoursEmployeeAskedFor / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    setHoursFormmat(rhours + ':' + rminutes);
  };
  const statusBorderColor = (status) => {
    switch (status) {
      case 'New':
        return 'blue';
      case 'updated':
        return 'orange';
      case 'accepted':
        return 'green';

      case 'refused':
        return 'red';
    }
  };
  return (
    <Modal
      isOpen={showEmployeeLeaveModal}
      avoidKeyboard
      height="100%"
      safeAreaTop={true}
    >
      {/* <Icon
            style={{ fontSize: 25, alignSelf: 'flex-end' }}
            name="close"
            onPress={() => setshowModal(false)}
          /> */}
      <Modal.Content width="95%" style={styles.bottomModal}>
        <Modal.Header>
          <Title style={styles.title}>Leave Request</Title>
        </Modal.Header>
        <Modal.Body>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              <View>
                <View style={styles.due_date_con}>
                  <View
                    style={{
                      height: 50,
                      justifyContent: 'center',
                      width: '30%',
                    }}
                  >
                    <Text style={[styles.titleText]}>Name:</Text>
                  </View>
                  <View
                    style={[styles.create_val, { justifyContent: 'center' }]}
                  >
                    <Text style={styles.sub_values}>
                      {targetReq.employeeName}
                    </Text>
                  </View>
                </View>

                {targetReq.DateFrom != targetReq.dateTo ? (
                  <VStack>
                    <View style={styles.due_date_con}>
                      <View
                        style={{
                          height: 50,
                          justifyContent: 'center',
                          width: '30%',
                        }}
                      >
                        <Text style={styles.titleText}>Date From:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text style={styles.sub_values}>
                          {targetReq.DateFrom}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.due_date_con}>
                      <View
                        style={{
                          height: 50,
                          justifyContent: 'center',
                          width: '30%',
                        }}
                      >
                        <Text style={styles.titleText}>Date To:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text style={styles.sub_values}>
                          {targetReq.dateTo}
                        </Text>
                      </View>
                    </View>
                  </VStack>
                ) : (
                  <VStack>
                    <View style={styles.due_date_con}>
                      <View
                        style={{
                          height: 50,
                          justifyContent: 'center',
                          width: '30%',
                        }}
                      >
                        <Text style={styles.titleText}>Date:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text style={styles.sub_values}>
                          {targetReq.DateFrom}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.due_date_con}>
                      <View
                        style={{
                          height: 50,
                          justifyContent: 'center',
                          width: '30%',
                        }}
                      >
                        <Text style={styles.titleText}>Time From:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text style={styles.sub_values}>
                          {targetReq.timeFrom}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.due_date_con}>
                      <View
                        style={{
                          height: 50,
                          justifyContent: 'center',
                          width: '30%',
                        }}
                      >
                        <Text style={styles.titleText}>Time To:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text style={styles.sub_values}>
                          {targetReq.timeTo}
                        </Text>
                      </View>
                    </View>
                  </VStack>
                )}
                <VStack>
                  {/* {targetReq.DateFrom != targetReq.dateTo ? (
                    <View style={styles.due_date_con}>
                      <View
                        style={{
                          height: 50,
                          justifyContent: 'center',
                          width: '30%',
                        }}
                      >
                        <Text style={styles.titleText}>Days #:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text style={styles.sub_values}>
                          {targetReq.howManyDaysEmployeeAskedFor.toString()}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.due_date_con}>
                      <View
                        style={{
                          height: 50,
                          justifyContent: 'center',
                          width: '30%',
                        }}
                      >
                        <Text style={styles.titleText}>Hours #:</Text>
                      </View>
                      <View
                        style={[
                          styles.create_val,
                          { justifyContent: 'center' },
                        ]}
                      >
                        <Text style={styles.sub_values}>{hoursFormmat}</Text>
                      </View>
                    </View>
                  )} */}
                </VStack>
                <View style={[styles.due_date_con, { marginBottom: 20 }]}>
                  <View
                    style={{
                      height: 50,
                      justifyContent: 'center',
                      width: '30%',
                    }}
                  >
                    <Text style={styles.titleText}>Reason:</Text>
                  </View>
                  <View
                    style={[styles.create_val, { justifyContent: 'center' }]}
                  >
                    <Text style={styles.sub_values}>
                      {targetReq.subLeaveType}
                    </Text>
                  </View>
                </View>
                {targetReq.reason && (
                  <View style={[styles.due_date_con, { marginBottom: 20 }]}>
                    <View
                      style={{
                        height: 50,
                        justifyContent: 'center',
                        width: '30%',
                      }}
                    >
                      <Text style={styles.titleText}>Note:</Text>
                    </View>
                    <View
                      style={[styles.create_val, { justifyContent: 'center' }]}
                    >
                      <Text style={styles.sub_values}>{targetReq.reason}</Text>
                    </View>
                  </View>
                )}
                <View style={[styles.due_date_con, { marginBottom: 20 }]}>
                  <View
                    style={{
                      height: 50,
                      justifyContent: 'center',
                      width: '30%',
                    }}
                  >
                    <Text style={styles.titleText}>Status:</Text>
                  </View>
                  <View
                    style={[styles.create_val, { justifyContent: 'center' }]}
                  >
                    <Box
                      style={{
                        borderWidth: 2,
                        borderRadius: 5,
                        borderColor: statusBorderColor(targetReq.isApproved),
                        padding: 2,
                        width: 70,
                      }}
                    >
                      <Text
                        style={{
                          color: statusBorderColor(targetReq.isApproved),
                          textAlign: 'center',
                        }}
                      >
                        {targetReq.isApproved}
                      </Text>
                    </Box>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal.Body>

        <Modal.Footer>
          <HStack space={5} justifyContent="center">
            <Button
              size="sm"
              onPress={() => {
                setShowEmployeeLeaveModal(false);
              }}
            >
              Cancel
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ShowLeaveRequestEmployeeModal;

const styles = StyleSheet.create({
  wrapperContainer: {
    marginHorizontal: 16,
  },
  bottomModal: {
    marginBottom: 0,
    marginTop: 'auto',
  },
  title: {
    marginVertical: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  sub_values: {
    fontSize: 16,
    fontWeight: '400',
  },

  due_date_con: {
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
    width: 220,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    padding: 30,
  },
});

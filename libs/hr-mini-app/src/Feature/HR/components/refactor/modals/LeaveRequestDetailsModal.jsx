import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, HStack, Button, Modal, VStack, Box } from 'native-base';
import Title from '../../shared/Title';
const LeaveRequestDetailsModal = ({
  targetReq,
  setShowEmployeeLeaveModal,
  showEmployeeLeaveModal,
}) => {
  const statusBorderColor = (status) => {
    switch (status) {
      case 'new':
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
      <Modal.Content width="95%" style={styles.bottomModal}>
        <Modal.Header>
          <Title style={styles.title}>Leave Request</Title>
        </Modal.Header>
        <Modal.Body>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.wrapperContainer}>
              <View>
                {targetReq.dateFrom != targetReq.dateTo ? (
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
                          {targetReq.dateFrom}
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
                          {targetReq.dateFrom}
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
                <VStack></VStack>
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
                      {targetReq.subType.name.en}
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
                      <Text style={styles.sub_values}>
                        {targetReq.employeeReason}
                      </Text>
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
                        borderColor: statusBorderColor(
                          targetReq.status.name.en
                        ),
                        padding: 2,
                        width: 70,
                      }}
                    >
                      <Text
                        style={{
                          color: statusBorderColor(targetReq.status.name.en),
                          textAlign: 'center',
                        }}
                      >
                        {targetReq.status.name.en}
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

export default LeaveRequestDetailsModal;

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
    color: '#194569',
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

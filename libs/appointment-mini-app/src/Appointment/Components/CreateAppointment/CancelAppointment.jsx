import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Button, Heading, Modal, Spinner, Text, View } from 'native-base';
const { requestBuilder } = require('../../../requestBuilder');

const CancelAppointment = ({
  modalVisible2,
  setModalVisible2,
  SelectedAppointment,
  getStatus,
}) => {
  const [loader, setLoader] = useState(false);
  const cancelAppointmentReq = async () => {
    try {
      setLoader(true);
      setModalVisible2(false);
      const appointment = await requestBuilder(
        '/appointments/updateStatusToCanceled',
        {
          name: '',
          CreatedBy: '',
          id: SelectedAppointment.id,
          status: getStatus[6],
        }
      );
      setCancelAppointment(appointment.data);
      setLoader(false);
      console.log(appointment.data.status);
    } catch (err) {
      console.log(err);
    }
  };
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [cancelAppointment, setCancelAppointment] = useState();
  return (
    <Modal
      isOpen={modalVisible2}
      onClose={() => setModalVisible2(false)}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
    >
      {loader && (
        <View alignItems={'center'} justifyContent={'center'}>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading alignSelf={'center'} color="#5F84A2" fontSize="md">
            Loading
          </Heading>
        </View>
      )}
      {loader === false && (
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header bg={'#194569'}>
            <Text color={'white'}>Cancel Appintment</Text>
          </Modal.Header>
          <Modal.Body>
            <Text color={'#194569'}>
              Are You Sure You Want To Cancel the Appintment ?
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  console.log(
                    SelectedAppointment.status,
                    'SelectedAppointment'
                  );
                }}
              >
                Decline
              </Button>
              <Button bg={'#5F84A2'} onPress={cancelAppointmentReq}>
                Confirm
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      )}
    </Modal>
  );
};

export default CancelAppointment;

const styles = StyleSheet.create({});

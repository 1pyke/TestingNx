import React, { useEffect, useState } from 'react';
import { Button, Heading, Modal, Spinner, Text, View } from 'native-base';
const { requestBuilder } = require('../../../requestBuilder');

const ConfirmAppointment = ({
  modalVisible,
  setModalVisible,
  SelectedAppointment,
  getStatus,
}) => {
  const confirmAppointment = async () => {
    try {
      setLoader(true);
      setModalVisible(false);
      const appointment = await requestBuilder(
        '/appointments/updateStatusToCompleted',
        {
          id: SelectedAppointment.id,
          CreatedBy: '',
          changedBy: '',
          status: getStatus[1],
        }
      );
      setConfimAppintmentReq(appointment.data);
      setLoader(false);
      console.log(appointment.data);
    } catch (err) {
      console.log(err);
    }
  };
  const initialRef = React.useRef(null);
  const [confimAppintmentReq, setConfimAppintmentReq] = useState();
  const finalRef = React.useRef(null);
  const [loader, setLoader] = useState(false);
  return (
    <Modal
      isOpen={modalVisible}
      onClose={() => setModalVisible(false)}
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
            <Text color={'white'}>Confirm Appintment</Text>
          </Modal.Header>
          <Modal.Body>
            <Text color={'#194569'}>
              Are You Sure You Want To Confirm the Appintment ?
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                onPress={() => {
                  console.log(
                    SelectedAppointment.status,
                    'SelectedAppointment'
                  );
                }}
                variant="ghost"
                colorScheme="blueGray"
              >
                Decline
              </Button>
              <Button bg={'#5F84A2'} onPress={confirmAppointment}>
                Confirm
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      )}
    </Modal>
  );
};

export default ConfirmAppointment;

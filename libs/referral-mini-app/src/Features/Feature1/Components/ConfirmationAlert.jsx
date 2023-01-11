import { StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import { AlertDialog, Button, Center, Text } from 'native-base';
import { laserAvenue } from '../../../Constants/index';

const ConfirmationAlert = ({
  isOpen,
  onClose,
  statusRecived,
  errorState,
  title,
  desc,
}) => {
  const styles = StyleSheet.create({
    btnContainer: {
      backgroundColor:
        statusRecived === 'error' ? laserAvenue.error : laserAvenue.blue1,
      width: '30%',
    },
    text: {
      color: laserAvenue.blue1,
    },
  });
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        {/* <AlertDialog.CloseButton /> */}
        <AlertDialog.Header style={styles.text}>
          <Text bold style={styles.text}>
            {statusRecived === 'error' ? 'Oops' : title}
          </Text>
        </AlertDialog.Header>
        <AlertDialog.Body>
          <Text style={styles.text}>
            {statusRecived === 'error' ? errorState : desc}
          </Text>
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button onPress={onClose} style={styles.btnContainer}>
            Ok
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ConfirmationAlert;

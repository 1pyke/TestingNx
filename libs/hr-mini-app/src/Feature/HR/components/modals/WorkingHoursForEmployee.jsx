import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, Alert } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Title from '../shared/Title';
import {
  Pressable,
  Text,
  Box,
  HStack,
  Button,
  Flex,
  Center,
  Avatar,
  Input,
  VStack,
  Select,
  CheckIcon,
  Spacer,
  Menu,
  HamburgerIcon,
  Container,
} from 'native-base';

const WorkingHoursForEmployee = ({
  showWorkingHoursDialog,
  setShowWorkingHoursDialog,
  workingHoursInfo,
}) => {
  return (
    <Modal
      visible={showWorkingHoursDialog}
      animationType="slide"
      swipeDirection="left"
    >
      {/* <ScrollView style={styles.card}> */}
      {/* <Container> */}
      {/* <Center> */}
      <Center>
        <Title>Working Hours</Title>
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>Day</DataTable.Title>
            <DataTable.Title> From</DataTable.Title>
            <DataTable.Title> To</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Saturday</DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].saturday.from}</DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].saturday.to}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Sunday</DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].sunday.from}</DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].sunday.to}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Monday</DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].monday.from}</DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].monday.to}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Tuesday</DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].tuesday.from}</DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].tuesday.to}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Wednesday</DataTable.Cell>
            <DataTable.Cell>
              {workingHoursInfo[0].wednesday.from}
            </DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].wednesday.to}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Thursday</DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].thursday.from}</DataTable.Cell>
            <DataTable.Cell>{workingHoursInfo[0].thursday.to}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Center>
      <Center>
        <Button
          size="sm"
          onPress={() => {
            setShowWorkingHoursDialog(false);
          }}
        >
          Cancel
        </Button>
      </Center>
      {/* </Center> */}
      {/* </Container> */}
      {/* </ScrollView> */}
    </Modal>
  );
};
const styles = StyleSheet.create({
  //   card: {
  //     width: '100%',
  //     height: '80%',
  //     borderRadius: 6,
  //     elevation: 3,
  //     backgroundColor: '#fff',
  //     shadowOffset: { width: 1, height: 1 },
  //     shadowColor: '#333',
  //     shadowOpacity: 0.3,
  //     shadowRadius: 2,
  //     marginHorizontal: 4,
  //     marginVertical: 6,
  //     padding: 5,
  //   },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    height: 100,
  },
  container: {
    padding: 15,
  },
  //   tableHeader: {
  //     backgroundColor: '#DCDCDC',
  //   },
});
export default WorkingHoursForEmployee;

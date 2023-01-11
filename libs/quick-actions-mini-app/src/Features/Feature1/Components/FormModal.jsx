import React, { useEffect, useState } from 'react';
import { Button, Modal, Text, Input, TextArea } from 'native-base';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../../../Constants/index';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function FormModal({
  template,
  showModal,
  onCloseModal,
  apiService,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [dateText, setDateText] = useState('');
  const [isLoading1, setIsLoading1] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    let currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      '-' +
      (('' + (tempDate.getMonth() + 1)).length === 1
        ? '0' + (tempDate.getMonth() + 1)
        : tempDate.getMonth() + 1) +
      '-' +
      (('' + tempDate.getDate()).length === 1
        ? '0' + tempDate.getDate()
        : tempDate.getDate());

    console.log(fDate);
    setDateText(fDate);
    // console.log(fDate);
  };

  useEffect(() => {
    setSubject('');
    setDescription('');
    setIsLoading1(false);
  }, [modalVisible]);
  //   ----------------------------------------------------------------------------------------

  useEffect(() => {
    setModalVisible(showModal);
  }, [showModal]);
  //   ----------------------------------------------------------------------------------------

  const onClose = () => {
    onCloseModal();
  };
  //   ----------------------------------------------------------------------------------------
  const onSubmit = () => {
    // let validation = false;
    let arr = [];
    let obj1 = {
      subject: template.subject,
      description: template.description,
      date: template.date,
    };
    let obj2 = {};

    // }
    for (const property in obj1) {
      // console.log(`${property}: ${object[property]}`);
      if (obj1[property]) obj2[property] = true;
    }

    // console.log(obj2);
    for (const property in obj2) {
      if ('' + property === 'subject' && subject.trim()) {
        arr.push(true);
      } else if ('' + property === 'description' && description.trim()) {
        arr.push(true);
      } else if ('' + property === 'date' && date) {
        arr.push(true);
      } else arr.push(false);
    }

    // if (!this.subject.trim()) {
    //   this.subjectErrorMessage = "this field is required";
    // }
    // if (!this.description.trim()) {
    //   this.descriptionErrorMessage = "this field is required";
    // }
    // if (!this.date) {
    //   this.dateErrorMessage = "this field is required";
    // }

    if (arr.includes(false)) {
      return;
    } else {
      setIsLoading1(true);
      let finalDate = template.date ? dateText : '';
      apiService(template.quickActionType.id, subject, description, finalDate);
      // setIsLoading1(false);
    }
  };
  //   ----------------------------------------------------------------------------------------

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <Modal isOpen={modalVisible} onClose={onClose} size="xl" w="100%">
        <Modal.Content h="auto">
          <Modal.CloseButton />
          <Modal.Header color="red">
            <Text
              style={{ color: colors.color2 }}
              fontWeight="600"
              fontSize="md"
            >
              {template.label.en}
            </Text>
          </Modal.Header>
          <Modal.Body>
            {template.subject == true && (
              <>
                <Text style={styles.text}>Subject</Text>
                <Input
                  color={colors.color1}
                  mb={5}
                  placeholder="Enter Subject"
                  w="100%"
                  value={subject}
                  onChangeText={(e) => setSubject(e)}
                />
              </>
            )}
            {template.description == true && (
              <>
                <Text style={styles.text}>Description</Text>
                <TextArea
                  h={20}
                  placeholder="Enter Description"
                  w="100%"
                  mb={5}
                  alignSelf="center"
                  value={description}
                  color={colors.color1}
                  onChangeText={(text) => setDescription(text)}
                />
              </>
            )}
            {template.date == true && (
              <Button bg={colors.color1} onPress={() => setShowDate(true)}>
                show date
              </Button>
            )}

            {showDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              ></DateTimePicker>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                isLoading={isLoading1}
                isLoadingText="Submitting"
                onPress={() => {
                  onSubmit();
                }}
                bg={colors.color2}
              >
                Send
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  text: {
    color: colors.color1,
  },
});

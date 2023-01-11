import React from 'react';
import { Divider, View, Text } from 'native-base';
import CreateAppointmentCalendar from './CreateAppointmentCalendar';
import { Platform } from 'react-native';
const CreateAppointmentPage3 = ({ setValidations }) => {
  return (
    <View
      flex={1}
      h={Platform.OS === 'ios' ? 535 : 480}
      w={'100%'}
      alignItems={'center'}
      mt={'2%'}
    >
      <Text fontSize={'md'} color={'#194569'}>
        Date And Time
      </Text>
      <Divider my="2" mb={'3%'} />
      <CreateAppointmentCalendar setValidations={setValidations} />
    </View>
  );
};

export default CreateAppointmentPage3;

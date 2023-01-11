import { View, Text, Divider, Button } from 'native-base';
import { AppointmentDetailsCalendar } from './AppointmentDetailsCalendar';
import React from 'react';

const Reschedule = () => {
  return (
    <View bg={'#FFFAFA'} flex={1} h={535} w={'100%'} alignItems={'center'}>
      <Text fontSize={'md'} color={'#194569'}>
        Reschedule
      </Text>
      <Divider my="2" mb={'3%'} />
      <AppointmentDetailsCalendar />
    </View>
  );
};

export { Reschedule };

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, HStack, Button, Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
//components
import AppointmentCalendar from '../Components/AppointmentCalendar';
import AppointmentCalendarFilter from '../Components/AppointmentCalendarFilter';
import { setNewAppointment } from '../store-Appointment';

const AppointmentLandingPage = () => {
  const [value, setValue] = useState(0);
  const user = useSelector((state) => state.AuthStore.user.facility);
  const total = useSelector((state) => state.AppointmentStore.value);
  const dispacth = useDispatch();
  useEffect(() => {
    dispacth(
      setNewAppointment({
        name: 'facility',
        value: user,
      })
    );
  });
  const [info, setInfo] = useState(false);
  return (
    <View bg={'#FFFAFA'}>
      <View h={'100%'} alignItems={'center'}>
        <HStack
          w="80%"
          justifyContent="center"
          alignItems="center"
          my={5}
          borderColor={'gray.300'}
          borderRadius="sm"
          borderWidth={3}
          padding={2}
        >
          <Button
            _pressed={{ backgroundColor: '#194569', color: 'white' }}
            w="50%"
            bg={info ? 'transparent' : '#5F84A2'}
            rounded="sm"
            _text={{
              color: info ? '#5F84A2' : 'white',
            }}
            onPress={() => setInfo(false)}
          >
            Appointment
          </Button>
          <Button
            _pressed={{ backgroundColor: '#194569', color: 'white' }}
            w="50%"
            bg={info ? '#5F84A2' : 'transparent'}
            rounded="sm"
            _text={{
              color: info ? 'white' : '#5F84A2',
            }}
            onPress={() => setInfo(true)}
          >
            Statistics
          </Button>
        </HStack>
        <HStack
          height={'7%'}
          ml={'2%'}
          width={'100%'}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          space={3}
        >
          <Icon
            bottom={'2%'}
            color={'#194569'}
            size={'xl'}
            as={MaterialCommunityIcons}
            name="clipboard-text-outline"
          />
          <Text
            color={'#194569'}
            fontSize={Platform.OS === 'ios' ? '20%' : 25}
            bottom={'4%'}
          >
            Today
          </Text>
          <Text
            fontSize={Platform.OS === 'ios' ? '10%' : 15}
            color={'gray.400'}
            bottom={'1%'}
          >
            Total
          </Text>
          <Text
            fontSize={Platform.OS === 'ios' ? '10%' : 15}
            color={'#194569'}
            bottom={'1%'}
          >
            {value}
          </Text>
          <Text
            fontSize={Platform.OS === 'ios' ? '10%' : 15}
            color={'gray.400'}
            bottom={'1%'}
          >
            Appointment
          </Text>
          <View
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
            alignSelf={'flex-end'}
            width={Platform.OS === 'ios' ? '26%' : '23%'}
          >
            <AppointmentCalendarFilter />
          </View>
        </HStack>
        <View w={'100%'} h={'77.8%'}>
          <AppointmentCalendar setValue={setValue} />
        </View>
      </View>
    </View>
  );
};

export default AppointmentLandingPage;

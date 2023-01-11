import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  Button,
  FormControl,
  HStack,
  Input,
  Modal,
  Text,
  View,
  VStack,
} from 'native-base';
import { Agenda } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
const { requestBuilder } = require('../../requestBuilder');

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const AppointmentDetailsCalendar = () => {
  const [selectedTime, setSelectedTime] = React.useState('');
  const [week, setWeek] = React.useState([]);
  const [items, setItems] = React.useState({});
  const [placement, setPlacement] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();
  const openModal = (placement) => {
    setOpen(true);
    setPlacement(placement);
  };
  const resceduleAppointment = async () => {
    await requestBuilder('/appointments/updateAppointment', {
      date: '2022-12-28',
      id: 'BKG-BKA-JORe7792355-ec18-49a7-9f14-38a55fa47149',
      timeFrom: '21:30',
      timeTo: '23:28',
    });
  };
  const Time = Date.now();
  useEffect(() => {
    let days = [];
    for (let i = 10; i < 18; i++) {
      let zz = i;
      if (i >= 13) zz = i - 12;
      days.push(zz + ':00');
      days.push(zz + ':30');
    }
    setWeek(days);
  }, []);
  const CreateAppointmentCalendarTime = () => {
    return (
      <View style={styles.item}>
        <View h={'100%'}>
          <HStack space={'55%'}>
            <Text ml={'4%'} color={'#5F84A2'}>
              Select Time
            </Text>
            <Button
              variant={'ghost'}
              size={'sm'}
              onPress={() => openModal('right')}
            >
              Right
            </Button>
            <Modal
              avoidKeyboard
              isOpen={open}
              onClose={() => setOpen(false)}
              safeAreaTop={true}
            >
              <Modal.Content maxWidth="350" {...styles[placement]}>
                <Modal.CloseButton />
                <Modal.Header>Contact Us</Modal.Header>
                <Modal.Body>
                  <FormControl>
                    <FormControl.Label>Name</FormControl.Label>
                    <Input />
                  </FormControl>
                  <FormControl mt="3">
                    <FormControl.Label>Email</FormControl.Label>
                    <Input />
                  </FormControl>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      variant="ghost"
                      colorScheme="blueGray"
                      onPress={() => {
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onPress={() => {
                        setOpen(false);
                      }}
                    >
                      Save
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </HStack>
          <HStack
            justifyContent={'center'}
            w="100%"
            my={3}
            mx={2}
            alignSelf="center"
            flexWrap="wrap"
          >
            {week.map((day, i) => (
              <Button
                _pressed={{ backgroundColor: '#5F84A2' }}
                key={i}
                bg={selectedTime === day ? '#5F84A2' : '#FFFAFA'}
                borderRadius={10}
                borderWidth={2}
                borderColor={'#5F84A2'}
                onPress={() => {
                  setSelectedTime(day);
                }}
                w="22%"
                m={1}
                p={17}
              >
                <VStack alignItems="center" w="100%">
                  <Text
                    fontWeight="bold"
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                    color={selectedTime === day ? 'white' : '#194569'}
                  >
                    {day}
                  </Text>
                </VStack>
              </Button>
            ))}
          </HStack>
          <View mt={'3%'} justifyContent={'center'} alignItems={'center'}>
            <Button
              onPress={() => {
                navigation.navigate('AppointmentDetails');
              }}
              style={{ backgroundColor: 'rgba(95, 132, 162, 1)' }}
              mb={'3%'}
              width={'92%'}
            >
              Edit
            </Button>
            <Button
              onPress={() => {
                navigation.navigate('AppointmentDetails');
              }}
              variant={'outline'}
              width={'92%'}
            >
              Cancel
            </Button>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View bg={'#FFFAFA'} h={'100%'} w={'100%'} flex={1}>
      <Agenda
        pastScrollRange={2}
        futureScrollRange={2}
        hideExtraDays={true}
        items={items}
        // loadItemsForMonth={true}
        markingType={'custom'}
        markedDates={{
          '2022-11-13': {
            customStyles: {
              container: {
                backgroundColor: '#FFFAFA',
              },
              text: {
                color: '#FABB18',
                fontWeight: 'bold',
              },
            },
          },
        }}
        minDate={'2022-11-10'}
        maxDate={'2022-12-30'}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
        // renderItem={CreateAppointmentCalendarTime}
        // renderEmptyDate={CreateAppointmentCalendarTime}
        renderEmptyData={CreateAppointmentCalendarTime}
        theme={{
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: '#5F84A2',
          agendaTodayColor: 'red',
          agendaKnobColor: '#5F84A2',
          calendarBackground: '#FFFAFA',
        }}
      />
      {/* <CreateAppointmentCalendarTime /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#FFFAFA',
    justifyContent: 'center',
    height: '100%',
  },
});
export { AppointmentDetailsCalendar };

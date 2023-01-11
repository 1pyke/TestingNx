import React from 'react';
import {
  Center,
  Text,
  Actionsheet,
  HStack,
  VStack,
  Avatar,
  Pressable,
  View,
  Divider,
  ScrollView,
} from 'native-base';
import { useDispatch } from 'react-redux';
import { setNewAppointment } from '../../store-Appointment';

const FollowUpAppointment = ({
  isOpen2,
  onClose2,
  getfollowUpAppointment,
  setSelectFollowUpAppointment,
}) => {
  const dispacth = useDispatch();
  return (
    <Center>
      <Actionsheet isOpen={isOpen2} onClose={onClose2} hideDragIndicator>
        <Actionsheet.Content>
          <View justifyContent={'center'} h={55}>
            <Text fontSize={'md'} color={'#5F84A2'} alignSelf={'center'}>
              Follow Up Appointment
            </Text>
          </View>
          <Divider my={3} />
          {getfollowUpAppointment ? (
            <ScrollView w={'100%'}>
              {getfollowUpAppointment?.rows?.map((item) => (
                <Pressable
                  onPress={() => {
                    setSelectFollowUpAppointment(item.date);
                    dispacth(
                      setNewAppointment({
                        name: 'followupAppointmentId',
                        value: item.id,
                      })
                    );
                    console.log(item.date, 'followupAppointmentId ');
                    onClose2();
                  }}
                  _pressed={{ backgroundColor: 'gray.400' }}
                  borderWidth={1}
                  borderColor={'rgba(0,0,0,0.2)'}
                  borderTopLeftRadius={32}
                  borderBottomRadius={32}
                  borderTopRightRadius={20}
                  borderBottomRightRadius={20}
                  position={'relative'}
                  w={'100%'}
                  mb={'3%'}
                >
                  <HStack>
                    <Avatar
                      source={{
                        uri: item?.consumer?.image
                          ? item?.consumer?.image
                          : 'https://previews.123rf.com/images/yupiramos/yupiramos1607/yupiramos160705616/59613224-doctor-avatar-profile-isolated-icon-vector-illustration-graphic-.jpg',
                      }}
                      size="lg"
                    />
                    <VStack ml={3}>
                      <Text color={'#194569'}>{item?.consumer?.name.en}</Text>
                      <Text color={'rgba(0,0,0,0.6)'}>{item?.date}</Text>
                    </VStack>
                  </HStack>
                  <View
                    bottom={12}
                    flexDirection={'column'}
                    justifyContent={'flex-end'}
                    alignItems={'flex-end'}
                    mr={4}
                  >
                    {item?.services.map((service) => (
                      <Text
                        fontSize={'xs'}
                        borderColor={'rgba(0,0,0,0.2)'}
                        p={2}
                        mb={2}
                        borderWidth={1}
                        textAlign={'center'}
                        color={'#194569'}
                      >
                        {service.service.serviceInfo.name.en}
                      </Text>
                    ))}
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          ) : (
            <Text color={'#194569'}>
              No Follow Up Appintment For This Consumer...
            </Text>
          )}
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};

export default FollowUpAppointment;

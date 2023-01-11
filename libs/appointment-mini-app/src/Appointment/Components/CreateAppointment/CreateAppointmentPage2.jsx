import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  Box,
  Input,
  HStack,
  Divider,
  Button,
  IconButton,
  ScrollView,
  useDisclose,
  Pressable,
} from 'native-base';
import { setNewAppointment } from '../../store-Appointment';
import React, { useEffect, useState } from 'react';
import Packages from './Packages';
import SelectDoctor from './SelectDoctor';
import AddService from './AddService';

import { useDispatch, useSelector } from 'react-redux';

const CreateAppointmentPage2 = ({ setValidations }) => {
  const AppointmentStore = useSelector((state) => state.AppointmentStore);
  const dispacth = useDispatch();
  const [Page, setPage] = useState('service');
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclose();
  const [selectDoctors, SelectDoctors] = useState();
  const [selectedProvider, setSelectedProvider] = useState();
  const [service, setService] = useState([1]);
  const [info, setInfo] = useState(false);
  const addNewService = (item) => {
    let newService = [...service, service[service.length - 1] + 1];
    setService(newService);
  };
  const removeService = (item, i) => {
    const newService = [...service];
    console.log(selectedProvider, 'selectedProvider');
    // setService((item) => item.filter((value) => value === 1));
    newService.splice(i, 1);
    return newService;
  };
  const SelecOnetDoctor = (item) => {
    if (selectedProvider && selectDoctors) {
      setValidations(true);
    }
    SelectDoctors(item.name.en);
    dispacth(
      setNewAppointment({
        name: 'provider',
        value: item,
      })
    );
    setSelectedProvider(item);
    onClose1();
  };
  return (
    <View h={'100%'}>
      <View alignItems={'center'}>
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
            _pressed={{ backgroundColor: '#5F84A2', color: 'white' }}
            w="50%"
            bg={info ? 'transparent' : '#5F84A2'}
            rounded="sm"
            _text={{
              color: info ? '#194569' : 'white',
            }}
            onPress={() => {
              setPage('service');
              setInfo(false);
            }}
          >
            Service
          </Button>
          <Button
            _pressed={{ backgroundColor: '#5F84A2', color: 'white' }}
            w="50%"
            bg={info ? '#5F84A2' : 'transparent'}
            rounded="sm"
            _text={{
              color: info ? 'white' : '#194569',
            }}
            onPress={() => {
              setInfo(true);
              setPage('Package');
            }}
          >
            Package
          </Button>
        </HStack>
        <Divider mb={'3%'} />
        <ScrollView h={420} w={'100%'}>
          {Page === 'service' ? (
            <View alignItems={'center'}>
              <Text mb={'2%'} fontSize={'md'} color={'#194569'}>
                Doctors And Service
              </Text>
              <Box h={110} width={'90%'}>
                <Text mb={2} color={'#5F84A2'}>
                  Select Doctor
                </Text>
                <Pressable
                  h={'40%'}
                  justifyContent={'center'}
                  _pressed={{ backgroundColor: 'gray.400' }}
                  borderWidth={1}
                  borderColor={'rgba(0,0,0,0.2)'}
                  borderTopLeftRadius={20}
                  borderBottomRadius={20}
                  borderTopRightRadius={20}
                  borderBottomRightRadius={20}
                  onPress={() => {
                    onOpen1();
                    console.log('selectDoctorsselectDoctors', selectDoctors);
                  }}
                  w={'100%'}
                >
                  <Text fontSize={'xs'} color={'rgba(0,0,0,0.6)'} ml={3}>
                    {selectDoctors ? selectDoctors : 'Please Select Doctor'}
                  </Text>
                </Pressable>
              </Box>
              <Divider />
              <Text fontSize={'xs'} color={'#0ea5e9'}>
                Total number : {service.length}
              </Text>
              {service.map((item, i) => (
                <Box key={i} ml={'2%'} alignSelf={'flex-start'} width={'90%'}>
                  <HStack width={'100%'} space={'15%'}>
                    <Text color={'#5F84A2'}>{item}. Select Service</Text>
                    <View flexDirection={'row'} ml={'30%'}>
                      {service.length > 1 && (
                        <IconButton
                          onPress={() => {
                            setService(removeService(item, i));
                          }}
                          bottom={2}
                          size={'xs'}
                          variant="ghost"
                          _icon={{
                            as: MaterialCommunityIcons,
                            name: 'minus',
                            size: 7,
                            color: 'rgba(0,0,0,0.5)',
                          }}
                        />
                      )}
                      <IconButton
                        ml={service.length > 1 ? 0 : 10}
                        onPress={addNewService}
                        bottom={2}
                        size={'xs'}
                        variant="ghost"
                        _icon={{
                          as: MaterialCommunityIcons,
                          name: 'plus',
                          size: 7,
                          color: 'rgba(0,0,0,0.5)',
                        }}
                      />
                    </View>
                  </HStack>
                  <AddService
                    setValidations={setValidations}
                    selectDoctors={selectDoctors}
                    setSelectedProvider={setSelectedProvider}
                    selectedProvider={selectedProvider}
                  />
                </Box>
              ))}
            </View>
          ) : (
            <View alignItems={'center'}>
              <Text fontSize={'md'} color={'#194569'}>
                Package And Service
              </Text>
              <Packages />
            </View>
          )}
        </ScrollView>
        <SelectDoctor
          SelecOnetDoctor={SelecOnetDoctor}
          onClose1={onClose1}
          isOpen1={isOpen1}
        />
      </View>
    </View>
  );
};

export default CreateAppointmentPage2;

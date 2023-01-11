import React, { useState } from 'react';
import {
  HStack,
  Input,
  View,
  Text,
  IconButton,
  useDisclose,
  Pressable,
  Actionsheet,
} from 'native-base';
import { AllServicesSelect } from '@mobile-nx-apps/service-mini-app';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setNewAppointment } from '../../store-Appointment';

const AddService = ({ selectedProvider, selectDoctors, setValidations }) => {
  const dispacth = useDispatch();
  const selectService = (item) => {
    if (selectedProvider && selectDoctors) {
      setValidations(true);
    }
    seSelectServices(item);
    dispacth(
      setNewAppointment({
        name: 'services',
        value: [
          ...AppointmentStore.body.services,
          {
            serviceName: item,
            price: `${item?.providers[0]?.price?.minumunPrice} - ${item?.providers[0]?.price?.maximumPrice}`,
            selctedPrice: null,
            duration: item.duration,
            quantity: 1,
            assistnat: null,
            room: null,
          },
        ],
      })
    );
    dispacth(
      setNewAppointment({
        name: 'duration',
        value: item.duration,
      })
    );
    onClose();
  };
  const AppointmentStore = useSelector((state) => state.AppointmentStore);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectServices, seSelectServices] = useState([]);
  const [slelctPatientValue, setSlelctPatientValue] = useState();
  return (
    <View>
      <HStack width={'100%'}>
        <Pressable
          justifyContent={'center'}
          _pressed={{ backgroundColor: 'gray.400' }}
          borderWidth={1}
          borderColor={'rgba(0,0,0,0.2)'}
          borderTopLeftRadius={20}
          borderBottomRadius={20}
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          position={'relative'}
          onPress={() => {
            selectDoctors ? onOpen() : console.log(selectedProvider);
          }}
          w={'85%'}
        >
          <Text fontSize={'xs'} color={'rgba(0,0,0,0.6)'} ml={3}>
            {selectServices.length >= 0
              ? 'Please Select Service'
              : selectServices?.serviceInfo?.name?.en}
          </Text>
        </Pressable>
        <Input
          py={3}
          variant="rounded"
          ml={'2%'}
          textAlign={'center'}
          type={'text'}
          isReadOnly
          value={selectServices.duration}
          placeholder="0"
          w="20%"
        />
        {['xs'].map((size, i) => (
          <IconButton
            key={i}
            size={size}
            variant="ghost"
            _icon={{
              as: MaterialCommunityIcons,
              name: 'information-outline',
              size: 8,
              color: 'rgba(0,0,0,0.5)',
            }}
          />
        ))}
      </HStack>
      <Text fontSize={'xs'} mt={'3%'} mb={'3%'} color={'rgba(0,0,0,0.5)'}>
        Service Price :{' '}
        {selectServices.length >= 0
          ? 'Please Select a Service'
          : `${selectServices?.providers[0]?.price?.minumunPrice} - ${selectServices?.providers[0]?.price?.maximumPrice}`}
      </Text>
      <HStack mb={'5%'} width={'100%'}>
        <Input
          fontSize={'2xs'}
          placeholderTextColor={'rgba(0,0,0,0.5)'}
          py={3}
          variant="rounded"
          ml={'2%'}
          textAlign={'center'}
          type={'text'}
          isReadOnly
          value={
            selectServices?.needAssistant === false
              ? 'No Assistant'
              : 'Need Assistant'
          }
          placeholder="Need Assistant"
          w="50%"
        />
        <Input
          fontSize={'2xs'}
          py={3}
          variant="rounded"
          ml={'2%'}
          textAlign={'center'}
          type={'text'}
          isReadOnly
          value={slelctPatientValue}
          placeholder="Select Room"
          w="50%"
        />
      </HStack>
      <Actionsheet width={'100%'} onClose={onClose} isOpen={isOpen}>
        <Actionsheet.Content>
          <AllServicesSelect
            selectedProvider={selectedProvider}
            selectService={selectService}
          />
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default AddService;

import {
  View,
  Text,
  Box,
  HStack,
  Divider,
  Checkbox,
  useDisclose,
  Pressable,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { setNewAppointment } from '../../store-Appointment';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import AddNewConsumer from './AddNewConsumer';
import SelectPatient from './SelectPatient';
import FollowUpAppointment from './FollowUpAppointment';
const { requestBuilder } = require('../../../requestBuilder');

const CreateAppointmentPage1 = ({ setValidations }) => {
  // const followUpAppointmentHandler = () => {
  //   requestBuilder('/appointments/getAppointments', {
  //     consumer: AppointmentStore.body.consumer?.id,
  //     facility: 'FAC-FCF-JOR-1bf94704-d0c4-4766-ad03-0c2f26fecd46',
  //     recordStatus: 'LATEST',
  //   });
  //   setAllFollowUpAppointment(followUpAppointment.data);
  // };
  useEffect(() => {
    async function getAppointmentSettings() {
      try {
        const result = await requestBuilder(
          '/appointments/settings/getSettings'
        );
        setGetStatus(result.data.appointment_status);
        setGetLocationSettings(result.data.location_setting);
        dispacth(
          setNewAppointment({
            name: 'status',
            value: result.data.appointment_status[0],
          })
        );
        dispacth(
          setNewAppointment({
            name: 'locationSetting',
            value: result.data.location_setting[1],
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getAppointmentSettings();
  }, []);
  const [getSettings, setGetSettings] = useState();
  const [getStatus, setGetStatus] = useState();
  const [getLocationSettings, setGetLocationSettings] = useState();
  const AppointmentStore = useSelector((state) => state.AppointmentStore);
  const facilityDetails = useSelector((state) => state.AuthStore.user.facility);
  const [followUpAppointment, setFollowUpAppointment] = useState(true);
  const dispacth = useDispatch();
  const [getfollowUpAppointment, setAllFollowUpAppointment] = useState();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [newConsumer, setNewConsumer] = useState();
  const [loader, setLoader] = useState(false);
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclose();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclose();
  const [slelctPatientValue, setSlelctPatientValue] = useState();
  const [selectFollowUpAppointment, setSelectFollowUpAppointment] = useState();
  const changingItem = async (item) => {
    setValidations(true);
    setSlelctPatientValue(item?.name?.en);
    dispacth(
      setNewAppointment({
        name: 'consumer',
        value: item,
      })
    );
    dispacth(
      setNewAppointment({
        name: 'facility',
        value: facilityDetails,
      })
    );
    const followUpAppointment = await requestBuilder(
      '/appointments/getAppointments',
      {
        consumer: item?.id,
        facility: facilityDetails.id,
        recordStatus: 'LATEST',
      }
    );
    setAllFollowUpAppointment(followUpAppointment.data); /// Changes Here
  };
  return (
    <View flex={1} h={'100%'} w={'100%'} alignItems={'center'} mt={'2%'}>
      <Text fontSize={'md'} color={'#194569'}>
        Patient Details
      </Text>
      <Divider my="2" mb={'3%'} />
      <Box width={'90%'}>
        <Text mb={3} mt={4} color={'#5F84A2'}>
          Select Patient
        </Text>
        <Pressable
          h={'10%'}
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
            onOpen1();
            console.log(slelctPatientValue);
          }}
          w={'100%'}
        >
          <Text fontSize={'xs'} color={'rgba(0,0,0,0.6)'} ml={3}>
            {slelctPatientValue ? slelctPatientValue : 'Please Select Consumer'}
          </Text>
        </Pressable>
        <SelectPatient
          newConsumer={newConsumer}
          changingItem={changingItem}
          isOpen1={isOpen1}
          onClose1={onClose1}
        />
        <Text
          onPress={() => {
            // setLoader(true);
            onOpen();
          }}
          textDecorationLine={'underline'}
          color={'#5F84A2'}
          alignSelf={'center'}
          justifyContent={'center'}
          mt={'6%'}
          mb={'6%'}
        >
          Or Add New Consumer
        </Text>
        <AddNewConsumer
          loader={loader}
          setLoader={setLoader}
          setNewConsumer={setNewConsumer}
          isOpen={isOpen}
          onClose={onClose}
        />
        <Divider />
        {/* <Button
          onPress={() => {
            console.log(
              AppointmentStore.body.followupAppointmentId,
              'AppointmentStore.body.followupAppointmentId'
            );
          }}
        >
          Click me
        </Button> */}
        <View h={200} justifyContent={'center'} alignItems={'center'} mt={4}>
          <HStack mb={3}>
            <Checkbox
              p={1}
              onChange={() => {
                setFollowUpAppointment(!followUpAppointment);
                // followUpAppointmentHandler();
              }}
              accessibilityLabel="Follow Up Appointment"
              value={'followUpAppointment'}
            />
            <Text ml={'3%'} bottom={1} color={'#5F84A2'} fontSize={'sm'}>
              Follow Up Appointment
            </Text>
          </HStack>
          <Text
            fontSize={Platform.OS === 'ios' ? '2xs' : 'sm'}
            color={'muted.400'}
            mb={'3%'}
          >
            Please select prevouse appointment for the follow up
          </Text>
          {!followUpAppointment && (
            <Pressable
              h={'30%'}
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
                onOpen2();
              }}
              w={'100%'}
            >
              <Text fontSize={'xs'} color={'rgba(0,0,0,0.6)'} ml={3}>
                {selectFollowUpAppointment
                  ? selectFollowUpAppointment
                  : 'Please Select Follow Up Appointment'}
              </Text>
            </Pressable>
          )}
          <FollowUpAppointment
            getfollowUpAppointment={getfollowUpAppointment}
            isOpen2={isOpen2}
            onClose2={onClose2}
            setSelectFollowUpAppointment={setSelectFollowUpAppointment}
          />
        </View>
      </Box>
    </View>
  );
};

export default CreateAppointmentPage1;

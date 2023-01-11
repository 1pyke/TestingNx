import React, { useState } from 'react';
import { Divider, Text, View } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import Stepper from 'react-native-stepper-ui';
import CreateAppointmentPage1 from '../Components/CreateAppointment/CreateAppointmentPage1';
import CreateAppointmentPage2 from '../Components/CreateAppointment/CreateAppointmentPage2';
import CreateAppointmentPage3 from '../Components/CreateAppointment/CreateAppointmentPage3';
import CreateAppointmentPage4 from '../Components/CreateAppointment/CreateAppointmentPage4';
const { requestBuilder } = require('../../requestBuilder');

const MyComponent = (props) => {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
};
const CreateAppointments = () => {
  const [validation, setValidations] = useState(false);
  const appointmentStore = useSelector((state) => state.AppointmentStore);
  const CreateAppointment = async function createAppointment(params) {
    try {
      const result = await requestBuilder(
        '/appointments/createAppointment',
        appointmentStore.body
      );
      console.log(result, '?????????????????');
      // dispatch(closeModal4());
      // dispatch(closeModal6());
    } catch (error) {
      console.log(error);
    }
  };
  const navigation = useNavigation();
  const [active, setActive] = useState(0);
  const goBack = () => {
    setValidations(false);
    setActive((p) => p - 1);
  };
  const goNext = () => {
    if (validation === true) {
      setValidations(false);
      setActive((p) => p + 1);
    } else {
      console.log('secound', active);
    }
  };
  const content = [
    <CreateAppointmentPage1
      setValidations={setValidations}
      title="Component 1"
    />,
    <CreateAppointmentPage2
      setValidations={setValidations}
      title="Component 2"
    />,
    <CreateAppointmentPage3
      setValidations={setValidations}
      title="Component 3"
    />,
    <CreateAppointmentPage4
      setValidations={setValidations}
      title="Component 4"
    />,
  ];

  return (
    <View
      style={{
        backgroundColor: '#FFFAFA',
        width: '100%',
        position: 'relative',
        height: '100%',
        paddingLeft: '3%',
        paddingRight: '3%',
      }}
    >
      <Text alignSelf={'center'} color={'#194569'} fontSize={'lg'} mb={'3%'}>
        Create Appointment
      </Text>
      <Divider mb={'2%'} />
      <Stepper
        stepStyle={{
          backgroundColor: '#194569',
          width: 30,
          height: 30,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        active={active}
        content={content}
        onBack={goBack}
        onFinish={() => {
          navigation.navigate('AppointmenIndex');
          CreateAppointment();
        }}
        // showButton={validation}
        onNext={goNext}
        buttonStyle={{
          padding: 10,
          borderRadius: 4,
          marginTop: 5,
          alignSelf: 'flex-end',
          backgroundColor: '#5F84A2',
          width: '48%',
          marginHorizontal: 'auto',
          marginLeft: active === 0 ? '25%' : 0,
        }}
        buttonTextStyle={{ color: 'white', textAlign: 'center' }}
      />
    </View>
  );
};

export { CreateAppointments };
//atsdhasdyasdasdansnsnanaa,aa,,aiqnaosnainsaiiaiisms na,a,smsmsjhkajhkjhks msmmsmma,,,akksmms

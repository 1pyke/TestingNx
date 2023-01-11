import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  NativeBaseProvider,
} from 'native-base';
import { ottpFlagHandler } from '../store-CIAM';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { requestBuilder } from '../../../requestBuilder';

const Example = () => {
  const [otp, setOttp] = useState('');
  const [otpFlag, setotpFlag] = useState(false);
  const navigation = useNavigation();
  const ciamStore = useSelector((state) => state.ciamStore);
  const dispatch = useDispatch();

  async function ottpHandler() {
    try {
      const res = await axios(
        requestBuilder('ciam', '/otpverify/verifyotp', 'post', {
          otpcode: otp,
          mobile: ciamStore.ottpPhone,
        })
      );
      dispatch(ottpFlagHandler());
      navigation.navigate('SignIn');
    } catch (error) {
      setotpFlag(true);
    }
  }

  return (
    <Center>
      <Modal
        isOpen={ciamStore.ottpFlag}
        onClose={() => dispatch(ottpFlagHandler())}
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Email Verification</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Enter The OTTP</FormControl.Label>
              <Input onChangeText={(value) => setOttp(value)} />
            </FormControl>
            {otpFlag && (
              <Text style={{ color: 'red' }}>Please Enter a valid OTP</Text>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  dispatch(ottpFlagHandler());
                }}
              >
                Cancel
              </Button>
              <Button onPress={() => ottpHandler()}>Enter</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};

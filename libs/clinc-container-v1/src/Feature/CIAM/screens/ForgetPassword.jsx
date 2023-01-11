import React, { useState } from 'react';
import {
  Input,
  KeyboardAvoidingView,
  Text,
  Button,
  VStack,
  Heading,
  Center,
  NativeBaseProvider,
  View,
} from 'native-base';
import { Platform } from 'react-native';
import axios from 'axios';
import { requestBuilder } from '../../../requestBuilder';

const ForgetPass = ({ navigation }) => {
  const [phoneNumber, setphoneNumber] = useState('');
  async function forgetHandler() {
    try {
      await axios(
        requestBuilder(
          'ciam',
          '/users/forgetPasswordbyid/6f818474-dc8e-40d0-b5ca-b5fb5c58bc17',
          'post',
          { phone: phoneNumber }
        )
      ).then((results) => console.log('resultsresults', results));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View>
      <KeyboardAvoidingView
        h={{
          base: '200px',
          lg: 'auto',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Center>
          <VStack flex="1" justifyContent="flex-end" w="100%" maxW="300">
            <Heading mb="3">Forgot Password</Heading>
            <Text color="muted.400">
              Not to worry! Enter your mobile number associated with your
              account and we’ll send a OTP to reset your password.{' '}
              <Button onPress={navigation.navigate('SignIn')}>
                loging page name
              </Button>
            </Text>
            <Input
              onChangeText={(value) => setphoneNumber(value)}
              placeholder="Phone Number"
              mt="10"
              mb="4"
            />
            <Button
              onPress={() => forgetHandler()}
              style={{ backgroundColor: 'teal' }}
              mb="4"
            >
              Proceed
            </Button>
          </VStack>
        </Center>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgetPass;

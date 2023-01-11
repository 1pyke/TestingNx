import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  NativeBaseProvider,
} from 'native-base';
import axios from 'axios';
import { Text, View } from 'react-native';
import { ottpFlagHandler, ottpPhoneHandler } from '../store-CIAM';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = ({ navigation }) => {
  function requestBuilder(serviceName, path, method, data) {
    try {
      let json = {
        method: 'POST',
        url: 'https://api.development.agentsoncloud.com/external/public',
        headers: {
          'requsted-service': serviceName,
          'requsted-path': path,
          'requsted-method': method,
        },
        data: data,
      };
      return json;
    } catch (error) {
      return error;
    }
  }
  const dispatch = useDispatch();
  const [userObj, setUserObj] = useState({
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    isActive: 1,
    profileType: 'provider',
  });
  useEffect(() => {
    console.log('userObjuserObjuserObj', userObj);
  }, [userObj]);

  const signUpHandler = async () => {
    try {
      // dispatch(ottpPhoneHandler(userObj.mobile.slice(1,userObj.mobile.length)))
      await axios(requestBuilder('ciam', '/v1/users', 'post', userObj)).then(
        (results) => console.log('ddddddddd', results)
      );
      // dispatch(ottpFlagHandler())
    } catch (error) {
      console.log('gggggggg', error);
    }
  };

  return (
    <View style={{ backgroundColor: '#FFFAFA' }}>
      <Center h="100%">
        <Box w="90%" maxW="290" mb={'5%'}>
          <Heading
            size="lg"
            color="#5F84A2"
            _dark={{
              color: '#194569',
            }}
            fontWeight="semibold"
          >
            Laser Avenue
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}
            fontWeight="medium"
            size="xs"
          >
            Sign up to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <View style={{ flexDirection: 'row', width: '100%' }}>
                {/* <FormControl.Label></FormControl.Label> */}
                <Input
                  w={130}
                  placeholder="First Name"
                  onChangeText={(value) =>
                    setUserObj({ ...userObj, firstName: value })
                  }
                />
                {/* <FormControl.Label>Middle Name</FormControl.Label> */}
                <Input
                  ml={5}
                  w={130}
                  placeholder="Middle Name"
                  onChangeText={(value) =>
                    setUserObj({ ...userObj, middleName: value })
                  }
                />
              </View>
              <FormControl.Label>Last Name</FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setUserObj({ ...userObj, lastName: value })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setUserObj({ ...userObj, email: value })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input
                placeholder=" "
                width="100%"
                borderRadius="4"
                py="3"
                px="1"
                fontSize={14}
                InputLeftElement={<Text>+962</Text>}
                onChangeText={(value) =>
                  setUserObj({ ...userObj, phoneNumber: `962${value}` })
                }
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                onChangeText={(value) =>
                  setUserObj({ ...userObj, password: value })
                }
                type="password"
              />
            </FormControl>

            <Center>
              <Button
                onPress={() => signUpHandler()}
                w="130"
                mt="2"
                style={{ backgroundColor: 'rgba(25, 69, 105, 1)' }}
              >
                Sign up
              </Button>
            </Center>
          </VStack>
        </Box>
      </Center>
    </View>
  );
};
export default SignUp;

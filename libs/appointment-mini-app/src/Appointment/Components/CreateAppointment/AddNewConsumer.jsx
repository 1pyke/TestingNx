import React, { useEffect, useRef, useState } from 'react';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  Text,
  Input,
  VStack,
  ScrollView,
  Divider,
  HStack,
  Select,
  CheckIcon,
  View,
  Spinner,
  Heading,
} from 'native-base';
import { KeyboardAvoidingView } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
const { requestBuilder } = require('../../../requestBuilder');

function AddNewConsumer({
  isOpen,
  onClose,
  setNewConsumer,
  loader,
  setLoader,
}) {
  useEffect(() => {
    async function getProviders() {
      try {
        // setLoader(true);
        const result = await requestBuilder('/lookups/getAllGenders');
        setGender(result.data);
        // setLoader(false);
      } catch (error) {
        console.log(error);
      }
    }
    getProviders();
  }, []);
  const [value, setValue] = useState('');
  const phoneInput = useRef(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState([]);
  const [selectedGender, setSelectedGender] = React.useState();
  const [selectedGenderObj, setSelectedGenderObj] = React.useState();
  const [addNewConsumer, setAddNewConsumer] = useState({
    firstName: {
      ar: '',
      en: '',
    },
    lastName: {
      ar: '',
      en: '',
    },
    dob: '',
    gender: {
      id: '',
      name: {
        ar: '',
        en: '',
      },
    },
    primaryPhone: {
      number: '776667657',
      country_code: '962',
      whatsappPrimary: false,
    },
    email: '',
  });
  const [formattedValue, setFormattedValue] = useState('');
  const [consumerDetails, setConsumerDetails] = useState([
    {
      Name: 'First Name :',
      id: 1,
    },
    {
      Name: 'Last Name :',
      id: 2,
    },
  ]);
  const handelCreateConsumer = async () => {
    try {
      setLoader(true);
      const result = await requestBuilder(
        '/consumers/profile/createProfile',
        addNewConsumer
      );
      setNewConsumer(result.data);
      console.log(result, '?????????????????');
      setLoader(false);
    } catch (error) {
      console.log('?????????????????');
      console.log(error);
    }
  };
  return (
    <Center>
      {loader && (
        <View alignItems={'center'} justifyContent={'center'}>
          <Spinner accessibilityLabel="Loading posts" />
          <Heading alignSelf={'center'} color="#5F84A2" fontSize="md">
            Loading
          </Heading>
        </View>
      )}
      {loader === false && (
        <ScrollView>
          <Actionsheet
            h={'100%'}
            isOpen={isOpen}
            onClose={onClose}
            hideDragIndicator
          >
            <KeyboardAvoidingView behavior="position" enabled>
              <Actionsheet.Content w={'100%'}>
                <Box
                  w={'100%'}
                  h={60}
                  px={4}
                  justifyContent="center"
                  alignItems={'center'}
                >
                  <Text fontSize={16} color="#194569">
                    Create Consumer
                  </Text>
                </Box>
                {consumerDetails.map((item, i) => (
                  <VStack
                    key={i}
                    justifyContent={'flex-start'}
                    alignItems={'flex-start'}
                  >
                    <Text mb={'3%'} color={'#5F84A2'} fontSize={'md'}>
                      {item.Name}
                    </Text>
                    <Input
                      onChangeText={(text) => {
                        item.id === 1 ? setFirstName(text) : setLastName(text);
                        let zz = Object.assign(
                          {},
                          {
                            ...addNewConsumer,
                            firstName: {
                              ar: '',
                              en: firstName,
                            },
                            lastName: {
                              ar: '',
                              en: lastName,
                            },
                          }
                        );
                        setAddNewConsumer(zz);
                      }}
                      textAlign={'left'}
                      variant="rounded"
                      placeholder={item.Name}
                      mb={'5%'}
                    />
                  </VStack>
                ))}
                <VStack
                  mb={'3%'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-start'}
                >
                  <Text color={'#5F84A2'} fontSize={'md'}>
                    Gender :
                  </Text>
                  <Select
                    selectedValue={selectedGenderObj}
                    minWidth="400"
                    w={'100%'}
                    accessibilityLabel="Choose Gender"
                    placeholder="Choose Gender"
                    _selectedItem={{
                      bg: '#5F84A2',
                      endIcon: <CheckIcon size="5" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => {
                      setSelectedGender(itemValue);
                      // console.log(itemValue, 'itemValueitemValue');
                      setSelectedGenderObj(gender?.rows[itemValue]);
                      let zz = Object.assign(
                        {},
                        { ...addNewConsumer, gender: gender?.rows[itemValue] }
                      );
                      // console.log(zz);
                      setAddNewConsumer(zz);
                    }}
                  >
                    {gender?.rows?.map((gender, i) => (
                      <Select.Item key={i} label={gender.name.en} value={i} />
                    ))}
                  </Select>
                </VStack>
                <Text
                  mb={'3%'}
                  alignSelf={'flex-start'}
                  color={'#5F84A2'}
                  fontSize={'md'}
                >
                  Phone Number :
                </Text>
                <VStack
                  ml={'4%'}
                  mb={'3%'}
                  justifyContent={'flex-start'}
                  alignItems={'flex-start'}
                >
                  {/* <KeyboardAvoidingView
                style={{ width: '100%' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              > */}
                  <PhoneInput
                    codeTextStyle={{ color: '#5F84A2' }}
                    textInputStyle={{ color: '#5F84A2' }}
                    textInputProps={{ color: '#5F84A2' }}
                    containerStyle={{
                      width: '100%',
                      backgroundColor: 'transparent',
                      elevation: 0,
                      borderWidth: 1,
                      borderColor: 'rgba(0,0,0,0.3)',
                      borderTopEndRadius: 20,
                      borderBottomEndRadius: 20,
                      borderTopLeftRadius: 20,
                      // borderBottomLeftRadius: 20,
                    }}
                    textContainerStyle={{
                      backgroundColor: 'transparent',
                      elevation: 0,
                      borderTopEndRadius: 20,
                      borderBottomEndRadius: 20,
                    }}
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="JO"
                    layout="first"
                    onChangeText={(text) => {
                      setValue(text);
                      console.warn('text: ', text);
                    }}
                    onChangeFormattedText={(text) => {
                      console.warn(
                        'formated text: ',
                        text,
                        phoneInput.current?.isValidNumber(value),
                        phoneInput.current?.getCountryCode(value),
                        phoneInput.current?.getCallingCode(value)
                      );
                      setFormattedValue(text);
                    }}
                    withDarkTheme
                    withShadow
                  />
                  {/* {'phone' in errors ? <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage> : null} */}
                  {/* </KeyboardAvoidingView> */}
                </VStack>
                <HStack>
                  <Divider my={3} />
                </HStack>
                <VStack width={330}>
                  <Button
                    onPress={() => {
                      handelCreateConsumer();
                      onClose();
                    }}
                    bg={'#5F84A2'}
                    mb={'5%'}
                  >
                    Create
                  </Button>
                  <Button
                    onPress={() => {
                      onClose();
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </VStack>
              </Actionsheet.Content>
            </KeyboardAvoidingView>
          </Actionsheet>
        </ScrollView>
      )}
    </Center>
  );
}
export default AddNewConsumer;

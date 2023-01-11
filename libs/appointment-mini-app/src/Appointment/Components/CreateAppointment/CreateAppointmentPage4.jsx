import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  Text,
  Divider,
  HStack,
  VStack,
  TextArea,
  Radio,
  Input,
  Icon,
  Image,
  Button,
  ScrollView,
  Collapse,
  IconButton,
  CloseIcon,
  Box,
  Alert,
} from 'native-base';
import { Images } from '../../../../../clinc-container-v1/src/constants/index';
import React, { useEffect, useState } from 'react';
import { setNewAppointment } from '../../store-Appointment';
import { useDispatch, useSelector } from 'react-redux';
import { Platform } from 'react-native';
const { requestBuilder } = require('../../../requestBuilder');
const CreateAppointmentPage4 = ({ setValidations }) => {
  useEffect(() => {
    async function getAppointmentPriority() {
      try {
        setValidations(true);
        const result = await requestBuilder('/lookups/getAllPriorities');
        setPriority(result.data.rows);
        // dispacth(
        //   setNewAppointment({
        //     name: 'status',
        //     value: result.data.appointment_status[0],
        //   })
        // );
      } catch (error) {
        console.log(error);
      }
    }
    getAppointmentPriority();
  }, []);
  const dispatch = useDispatch();
  const AppointmentStore = useSelector((state) => state.AppointmentStore);
  const [getVoucher, setVoucher] = useState();
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [getPriority, setPriority] = useState();
  const [textArea, setTextArea] = useState('');
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('one');
  const [colorValue, setColoeValue] = useState(false);
  const [colorValue1, setColoeValue1] = useState(false);
  const [colorValue2, setColoeValue2] = useState(false);
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const voucherHnadler = async () => {
    try {
      setLoading(true);
      setShow(false);
      setShow2(false);
      const servicesArr = [];
      AppointmentStore.body.services.map((serviceName) =>
        servicesArr.push(serviceName.serviceName.id)
      );
      const voucher = await requestBuilder(
        '/voucher/issuedVoucher/reedumptionValidation',
        {
          qrCode: promoCode,
          date: AppointmentStore.body.date,
          time: AppointmentStore.body.timeFrom,
          consumerNumber: AppointmentStore.body.consumer.primaryPhone.number,
          providerId: AppointmentStore.body.provider.id,
          servicesId: servicesArr,
        }
      );
      console.log(AppointmentStore.body.facility, 'facilityfacility');
      if (voucher.data.valid === false) {
        setShow(true);
        setShow2(false);
        setVoucher(voucher.data.response);
      }
      if (voucher.data.valid === true) {
        setShow(false);
        setShow2(true);
        dispatch(
          setNewAppointment({
            name: 'voucher',
            value: voucher.data.response,
          })
        );
      }
      setLoading(false);
      // console.log(voucher.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };
  const changingColor = (n) => {
    setColoeValue(n);
    setColoeValue1(false);
    setColoeValue2(false);
  };
  const textAreaHnadler = (text) => {
    setTextArea(text);
    dispatch(
      setNewAppointment({
        name: 'notes',
        value: textArea,
      })
    );
  };
  const priorty = (nextValue, i) => {
    setValue(nextValue);
    dispatch(
      setNewAppointment({
        name: 'priority',
        value: nextValue,
      })
    );
  };
  const appointmentSettings = (text) => {
    changingColor(!colorValue);
    dispatch(
      setNewAppointment({
        name: 'priority',
        value: text,
      })
    );
  };
  const changingColor1 = (n) => {
    setColoeValue1(n);
    setColoeValue(false);
    setColoeValue2(false);
  };
  const changingColor2 = (n) => {
    setColoeValue2(n);
    setColoeValue1(false);
    setColoeValue(false);
  };

  return (
    <ScrollView h={Platform.OS === 'ios' ? 550 : 480}>
      <View>
        <View mt={'2%'} justifyContent={'center'} alignItems={'center'}>
          <Text fontSize={'md'} color={'#194569'}>
            Note And Priorty
          </Text>
          <Divider my={'3%'} />
        </View>
        <VStack ml={'3%'} mb={'10%'}>
          <Text fontSize={'sm'} mb={'3%'} color={'#5F84A2'}>
            Note
          </Text>
          <TextArea
            value={textArea}
            onChangeText={textAreaHnadler}
            h={110}
            mb={'5%'}
          />
          <Text mb={3} color={'#5F84A2'}>
            Promo Code
          </Text>
          <Input
            isDisabled={loading}
            onChangeText={(text) => {
              setPromoCode(text);
            }}
            mb={'5%'}
            py={3}
            variant="rounded"
            textAlign={'left'}
            placeholder="Enter Promo Code"
          />
          {promoCode ? (
            <View>
              <Collapse isOpen={show}>
                <Alert maxW="400" status="error">
                  <VStack space={1} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text
                          fontSize="md"
                          fontWeight="medium"
                          _dark={{
                            color: 'coolGray.800',
                          }}
                        >
                          Please try again !
                        </Text>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        _focus={{
                          borderWidth: 0,
                        }}
                        icon={<CloseIcon size="3" />}
                        _icon={{
                          color: 'coolGray.600',
                        }}
                        onPress={() => setShow(!show)}
                      />
                    </HStack>
                    <Box
                      pl="6"
                      _dark={{
                        _text: {
                          color: 'coolGray.600',
                        },
                      }}
                    >
                      {getVoucher}
                    </Box>
                  </VStack>
                </Alert>
              </Collapse>
              <Collapse isOpen={show2}>
                <VStack space={5} maxW="400">
                  <Alert w="100%" status="success">
                    <VStack space={2} flexShrink={1} w="100%">
                      <HStack
                        flexShrink={1}
                        space={1}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <HStack space={2} flexShrink={1} alignItems="center">
                          <Alert.Icon />
                          <Text
                            fontSize="md"
                            fontWeight="medium"
                            _dark={{
                              color: 'coolGray.800',
                            }}
                          >
                            Valid Promo Code
                          </Text>
                        </HStack>
                        <IconButton
                          onPress={() => setShow2(!show2)}
                          variant="unstyled"
                          _focus={{
                            borderWidth: 0,
                          }}
                          icon={<CloseIcon size="3" />}
                          _icon={{
                            color: 'coolGray.600',
                          }}
                        />
                      </HStack>
                      <Box
                        pl="6"
                        _dark={{
                          _text: {
                            color: 'coolGray.600',
                          },
                        }}
                      >
                        This Promo Code Is valid for this consumer and Provider
                      </Box>
                    </VStack>
                  </Alert>
                </VStack>
              </Collapse>
              <Button
                mb={5}
                onPress={voucherHnadler}
                bg={'#5F84A2'}
                _loading={{
                  bg: '#5F84A2',
                  _text: {
                    color: 'amber.400:alpha.70',
                  },
                }}
                _spinner={{
                  color: 'amber.400:alpha.70',
                }}
                isLoading={loading}
                isLoadingText="Checking Code"
              >
                Cheack Code
              </Button>
            </View>
          ) : null}
          <Text fontSize={'sm'} mb={'3%'} color={'#5F84A2'}>
            Priorty
          </Text>
          <Radio.Group
            mb={'10%'}
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={(nextValue, i) => {
              priorty(nextValue, i);
            }}
            size="lg"
          >
            <HStack mb={'2%'} space={'15%'}>
              {getPriority?.map((priority, i) => (
                <Radio
                  key={i}
                  colorScheme={
                    priority.name.en === 'High'
                      ? 'red'
                      : priority.name.en === 'Low'
                      ? 'green'
                      : 'blue'
                  }
                  value={priority}
                  my={1}
                >
                  <Text
                    color={
                      priority.name.en === 'High'
                        ? 'red.500'
                        : priority.name.en === 'Low'
                        ? 'green.500'
                        : 'blue.500'
                    }
                  >
                    {priority.name.en}
                  </Text>
                </Radio>
              ))}
            </HStack>
            <Text fontSize={'sm'} mb={'2%'} color={'#5F84A2'}>
              Appointment Settings
            </Text>
            <HStack mt={'2%'}>
              <Input
                onPressIn={() => {
                  changingColor(!colorValue);
                }}
                borderColor={colorValue === true ? 'blue.500' : 'gray.300'}
                borderWidth={2}
                ml={'2%'}
                isReadOnly
                placeholderTextColor={
                  colorValue === true ? 'blue.500' : 'gray.400'
                }
                placeholder="Onsite"
                textAlign={'center'}
                w={'30%'}
                py={'10%'}
              />
              <Image
                zIndex={99}
                top={-35}
                left={150}
                position={'absolute'}
                source={Images.ComingSoon}
                alt="Alternate Text"
                size={100}
                w={'55%'}
              />
              <Input
                borderColor={colorValue1 === true ? 'blue.500' : 'gray.300'}
                borderWidth={2}
                onPressIn={() => {
                  changingColor1(!colorValue1);
                }}
                isReadOnly
                placeholderTextColor={
                  colorValue1 === true ? 'blue.500' : 'gray.400'
                }
                placeholder="Online"
                textAlign={'center'}
                ml={'3%'}
                w={'30%'}
              />
              <Input
                borderColor={colorValue2 === true ? 'blue.500' : 'gray.300'}
                borderWidth={2}
                onPressIn={() => {
                  changingColor2(!colorValue2);
                }}
                isReadOnly
                placeholderTextColor={
                  colorValue2 === true ? 'blue.500' : 'gray.400'
                }
                placeholder="Offshore"
                textAlign={'center'}
                ml={'3%'}
                w={'30%'}
              />
            </HStack>
          </Radio.Group>
          <Text fontSize={'sm'} mb={'3%'} color={'#5F84A2'}>
            Booking Through
          </Text>
          <Radio.Group
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value1}
            onChange={(nextValue) => {
              setValue1(nextValue);
            }}
            size="lg"
          >
            <HStack space={'11%'}>
              <Radio
                icon={<Icon as={<MaterialCommunityIcons name="phone" />} />}
                colorScheme="blue"
                value="Call"
                my={1}
              >
                <Text color={'#5F84A2'}>Call</Text>
              </Radio>
              <Radio
                icon={<Icon as={<MaterialCommunityIcons name="walk" />} />}
                colorScheme="green"
                value="Walkin"
                my={1}
              >
                <Text color={'#5F84A2'}>Walk in</Text>
              </Radio>
              <Radio
                icon={
                  <Icon
                    as={
                      <MaterialCommunityIcons name="account-convert-outline" />
                    }
                  />
                }
                colorScheme="red"
                value="ByReferral"
                my={1}
              >
                <Text color={'#5F84A2'}>By Referral</Text>
              </Radio>
            </HStack>
          </Radio.Group>
        </VStack>
      </View>
    </ScrollView>
  );
};
export default CreateAppointmentPage4;

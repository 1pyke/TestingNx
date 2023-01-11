import React, { useRef, useState } from 'react';
import {
  Button,
  View,
  FormControl,
  Input,
  VStack,
  Stack,
  KeyboardAvoidingView,
  Text,
  HStack,
  Spinner,
} from 'native-base';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { laserAvenue } from '../../../Constants/index';
import {
  validateGenerateVoucher,
  generateVoucher,
} from '../../../services/service';
import ConfirmationAlert from './ConfirmationAlert';
import { useDispatch, useSelector } from 'react-redux';

const CreateVoucher = ({ remaning, template, setRemaining, subject }) => {
  const authStore = useSelector((state) => state.AuthStore);
  const dispatch = useDispatch();

  const [statusRecived, setStatusRecived] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errorState, setErrorState] = useState('');
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  // title and description for confirmation alert
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const phoneInput = useRef(null);
  const onClose = () => setIsOpen(false);
  const validate = () => {
    if (formData.name === undefined) {
      setErrors({
        ...errors,
        name: 'Name is required',
      });
      return false;
    }
    if (value === undefined) {
      setErrors({
        ...errors,
        phone: 'phone is required',
      });
      return false;
    } else if (!phoneInput.current?.isValidNumber(value)) {
      setErrors({
        ...errors,
        phone: 'please enter valid number',
      });
      return false;
    }

    return true;
  };

  // this function to check if  is valid to generate a voucher to this consumer
  const isValidGenerate = async () => {
    try {
      setLoading(true);
      await validateGenerateVoucher(
        {
          vmcMtVoucherTemplateId: template.id,
          consumer: {
            name: {
              en: formData.name,
              ar: '',
            },
            number: {
              number: value,
              countryCode: phoneInput.current?.getCallingCode(value),
              countryCallingCode: phoneInput?.current?.state?.countryCode,
            },
          },
          owners: [authStore.user.establishment.id],
          creator: {
            id: authStore.user.id,
            name: authStore.user.name,
            image: authStore.user.image,
            establishment: authStore.user.establishment,
          },
        },
        setLoading
      );
      setTitle('Valid!');
      setDesc('You can generate a Voucher');
      setIsValid(true);
      setLoading(false);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
      setData({ name: '', phone: '' });
      phoneInput.current?.setState({ number: 0 });
      setStatusRecived('error');
      setIsOpen(true);
      setErrorState(error.response.data.message);
      setLoading(false);
    }
  };

  const generateNewVoucher = async () => {
    try {
      setLoading(true);
      let payload = {
        vmcMtVoucherTemplateId: template.id,
        consumer: {
          name: {
            en: formData.name,
            ar: '',
          },
          number: {
            number: value,
            countryCode: phoneInput.current?.getCallingCode(value),
            countryCallingCode: phoneInput?.current?.state?.countryCode,
          },
        },
        qrCode: '',
        qrImage: '',
        endDate: template.reedemptionEndDate,
        reedemptionStartDate: template.reedemptionStartDate,
        restricted: template.restricted,
        owners: [authStore.user.establishment.id],
        useDays: template.useDays,
        creator: {
          id: authStore.user.id,
          name: authStore.user.name,
          image: authStore.user.image,
          establishment: authStore.user.establishment,
        },
        status: {
          id: '1',
          name: {
            ar: 'New',
            en: 'New',
          },
        },
        createdBy: {
          user: { id: '123', name: { ar: 'xxx', en: 'xxx' } },
          system: 'xxx',
          channel: 'xxx',
        },
      };
      await generateVoucher(
        payload,
        remaning,
        setRemaining,
        setLoading,
        setStatusRecived,
        dispatch
      );
      setTitle('Voucher received!');
      setDesc('Voucher Generated Successfully');
      setSent(true);
      setLoading(false);
      setIsValid(false);
      setIsOpen(true);
    } catch (error) {
      setLoading(false);

      setStatusRecived('error');
      setIsValid(false);
      setIsOpen(true);
      setErrorState(error.response.data.message);
      console.error(error);
    }
  };

  const onSubmit = async () => {
    try {
      if (validate()) {
        setErrors({});

        if (remaning > 0 && !isValid) {
          isValidGenerate();
        } else if (remaning > 0 && isValid) {
          generateNewVoucher();
          setData({ name: '', phone: '' });
          phoneInput.current?.setState({ number: 0 });
          setValue('');
          setFormattedValue('');
        }
      }
    } catch (error) {
      setStatusRecived('error');
      setIsOpen(true);
      setErrorState(error.response.data.message);
      setLoading(false);
      console.error(error, 'error create', error.response.data);
    }
  };

  return (
    <View avoidKeyboard>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <VStack space="2.5" mt="4" px="8">
            <Stack direction="row" mb="2.5" mt="1.5" space={1}>
              <FormControl isRequired isInvalid={'name' in errors}>
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChangeText={(value) =>
                    setData({
                      ...formData,
                      name: value,
                    })
                  }
                />
                {'name' in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.name}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
            </Stack>
            <Stack avoidKeyboard direction="row" space={1}>
              <FormControl isRequired isInvalid={'phone' in errors}>
                <PhoneInput
                  codeTextStyle={{ color: '#5F84A2' }}
                  textInputStyle={{ color: '#5F84A2' }}
                  containerStyle={{
                    backgroundColor: 'white',
                    elevation: 0,
                    borderTopEndRadius: 5,
                    borderBottomEndRadius: 5,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}
                  textContainerStyle={{
                    backgroundColor: 'white',
                    elevation: 0,
                    width: '100%',
                    minWidth: '75%',
                    borderTopEndRadius: 5,
                    borderBottomEndRadius: 5,
                  }}
                  ref={phoneInput}
                  defaultValue={value}
                  defaultCode="JO"
                  layout="first"
                  onChangeText={(text) => {
                    setValue(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                  }}
                  withDarkTheme
                  withShadow
                />
                {'phone' in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.phone}
                  </FormControl.ErrorMessage>
                ) : null}
              </FormControl>
            </Stack>
            <Button
              isDisabled={remaning === 0 || loading}
              onPress={onSubmit}
              mt="5"
              style={styles.btnContainer}
            >
              {!loading ? (
                <HStack>
                  {isValid ? (
                    <Text color={laserAvenue.blue1} bold>
                      Generate Voucher
                    </Text>
                  ) : (
                    <Text color={laserAvenue.blue1} bold>
                      Check Is Valid
                    </Text>
                  )}

                  <Text color="#D14124" mx="4">
                    {remaning} Remaning
                  </Text>
                </HStack>
              ) : (
                <Spinner color="warning.500" />
              )}
            </Button>
            <ConfirmationAlert
              title={title}
              desc={desc}
              isOpen={isOpen}
              onClose={onClose}
              statusRecived={statusRecived}
              errorState={errorState}
            />
            {/* <QrCode modalVisible={modalVisible} setModalVisible={setModalVisible} payload={payload} remaning={remaning} setRemaining={setRemaining} subject={subject} /> */}
          </VStack>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: '#FABB18',

    marginTop: 12,
  },
});
export default CreateVoucher;

import React, { useRef, useState } from "react";
import { Button, Modal, FormControl, Input, Stack } from "native-base";
import PhoneInput from "react-native-phone-number-input";
import { StyleSheet } from 'react-native';
import { updateIssuedVoucher } from '../../../../services/service'
import { useDispatch, useSelector } from "react-redux";

const EditNumberModal = ({ modalVisible, setModalVisible, voucher }) => {

  const dispatch = useDispatch();
  const authStore = useSelector((state) => state.AuthStore);

  const [value, setValue] = useState(voucher.consumer.number.number);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const phoneInput = useRef(null);
  // console.log(voucher.consumer);
  const validate = () => {

    if (value === undefined) {
      setErrors({
        ...errors,
        phone: 'phone is required'
      });
      return false;
    } else if (!phoneInput.current?.isValidNumber(value)) {
      setErrors({
        ...errors,
        phone: 'please enter valid number'
      });
      return false;
    }

    return true;
  };

  const handleUpdateNumber = async () => {
    try {
      if (validate()) {
        let consumer = {
          name: voucher.consumer.name,
          number: {
            countryCode: phoneInput.current?.getCallingCode(value),
            number: value,
            countryCallingCode: phoneInput?.current?.state?.countryCode
          }
        };
        let payload = {
          owners: [authStore.user.establishment.id],
          id: voucher.id,
          vmcMtVoucherTemplateId: voucher.vmcMtVoucherTemplateId,
          consumer,
          seq: voucher.seq,
          update: true
        }
        // console.log('hi');
        setLoading(true);
        await updateIssuedVoucher(payload, dispatch);
        setLoading(false);
        setModalVisible(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  return (

    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard size="lg" style={styles.container}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Edit Phone Number</Modal.Header>
        <Modal.Body>

          <FormControl mt="3">
            {/* <FormControl.Label>Name</FormControl.Label> */}
            <Input value={voucher?.consumer?.name?.en || voucher?.consumer?.name?.ar} isReadOnly={true} />
          </FormControl>
          <Stack direction="row" space={1}>
            <FormControl my={2} isRequired isInvalid={'phone' in errors}>

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
                  borderTopEndRadius: 5,
                  borderBottomEndRadius: 5,
                  width: '50%',
                  minWidth: '10%'
                }}
                ref={phoneInput}
                defaultValue={value}
                defaultCode="JO"
                layout="first"
                onChangeText={(text) => {
                  setValue(text);
                }}
                // onChangeFormattedText={(text) => {
                //   setFormattedValue(text);
                // }}
                withDarkTheme
                withShadow

              />
              {'phone' in errors ? <FormControl.ErrorMessage>{errors.phone}</FormControl.ErrorMessage> : null}
            </FormControl>
          </Stack>


        </Modal.Body>
        <Modal.Footer>
          <Button flex="1" onPress={handleUpdateNumber} isLoading={loading} isLoadingText="Updatting">
            Edit Number
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default EditNumberModal;
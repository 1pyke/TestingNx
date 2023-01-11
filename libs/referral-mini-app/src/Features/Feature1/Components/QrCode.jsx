import { Linking, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, Center, HStack, Image, Modal, ScrollView, Spinner } from 'native-base';
import GeneratedVoucher from './history/GeneratedVoucher';
import { FontAwesome5, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { generateVoucher } from '../../../services/service';
import ConfirmationAlert from './ConfirmationAlert';
import { useDispatch } from 'react-redux';
import { Platform } from 'react-native';

const QrCode = ({ modalVisible, setModalVisible, payload, remaning, setRemaining, subject }) => {

  const [loading, setLoading] = useState(false);
  const [statusRecived, setStatusRecived] = useState('');
  const [errorState, setErrorState] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const onClose = () => setIsOpen(false);
  const dispatch = useDispatch();

  const onCancel = () => {
    try {
      setModalVisible(false)
      setSent(false)
    } catch (error) {
      console.log(error)
    }
  }



  const onSend = async () => {
    try {
      setLoading(true)
      await generateVoucher(payload, remaning, setRemaining, setLoading, setStatusRecived, dispatch)
      setSent(true)
      // setModalVisible(false);
      setIsOpen(true)

    } catch (error) {
      setStatusRecived('error')
      setIsOpen(true)
      setErrorState(error.response.data.message)
      console.error(error)
    }
  }

  const sendWhatsApp = () => {
    let msg = `Hello ${payload.consumer.name.en} your QRcode  ${payload.qrCode} is valid until ${payload.endDate} , link is : ${payload.qrImage} `;
    let phoneWithCountryCode = payload.consumer.number.countryCode + payload.consumer.number.number;

    let mobile =
      Platform.OS === "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
        Linking.openURL(url)
          .then(data => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");
          });
      } else {
        alert("Please insert message to send");
      }
    } else {
      alert("Please insert mobile no");
    }
  };

  return <>
    <Modal isOpen={modalVisible} onClose={onCancel} size={'lg'}  >
      <Modal.Content maxH="75%">
        <Modal.CloseButton />
        <Modal.Header>Generated QrCode</Modal.Header>
        <Modal.Body >
          <ScrollView >
            <GeneratedVoucher subject={subject} voucher={payload} sendQr={true} />
            <Center>
              <Image resizeMode={'cover'} rounded="lg" my="1"
                style={{ width: '60%', height: 130 }} source={{ uri: payload.qrImage }} alt="Alternate Text" />
            </Center>
            {sent ? <Center>
              <HStack mx="5" mt="3">
                <Text style={{ marginHorizontal: 5 }}>Share Via</Text>
                <FontAwesome5 name="whatsapp" onPress={sendWhatsApp} style={{ marginHorizontal: 5 }} size={20} color="green" />
                <FontAwesome name="instagram" style={{ marginHorizontal: 5 }} size={20} color="#FF828B" />
                <MaterialIcons name="facebook" style={{ marginHorizontal: 5 }} size={20} color="blue" />
              </HStack>
            </Center>
              : null
            }
          </ScrollView>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onCancel}>
              Cancel
            </Button>
            <Button onPress={onSend} isDisabled={loading || sent}>
              {!loading ?
                "Send"
                :
                <Spinner color="warning.500" />
              }
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>

    <ConfirmationAlert isOpen={isOpen} onClose={onClose} statusRecived={statusRecived} errorState={errorState} />
  </>;
}

export default QrCode


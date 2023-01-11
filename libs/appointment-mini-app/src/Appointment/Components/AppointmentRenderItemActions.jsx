import React, { useEffect, useState } from 'react';
import {
  Icon,
  IconButton,
  View,
  Text,
  Actionsheet,
  useDisclose,
  Divider,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CalendarCardsModal from './CalendarCardsModal';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CancelAppointment from './CreateAppointment/CancelAppointment';
import ConfirmAppointment from './CreateAppointment/ConfirmAppointment';
import * as ImagePicker from 'expo-image-picker';
const { requestBuilder } = require('../../requestBuilder');

const AppointmentRenderItemActions = ({ appointmentDetails }) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalVisible2, setModalVisible2] = React.useState(false);
  const [SelectedAppointment, setSelectedAppointment] = React.useState();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclose();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [image, setImage] = useState(null);
  const [modalItems, setModalItems] = useState([
    {
      ActionName: 'Confirm',
      navigation: 'ConfirmAppointment',
    },
    {
      ActionName: 'Manage Appointment Details',
      navigation: 'AppointmentDetails',
    },
    {
      ActionName: 'Cancel appointment',
      navigation: 'CancelAppointment',
    },
    {
      ActionName: 'Upload Photo of Attachment',
      navigation: 'UploadPhoto',
    },
    {
      ActionName: 'Take Photo Before',
    },
    {
      ActionName: 'Take Photo After',
    },
    // {
    //   ActionName: 'Add appointment to bookmarks',
    // },
  ]);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const [getStatus, setGetStatus] = useState();
  useEffect(() => {
    async function getAppointmentSettings() {
      try {
        const result = await requestBuilder(
          '/appointments/settings/getSettings'
        );
        setGetStatus(result.data.appointment_status);
      } catch (error) {
        console.log(error);
      }
    }
    getAppointmentSettings();
  }, []);
  return (
    <View mt={'4%'}>
      <View justifyContent={'flex-end'} alignItems={'flex-end'}>
        <IconButton
          onPress={onOpen1}
          justifyContent={'flex-end'}
          icon={<Icon as={MaterialCommunityIcons} name="dots-horizontal" />}
          borderRadius="full"
          _icon={{
            color: '#194569',
            size: 'sm',
          }}
          _hover={{
            bg: '#194569',
          }}
          _pressed={{
            bg: '#194569:alpha.20',
            _icon: {
              name: 'emoji-flirt',
            },
            _ios: {
              _icon: {
                size: 'sm',
              },
            },
          }}
          _ios={{
            _icon: {
              size: 'sm',
            },
          }}
        />
        <Actionsheet
          hideDragIndicator={Platform.OS === 'ios' ? true : false}
          isOpen={isOpen1}
          onClose={onClose1}
        >
          <Actionsheet.Content>
            {modalItems.map((item, i) => (
              <View key={i}>
                <Actionsheet.Item
                  onPress={() => {
                    if (item.ActionName === 'Manage Appointment Details') {
                      navigation.navigate(item.navigation, appointmentDetails);
                    }
                    if (
                      item.ActionName === 'Confirm' &&
                      appointmentDetails.status.name.en === 'Scheduled'
                    ) {
                      setModalVisible(true);
                      setSelectedAppointment(appointmentDetails);
                    }
                    if (item.ActionName === 'Cancel appointment') {
                      // console.log('inside Cnacel Appointmert');
                      setSelectedAppointment(appointmentDetails);
                      setModalVisible2(true);
                    }
                    if (item.ActionName === 'Upload Photo of Attachment') {
                      pickImage();
                    }
                  }}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Text
                    color={
                      item.ActionName === 'Cancel appointment'
                        ? 'blue.500'
                        : 'gray.500'
                    }
                  >
                    {item.ActionName}
                  </Text>
                </Actionsheet.Item>
                <Divider />
              </View>
            ))}
            <ConfirmAppointment
              getStatus={getStatus}
              SelectedAppointment={SelectedAppointment}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
            <CancelAppointment
              getStatus={getStatus}
              SelectedAppointment={SelectedAppointment}
              modalVisible2={modalVisible2}
              setModalVisible2={setModalVisible2}
            />
          </Actionsheet.Content>
        </Actionsheet>
      </View>
      <CalendarCardsModal isOpen={isOpen} onClose={onClose} />
    </View>
  );
};

export default AppointmentRenderItemActions;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  WarningOutlineIcon,
  TextArea,
  ScrollView,
} from 'native-base';
import axios from 'axios';
import { requestBuilder } from '../../../requestBuilder';
import UsersModal from './UsersModal';
import { useDispatch, useSelector } from 'react-redux';
import { saveUsers } from '../store-notification';
import { onOpenUsers } from '../store-notification';

const Example = ({ navigation }) => {
  const storeNotification = useSelector((state) => state.notification);
  const dashboardStore = useSelector((state) => state.dashboard);

  const [createForm, setCreateForm] = useState({
    sender_id: dashboardStore.userToken.userId,
    user_image: '',
    notification_type: 1,
    sender_name: dashboardStore.userToken.firstName,
    notification_status: 'Soft',
    channels: [{ channel_type: 1 }],
    notification_subject: 'ge ge wellplayed ',
    notification_description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsu",
    users: storeNotification.selectedUsers,
    profileIds: [],
  });

  ///////////////////////////////////

  ///////////////////////////////////////

  const dispatch = useDispatch();
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log('createFormcreateForm', createForm);
  }, [createForm]);

  async function getUsers() {
    const res = await axios(requestBuilder('ciam', '/v1/users', 'get'));
    dispatch(saveUsers(res.data));
  }

  async function CreateNotiHandler() {
    try {
      await axios(
        requestBuilder('notifications', '/notifications/create', 'post', {
          ...createForm,
          users: storeNotification.selectedUsers,
        })
      ).then(() => navigation.navigate('Test'));
    } catch (error) {
      console.log('00000000000000', error);
    }
  }

  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="30%">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold"
        >
          Create Notification
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Subject</FormControl.Label>
            <Input
              onChangeText={(value) =>
                setCreateForm({ ...createForm, notification_subject: value })
              }
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Description</FormControl.Label>
            <TextArea
              onChangeText={(value) =>
                setCreateForm({
                  ...createForm,
                  notification_description: value,
                })
              }
              h="180"
            />
          </FormControl>
          <FormControl w="3/4" maxW="300" isRequired isInvalid>
            <FormControl.Label>Choose Users</FormControl.Label>

            <Button
              w="140"
              bg="#2F8F9D"
              onPress={() => dispatch(onOpenUsers())}
            >
              Choose Users
            </Button>
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              Please make a selection!
            </FormControl.ErrorMessage>
          </FormControl>
          <Center mt="50">
            <Button onPress={() => CreateNotiHandler()} w="100" bg="#FF4949">
              Create
            </Button>
          </Center>
        </VStack>
      </Box>
    </Center>
  );
};

export default ({ navigation }) => {
  const storeNotification = useSelector((state) => state.notification);
  return (
    <ScrollView>
      <Center flex={1} px="3">
        <Example navigation={navigation} />
        {storeNotification.users.length && <UsersModal />}
      </Center>
    </ScrollView>
  );
};

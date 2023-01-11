import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { AppTheme } from '../../../constants/index';
import { Platform } from 'react-native';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
export default function AppointmentsReceptionistProfile({ navigation }) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const AuthStore = useSelector((state) => state.AuthStore);
  return (
    <ScrollView>
      {loader && (
        <Spinner
          mt="250"
          color="cyan.500"
          size="lg"
          accessibilityLabel="Loading posts"
        />
      )}
      {loader === false && (
        <Center flex={1} w="100%" bg={AppTheme.whitesmoke} pb={10}>
          <VStack
            flex={1}
            w="100%"
            minH={200}
            justifyContent="center"
            alignItems="center"
            bg={AppTheme.color4}
            space={'5%'}
            p={5}
          >
            <Heading
              color={AppTheme.WHITE}
              fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
            >
              {AuthStore.user.name.en}
            </Heading>
            <Avatar
              source={{
                uri: AuthStore?.user?.image
                  ? AuthStore?.user?.image
                  : 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-512.png',
              }}
              size="2xl"
            />
            <Button
              w={Platform.OS === 'ios' ? '33%' : '30%'}
              alignSelf="center"
              bg={AppTheme.color2}
            >
              Edit Profile
            </Button>
          </VStack>
          <VStack
            flex={1}
            w="100%"
            justifyContent="center"
            alignItems="center"
            mt={'3%'}
          >
            <VStack
              flex={1}
              w="100%"
              alignItems="flex-start"
              space={'5%'}
              p={5}
            >
              <Heading
                color={AppTheme.color2}
                fontSize={Platform.OS === 'ios' ? 'lg' : 'xl'}
                mb="2%"
              >
                Basic Info
              </Heading>
              <HStack px="2%" alignItems="center" space="3%">
                <Icon
                  as={AntDesign}
                  name="user"
                  color={AppTheme.BLACK}
                  size="3xl"
                />
                <VStack>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    {AuthStore.user.gender.name.en}
                  </Text>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                  >
                    Gender
                  </Text>
                </VStack>
              </HStack>
              <Divider />
              <HStack px="2%" alignItems="center" space="3%">
                <Icon
                  as={MaterialIcons}
                  name="cake"
                  color={AppTheme.BLACK}
                  size="3xl"
                />
                <VStack>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    {AuthStore.user.dob}
                  </Text>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                  >
                    Date of birth
                  </Text>
                </VStack>
              </HStack>
              <Divider />
              <HStack px="2%" alignItems="center" space="3%">
                <Icon
                  as={Ionicons}
                  name="ios-location-sharp"
                  color={AppTheme.BLACK}
                  size="3xl"
                />
                <VStack>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    {AuthStore?.user?.facility?.name?.en}
                  </Text>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                  >
                    Address
                  </Text>
                </VStack>
              </HStack>
              <Divider />
            </VStack>
          </VStack>
          <VStack
            flex={1}
            w="100%"
            justifyContent="center"
            alignItems="center"
            mt={'3%'}
          >
            <VStack
              flex={1}
              w="100%"
              alignItems="flex-start"
              space={'5%'}
              p={5}
            >
              <Heading
                color={AppTheme.color2}
                fontSize={Platform.OS === 'ios' ? 'lg' : 'xl'}
                my="2%"
              >
                Contact Info
              </Heading>
              <HStack px="2%" alignItems="center" space="3%">
                <Icon
                  as={MaterialCommunityIcons}
                  name="phone"
                  color={AppTheme.BLACK}
                  size="3xl"
                />
                <VStack>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    {AuthStore?.user?.phone?.code}{' '}
                    {AuthStore?.user?.phone?.number}
                  </Text>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                  >
                    Phone Number
                  </Text>
                </VStack>
              </HStack>
              <Divider />
              <HStack px="2%" alignItems="center" space="3%">
                <Icon
                  as={MaterialCommunityIcons}
                  name="whatsapp"
                  color={AppTheme.BLACK}
                  size="3xl"
                />
                <VStack>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    {AuthStore?.user?.phone?.code}{' '}
                    {AuthStore?.user?.phone?.number}
                  </Text>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                  >
                    Whatsapp Number
                  </Text>
                </VStack>
              </HStack>
              <Divider />
              <HStack px="2%" alignItems="center" space="3%">
                <Icon
                  as={MaterialCommunityIcons}
                  name="email"
                  color={AppTheme.BLACK}
                  size="3xl"
                />
                <VStack>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    {AuthStore?.user?.email}
                  </Text>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                  >
                    Email
                  </Text>
                </VStack>
              </HStack>
              <Divider />
            </VStack>
          </VStack>
          <VStack
            flex={1}
            w="100%"
            justifyContent="center"
            alignItems="center"
            mt={'3%'}
          >
            <VStack
              flex={1}
              w="100%"
              alignItems="flex-start"
              space={'5%'}
              p={5}
            >
              <Heading
                color={AppTheme.color2}
                fontSize={Platform.OS === 'ios' ? 'lg' : 'xl'}
                my="2%"
              >
                My purchased
              </Heading>
              <HStack px="2%" alignItems="center" space="3%">
                <Icon
                  as={MaterialCommunityIcons}
                  name="phone"
                  color={AppTheme.BLACK}
                  size="3xl"
                />
                <VStack>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    {AuthStore?.user?.phone?.code}{' '}
                    {AuthStore?.user?.phone?.number}
                  </Text>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                  >
                    Phone Number
                  </Text>
                </VStack>
              </HStack>
              <Divider />
              <HStack px="2%" alignItems="center" space="3%">
                <Icon
                  as={MaterialCommunityIcons}
                  name="whatsapp"
                  color={AppTheme.BLACK}
                  size="3xl"
                />
                <VStack>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    {AuthStore?.user?.phone?.code}{' '}
                    {AuthStore?.user?.phone?.number}
                  </Text>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                  >
                    Whatsapp Number
                  </Text>
                </VStack>
              </HStack>
              <Divider />
              <HStack px="2%" alignItems="center" space="3%">
                <Icon
                  as={MaterialCommunityIcons}
                  name="email"
                  color={AppTheme.BLACK}
                  size="3xl"
                />
                <VStack>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    {AuthStore?.user?.email}
                  </Text>
                  <Text
                    color={AppTheme.BLACK}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                  >
                    Email
                  </Text>
                </VStack>
              </HStack>
              <Divider />
            </VStack>
          </VStack>
        </Center>
      )}
    </ScrollView>
  );
}

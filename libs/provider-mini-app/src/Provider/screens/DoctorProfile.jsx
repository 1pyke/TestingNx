import React, { useEffect, useState } from 'react';
import {
  Heading,
  Center,
  Spinner,
  ScrollView,
  Box,
  VStack,
  Text,
  HStack,
  Avatar,
  Icon,
  Button,
  Divider,
  Progress,
} from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { Platform } from 'react-native';
import { colors } from '../../Constants/index';

// componentns
import {ServicesSwipeListView} from '@mobile-nx-apps/service-mini-app';

// funcs
const { requestBuilder } = require('../../requestBuilder');

const DoctorProfile = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [providerInfo, setProviderInfo] = useState({});
  const [info, setInfo] = useState(1);
  const [services, setServices] = useState([]);

  //get provider full profile
  useEffect(() => {
    setLoader(true);
    async function getProvider() {
      try {
        console.log(route?.params?.item?.id ,'#######');
        const result = await requestBuilder(
          '/providers/profile/getFullProfile',
          { provider_id: route?.params?.item?.id }
        );
        setProviderInfo(result?.data);
        console.log(result.data,'000000000000');
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    }
    getProvider();
  }, [route?.params?.item?.id]);

  //get All services
  useEffect(() => {
    async function getServices() {
      try {
        const result = await requestBuilder('/services/getServices');
        let extracted =
          result.data.length > 0 &&
          result.data.map(
            (service) => service?.services?.length > 0 && service?.services
          );

        //filter services by this provider
        extracted = extracted.filter((item) =>
          item[0]?.providers?.filter(
            (provider) =>
              provider?.provider?.name?.en === providerInfo?.name?.en
          )
        );
        //console.log(extracted, '+++++++++++');
        setServices(extracted);
      } catch (error) {
        console.log(error);
      }
    }
  //  getServices();
  }, []);

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
      {loader == false && (
        <Center
          flex={1}
          w="100%"
          h="100%"
          bg={colors.whitesmoke}
          pt={55}
          pb={10}
        >
          <VStack
            flex={1}
            w="100%"
            minH={200}
            justifyContent="center"
            alignItems="center"
            bg={colors.color4}
            space={'5%'}
            p={5}
            mb="10%"
          >
            <Avatar
              source={{
                uri: providerInfo?.image
                  ? providerInfo?.image
                  : 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-512.png',
              }}
              size="2xl"
            />
            <Box
              justifyContent="center"
              alignItems="center"
              position="absolute"
              bottom="-15%"
              p={'1%'}
              px="10%"
              shadow={4}
              bg={colors.color6}
              borderRadius="md"
            >
              <Text
                fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                color={colors.color2}
                fontWeight="extrabold"
              >
                {providerInfo?.name?.en}
              </Text>
              <Text
                color={colors.color2}
                fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
              >
                {providerInfo?.occupation?.name?.en}
              </Text>
            </Box>
          </VStack>

          <HStack
            w="80%"
            justifyContent="center"
            alignItems="center"
            my={2}
            borderColor={colors.color2}
            borderRadius="sm"
            borderWidth={2}
            padding={2}
            px={5}
          >
            <Button
              size="sm"
              w="35%"
              bg={info === 1 ? colors.color2 : 'transparent'}
              rounded="sm"
              _text={{
                color: info === 1 ? colors.white : colors.color1,
                fontWeight: 'bold',
              }}
              onPress={() => setInfo(1)}
            >
              About
            </Button>
            <Button
              size="sm"
              w="35%"
              bg={info === 2 ? colors.color2 : 'transparent'}
              rounded="sm"
              _text={{
                color: info === 2 ? colors.white : colors.color1,
                fontWeight: 'bold',
              }}
              onPress={() => setInfo(2)}
            >
              Background
            </Button>
            <Button
              size="sm"
              w="35%"
              bg={info === 3 ? colors.color2 : 'transparent'}
              rounded="sm"
              _text={{
                color: info === 3 ? colors.white : colors.color1,
                fontWeight: 'bold',
              }}
              onPress={() => setInfo(3)}
            >
              Services
            </Button>
          </HStack>
          {Tabs()}
        </Center>
      )}
    </ScrollView>
  );

  function Tabs() {
    switch (info) {
      case 1:
        return (
          <>
            <Center flex={1} w="100%" mb={'3%'} px={3}>
              <Box w="100%" p={3} bg={colors.color5} borderRadius={10} my={3}>
                <Heading
                  w="100%"
                  textAlign="left"
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  mb={2}
                >
                  About
                </Heading>

                <Text
                  w="100%"
                  textAlign="left"
                  color={colors.color2}
                  mb={3}
                  fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                >
                  about
                  {/* {providerInfo?.Properties[0]?.length > 0 &&
                    providerInfo?.Properties[0]?.value?.en} */}
                </Text>
                <Divider bg={colors.black} mb={3} />

                <Heading
                  w="100%"
                  textAlign="left"
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  mb={2}
                >
                  Basic Info
                </Heading>

                <HStack alignItems="center" space={1}>
                  <Icon
                    as={<MaterialCommunityIcons name="progress-clock" />}
                    color={colors.white}
                    size="sm"
                    bg={colors.black}
                    borderRadius="xl"
                  />
                  <Text>Gender: {providerInfo?.gender?.name?.en}</Text>
                </HStack>

                <HStack alignItems="center" space={1}>
                  <Icon
                    as={<MaterialCommunityIcons name="progress-clock" />}
                    color={colors.white}
                    size="sm"
                    bg={colors.black}
                    borderRadius="xl"
                  />
                  <Text>Date Of Birth: {providerInfo?.dob}</Text>
                </HStack>

                <HStack alignItems="center" space={1}>
                  <Icon
                    as={<MaterialCommunityIcons name="progress-clock" />}
                    color={colors.white}
                    size="sm"
                    bg={colors.black}
                    borderRadius="xl"
                  />
                  <Text>Email: {providerInfo?.email || 'None'}</Text>
                </HStack>
              </Box>

              <Box w="100%" p={3} bg={colors.color5} borderRadius={10} my={3}>
                <Heading
                  w="100%"
                  textAlign="left"
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  mb={2}
                >
                  Skills
                </Heading>

                {providerInfo?.skills?.length > 0 ? (
                  providerInfo?.skills?.map((item,i) => (
                    <Text
                    key={i}
                      w="100%"
                      textAlign="left"
                      color={colors.color2}
                      mb={3}
                      fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                    >
                      . {item?.skill?.name?.en}
                    </Text>
                  ))
                ) : (
                  <Text
                    w="100%"
                    textAlign="left"
                    color={colors.color2}
                    mb={3}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    None
                  </Text>
                )}
              </Box>
            </Center>

            <Center flex={1} w="100%" mb={'3%'} px={3}>
              <Heading
                w="100%"
                textAlign="left"
                color={colors.color2}
                fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
              >
                Languages
              </Heading>
              <VStack w="100%" alignItems="flex-start" space={3} py={2}>
                <HStack w="100%" alignItems="center" space={3}>
                  <Text>English</Text>
                  <Box w="90%" maxW="400">
                    <Progress value={45} mx="4" colorScheme={colors.color2} />
                  </Box>
                </HStack>

                <HStack w="100%" alignItems="center" space={3}>
                  <Text>Arabic</Text>
                  <Box w="90%" maxW="400">
                    <Progress value={75} mx="4" colorScheme={colors.color2} />
                  </Box>
                </HStack>
              </VStack>
            </Center>
          </>
        );

      case 2:
        return (
            <Center flex={1} w="100%" mb={'3%'} px={3}>
              <Box w="100%" p={3} bg={colors.color5} borderRadius={10} my={3}>
                <Heading
                  w="100%"
                  textAlign="left"
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  mb={2}
                >
                  Experience
                </Heading>

                {providerInfo?.skills?.length > 0 ? (
                  providerInfo?.skills?.map((item,i) => (
                    <Text
                    key={i}
                      w="100%"
                      textAlign="left"
                      color={colors.color2}
                      mb={3}
                      fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                    >
                      . {item?.skill?.name?.en}
                    </Text>
                  ))
                ) : (
                  <Text
                    w="100%"
                    textAlign="left"
                    color={colors.color2}
                    mb={3}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    None
                  </Text>
                )}
              </Box>

              <Box w="100%" p={3} bg={colors.color5} borderRadius={10} my={3}>
                <Heading
                  w="100%"
                  textAlign="left"
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  mb={2}
                >
                  Education
                </Heading>

                {providerInfo?.skills?.length > 0 ? (
                  providerInfo?.skills?.map((item,i) => (
                    <Text
                    key={i}
                      w="100%"
                      textAlign="left"
                      color={colors.color2}
                      mb={3}
                      fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                    >
                      . {item?.skill?.name?.en}
                    </Text>
                  ))
                ) : (
                  <Text
                    w="100%"
                    textAlign="left"
                    color={colors.color2}
                    mb={3}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    None
                  </Text>
                )}
              </Box>

              <Box w="100%" p={3} bg={colors.color5} borderRadius={10} my={3}>
                <Heading
                  w="100%"
                  textAlign="left"
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  mb={2}
                >
                  Licenses & Certifications
                </Heading>

                {providerInfo?.skills?.length > 0 ? (
                  providerInfo?.skills?.map((item,i) => (
                    <Text
                    key={i}
                      w="100%"
                      textAlign="left"
                      color={colors.color2}
                      mb={3}
                      fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                    >
                      .{item?.skill?.name?.en}
                    </Text>
                  ))
                ) : (
                  <Text
                    w="100%"
                    textAlign="left"
                    color={colors.color2}
                    mb={3}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                  >
                    None
                  </Text>
                )}
              </Box>
            </Center>
        );
      case 3:
        return (
            <Center flex={1} w="100%" mb={'3%'} px={3}>
              {services.length > 0 && (
                <ServicesSwipeListView
                  navigation={navigation}
                  services={services}
                />
              )}
            </Center>
        );
    }
  }
};
export { DoctorProfile };

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
  Icon,
  Image,
  Button,
} from 'native-base';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { Platform } from 'react-native';
import { colors, images } from '../../Constants/index';
import {ServiceProviders} from '../components/ServiceProviders';

// componentns

// funcs
const { requestBuilder } = require('../../requestBuilder');

const ServiceFullView = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [info, setInfo] = useState(true);
  const [serviceInfo, setServiceInfo] = useState({});

  //get All services
  useEffect(() => {
    setLoader(true);
    async function getServiceFullView() {
      try {
        const result = await requestBuilder('/services/getFullViewService', {
          id: route.params.item.id,
        });
        setLoader(false);
        setServiceInfo(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getServiceFullView();
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
          px={3}
        >
          <Center flex={1} w="100%" minH={170} mb={3}>
            <Box
              bg={colors.whitesmoke}
              w="100%"
              h="100%"
              py={2}
              my={3}
              mx={2}
              shadow={6}
              borderRadius={10}
            >
              <HStack
                px={2}
                space={2}
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                h="60%"
              >
                <Box w={'30%'} h={'100%'}>
                  <Image
                    w={'100%'}
                    h={'100%'}
                    borderRadius={10}
                    alt="service image"
                    source={{
                      uri: serviceInfo.image || images.img1,
                    }}
                  />
                </Box>
                <VStack w={'76%'} h={'100%'} justifyContent="space-between">
                  <Heading
                    fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                    color={colors.color2}
                  >
                    {serviceInfo?.serviceInfo?.name?.en}
                  </Heading>
                  <Text
                    w="100%"
                    numberOfLines={3}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                    color={colors.color2}
                  >
                    {serviceInfo?.serviceInfo?.description?.en}
                  </Text>
                </VStack>
              </HStack>
              <HStack w="100%" justifyContent="space-between" px={'2%'} mt="3%">
                <VStack w="50%">
                  <HStack alignItems="center" space={1}>
                    <Icon
                      as={<MaterialCommunityIcons name="progress-clock" />}
                      color={colors.white}
                      size="sm"
                      bg={colors.black}
                      borderRadius="xl"
                    />
                    <Text>
                      Type: {serviceInfo?.serviceInfo?.type?.name?.en}
                    </Text>
                  </HStack>
                  <HStack alignItems="center" space={1}>
                    <Icon
                      as={<MaterialCommunityIcons name="progress-clock" />}
                      color={colors.white}
                      size="sm"
                      bg={colors.black}
                      borderRadius="xl"
                    />
                    <Text>
                      Needs follow up:
                      {serviceInfo?.followUp?.length > 0 ? 'Yes' : 'No'}
                    </Text>
                  </HStack>
                </VStack>

                <VStack w="50%">
                  <HStack alignItems="center" space={1}>
                    <Icon
                      as={<MaterialCommunityIcons name="progress-clock" />}
                      color={colors.white}
                      size="sm"
                      bg={colors.black}
                      borderRadius="xl"
                    />
                    <Text>Duration: {serviceInfo?.service?.duration}</Text>
                  </HStack>
                  <HStack alignItems="center" space={1}>
                    <Icon
                      as={<MaterialCommunityIcons name="progress-clock" />}
                      color={colors.white}
                      size="sm"
                      bg={colors.black}
                      borderRadius="xl"
                    />
                    <Text>
                      Risk Level: {serviceInfo?.serviceInfo?.riskLevel.name.en}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          </Center>

          <HStack
            w="60%"
            justifyContent="center"
            alignItems="center"
            my={2}
            borderColor={colors.color2}
            borderRadius="sm"
            borderWidth={2}
            padding={2}
          >
            <Button
              size="sm"
              w="50%"
              bg={info ? colors.color2 : 'transparent'}
              rounded="sm"
              _text={{
                color: info ? colors.white : colors.color1,
                fontWeight: 'bold',
              }}
              onPress={() => setInfo(true)}
            >
              About
            </Button>
            <Button
              size="sm"
              w="50%"
              bg={info ? 'transparent' : colors.color2}
              rounded="sm"
              _text={{
                color: info ? colors.color1 : colors.white,
                fontWeight: 'bold',
              }}
              onPress={() => setInfo(false)}
            >
              Linked To
            </Button>
          </HStack>
          {info ? (
            <>
              <Center flex={1} w="100%" mb={'3%'}>
                <Box w="100%" p={3} bg={colors.color5} borderRadius={10} my={3}>
                  <Heading
                    w="100%"
                    textAlign="left"
                    color={colors.color2}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                    mb={2}
                  >
                    Pre actions
                  </Heading>

                  {serviceInfo?.careValidation?.preCare?.length > 0 ? (
                    serviceInfo?.careValidation?.preCare?.map((item) => (
                      <Text
                        w="100%"
                        textAlign="left"
                        color={colors.color2}
                        mb={3}
                        fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                      >
                        .{item.description.en}
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

                  <Heading
                    w="100%"
                    textAlign="left"
                    color={colors.color2}
                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                    mb={2}
                  >
                    Post actions
                  </Heading>

                  {serviceInfo?.careValidation?.postCare?.length > 0 ? (
                    serviceInfo?.careValidation?.postCare?.map((item) => (
                      <Text
                        w="100%"
                        textAlign="left"
                        color={colors.color2}
                        mb={3}
                        fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                      >
                        .{item.description.en}
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

              <Center flex={1} w="100%" mb={'3%'}>
                <Heading
                  w="100%"
                  textAlign="left"
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                >
                  Follow up services
                </Heading>
                <VStack w="100%" alignItems="flex-start" space={3} py={2}>
                  {serviceInfo?.followUp?.length > 0 ? (
                    serviceInfo?.followUp?.map((item) => (
                      <Button
                        w="95%"
                        borderColor={colors.lightgray}
                        borderWidth={2}
                        borderRadius="sm"
                        bg={colors.whitesmoke}
                        rightIcon={
                          <Icon
                            as={
                              <MaterialCommunityIcons name="progress-clock" />
                            }
                            color={colors.white}
                            size="sm"
                            bg={colors.black}
                            borderRadius="xl"
                          />
                        }
                        _text={{
                          color: colors.color1,
                          fontWeight: 'bold',
                        }}
                        justifyContent="flex-start"
                      >
                        {item?.service?.name?.en}
                      </Button>
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
                </VStack>
              </Center>
            </>
          ) : (
            <>
              <Center flex={1} w="100%" my={'3%'}>
                <Heading
                  w="100%"
                  textAlign="left"
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                >
                  Packages
                </Heading>
                <VStack w="100%" alignItems="flex-start" space={3} py={2}>
                  {serviceInfo?.packages?.length > 0 ? (
                    serviceInfo?.packages?.map((item) => (
                      <Button
                        w="100%"
                        borderColor={colors.lightgray}
                        borderWidth={2}
                        borderRadius="sm"
                        bg={colors.whitesmoke}
                        _text={{
                          color: colors.color1,
                          fontWeight: 'bold',
                        }}
                        justifyContent="flex-start"
                      >
                        {item?.name?.en}
                      </Button>
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
                </VStack>
              </Center>

              <Center flex={1} w="100%" my={'3%'}>
                <Heading
                  w="100%"
                  textAlign="left"
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                >
                  Providers
                </Heading>

                <ServiceProviders
                  navigation={navigation}
                  providers={serviceInfo?.providers}
                />
              </Center>
            </>
          )}
        </Center>
      )}
    </ScrollView>
  );
};

export  {ServiceFullView};

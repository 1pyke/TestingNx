import { Platform, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  Pressable,
  View,
  Spinner,
  ScrollView,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const { requestBuilder } = require('../../../requestBuilder');

const MyConsumers = () => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    wait(1).then(() => setRefreshing(false));
  };
  const [loader, setLoader] = useState(true);
  const [provider, setProviders] = useState();
  useEffect(() => {
    async function getProviders() {
      try {
        const result = await requestBuilder('/consumers/profile/getProfiles');
        setLoader(false);
        setProviders(result.data.rows);
        console.log(result.data.rows);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
    }
    getProviders();
  }, []);
  const [Pressed, setPressed] = useState(false);
  return (
    <>
      {loader && (
        <View
          bg={'#FFFAFA'}
          h={'100%'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Spinner accessibilityLabel="Loading posts" />
          <Heading alignSelf={'center'} color="#5F84A2" fontSize="md">
            Loading
          </Heading>
        </View>
      )}
      {loader === false && (
        <ScrollView
          h={'100%'}
          bg={'#FFFAFA'}
          refreshControl={
            <RefreshControl
              tintColor={'#5F84A2'}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {provider?.map((item) => (
            <Pressable
              alignItems="center"
              justifyContent="flex-start"
              bg={!Pressed ? '#FFFAFA' : 'trueGray.200'}
              _pressed={{
                bg: 'trueGray.200',
              }}
              h={90}
              py={2}
              my={3}
              mx={2}
              shadow={6}
              borderRadius={10}
              onPress={() => {
                // onClose1();
                // changingitemname();
                console.log(item, 'itemitem');
              }}
            >
              <HStack
                px={2}
                space={2}
                alignItems="center"
                justifyContent="flex-start"
                w="100%"
                h="100%"
              >
                <Avatar
                  source={{
                    uri: item?.image
                      ? item?.image
                      : 'https://previews.123rf.com/images/yupiramos/yupiramos1607/yupiramos160705616/59613224-doctor-avatar-profile-isolated-icon-vector-illustration-graphic-.jpg',
                  }}
                  size="lg"
                />
                <VStack w={'76%'} h={'100%'} justifyContent="space-between">
                  <Heading
                    fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                    color={'#194569'}
                  >
                    {item?.firstName?.en} {item?.lastName?.en}
                  </Heading>
                  <Text
                    w="100%"
                    numberOfLines={4}
                    fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'}
                    color={
                      item?.primaryPhone?.number?.length > 0
                        ? '#194569'
                        : '#FF0000'
                    }
                  >
                    {item?.primaryPhone?.number?.length > 0
                      ? item?.primaryPhone?.country_code +
                        ' ' +
                        item?.primaryPhone?.number
                      : 'Undefined Number'}
                  </Text>
                  <HStack w="100%" justifyContent="flex-end">
                    <HStack alignItems="center" space={1}>
                      <Icon
                        as={
                          <MaterialCommunityIcons
                            name={
                              item?.gender?.name?.en === 'Male'
                                ? 'gender-male'
                                : 'gender-female'
                            }
                          />
                        }
                        color={
                          item?.gender?.name?.en === 'Male'
                            ? '#0000FF'
                            : '#FFC0CB'
                        }
                        size="md"
                        borderRadius="xl"
                      />
                      <Text color={'rgba(0,0,0,0.6)'}>
                        {item?.gender?.name?.en}
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </HStack>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default MyConsumers;

import React, { useState } from 'react';
import { Platform } from 'react-native';
import {
  Box,
  Text,
  Pressable,
  Icon,
  HStack,
  Center,
  VStack,
  Heading,
  Image,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, images } from '../../Constants/index';

const ServicesSwipeListView = ({ navigation, services }) => {
  return <Basic Allservices={services} navigation={navigation} />;
};
export { ServicesSwipeListView };

function Basic({ navigation, Allservices }) {
  const [listData, setListData] = useState(Allservices);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  ////////////////////////////  render item

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('ServiceFullView', { item })}
        alignItems="center"
        justifyContent="flex-start"
        bg={colors.whitesmoke}
        _pressed={{
          bg: 'trueGray.200',
        }}
        h={Platform.OS === 'ios' ? 145 : 130}
        py={3}
        my={2}
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
          h="100%"
        >
          <VStack w={'73%'} h={'100%'} justifyContent="space-between" space={1}>
            <Heading
              fontSize={Platform.OS === 'ios' ? 'sm' : 'lg'}
              color={colors.color2}
            >
              {item?.serviceInfo?.name?.en}
            </Heading>
            <Text
              w="100%"
              numberOfLines={3}
              fontSize={Platform.OS === 'ios' ? '2xs' : 'sm'}
              color={colors.color2}
            >
              {item?.serviceInfo?.description?.en}
            </Text>
            <HStack w="100%" justifyContent="space-between">
              <HStack alignItems="center" space={1}>
                <Icon
                  as={<MaterialCommunityIcons name="clock-outline" />}
                  color={colors.black}
                  size="sm"
                />
                <Text
                  color={colors.black}
                  fontSize={Platform.OS === 'ios' ? '2xs' : 'sm'}
                >
                  {item?.duration}
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Icon
                  as={<MaterialIcons name="attach-money" />}
                  color={colors.black}
                  size="sm"
                />
                <Text
                  color={colors.black}
                  fontSize={Platform.OS === 'ios' ? '2xs' : 'sm'}
                >
                  {item?.providers[0]?.price?.minumunPrice || '0'}
                </Text>
              </HStack>
            </HStack>
          </VStack>

          <Box w={'25%'}>
            <Image
              w={'100%'}
              h={'85%'}
              borderRadius={10}
              alt="service image"
              source={{
                uri: item?.serviceInfo?.image || images?.img7,
              }}
            />
          </Box>
        </HStack>
      </Pressable>
    );
  };

  ////////////////////////////  hidden items

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HStack flex={1} pr={2} my={3} mx={4} space={0.5}>
        <Pressable
          px={3}
          cursor="pointer"
          bg={colors.color3}
          justifyContent="center"
          // onPress={() => closeRow(rowMap, data.item.key)}
          _pressed={{
            opacity: 0.5,
          }}
        >
          <Icon
            as={<MaterialIcons name="insert-invitation" />}
            color={colors.white}
            size="xl"
          />
        </Pressable>

        <Pressable
          px={3}
          cursor="pointer"
          bg={colors.color1}
          justifyContent="center"
          // onPress={() => deleteRow(rowMap, data.item.key)}
          _pressed={{
            opacity: 0.5,
          }}
          borderRightRadius={10}
        >
          <Icon
            as={<MaterialIcons name="bookmark" />}
            color={colors.white}
            size="xl"
          />
        </Pressable>
      </HStack>
    );
  };
  return (
    <Center w="100%" alignItems="center">
      {listData.length > 0 && (
        <SwipeListView
          data={listData.flat().filter((item) => item)}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={118}
          previewRowKey={0}
          previewOpenValue={0}
          previewOpenDelay={0}
        />
      )}
    </Center>
  );
}

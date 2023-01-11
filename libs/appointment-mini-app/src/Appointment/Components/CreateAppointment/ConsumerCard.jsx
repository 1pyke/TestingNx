import { Platform } from 'react-native';
import React, { useState } from 'react';
import {
  Avatar,
  Heading,
  HStack,
  Icon,
  VStack,
  Text,
  Pressable,
} from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ConsumerCard = ({ item, onClose1, changingItem }) => {
  const changingitemname = () => {
    changingItem(item);
  };
  const [Pressed, setPressed] = useState(false);
  return (
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
        onClose1();
        changingitemname();
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
              item?.primaryPhone?.number?.length > 0 ? '#194569' : '#FF0000'
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
                  item?.gender?.name?.en === 'Male' ? '#0000FF' : '#FFC0CB'
                }
                size="md"
                borderRadius="xl"
              />
              <Text color={'rgba(0,0,0,0.6)'}>{item?.gender?.name?.en}</Text>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default ConsumerCard;

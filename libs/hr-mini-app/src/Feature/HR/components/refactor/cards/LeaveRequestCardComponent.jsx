import { Avatar, Heading, HStack, VStack } from 'native-base';
import React from 'react';
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

const LeaveRequestCardComponent = ({
  image,
  employeeName,
  leaveType,
  LeaveFrom,
  LeaveStatus,
  LeaveTo,
  LeaveSubType,
}) => {
  const statusIcon = (status) => {
    switch (status) {
      case 'new':
        return <Entypo name="new" size={24} color="black" />;
      case 'on hold':
        return (
          <MaterialCommunityIcons
            name="progress-clock"
            size={24}
            color="black"
          />
        );
      case 'Accepted':
        return <AntDesign name="checkcircleo" size={24} color="#20AA3F" />;
      case 'Rejected':
        return (
          <Ionicons name="ios-alert-circle-outline" size={24} color="red" />
        );
      case 'Pending':
        return <Feather name="loader" size={24} color="#FF9C72" />;
    }
  };

  return (
    <HStack space={5} alignItems="flex-start" justifyContent={'space-between'}>
      <Avatar
        size="md"
        source={{
          uri: image ?? 'https://picsum.photos/200/4',
        }}
      />
      <VStack flex={1} space={1}>
        <HStack alignItems={'space-between'} space={1}>
          <Heading size="sm" color="#5F84A2">
            {employeeName ?? '-'}
          </Heading>
        </HStack>
        <HStack
          justifyContent={'space-between'}
          alignItems={'flex-end'}
          space={1}
        >
          <Heading size="sm">{leaveType}</Heading>
        </HStack>
        <HStack
          justifyContent={'space-between'}
          alignItems={'flex-end'}
          space={1}
        >
          {LeaveSubType && (
            <Heading size="xs" color={'muted.500'}>
              {LeaveSubType ?? ''}
            </Heading>
          )}
        </HStack>
        <HStack
          justifyContent={'space-between'}
          alignItems={'flex-end'}
          space={2}
        >
          <Heading size="xs" color={'muted.500'}>
            {LeaveFrom} - {LeaveTo}
          </Heading>
          <Heading>{statusIcon(LeaveStatus)}</Heading>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default LeaveRequestCardComponent;

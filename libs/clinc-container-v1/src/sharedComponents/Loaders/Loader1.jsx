import React from 'react';
import {
  Spinner,
  HStack,
  Heading,
  Center,
  NativeBaseProvider,
} from 'native-base';
import { View } from 'react-native';

const Example = () => {
  return (
    <View>
      <View>
        <HStack space={2} justifyContent="center">
          <Spinner accessibilityLabel="Loading posts" />
          <Heading fontSize="md">Loading</Heading>
        </HStack>
      </View>
    </View>
  );
};

export default () => {
  return (
    <Center flex={100}>
      <Example />
    </Center>
  );
};

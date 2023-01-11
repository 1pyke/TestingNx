import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  Pressable,
  Text,
  Box,
  HStack,
  Button,
  Flex,
  Center,
  Avatar,
  Input,
  VStack,
  Select,
  CheckIcon,
  Stack,
  Heading,
} from 'native-base';
const card = ({ children, style }) => {
  return (
    <Box
      style={[style]}
      width="90"
      rounded="lg"
      padding="5"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}
    >
      {children}
    </Box>
  );
};

export default card;

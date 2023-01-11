import React from 'react';
import { Icon, Heading, HStack, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
const CustomHeader = ({ props, navigation, navigationRef }) => {
  const searchHandler = () => {
    navigation.navigate('SearchScreen');
  };
  return (
    <HStack
      pl={'28%'}
      py="4"
      style={{
        marginTop: Platform.OS === 'ios' ? 25 : 0,
        backgroundColor: '#FFFAFA',
      }}
    >
      <Heading
        size="sm"
        fontWeight="400"
        color="#194569"
        _dark={{ color: 'white' }}
        textAlign="center"
        mt={'3%'}
      >
        LASER{'  '}AVENUE
      </Heading>
      <HStack alignItems="center" ml={'10%'}>
        <IconButton
          onPress={searchHandler}
          icon={
            <Icon
              size="xl"
              as={MaterialIcons}
              name="search"
              color="#194569"
              mr={1}
            />
          }
        />
      </HStack>
      <HStack alignItems="center">
        <IconButton
          onPress={() => navigation.openDrawer()}
          icon={
            <Icon size="xl" as={MaterialIcons} name="menu" color="#194569" />
          }
        />
      </HStack>
    </HStack>
  );
};
export { CustomHeader };

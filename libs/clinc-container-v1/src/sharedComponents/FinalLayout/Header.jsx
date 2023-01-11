import React from 'react';
import { useDispatch } from 'react-redux';
import { HeaderSearchHandler } from './store-finalLayout';
import { Icon, Heading, HStack, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, ImageBackground, Platform } from 'react-native';
const Header = ({ props, navigation, navigationRef }) => {
  const dispatch = useDispatch();
  const searchHandler = () => {
    // dispatch(HeaderSearchHandler());
    navigation.navigate('SearchScreen');
  };
  return (
    <ImageBackground
      style={{ borderBottomWidth: 1, borderColor: '#FFFAFA', zIndex: -1 }}
      resizeMode="cover"
    >
      <HStack
        px="2"
        py="4"
        style={{
          marginTop: Platform.OS === 'ios' ? 25 : 0,
          backgroundColor: '#FFFAFA',
        }}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        left={0}
        zIndex={1}
      >
        <HStack alignItems="center">
          <IconButton
            onPress={searchHandler}
            icon={
              <Icon
                size="xl"
                as={MaterialIcons}
                name="search"
                color="#00796B"
                mr={1}
              />
            }
          />
        </HStack>
        <Heading
          size="sm"
          fontWeight="600"
          color="#00796B"
          _dark={{ color: 'white' }}
          textAlign="center"
        >
          LASER{'  '}AVENUE
        </Heading>
        <HStack alignItems="center">
          <IconButton
            onPress={() => navigation.openDrawer()}
            icon={
              <Icon size="xl" as={MaterialIcons} name="menu" color="#00796B" />
            }
          />
        </HStack>
      </HStack>
    </ImageBackground>
  );
};
export default Header;

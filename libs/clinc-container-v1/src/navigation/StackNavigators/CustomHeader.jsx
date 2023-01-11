import React from 'react';
import { useDispatch } from 'react-redux';
import { Icon, Heading, HStack, IconButton } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, ImageBackground, Platform } from 'react-native';
import { useSelector } from 'react-redux';
const CustomHeader = ({ props, navigation, navigationRef }) => {
  const dispatch = useDispatch();
  const dashboardStore = useSelector((state) => state.AuthStore);
  let name = dashboardStore.user.facility.name.en.split('–')[0];
  const searchHandler = () => {
    // dispatch(HeaderSearchHandler());
    navigation.navigate('SearchScreen');
  };

  return (
    <HStack
      pl={Platform.OS === 'ios' ? '28%' : '35%'}
      py="4"
      style={{
        marginTop: Platform.OS === 'ios' ? '6%' : 0,
        backgroundColor: '#FFFAFA',
      }}
    >
      <Heading
        size="sm"
        fontWeight="500"
        color="rgba(0,0,0,0.4)"
        _dark={{ color: 'white' }}
        textAlign="center"
        mt={Platform.OS === 'ios' ? '3%' : '6%'}
      >
        {name}
        {'     '}
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
export default CustomHeader;

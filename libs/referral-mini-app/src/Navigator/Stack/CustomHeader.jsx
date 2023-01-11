import React, { useEffect, useState } from 'react';
import { HStack, IconButton, Icon, Text, Box, View } from 'native-base';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';

const CustomHeader = ({ navigation }) => {
  const [routeName, SetRouteName] = useState('home');

  const getRouteName = (nav) => {
    let screenName = nav.getState()?.routes[0]?.state?.routes || 'Vouchers';
    try {
      return screenName[screenName.length - 1].name;
    } catch (e) {
      return e;
    }
  };

  const handelRoutes = () => {
    SetRouteName(getRouteName(navigation));
  };
  useEffect(() => {
    handelRoutes();
  }, [navigation.getState()]);

  return (
    <>
      <Box bg={'#FFFAFA'} width={'100%'} safeAreaTop />
      <HStack bg="muted.50" px={1} py="3" w="100%">
        <View
          width={'100%'}
          flexDirection={'row'}
          justifyContent={'space-between'}
        >
          {routeName === 'VoucherDetails' && (
            <Ionicons
              onPress={() => navigation.goBack()}
              name={Platform.OS === 'ios' ? `ios-arrow-back` : 'md-arrow-back'}
              size={30}
              color="rgba(0,0,0,0.6)"
            />
          )}
          <Text
            ml={'10%'}
            // w={!routeName ? '70%' : '80%'}
            marginLeft={routeName === 'VoucherDetails' ? 0 : '39%'}
            textAlign={'center'}
            color="rgba(0,0,0,0.6)"
            fontSize={'md'}
          >
            Vouchers
          </Text>
          <IconButton
            w={'10%'}
            bottom={'15%'}
            icon={
              <Icon size="lg" as={MaterialIcons} name="menu" color="#194569" />
            }
            onPress={() => navigation.openDrawer()}
          />
        </View>
      </HStack>
    </>
  );
};

export { CustomHeader };

import React from 'react';
import { Text, Icon, HStack, Center, Pressable } from 'native-base';
import {
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
  Feather,
} from '@expo/vector-icons';
import { Platform } from 'react-native';

const CustomFooter = ({ navigation }) => {
  const [selected, setSelected] = React.useState(1);

  const handleNavigation = (nav, page, s) => {
    nav.navigate(page);
    setSelected(s);
  };
  const homeHandleNavigation = (nav, page, s) => {
    nav.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
    setSelected(s);
  };

  return (
    <HStack
      h={Platform.OS === 'ios' ? 20 : 12}
      bg="muted.50"
      alignItems="center"
      borderTopRadius={20}
      safeAreaBottom
      shadow={6}
    >
      <Pressable
        mt={Platform.OS === 'ios' ? '4%' : 0}
        cursor="pointer"
        opacity={selected === 0 ? 1 : 0.5}
        py="3"
        flex={1}
        onPress={() => homeHandleNavigation(navigation, 'Home', 0)}
      >
        <Center>
          <Icon
            mb="1"
            as={<Feather name={selected === 0 ? 'home' : 'home'} />}
            color="#5F84A2"
            size={Platform.OS === 'ios' ? 'xl' : 'lg'}
          />
          <Text color="rgba(0,0,0,0.6)" fontSize={7}>
            Home
          </Text>
        </Center>
      </Pressable>
      <Pressable
        mt={Platform.OS === 'ios' ? '4%' : 0}
        cursor="pointer"
        opacity={selected === 1 ? 1 : 0.5}
        py="2"
        flex={1}
        onPress={() => handleNavigation(navigation, 'Vouchers', 1)}
      >
        <Center>
          <Icon
            mb="1"
            as={<Entypo name={selected === 1 ? 'ticket' : 'ticket'} />}
            color="#5F84A2"
            size={Platform.OS === 'ios' ? 'xl' : 'lg'}
          />
          <Text color="rgba(0,0,0,0.6)" fontSize={7}>
            Vouchers
          </Text>
        </Center>
      </Pressable>
      <Pressable
        mt={Platform.OS === 'ios' ? '4%' : 0}
        cursor="pointer"
        opacity={selected === 3 ? 1 : 0.7}
        py="2"
        flex={1}
        onPress={() => handleNavigation(navigation, 'Home', 3)}
      >
        <Center>
          <Icon
            mb="1"
            as={
              <Ionicons
                name={
                  selected === 3
                    ? 'md-notifications'
                    : 'md-notifications-outline'
                }
              />
            }
            color="#5F84A2"
            size={Platform.OS === 'ios' ? 'xl' : 'lg'}
          />
          <Text color="rgba(0,0,0,0.6)" fontSize={7}>
            Notifications
          </Text>
        </Center>
      </Pressable>
      <Pressable
        mt={Platform.OS === 'ios' ? '4%' : 0}
        cursor="pointer"
        opacity={selected === 2 ? 1 : 0.6}
        py="2"
        flex={1}
        onPress={() => handleNavigation(navigation, 'Home', 2)}
      >
        <Center>
          <Icon
            mb="1"
            as={
              <MaterialCommunityIcons
                name={selected === 2 ? 'wallet' : 'wallet-outline'}
              />
            }
            color="#5F84A2"
            size={Platform.OS === 'ios' ? 'xl' : 'lg'}
          />
          <Text color="rgba(0,0,0,0.6)" fontSize={7}>
            Wallet
          </Text>
        </Center>
      </Pressable>
    </HStack>
  );
};

export { CustomFooter };

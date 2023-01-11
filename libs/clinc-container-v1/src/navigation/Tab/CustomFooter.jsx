import React, { useState } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  Ionicons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Center, Icon, HStack, Pressable, Text } from 'native-base';
import { AppTheme } from '../../constants';

////////////////// Components //////////////////
import QuickAction from '../../sharedComponents/FinalLayout/QuickAction';
function CustomFooter() {
  const [selected, setSelected] = useState(1);

  const navigation = useNavigation();

  function homeHandler() {
    setSelected(1);
    navigation.navigate('Dashboard');
  }
  function chattHandler() {
    setSelected(2);
    navigation.navigate('DashboardIcons');
  }
  function qrHandler() {
    setSelected(3);
    navigation.navigate('LibraryTest');
  }
  function notificationHandler() {
    setSelected(4);
    navigation.navigate('Agora');
  }
  function myProfile() {
    setSelected(5);
    navigation.navigate('AppointmentsReceptionistProfile');
  }
  return (
    <View>
      <View style={styles.QuickActionsBtn}>
        <QuickAction navigation={navigation} />
      </View>
      <HStack
        h={Platform.OS === 'ios' ? 20 : 12}
        bg="white"
        alignItems="center"
        shadow={6}
        borderTopRadius={20}
        safeAreaBottom
      >
        <Pressable
          cursor="pointer"
          mt={Platform.OS === 'ios' ? '4%' : 0}
          flex={1}
          onPress={() => {
            homeHandler();
            console.log(
              '//////////',
              navigation?.getState()?.routes[0]?.state.routes[0]?.state.routes[
                navigation?.getState()?.routes[0]?.state.routes[0]?.state
                  ?.routes.length - 1
              ].state.routes[0].name
            );
          }}
        >
          <Center>
            <Icon
              as={<Feather name="home" />}
              color={
                navigation?.getState()?.routes[0]?.state?.routes[0]?.state
                  ?.routes[
                  navigation?.getState()?.routes[0]?.state.routes[0]?.state
                    ?.routes.length - 1
                ]?.state?.routes[0]?.name === 'Dashboard'
                  ? AppTheme.info
                  : '#5F84A2'
              }
              size={Platform.OS === 'ios' ? 'xl' : 'lg'}
            />
            <Text color={'rgba(0,0,0,0.6)'} fontSize={7}>
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          mt={Platform.OS === 'ios' ? '4%' : 0}
          flex={1}
          onPress={() => {
            chattHandler();
          }}
        >
          {/* sada */}
          <Center>
            <Icon
              as={<Ionicons name="ios-chatbubble-ellipses-outline" />}
              color={
                navigation.getState()?.routes[0]?.state?.routes[0]?.state
                  ?.routes[
                  navigation?.getState()?.routes[0]?.state?.routes[0]?.state
                    ?.routes.length - 1
                ].name === 'ChattScreens'
                  ? AppTheme.info
                  : '#5F84A2'
              }
              size={Platform.OS === 'ios' ? 'xl' : 'lg'}
            />
            <Text color={'rgba(0,0,0,0.6)'} fontSize={7}>
              Chatt
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          mt={Platform.OS === 'ios' ? '4%' : 0}
          flex={1}
          onPress={() => {
            qrHandler();
          }}
        >
          <Center>
            <Icon
              as={<MaterialCommunityIcons name="camera-outline" />}
              color={
                navigation.getState()?.routes[0]?.state?.routes[0]?.state
                  ?.routes[
                  navigation?.getState()?.routes[0]?.state?.routes[0]?.state
                    ?.routes.length - 1
                ].name === 'LibraryTest'
                  ? AppTheme.info
                  : '#5F84A2'
              }
              size={Platform.OS === 'ios' ? 'xl' : 'lg'}
            />
            <Text color={'rgba(0,0,0,0.6)'} fontSize={7}>
              Camera
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          mt={Platform.OS === 'ios' ? '4%' : 0}
          flex={1}
          onPress={() => {
            notificationHandler();
          }}
        >
          <Center>
            <Icon
              as={<MaterialIcons name="notifications-none" />}
              color={'#5F84A2'}
              size={Platform.OS === 'ios' ? 'xl' : 'lg'}
            />
            <Text color={'rgba(0,0,0,0.6)'} fontSize={7}>
              Notfications
            </Text>
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          mt={Platform.OS === 'ios' ? '4%' : 0}
          flex={1}
          onPress={() => {
            myProfile();
          }}
        >
          <Center>
            <Icon
              as={<Feather name="user" />}
              color={
                navigation.getState()?.routes[0]?.state?.routes[0]?.state
                  ?.routes[
                  navigation?.getState()?.routes[0]?.state?.routes[0]?.state
                    ?.routes.length - 1
                ].name === 'AppointmentsReceptionistProfile'
                  ? AppTheme.info
                  : '#5F84A2'
              }
              size={Platform.OS === 'ios' ? 'xl' : 'lg'}
            />
            <Text color={'rgba(0,0,0,0.6)'} fontSize={7}>
              Profile
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  QuickActionsBtn: {
    position: 'absolute',
    right: 20,
    bottom: Platform.OS === 'ios' ? 95 : 55,
    width: 50,
    height: 50,
  },
});

export default CustomFooter;

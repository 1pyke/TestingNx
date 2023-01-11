import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Platform,
  Button,
} from 'react-native';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Box,
  Center,
  Icon,
  Text,
  HStack,
  NativeBaseProvider,
  Pressable,
} from 'native-base';
import {
  settingsHandler,
  componentsLoaderHandler,
  selectedHandler,
} from './store-finalLayout';
import { IconButton } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

////////////////// Components //////////////////
import {
  isQuickActionsOpenHandler,
  drawerHandler,
} from './store-finalLayout';
import QuickAction from './QuickAction';
import QuickActions from './QuickActions';
import Collaborate from './Collaborate';
import Dashboard from '../../Feature/Dashboard/Dashboard'

function Layout() {
  const [selected, setSelected] = useState(1);
  const [ShowQuickAction, setShowQuickAction] = useState(false)
  const layoutSore = useSelector((state) => state.finalLayoutStore);
  // const searchStore = useSelector(state => state.searchStore);
  // const [drawerState, setDrawerState] = useState('locked-closed')
  //  const navigationRef = useNavigationContainerRef();
  //  const dashboardStore = useSelector((state:any) => state.dashboard);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function homeHandler() {
    setSelected(1);
    navigation.navigate('Dashboard');
  }
function chattHandler (){
  setSelected(2);
  navigation.navigate('Chatt');
}
function qrHandler (){
  setSelected(3);
  navigation.navigate('LibraryTest');
}
function notificationHandler(){
  setSelected(4);
  navigation.navigate('NotificationIndex');
}
  function myProfile() {
    setSelected(5)
    navigation.navigate('AppointmentsReceptionistProfile');
  }
  return (  
    <View>
      <View style={styles.QuickActionsBtn}>
      <QuickAction navigation={navigation}/>
      </View>
    <HStack
    bg="white"
    alignItems="center"
    shadow={6}
    borderTopRadius={20}
    safeAreaBottom
    >
        <Pressable
          cursor="pointer"
          opacity={
            selected === 1 &&
            navigation.getState().routes[3].state?.routes[0].state.routes[navigation.getState().routes[3].state.routes[0].state.routes.length -1].name === 'Dashboard'
              ? 1
              : 0.5
          }
          py="3"
          flex={1}
          onPress={() => {
            homeHandler()
          }}
        >
          <Center>
            <Icon
              as={<MaterialCommunityIcons name="home" />}
              color={'#00796B'}
              size={Platform.OS === 'ios' ? 'xl' : 'lg'}
            />
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={
            selected === 2 &&
            navigation.getState().routes[3].state?.routes[0].state.routes[navigation.getState().routes[3].state.routes[0].state.routes.length -1].name === 'Chatt'
              ? 1
              : 0.5
          }
          py="3"
          flex={1}
          onPress={() => {
            chattHandler()
          }}
        >
          <Center>
            <Icon
              as={<MaterialCommunityIcons name="chat-processing-outline" />}
              color={'#00796B'}
              size={Platform.OS === 'ios' ? 'xl' : 'lg'}
            />
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={
            selected === 3 &&
            navigation.getState().routes[3].state?.routes[0].state.routes[navigation.getState().routes[3].state.routes[0].state.routes.length -1].name === 'LibraryTest'
              ? 1
              : 0.5
          }
          py="3"
          flex={1}
          onPress={() => {
            qrHandler()
           
          }}
          >
          <Center>
            <Icon
              as={<MaterialCommunityIcons name="qrcode-scan" />}
              color={'teal.700'}
              size={Platform.OS === 'ios' ? 'xl' : 'lg'}
            />
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={
            selected === 4 &&
            navigation.getState().routes[3].state?.routes[0].state.routes[navigation.getState().routes[3].state.routes[0].state.routes.length -1].name === 'NotificationIndex'
              ? 1
              : 0.5
          }
          py="3"
          flex={1}
          onPress={() =>{
            notificationHandler()
          }
          }
        >
          <Center>
            <Icon
              as={<MaterialIcons name="notifications" />}
              color={'teal.700'}
              size={Platform.OS === 'ios' ? 'xl' : 'lg'}
            />
          </Center>
        </Pressable>
        <Pressable
          cursor="pointer"
          opacity={
            selected === 5 &&
            navigation.getState().routes[3].state?.routes[0].state.routes[navigation.getState().routes[3].state.routes[0].state.routes.length -1].name === 'AppointmentsReceptionistProfile'
              ? 4
              : 0.4
            }
            py="3"
            flex={1}
            onPress={myProfile}
        >
          <Center>
            <Icon
              as={<MaterialCommunityIcons name="account-circle" />}
              color={'teal.700'}
              size={Platform.OS === 'ios' ? 'xl' : 'lg'}
              />
          </Center>
        </Pressable>
      </HStack>
      </View>
    );
  };

const styles = StyleSheet.create({
  QuickActionsBtn: {
    position: 'absolute',
    right: 20,
    bottom: Platform.OS === 'ios' ? 95 : 55,
    width: 50,
    height: 50,
  },
});

export default Layout;
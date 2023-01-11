import { Button, VStack, Avatar } from 'native-base';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Platform } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import SettingsIcon from '@expo/vector-icons/Feather';
const SideBarContents = ({ props, navigation }) => {
  const [SideBarContent, setSideBarContent] = useState([
    {
      name: 'My Profile',
      component: 'AppointmentsReceptionistProfile',
      icon: 'account',
    },
    {
      name: 'My Activty',
      component: 'MyActivity',
      icon: 'application-edit-outline',
    },
    { name: 'My Hr', component: 'Hr', icon: 'table-account' },
    {
      name: 'My Tasks',
      component: 'TasksCharts',
      icon: 'clipboard-file-outline',
    },
    { name: 'Incident', component: 'MyHr', icon: 'alert' },
    { name: 'Settings', component: 'SignIn', icon: 'settings' },
    { name: 'Logout', component: 'SignIn', icon: 'logout' },
  ]);
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: 'rgba(0,121,107,0.2)',
          height: '20%',
          marginTop: '10%',
        }}
      >
        <View
          style={{
            marginLeft: '7%',
            flexDirection: Platform.OS === 'ios' ? 'column' : 'row',
          }}
        >
          <Avatar
            marginLeft={Platform.OS === 'ios' ? '32%' : '0%'}
            size={Platform.OS === 'ios' ? '70px' : '60px'}
            source={{
              uri: 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-512.png',
            }}
          />
          <View style={{ flexDirection: 'column', marginTop: 10 }}>
            <Text
              style={{
                fontSize: 20,
                marginTop: '1%',
                marginLeft: '4%',
                color: '#00796B',
              }}
            ></Text>
            <Text
              style={{
                fontSize: 13,
                marginTop: '3%',
                marginLeft: '7%',
                color: 'black',
              }}
            ></Text>
          </View>
        </View>
      </View>
      <VStack>
        {SideBarContent.map((item) => {
          return (
            <View key={item.name} style={{ marginTop: 20, marginLeft: 15 }}>
              <Button
                onPress={() => {
                  navigation.navigate(item.component);
                }}
                style={{ justifyContent: 'flex-start' }}
                colorScheme="muted.900"
                variant="ghost"
                leftIcon={
                  item.icon === 'settings' ? (
                    <SettingsIcon
                      name={item.icon}
                      style={{
                        color: '#00796B',
                        fontSize: 25,
                        marginRight: '5%',
                      }}
                    />
                  ) : (
                    <Icon
                      name={item.icon}
                      style={{
                        color: '#00796B',
                        fontSize: 25,
                        marginRight: '5%',
                      }}
                    />
                  )
                }
              >
                {item.name}
              </Button>
            </View>
          );
        })}
      </VStack>
    </>
  );
};
export default SideBarContents;

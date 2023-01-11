import { Button, VStack, Text, Divider, View, Avatar } from 'native-base';
import React from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import SettingsIcon from '@expo/vector-icons/Feather';
import { SideBarContent } from '../../Constants';
import { reducers } from '@mobile-nx-apps/auth-store';

const CustomSideMenu = ({ props, navigation }) => {
  const dispatch = useDispatch();
  const dashboardStore2 = useSelector((state) => state.AuthStore);
  return (
    <View h={'100%'} bg={'#F2F2F2'}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#CADEED',
          height: '16%',
          // marginTop: '10%',
          borderBottomLeftRadius: 105,
          borderBottomRightRadius: 105,
        }}
      >
        <Text
          color={'rgba(0,0,0,0.6)'}
          fontSize={'2xl'}
          // textDecorationLine={'underline'}
          // textDecorationColor={'#808080'}
        >
          {dashboardStore2?.user?.name.en}
        </Text>
      </View>
      <View
        style={{
          bottom: '4%',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          size={Platform.OS === 'ios' ? '90px' : '80px'}
          source={
            dashboardStore2?.user?.image
              ? { uri: dashboardStore2?.user?.image }
              : {
                  uri: 'https://cdn4.iconfinder.com/data/icons/professions-1-2/151/3-512.png',
                }
          }
        />
        <View
          style={{
            flexDirection: 'column',
            marginTop: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 15,
              marginTop: '1%',
              color: 'rgba(0,0,0,0.6)',
            }}
          >
            {dashboardStore2?.user?.email}{' '}
          </Text>
          {/* <Text
            style={{
              fontSize: 9,
              marginTop: '3%',
              color: 'rgba(0,0,0,0.5)',
            }}
          >
            🇯🇴 +962 | 796810699
          </Text> */}
        </View>
      </View>
      <VStack
        bg={'white'}
        w={'90%'}
        h={'32%'}
        alignSelf={'center'}
        bottom={'6%'}
        mt={'10%'}
      >
        {SideBarContent.SideBarContent.map((item) => {
          return (
            <View key={item.name} style={{ marginLeft: 15 }}>
              <Button
                onPress={() => {
                  navigation.navigate(item.component, {});
                }}
                style={{ justifyContent: 'flex-start' }}
                colorScheme="muted.900"
                variant="ghost"
                leftIcon={
                  <Icon
                    name={item.icon}
                    style={{
                      color: '#5F84A2',
                      fontSize: Platform.OS === 'ios' ? 20 : 15,
                      marginRight: '5%',
                    }}
                  />
                }
              >
                <Text color={'rgba(0,0,0,0.5)'} fontSize={10}>
                  {item.name}
                </Text>
              </Button>
            </View>
          );
        })}
      </VStack>
      <VStack
        bg={'white'}
        w={'90%'}
        h={'10%'}
        alignSelf={'center'}
        bottom={'8%'}
        mt={'10%'}
      >
        {SideBarContent.sideBarContent2.map((item) => {
          return (
            <View key={item.name} style={{ marginLeft: 15 }}>
              <Button
                onPress={() => {
                  navigation.navigate(item.component, {});
                }}
                style={{ justifyContent: 'flex-start' }}
                colorScheme="muted.900"
                variant="ghost"
                leftIcon={
                  <Icon
                    name={item.icon}
                    style={{
                      color: '#5F84A2',
                      fontSize: Platform.OS === 'ios' ? 20 : 15,
                      marginRight: '5%',
                    }}
                  />
                }
              >
                <Text color={'rgba(0,0,0,0.5)'} fontSize={10}>
                  {item.name}
                </Text>
              </Button>
            </View>
          );
        })}
      </VStack>
      <VStack
        bg={'white'}
        w={'90%'}
        h={'14%'}
        alignSelf={'center'}
        bottom={'10%'}
        mt={'10%'}
      >
        {SideBarContent.sideBarContent3.map((item) => {
          return (
            <View key={item.name} style={{ marginLeft: 15 }}>
              <Button
                onPress={() => {
                  navigation.navigate(item.component, {});
                }}
                style={{ justifyContent: 'flex-start' }}
                colorScheme="muted.900"
                variant="ghost"
                leftIcon={
                  item.icon === 'settings' ? (
                    <SettingsIcon
                      name={item.icon}
                      style={{
                        color: '#5F84A2',
                        fontSize: Platform.OS === 'ios' ? 20 : 15,
                        marginRight: '5%',
                      }}
                    />
                  ) : (
                    <Icon
                      name={item.icon}
                      style={{
                        color: '#5F84A2',
                        fontSize: Platform.OS === 'ios' ? 20 : 15,
                        marginRight: '5%',
                      }}
                    />
                  )
                }
              >
                <Text color={'rgba(0,0,0,0.5)'} fontSize={10}>
                  {item.name}
                </Text>
              </Button>
            </View>
          );
        })}
        <Divider my={2} />
        <View style={{ marginLeft: 15 }}>
          {/* <Button
            onPress={async () => {
              navigation.closeDrawer();
              await dispatch(reducers.logout());
            }}
            style={{ justifyContent: 'flex-start', backgroundColor: '#B7D0E1' }}
            colorScheme="#5F84A2"
            variant="ghost"
            leftIcon={
              <Icon
                name={'logout'}
                style={{
                  color: 'black',
                  fontSize: 30,
                  marginRight: '18%',
                  marginLeft: '9%',
                }}
              />
            }
          >
            Log Out
          </Button> */}
        </View>
      </VStack>
    </View>
  );
};

export default CustomSideMenu;

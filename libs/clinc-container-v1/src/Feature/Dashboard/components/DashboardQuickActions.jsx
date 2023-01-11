import {
  Image,
  Box,
  Text,
  View,
  VStack,
  Actionsheet,
  Button,
  Checkbox,
  HStack,
  TextArea,
} from 'native-base';
import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Images } from '../../../constants/index';
const DashboardQuickActions = () => {
  const [groupValues, setGroupValues] = React.useState([]);
  const [dashboardQuickActions, setDashboardQuickActions] = useState([
    {
      Tittle: 'Kick consumer',
      imgPath: Images.Kick,
      isActive: false,
      description:
        'This action will send a notifiaction to the group of receptionist and your assistant, please if you want to confirm click Submit...',
    },
    {
      Tittle: 'Bring coffe',
      imgPath: Images.Coffe,
      isActive: false,
      description:
        'this action will send a notifiaction to the group of receptionist, oplease if ypu want confirm click Submit...',
    },
    {
      Tittle: 'Order items',
      imgPath: Images.Item,
      isActive: false,
      description:
        'This action will send a notifiaction to the group of receptionist and your assistant, please if you want to confirm click Submit...',
    },
    {
      Tittle: 'Come to office',
      imgPath: Images.ComeToMyOffice,
      isActive: false,
      description:
        'This action will send a notifiaction to the group of receptionist and your assistant, please if you want to confirm click Submit...',
      type: ['Receptionist', 'Assistants', 'Doctor', 'Specialists'],
    },
    {
      Tittle: 'Check facilty',
      imgPath: Images.Facility,
      isActive: false,
      description:
        'This action will send a notifiaction to the group of receptionist and your assistant, please if you want to confirm click Submit...',
    },
  ]);
  return (
    <View
      justifyContent={'flex-start'}
      h={'10%'}
      flexDirection={'row'}
      ml={'6%'}
      mb={Platform.OS === 'ios' ? '5%' : '7%'}
      bottom={Platform.OS === 'ios' ? 4 : 1}
    >
      {dashboardQuickActions.map((item, i) => (
        <View key={i}>
          <TouchableOpacity
            onPress={() => {
              if (item.Tittle !== 'Order items') {
                setDashboardQuickActions(
                  [...dashboardQuickActions].map((obj) => {
                    if (obj.Tittle === item.Tittle) {
                      return {
                        ...obj,
                        isActive: true,
                      };
                    } else return obj;
                  })
                );
              }
            }}
          >
            <Image
              ml={'3%'}
              source={item.imgPath}
              alt="QuickAction"
              size="sm"
            />
            <VStack ml={2}>
              <Text
                style={{
                  fontSize: Platform.OS === 'ios' ? 6 : 8,
                  marginRight: 2,
                  color: '#194569',
                  fontWeight: '400',
                }}
              >
                {item.Tittle}
              </Text>
            </VStack>
          </TouchableOpacity>
          <Actionsheet
            hideDragIndicator={Platform.OS === 'ios' ? true : false}
            isOpen={item.isActive}
            onClose={() => {
              setDashboardQuickActions(
                [...dashboardQuickActions].map((obj) => {
                  if (obj.Tittle === item.Tittle) {
                    return {
                      ...obj,
                      isActive: false,
                    };
                  } else return obj;
                })
              );
            }}
          >
            <Actionsheet.Content justifyContent={'center'}>
              <Box w="100%" h={60} px={4} justifyContent="center">
                <Text fontSize={16} color="#5F84A2">
                  {item.Tittle}
                </Text>
              </Box>
              {/* <Actionsheet.Item
                onPress={() => {
                  setDashboardQuickActions(
                    [...dashboardQuickActions].map((obj) => {
                      if (obj.Tittle === item.Tittle) {
                        return {
                          ...obj,
                          isActive: false,
                        };
                      } else return obj;
                    })
                  );
                }}
              >
                Delete
              </Actionsheet.Item> */}
              {item.Tittle === 'Kick consumer' ||
              item.Tittle === 'Bring coffe' ? (
                <>
                  <Actionsheet.Item fontWeight={'hairline'}>
                    {item.description}
                  </Actionsheet.Item>
                  <Actionsheet.Item
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'white',
                      marginRight: '10%',
                    }}
                  >
                    <Button bg={'#5F84A2'} w={'120%'} mb={'10%'}>
                      Send
                    </Button>
                    <Button
                      onPress={() => {
                        setDashboardQuickActions(
                          [...dashboardQuickActions].map((obj) => {
                            if (obj.Tittle === item.Tittle) {
                              return {
                                ...obj,
                                isActive: false,
                              };
                            } else return obj;
                          })
                        );
                      }}
                      variant="outline"
                      w={'120%'}
                    >
                      Cancel
                    </Button>
                  </Actionsheet.Item>
                </>
              ) : (
                ''
              )}
              {item.Tittle === 'Come to office' ? (
                <>
                  <Checkbox.Group
                    onChange={setGroupValues}
                    value={groupValues}
                    w={'100%'}
                  >
                    {item.type.map((type, i) => (
                      <HStack
                        key={i}
                        w={'100%'}
                        justifyContent={'space-between'}
                        mb={'8%'}
                      >
                        <Text>{type}</Text>
                        <Checkbox aria-label="Close" value={type} />
                      </HStack>
                    ))}
                  </Checkbox.Group>

                  <Actionsheet.Item
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'white',
                      marginRight: '10%',
                    }}
                  >
                    <Button bg={'#5F84A2'} w={'120%'} mb={'10%'}>
                      Next
                    </Button>
                    <Button
                      onPress={() => {
                        setDashboardQuickActions(
                          [...dashboardQuickActions].map((obj) => {
                            if (obj.Tittle === item.Tittle) {
                              return {
                                ...obj,
                                isActive: false,
                              };
                            } else return obj;
                          })
                        );
                      }}
                      variant="outline"
                      w={'120%'}
                    >
                      Cancel
                    </Button>
                  </Actionsheet.Item>
                </>
              ) : (
                ''
              )}
              {item.Tittle === 'Check facilty' ? (
                <>
                  <Box alignItems="center">
                    <TextArea
                      h={20}
                      placeholder="Text Area Placeholder"
                      w="80%"
                    />
                  </Box>
                  <Actionsheet.Item
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      color: 'white',
                      marginRight: '12%',
                    }}
                  >
                    <Button bg={'#5F84A2'} w={'120%'} mb={'10%'}>
                      Send
                    </Button>
                    <Button
                      onPress={() => {
                        setDashboardQuickActions(
                          [...dashboardQuickActions].map((obj) => {
                            if (obj.Tittle === item.Tittle) {
                              return {
                                ...obj,
                                isActive: false,
                              };
                            } else return obj;
                          })
                        );
                      }}
                      variant="outline"
                      w={'120%'}
                    >
                      Cancel
                    </Button>
                  </Actionsheet.Item>
                </>
              ) : (
                ''
              )}
            </Actionsheet.Content>
          </Actionsheet>
        </View>
      ))}
    </View>
  );
};

export default DashboardQuickActions;

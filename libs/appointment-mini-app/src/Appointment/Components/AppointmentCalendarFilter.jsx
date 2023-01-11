import { Platform } from 'react-native';
import React from 'react';
import {
  View,
  Text,
  Actionsheet,
  Box,
  Button,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  useDisclose,
  Divider,
} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

const AppointmentCalendarFilter = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [groupValues, setGroupValues] = React.useState([]);
  return (
    <View
      w={'100%'}
      bottom={Platform.OS === 'ios' ? '5%' : '4%'}
      justifyContent={'flex-end'}
      alignItems={'flex-end'}
    >
      <IconButton
        onPress={onOpen}
        icon={<Icon as={FontAwesome} name="sliders" />}
        borderRadius="full"
        _icon={{
          color: '#5F84A2',
          size: 'md',
        }}
        _hover={{
          bg: '#194569',
        }}
        _pressed={{
          bg: '#194569:alpha.20',
          _icon: {
            name: 'emoji-flirt',
          },
          _ios: {
            _icon: {
              size: '2xl',
            },
          },
        }}
        _ios={{
          _icon: {
            size: 'xl',
          },
        }}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box
            alignItems={'center'}
            w="100%"
            h={60}
            px={4}
            justifyContent="center"
          >
            <Text
              fontSize={16}
              color="gray.500"
              _dark={{
                color: 'gray.300',
              }}
            >
              Filters
            </Text>
            <Divider my={2} />
          </Box>
          <HStack mb={'2%'} space={40}>
            <View mb={'5%'}>
              <Text color={'#5F84A2'}>By Consumer Name</Text>
            </View>
            <View justifyContent={'flex-end'} alignItems={'flex-end'}>
              <Text fontSize={'xs'} color={'#194569'}>
                View All
              </Text>
            </View>
          </HStack>
          <Divider my={2} />
          <HStack mb={'2%'} space={235}>
            <View mb={'5%'}>
              <Text color={'#5F84A2'}>By Provider</Text>
            </View>
            <View justifyContent={'flex-end'} alignItems={'flex-end'}>
              <Text fontSize={'xs'} color={'#194569'}>
                View All
              </Text>
            </View>
          </HStack>
          <Divider my={2} />
          <HStack mb={'2%'} space={245}>
            <View mb={'5%'}>
              <Text color={'#5F84A2'}>By Service</Text>
            </View>
            <View justifyContent={'flex-end'} alignItems={'flex-end'}>
              <Text fontSize={'xs'} color={'#194569'}>
                View All
              </Text>
            </View>
          </HStack>
          <Divider my={2} />
          <View width={'100%'} justifyContent={'flex-start'}>
            <View mb={'2%'}>
              <Text color={'#5F84A2'}>By Appointment Type</Text>
            </View>
            <View
              mb={'5%'}
              justifyContent={'space-evenly'}
              flexDirection={'row'}
              alignItems={'center'}
            >
              <Checkbox.Group
                ml={10}
                onChange={setGroupValues}
                value={groupValues}
                w={'100%'}
              >
                <HStack justifyContent={'space-between'} space={7} mb={'2%'}>
                  <Checkbox aria-label="Close" value={'Follow Up'} />
                  <Text mr={'5%'} color={'#194569'}>
                    Follow Up
                  </Text>
                  <Checkbox aria-label="Close" value={'New'} />
                  <Text color={'#194569'}>New</Text>
                </HStack>
              </Checkbox.Group>
            </View>
          </View>
          <Divider my={2} />
          <HStack mb={'2%'} space={40}>
            <View mb={'5%'}>
              <Text color={'#5F84A2'}>By Appointment Date</Text>
            </View>
            <View justifyContent={'flex-end'} alignItems={'flex-end'}>
              <Text fontSize={'xs'} color={'#194569'}>
                View All
              </Text>
            </View>
          </HStack>
          <Divider my={2} />
          <Actionsheet.Item
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              marginRight: '10%',
            }}
          >
            <Button bg={'#5F84A2'} w={'120%'} mb={'10%'}>
              Filter
            </Button>
            <Button variant="outline" w={'120%'}>
              Reset
            </Button>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default AppointmentCalendarFilter;

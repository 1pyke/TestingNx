import {
  View,
  Text,
  Divider,
  HStack,
  Button,
  Image,
  VStack,
  IconButton,
  Icon,
  useDisclose,
} from 'native-base';
import { Images } from '@mobile-nx-apps/clinc-container-v1';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import UpdateService from './UpdateService';
const initialServiceValues = [
  {
    number: '1.',
    service: 'Botox Dysport',
    name: 'Sara',
    room: 'Room',
    firstPrice: 100,
    SecoundPrice: 150,
    value: 2,
    id: 1,
  },
  {
    number: '2.',
    service: 'Filler Cytocal',
    name: 'Sara',
    room: 'Room',
    firstPrice: 120,
    value: 1,
    id: 2,
  },
  {
    number: '3.',
    service: 'Filler guvederm',
    name: 'Sara',
    room: 'Room',
    firstPrice: 120,
    value: 1,
    id: 3,
  },
];
const AppointmentDetails = ({ route }) => {
  const [Total, SetTotal] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclose();
  const navigation = useNavigation();
  const [service, setServices] = useState(initialServiceValues);
  useEffect(() => {
    let totalCost = 0;
    for (let i = 0; i < service.length; i++) {
      const item = service[i];
      totalCost += item.value * item.firstPrice;
    }
    SetTotal(totalCost);
  }, [service]);
  return (
    <View backgroundColor={'#FFFAFA'} h={'100%'}>
      <View justifyContent={'center'} alignItems={'center'} fontSize={'lg'}>
        <Text color={'#194569'}>AppointmentDetails</Text>
        <Divider my={'2%'} />
      </View>
      <View ml={'6%'}>
        <HStack space={'35%'}>
          <Text color={'#5F84A2'} mt={'3%'} fontSize={'sm'}>
            Patient Details
          </Text>
          <Button
            onPress={() => console.log(route?.params.services[0].price)}
            variant={'ghost'}
            colorScheme={'amber'}
          >
            {route?.params?.status?.name?.en}
          </Button>
        </HStack>
        <HStack mt={'2%'} space={'3%'}>
          <Image
            size={70}
            borderRadius={100}
            source={
              route?.params?.consumer?.image
                ? { uri: route?.params?.consumer?.image }
                : Images.Doctor
            }
            alt="image"
          />
          <VStack>
            <Text color={'rgba(0,0,0,0.6)'} mt={'3%'} fontSize={'xs'}>
              {route?.params?.consumer?.name?.en}
            </Text>
            <Text color={'muted.400'} mt={'3%'} fontSize={'xs'}>
              {route?.params?.consumer?.primaryPhone?.country_code}{' '}
              {route?.params?.consumer?.primaryPhone?.number}
            </Text>
          </VStack>
        </HStack>
      </View>
      <Divider my={'3%'} />
      <HStack alignItems={'center'} ml={'6%'} space={'3%'}>
        <Icon as={MaterialCommunityIcons} name={'doctor'} />
        <Text color={'#5F84A2'}>Doctor</Text>
        <Text color={'#5F84A2'}>|</Text>
        <Text color={'muted.400'}>{route?.params?.provider?.name?.en}</Text>
      </HStack>
      <Divider my={'2%'} />
      <HStack alignItems={'center'} space={'3%'} ml={'6%'}>
        <Icon as={MaterialCommunityIcons} name={'needle'} />
        <Text color={'#5F84A2'}>Service</Text>
        <IconButton
          onPress={onOpen}
          ml={'60%'}
          variant={'ghost'}
          colorScheme="amber"
          _icon={{
            as: AntDesign,
            name: 'edit',
          }}
        />
        <UpdateService
          setServices={setServices}
          details={route.params}
          onClose={onClose}
          isOpen={isOpen}
        />
      </HStack>
      <Text mb={'2%'} color={'#5F84A2'} fontSize={'sm'} alignSelf={'center'}>
        Total Services : {route?.params?.services.length}
      </Text>
      {route?.params?.services.length <= 0 ? (
        <Text color={'red.500'} alignSelf={'center'}>
          There's No Services{' '}
        </Text>
      ) : (
        route?.params?.services.map((item, index) => (
          <HStack key={`${item.id}-${index}`} mb={'1%'} ml={'5%'}>
            <Text fontSize={'xs'} color={'#5F84A2'}>
              {index + 1}{' '}
            </Text>
            <Text
              w={'30%'}
              numberOfLines={1}
              fontSize={'xs'}
              color={'rgba(0,0,0,0.4)'}
            >
              {' '}
              {item?.service?.serviceInfo?.name?.en}
            </Text>
            {console.log(item?.service, '}{}{}{{')}
            <Text ml={1} fontSize={'xs'} color={'rgba(0,0,0,0.4)'}>
              {' '}
              |
            </Text>
            <Text
              w={'10%'}
              numberOfLines={1}
              ml={1}
              fontSize={'xs'}
              color={'rgba(0,0,0,0.4)'}
            >
              {' '}
              {route?.params?.provider?.name?.en}
            </Text>
            <Text ml={1} fontSize={'xs'} color={'rgba(0,0,0,0.4)'}>
              {' '}
              |
            </Text>
            <Text
              w={'12%'}
              numberOfLines={1}
              ml={1}
              fontSize={'xs'}
              color={'rgba(0,0,0,0.4)'}
            >
              Room{item.room}
            </Text>
            <Text ml={1} fontSize={'xs'} color={'rgba(0,0,0,0.4)'}>
              {' '}
              |
            </Text>
            <Text
              w={'15%'}
              numberOfLines={1}
              ml={1}
              fontSize={'xs'}
              color={'rgba(0,0,0,0.4)'}
            >
              {item?.service?.providers[0]?.price?.maximumPrice} JD
            </Text>
            <Text ml={1} fontSize={'xs'} color={'rgba(0,0,0,0.4)'}>
              {' '}
              |
            </Text>
            <View
              w={'6%'}
              ml={'2%'}
              numberOfLines={1}
              bg={'#91AEC4'}
              justifyContent={'center'}
              alignItems={'center'}
              borderRadius={'full'}
            >
              <Text fontSize={'xs'} color={'white'}>
                1
              </Text>
            </View>
          </HStack>
        ))
      )}
      <HStack mt={'3%'} ml={'5%'} space={'30%'}>
        <Text color={'#5F84A2'} fontSize={'xs'}>
          Total Price :
          {route?.params.services[0].price.split('-')[0] !==
          route?.params.services[0].price.split('-')[1]
            ? route?.params.services[0].price.split('-')[0]
            : route?.params.services[0].price}{' '}
          JD
        </Text>
        <Text color={'#5F84A2'} fontSize={'xs'}>
          Promo Code
        </Text>
      </HStack>
      <Divider my={'3%'} />
      <HStack alignItems={'center'} ml={'6%'} space={'3%'}>
        <Icon
          as={MaterialCommunityIcons}
          name={'file-table-box-multiple-outline'}
        />
        <Text color={'#5F84A2'}>Type & Setting</Text>
        <Text mt={'1%'} color={'muted.400'} fontSize={'xs'}>
          Follow Up
        </Text>
        <Text mt={'1%'} fontSize={'xs'} color={'#5F84A2'}>
          |
        </Text>
        <Text mt={'1%'} color={'muted.400'} fontSize={'xs'}>
          {route?.params?.locationSetting?.name?.en}
        </Text>
        {/* <IconButton
          disabled
          variant={'ghost'}
          colorScheme="light"
          _icon={{
            as: AntDesign,
            name: 'edit',
          }}
        /> /// Auf dem Weg nach oben, will die Million
        Geh zur Seite, Digga, ich will alles hol'n
        Für dich ist Mero seine Liga viel zu hoch 
        Und bald bin ich in den Charts, QDH */}
      </HStack>
      <Divider my={'3%'} />
      <HStack alignItems={'center'} ml={'6%'} space={'5%'}>
        <Icon as={MaterialCommunityIcons} name={'clock-time-three-outline'} />
        <Text color={'#5F84A2'}>Date & Time</Text>
        <Text mt={'1%'} fontSize={'xs'} color={'#5F84A2'}>
          |
        </Text>
        <Text mt={'1%'} color={'muted.400'} fontSize={'xs'}>
          {route?.params?.date}
        </Text>
        <IconButton
          ml={'10%'}
          onPress={() => {
            navigation.navigate('Reschedule');
          }}
          variant={'ghost'}
          colorScheme="amber"
          _icon={{
            as: AntDesign,
            name: 'edit',
          }}
        />
      </HStack>
      <Divider my={'3%'} />
      <HStack alignItems={'center'} ml={'6%'} space={'3%'}>
        <Icon
          as={MaterialCommunityIcons}
          name={'arrow-up-thin-circle-outline'}
        />
        <Text width={'25%'} color={'#5F84A2'}>
          Priority
        </Text>
        <Text mt={'1%'} fontSize={'xs'} color={'#5F84A2'}>
          |
        </Text>
        <Text width={'42%'} mt={'1%'} color={'red.400'} fontSize={'xs'}>
          {route?.params?.priority?.name?.en}
        </Text>
        {/* <IconButton
          disabled
          variant={'ghost'}
          colorScheme="light"
          _icon={{
            as: AntDesign,
            name: 'edit',
          }}
        /> we will add it later */}
      </HStack>
      <Divider my={'3%'} />
    </View>
  );
};

export { AppointmentDetails };
// Auf dem Weg nach oben, will die Million (skrrt, skrrt)
// Geh zur Seite, Digga, ich will alles holen (wouh, ah, ah, ah, ah)
// Für dich ist Mero seine Liga viel zu hoch (pah)
// Und bald bin ich in den Charts, QDH (QDH, QDH, H, H, brrra)

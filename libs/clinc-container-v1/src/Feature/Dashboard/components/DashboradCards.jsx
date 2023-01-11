import { Box, Image, Pressable, Text, View } from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Images } from '../../../constants/index';

const DashboradCards = ({ navigation }) => {
  const [cards, SetCards] = useState([
    {
      name: 'Appointments',
      image: Images.DashboardCards[0],
      navigation: 'AppointmenIndex',
      description: 'total 10',
      avaliable: true,
    },
    {
      name: 'MyHr',
      image: Images.DashboardCards[1],
      navigation: 'HRindex',
      description: 'New Submitted',
      avaliable: true,
    },
    {
      name: 'MyWallet',
      image: Images.DashboardCards[2],
      navigation: 'WalletIndex',
      description: 'Total Revenue 1k',
      avaliable: true,
    },
    {
      name: 'MyServices',
      image: Images.DashboardCards[3],
      navigation: 'AllServices',
      description: 'Total 25',
      avaliable: true,
    },
    {
      name: 'Referal',
      image: Images.DashboardCards[4],
      navigation: 'Referral',
      description: 'Total 30',
      avaliable: true,
    },
    {
      name: 'MyConsumers',
      image: Images.DashboardCards[5],
      navigation: 'MyConsumers',
      description: 'Total 1k',
      avaliable: true,
    },
  ]);
  return (
    <View h={Platform.OS === 'ios' ? '500' : '450'} bg={'#FFFAFA'} flex={'1'}>
      <Box
        alignItems="flex-start"
        ml={'4%'}
        flexDirection={'row'}
        flexWrap={'wrap'}
      >
        {cards.map((card, i) => (
          <Pressable
            key={i}
            onPress={() =>
              card.avaliable
                ? navigation.navigate(card.navigation)
                : console.log('not avaliable')
            }
            _pressed={{ backgroundColor: '#e6e6e6' }}
            marginBottom={'3%'}
            marginRight={'3'}
            shadow={9}
            w={'29%'}
            h={'40%'}
            rounded="lg"
            borderColor="teal"
            justifyContent={'center'}
            alignItems={'center'}
            _light={{
              backgroundColor: 'gray.50',
            }}
          >
            <Text
              fontSize={Platform.OS === 'ios' ? '2xs' : '2xs'}
              color={'#194569'}
              fontWeight={'400'}
            >
              {card.name}
            </Text>
            <View justifyContent={'center'} h={'65%'} w={'55%'}>
              <Image h={'65%'} w={100} source={card.image} alt="image" />
            </View>
            <View>
              <Text
                mb={3}
                fontSize={Platform.OS === 'ios' ? '2xs' : '2xs'}
                color={'#696969'}
                fontWeight={'200'}
              >
                {card.description}
              </Text>
            </View>
          </Pressable>
        ))}
      </Box>
    </View>
  );
};

export default DashboradCards;

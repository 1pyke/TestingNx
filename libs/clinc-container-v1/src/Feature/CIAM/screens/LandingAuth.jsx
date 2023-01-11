import { Box, Button, Image, Text, View } from 'native-base';
import React, { useRef, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { Images } from '../../../constants/index';
export const SLIDER_WIDTH = Dimensions.get('window').width + 20;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);
const LandingAuth = ({ navigation }) => {
  let carousel = useRef();
  const [activeIndex, setactiveIndex] = useState(0);
  const [carouselItems, setcarouselItems] = useState([
    {
      ImageUrl: Images.LandingAuth[0],
      text: 'Welcome To Laser Avenue',
      alt: 'image1',
    },
    {
      ImageUrl: Images.LandingAuth[1],
      text: 'We Support You Through Out Your Journey To Well-Being',
      alt: 'image2',
    },
    {
      ImageUrl: Images.LandingAuth[2],
      text: 'We Support You Through Out Your Journey To Well-Being',
      alt: 'image3',
    },
    {
      ImageUrl: Images.LandingAuth[3],
      text: 'We Support You Through Out Your Journey To Well-Being',
      alt: 'image4',
    },
    {
      ImageUrl: Images.LandingAuth[4],
      text: 'We Support You Through Out Your Journey To Well-Being',
      alt: 'image5',
    },
  ]);
  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <Image
          alt={item.alt}
          resizeMode="contain"
          source={item.ImageUrl}
          style={{
            width: ITEM_WIDTH,
            height: Platform.OS === 'ios' ? 550 : 500,
            borderBottomLeftRadius: 56,
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        />
        <Box
          style={{
            bottom: 100,
            fontSize: 20,
            fontWeight: 'bold',
            width: Platform.OS === 'ios' ? 431 : 395,
            height: 100,
            borderBottomLeftRadius: 56,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(25, 69, 105, 0.9)',
          }}
        >
          <LinearGradient
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 100,
              borderBottomLeftRadius: 56,
              justifyContent: 'center',
            }}
            colors={['rgba(255,255,255,1)', 'transparent']}
          >
            <Text color={'white'} fontWeight={'bold'} ml={'3'}>
              {item.text}{' '}
            </Text>
          </LinearGradient>
        </Box>
      </View>
    );
  };
  return (
    <View style={{ backgroundColor: '#FFFFFF', height: '100%' }}>
      <View>
        <Carousel
          layout="tinder"
          layoutCardOffset={5}
          ref={carousel}
          data={carouselItems}
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          inactiveSlideShift={0}
          useScrollView={true}
          onSnapToItem={(index) => setactiveIndex(index)}
        />
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          containerStyle={{
            position: 'absolute',
            top: Platform.OS === 'ios' ? 530 : 480,
          }}
          dotStyle={{
            width: 20,
            height: 10,
            borderRadius: 50,
            marginHorizontal: 20,
            backgroundColor: '#194569',
          }}
          inactiveDotStyle={{
            backgroundColor: '#91AEC4',
          }}
          inactiveDotScale={0.8}
        />
      </View>
      <View
        style={{
          height: Platform.OS === 'ios' ? '15%' : '10%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Button
            size="lg"
            colorScheme={'info'}
            _text={{
              color: '#FFFFFF',
            }}
            style={{
              width: Platform.OS === 'ios' ? '40%' : '40%',
              borderBottomEndRadius: 20,
              marginLeft: 30,
            }}
            onPress={() => navigation.navigate('SignIn')}
          >
            Login
          </Button>
          <Button
            _text={{
              color: 'rgba(0,0,0,0.7)',
            }}
            size="lg"
            variant={'subtle'}
            colorScheme={'info'}
            style={{
              borderBottomEndRadius: 20,
              width: Platform.OS === 'ios' ? '44%' : '40%',
              marginRight: 30,
              marginLeft: 30,
            }}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            top: 40,
          }}
        >
          <Text style={{ color: '#91AEC4' }}>
            Are U Looking for Help ? <Text color={'#194569'}>Click Here</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LandingAuth;

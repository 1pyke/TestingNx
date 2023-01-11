import { StyleSheet, Text, View, Dimensions, Animated, Easing } from 'react-native';
import React from 'react'
import { Center, Image } from 'native-base'

const { width, height } = Dimensions.get('screen');

const SlideItem = ({ item }) => {
  const translateYImage = new Animated.Value(0);
  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}   >
      <Animated.Image
        source={{ uri: item.image }}
        resizeMode="cover"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />
      {/* <Image resizeMode={'cover'} rounded="lg" mx="3" my="5" */}
      {/* style={{ width: '93%', height: 200 }} source={{ uri: item.image }} alt="Alternate Text" /> */}
    </View>
  )
}

export default SlideItem

const styles = StyleSheet.create({
  container: {
    width,
    height: 250,
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 0.4,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginVertical: 12,
    color: '#333',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
})
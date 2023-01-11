import { useState } from 'react';
import { Box, Center, Text, View, Pressable } from 'native-base';
import { FlatList, StyleSheet } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
const CarouselBalance = ({ navigation }) => {
  const _renderItem = ({ item, index }) => {
    const handleNavigate = () => {
      navigation.navigate('cash-in', item);
    };
    return (
      <Pressable onPress={handleNavigate} h={32}>
        <Box
          bg="#fff"
          borderRadius={8}
          marginLeft={25}
          style={styles.shadow}
          padding={4}
          width={200}
        >
          <CircularProgress
            radius={20}
            value={2}
            delay={1000}
            maxValue={10}
            activeStrokeWidth={10}
            progressValueColor={'#194569'}
            titleColor={'#fff'}
            activeStrokeColor={'#194569'}
            strokeColorConfig={[
              { color: '#194569', value: 0 },
              { color: '#194569', value: 4 },
              { color: '#194569', value: 8 },
              { color: '#194569', value: 10 },
            ]}
          />
          <View mt={'2%'}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </Box>
      </Pressable>
    );
  };

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([
    {
      title: '+1200.244 JOD',
      text: 'CASH IN',
      //icon
      iconName: 'cash-plus',
    },
    {
      title: '-900.000 JOD',
      text: 'CASH OUT',
      iconName: 'cash-minus',
    },
    {
      title: '+850.000 JOD',
      text: 'INCOMING PAYMENT',
      iconName: 'payment',
    },
  ]);
  return (
    <View
      style={styles.container}
      h={'35%'}
      position={'absolute'}
      top={'32%'}
      zIndex={1}
      width={'100%'}
    >
      <Center horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.itemContainer}>
          <FlatList
            data={carouselItems}
            renderItem={_renderItem}
            keyExtractor={(item) => item.title}
            horizontal={carouselItems.length <= 3}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </Center>
    </View>
  );
};

export default CarouselBalance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  flatList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: 'floralwhite',
    borderRadius: 15,
    height: 10,
    padding: 20,
  },
  title: {
    fontSize: 16,
    color: '#02416D',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    width: 170,
  },
});

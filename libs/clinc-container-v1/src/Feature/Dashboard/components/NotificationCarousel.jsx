import { useFocusEffect } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Pressable,
  Image,
  PanResponder,
  Platform,
} from 'react-native';
import Icon from '@expo/vector-icons/Fontisto';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { requestBuilder } from '../../../requestBuilder';
import { Heading } from 'native-base';

const NotificationCarousel = () => {
  const [unReadNotification, setunReadNotification] = useState([
    { notification_subject: '', createdAt: '', sender_name: '' },
  ]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [delIcon, setdelIcon] = useState('arrow-down-bold');
  const dispatch = useDispatch();
  const dashboardStore = useSelector((state) => state.dashboard);
  const scrollX = useRef(new Animated.Value(0)).current;

  const pan = useRef(new Animated.ValueXY()).current;
  //const del = useRef(false);
  const [del, setdel] = useState({ current: false });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        setdelIcon('delete');
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: pan.x, dy: pan.y },
        { useNativeDriver: false },
      ]),
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
        }).start();

        pan.y._value > 180 ? (del.current = true) : (del.current = false);
        setdelIcon('arrow-down-bold');
      },
      // onPanResponderRelease: () => {
      //   //pan.flattenOffset();
      //   Animated.spring(pan, {
      //     toValue: { x: 0, y: 0 },
      //     friction: 5,
      //   }).start();
      // },
    })
  ).current;

  useFocusEffect(
    React.useCallback(() => {
      getNotifications();
    }, [deleteFlag])
  );
  async function deleteNotification(item) {
    // console.log('itemitemitem',item);
    // await axios(requestBuilder('notifications','/notifications/delete/:id','delete',{id:item.id})).then(results=>{
    //     let notificationAfterDelete=unReadNotification.filter(item=>item.is_deleted !==true)
    //     setunReadNotification(notificationAfterDelete)
    //     setDeleteFlag(!deleteFlag) })
    try {
      await axios(
        requestBuilder('notifications', '/notifications/unread/:id', 'put', {
          id: item.notification_id,
          // "is_unread":!payload.is_unread
        })
      );
    } catch (error) {
      console.log('kkkkkkkkkkkkk', error);
    }
    setDeleteFlag(!deleteFlag);
  }
  async function getNotifications() {
    await axios(
      requestBuilder('notifications', '/notifications/receivers/:id', 'get', {
        id: dashboardStore.userToken.userId,
      })
    ).then((results) => {
      let unReadNoti = [];

      for (let i = 0; i < results.data.length; i++) {
        if (results.data[i].is_unread) {
          unReadNoti.push(results.data[i]);
        }
      }
      setunReadNotification(['', ...unReadNoti]);
    });
  }
  const { width: windowWidth } = useWindowDimensions();
  return (
    <View></View>
    // <SafeAreaView style={styles.container}>
    //   <View style={styles.scrollContainer}>
    //     <ScrollView
    //     nestedScrollEnabled={true}
    //       horizontal={true}
    //       showsHorizontalScrollIndicator={false}
    //       onScroll={Animated.event([
    //         {
    //           nativeEvent: {
    //             contentOffset: {
    //               x: scrollX,
    //             },
    //           },
    //         },
    //       ],{useNativeDriver: false})}
    //       scrollEventThrottle={1}
    //     >
    //       {unReadNotification.map((item, imageIndex) => {
    //         return (
    //           <View>
    //             {imageIndex !== 0 && (
    //               <Animated.View
    //                 style={{
    //                   transform: [{ translateY: pan.y }],
    //                 }}
    //                 {...panResponder.panHandlers}
    //                 onTouchEnd={() => del.current && deleteNotification(item)}
    //               >
    //                 <Pressable>
    //                   <View
    //                     style={{
    //                       width: windowWidth * 0.8,
    //                       marginRight: 10,
    //                       marginLeft: 10,
    //                       borderColor: '#06919D',
    //                       borderRadius: 10,
    //                       height: 70,
    //                       padding: 10,
    //                       backgroundColor: '#FFF6EA',
    //                     }}
    //                     key={imageIndex}
    //                   >
    //                     <View style={{ flexDirection: 'row' }}>
    //                       <Image
    //                         style={styles.tinyLogo}
    //                         source={
    //                           item.sender_image
    //                             ? { uri: item.sender_image }
    //                             : {
    //                                 uri: 'https://myupchar-banner.s3.ap-south-1.amazonaws.com/widget/avatar/doctor-avatar-female.png',
    //                               }
    //                         }
    //                       />
    //                       {
    //                         <Text bold style={{ color: 'teal' }}>
    //                           {' '}
    //                           {item.sender_name.toUpperCase()}
    //                         </Text>
    //                       }
    //                       <Pressable
    //                         style={{
    //                           position: 'absolute',
    //                           right: 8,
    //                           bottom: -5,
    //                           borderWidth: 3,
    //                           borderRadius: 50,
    //                           borderColor:
    //                             delIcon === 'arrow-down-bold'
    //                               ? 'black'
    //                               : 'tomato',
    //                         }}
    //                       >
    //                         <MaterialCommunityIcons
    //                           name={delIcon}
    //                           size={18}
    //                           color={
    //                             delIcon === 'arrow-down-bold'
    //                               ? 'black'
    //                               : 'tomato'
    //                           }
    //                         />
    //                       </Pressable>

    //                       <Text
    //                         style={{
    //                           position: 'absolute',
    //                           right: 0,
    //                           top: 0,
    //                           color: '#11567C',
    //                         }}
    //                       >
    //                         <Icon color="#11567C" name="date" />{' '}
    //                         {`${
    //                           parseInt(item.createdAt.slice(11, 16)) + 3
    //                         }${item.createdAt.slice(13, 16)}`}
    //                       </Text>
    //                     </View>
    //                     <Text
    //                       style={{
    //                         color: '#11567C',
    //                         fontSize: 12,
    //                         paddingTop: 5,
    //                         position: 'absolute',
    //                         left: 62,
    //                         bottom: 20,
    //                       }}
    //                     >
    //                       {item.notification_subject}
    //                     </Text>
    //                   </View>
    //                 </Pressable>
    //               </Animated.View>
    //             )}
    //             {imageIndex === 0 && (
    //               <Pressable>
    //                 <View style={styles.notificationSection}>
    //                   <Image
    //                     style={{
    //                       position: 'absolute',
    //                       top: 10,
    //                       left: 10,
    //                       width: 50,
    //                       height: 50,
    //                     }}
    //                     source={require('../../assests/notification-bell.png')}
    //                   />
    //                   <View
    //                     style={{
    //                       width: 20,
    //                       height: 20,
    //                       borderRadius: 18,
    //                       backgroundColor: 'red',
    //                       position: 'absolute',
    //                       top: 10,
    //                       left: 48,
    //                     }}
    //                   >
    //                     <Heading
    //                       style={{
    //                         color: 'white',
    //                         fontSize: 14,
    //                         height: Platform.OS === 'ios' ? 180 : 20,
    //                         textAlign: 'center',
    //                         bottom: Platform.OS === 'ios' ? 10 : 5,
    //                         marginRight: Platform.OS === 'ios' ? 5 : 0,
    //                       }}
    //                     >
    //                       {' '}
    //                       {unReadNotification.length - 1}{' '}
    //                     </Heading>
    //                   </View>
    //                   <Heading
    //                     style={{
    //                       textAlign: 'center',
    //                       paddingTop: 20,
    //                       color: 'teal',
    //                     }}
    //                   >
    //                     {' '}
    //                     Notifications
    //                   </Heading>
    //                 </View>
    //               </Pressable>
    //             )}
    //           </View>
    //         );
    //       })}
    //     </ScrollView>
    //     <View style={styles.indicatorContainer}>
    //       {unReadNotification.map((image, imageIndex) => {
    //         const width = scrollX.interpolate({
    //           inputRange: [
    //             windowWidth * (imageIndex - 1),
    //             windowWidth * imageIndex,
    //             windowWidth * (imageIndex + 1),
    //           ],
    //           outputRange: [12, 24, 12],
    //           extrapolate: 'clamp',
    //         });
    //         return (
    //           <Animated.View
    //             key={imageIndex}
    //             style={[styles.normalDot, { width }]}
    //           />
    //         );
    //       })}
    //     </View>
    //   </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notificationSection: {
    width: 320,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 12,
    },
    shadowOpacity: 0.8,
    shadowRadius: 16.0,
    elevation: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  tinyLogo: {
    width: 45,
    height: 45,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  scrollContainer: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },

  normalDot: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: 'white',
    marginHorizontal: 10,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotificationCarousel;

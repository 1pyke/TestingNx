// import React, { useState, useCallback, useRef,useEffect } from 'react';
// import { Text, View ,ImageBackground} from 'react-native';
// import { Button,HStack,Box,Center,VStack,Heading} from "native-base";
// import Icon from '@expo/vector-icons/FontAwesome';
// import { useDispatch, useSelector } from 'react-redux';

// function HR({navigation}) {
//   const dashboardStore = useSelector(state => state.dashboard);
//   const dispatch = useDispatch();

//   function ProviderHandler() {
//     dispatch((dueDateHandler()))
//     navigation.navigate('HrProvider')
//   }

//     return (
//         <View>
//     <Box h="320"  w="94%" ml="3%" justifyContent="center"  mb="70"   style={{backgroundColor:'#F1EEE9',marginTop:70,flex: 1,borderRadius:20}} shadow={9}>
//     <Heading style={{position:"absolute",top:-50,left:"24%"}}>Human Recourses</Heading>
//     <Center>
//     { dashboardStore.userToken.profileType?.toLowerCase()=='provider' &&  <Button shadow={9} colorScheme="teal" onPress={()=>ProviderHandler() }  style={{borderRadius:150,width:220,height:220}}> 
//     <Icon style={{fontSize:60,color:"white",marginLeft:10}} name="user-md"/>
//     <Center>
//     <Text bold  style={{paddingLeft:5,color :"white"}} > Provider
//     </Text> 
//     </Center>
//     </Button>}
//     </Center>
//     {/* ///////////////////////////////////////////////////// */}
//     { dashboardStore.userToken.profileType?.toLowerCase()=='manager' &&
//     <Center>
//     <Button colorScheme="primary" onPress={()=>navigation.navigate('HrManager')}  style={{ borderRadius:200,width:220,height:220}}>
//     <Icon style={{fontSize:60,color:"white"}} name="user-circle-o"/>
//     <Text bold style={{paddingLeft:8, color:"white"}}>
//     Admin
//     </Text>
//     </Button>
//     </Center>}
//     </Box>
//     </View>
//     )
    
// }
// export default HR
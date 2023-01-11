import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
  VStack,
} from 'react-native';
import { Divider, Box, Heading, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialIcons';
import { HeaderSearchHandler } from './store-finalLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { searchInputHandler } from '../../Feature/Search/search-store';
function HeaderSearch() {
  const navigation = useNavigation();
  const layoutSore = useSelector((state) => state.finalLayoutStore);
  const dispatch = useDispatch();
  const [text, onChangeText] = useState('');

  function searchSubmit() {
    dispatch(searchInputHandler(text));
    console.log('Hello!');
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: StatusBar.currentHeight ? 0 : StatusBar.currentHeight + 35,
      }}
    >
      {/* <VStack my="4" space={5} w="100%" maxW="300px" divider={<Box px="2">
          <Divider />
        </Box>}>
      <VStack w="100%" space={5} alignSelf="center">
        <Heading fontSize="lg">Cupertino</Heading>
        <Input placeholder="Search" variant="filled" width="100%" borderRadius="10" py="1" px="2" borderWidth="0" InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
      </VStack>
      </VStack> */}
      {/* new search screen input */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            height: 80,
            width: '100%',
            backgroundColor: '#F6FBF4',
            borderBottomWidth: 0.3,
            borderColor: 'teal',
            marginTop: Platform.OS === 'ios' ? 0 : 30,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              dispatch(HeaderSearchHandler());
            }}
            style={{
              marginTop: 15,
              marginLeft: 9,
              backgroundColor: 'white',
              borderRadius: 100,
              height: 40,
              width: 40,
            }}
          >
            <Icon
              style={{ fontSize: 30, paddingTop: 5, paddingLeft: 5 }}
              name="arrow-back"
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
            onSubmitEditing={searchSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
  },
});

export default HeaderSearch;

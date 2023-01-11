import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { HStack, Spacer, Center, Avatar } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { requestBuilder } from '../requestBuilder';

export default function ProviderFullView({ route, navigation }) {
  const { item } = route.params;
  return (
    <ScrollView>
      <Center>
        <Avatar
          mt="3"
          size="lg"
          source={
            item.image
              ? { uri: item.image }
              : { uri: 'https://cdn-icons-png.flaticon.com/512/387/387561.png' }
          }
        >
          PR
        </Avatar>
        <Text>{item.value1}</Text>
      </Center>
      <Center mt={10}>
        <HStack style={style.info}>
          <Text>{item.label4}: </Text>
          <Spacer />
          <Text>{item.value4}</Text>
        </HStack>

        <HStack style={style.info}>
          <Text>{item.label5}: </Text>
          <Spacer />

          <Text>{item.value5}</Text>
        </HStack>
        <HStack style={style.info}>
          <Text>{item.label6}: </Text>
          <Spacer />
          <Text>{item.value6}</Text>
        </HStack>
      </Center>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  info: {
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
  },
});

import { View, Text, Button } from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Agora = () => {
  const navigation = useNavigation();
  return (
    <View h={'100%'} justifyContent={'center'} alignItems={'center'}>
      <Text>agora</Text>
      <Button onPress={() => navigation.navigate('AgoraVidoCall')}>
        Testing Agora
      </Button>
    </View>
  );
};

export default Agora;

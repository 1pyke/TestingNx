import { StyleSheet } from 'react-native';
import React from 'react';
import { AspectRatio, Box, HStack, Image, View, Text } from 'native-base';
import { Images } from '@mobile-nx-apps/clinc-container-v1';
import AppointmentRenderItemActions from './AppointmentRenderItemActions';

const AppointmenCalendarRenerItem = () => {
  return (
    <View style={styles.item}>
      <View h={'100%'}>
        <HStack h={'100%'} w={'100%'}>
          <Box w={'100%'} height={'100%'} alignItems="center">
            <Box
              justifyContent={'center'}
              height={'80%'}
              w={'100%'}
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth="1"
              _light={{
                backgroundColor: 'gray.50',
              }}
            >
              <AppointmentRenderItemActions />
              <HStack ml={'3%'}>
                <AspectRatio w="25%" bottom={'5%'} ratio={16 / 9}>
                  <Image
                    size={70}
                    borderRadius={100}
                    source={Images.Doctor}
                    alt="image"
                  />
                </AspectRatio>
                <Text fontSize={12} ml={'2%'} top={'2%'}>
                  Mahmoud Mohammad Irshaid
                </Text>
              </HStack>
              <Text fontSize={12} color={'muted.400'} ml={'14%'} mt={'6%'}>
                Botox Dysport | filer cytocal | 2 more...
              </Text>
            </Box>
          </Box>
        </HStack>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    marginTop: 17,
    height: 180,
  },
});

export default AppointmenCalendarRenerItem;

import { Platform } from 'react-native';
import React, {  useState } from 'react';
import { colors } from '../../Constants';
import { Avatar, HStack, VStack, Text, Pressable } from 'native-base';
function ServiceProviders({navigation , providers}) {
    const [list, setlist] = useState(providers||[]);

  return (
    <HStack
      w="100%"
      alignItems="center"
      pl="1%"
      flex={1}
      flexWrap="wrap"
      flexDirection="row"
    >
      {list?.length > 0 &&
        list?.map((doc, i) => (
          <Pressable
            key={i}
            w="45%"
            borderRadius={10}
            padding={3}
            my={3}
            shadow={4}
            bg={colors?.whitesmoke}
            mx="2%"
            _pressed={{ backgroundColor: 'lightgray' }}
            onPress={() => {
              navigation?.navigate('DoctorProfile', { item: doc.provider });
            }}
          >
            <VStack alignItems="center">
              <Avatar
                borderWidth={2}
                borderColor={colors?.color1}
                shadow={2}
                source={{
                  uri: doc?.provider?.image || 'https://media.istockphoto.com/photos/happy-healthcare-practitioner-picture-id138205019?k=20&m=138205019&s=612x612&w=0&h=KpsSMVsplkOqTnAJmOye4y6DcciVYIBe5dYDgYXLVW4=',
                }}
                alt="Alternate Text"
                size="lg"
              />
              <VStack
                mt={3}
                mb={1}
                w={Platform?.OS === 'ios' ? '110%' : '100%'}
                alignItems="center"
              >
                <Text
                  fontWeight="bold"
                  fontSize={Platform?.OS === 'ios' ? 10 : 12}
                  textAlign="center"
                  color={colors?.color2}
                  numberOfLines={1}
                >
                  {doc?.provider?.name?.en}
                </Text>

              </VStack>
            </VStack>
          </Pressable>
        ))}
    </HStack>
  )
}
export {ServiceProviders}
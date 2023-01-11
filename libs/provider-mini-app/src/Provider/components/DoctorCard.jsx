import React from 'react'
import { Button, Image, Text, VStack } from 'native-base';
import { Platform } from 'react-native';
function DoctorCard({ navigation, item }) {
    return (
        <Button
            w="45%"
            borderRadius={20}
            borderWidth={1}
            borderColor="gray.300"
            padding={3}
            my={3}
            bg="blue.100"
            mx="2%"
            _pressed={{ backgroundColor: 'lightgray' }}
            onPress={() => {
                navigation.navigate('DoctorProfile', { item });
            }}
        >
            <VStack>
                <Image
                    shadow={2}
                    source={{
                        uri:
                            item?.image ||
                            'https://media.istockphoto.com/photos/happy-healthcare-practitioner-picture-id138205019?k=20&m=138205019&s=612x612&w=0&h=KpsSMVsplkOqTnAJmOye4y6DcciVYIBe5dYDgYXLVW4=',
                    }}
                    alt="Alternate Text"
                    size="160"
                    borderRadius={15}
                />
                <VStack
                    mt={3}
                    mb={1}
                    w={Platform.OS === 'ios' ? '110%' : '100%'}
                >
                    <Text
                        fontWeight="bold"
                        fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                    >
                        {item?.name?.en}
                    </Text>
                    <Text fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}>
                        {item?.occupation?.name?.en}
                    </Text>
                </VStack>
            </VStack>
        </Button>
    )
}
export {DoctorCard}
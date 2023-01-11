import { useState } from 'react';
import {
    Box,
    Text,
    HStack,
    VStack,
    Heading,
    ScrollView,
    Button,
} from 'native-base';
import { colors } from '../../Constants/index';
import SharedModal from '../../SharedComponents/Modal';
import { Platform } from 'react-native';

function PackageDetailsSelect({ isOpen, onClose, item }) {

    return (
        <SharedModal
            isOpen={isOpen}
            onClose={onClose}
            ModalHeight={'80%'}
        >
            <ScrollView flex={1} w="100%"
                h="100%">
                <VStack
                    w="100%"
                    h="100%"
                    py={10}
                    pb={"50%"}
                    alignItems='center'
                    space={'5%'}
                >
                    <Heading
                        color={colors.color2}
                        fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                    >
                        Package details
                    </Heading>
                    <HStack w="80%" justifyContent='space-between'>
                        <Heading
                            color={colors.color2}
                            fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                        >
                            Package name
                        </Heading>
                        <Heading
                            color={colors.color2}
                            fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                        >
                            Package price
                        </Heading>
                    </HStack>
                    <HStack w="80%" justifyContent='space-between'>
                        <Box
                            w={'45%'}
                            p={3}
                            borderWidth={2}
                            borderRadius='lg'
                            borderColor={colors.lightgray}
                        >
                            <Text
                                color={colors.color3}
                                fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                            >
                                {item?.name?.en}
                            </Text>
                        </Box>
                        <Box
                            w={'45%'}
                            p={3}
                            borderWidth={2}
                            borderRadius='lg'
                            borderColor={colors.lightgray}
                        >
                            <Text
                                color={colors.color3}
                                fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                            >
                                {item?.price || 0} Jod
                            </Text>
                        </Box>
                    </HStack>


                    <VStack w="80%" space='2%'>
                        {item?.services?.length > 0 ?
                            item?.services?.map((service, i) =>
                                <>
                                    <Heading
                                        color={colors.color2}
                                        fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                                    >
                                        Service No.{i + 1}
                                    </Heading>
                                    <Text
                                        color={colors.color2}
                                        fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                    >
                                        Name
                                    </Text>
                                    <Box
                                        w={'100%'}
                                        p={3}
                                        borderWidth={2}
                                        borderRadius='lg'
                                        borderColor={colors.lightgray}
                                    >
                                        <Text
                                            color={colors.color3}
                                            fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                        >
                                            {service?.service?.name?.en}
                                        </Text>
                                    </Box>
                                    <HStack w="100%" justifyContent='space-between'>
                                        <Text
                                            color={colors.color2}
                                            fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                        >
                                            No. of sessions
                                        </Text>
                                        <Text
                                            color={colors.color2}
                                            fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                        >
                                            Duration
                                        </Text>
                                    </HStack>

                                    <HStack w="100%" justifyContent='space-between' mb={'5%'}>
                                        <Box
                                            w={'45%'}
                                            p={3}
                                            borderWidth={2}
                                            borderRadius='lg'
                                            borderColor={colors.lightgray}
                                        >
                                            <Text
                                                color={colors.color3}
                                                fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                            >
                                                {i}
                                            </Text>
                                        </Box>
                                        <Box
                                            w={'45%'}
                                            p={3}
                                            borderWidth={2}
                                            borderRadius='lg'
                                            borderColor={colors.lightgray}
                                        >
                                            <Text
                                                color={colors.color3}
                                                fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                            >
                                                {service?.service?.duration}
                                            </Text>
                                        </Box>
                                    </HStack>
                                </>
                            )
                            :
                            <>
                                <Heading
                                    color={colors.color2}
                                    fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                                >
                                    Service No.1
                                </Heading>
                                <Text
                                    color={colors.color2}
                                    fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                >
                                    Name
                                </Text>
                                <Box
                                    w={'100%'}
                                    p={3}
                                    borderWidth={2}
                                    borderRadius='lg'
                                    borderColor={colors.lightgray}
                                >
                                    <Text
                                        color={colors.color3}
                                        fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                    >
                                    </Text>
                                </Box>
                                <HStack w="100%" justifyContent='space-between'>
                                    <Text
                                        color={colors.color2}
                                        fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                    >
                                        No. of sessions
                                    </Text>
                                    <Text
                                        color={colors.color2}
                                        fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                    >
                                        Duration
                                    </Text>
                                </HStack>

                                <HStack w="100%" justifyContent='space-between' mb={'5%'}>
                                    <Box
                                        w={'45%'}
                                        p={3}
                                        borderWidth={2}
                                        borderRadius='lg'
                                        borderColor={colors.lightgray}
                                    >
                                        <Text
                                            color={colors.color3}
                                            fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                        >
                                            0
                                        </Text>
                                    </Box>
                                    <Box
                                        w={'45%'}
                                        p={3}
                                        borderWidth={2}
                                        borderRadius='lg'
                                        borderColor={colors.lightgray}
                                    >
                                        <Text
                                            color={colors.color3}
                                            fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                                        >
                                        </Text>
                                    </Box>
                                </HStack>
                            </>
                        }
                    </VStack>
                </VStack>
            </ScrollView>
            <Box position={'absolute'} bottom={0} w={"100%"} bg={colors.whitesmoke} >
                <Button
                    w="80%"
                    alignSelf="center"
                    bg={colors.color1}
                    my={5}
                >
                    Buy
                </Button>
            </Box>
        </SharedModal>
    )
}


export { PackageDetailsSelect }
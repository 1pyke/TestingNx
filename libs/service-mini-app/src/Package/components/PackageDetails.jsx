import { useState } from 'react';
import {
    Box,
    Text,
    Pressable,
    Icon,
    HStack,
    VStack,
    Heading,
    Image,
    Divider,
    ScrollView,
    Button,
} from 'native-base';
import {
    MaterialIcons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import { colors, images } from '../../Constants/index';
import SharedModal from '../../SharedComponents/Modal';
import { Platform } from 'react-native';

function PackageDetails({ item, index }) {
    const [showPackageDetails, setShowPackageDetails] = useState(false)

    return (
        <Pressable
            key={index}
            onPress={() => setShowPackageDetails(true)}
            alignItems="center"
            justifyContent="flex-start"
            bg={colors.whitesmoke}
            _pressed={{
                bg: 'trueGray.200',
            }}
            h={130}
            py={2}
            my={3}
            mx={2}
            shadow={6}
            borderRadius={10}
        >
            <VStack
                px={2}
                space={2}
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                h="100%"
            >
                <HStack
                    w={'100%'}
                    h={'60%'}
                    justifyContent='flex-start'
                    space={2}>


                    <VStack w='73%'  >
                        <Heading fontSize={Platform.OS === 'ios' ? 'md' : 'lg'} color={colors.color2}>{item?.name?.en}</Heading>
                        {item?.services?.map(service =>
                            <Text w='100%' fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'} color={colors.color2}>{service?.service?.name?.en}</Text>
                        )}

                    </VStack>
                    <Box w={'25%'} h={'100%'}
                        alignSelf='flex-start'
                    >
                        <Image
                            w={'100%'}
                            h={'100%'}
                            borderRadius={10}
                            alt='package image'
                            source={{
                                uri: item?.image || images?.img9,
                            }} />
                    </Box>

                </HStack>



                <VStack
                    w='100%'
                    h='40%'
                    justifyContent='space-between'
                    pb={2}>
                    <Divider bg={colors.lightgray} />
                    <HStack alignItems='center' space={1}>
                        <Icon
                            as={<MaterialIcons name="attach-money" />}
                            color={colors.black}
                            size="sm"
                        />
                        <Text color={colors.black}
                            fontSize={Platform.OS === 'ios' ? '2xs' : 'xs'}>{item?.price || '$00'}</Text>
                    </HStack>
                    <HStack alignItems='center' space={1}>
                        <Icon
                            as={<MaterialCommunityIcons name="clock-outline" />}
                            color={colors.black}
                            size="sm"
                        />
                        <Text color={colors.black}
                            fontSize={Platform.OS === 'ios' ? '2xs' : 'xs'}>{item?.dateTo || new Date().toString()}</Text>
                    </HStack>
                </VStack>
            </VStack>


            <SharedModal
                isOpen={showPackageDetails}
                onClose={() => setShowPackageDetails(false)}
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
                            {item?.services?.map((service, i) => <>


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
                            )}
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
        </Pressable>
    )
}

export { PackageDetails }
import React, { useEffect, useState } from 'react';
import {
    Heading,
    Center,
    Spinner,
    Box,
    VStack,
    Text,
    HStack,
    Icon,
    ScrollView,
    Pressable,
    Image,
} from 'native-base';

import {
    MaterialIcons, MaterialCommunityIcons
} from '@expo/vector-icons';

import { colors, images } from '../../Constants/index';
import { Platform } from 'react-native';

// funcs

const SelectedPackageServices = ({ navigation, route, services, selectService }) => {
    const [loader, setLoader] = useState(false);


    return (
        <ScrollView
            w="100%">
            {loader && (
                <Spinner
                    mt="250"
                    color="cyan.500"
                    size="lg"
                    accessibilityLabel="Loading posts"
                />
            )}
            {loader == false && (
                <Center
                    flex={1}
                    w="100%"
                    h="100%"
                    justifyContent="center"
                    pb={10}
                >
                    {services?.length > 0 ?
                        services?.map(item => (
                            item &&
                            <Pressable
                                onPress={() => selectService(item)}
                                alignItems="center"
                                justifyContent="flex-start"
                                bg={colors.whitesmoke}
                                _pressed={{
                                    bg: 'trueGray.200',
                                }}
                                h={Platform.OS === 'ios' ? 140 : 125}
                                py={3}
                                my={3}
                                mx={2}
                                shadow={6}
                                borderRadius={10}
                            >
                                <HStack
                                    px={2}
                                    space={2}
                                    alignItems="center"
                                    justifyContent="space-between"
                                    w="100%"
                                    h="100%"
                                >
                                    <VStack
                                        w={'73%'}
                                        h={'100%'}
                                        justifyContent='space-between'
                                        space={1}>
                                        <Heading fontSize={Platform.OS === 'ios' ? 'sm' : 'lg'} color={colors.color2}>{item[0]?.serviceInfo?.name?.en}</Heading>
                                        <Text w='100%' numberOfLines={3} fontSize={Platform.OS === 'ios' ? '2xs' : 'sm'} color={colors.color2}>{item[0]?.serviceInfo?.description?.en}</Text>
                                        <HStack w='100%' justifyContent='space-between'>
                                            <HStack alignItems='center' space={1}>
                                                <Icon
                                                    as={<MaterialCommunityIcons name="clock-outline" />}
                                                    color={colors.black}
                                                    size="sm"
                                                />
                                                <Text
                                                    color={colors.black}
                                                    fontSize={Platform.OS === 'ios' ? '2xs' : 'xs'}
                                                >{item[0]?.duration}</Text>
                                            </HStack>
                                            <HStack alignItems='center' space={1}>
                                                <Icon
                                                    as={<MaterialIcons name="attach-money" />}
                                                    color={colors.black}
                                                    size="sm"
                                                />
                                                <Text
                                                    color={colors.black}
                                                    fontSize={Platform.OS === 'ios' ? '2xs' : 'xs'}
                                                >{item[0]?.serviceInfo?.price || '0'}</Text>
                                            </HStack>
                                        </HStack>
                                    </VStack>

                                    <Box w={'25%'}
                                    >
                                        <Image
                                            w={'100%'}
                                            h={'85%'}
                                            borderRadius={10}
                                            alt='service image'
                                            source={{
                                                uri: item?.serviceInfo?.image || images?.img7,
                                            }} />
                                    </Box>
                                </HStack>
                            </Pressable>
                        )) : (
                            <Center>
                                <Heading color={colors.color1}>No Available Services</Heading>
                            </Center>)
                    }
                </Center>
            )}
        </ScrollView>
    );
};
export { SelectedPackageServices };
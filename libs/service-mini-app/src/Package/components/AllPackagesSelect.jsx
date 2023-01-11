import React, { useEffect, useState } from 'react';
import {
    Heading,
    Box,
    VStack,
    Text,
    HStack,
    Icon,
    Divider,
    Pressable,
    Image,
    Spinner,
    Center,
    ScrollView,
    IconButton,
    Input
} from 'native-base';

import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

import { colors, images } from '../../Constants/index';
import { Platform } from 'react-native';
import PackagesFilterModal from './PackagesFilterModal';


// funcs
const { requestBuilder } = require('../../requestBuilder');

const AllPackagesSelect = ({ navigation, route, selectPackage ,selectedProvider}) => {
    const [loader, setLoader] = useState(false);
    const [packages, setPackages] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [search, setSearch] = useState('');
    const [filterProvider, setFilterProvider] = useState(selectedProvider||null)

    //get All packages
    useEffect(() => {
        setLoader(true);
        async function getPackages() {
            try {
                const result = await requestBuilder('/services/packages/getPackagesByFacility', { "facilityId": 1 });
                setLoader(false);
                setPackages(result.data[0].Active);
            } catch (error) {
                console.log(error);
            }
        }
        getPackages();
    }, []);


    return (
        <ScrollView w='100%'>
            <Center flex={1} w="100%" mt={'3%'}>
                <HStack width="100%" alignItems="center" justifyContent="center">
                    <Input
                        placeholder="Search package"
                        width="80%"
                        borderRadius={50}
                        py="1"
                        px="1"
                        fontSize="14"
                        alignSelf="center"
                        bg={colors.color6}
                        color="gray"
                        _focus={{
                            backgroundColor: colors.color5,
                        }}
                        InputLeftElement={
                            <Icon
                                m="2"
                                ml="3"
                                size="lg"
                                color={colors.black}
                                as={<MaterialIcons name="search" />}
                            />
                        }
                        InputRightElement={
                            <IconButton
                                onPress={() => setShowFilterModal(true)}
                                icon={
                                    <Icon
                                        mr="1"
                                        size="lg"
                                        color={colors.black}
                                        as={<FontAwesome name="sliders" />}
                                    />
                                }
                            />
                        }
                        onChangeText={(e) => setSearch(e)}
                    />
                    <PackagesFilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} />

                </HStack>
            </Center>
            {loader && (
                <Spinner
                    mt="130"
                    color="cyan.500"
                    size="lg"
                    accessibilityLabel="Loading posts"
                />
            )}
            {loader == false && (
                packages?.length > 0 ?
                    packages?.map(item => (
                        <Pressable
                            onPress={() => selectPackage(item)}
                            alignItems="center"
                            justifyContent="flex-start"
                            bg={colors.whitesmoke}
                            _pressed={{
                                bg: 'trueGray.200',
                            }}
                            h={130}
                            py={2}
                            my={2}
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
                        </Pressable>
                    )) : (
                        <Center>
                            <Heading color={'#5F84A2'}>No Available Packages</Heading>
                        </Center>)
            )}


        </ScrollView>

    );
};
export { AllPackagesSelect };
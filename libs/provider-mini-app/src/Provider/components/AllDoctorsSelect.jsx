import React, { useEffect, useState } from 'react';
import {
    Heading,
    Center,
    Spinner,
    VStack,
    Text,
    HStack,
    Icon,
    ScrollView,
    Pressable,
    Avatar,
    IconButton,
    Button,
    Input,
} from 'native-base';

import {
    FontAwesome,
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons';

import { colors } from '../../Constants/index';
import { Platform } from 'react-native';
import SortModal from '../../SharedComponents/SortModal';

// funcs
const { requestBuilder } = require('../../requestBuilder');

const AllDoctorsSelect = ({ selectProvider }) => {
    const [loader, setLoader] = useState(false);
    const [providers, setProviders] = useState([]);


    const [listData, setListData] = useState([]);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [search, setSearch] = useState('');

    const [filterCategory, setFilterCategory] = useState([]);
    const [categories, setCategories] = useState([]);

    const [showSortModal, setShowSortModal] = useState(false);

    //get All categories
    useEffect(() => {
        async function getCategz() {
            try {
                const result = await requestBuilder('/services/facility/getCategoriesByFacility')

                setCategories(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getCategz()
    }, [])

    //get All providers
    useEffect(() => {
        setLoader(true);
        async function getProviders() {
            try {
                const result = await requestBuilder('/providers/profile/getProviders');
                setLoader(false);
                setProviders(result?.data?.rows);
            } catch (error) {
                console.log(error);
            }
        }
        getProviders();
    }, []);


    function sortProviders(params) {
        // let sorted = [...services];
        // sorted = sorted.sort((a, b) =>
        //   a[0]?.serviceInfo?.name?.en > b[0]?.serviceInfo?.name?.en ? 1 : -1
        // );
        // setServices(sorted);
    }
    const addFilterCategory = React.useCallback((item) => {
        if (filterCategory.includes(item)) {
            let test = [...filterCategory];
            test = test.filter((i) => i !== item);
            setFilterCategory(test);
        } else {
            let test = [...filterCategory];
            test.push(item);
            setFilterCategory(test);
        }
    });


    return (
        <ScrollView
            w="100%"
        >
            <Center flex={1} w="100%">
                <HStack width="100%" alignItems="center" justifyContent="center">
                    <Input
                        placeholder="Search service"
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
                    <IconButton
                        position="absolute"
                        right={0}
                        onPress={() => setShowSortModal(true)}
                        icon={
                            <Icon
                                mr="1"
                                size="md"
                                color={colors.black}
                                as={<FontAwesome name="sort-amount-desc" />}
                            />
                        }
                    />
                    <SortModal isOpen={showSortModal} onClose={() => setShowSortModal(false)} />

                </HStack>
                <HStack flexWrap="wrap" w="100%" space={2} px="2%" mt={2}>
                    <ScrollView horizontal={true}>
                        <Button
                            bg={
                                filterCategory.length > 0 ? colors.whitesmoke : colors.color2
                            }
                            padding={1}
                            px={4}
                            mr={4}
                            borderRadius={20}
                            borderWidth={2}
                            borderColor={colors.color2}
                            shadow={3}
                            mb={2}
                            _pressed={{ backgroundColor: colors.color1 }}
                            onPress={() => {
                                setFilterCategory([]);
                            }}
                        >
                            <Text
                                color={
                                    filterCategory.length > 0 ? colors.color2 : colors.white
                                }
                                fontWeight="bold"
                                fontSize="sm"
                                textAlign="center"
                            >
                                All
                            </Text>
                        </Button>
                        {categories.length > 0 &&
                            categories.map((item, i) => (
                                <Button
                                    key={i}
                                    bg={
                                        filterCategory.length > 0 &&
                                            filterCategory.includes(item?.category?.name?.en)
                                            ? colors.color2
                                            : colors.whitesmoke
                                    }
                                    padding={1}
                                    px={4}
                                    mr={4}
                                    borderRadius={20}
                                    borderWidth={2}
                                    borderColor={colors.color2}
                                    shadow={3}
                                    mb={2}
                                    _pressed={{ backgroundColor: colors.color1 }}
                                    onPress={() => {
                                        addFilterCategory(item?.category?.name?.en);
                                    }}
                                >
                                    <Text
                                        color={
                                            filterCategory.includes(item?.category?.name?.en)
                                                ? colors.white
                                                : colors.color2
                                        }
                                        fontWeight="bold"
                                        fontSize="sm"
                                        textAlign="center"
                                    >
                                        {item?.category?.name?.en}
                                    </Text>
                                </Button>
                            ))}
                    </ScrollView>
                </HStack>
            </Center>

            {loader && (
                <Spinner
                    mt="120"
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


                    {providers?.length > 0 ?
                        providers?.map((item, i) => (
                            item &&
                            <Pressable
                                key={i}
                                onPress={() => selectProvider(item)}
                                alignItems="center"
                                justifyContent="flex-start"
                                bg={colors.whitesmoke}
                                _pressed={{
                                    bg: 'trueGray.200',
                                }}
                                w='98%'
                                h={90}
                                py={2}
                                my={2}
                                mx={2}
                                shadow={6}
                                borderRadius={10}
                            >
                                <HStack
                                    px={2}
                                    space={2}
                                    alignItems="center"
                                    justifyContent="flex-start"
                                    w="100%"
                                    h="100%"
                                >
                                    <Avatar
                                        source={{
                                            uri: item?.image
                                                ? item?.image
                                                : 'https://www.rafflesmedicalgroup.com/wp-content/uploads/bb-plugin/cache/placeholder-doctor-m-320x320-square.jpg',
                                        }}
                                        size="lg"
                                    />
                                    <VStack
                                        w={'76%'}
                                        h={'100%'}
                                        justifyContent='space-between'>
                                        <Heading fontSize={Platform.OS === 'ios' ? 'md' : 'lg'} color={colors.color2}>{item?.name?.en}</Heading>
                                        <Text w='100%' numberOfLines={3} fontSize={Platform.OS === 'ios' ? 'xs' : 'sm'} color={colors.color2}>{item?.occupation?.name?.en}</Text>
                                        <HStack w='100%' justifyContent='flex-end'>
                                            <HStack alignItems='center' space={1}>
                                                <Icon
                                                    as={<MaterialCommunityIcons name="clock-outline" />}
                                                    color={colors.black}
                                                    size="sm"
                                                />
                                                <Text
                                                    color={colors.black}
                                                    fontSize={Platform.OS === 'ios' ? '2xs' : 'xs'}
                                                >{item?.dob}</Text>
                                            </HStack>

                                        </HStack>
                                    </VStack>
                                </HStack>
                            </Pressable>
                        )) : (
                            <Center>
                                <Heading color={colors.color1}>No Available Providers</Heading>
                            </Center>)
                    }
                </Center>
            )}
        </ScrollView>
    );
};
export { AllDoctorsSelect };
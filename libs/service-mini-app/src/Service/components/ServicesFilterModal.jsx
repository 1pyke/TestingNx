import React, { useEffect, useState } from 'react';
import {
    Heading,
    Center,
    Spinner,
    Box,
    VStack,
    Text,
    HStack,
    Input,
    Icon,
    Fab,
    Button,
    Slider,
    IconButton,
    Switch,
    Divider,
} from 'native-base';
import { Platform, ScrollView } from 'react-native';

import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../Constants/index';

// componentns
import SharedModal from '../../SharedComponents/Modal';

// funcs
const { requestBuilder } = require('../../requestBuilder');



const ServicesFilterModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState('');

    const [filterDoctor, setFilterDoctor] = useState('');
    const [filterPrice, setFilterPrice] = useState(0);
    const [filterDuration, setFilterDuration] = useState(30);


    // filter states
    const [type, setType] = useState('Medical')

    return (

        <SharedModal
            isOpen={isOpen}
            onClose={() => onClose()}
        >
            <VStack
                justifyContent="center"
                w="90%"
                h="100%"
                space={5}
                mt="5%"
            >

                <Heading
                    color={colors.color2}
                    fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                >
                    Filter By
                </Heading>

                <VStack>
                    <Heading
                        color={colors.color2}
                        fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                    >
                        Type
                    </Heading>

                    <HStack>
                        <Button
                            bg={
                                type === 'Medical' ? colors.color2 : colors.whitesmoke
                            }
                            size='xs'
                            p={1}
                            px={4}
                            mr={4}
                            borderRadius={20}
                            borderWidth={2}
                            borderColor={colors.color2}
                            shadow={3}
                            my={2}
                            _pressed={{ backgroundColor: colors.color1 }}
                            onPress={() => {
                                setType('Medical');
                            }}
                        >
                            <Text
                                color={
                                    type === 'Medical' ? colors.white : colors.color2
                                }
                                fontWeight="bold"
                                fontSize="sm"
                                textAlign="center"
                            >
                                Medical
                            </Text>
                        </Button>

                        <Button
                            bg={
                                type === 'Cosmetic' ? colors.color2 : colors.whitesmoke
                            }
                            size='xs'
                            p={1}
                            px={4}
                            mr={4}
                            borderRadius={20}
                            borderWidth={2}
                            borderColor={colors.color2}
                            shadow={3}
                            my={2}
                            _pressed={{ backgroundColor: colors.color1 }}
                            onPress={() => {
                                setType('Cosmetic');
                            }}
                        >
                            <Text
                                color={
                                    type === 'Cosmetic' ? colors.white : colors.color2
                                }
                                fontWeight="bold"
                                fontSize="sm"
                                textAlign="center"
                            >
                                Cosmetic
                            </Text>
                        </Button>
                    </HStack>
                </VStack>

                <Divider />


                <HStack w='100%' alignItems='center' justifyContent='space-between'>
                    <Heading
                        color={colors.color2}
                        fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                    >
                        Provider
                    </Heading>
                    <Button 
                    bg='transparent'
                    _text={{color:colors.color2}}
                    rightIcon={<Icon
                        size="md"
                        as={MaterialIcons}
                        name="arrow-forward-ios"
                        color={colors.color2}
                    />}>
                        View All
                    </Button>
                </HStack>

                <Divider />


                <VStack >
                    <Heading
                        color={colors.color2}
                        fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                    >
                        Price
                    </Heading>
                    <Box my={2} mx={2}>
                        <Slider
                            defaultValue={filterPrice}
                            minValue={0}
                            maxValue={100}
                            accessibilityLabel="price range"
                            step={5}
                            onChange={(v) => {
                                setFilterPrice(Math.floor(v));
                            }}
                        >
                            <Slider.Track shadow={2}>
                                <Slider.FilledTrack />
                            </Slider.Track>
                            <Slider.Thumb shadow={3}>
                                <Text
                                    fontSize={Platform.OS === 'ios' ? '2xs' : 'xs'}
                                    position="absolute"
                                    top={2}
                                    w="10"
                                    color={colors.color2}
                                >
                                    {filterPrice} JD
                                </Text>
                            </Slider.Thumb>
                        </Slider>
                    </Box>
                </VStack>

                <Divider />


                <VStack >
                    <Heading
                        color={colors.color2}
                        fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                    >
                        Duration
                    </Heading>
                    <Box my={2} mx={2}>
                        <Slider
                            defaultValue={filterDuration}
                            minValue={30}
                            maxValue={50}
                            accessibilityLabel="price range"
                            step={5}
                            onChange={(v) => {
                                setFilterDuration(Math.floor(v));
                            }}
                        >
                            <Slider.Track shadow={2}>
                                <Slider.FilledTrack />
                            </Slider.Track>
                            <Slider.Thumb shadow={3}>
                                <Text
                                    fontSize={Platform.OS === 'ios' ? '2xs' : 'xs'}
                                    position="absolute"
                                    top={2}
                                    w="10"
                                    color={colors.color2}
                                >
                                    {filterDuration} m
                                </Text>
                            </Slider.Thumb>
                        </Slider>
                    </Box>
                </VStack>


                <Button
                    size="lg"
                    w="80%"
                    alignSelf="center"
                    borderRadius={10}
                    mr={5}
                    _text={{
                        color:
                            colors.white
                    }}
                    _light={{
                        bg:
                            colors.color3,
                        borderColor: colors.color3,
                        borderWidth: 2,
                    }}
                    shadow={2}
                    onPress={() => {
                        onClose()
                    }}

                >
                    Filter
                </Button>
                <Button
                    size="lg"
                    w="80%"
                    alignSelf="center"
                    borderRadius={10}
                    mr={5}
                    _text={{
                        color:
                            colors.color3
                    }}
                    _light={{
                        bg:
                            colors.white,
                        borderColor: colors.color3,
                        borderWidth: 2,
                    }}
                    shadow={2}
                    onPress={() => {
                        onClose()
                    }}

                >
                    Cancel
                </Button>
            </VStack>
        </SharedModal>
    )
}

export default ServicesFilterModal
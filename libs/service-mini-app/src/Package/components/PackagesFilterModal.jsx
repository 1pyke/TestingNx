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

import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../Constants/index';

// componentns
import SharedModal from '../../SharedComponents/Modal';
import DateTimePicker from '@react-native-community/datetimepicker';

// funcs
const { requestBuilder } = require('../../requestBuilder');



const PackagesFilterModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const [search, setSearch] = useState('');

    const [filterDoctor, setFilterDoctor] = useState('');
    const [filterPrice, setFilterPrice] = useState(0);
    const [filterDuration, setFilterDuration] = useState(30);

    const [showDatePicker, setShowDatePicker] = useState(false)

    // filter states
    const [type, setType] = useState('Medical')
    const [expiryDate, setExpiryDate] = useState('')
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

                <HStack w='100%' alignItems='center' justifyContent='space-between'>
                    <Heading
                        color={colors.color2}
                        fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                    >
                        Services
                    </Heading>
                    <Button
                        bg='transparent'
                        _text={{ color: colors.color2 }}
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
                        Expiration Date
                    </Heading>
                    <HStack w='100%' alignItems='center' justifyContent='space-between' my='3%' space={3}>
                        <Input
                            w="85%"
                            size="md"
                            borderRadius={10}

                            _light={{
                                bg: colors.color5,
                                color: colors.color2,
                            }}
                            value={expiryDate}
                            editable={false}
                        />

                        {/* {Platform.OS==='ios' ? 
                       
                       (
                        <>
                        <IconButton icon ={<Icon as={Ionicons} name='calendar' color={colors.color2} size='xl' />} onPress={setShowDatePicker(true)} />
                        {showDatePicker &&
                            <DateTimePicker
                                style={{ flex: 1, width: '100%' }}
                                value={new Date()}
                                mode="date"
                                display="default"
                                on
                                onChange={async (value) => {
                                    console.log(value);
                                    // setShowDatePicker(false)
                                    let date =await new Date(value.nativeEvent.timestamp)
                                    console.log(date);
                                   
                                    // setUserObj({ ...userObj, Dob: date.toString()})
                                }}
                            />
                        }
                        </>
                       )
                       :
                       ( */}
                        <>
                            {/* {console.log(expiryDate, ' ssssssss')} */}
                            <IconButton icon={<Icon as={Ionicons} name='calendar' color={colors.color2} size='xl' />} onPress={() => setShowDatePicker(true)} />
                            {showDatePicker &&
                                <DateTimePicker

                                    value={new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={(value) => {
                                        let date = new Date(value.nativeEvent.timestamp)
                                        setShowDatePicker(false)
                                        setExpiryDate(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`)
                                    }}
                                />
                            }
                        </>


                    </HStack>
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

export default PackagesFilterModal
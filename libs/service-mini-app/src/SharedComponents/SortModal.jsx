import React, { useEffect, useState } from 'react';
import {
    Heading,
    VStack,
    Radio,
    HStack,
    Text,
} from 'native-base';
import { Platform } from 'react-native';


import { colors } from '../Constants/index';

// componentns
import SharedModal from './Modal';

// funcs

const SortModal = ({ isOpen, onClose }) => {

    const [value, setValue] = React.useState("one");


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
                    Sort By
                </Heading>
                <Radio.Group name="myRadioGroup" accessibilityLabel="favorite number" value={value} onChange={nextValue => {
                    setValue(nextValue);
                }}>
                    <HStack w='100%' alignItems='center' justifyContent='space-between' >
                        <Text color={colors.color2} fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                        >Alphabatical: From A - Z</Text>
                        <Radio value="A" my={1} />
                    </HStack>
                    <HStack w='100%' alignItems='center' justifyContent='space-between' >
                        <Text color={colors.color2} fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                        >Alphabatical: From Z - A</Text>
                        <Radio value="Z" my={1} />
                    </HStack>
                    <HStack w='100%' alignItems='center' justifyContent='space-between' >
                        <Text color={colors.color2} fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                        >Price: Low - High</Text>
                        <Radio value="price low" my={1} />
                    </HStack>
                    <HStack w='100%' alignItems='center' justifyContent='space-between' >
                        <Text color={colors.color2} fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                        >Price: High - Low</Text>
                        <Radio value="price high" my={1} />
                    </HStack>
                    <HStack w='100%' alignItems='center' justifyContent='space-between' >
                        <Text color={colors.color2} fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                        >Duration: Low - High</Text>
                        <Radio value="duration low" my={1} />
                    </HStack>
                    <HStack w='100%' alignItems='center' justifyContent='space-between' >
                        <Text color={colors.color2} fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                        >Duration: High - Low</Text>
                        <Radio value="duration high" my={1} />
                    </HStack>

                </Radio.Group>

            </VStack>
        </SharedModal>
    )
}

export default SortModal
import React, { useState } from 'react';
import {
    Pressable,
    Icon,
    HStack,
    Center,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
    MaterialIcons,
} from '@expo/vector-icons';
import { colors } from '../../Constants/index';
import {PackageDetails} from './PackageDetails';

const PackagesSwipeListView = ({ navigation, packages }) => {
    return <Basic Allpackages={packages} navigation={navigation} />;

};
export {PackagesSwipeListView};

function Basic({ navigation, Allpackages }) {
    const [listData, setListData] = useState(Allpackages);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };


    ////////////////////////////  render item

    const renderItem = ({ item, index }) => {
        return (
     <PackageDetails item={item} index={index}/>
        );
    };

    ////////////////////////////  hidden items

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HStack flex={1} pr={2} my={3} mx={4} space={0.5}>
                <Pressable
                    px={3}
                    cursor="pointer"
                    bg={colors.color3}
                    justifyContent="center"
                    // onPress={() => closeRow(rowMap, data.item.key)}
                    _pressed={{
                        opacity: 0.5,
                    }}
                >
                    <Icon as={<MaterialIcons name="shopping-cart" />} color={colors.white} size="xl" />
                </Pressable>


                <Pressable
                    px={3}
                    cursor="pointer"
                    bg={colors.color1}
                    justifyContent="center"
                    // onPress={() => deleteRow(rowMap, data.item.key)}
                    _pressed={{
                        opacity: 0.5,
                    }}
                    borderRightRadius={10}
                >
                    <Icon
                        as={<MaterialIcons name="bookmark" />}
                        color={colors.white}
                        size="xl"
                    />
                </Pressable>
            </HStack>
        );
    };
    return (
        <Center w="100%" alignItems="center" >
            {listData.length > 0 && (
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    leftOpenValue={118}
                    previewRowKey={0}
                    previewOpenValue={0}
                    previewOpenDelay={0}
                />
            )}

        </Center>
    );

}

import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import {
  Actionsheet,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Square,
} from 'native-base';
import MultiSelect from 'react-native-multiple-select';
import { laserAvenue } from '../../../../Constants/index';
import { AntDesign } from '@expo/vector-icons';

const ServicesFilter = ({
  sirvices,
  selectedServices,
  setSelectedServices,
  isOpenServiseFilter,
  setIsOpenServiseFilter,
}) => {
  let selected = [];
  const onSelectedItemsChange = (selectedItems) => {
    selected = [];
    for (let i = 0; i < selectedItems.length; i++) {
      var tempItem = sirvices.find((item) => item.id === selectedItems[i]);
      selected = [...selected, tempItem];
      // console.log(tempItem, 'tempItem');
      // console.warn(selected, 'selected1');
    }
    // setSelectedItems(selectedItems)
    console.warn(selectedItems, 'selectedItems');
    setSelectedServices(selectedItems);
  };

  const handleRemoveItems = (i) => {
    try {
      setSelectedServices();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HStack justifyContent="space-between" w={'100%'} p={4}>
      <View style={{ flex: 1 }}>
        <MultiSelect
          hideTags
          items={sirvices}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedServices}
          selectText="Select Services"
          searchInputPlaceholderText="Search Services..."
          onChangeInput={(text) => console.log(text, 'text')}
          // altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          styleItemsContainer={{
            maxHeight: '82%',
            marginBottom: 5,
            paddingBottom: 5,
            backgroundColor: 'white',
          }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          onToggleList={() => setIsOpenServiseFilter(!isOpenServiseFilter)}
        />
        {/* <Flex direction="row" flexWrap style={styles.container}>
          {selectedItems.length ? selectedItems.map((a) => {
            return (
              <Center marginX="2" marginY="2" px="3" py="1" bg="gray.200" rounded="full" style={styles.chips}
              >
                <HStack safeArea>
                  <Text color="red" width="fit-content">{a}</Text>
                  <AntDesign name="closecircleo" size={15} color="gray" style={{ marginTop: 3, marginLeft: 3 }} />
                </HStack>
              </Center>
            )
          })
            : null
          }
        </Flex> */}
      </View>
    </HStack>
  );
};

export default ServicesFilter;

const styles = StyleSheet.create({
  chips: {
    // borderRadius: '10px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

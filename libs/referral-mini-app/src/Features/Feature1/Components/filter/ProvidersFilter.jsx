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

const ProvidersFilter = ({
  providers,
  selectedProviders,
  setSelectedProviders,
  isOpenProviderFilter,
  setIsOpenProviderFilter,
}) => {
  let selected = [];
  const onSelectedItemsChange = (selectedItems) => {
    selected = [];
    for (let i = 0; i < selectedItems.length; i++) {
      var tempItem = providers.find((item) => item.id === selectedItems[i]);
      selected = [...selected, tempItem];
      // console.log(tempItem, 'tempItem');
      // console.warn(selected, 'selected1');
    }
    // setSelectedItems(selectedItems)
    console.warn(selectedItems, 'selectedItems');
    setSelectedProviders(selectedItems);
  };

  const handleRemoveItems = (i) => {
    try {
      setSelectedProviders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HStack
      justifyContent="space-between"
      w={'100%'}
      style={styles.container}
      p={4}
    >
      <View style={{ flex: 1 }}>
        <MultiSelect
          hideTags
          items={providers}
          uniqueKey="id"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedProviders}
          selectText="Select Provider"
          searchInputPlaceholderText="Search Providers..."
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
          submitButtonColor="#CCC"
          submitButtonText="Submit"
          onToggleList={() => setIsOpenProviderFilter(!isOpenProviderFilter)}
          styleItemsContainer={{
            maxHeight: '82%',
            marginBottom: 5,
            paddingBottom: 5,
            backgroundColor: 'white',
          }}
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

export default ProvidersFilter;

const styles = StyleSheet.create({
  chips: {
    // borderRadius: '10px',
  },
  container: {
    maxHeight: '90%',
  },
});

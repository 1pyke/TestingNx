import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  Pressable,
  Text,
  useDisclose,
  View,
} from 'native-base';
import React, { useState } from 'react';
import SearchForPackage from './SearchForPackage';
import PackageDetailsModal from './PackageDetailsModal';
import SelectServiceAndDoctor from './SelectServiceAndDoctor';
const Packages = () => {
  const { isOpen, onOpen, onClose } = useDisclose();
  const [service, setService] = useState([1]);
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclose();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclose();
  const [slelctPatientValue, setSlelctPatientValue] = useState();
  const [selectPackages, setSelectPackages] = useState();

  const selectPackage = (item) => {
    setSelectPackages(item.name.en);
    onClose();
  };
  const addNewService = (item) => {
    setService([...service, service[0] + 1]);
  };
  const removeService = () => {
    setService((item) => item.filter((value) => value === 1));
  };
  return (
    <View w={'100%'}>
      <HStack mt={'2%'} space={'26%'}>
        <Text color={'#5F84A2'} fontSize={'xs'}>
          Select Package
        </Text>
        <Text fontSize={'xs'} color={'rgba(0,0,0,0.5)'}>
          Package Price : 0
        </Text>
      </HStack>
      <HStack mt={'3%'}>
        <Input
          mr={'1%'}
          type={'text'}
          InputRightElement={
            <Pressable
              mr={'1%'}
              p={'3%'}
              _pressed={{ backgroundColor: 'gray.200' }}
              onPress={() => console.log('testing')}
            >
              <Icon
                as={<MaterialCommunityIcons name={'information-outline'} />}
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          w="50%"
          isReadOnly
          value={slelctPatientValue}
          variant="rounded"
          placeholder="Package 1"
        />
        <Input
          type={'text'}
          InputRightElement={
            <Pressable
              mr={'1%'}
              p={'3%'}
              _pressed={{ backgroundColor: 'gray.200' }}
              onPress={() => {
                onOpen1();
              }}
            >
              <Icon
                as={<MaterialCommunityIcons name={'information-outline'} />}
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
          w="50%"
          isReadOnly
          value={slelctPatientValue}
          variant="rounded"
          placeholder="Package 2"
        />
      </HStack>
      {/* <Input
        onPressIn={() => {
          onOpen();
        }}
        py={3}
        variant="rounded"
        mt={'4%'}
        textAlign={'left'}
        type={'text'}
        isReadOnly
        value={selectPackages}
        placeholder="Serach for a package"
        w="100%"
      /> */}
      <Input
        py={3}
        mt={'3%'}
        onPressIn={() => {
          onOpen();
        }}
        type={'text'}
        InputRightElement={
          <Pressable
            mr={'1%'}
            p={'3%'}
            _pressed={{ backgroundColor: 'gray.200' }}
            onPress={() => {
              onOpen1();
            }}
          >
            <Icon
              as={<MaterialCommunityIcons name={'information-outline'} />}
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
        w="100%"
        isReadOnly
        value={selectPackages}
        variant="rounded"
        placeholder="Serach for a package"
      />
      <Text
        alignSelf={'center'}
        mt={'2%'}
        mb={'2%'}
        fontSize={'xs'}
        color={'#0ea5e9'}
      >
        Total number : {service.length}
      </Text>
      {service.map((item, i) => (
        <Box key={i} ml={'2%'} alignSelf={'flex-start'} width={'90%'}>
          <HStack width={'100%'} space={'29%'}>
            <Text color={'#5F84A2'}>{item}. Select Service And Doctor</Text>
            {['xs'].map((size, i) => (
              <IconButton
                onPress={service.length === 1 ? addNewService : removeService}
                key={i}
                bottom={2}
                size={size}
                variant="ghost"
                _icon={{
                  as: MaterialCommunityIcons,
                  name: service.length === 1 ? 'plus' : 'minus',
                  size: 7,
                  color: 'rgba(0,0,0,0.5)',
                }}
              />
            ))}
          </HStack>
          <HStack width={'100%'}>
            <Input
              onPressIn={() => {
                onOpen2();
              }}
              py={3}
              variant="rounded"
              ml={'2%'}
              textAlign={'left'}
              type={'text'}
              isReadOnly
              value={slelctPatientValue}
              placeholder="Serach For A Service..."
              w="73%"
            />
            <Input
              py={3}
              variant="rounded"
              ml={'2%'}
              textAlign={'center'}
              type={'text'}
              isReadOnly
              value={slelctPatientValue}
              placeholder="0"
              w="20%"
            />
            {['xs'].map((size, i) => (
              <IconButton
                key={i}
                size={size}
                variant="ghost"
                _icon={{
                  as: MaterialCommunityIcons,
                  name: 'information-outline',
                  size: 8,
                  color: 'rgba(0,0,0,0.5)',
                }}
              />
            ))}
          </HStack>
          <Text mt={'3%'} mb={'3%'} color={'rgba(0,0,0,0.5)'}>
            Service Price : 0{' '}
          </Text>
          <HStack mb={'5%'} width={'100%'}>
            <Input
              py={3}
              variant="rounded"
              ml={'2%'}
              textAlign={'center'}
              type={'text'}
              isReadOnly
              value={slelctPatientValue}
              placeholder="Select Assistant"
              w="50%"
            />
            <Input
              py={3}
              variant="rounded"
              ml={'2%'}
              textAlign={'center'}
              type={'text'}
              isReadOnly
              value={slelctPatientValue}
              placeholder="Select Room"
              w="50%"
            />
          </HStack>
        </Box>
      ))}
      <SearchForPackage
        selectPackage={selectPackage}
        isOpen={isOpen}
        onClose={onClose}
      />
      <PackageDetailsModal
        isOpen={isOpen1}
        onClose={onClose1}
        PackageDetail={'test'}
      />
      <SelectServiceAndDoctor
        isOpen={isOpen2}
        onClose={onClose2}
        selectService={'test'}
        services={[]}
      />
    </View>
  );
};

export default Packages;

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
  IconButton,
  Input,
  Button,
} from 'native-base';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';
import { colors, images } from '../../Constants/index';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ServicesFilterModal from './ServicesFilterModal';
import SortModal from '../../SharedComponents/SortModal';
// funcs
const { requestBuilder } = require('../../requestBuilder');
const AllServicesSelect = ({
  navigation,
  route,
  selectService,
  selectedProvider,
  selectedService,
  removeProvider,
}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [mainServices, setMainServices] = useState([]);
  const [services, setServices] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterProvider, setFilterProvider] = useState(
    selectedProvider || null
  );
  //get All categories
  useEffect(() => {
    async function getCategz() {
      try {
        const result = await requestBuilder(
          '/services/facility/getCategoriesByFacility'
        );
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCategz();
  }, []);
  //get All services
  useEffect(() => {
    setLoader(true);
    async function getServices() {
      try {
        const result = await requestBuilder('/services/getServices');
        setLoader(false);
        let extracted = [];
        if (result.data.length > 0)
          result.data.map((service) => {
            if (service?.services && service?.services?.length > 0)
              service?.services.map((item) => item && extracted.push(item));
          });
        setServices(extracted);
        setMainServices(extracted);
      } catch (error) {
        console.log(error);
      }
    }
    getServices();
  }, []);
  useEffect(() => {
    if (filterProvider?.name) {
      let arr = Array.from(mainServices);
      arr = arr.filter((item) => {
        if (
          item &&
          item?.providers?.some(
            (provider) => provider?.provider?.id === filterProvider?.id
          )
        )
          return item;
      });
      setServices(arr);
    } else {
      setServices(mainServices);
    }
  }, [filterProvider, mainServices]);
  useEffect(() => {
    async function getServices() {
      try {
        if (search.length > 0) {
          const result = await requestBuilder('/services/getServices', {
            name: search,
          });
          setLoader(false);
          let extracted = [];
          if (result.data.length > 0)
            result.data.map((service) => {
              if (service?.services && service?.services?.length > 0)
                service?.services.map((item) => item && extracted.push(item));
            });
          setServices(extracted);
        } else setServices(mainServices);
      } catch (error) {
        console.log(error);
      }
    }
    getServices();
  }, [search]);
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
  function sortServices(params) {
    // let sorted = [...services];
    // sorted = sorted.sort((a, b) =>
    //   a[0]?.serviceInfo?.name?.en > b[0]?.serviceInfo?.name?.en ? 1 : -1
    // );
    // setServices(sorted);
  }
  useEffect(() => {
    setFilterProvider(selectedProvider);
  }, [selectedProvider]);
  return (
    <ScrollView w="100%">
      <Center flex={1} w="100%" mt={'3%'}>
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
          <ServicesFilterModal
            isOpen={showFilterModal}
            onClose={() => setShowFilterModal(false)}
          />
          <SortModal
            isOpen={showSortModal}
            onClose={() => setShowSortModal(false)}
          />
        </HStack>
        <HStack flexWrap="wrap" w="100%" space={2} px="2%" mt={2}>
          <ScrollView horizontal={true}>
            <Button
              bg={filterCategory.length > 0 ? colors.whitesmoke : colors.color2}
              size="xs"
              p={1}
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
                color={filterCategory.length > 0 ? colors.color2 : colors.white}
                fontWeight="bold"
                fontSize="sm"
                textAlign="center"
              >
                All
              </Text>
            </Button>
            {filterProvider?.name && (
              <Button
                bg={colors.color2}
                size="xs"
                p={1}
                px={4}
                mr={4}
                borderRadius={20}
                borderWidth={2}
                borderColor={colors.color2}
                shadow={3}
                mb={2}
                _pressed={{ backgroundColor: colors.color1 }}
                onPress={async () => {
                  await removeProvider();
                  setFilterProvider(null);
                }}
              >
                <Text
                  color={colors.white}
                  fontWeight="bold"
                  fontSize="sm"
                  textAlign="center"
                >
                  {filterProvider?.name?.en}
                </Text>
              </Button>
            )}
            {/* {console.log(filterCategory)} */}
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
          mt="130"
          color="cyan.500"
          size="lg"
          accessibilityLabel="Loading posts"
        />
      )}
      {loader == false && (
        <Center flex={1} w="100%" h="100%" justifyContent="center" pb={'5%'}>
          {services?.length > 0 ? (
            services?.map(
              (item, i) =>
                item && (
                  <Pressable
                    key={i}
                    onPress={() => {
                      selectService(item);
                    }}
                    alignItems="center"
                    justifyContent="flex-start"
                    bg={colors.whitesmoke}
                    _pressed={{
                      bg: 'trueGray.200',
                    }}
                    h={Platform.OS === 'ios' ? 145 : 130}
                    py={3}
                    my={2}
                    mx={2}
                    shadow={6}
                    borderRadius={10}
                    borderWidth={
                      selectedService?.filter(
                        (i) => i?.serviceName?.id === item.id
                      )?.length > 0
                        ? 2
                        : 0
                    }
                    borderColor={colors.color3}
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
                        justifyContent="space-between"
                        space={1}
                      >
                        <Heading
                          fontSize={Platform.OS === 'ios' ? 'sm' : 'lg'}
                          color={colors.color2}
                        >
                          {item?.serviceInfo?.name?.en}
                        </Heading>
                        <Text
                          w="100%"
                          numberOfLines={3}
                          fontSize={Platform.OS === 'ios' ? '2xs' : 'sm'}
                          color={colors.color2}
                        >
                          {item?.serviceInfo?.description?.en}
                        </Text>
                        <HStack w="100%" justifyContent="space-between">
                          <HStack alignItems="center" space={1}>
                            <Icon
                              as={
                                <MaterialCommunityIcons name="clock-outline" />
                              }
                              color={colors.black}
                              size="sm"
                            />
                            <Text
                              color={colors.black}
                              fontSize={Platform.OS === 'ios' ? '2xs' : 'sm'}
                            >
                              {item?.duration}
                            </Text>
                          </HStack>
                          <HStack alignItems="center">
                            <Icon
                              as={<MaterialIcons name="attach-money" />}
                              color={colors.black}
                              size="sm"
                            />
                            <Text
                              color={colors.black}
                              fontSize={Platform.OS === 'ios' ? '2xs' : 'sm'}
                            >
                              {item?.providers[0]?.price?.minumunPrice || '0'}
                            </Text>
                          </HStack>
                        </HStack>
                      </VStack>
                      <Box w={'25%'}>
                        <Image
                          w={'100%'}
                          h={'85%'}
                          borderRadius={10}
                          alt="service image"
                          source={{
                            uri: item?.serviceInfo?.image || images?.img7,
                          }}
                        />
                      </Box>
                    </HStack>
                  </Pressable>
                )
            )
          ) : (
            <Center>
              <Heading color={colors.color1}>No Available Services</Heading>
            </Center>
          )}
        </Center>
      )}
    </ScrollView>
  );
};
export { AllServicesSelect };

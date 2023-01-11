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
} from 'native-base';
import { Platform, ScrollView } from 'react-native';

import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../Constants/index';

// componentns
import { ServicesSwipeListView } from '../components/ServicesSwipeListView';
import SharedModal from '../../SharedComponents/Modal';
import ServicesFilterModal from '../components/ServicesFilterModal';
import SortModal from '../../SharedComponents/SortModal';

// funcs
const { requestBuilder } = require('../../requestBuilder');

const AllServices = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [search, setSearch] = useState('');

  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  const [categories, setCategories] = useState([]);
  const [chosedCateg, setChosedCateg] = useState(route?.params?.item);
  const [filterCategory, setFilterCategory] = useState(
    chosedCateg ? [chosedCateg?.category?.name?.en] : []
  );
  const [mainServices, setMainServices] = useState([]);
  const [services, setServices] = useState([]);

  //get All services
  useEffect(() => {
    setLoader(true);
    async function getServices() {
        try {
            const result = await requestBuilder('/services/getServices');
            setLoader(false);
            let extracted = []
            if (result.data.length > 0)
                result.data.map(
                    (service) => { if (service?.services && service?.services?.length > 0) service?.services.map((item) => item && extracted.push(item)) }
                );
            setServices(extracted);
            setMainServices(extracted)
        } catch (error) {
            console.log(error);
        }
    }
    getServices();
}, []);

  //get All categories
  useEffect(() => {
    setLoader(true);
    async function getCategories() {
      try {
        const result = await requestBuilder(
          '/services/facility/getCategoriesByFacility'
        );
        setLoader(false);
        setCategories(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    async function getServices() {
      try {
        if (search.length > 0) {
          const result = await requestBuilder('/services/getServices', { name: search });
          setLoader(false);
          let extracted = []
          if (result.data.length > 0)
            result.data.map(
              (service) => { if (service?.services && service?.services?.length > 0) service?.services.map((item) => item && extracted.push(item)) }
            );
          setServices(extracted);
        } else setServices(mainServices)
      } catch (error) {
        console.log(error);
      }
    }
    getServices();
  }, [search])



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
    // setServices((prev) => (prev = sorted));
  }

  return (
    <ScrollView>
      {loader && (
        <Spinner
          mt="250"
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
          pt={55}
          pb={10}
        >
          <Center flex={1} w="100%">
            <HStack width="100%" alignItems="center" justifyContent="center">
              <Input
                placeholder="Search service"
                width="80%"
                borderRadius={50}
                py="1"
                px="1"
                fontSize={14}
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

              <ServicesFilterModal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} />
              <SortModal isOpen={showSortModal} onClose={() => setShowSortModal(false)} />

            </HStack>
          </Center>

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
                my={2}
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
                  fontSize="md"
                  textAlign="center"
                >
                  All
                </Text>
              </Button>
              {/* {console.log(filterCategory, 'filter category')} */}
              {categories.length > 0 &&
                categories.map((item) => (
                  <Button
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
                    my={2}
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
                      fontSize="md"
                      textAlign="center"
                    >
                      {item?.category?.name?.en}
                    </Text>
                  </Button>
                ))}
            </ScrollView>
          </HStack>

          {services.length > 0 ? (
            <ServicesSwipeListView
              navigation={navigation}
              services={services}
            />
          )
            :
            (
              <Center>
                <Heading color={colors.color1}>No Available Services</Heading>
              </Center>)
          }
        </Center>
      )}
    </ScrollView>
  );
};
export { AllServices };

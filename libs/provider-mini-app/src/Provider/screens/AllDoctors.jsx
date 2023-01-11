import React, { useState, useEffect } from 'react';
import {
  Heading,
  Center,
  Spinner,
  ScrollView,
  VStack,
  Text,
  HStack,
  Icon,
  Fab,
  Button,
  IconButton,
} from 'native-base';
import { Platform } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../Constants/index';

// componentns
import SharedModal from '../../SharedComponents/Modal';
import { AllDoctorsSelect2 } from '../components/AllDoctorsSelect2';

// funcs
const { requestBuilder } = require('../../requestBuilder');

const AllDoctors = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);

  const [listData, setListData] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);

  const [services, setServices] = useState([
    { text: 'Botox ' },
    { text: 'Laser ' },
  ]);

  //get All providers
  useEffect(() => {
    setLoader(true);
    async function getProviders() {
      try {
        const result = await requestBuilder('/providers/profile/getProviders');
        setLoader(false);
        setListData(result?.data?.rows);
      } catch (error) {
        console.log(error);
      }
    }
    getProviders();
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

  // useEffect(() => {}, [search]);

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

  function sortProviders(params) {
    let sorted = [...services];
    sorted = sorted.sort((a, b) =>
      a[0]?.serviceInfo?.name?.en > b[0]?.serviceInfo?.name?.en ? 1 : -1
    );
    setServices(sorted);
  }

  return (
    <ScrollView>
      <Center flex={1} w="100%" bg={colors.whitesmoke} pt={55} pb={10}>
        {/* <HStack
            w="100%"
            alignItems="center"
            justifyContent="center"
            flex={2}
            flexWrap="wrap"
            flexDirection="row"
          >
            {listData.map((item, i) => (
              <DoctorCard navigation={navigation} item={item} />
            ))}
          </HStack> */}
        <AllDoctorsSelect2 navigation={navigation} />

        {/* ///////////////////////////////////////////////////////// */}

        <SharedModal
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          isNotCreate={true}
        >
          <Fab
            placement="top-left"
            renderInPortal={false}
            shadow={2}
            size="sm"
            icon={
              <Icon
                color={colors.white}
                as={<MaterialIcons name="filter-list-alt" />}
                size="md"
              />
            }
          />
          <IconButton
            position="absolute"
            top={3}
            right={3}
            onPress={() => setShowFilterModal(false)}
            icon={
              <Icon
                color={colors.black}
                as={<MaterialIcons name="close" />}
                size="xl"
              />
            }
          />
          <VStack justifyContent="flex-start" h="100%" space={8} pl={5}>
            <VStack>
              <Heading
                color={colors.color2}
                fontSize={Platform.OS === 'ios' ? 'lg' : 'xl'}
              >
                Categories
              </Heading>
              <HStack flexWrap="wrap" w="100%" space={2}>
                {categories.map((item, i) => (
                  <Button
                    key={i}
                    bg={colors.color3}
                    padding={2}
                    mr={4}
                    borderRadius={20}
                    shadow={3}
                    my={2}
                    _pressed={{ backgroundColor: colors.color4 }}
                    onPress={() => {
                      if (!filterOptions.some((i) => i.text === item.text)) {
                        filterOptions.push({ text: item.text });
                        setShowFilterModal(false);
                      } else
                        setFilterOptions(
                          filterOptions.filter((i) => i.text !== item.text)
                        );
                    }}
                    endIcon={
                      filterOptions.some((i) => i.text === item.text) && (
                        <Icon
                          size="6"
                          color={colors.white}
                          as={<MaterialIcons name="close" />}
                        />
                      )
                    }
                  >
                    <Text
                      color={colors.color2}
                      fontWeight="bold"
                      fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                      textAlign="center"
                    >
                      {item.text}
                    </Text>
                  </Button>
                ))}
              </HStack>
            </VStack>

            <VStack>
              <Heading
                color={colors.color2}
                fontSize={Platform.OS === 'ios' ? 'lg' : 'xl'}
              >
                Services
              </Heading>

              <HStack flexWrap="wrap" w="100%" space={2}>
                {services.map((item, i) => (
                  <Button
                    key={i}
                    bg={colors.color3}
                    padding={2}
                    mr={4}
                    borderRadius={20}
                    shadow={3}
                    my={2}
                    _pressed={{ backgroundColor: colors.color4 }}
                    onPress={() => {
                      if (!filterOptions.some((i) => i.text === item.text)) {
                        filterOptions.push({ text: item.text });
                        setShowFilterModal(false);
                      } else
                        setFilterOptions(
                          filterOptions.filter((i) => i.text !== item.text)
                        );
                    }}
                    endIcon={
                      filterOptions.some((i) => i.text === item.text) && (
                        <Icon
                          size="6"
                          color={colors.white}
                          as={<MaterialIcons name="close" />}
                        />
                      )
                    }
                  >
                    <Text
                      color={colors.color2}
                      fontWeight="bold"
                      fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                      textAlign="center"
                    >
                      {item.text}
                    </Text>
                  </Button>
                ))}
              </HStack>
            </VStack>
          </VStack>
        </SharedModal>
      </Center>
    </ScrollView>
  );
};
export { AllDoctors };

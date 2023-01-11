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
import SharedModal from '../../SharedComponents/Modal';
import { PackagesSwipeListView } from '../components/PackagesSwipeListView';

// funcs
const { requestBuilder } = require('../../requestBuilder');

const AllPackages = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [search, setSearch] = useState('');

  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterPrice, setFilterPrice] = useState('');

  const [categories, setCategories] = useState([]);
  const [chosedCateg, setChosedCateg] = useState(route?.params?.item);
  const [filterCategory, setFilterCategory] = useState(
    chosedCateg ? [chosedCateg?.category?.name?.en] : []
  );
  const [packages, setPackages] = useState([]);

  //get All packages
  useEffect(() => {
    setLoader(true);
    async function getPackages() {
      try {
        const result = await requestBuilder(
          '/services/packages/getPackagesByFacility',
          { facilityId: 1 }
        );
        setLoader(false);
        // console.log(result.data[0], '_________');
        setPackages(result.data[0].Active);
      } catch (error) {
        console.log(error);
      }
    }
    getPackages();
  }, []);

  // useEffect(() => {}, [search]);

  return (
    <ScrollView w="100%">
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
                placeholder="Search package"
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
            </HStack>
          </Center>

          {packages.length > 0 && (
            <PackagesSwipeListView
              navigation={navigation}
              packages={packages}
            />
          )}

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
            <VStack
              justifyContent="flex-start"
              w="100%"
              h="100%"
              space={8}
              pl={5}
            >
              {/* <VStack>
                <Heading
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
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
                        if (filterCategory.text !== item.text) {
                          setFilterCategory(item.text);
                        } else setFilterCategory('');
                      }}
                      endIcon={
                        filterCategory.text === item.text && (
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
              </VStack> */}

              <VStack>
                <Heading
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                >
                  Providers
                </Heading>

                <HStack flexWrap="wrap" w="100%" space={2}>
                  {/* {services.map((item, i) => (
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
                        if (filterDoctor.text != item.text) {
                          setFilterDoctor({ text: item.text });
                        } else setFilterDoctor('');
                      }}
                      endIcon={
                        filterDoctor.text === item.text && (
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
                  ))} */}
                </HStack>
              </VStack>

              <VStack width="90%">
                <Heading
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'md' : 'lg'}
                >
                  Price
                </Heading>
                <Box my={2} ml={2}>
                  <Slider
                    defaultValue={0}
                    minValue={0}
                    maxValue={100}
                    accessibilityLabel="hello world"
                    step={5}
                    onChange={(v) => {
                      setFilterPrice(Math.floor(v));
                    }}
                  >
                    <Slider.Track shadow={2}>
                      <Slider.FilledTrack />
                    </Slider.Track>
                    <Slider.Thumb shadow={3}>
                      {filterPrice && (
                        <Text
                          fontSize={Platform.OS === 'ios' ? '2xs' : 'xs'}
                          position="absolute"
                          top={2}
                          w="10"
                        >
                          {filterPrice} JD
                        </Text>
                      )}
                    </Slider.Thumb>
                  </Slider>
                </Box>
              </VStack>
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading
                  color={colors.color2}
                  fontSize={Platform.OS === 'ios' ? 'sm' : 'md'}
                >
                  Included in a package ?
                </Heading>
                <Switch
                  size="lg"
                  offTrackColor="gray.500"
                  colorScheme={colors.color2}
                  mr={8}
                />
              </HStack>
              <Button
                size="lg"
                w="80%"
                alignSelf="center"
                borderRadius={10}
                mr={5}
                _text={{
                  color:
                    filterCategory && filterDoctor && filterPrice
                      ? colors.white
                      : colors.color2,
                }}
                _light={{
                  bg:
                    filterCategory && filterDoctor && filterPrice
                      ? colors.color2
                      : colors.white,
                  borderColor: colors.color2,
                  borderWidth: 2,
                }}
                shadow={2}
                onPress={() => {
                  setShowFilterModal(false);
                }}
                disabled={
                  filterCategory && filterDoctor && filterPrice ? false : true
                }
              >
                Next
              </Button>
            </VStack>
          </SharedModal>
        </Center>
      )}
    </ScrollView>
  );
};
export { AllPackages };

import {
  Center,
  HStack,
  Input,
  Icon,
  Pressable,
  VStack,
  ScrollView,
  StatusBar,
  useDisclose,
  IconButton,
  Skeleton,
  Image,
} from 'native-base';
import React, { useCallback, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import SearchChips from '../Components/filter/SearchChips';
import { RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import FilterSheet from '../Components/filter/FilterSheet';
import { getAllTemplatesData } from '../../../services/service';
import Voucher from '../Components/Voucher';

const Vouchers = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclose();
  const templates = useSelector((state) => state.referral.voucherTemplates);
  const loading = useSelector((state) => state.referral.templateLoading);
  const offset = useSelector((state) => state.referral.offset);
  const maxOffset = useSelector((state) => state.referral.maxOffset);

  const allPartners = useSelector((state) => state.referral.allPartners);
  const [searchTemplate, setSearchTemplate] = useState(null);
  const [scrollLoading, setLoading] = useState(false);
  const [searchChips, setSearchChips] = useState(false);
  const [payloadFilter, setPayloadFilter] = useState(null);
  const [isFilterSheetOn, setIsFilterSheetOn] = useState(false);
  const [searchPayload, setSearchPayload] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const authStore = useSelector((state) => state.AuthStore);

  const onScrollDown = async () => {
    try {
      if (isFilterSheetOn && !scrollLoading && offset <= maxOffset) {
        setLoading(true);
        if (authStore?.user) {
          await getAllTemplatesData(
            {
              ...payloadFilter,
              offset: offset,
              owners: [...allPartners, authStore?.user?.establishment.id],
              facility: authStore?.user?.facility,
            },
            dispatch,
            offset,
            1
          );
        }

        setLoading(false);
      } else if (searchChips && !scrollLoading && offset <= maxOffset) {
        setLoading(true);
        if (authStore?.user) {
          await getAllTemplatesData(
            {
              ...searchPayload,
              offset: offset,
              owners: [...allPartners, authStore?.user?.establishment.id],
              facility: authStore?.user?.facility,
            },
            dispatch,
            offset,
            1
          );
        }

        setLoading(false);
      } else if (
        searchTemplate != null &&
        !scrollLoading &&
        offset <= maxOffset
      ) {
        // handle search subject from input search
        setLoading(true);
        if (authStore?.user) {
          await getAllTemplatesData(
            {
              activeLan: 'en',
              subject: searchTemplate,
              limit: 6,
              offset: offset,
              owners: [...allPartners, authStore?.user?.establishment.id],
              facility: authStore?.user?.facility,
            },
            dispatch,
            offset,
            1
          );
        }

        setLoading(false);
      } else if (!searchChips && !scrollLoading && offset <= maxOffset) {
        setLoading(true);
        if (authStore?.user) {
          await getAllTemplatesData(
            {
              limit: 6,
              offset: offset,
              owners: [...allPartners, authStore?.user?.establishment.id],
              facility: authStore?.user?.facility,
            },
            dispatch,
            offset,
            1
          );
        }

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSearchTemplate = async () => {
    try {
      setLoading(true);
      if (authStore?.user) {
        await getAllTemplatesData(
          {
            activeLan: 'en',
            subject: searchTemplate,
            limit: 6,
            offset: 1,
            owners: [...allPartners, authStore?.user?.establishment.id],
            facility: authStore?.user?.facility,
          },
          dispatch,
          1,
          0
        );
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleResetSearch = async () => {
    try {
      setIsFilterSheetOn(false);
      setLoading(true);
      if (authStore?.user) {
        await getAllTemplatesData(
          {
            limit: 6,
            offset: 1,
            owners: [...allPartners, authStore?.user?.establishment.id],
            facility: authStore?.user?.facility,
          },
          dispatch,
          1,
          0
        );
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      console.log(
        authStore,
        '---------------------------------------------------------------------'
      );
      if (authStore?.user) {
        await getAllTemplatesData(
          {
            owners: [...allPartners, authStore?.user?.establishment.id],
            facility: authStore?.user?.facility,
            // mobile: "mobile",
            limit: 6,
            offset: 1,
          },
          dispatch,
          1
        );
      }

      setRefreshing(false);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <SafeAreaView bg={'white'} style={styles.container}>
      <VStack mt={'4'} px={'8'}>
        <Center>
          <HStack>
            {!isFilterSheetOn ? (
              <IconButton
                onPress={onOpen}
                colorScheme={'yellow'}
                size={10}
                my={'3'}
                mr={'3'}
                variant="solid"
                _icon={{
                  as: AntDesign,
                  name: 'filter',
                }}
              />
            ) : (
              <IconButton
                onPress={handleResetSearch}
                colorScheme={'yellow'}
                variant="solid"
                size={10}
                my={'3'}
                mr={'3'}
                _icon={{
                  as: MaterialCommunityIcons,
                  name: 'filter-remove-outline',
                }}
              />
            )}
            <FilterSheet
              isOpen={isOpen}
              onClose={onClose}
              setPayloadFilter={setPayloadFilter}
              setIsFilterSheetOn={setIsFilterSheetOn}
            />
            <Input
              my="10px"
              size="xl"
              w={{
                base: '85%',
                md: '25%',
              }}
              placeholder="Search..."
              value={searchTemplate}
              onChangeText={(value) =>
                setSearchTemplate({
                  ...searchTemplate,
                  en: value,
                })
              }
              InputRightElement={
                <Pressable onPress={handleSearchTemplate}>
                  <Icon
                    as={<AntDesign name="search1" />}
                    size={5}
                    mr={'2'}
                    color={'muted.400'}
                  />
                </Pressable>
              }
            />
          </HStack>
        </Center>
        <SearchChips
          setSearchChips={setSearchChips}
          setSearchPayload={setSearchPayload}
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.scrollView}
          onScrollEndDrag={onScrollDown}
        >
          {loading && offset === 1
            ? [1, 2, 3].map((item, i) => (
                <Center w="100%" key={i} mt="4">
                  <HStack
                    w="100%"
                    maxW="100%"
                    height="155"
                    borderWidth="1"
                    space={8}
                    rounded="md"
                    _dark={{
                      borderColor: 'coolGray.500',
                    }}
                    _light={{
                      borderColor: 'coolGray.200',
                    }}
                    p="4"
                  >
                    <VStack flex="3" space="4">
                      <Skeleton startColor={'coolGray.100'} />
                      <Skeleton.Text mt="2" />
                    </VStack>
                    <Skeleton
                      flex="1"
                      h="115"
                      rounded="md"
                      startColor={'coolGray.100'}
                    />
                  </HStack>
                </Center>
              ))
            : // <HStack space={2} justifyContent="center">
            //   <Spinner accessibilityLabel="Loading posts" />
            // </HStack>
            templates.length
            ? templates.map((template, i) => (
                <Voucher template={template} navigation={navigation} key={i} />
              ))
            : !loading && (
                <VStack>
                  <Center my={5}>
                    {/* <Heading size="lg">No results found</Heading> */}
                    <Image
                      resizeMode="cover"
                      source={require('../../../../../../apps/clinc-container/assets/referral/noTemplateFound.png')}
                      alt="Alternate Text"
                      size="lg"
                      height={200}
                      w={'70%'}
                    />
                  </Center>
                </VStack>
              )}

          {scrollLoading ? (
            <Center w="100%" mt="4">
              <HStack
                w="100%"
                maxW="100%"
                height="155"
                borderWidth="1"
                space={8}
                rounded="md"
                _dark={{
                  borderColor: 'coolGray.500',
                }}
                _light={{
                  borderColor: 'coolGray.200',
                }}
                p="4"
              >
                <VStack flex="3" space="4">
                  <Skeleton startColor={'coolGray.100'} />
                  <Skeleton.Text mt="2" />
                </VStack>
                <Skeleton
                  flex="1"
                  h="115"
                  rounded="md"
                  startColor={'coolGray.100'}
                />
              </HStack>
            </Center>
          ) : null}
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
};

export default Vouchers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  scrollView: {
    marginBottom: 120,
  },
  text: {
    fontSize: 42,
  },
});

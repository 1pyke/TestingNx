import { Platform, Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Center, HStack, Icon, Spinner, Stack, Text } from 'native-base';
import { getAllTemplatesData } from '../../../../services/service';
import { laserAvenue } from '../../../../Constants/index';
import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from '../../../../services/service';

const SearchChips = ({ setSearchChips, setSearchPayload }) => {
  const allPartners = useSelector((state) => state.referral.allPartners);
  const authStore = useSelector((state) => state.AuthStore);

  const dispatch = useDispatch();
  const [search, setSearch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingPackage, setLoadingPackage] = useState(false);
  const [loadiigDiscount, setLoadiigDiscount] = useState(false);
  const [searchPackages, setSearchPackages] = useState(0);
  const [searchDiscount, setSearchDiscount] = useState(0);
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    try {
      let response = async () => {
        const data = await getSettings({});
        for (let i = 0; i < data.length; i++) {
          if (data[i].key === 'link_type') {
            setSettings(data[i].value);
          }
        }
      };
      response();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getServicseTemplates = async () => {
    try {
      if (!search) {
        setSearchChips(true);
        setSearchPackages(0);
        setSearchDiscount(0);
        setSearch(1);
        setLoading(true);
        if (authStore?.user) {
          await getAllTemplatesData(
            {
              mobile: 'mobile',
              voucherProvider: settings[0],
              limit: 6,
              offset: 1,
              owners: [...allPartners, authStore?.user?.establishment.id],
              facility: authStore?.user?.facility,
            },
            dispatch,
            1,
            search
          );
        }

        await setSearchPayload({
          voucherProvider: settings[0],
          limit: 6,
          offset: 1,
        });
        setLoading(false);
      } else {
        setSearchChips(false);
        setLoading(true);
        setSearch(0);
        if (authStore?.user) {
          await getAllTemplatesData(
            {
              mobile: 'mobile',
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
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  const getPackagesTemplates = async () => {
    try {
      if (!searchPackages) {
        setSearchChips(true);
        setSearchPackages(1);
        setSearchDiscount(0);
        setSearch(0);
        setLoadingPackage(true);
        if (authStore?.user) {
          await getAllTemplatesData(
            {
              voucherProvider: settings[1],
              limit: 6,
              offset: 1,
              owners: [...allPartners, authStore?.user?.establishment.id],
              facility: authStore?.user?.facility,
            },
            dispatch,
            1,
            searchPackages
          );
        }

        await setSearchPayload({
          voucherProvider: settings[1],
          limit: 6,
          offset: 1,
        });
        setLoadingPackage(false);
      } else {
        setSearchChips(false);
        setLoadingPackage(true);
        setSearchPackages(0);
        if (authStore?.user) {
          await getAllTemplatesData(
            {
              mobile: 'mobile',
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

        setLoadingPackage(false);
      }
    } catch (error) {
      setLoadingPackage(false);
      console.error(error);
    }
  };
  const getDiscountTemplates = async () => {
    try {
      if (!searchDiscount) {
        setSearchChips(true);
        setSearchDiscount(1);
        setSearchPackages(0);
        setSearch(0);
        setLoadiigDiscount(true);
        if (authStore?.user) {
          await getAllTemplatesData(
            {
              owners: [...allPartners, authStore?.user?.establishment.id],
              facility: authStore?.user?.facility,
              activeLan: 'en',
              discount: {
                en: '\\%',
                ar: '\\%',
              },
              limit: 6,
              offset: 1,
            },
            dispatch,
            1,
            searchDiscount
          );
        }

        await setSearchPayload({
          activeLan: 'en',
          discount: {
            en: '\\%',
            ar: '\\%',
          },
          limit: 6,
          offset: 1,
        });
        setLoadiigDiscount(false);
      } else {
        setSearchChips(false);
        setLoadiigDiscount(true);
        setSearchDiscount(0);
        if (authStore?.user) {
          await getAllTemplatesData(
            {
              owners: [...allPartners, authStore?.user?.establishment.id],
              facility: authStore?.user?.facility,
              mobile: 'mobile',
              limit: 6,
              offset: 1,
            },
            dispatch,
            1,
            0
          );
        }

        setLoadiigDiscount(false);
      }
    } catch (error) {
      setLoadiigDiscount(false);
      console.error(error);
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      mb="2.5"
      mt="1.5"
      space={3}
    >
      <Center
        size={Platform.OS === 'ios' ? '8' : '7'}
        borderWidth="1"
        width={Platform.OS === 'ios' ? '35%' : '30%'}
        borderColor={search ? '#FABB18' : '#194569'}
        rounded="full"
      >
        {!loading ? (
          <Pressable onPress={() => getServicseTemplates()}>
            <HStack>
              {/* <Icon
                as={
                  <Foundation
                    name="burst-new"
                    style={styles.icons}
                    color={search ? laserAvenue.yellow1 : laserAvenue.blue1}
                    size={20}
                  />
                }
                size={5}
                // color={ 'red'}
              /> */}
              <Text color={search ? laserAvenue.yellow1 : laserAvenue.blue1}>
                {search ? 'Reset' : 'Services'}
              </Text>
            </HStack>
          </Pressable>
        ) : (
          <Spinner color={search ? laserAvenue.yellow1 : laserAvenue.blue1} />
        )}
      </Center>
      <Center
        size="7"
        borderWidth="1"
        width="30%"
        borderColor={searchPackages ? laserAvenue.yellow1 : laserAvenue.blue1}
        color={laserAvenue.blue1}
        rounded="full"
      >
        {!loadingPackage ? (
          <Pressable onPress={() => getPackagesTemplates()}>
            <HStack>
              {/* <Icon
                as={
                  <Foundation
                    name="burst-new"
                    style={styles.icons}
                    size={20}
                    color={
                      searchPackages ? laserAvenue.yellow1 : laserAvenue.blue1
                    }
                  />
                }
                size={5}
              /> */}
              <Text
                color={searchPackages ? laserAvenue.yellow1 : laserAvenue.blue1}
              >
                {searchPackages ? 'Reset' : 'Packages'}
              </Text>
            </HStack>
          </Pressable>
        ) : (
          <Spinner
            color={searchPackages ? laserAvenue.yellow1 : laserAvenue.blue1}
          />
        )}
      </Center>
      <Center
        size="7"
        rounded="full"
        width="30%"
        borderColor={searchDiscount ? laserAvenue.yellow1 : laserAvenue.blue1}
        borderWidth="1"
      >
        {!loadiigDiscount ? (
          <Pressable onPress={() => getDiscountTemplates()}>
            <HStack>
              {/* <Icon
                as={
                  <MaterialCommunityIcons
                    name="ticket-percent"
                    style={styles.icons}
                    size={20}
                    color={
                      searchDiscount ? laserAvenue.yellow1 : laserAvenue.blue1
                    }
                  />
                }
                size={5}
              /> */}
              <Text
                color={searchDiscount ? laserAvenue.yellow1 : laserAvenue.blue1}
              >
                {searchDiscount ? 'Reset' : 'Discount'}
              </Text>
            </HStack>
          </Pressable>
        ) : (
          <Spinner
            color={searchDiscount ? laserAvenue.yellow1 : laserAvenue.blue1}
          />
        )}
      </Center>
    </Stack>
  );
};

export default SearchChips;

const styles = StyleSheet.create({
  icons: {
    paddingRight: 3,
    marginHorizontal: 3,
    // color: laserAvenue.blue1
  },
});

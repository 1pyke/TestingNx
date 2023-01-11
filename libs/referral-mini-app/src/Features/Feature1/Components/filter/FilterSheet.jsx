//@ts-nocheck
import {
  Actionsheet,
  Button,
  Heading,
  HStack,
  Text,
  useDisclose,
  View,
} from 'native-base';
import { laserAvenue } from '../../../../Constants/index';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import ServicesFilter from './ServicesFilter';
import { getAllProviders, getAllSirvices } from '../../../../services/lookups';
import { getAllTemplatesData } from '../../../../services/service';
import { useDispatch, useSelector } from 'react-redux';
import ProvidersFilter from './ProvidersFilter';

const FilterSheet = ({
  isOpen,
  onClose,
  setPayloadFilter,
  setIsFilterSheetOn,
}) => {
  const authStore = useSelector((state) => state.AuthStore);
  const allPartners = useSelector((state) => state.referral.allPartners);
  const dispatch = useDispatch();

  const { onOpen } = useDisclose();
  const [serviceFilter, setServiceFilter] = useState(false);
  const [sirvices, setSirvices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [providerFilter, setProviderFilter] = useState(false);
  const [providers, setProviders] = useState([]);
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [isOpenServiseFilter, setIsOpenServiseFilter] = useState(false);
  const [isOpenProviderFilter, setIsOpenProviderFilter] = useState(false);
  const close = () => {
    try {
      onClose();
      setServiceFilter(false);
      setProviderFilter(false);
      setIsOpenProviderFilter(false);
      setSelectedProviders([]);
      setIsOpenServiseFilter(false);
      setSelectedServices([]);
    } catch (error) {
      console.error(error);
    }
  };

  const getProviders = async () => {
    try {
      const allProvioders = await getAllProviders();
      let arr = [];
      for (let i = 0; i < allProvioders?.rows.length; i++) {
        arr.push({
          id: allProvioders.rows[i].id,
          name: allProvioders.rows[i].name.en || allProvioders.rows[i].name.ar,
        });
      }
      setProviders(arr);
    } catch (error) {
      console.error(error);
    }
  };

  const getSirvices = async () => {
    try {
      const allSirvices = await getAllSirvices({
        facilities: [authStore?.user?.facility?.id],
      });
      const arr = [];
      for (let i = 0; i < allSirvices.length; i++) {
        const element = allSirvices[i];
        // arr.push(...element.services);
        for (let j = 0; j < element?.services.length; j++) {
          arr.push({
            id: element.services[j].id,
            name:
              element.services[j].serviceInfo.name.en ||
              element.services[j].serviceInfo.name.ar,
          });
        }
      }
      setSirvices(arr);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = async () => {
    try {
      let provider, service;
      if (selectedProviders.length) {
        provider = selectedProviders;
      }
      if (selectedServices.length) {
        service = selectedServices;
      }
      setIsFilterSheetOn(true);
      let payload = {
        provider,
        service,
        owners: [...allPartners, authStore?.user?.establishment.id],
        facility: authStore?.user?.facility,
        limit: 6,
        offset: 1,
      };
      if (authStore?.user) {
        await getAllTemplatesData(payload, dispatch, 1);
      }
      await setPayloadFilter(payload);
      close();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProviders();
    getSirvices();
    console.log(
      'on scroll-----------------------------------------------------------------------------------------------'
    );
  }, [authStore?.user]);

  useEffect(() => {
    setServiceFilter(isOpenServiseFilter);
    setProviderFilter(isOpenProviderFilter);
  }, [isOpenServiseFilter || isOpenProviderFilter]);

  return (
    <Actionsheet
      isOpen={isOpen}
      onClose={onClose}
      disableOverlay={Platform.OS === 'ios' ? false : true}
    >
      <Actionsheet.Content>
        <HStack w={'100%'} p={4}>
          <View>
            <Heading fontSize={'2xl'}>Filter By</Heading>
          </View>
        </HStack>

        {!serviceFilter && !providerFilter ? (
          <>
            <HStack justifyContent="space-between" w={'100%'} p={4}>
              <Text fontSize={'lg'} color={laserAvenue.blue1}>
                By Service
              </Text>
              <Text
                fontSize={'lg'}
                underline
                style={{ color: laserAvenue.link }}
                onPress={() => setServiceFilter(true)}
              >
                View all {`>`}
              </Text>
            </HStack>
            <HStack justifyContent="space-between" w={'100%'} p={4}>
              <Text fontSize={'lg'} color={laserAvenue.blue1}>
                By Provider
              </Text>
              <Text
                fontSize={'lg'}
                underline
                onPress={() => setProviderFilter(true)}
                style={{ color: laserAvenue.link }}
              >
                View all {`>`}
              </Text>
            </HStack>
          </>
        ) : serviceFilter ? (
          <ServicesFilter
            sirvices={sirvices}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            isOpenServiseFilter={isOpenServiseFilter}
            setIsOpenServiseFilter={setIsOpenServiseFilter}
          />
        ) : (
          <ProvidersFilter
            providers={providers}
            selectedProviders={selectedProviders}
            setSelectedProviders={setSelectedProviders}
            isOpenProviderFilter={isOpenProviderFilter}
            setIsOpenProviderFilter={setIsOpenProviderFilter}
          />
        )}

        <HStack w={'100%'} p={4}>
          <Button
            bg={'#5F84A2'}
            w={'100%'}
            borderRadius={10}
            onPress={handleFilter}
          >
            <Text fontSize={'lg'} color={'#fff'}>
              Filter
            </Text>
          </Button>
        </HStack>

        <HStack w={'100%'} p={4}>
          <Button
            variant={'outline'}
            w={'100%'}
            borderRadius={10}
            onPress={close}
          >
            <Text fontSize={'lg'} color={'#A1A1A1'}>
              Cancel
            </Text>
          </Button>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

const styles = {
  bottom: {
    marginTop: 'auto',
    width: '100%',
    // height:'100%'
  },
};

export default FilterSheet;

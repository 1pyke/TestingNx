import React, { useEffect, useState } from 'react';
import {
  Heading,
  Center,
  Spinner,
  VStack,
  HStack,
  ScrollView,
  Actionsheet,
  Input,
  Button,
  Divider,
  IconButton,
} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import ConsumerCard from './ConsumerCard';
const { requestBuilder } = require('../../../requestBuilder');
const SelectPatient = ({
  isOpen1,
  onClose1,
  changingItem,
  setBgc,
  newConsumer,
}) => {
  const [loader, setLoader] = useState(false);
  const [providers, setProviders] = useState([]);
  const [Pressed, setPressed] = useState(onClose1);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(false);
  //get All providers
  useEffect(() => {
    setLoader(true);
    async function getProviders() {
      try {
        const result = await requestBuilder('/consumers/profile/getProfiles');
        setLoader(false);
        setProviders(result.data.rows);
        if (newConsumer) {
          setProviders([...providers, newConsumer]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getProviders();
  }, [newConsumer]);

  return (
    <Actionsheet
      width={'100%'}
      isOpen={isOpen1}
      onClose={onClose1}
      hideDragIndicator
    >
      <Actionsheet.Content>
        {/* {console.log(providers, 'providersproviders')} */}
        <HStack w="100%">
          <VStack w="100%" space={5} alignSelf="center">
            <Heading
              alignSelf="center"
              mt={'5%'}
              color={'#5F84A2'}
              fontSize="lg"
            >
              Consumer
            </Heading>
            <HStack width={'100%'}>
              <Input
                placeholder="Search People & Places"
                width="90%"
                borderRadius="4"
                fontSize={14}
                onChangeText={(e) => {
                  setQuery(e);
                }}
              />
              <Center width={'10%'}>
                <IconButton
                  onPress={() => {
                    setSearch(true);
                  }}
                  width={'100%'}
                  variant={'ghost'}
                  _icon={{
                    as: FontAwesome,
                    name: 'sliders',
                    color: '#194569',
                    size: 'lg',
                  }}
                />
              </Center>
            </HStack>
          </VStack>
        </HStack>
        <ScrollView>
          {loader && (
            <Spinner
              mt="50"
              mb="50"
              color="cyan.500"
              size="lg"
              accessibilityLabel="Loading posts"
            />
          )}
          {loader === false && (
            <Center
              flex={1}
              w="100%"
              h="100%"
              mt={'7%'}
              justifyContent="center"
            >
              {providers?.length > 0 ? (
                providers
                  .filter((post) => {
                    if (query === '') {
                      return post;
                    } else if (
                      post.firstName.en
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                      post.primaryPhone.number.includes(query)
                    ) {
                      return post;
                    }
                  })
                  .map(
                    (item, i) =>
                      item && (
                        <ConsumerCard
                          key={i}
                          changingItem={changingItem}
                          onClose1={onClose1}
                          item={item}
                        />
                      )
                  )
              ) : (
                <Center>
                  <Heading color={'#5F84A2'}>No Providers Available</Heading>
                </Center>
              )}
            </Center>
          )}
        </ScrollView>
        <Divider />
        <HStack mt={5}>
          <Button onPress={onClose1} variant="outline" w={'40%'} mr={'2%'}>
            Cancel
          </Button>
          <Button onPress={onClose1} w={'40%'} ml={'2%'} bg={'#5F84A2'}>
            Send
          </Button>
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
export default SelectPatient;

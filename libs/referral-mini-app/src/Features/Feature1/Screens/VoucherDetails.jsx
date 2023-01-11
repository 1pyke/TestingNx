import React, { useEffect, useState } from 'react';
import {
  View,
  Center,
  Heading,
  Image,
  ScrollView,
  Stack,
  Text,
  Icon,
  HStack,
  Divider,
  Box,
  Flex,
  useDisclose,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import CreateVoucher from '../Components/CreateVoucher';
import HistoryVouchers from '../Components/history/HistoryVouchers';
import ReadMore from 'react-native-read-more-text';
import TermsAndConditions from '../Components/TermsAndConditions';
import Slider from '../Components/Slider';
import { useSelector } from 'react-redux';
import { handleGetLoockups } from '../../../services/lookups';
import AllowabledDay from '../Components/AllowabledDay';

const VoucherDetails = (props) => {
  const { isOpen, onOpen, onClose } = useDisclose();

  const authStore = useSelector((state) => state.AuthStore);

  const [remaining, setRemaining] = useState(0);
  const [authorizeGenerate, setAuthorizeGenerate] = useState(false);
  const [currentOwner, setCurrentOwner] = useState(null);
  const [termsConditions, setTermsConditions] = useState(null);
  const [lookupsDays, setLookupsDays] = useState([]);

  const getDays = async () => {
    try {
      let days = await handleGetLoockups('getAllDays', {});
      days = days.rows;
      for (let i = 0; i < days.length; i++) {
        const j = props.route.params.useDays?.findIndex(
          (e) => e.day.name === days[i].name.en
        );
        if (j > -1) {
          days[i].isAllowed = true;
        }
      }
      setLookupsDays(days);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('VoucherDetails component ');
    for (let i = 0; i < props.route.params.owners.rows.length; i++) {
      if (
        props.route.params.owners.rows[i].owner.id ===
        authStore.user.establishment.id
      ) {
        setAuthorizeGenerate(true);
        setCurrentOwner(props.route.params.owners.rows[i]);
      }
    }
  }, [authStore && props.route.params.owners]);

  useEffect(() => {
    if (currentOwner) {
      setRemaining(currentOwner.maxCopies - currentOwner.usedCount);
      console.log('use effect to setRemaining', remaining);
      getDays();
    }
  }, [currentOwner]);

  const handleOpenTermsConditions = (terms) => {
    try {
      setTermsConditions(terms);
      onOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const renderTruncatedFooter = (handlePress) => {
    return (
      <Text color={'#707070'} onPress={handlePress}>
        Read more
      </Text>
    );
  };
  const renderRevealedFooter = (handlePress) => {
    return (
      <Text color={'#707070'} onPress={handlePress}>
        Show less
      </Text>
    );
  };

  const handleTextReady = () => {
    // ...
  };

  return (
    <View bg="white">
      <ScrollView>
        <Stack width="100%" direction="column" mb="2.5" space={5} bg="red">
          {props.route.params.images.count ? (
            <Slider images={props.route.params.images.rows} />
          ) : (
            <Center>
              <Image
                resizeMode={'cover'}
                rounded="lg"
                mx="3"
                my="5"
                style={{ width: '93%', height: 200 }}
                source={require('../../../../../../apps/clinc-container/assets/referral/voucherImage.png')}
                alt="Alternate Text"
              />
            </Center>
          )}
        </Stack>
        <Box mx="5" my="3" width="90%" margin="auto">
          {/* <ReadMore
            width="100%"
            mx="3"
            numberOfLines={1}
            renderTruncatedFooter={renderTruncatedFooter}
            renderRevealedFooter={renderRevealedFooter}
            onReady={handleTextReady}
          > */}

          <Heading bold color={'#194569'}>
            {props.route.params.subject.en || props.route.params.subject.ar}
          </Heading>
          {/* </ReadMore> */}
        </Box>
        <Box mx="5">
          {/*   <ReadMore
            width="90%"
            mx="3"
            numberOfLines={1}
            renderTruncatedFooter={renderTruncatedFooter}
            renderRevealedFooter={renderRevealedFooter}
            onReady={handleTextReady}
          > */}
          <Text color={'#194569'} width="95%">
            {props.route.params.description.en ||
              props.route.params.description.ar}
          </Text>
          {/* </ReadMore> */}
        </Box>

        <Flex mx="5" my={2}>
          {/* direction="row" justifyContent="space-between" */}
          <Text color="#194569" bold>
            Generation Terms & Conditions
          </Text>
          <Center>
            <Flex mx="5" my={2} direction="row">
              {lookupsDays.map((day) => (
                <AllowabledDay key={day.id} day={day} allowed={day.isAllowed} />
              ))}
            </Flex>
          </Center>

          <Center>
            {props.route.params.generationEndDate && (
              <HStack my="3">
                <Icon
                  color="#194569"
                  size="5"
                  as={<AntDesign name="calendar" size={24} />}
                />
                <Text color="#194569">
                  {' '}
                  {props.route.params.generationEndDate}
                </Text>
              </HStack>
            )}
            {props.route.params.bookingOnly && (
              <Text color="#194569" my="3">
                {' '}
                Advance booking is required{' '}
              </Text>
            )}
            {props.route.params.restricted && (
              <Text color="#194569" my="3">
                {' '}
                Restricted Voucher{' '}
              </Text>
            )}
          </Center>

          <Stack
            direction={{
              base: 'column',
              md: 'row',
            }}
            space={2}
          >
            {props.route.params.generationTermsConditions ? (
              <Center>
                <Text
                  style={page.text}
                  bold
                  underline
                  onPress={() =>
                    handleOpenTermsConditions(
                      props.route.params.generationTermsConditions
                    )
                  }
                >
                  Generation Terms and Conditions
                </Text>
              </Center>
            ) : null}
          </Stack>
        </Flex>

        <Flex mx="5" my="1">
          <Text color="#194569" bold>
            {' '}
            Reedembtion Terms & Conditions
          </Text>

          {props.route.params.reedemptionStartDate && (
            <Flex direction="row" justifyContent="space-around">
              <HStack my="3">
                <Icon
                  color="#194569"
                  size="5"
                  as={<AntDesign name="calendar" size={24} />}
                />
                <Text color="#194569">
                  {' '}
                  {props.route.params.reedemptionStartDate
                    .split('-')
                    .reverse()
                    .join('-')}
                </Text>
              </HStack>
              <Text color="#194569" mt={3}>
                to
              </Text>
              <HStack my="3">
                <Icon
                  color="#194569"
                  size="5"
                  as={<AntDesign name="calendar" size={24} />}
                />
                <Text color="#194569">
                  {' '}
                  {props.route.params.reedemptionEndDate
                    .split('-')
                    .reverse()
                    .join('-')}
                </Text>
              </HStack>
            </Flex>
          )}
          <Stack
            direction={{
              base: 'column',
              md: 'row',
            }}
            space={2}
          >
            {props.route.params.reedemptionTermsConditions ? (
              <Center>
                <Text
                  style={page.text}
                  bold
                  underline
                  onPress={() =>
                    handleOpenTermsConditions(
                      props.route.params.reedemptionTermsConditions
                    )
                  }
                >
                  Reedemption Terms and Conditions
                </Text>
              </Center>
            ) : null}
          </Stack>
        </Flex>

        <Divider
          my="2"
          mx="2"
          _light={{
            bg: '#707070',
          }}
          _dark={{
            bg: '#707070',
          }}
        />

        {authorizeGenerate && (
          <>
            <CreateVoucher
              remaning={remaining}
              setRemaining={setRemaining}
              template={props.route.params}
              subject={
                props.route.params.subject.en || props.route.params.subject.ar
              }
            />

            <Divider
              my="2"
              mx="2"
              _light={{
                bg: '#707070',
              }}
              _dark={{
                bg: '#707070',
              }}
            />
          </>
        )}
        <HistoryVouchers id={props.route.params.id} />
      </ScrollView>

      {isOpen && (
        <TermsAndConditions
          isOpen={isOpen}
          onClose={onClose}
          termsAndConditions={termsConditions}
        />
      )}
    </View>
  );
};

const page = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
  text: {
    color: '#194569',
    fontSize: 14,
  },
});

export default VoucherDetails;

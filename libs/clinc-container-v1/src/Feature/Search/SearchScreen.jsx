import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  TouchableHighlight,
  SafeAreaView,
  DrawerLayoutAndroid,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Pressable,
  Box,
  HStack,
  Spacer,
  Flex,
  Checkbox,
  Center,
  NativeBaseProvider,
  VStack,
  Spinner,
  Heading,
  Avatar,
  Divider,
  Button,
  PresenceTransition,
} from 'native-base';
import Icon from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { requestBuilder } from '../../requestBuilder';
import {
  emptySearchInput,
  saveRecentSearches,
  DeleteRecentSearch,
  saveUniqueRecentSearches,
} from './search-store';
import {
  componentsLoaderHandler,
  isQuickActionsOpenHandler,
} from '../../sharedComponents/FinalLayout/store-finalLayout';
import { SwipeListView } from 'react-native-swipe-list-view';
import { HeaderSearchHandler } from '../../sharedComponents/FinalLayout/store-finalLayout';
export default function SearchScreen({ navigation }) {
  const drawer = useRef(null);
  const searchStore = useSelector((state) => state.searchStore);
  const finalLayoutStore = useSelector((state) => state.finalLayoutStore);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [NodataFlag, setNodataFlag] = useState(false);
  const [groupValues, setGroupValues] = useState([]);
  const [deleteRecentSearch, setDeleteRecentSearch] = useState([]);
  const [testARR, settestARR] = useState([1, 2, 3, 4]);
  const [searchResults, setSearchResults] = useState([]);
  const [FinalRecentSearches, setFinalRecentSearches] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      closeALLmodals();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        dispatch(HeaderSearchHandler());
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
      setNodataFlag(false);
      dispatch(emptySearchInput());
      if (searchStore.searchInput !== '') {
        getSearchData(searchStore.searchInput);
      } else {
        setSearchResults([]);
      }
      return () => backHandler.remove();
    }, [searchStore.searchInput, searchStore.searchFlag])
  );

  function getRecentSearch() {
    const uniqueAddresses = Array.from(
      new Set(searchStore.recentSearches.map((a) => a.entityID))
    ).map((id) => {
      return searchStore.recentSearches.find((a) => a.entityID === id);
    });

    dispatch(saveUniqueRecentSearches([...uniqueAddresses]));
  }

  async function getSearchData(payload) {
    console.log('sssssssssssssssss', payload);
    setSearchResults([]);
    let allResults = [];
    if (groupValues.length !== 0) {
      if (groupValues.includes('providers')) {
        try {
          dispatch(componentsLoaderHandler());
          await axios(
            requestBuilder('providers', '/universalSearch/:test', 'get', {
              test: payload,
            })
          ).then((results) => allResults.push(results.data));
          dispatch(componentsLoaderHandler());
        } catch (error) {
          console.log('errrrore', error);
        }
      }
      if (groupValues.includes('rooms')) {
        try {
          dispatch(componentsLoaderHandler());
          await axios(
            requestBuilder(
              'facilities',
              '/room/universalSearch/:keyword',
              'get',
              { keyword: payload }
            )
          ).then((results) => allResults.push(results.data));
          dispatch(componentsLoaderHandler());
        } catch (error) {
          console.log('errrrore', error);
        }
      }
      if (groupValues.includes('consumers')) {
        try {
          dispatch(componentsLoaderHandler());
          await axios(
            requestBuilder(
              'consumers',
              '/consumers/universalSearch/:keyword',
              'get',
              { keyword: payload }
            )
          ).then((results) => allResults.push(results.data));
          dispatch(componentsLoaderHandler());
        } catch (error) {
          console.log('wwwwwwwwwwwwwwwwww', error);
        }
      }
      if (groupValues.includes('services')) {
        try {
          dispatch(componentsLoaderHandler());
          await axios(
            requestBuilder(
              'services',
              '/services/universalSearch/:keyword',
              'get',
              { keyword: payload }
            )
          ).then((results) => allResults.push(results.data));
          dispatch(componentsLoaderHandler());
        } catch (error) {
          console.log('errrrore', error);
        }
      }
      if (groupValues.includes('equipment')) {
        try {
          dispatch(componentsLoaderHandler());
          await axios(
            requestBuilder(
              'facilities',
              '/equipment/universalSearch/:keyword',
              'get',
              { keyword: payload }
            )
          ).then((results) => allResults.push(results.data));
          dispatch(componentsLoaderHandler());
        } catch (error) {
          console.log('errrrore', error);
        }
      }
      if (groupValues.includes('inventory')) {
        try {
          dispatch(componentsLoaderHandler());
          await axios(
            requestBuilder(
              'inventory',
              '/items/universalSearch/:keyword',
              'get',
              { keyword: payload }
            )
          ).then((results) => allResults.push(results.data));
          dispatch(componentsLoaderHandler());
        } catch (error) {
          console.log('errrrore', error);
        }
      }
      if (groupValues.includes('appointments')) {
        try {
          dispatch(componentsLoaderHandler());
          await axios(
            requestBuilder(
              'appointments',
              '/appointments/universalSearch/:keyword',
              'get',
              { keyword: payload }
            )
          ).then((results) => allResults.push(results.data));
          dispatch(componentsLoaderHandler());
        } catch (error) {
          dispatch(componentsLoaderHandler());
          console.log('errrrore', error);
        }
      }
      console.log('allResultsallResults', allResults);
      setSearchResults(allResults.flat());

      if (allResults.flat() == 0) {
        setNodataFlag(true);
      }
    } else {
      setSearchResults([]);
      let allSearchResults = [];
      try {
        dispatch(componentsLoaderHandler());
        await axios(
          requestBuilder(
            'appointments',
            '/appointments/universalSearch/:keyword',
            'get',
            { keyword: payload }
          )
        ).then((results) => allSearchResults.push(results.data));
        dispatch(componentsLoaderHandler());
      } catch (error) {
        dispatch(componentsLoaderHandler());
        console.log('appointmentsappointments', error);
      }
      try {
        dispatch(componentsLoaderHandler());
        await axios(
          requestBuilder(
            'inventory',
            '/items/universalSearch/:keyword',
            'get',
            { keyword: payload }
          )
        ).then((results) => allSearchResults.push(results.data));
        dispatch(componentsLoaderHandler());
      } catch (error) {
        dispatch(componentsLoaderHandler());
        console.log('erroinventoryinventoryrerror', error);
      }
      try {
        dispatch(componentsLoaderHandler());
        await axios(
          requestBuilder('providers', '/universalSearch/:test', 'get', {
            test: payload,
          })
        ).then((results) => allSearchResults.push(results.data));
        dispatch(componentsLoaderHandler());
      } catch (error) {
        dispatch(componentsLoaderHandler());
        console.log('providersproviders', error);
      }

      try {
        dispatch(componentsLoaderHandler());
        await axios(
          requestBuilder(
            'services',
            '/services/universalSearch/:keyword',
            'get',
            { keyword: payload }
          )
        ).then((results) => allSearchResults.push(results.data));
        dispatch(componentsLoaderHandler());
      } catch (error) {
        dispatch(componentsLoaderHandler());
        console.log('servicesservices', error);
      }
      try {
        dispatch(componentsLoaderHandler());
        await axios(
          requestBuilder(
            'facilities',
            '/room/universalSearch/:keyword',
            'get',
            { keyword: payload }
          )
        ).then((results) => allSearchResults.push(results.data));
        dispatch(componentsLoaderHandler());
      } catch (error) {
        dispatch(componentsLoaderHandler());
        console.log('roomroomroom', error);
      }
      try {
        dispatch(componentsLoaderHandler());
        await axios(
          requestBuilder(
            'facilities',
            '/equipment/universalSearch/:keyword',
            'get',
            { keyword: payload }
          )
        ).then((results) => allSearchResults.push(results.data));
        dispatch(componentsLoaderHandler());
      } catch (error) {
        dispatch(componentsLoaderHandler());
        console.log('equipmentequipment', error);
      }
      setSearchResults(allSearchResults.flat());
      if (allSearchResults.flat() == 0) {
        setNodataFlag(true);
      }
    }
  }
  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>I'm in the Drawer!</Text>
      <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      />
    </View>
  );

  function handleRecentSearches(item) {
    dispatch(saveRecentSearches(item));
  }
  function DeleteSearchItem(payload) {
    console.log('payloadpayload', payload);
    let finalArr = [];
    let afterDelete = searchStore.recentSearches;
    for (let i = 0; i < afterDelete.length; i++) {
      if (afterDelete[i].entityID !== payload.entityID) {
        finalArr.push(afterDelete[i]);
      }
    }
    dispatch(DeleteRecentSearch(finalArr));
  }

  function AvatarType(payload) {
    if (payload.toLowerCase() == 'rooms') {
      return 'https://cdn-icons-png.flaticon.com/512/489/489405.png';
    }
    if (payload.toLowerCase() == 'provider') {
      return 'https://cdn-icons-png.flaticon.com/512/387/387561.png';
    }
    if (payload.toLowerCase() == 'consumer') {
      return 'https://cdn-icons-png.flaticon.com/512/2760/2760970.png';
    }
    if (payload.toLowerCase() == 'service') {
      return 'https://cdn-icons-png.flaticon.com/512/1605/1605350.png';
    }
    if (payload.toLowerCase() == 'equipments') {
      return 'https://cdn-icons-png.flaticon.com/512/3076/3076840.png';
    }
    if (payload.toLowerCase() == 'item') {
      return 'https://cdn-icons-png.flaticon.com/512/743/743007.png';
    }
    if (payload.toLowerCase() == 'appointments') {
      return 'https://cdn-icons.flaticon.com/png/512/4465/premium/4465479.png?token=exp=1656836412~hmac=b19722cdfe6055c451cd1823084c586b';
    }
  }

  function closeALLmodals() {
    if (finalLayoutStore.isQuickActionsOpen)
      dispatch(isQuickActionsOpenHandler());
  }

  function navigate(item) {
    switch (item.type.toUpperCase()) {
      case 'PROVIDER':
        navigation.navigate('ProviderFullView', { item });
        break;
      case 'CONSUMER':
        navigation.navigate('ConsumerFullView', { item });
        break;
      case 'ROOMS':
        navigation.navigate('RoomFullView', { item });
        break;
      case 'SERVICE':
        navigation.navigate('ServiceFullView', { item });
        break;
      case 'EQUIPMENTS':
        navigation.navigate('EquipmentFullView', { item });
        break;
      case 'ITEM':
        navigation.navigate('ItemFullView', { item });
        break;

      case 'APPOINTMENTS':
        navigation.navigate('AppointmentFullView', { item });
        break;
    }
  }

  const renderItem = ({ item, index }) => (
    <Box alignItems="center">
      <TouchableHighlight
        underlayColor={'#AAA'}
        onPress={() => {
          handleRecentSearches(item);
          navigate(item);
        }}
        style={{ marginBottom: 10, borderRadius: 10 }}
      >
        <Box
          w="350"
          borderWidth="1"
          borderColor={'teal'}
          shadow="3"
          bg={'coolGray.100'}
          rounded="8"
        >
          <Heading
            bold
            style={{
              position: 'absolute',
              top: 15,
              left: '50%',
              color: '#1E5128',
              fontSize: 18,
            }}
          >
            {item.type.toUpperCase()}
          </Heading>
          <Avatar
            style={{ position: 'absolute', top: 5, left: '30%' }}
            size="48px"
            source={{
              uri: AvatarType(item.type),
            }}
          />

          {item.label1 && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 60,
                width: '100%',
                backgroundColor: '#ECF2F9',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: '#7C83FD',
              }}
            >
              <Heading style={styles.labelStyle}>
                {item.label1.toUpperCase()}:{' '}
              </Heading>
              <Text style={styles.valueStyle}>{item.value1}</Text>
            </View>
          )}
          {item.label2 && (
            <View style={styles.containerSearch}>
              {
                <Heading style={styles.labelStyle}>
                  {item.label2.toUpperCase()}:{' '}
                </Heading>
              }
              <Text style={styles.valueStyle}>{item.value2} </Text>
            </View>
          )}
          {item.label3 && (
            <View style={styles.containerSearch}>
              {
                <Heading style={styles.labelStyle}>
                  {item.label3.toUpperCase()} :{' '}
                </Heading>
              }
              {typeof item.value3 == 'boolean' && (
                <Text style={styles.valueStyle}>{item.value3.toString()}</Text>
              )}
              {typeof item.value3 == 'string' && (
                <Text style={styles.valueStyle}>{item.value3}</Text>
              )}
            </View>
          )}

          {item.label4 && (
            <View style={styles.containerSearch}>
              {
                <Heading style={styles.labelStyle}>
                  {item.label4.toUpperCase()} :{' '}
                </Heading>
              }

              {typeof item.value4 == 'boolean' && (
                <Text style={styles.valueStyle}>{item.value4.toString()}</Text>
              )}
              {typeof item.value4 == 'string' && (
                <Text style={styles.valueStyle}>{item.value4}</Text>
              )}
            </View>
          )}
          {item.label5 && (
            <View style={styles.containerSearch}>
              {
                <Heading style={styles.labelStyle}>
                  {item.label5.toUpperCase()} :{' '}
                </Heading>
              }
              {typeof item.value5 == 'boolean' && (
                <Text style={styles.valueStyle}>{item.value5.toString()}</Text>
              )}
              {typeof item.value5 == 'string' && (
                <Text style={styles.valueStyle}>{item.value5}</Text>
              )}
            </View>
          )}
          {item.label6 && (
            <View style={styles.containerSearch}>
              {
                <Heading style={styles.labelStyle}>
                  {item.label6.toUpperCase()} :{' '}
                </Heading>
              }
              {typeof item.value6 == 'boolean' && (
                <Text style={styles.valueStyle}>{item.value6.toString()}</Text>
              )}
              {typeof item.value6 == 'string' && (
                <Text style={styles.valueStyle}>{item.value6}</Text>
              )}
            </View>
          )}
          {item.label7 && (
            <View style={styles.containerSearch}>
              {
                <Heading style={styles.labelStyle}>
                  {item.label7.toUpperCase()} :{' '}
                </Heading>
              }
              {typeof item.value7 == 'boolean' && (
                <Text style={styles.valueStyle}>{item.value7.toString()}</Text>
              )}
              {typeof item.value7 == 'string' && (
                <Text style={styles.valueStyle}>{item.value7}</Text>
              )}
            </View>
          )}
          {item.label8 && (
            <View style={styles.containerSearch}>
              {
                <Heading style={styles.labelStyle}>
                  {item.label8.toUpperCase()} :{' '}
                </Heading>
              }
              {typeof item.value8 == 'boolean' && (
                <Text style={styles.valueStyle}>{item.value8.toString()}</Text>
              )}
              {typeof item.value8 == 'string' && (
                <Text style={styles.valueStyle}>{item.value8}</Text>
              )}
            </View>
          )}
          {item.label9 && (
            <View style={styles.containerSearch}>
              {
                <Heading style={styles.labelStyle}>
                  {item.label9.toUpperCase()} :{' '}
                </Heading>
              }
              {typeof item.value9 == 'boolean' && (
                <Text style={styles.valueStyle}>{item.value9.toString()}</Text>
              )}
              {typeof item.value9 == 'string' && (
                <Text style={styles.valueStyle}>{item.value9}</Text>
              )}
            </View>
          )}
          {item.label10 && (
            <View style={styles.containerSearch}>
              {
                <Heading style={styles.labelStyle}>
                  {item.label10.toUpperCase()} :{' '}
                </Heading>
              }
              {typeof item.value10 == 'boolean' && (
                <Text style={styles.valueStyle}>{item.value10.toString()}</Text>
              )}
              {typeof item.value10 == 'string' && (
                <Text style={styles.valueStyle}>{item.value10}</Text>
              )}
            </View>
          )}
        </Box>
      </TouchableHighlight>
    </Box>
  );

  const renderHiddenItem = (data, rowMap) => (
    <HStack flex="1" pl="2">
      <Pressable
        style={{ position: 'absolute', right: 35, top: 40, borderRadius: 10 }}
        w="70"
        h={'80%'}
        cursor="pointer"
        bg="red.500"
        justifyContent="center"
        onPress={() => console.log('ooo')}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon name="trash-o" style={{ color: 'white', fontSize: 28 }} />
          <Heading
            style={{ color: 'white', fontSize: 15 }}
            fontSize="xs"
            fontWeight="medium"
          >
            Delete
          </Heading>
        </VStack>
      </Pressable>

      <Pressable
        style={{ position: 'absolute', right: 107, top: 40, borderRadius: 10 }}
        w="70"
        h={'80%'}
        cursor="pointer"
        bg="yellow.500"
        justifyContent="center"
        onPress={() => console.log('ooo')}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon name="eye-slash" style={{ color: 'white', fontSize: 28 }} />
          <Heading style={{ color: 'white', fontSize: 15 }} fontWeight="medium">
            Watch
          </Heading>
        </VStack>
      </Pressable>

      <Pressable
        style={{ position: 'absolute', right: 180, top: 40, borderRadius: 10 }}
        w="70"
        h={'80%'}
        cursor="pointer"
        bg="blue.500"
        justifyContent="center"
        onPress={() => console.log('ooo')}
        _pressed={{
          opacity: 0.5,
        }}
      >
        <VStack alignItems="center" space={2}>
          <Icon name="edit" style={{ color: 'white', fontSize: 28 }} />
          <Heading
            style={{ color: 'white', fontSize: 15 }}
            fontSize="xs"
            fontWeight="medium"
          >
            Edit
          </Heading>
        </VStack>
      </Pressable>
    </HStack>
  );

  return (
    <ScrollView>
      <TouchableOpacity
        style={{
          width: 80,
          height: 40,
          backgroundColor: '#DDDDDD',
          borderRadius: 10,
          paddingTop: 8,
          marginLeft: 10,
          marginTop: 120,
        }}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text> {isOpen ? 'Show Less' : 'Catagories'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            width: '95%',
            position: 'relative',
            top: 10,
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          px="3"
        >
          <PresenceTransition
            visible={isOpen}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 500,
              },
            }}
          >
            <View
              style={{
                backgroundColor: '#DDDDDD',
                borderRadius: 10,
                width: '100%',
                height: 150,
              }}
            >
              <Checkbox.Group
                onChange={setGroupValues}
                value={groupValues}
                accessibilityLabel="choose numbers"
              >
                <View style={{ flexDirection: 'column', padding: 10 }}>
                  <View style={{ paddingBottom: 7 }}>
                    <Checkbox size="md" value="consumers">
                      Consumers
                    </Checkbox>
                  </View>
                  <View style={{ paddingBottom: 7 }}>
                    <Checkbox size="md" value="rooms">
                      Rooms
                    </Checkbox>
                  </View>
                  <Checkbox size="md" value="services">
                    Services
                  </Checkbox>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    position: 'absolute',
                    left: '56%',
                    padding: 10,
                  }}
                >
                  <View style={{ paddingBottom: 7 }}>
                    <Checkbox size="md" value="providers">
                      Providers
                    </Checkbox>
                  </View>
                  <View style={{ paddingBottom: 7 }}>
                    <Checkbox size="md" value="inventory">
                      Inventory
                    </Checkbox>
                  </View>
                  <Checkbox size="md" value="equipment">
                    Equipment
                  </Checkbox>
                </View>
                <View style={{ marginLeft: '26%' }}>
                  <Checkbox size="md" value="appointments">
                    Appointments
                  </Checkbox>
                </View>
              </Checkbox.Group>
            </View>
          </PresenceTransition>
        </View>
      )}

      <View style={{ marginBottom: 50 }}>
        <SwipeListView
          data={searchResults}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-224}
          leftOpenValue={130}
          style={{ marginTop: 20 }}
        />
      </View>

      {searchResults.length == 0 && (
        <View>
          {NodataFlag && (
            <Text
              style={{
                position: 'absolute',
                left: '30%',
                marginBottom: 50,
                fontSize: 25,
              }}
            >
              No Data Found
            </Text>
          )}
          <ScrollView>
            <Heading
              bold
              style={{
                color: 'black',
                marginLeft: 10,
                marginTop: NodataFlag ? 60 : 0,
              }}
            >
              Recent searches
            </Heading>

            {searchStore.recentSearches.length !== 0 &&
              searchStore.recentSearches.map((item) => (
                <Pressable onPress={() => navigate(item)}>
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <View
                        style={{
                          width: '100%',
                          height: 70,
                          backgroundColor: isPressed ? '#DDDDDD' : 'white',
                          marginBottom: 5,
                          flexDirection: 'row',
                        }}
                      >
                        <Avatar
                          mt="3"
                          ml="2"
                          size="48px"
                          source={{
                            uri: 'https://cdn-icons-png.flaticon.com/512/387/387561.png',
                          }}
                        />
                        <View>
                          <Text style={{ marginLeft: 10, marginTop: 15 }}>
                            Category: {item.type}
                          </Text>
                          <Text style={{ marginLeft: 10, marginTop: 3 }}>
                            {item.value1}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => DeleteSearchItem(item)}
                          style={{
                            position: 'absolute',
                            right: 20,
                            top: '30%',
                            backgroundColor: '#DDDDDD',
                            width: 30,
                            height: 30,
                          }}
                        >
                          <Icon
                            name="close"
                            style={{ fontSize: 30, paddingLeft: 3 }}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                </Pressable>
              ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    // margin: 8,
  },
  labelStyle: {
    position: 'absolute',
    left: '20%',
    top: '40%',
    fontSize: 14,
    color: '#3EC70B',
  },
  valueStyle: {
    marginLeft: '50%',
    color: '#3330E4',
  },
  containerSearch: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ECF2F9',
    padding: 15,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 0.7,
    borderColor: '#7C83FD',
    marginBottom: 1,
    marginTop: 1,
  },
  navigationContainer: {},
  paragraph: {},
});

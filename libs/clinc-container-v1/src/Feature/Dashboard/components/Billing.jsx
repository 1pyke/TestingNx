import React, { useEffect, useState, useCallback } from 'react';
import { Pressable, Text, View, Pagination } from 'react-native';
import { Box, Button, Center, HStack, VStack } from 'native-base';

import axios from 'axios';
import { requestBuilder } from '../../../requestBuilder';

function Billing({ navigation }) {
  const [selected, setSelected] = React.useState(1);
  const [ActiveSlide, setActiveSlide] = useState(1);
  const [extablishmentExpenses, setEstablishmentExpenses] = useState(1);
  const [providerExpenses, setproviderExpenses] = useState(1);
  const [inventoryExpenses, setinventoryExpenses] = useState(20);
  const [productRevenue, setproductRevenue] = useState(1);
  const [AppointmentRevenue, setAppointmentRevenue] = useState(1);
  const [billing, setBilling] = useState([
    {
      name: 'Expenses',
      section1: extablishmentExpenses,
      section2: providerExpenses,
      section3: inventoryExpenses,
    },
    {
      name: 'Revenues',
      section1: productRevenue,
      section2: AppointmentRevenue,
    },
  ]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setBilling([
      {
        name: 'Expenses',
        section1: extablishmentExpenses,
        section2: providerExpenses,
        section3: inventoryExpenses,
      },
      {
        name: 'Revenues',
        section1: productRevenue,
        section2: AppointmentRevenue,
      },
    ]);
  }, [
    extablishmentExpenses,
    providerExpenses,
    inventoryExpenses,
    productRevenue,
    AppointmentRevenue,
  ]);

  useEffect(() => {
    console.log('inside billing');
  }, [productRevenue, AppointmentRevenue]);

  async function getData() {
    let expenseData = await axios(
      requestBuilder('billing', '/establishmentExpenses', 'get')
    );
    for (let i = 0; i < expenseData.data.length; i++) {
      setEstablishmentExpenses(
        extablishmentExpenses + expenseData.data[i].paid_amount
      );
    }
    let providerData = await axios(
      requestBuilder('billing', '/ProviderExpenses', 'get')
    );
    for (let i = 0; i < providerData.data.length; i++) {
      setproviderExpenses(
        providerExpenses +
          providerData.data[i].basic_Salary +
          providerData.data[i].service_cut
      );
    }
    let inventoryExpense = await axios(
      requestBuilder('billing', '/InventoryExpenses', 'get')
    );
    for (let i = 0; i < inventoryExpense.data.length; i++) {
      setinventoryExpenses(
        inventoryExpenses + inventoryExpense.data[i].invoice_paid_amount
      );
    }

    let AppointmentRevenueData = await axios(
      requestBuilder('billing', '/AppointmentsRevenue', 'get')
    );
    let AppointmentRevenueTotal = 0;
    for (let i = 0; i < AppointmentRevenueData.data.length; i++) {
      AppointmentRevenueTotal =
        AppointmentRevenueTotal + AppointmentRevenueData.data[i].Paid_total;
    }
    setAppointmentRevenue(AppointmentRevenueTotal);
    let productRevenueData = await axios(
      requestBuilder('billing', '/ProductRevenuesItems', 'get')
    );
    for (let i = 0; i < productRevenueData.data.length; i++) {
      setproductRevenue(productRevenue + productRevenueData.data[i].price);
    }
  }
  const renderLegend = (text, color) => {
    return (
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        <View
          style={{
            height: 18,
            width: 18,
            marginRight: 10,
            borderRadius: 4,
            backgroundColor: color || 'white',
          }}
        />
        <Text style={{ color: 'teal', fontSize: 12 }}>{text || ''}</Text>
      </View>
    );
  };

  const billingItem = useCallback(
    ({ item, index }) => (
      <View>
        <Box></Box>
        <View
          style={{
            marginVertical: 20,
            marginHorizontal: 30,
            paddingVertical: 50,
            backgroundColor: '#DDDDDD',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#92BA92',
          }}
        >
          {/*********************    Custom Header component      ********************/}

          <Text
            style={{
              color: 'teal',
              fontSize: 32,
              fontWeight: 'bold',
              marginBottom: 40,
            }}
          >
            {item.name}
          </Text>
          {/**************************fds********vv*****************sa*************************/}

          {
            <View>
              {/* <PieChart
                strokeColor="white"
                strokeWidth={2}
                donut
                data= {item.name=='Expenses' ?  [
                  {value: item.section1, color: 'rgb(84,219,234)'},
                  {value: item.section2, color: 'lightgreen'},
                  {value: item.section3 , color: 'orange' },
                ] : [
                  {value: item.section1, color: 'rgb(84,219,234)'},
                  {value: item.section2, color: 'lightgreen'},
                 
                ] } 
                innerCircleColor="teal"
                innerCircleBorderWidth={3}
                innerCircleBorderColor={'white'}
                showValuesAsLabels={true}
           
                textSize={17}
                textBackgroundRadius={20}
                showTextBackground={true}
                centerLabelComponent={() => {
                  return (
                    <View>
                      <Text style={{color: 'white', fontSize: 28}}>Total</Text>
                      <Text style={{color: 'white', fontSize: 14,textAlign:'center'}}> {item.name}</Text>
                    </View>
                  );
                }}
              /> */}
            </View>
          }
          {/*********************    Custom Legend component      **   ******************/}
          {item.name == 'Expenses' ? (
            <View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 50,
                }}
              >
                {renderLegend('Provider Expenses', 'rgb(84,219,234)')}
                {renderLegend('Clinic Expenses', 'lightgreen')}
              </View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 20,
                }}
              >
                {renderLegend('Inventory Expenses', 'orange')}
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 50,
                }}
              >
                {renderLegend('Product Revenues', 'rgb(84,219,234)')}
                {renderLegend('Appointment Revenues', 'lightgreen')}
              </View>
            </View>
          )}
        </View>
      </View>
    ),
    []
  );

  return (
    <View>
      {/* <Button onPress={()=>console.log('rrrrrrrrrrrr',AppointmentRevenue)}>Test</Button> */}
      <Box
        flex={1}
        bg="grey.200"
        mt="60"
        safeAreaTop
        width="100%"
        maxW="300px"
        alignSelf="center"
      >
        {/* <Pressable style={{position:'absolute',bottom:-16}} cursor="pointer"  py="3" flex={1} onPress={() => navigation.navigate('BillingLandingPage')}>
          <HStack bg="transparent" alignItems="center" w="200" safeAreaBottom  h="70" style={{borderRadius:10,borderColor:"teal",borderWidth:2}} >
        
            <Icon mb="1"   style={{fontSize:40,color:"teal" }}     name= "md-receipt"/>
            <Text bold    style={{color:"teal",paddingLeft:20,fontSize:22}}>
                   Billing
              </Text>
              </HStack>
          </Pressable> */}

        {/* <Pressable cursor="pointer"  py="2" flex={1} onPress={() => setSelected(3)}>
          <Center>
          <Icon mb="1"   style={{fontSize:40, color:'#EB5353' }}   color="white"  name= "notifications-circle-outline"/>
             
           </Center>
           </Pressable> */}
      </Box>

      <Box mb="50">
        {/* {  billing[0].section1+  billing[0].section2+  billing[0].section3 >0 && 
          <Carousel
           loop={true}
            layout={'stack'} layoutCardOffset={`38`}
            activeSlideAlignment={`center`}
            data={billing}
            sliderWidth={400}
            itemWidth={380}
            renderItem={billingItem}
            firstItem={1} 
            onSnapToItem={(index) => setActiveSlide(index)  }
            />} */}
        <Pagination
          dotsLength={billing.length}
          activeDotIndex={ActiveSlide}
          containerStyle={{ backgroundColor: 'transparent' }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: '#68A7AD',
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </Box>
    </View>
  );
}
export default { Billing };

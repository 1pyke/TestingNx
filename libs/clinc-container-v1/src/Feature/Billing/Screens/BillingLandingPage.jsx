import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
// import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import axios from 'axios';
export default function BillingLandingPage({navigation}) {
  const [togle, setTogle] = useState(false);
  const [togle2, setTogle2] = useState(false);
  const [togle3, setTogle3] = useState(false);
  const [fixedOpenAndClose, setFixedOpenAndClose] = useState([]);
  const [openAndClose, setOpenAndClose] = useState([]);
  const [due_date, setDue_date] = useState();

  const [providerExpenses, setProviderExpenses] = useState([]);
  const [inventoryExpenses, setInventoryExpenses] = useState([]);
  const [establishmentExpenses, setEstablishmentExpenses] = useState([]);
  const [appoinmentsRevenus, setAppoinmentsRevenus] = useState([]);
  const [productRevenuse, setProductRevenuse] = useState([]);
  const [minus, setminus] = useState(false);
  const [date, setDate] = useState(new Date());

  const [provider, setProvider] = useState(false);
  const [inventory, setInventory] = useState(false);
  const [facilities, setFacilities] = useState(false);
  const [appoinment, setAppoinment] = useState(false);
  const [product, setProduct] = useState(false);

  const [invoiceDetailsForInventory, setInvoiceDetailsForInventory] = useState(
    [],
  );

  const [FacilityDetails, setFacilityDetails] = useState([]);
  const [AppointmentsDetails, setAppointmentsDetails] = useState([]);
  const [ProductsDetails, setProductsDetails] = useState([]);
  const [ProivderDetails, setProivderDetails] = useState([]);
  useEffect(() => {
    if (togle) {
      getCashRegister();
      setminus(!minus);
    }
  }, [togle, togle2, togle3]);

  useEffect(() => {
    const arr = fixedOpenAndClose.filter(ele => {
      return ele.Date === due_date;
    });
    setOpenAndClose(arr);
  }, [due_date]);
  useEffect(() => {
    const getAppointmentsRevusesDetails = async () => {
      try {
        var today = new Date();
        var day =
          today.getFullYear() +
          '-' +
          '0' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        let response = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'billing',
            'requsted-path': '/AppointmentsRevenue/appoinment/Details/:date',
            'requsted-method': 'get',
          },
          data: {
            date:day,
          },
        });
        setAppointmentsDetails(response.data.Response);
      } catch (err) {
        console.log('err', err);
      }
    }
       const getPaidAmountForAppointmentRevenuesByDate = async ()=> {
        try {
          var today = new Date();
          var day =
            today.getFullYear() +
            '-' +
            '0' +
            (today.getMonth() + 1) +
            '-' +
            today.getDate();
          let response = await axios({
            method: 'POST',
            url: 'https://api.development.agentsoncloud.com/external/public/',
            headers: {
              'requsted-service': 'billing',
              'requsted-path': '/AppointmentsRevenue/Revenue/Date/:date',
              'requsted-method': 'get',
            },
            data: {
              date:day,
            },
          });
          setAppoinmentsRevenus(response.data.Response);
        } catch (err) {
          console.log('err', err);
        }
      }
    const getProductsRevenueDetailsByDate =  async () =>{
      try {
        var today = new Date();
        var day =
          today.getFullYear() +
          '-' +
          '0' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        let response = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'billing',
            'requsted-path': '/ProviderExpenses/Provider/Details/:date',
            'requsted-method': 'get',
          },
          data: {
            date: day,
          },
        });
        setProivderDetails(response.data.Response);
      } catch (err) {
        console.log('err', err);
      }
    }
    const getPaidAmountForProviderExpensesByDate = async () => {
      try {
        var today = new Date();
        var day =
          today.getFullYear() +
          '-' +
          '0' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        let response = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'billing',
            'requsted-path': '/ProviderExpenses/Expenses/Date/:date',
            'requsted-method': 'get',
          },
          data: {
            date: day,
          },
        });

        setProviderExpenses(response.data.Response);
      } catch (err) {
        console.log('erdddddr', err);
      }
    };
    const getPaidForInventoryExpenses = async () => {
      try {
        var today = new Date();
        var day =
          today.getFullYear() +
          '-' +
          '0' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        let response = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'billing',
            'requsted-path': '/InventoryExpenses/expenses/Date/:date',
            'requsted-method': 'get',
          },
          data: {
            date: day,
          },
        });
        setInventoryExpenses(response.data.Response);
      } catch (err) {
        console.log('erdddddr', err);
      }
    };

    const getInventoryExpensesDetailsbyDate = async () => {
      try {
        var today = new Date();
        var day =
          today.getFullYear() +
          '-' +
          '0' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        let response = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'billing',
            'requsted-path': '/InventoryExpenses/all/Expenses/Date/:date',
            'requsted-method': 'get',
          },
          data: {
            date: day,
          },
        });
        setInvoiceDetailsForInventory(response.data.Response);
      } catch (err) {
        console.log('err', err);
      }
    };

    const getFacilitiesDetailsByDate = async () => {
      try {
        var today = new Date();
        var day =
          today.getFullYear() +
          '-' +
          '0' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        let response = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'billing',
            'requsted-path': '/establishmentExpenses/Facility/Date/:date',
            'requsted-method': 'get',
          },
          data: {
            date: day,
          },
        });
        setFacilityDetails(response.data.Response);
      } catch (err) {
        console.log('err', err);
      }
    };
    const getTotalPaidForFacilities = async () => {
      try {
        var today = new Date();
        var day =
          today.getFullYear() +
          '-' +
          '0' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        let response = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'billing',
            'requsted-path': '/establishmentExpenses/Expenses/Date/:date	',
            'requsted-method': 'get',
          },
          data: {
            date: day,
          },
        });
        setEstablishmentExpenses(response.data.Response);
      } catch (err) {
        console.log('err', err);
      }
    };

    const getProductsRevenueDetails = async () => {
      try {
        var today = new Date();
        var day =
          today.getFullYear() +
          '-' +
          '0' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        let response = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'billing',
            'requsted-path': '/invoiceProduct/Product/Details/:date',
            'requsted-method': 'get',
          },
          data: {
            date: day,
          },
        });
        setProductsDetails(response.data.Response);
      } catch (err) {
        console.log('EERRR', err);
      }
    };
    const getProductsRevenue = async () => {
      try {
        var today = new Date();
        var day =
          today.getFullYear() +
          '-' +
          '0' +
          (today.getMonth() + 1) +
          '-' +
          today.getDate();
        console.log('day', day);
        let response = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'billing',
            'requsted-path': '/invoiceProduct/Revenues/date/:date',
            'requsted-method': 'get',
          },
          data: {
            date: day,
          },
        });
        setProductRevenuse(response.data.Response);
      } catch (err) {
        console.log('EERRR', err);
      }
    };
    getProductsRevenue();
    getTotalPaidForFacilities();
    getPaidForInventoryExpenses();
    getInventoryExpensesDetailsbyDate();
    getFacilitiesDetailsByDate();
    getProductsRevenueDetails();
    getPaidAmountForProviderExpensesByDate();
    getProductsRevenueDetailsByDate();
    getPaidAmountForAppointmentRevenuesByDate();
    getAppointmentsRevusesDetails();
  }, []);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1 + '';
    if (month.length === 1) month = '0' + month;
    let day = currentDate.getDate() + '';
    if (day.length === 1) day = '0' + day;
    setDue_date(year + '-' + month + '-' + day);
    setDate(currentDate);
  };

  const showDate = () => {
    // DateTimePickerAndroid.open({
    //   value: date,
    //   onChange,
    //   mode: 'date',
    //   maximumDate: new Date(),
    // });
  };
  const getCashRegister = async () => {
    try {
      let today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10);
      let response = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'billing',
            'requsted-path': '/CashRegister',
            'requsted-method': 'get',
          },
        });

      // const responseOpenAndClose = await axios.get(
      //   `http://10.0.2.2:30162/CashRegister`,
      // );

      setFixedOpenAndClose(response.data);
      const arr = response.data.filter(ele => {
        return ele.Date === today;
      });
      setOpenAndClose(arr);
    } catch {
      console.log('Error');
    }
  };
  let today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
  const removeFilter = () => {
    setOpenAndClose(fixedOpenAndClose);
  };
  return (
    <ScrollView>
      <View style={style.container}>
        <View>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              View Cash Opening Closing
            </Text>
            {minus ? (
              <Icon
                size={30}
                name="minus"
                color="#009688"
                onPress={() => {
                  setTogle(!togle);
                  setTogle2(false);
                  setTogle3(false);
                  setminus(false);
                }}
              />
            ) : (
              <Icon
                size={30}
                name="plus"
                color="#009688"
                onPress={() => {
                  setTogle(!togle);
                  setTogle2(false);
                  setTogle3(false);
                }}
              />
            )}
          </View>
          {togle ? (
            <View
              style={{minheight: 200, backgroundColor: '#009688', padding: 25}}>
              <View
                style={{
                  marginTop: 30,
                  paddingHorizontal: 20,
                }}>
                <View>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    <Icon name="money" size={60} color="#fff" />
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      fontSize: 25,
                    }}>
                    Cash Registry
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <Text
                    style={{color: '#FFF', fontWeight: 'bold', fontSize: 15}}>
                    Day is : {due_date}
                  </Text>
                  <Text>
                    <Icon
                      name="calendar"
                      size={25}
                      color="#fff"
                      onPress={showDate}
                    />
                    {/* <Icon
                      style={{
                        color: '#fff',
                      }}
                      name="remove"
                      size={25}
                      onPress={removeFilter}
                    /> */}
                  </Text>
                </View>
              </View>
              <FlatList
                data={openAndClose}
                renderItem={({item}) => (
                  <TouchableOpacity>
                    <View>
                      <View style={style.viewCashRegistry}>
                        <View>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              borderRadius: 5,
                              fontSize: 20,
                              textAlign: 'center',
                            }}>
                            Period: {item.Type}
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              borderRadius: 5,
                              textAlign: 'center',
                            }}>
                            Actual: {item.ActualAmount} JD
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              borderRadius: 5,
                              textAlign: 'center',
                            }}>
                            Expected: {item.ExpectedAmount} JD
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.CashRegister_id}
              />
            </View>
          ) : null}
          {/*  ------------------------------------------------------- */}
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              View List of Receivables / Payable
            </Text>
            {togle2 ? (
              <Icon
                size={30}
                name="minus"
                color="#009688"
                onPress={() => {
                  setTogle(false);
                  setTogle2(!togle2);
                  setTogle3(false);
                  setminus(false);
                  setProduct(false);
                }}
              />
            ) : (
              <Icon
                size={30}
                name="plus"
                color="#009688"
                onPress={() => {
                  setTogle(false);
                  setTogle2(!togle2);
                  setTogle3(false);
                  setProduct(false);
                }}
              />
            )}
          </View>
          {togle2 ? (
            <View
              style={{minheight: 200, backgroundColor: '#009688', padding: 25}}>
              <View>
                <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                  <Icon name="money" size={60} color="#fff" />
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: '#fff',
                    fontSize: 20,
                  }}>
                  All Expenses And Revenues
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{color: '#FFF', fontWeight: 'bold', fontSize: 15}}>
                    Day is:
                  </Text>
                  <Text>
                    <Icon
                      name="calendar"
                      size={25}
                      color="#fff"
                      onPress={showDate}
                    />
                  </Text>
                </View>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#fff'}}>
                  Expenses
                </Text>
              </View>
              <View>
                <View
                  style={{
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                    justifyContent: 'space-between',
                    borderWidth: 0.5,
                    borderColor: '#000',
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#FFF',
                      fontWeight: 'bold',
                      borderRadius: 5,
                      marginBottom: 10,
                      marginTop: 10,
                    }}>
                    Provider
                    {'\n'}
                    {providerExpenses &&
                      providerExpenses.map(ele => {
                        return (
                          <View>
                            <Text
                              style={{
                                fontWeight: 'bold',
                              }}>
                              {ele.Paid_Amount} JD
                            </Text>
                          </View>
                        );
                      })}
                  </Text>
                  {provider ? (
                    <Icon
                      size={23}
                      name="minus"
                      color="#009688"
                      onPress={() => {
                        setProvider(!provider);
                        setInventory(false);
                        setFacilities(false);
                        setAppoinment(false);
                        setProduct(false);
                      }}
                    />
                  ) : (
                    <Icon
                      size={23}
                      name="plus"
                      color="#009688"
                      onPress={() => {
                        setProvider(!provider);
                        setInventory(false);
                        setFacilities(false);
                        setAppoinment(false);
                        setProduct(false);
                      }}
                    />
                  )}
                </View>

                {provider ? (
                  <View
                    style={{
                      minheight: 600,
                      backgroundColor: '#FFF',
                      padding: 25,
                    }}>
                    <Text>Provider Expenses</Text>
                    {ProivderDetails &&
                      ProivderDetails.map(ele => {
                        return (
                          <View
                            style={{
                              backgroundColor: '#009688',
                              marginTop: 10,
                              padding: 15,
                              borderRadius: 5,
                            }}>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {' '}
                              Provider : Mohmmad
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {' '}
                              Date From : {ele.Date_from}{' '}
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {' '}
                              Date To : {ele.Date_to}
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {' '}
                              Basic Salary : {ele.basic_Salary} JD
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {' '}
                              Service cut : {ele.service_cut} JD
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {' '}
                              Incentive : {ele.incentive} JD
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {' '}
                              Discount : {ele.discount} JD
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {' '}
                              Paid Amount :{' '}
                              {ele.Paid_Amount}
                              JD
                            </Text>

                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: 'bold',
                              }}>
                              {' '}
                              Total amount :{' '}
                              {ele.basic_Salary +
                                ele.service_cut +
                                ele.incentive -
                                ele.discount}{' '}
                              JD
                            </Text>


                          </View>
                        );
                      })}
                  </View>
                ) : null}
                <View
                  style={{
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                    justifyContent: 'space-between',
                    borderWidth: 0.5,
                    borderColor: '#000',
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#FFF',
                      fontWeight: 'bold',
                      borderRadius: 5,
                      marginBottom: 10,
                      marginTop: 10,
                    }}>
                    Inventory
                    {'\n'}
                    {inventoryExpenses &&
                      inventoryExpenses.map(ele => {
                        return (
                          <View>
                            <Text
                              style={{
                                fontWeight: 'bold',
                              }}>
                              {ele.invoice_paid_amount} JD
                            </Text>
                          </View>
                        );
                      })}
                  </Text>

                  {inventory ? (
                    <Icon
                      size={23}
                      name="minus"
                      color="#009688"
                      onPress={() => {
                        setInventory(!inventory);
                        setProvider(false);
                        setFacilities(false);
                        setAppoinment(false);
                        setProduct(false);
                      }}
                    />
                  ) : (
                    <Icon
                      size={23}
                      name="plus"
                      color="#009688"
                      onPress={() => {
                        setInventory(!inventory);
                        setProvider(false);
                        setFacilities(false);
                        setAppoinment(false);
                        setProduct(false);
                      }}
                    />
                  )}
                </View>
                {inventory ? (
                  <View
                    style={{
                      minheight: 600,
                      backgroundColor: '#FFF',
                      padding: 25,
                    }}>
                    <Text
                      style={{
                        fontWeight: '400',
                      }}>
                      Inventory Expenses
                    </Text>
                    <View>
                      {invoiceDetailsForInventory &&
                        invoiceDetailsForInventory.map(ele => {
                          return (
                            <View
                              style={{
                                backgroundColor: '#009688',
                                marginTop: 10,
                                padding: 15,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  color: '#FFF',
                                  fontSize: 12,
                                  fontWeight: '500',
                                }}>
                                {' '}
                                Supplier : Mohmmad
                              </Text>
                              <Text
                                style={{
                                  color: '#FFF',
                                  fontSize: 12,
                                  fontWeight: '500',
                                }}>
                                {' '}
                                Total : {ele.invoice_total} JD
                              </Text>
                              <Text
                                style={{
                                  color: '#FFF',
                                  fontSize: 12,
                                  fontWeight: '500',
                                }}>
                                {' '}
                                Last Paid : {ele.invoice_paid_amount} JD
                              </Text>
                            </View>
                          );
                        })}
                    </View>
                  </View>
                ) : null}
                <View
                  style={{
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                    justifyContent: 'space-between',
                    borderWidth: 0.5,
                    borderColor: '#000',
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#FFF',

                      fontWeight: 'bold',
                      borderRadius: 5,

                      marginBottom: 10,
                      marginTop: 10,
                    }}>
                    Facilities
                    {'\n'}
                    {establishmentExpenses &&
                      establishmentExpenses.map(ele => {
                        return (
                          <View>
                            <Text style={{fontWeight: 'bold'}}>
                              {ele.paid_amount} JD
                            </Text>
                          </View>
                        );
                      })}
                  </Text>

                  {facilities ? (
                    <Icon
                      size={23}
                      name="minus"
                      color="#009688"
                      onPress={() => {
                        setInventory(false);
                        setProvider(false);
                        setFacilities(!facilities);
                        setAppoinment(false);
                        setProduct(false);
                      }}
                    />
                  ) : (
                    <Icon
                      size={23}
                      name="plus"
                      color="#009688"
                      onPress={() => {
                        setInventory(false);
                        setProvider(false);
                        setFacilities(!facilities);
                        setAppoinment(false);
                        setProduct(false);
                      }}
                    />
                  )}
                </View>
              </View>
              {/* End Expenses */}
              {facilities ? (
                <View
                  style={{
                    minheight: 600,
                    backgroundColor: '#FFF',
                    padding: 25,
                  }}>
                  <Text style={{fontWeight: '400'}}>Facilities Expenses</Text>
                  {FacilityDetails &&
                    FacilityDetails.map(ele => {
                      return (
                        <View
                          style={{
                            backgroundColor: '#009688',
                            marginTop: 10,
                            padding: 15,
                            borderRadius: 5,
                          }}>
                          <Text
                            style={{
                              color: '#FFF',
                              fontSize: 12,
                              fontWeight: '500',
                            }}>
                            {' '}
                            Supplier : Mohmmad
                          </Text>
                          <Text
                            style={{
                              color: '#FFF',
                              fontSize: 12,
                              fontWeight: '500',
                            }}>
                            {' '}
                            Total : {ele.amount} JD
                          </Text>
                          <Text
                            style={{
                              color: '#FFF',
                              fontSize: 12,
                              fontWeight: '500',
                            }}>
                            {' '}
                            Last Paid : {ele.paid_amount} JD
                          </Text>
                          <Text
                            style={{
                              color: '#FFF',
                              fontSize: 12,
                              fontWeight: '500',
                            }}>
                            {' '}
                            Type : {ele.type}
                          </Text>
                        </View>
                      );
                    })}
                  <Text></Text>
                </View>
              ) : null}
              {/* Start Revenue  */}
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#fff',
                  marginTop: 10,
                }}>
                Revenue
              </Text>
              <View>
                <View
                  style={{
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                    justifyContent: 'space-between',
                    borderWidth: 0.5,
                    borderColor: '#000',
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#FFF',

                      borderRadius: 5,
                      fontWeight: 'bold',
                      marginBottom: 10,
                      marginTop: 10,
                    }}>
                    Appointment
                    {'\n'}
                    {appoinmentsRevenus &&
                      appoinmentsRevenus.map(ele => {
                        return (
                          <View>
                            <Text style={{fontWeight: 'bold'}}>
                              {ele.Paid_total} JD
                            </Text>
                          </View>
                        );
                      })}
                  </Text>

                  {appoinment ? (
                    <Icon
                      size={23}
                      name="minus"
                      color="#009688"
                      onPress={() => {
                        setAppoinment(!appoinment);
                        setInventory(false);
                        setProvider(false);
                        setFacilities(false);
                        setProduct(false);
                      }}
                    />
                  ) : (
                    <Icon
                      size={23}
                      name="plus"
                      color="#009688"
                      onPress={() => {
                        setAppoinment(!appoinment);
                        setInventory(false);
                        setProvider(false);
                        setFacilities(false);
                        setProduct(false);
                      }}
                    />
                  )}
                </View>

                {appoinment ? (
                  <View
                    style={{
                      minheight: 600,
                      backgroundColor: '#FFF',
                      padding: 25,
                    }}>
                    <Text
                      style={{
                        fontWeight: '400',
                      }}>
                      Appointments Revenues
                    </Text>
                    {AppointmentsDetails &&
                      AppointmentsDetails.map(ele => {
                        return (
                          <View
                            style={{
                              backgroundColor: '#009688',
                              marginTop: 10,
                              padding: 15,
                              borderRadius: 5,
                            }}>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: '500',
                              }}>
                              {' '}
                              Povider : Mohmmad
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: '500',
                              }}>
                              {' '}
                              counsumer : Mohmmad
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: '500',
                              }}>
                              {' '}
                              Total : {ele.Total} JD
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: '500',
                              }}>
                              {' '}
                              Last Paid : {ele.Paid_total} JD
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: '500',
                              }}>
                              {' '}
                              Payment Method : {ele.paymentMethod}
                            </Text>
                          </View>
                        );
                      })}
                  </View>
                ) : null}
                <View
                  style={{
                    marginTop: 20,
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                    justifyContent: 'space-between',
                    borderWidth: 0.5,
                    borderColor: '#000',
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      fontWeight: 'bold',
                      marginBottom: 10,
                      marginTop: 10,
                    }}>
                    Products
                    {'\n'}
                    {productRevenuse &&
                      productRevenuse.map(ele => {
                        return (
                          <View>
                            <Text style={{fontWeight: 'bold'}}>
                              {ele.paid_total}
                               JD
                            </Text>
                          </View>
                        );
                      })}
                  </Text>

                  {product ? (
                    <Icon
                      size={23}
                      name="minus"
                      color="#009688"
                      onPress={() => {
                        setProduct(!product);
                        setAppoinment(false);
                        setInventory(false);
                        setProvider(false);
                        setFacilities(false);
                      }}
                    />
                  ) : (
                    <Icon
                      size={23}
                      name="plus"
                      color="#009688"
                      onPress={() => {
                        setProduct(!product);
                        setAppoinment(false);
                        setInventory(false);
                        setProvider(false);
                        setFacilities(false);
                      }}
                    />
                  )}
                </View>
                {product ? (
                  <View
                    style={{
                      minheight: 200,
                      backgroundColor: '#FFF',
                      padding: 25,
                    }}>
                    <Text
                      style={{
                        fontWeight: '400',
                      }}>
                      Products Revenues
                    </Text>
                    {ProductsDetails &&
                      ProductsDetails.map(ele => {
                        return (
                          <View
                            style={{
                              backgroundColor: '#009688',
                              marginTop: 10,
                              padding: 15,
                              borderRadius: 5,
                            }}>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: '500',
                              }}>
                              {' '}
                              counsumer : Mohmmad
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: '500',
                              }}>
                              {' '}
                              Total : {ele.total} JD
                            </Text>
                            <Text
                              style={{
                                color: '#FFF',
                                fontSize: 12,
                                fontWeight: '500',
                              }}>
                              {' '}
                              Last Paid : {ele.paid_total} JD
                            </Text>
                          </View>
                        );
                      })}
                  </View>
                ) : null}
                {/* End Expenses */}
              </View>
            </View>
          ) : null}
          {/*  ------------------------------------------------------- */}
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              View List of Service Profit Breakdown
            </Text>
            {togle3 ? (
              <Icon
                size={30}
                name="minus"
                color="#009688"
                onPress={() => {
                  setTogle(false);
                  setTogle2(false);
                  setTogle3(!togle3);
                  setminus(false);
                }}
              />
            ) : (
              <Icon
                size={30}
                name="plus"
                color="#009688"
                onPress={() => {
                  setTogle(false);
                  setTogle2(false);
                  setTogle3(!togle3);
                }}
              />
            )}
            {/* <Icon
            size={30}
            name="plus"
            color="#009688"
            onPress={() => {
              setTogle(false);
              setTogle2(false);
              setTogle3(!togle3);
            }}
          /> */}
          </View>
          {togle3 ? (
            <View style={{height: 200, backgroundColor: '#009688'}}></View>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewCashRegistry: {
    marginTop: 15,
    backgroundColor: '#D8F0E7',
    padding: 15,
    width: '100%',
    borderRadius: 5,
  },
  filter: {
    color: 'green',
  },
});

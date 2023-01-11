import { Center, Text } from 'native-base';
import React, { useEffect } from 'react';

import { reducers } from '@mobile-nx-apps/auth-store';
import { useDispatch, useSelector } from 'react-redux';
import DashboardIcons from './Features/Feature1/Components/DashboardIcons';
// const { requestBuilder } = require('./requestBuilder');

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const signIn = async (result: any) => {
  //     if (result.accessToken) {
  //       try {
  //         await dispatch(reducers.login({ user: result?.user }));
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   };
  //   signIn(auth);
  // }, []);

  // const signInAuthentication = async (result: any) => {
  //   // console.log(result?.data?.user, 'sign in user');
  //   if (result.data.accessToken) {
  //     try {
  //       await dispatch(reducers.login(result.data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const signInHandler = async () => {
  //     try {
  //       const result = await requestBuilder('ciam/user/signin', {
  //         username: 'manager@gmail.com',
  //         password: '12345Abcd',
  //         cimMtEstablishmentId:
  //           'CIM-CIE-JOR-f4a79461-1292-40a2-8a31-327210267be8',
  //         cimMtFacilityId: 'CIM-CIF-JOR-bd8e072d-1614-4e3b-93f2-7055978ec2cb',
  //         firebaseToken: 'Test-ing Firebase',
  //       });
  //       signInAuthentication(result);
  //       // console.log(result);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   signInHandler();
  // }, []);

  return (
    <Center w="100%" h="100%" justifyContent="center">
      <DashboardIcons></DashboardIcons>
    </Center>
  );
};

export default App;

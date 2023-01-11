import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './Navigation/Drawer/DrawerNavigation';

import { reducers } from '@mobile-nx-apps/auth-store';
import { useDispatch, useSelector } from 'react-redux';
import { employeeFullProfile, updateEmployeeId } from './Feature/HR/store-Hr';
const { requestBuilder } = require('./requestBuilder');
const { getEmployeeByCiamId } = require('../src/Feature/HR/util/http');
const App = ({auth}) => {
  const [employeeId, setEmployeeId] = useState('');
  const dispatch = useDispatch();
  const AuthStore = useSelector((state) => state.AuthStore);
  const Auth = useSelector((state) => state.hrStore);
  useEffect(() => {
      const signIn = async (result: any) => {

          if (result.accessToken) {
              try {
                  await dispatch(reducers.login({user:result?.user}));
              } catch (error) {
                  console.log(error);
              }
          }

      }
      signIn(auth)
  }, [])

  // const signInAuthentication = async (result: any) => {
  //   console.log(result?.data?.user, 'sign in user');
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
  //       await signInAuthentication(result);
  //       // await handleHrPage();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   signInHandler();
  // }, []);

  useEffect(() => {
    const handleHrPage = async () => {
      try {
        console.log('here the userUUId', AuthStore.user);
        const employeeData = await getEmployeeByCiamId({
          cimMtUserId: [AuthStore.user.id],
          limit: 0,
          offset: 0,
        });
        const hrId =
          (employeeData?.row?.employees[0] &&
            employeeData?.row?.employees[0].id) ||
          '';

        console.log(hrId, 'eeee');
        dispatch(updateEmployeeId(hrId));
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        hrId ? setEmployeeId(hrId) : '';
        dispatch(employeeFullProfile(employeeData?.row?.employees[0]));
        console.log('employeeId', Auth.employeeId);
        return;
      } catch (error) {
        // @ts-ignore
        console.log('error', error.message);
      }
    };
    handleHrPage();
  }, [AuthStore.user]);
  return (
    <NavigationContainer independent={true}>
      <DrawerNavigation />
    </NavigationContainer>
  );
};

export default App;

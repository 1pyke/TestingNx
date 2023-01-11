import React, { useEffect } from 'react'
import { LogBox } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from './Navigator/Drawer/DrawerNavigator';
import { StatusBar } from 'native-base';
import AuthStore, { reducers } from '@mobile-nx-apps/auth-store';
import { useDispatch, useSelector } from 'react-redux';

// import { reducers } from '@mobile-nx-apps/auth-store';
// const { requestBuilder } = require('./services/requestBuilder')

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = ({auth}) => {
    const dispatch=useDispatch()
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


    // const dispatch = useDispatch();

    // const signInAuthentication = async (result: any) => {
    //     // console.log(result?.data?.user, 'sign in user');
    //     if (result.data.accessToken) {
    //         try {
    //             await dispatch(reducers.login(result.data));
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    // }

    // useEffect(() => {
    //     const signInHandler = async () => {
    //         try {
    //             const result = await requestBuilder('ciam/user/signin', {
    //                 username: 'saleh',
    //                 password: 'saleh1234',
    //                 cimMtEstablishmentId:
    //                     'CIM-CIE-JOR-f4a79461-1292-40a2-8a31-327210267be8',
    //                 cimMtFacilityId: 'CIM-CIF-JOR-bd8e072d-1614-4e3b-93f2-7055978ec2cb',
    //                 firebaseToken: 'tastdatsdasda'
    //             });
    //             signInAuthentication(result);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     signInHandler()

    // }, [])

    return (
        <NavigationContainer independent={true}>
            <StatusBar backgroundColor={'#FFFAFA'} barStyle={'dark-content'} />
            <DrawerNavigator />
        </NavigationContainer>
    );
}
export default App

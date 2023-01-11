import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
//////////////////////Components///////////////////////////////
// import OttpModel from './CIAM/screens/OttpModel'
import DrawerNavigation from './navigation/Drawer/DrawerNavigation'
import { StatusBar } from 'native-base';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function App() {
  return (
    <NavigationContainer independent={true}>   
      {/* <MyDrawer/> */}
      <StatusBar backgroundColor={'#FFFAFA'} barStyle={'dark-content'}/>
      <DrawerNavigation/>
      </NavigationContainer>
  );
}
export default App;



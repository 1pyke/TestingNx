import React from "react";
import { Button, Modal, FormControl, IconButton, Center, NativeBaseProvider,Text } from "native-base";
import { useState } from "react";
import {settingsHandler,closeloginFlagHandler} from './store-finalLayout'
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Example = () => {
    const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const layoutSore = useSelector(state => state.finalLayoutStore);
  const dispatch = useDispatch();

  function logoutHandler() {
    dispatch(closeloginFlagHandler())
    dispatch(settingsHandler())
    navigation.navigate('SignIn')
  }

  return <Center>
   
      <Modal isOpen={layoutSore.settingsFlag} onClose={() =>dispatch(settingsHandler())}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Settings</Modal.Header>
          <Modal.Body>
           <Text>Are you sure you want to log out ?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
             dispatch(settingsHandler())
            }}>
                Cancel
              </Button>
              <Button style={{width:85}} onPress={() => 
                  logoutHandler()
          
            }>
          <Icon style={{ color: "white"}}   name="external-link" _dark={{
         
        }} ><Text style={{ color: "white"}} >Logout</Text></Icon>
                
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example  />
            </Center>
          </NativeBaseProvider>
        );
    };
    
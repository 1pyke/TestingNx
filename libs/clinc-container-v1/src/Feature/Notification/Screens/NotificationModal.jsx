import React from "react";
import {  Actionsheet,  Center, NativeBaseProvider } from "native-base";
import { useDispatch, useSelector } from 'react-redux';
import {onOpen,onClose} from '../store-notification'
import Icon from '@expo/vector-icons/Ionicons';

function Example() {
  const storeNotification = useSelector(state => state.notification);
  const dispatch = useDispatch();
  return <Center>
      <Actionsheet isOpen={storeNotification.modalFlag} onClose={()=>(dispatch(onClose()))} size="full">
        <Actionsheet.Content>
          
          <Actionsheet.Item startIcon={<Icon  name="trash-sharp" />}>
            Delete
          </Actionsheet.Item>
          <Actionsheet.Item startIcon={<Icon  name="ios-share-social-outline"/>}>
            Share
          </Actionsheet.Item>
          <Actionsheet.Item startIcon={<Icon  name="play-circle"  />}>
            Play
          </Actionsheet.Item>
          <Actionsheet.Item startIcon={<Icon  name="md-star-outline" />}>
            Favourite
          </Actionsheet.Item> 
        </Actionsheet.Content>
      </Actionsheet>
    </Center>;
}

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Example />
            </Center>
          </NativeBaseProvider>
        );
    };
    
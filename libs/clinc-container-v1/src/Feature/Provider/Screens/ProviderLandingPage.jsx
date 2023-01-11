import * as React from 'react';
import { View, Text,Button } from 'react-native';
import {useDispatch,useSelector} from 'react-redux'
import {increment} from '../store-provider'
function ProviderLandingPage() {
  const providerStore=useSelector(state=>state.provider)
  const dispatch=useDispatch()
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{fontSize:40}}>Provider</Text>
        <Text style={{fontSize:20}}>start Development Here</Text>
        <Button title="plus 5 using redux" onPress={()=>{dispatch(increment(5))}}/>
      <Text style={{fontSize:50,marginTop:80}}>{providerStore.value}</Text>
       
      </View>
    );
  }
  export default ProviderLandingPage
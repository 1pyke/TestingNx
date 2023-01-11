import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
} from 'react-native';



export default function Splash({ navigation }) {

    useEffect(() => {
       
        setTimeout(() => {
            navigation.replace('SignIn');
        }, 3500);
    }, []);



    return (
        <View style={styles.body} >
            {/* <Image
                style={styles.logo}
                source={require('../../assets/123.png')}
            /> */}
            <Text
                style={[
                   
                    styles.text
                ]}
            >
               Created by Agents On Cloud 
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#005555',
    },
    logo: {
        width: 200,
        height: 200,
        borderRadius:100,
        margin: 20,

    },
    text: {
        fontSize: 30,
        color: '#ffffff',
        textAlign:'center'
    },
})
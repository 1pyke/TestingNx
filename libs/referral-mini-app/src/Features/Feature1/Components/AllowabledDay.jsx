import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Center, Text } from 'native-base'

const AllowabledDay = ({ day, allowed }) => {
  return (
    <Center size="30px" mx={1} style={allowed ? styles.allowed : styles.unAlowed}>
      <Text color={"#194569"}>{day.abbreviation.en[0]}</Text>
    </Center>
  )
}

export default AllowabledDay;

const styles = StyleSheet.create({
  allowed: {
    width: 30,
    height: 50,
    borderRadius: 10,
    borderColor: '#194569',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#CADEED',
    fontWeight: 'bold',
  },
  unAlowed: {
    width: 30,
    height: 50,
    borderRadius: 10,
    borderColor: '#194569',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: 'white',
    fontWeight: 'bold',
  }
})
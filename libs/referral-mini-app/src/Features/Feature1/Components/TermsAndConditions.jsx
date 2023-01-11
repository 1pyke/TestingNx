import { Platform, StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { Actionsheet, Text, Box } from 'native-base';
import HTML from 'react-native-render-html';
import { laserAvenue } from '../../../Constants/index';
const TermsAndConditions = ({ isOpen, onClose, termsAndConditions }) => {
  const contentWidth = useWindowDimensions().width;
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} disableOverlay={Platform.OS === 'ios' ? false : true}>
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text fontSize={Platform.OS === 'ios' ? 'xl' : 'md'} width={'100%'} color={laserAvenue.blue1} bold _dark={{
            color: "gray.300"
          }}>
            Terms and Conditions
          </Text>
        </Box>
        <HTML source={{ html: termsAndConditions }} contentWidth={contentWidth} />
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export default TermsAndConditions;

const styles = StyleSheet.create({})
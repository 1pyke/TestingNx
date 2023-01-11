import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
const FormInput = ({ label, textInputConfig, style }) => {
  return (
    <View style={[styles.InputContainer, style]}>
      {/* <Text style={styles.label}>{label}</Text> */}
      <TextInput {...textInputConfig} style={styles.input} />
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    // backgroundColor: GlobalStyles.colors.primary100,
    // color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
export default FormInput;

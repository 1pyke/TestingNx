import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';

const Title = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
export default Title;

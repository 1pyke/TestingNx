import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Checkbox } from 'native-base';
import React, { useState } from 'react';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const ExpandComponent = ({
  data,
  employeesGroupValues,
  handleCallbackEmployees,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const toggleExpand = () => {
    setIsSelected(!isSelected);
  };
  const renderDetails = () => {
    return (
      <Checkbox.Group
        value={employeesGroupValues}
        onChange={(value) => {
          handleCallbackEmployees(value);
        }}
        accessibilityLabel="choose numbers"
      >
        {data.employees.map((el) => {
          return (
            <Checkbox value={el} my={3}>
              {el.name.en}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleExpand}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Employees</Text>
          <Icon style={styles.icon} name="menu-down" />
        </View>
      </TouchableWithoutFeedback>
      {isSelected && renderDetails()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  description: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});

export default ExpandComponent;

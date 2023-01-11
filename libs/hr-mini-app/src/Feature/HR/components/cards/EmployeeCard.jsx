import React, { useEffect, useState } from 'react';
import Card from '../shared/Card';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '../../store-Hr';
import { StyleSheet, ScrollView, View, FlatList } from 'react-native';

import { Pressable, Text, Box, Button, Avatar } from 'native-base';
import { useNavigation } from '@react-navigation/native';
const EmployeeCard = () => {
  const dispatch = useDispatch();
  const hrStore = useSelector((state) => state.hrStore);
  const [allEmployeesData, setAllEmployeesData] = useState();
  const navigation = useNavigation();
  useEffect(() => {
    if (hrStore.employeesLoading == false) {
      setAllEmployeesData(hrStore.employeesData);
    } else {
      dispatch(getAllEmployees({ employeeUuid: null }));
    }
  }, [hrStore.employeesLoading]);
  const goEmployeeHr = (item) => {
    navigation.navigate('MyHr', {
      employeeUuid: item,
      role: 'not employee',
    });
  };
  const renderEmployeesCards = (itemData) => {
    return (
      <View style={styles.gridItem}>
        <Pressable
          style={styles.Btn}
          android_ripple={{ color: '#ccc' }}
          onPress={() => goEmployeeHr(itemData.item.uuid)}
        >
          <View style={styles.innerContainer}>
            <Avatar
              style={{ marginTop: 20 }}
              bg="pink.600"
              size="xl"
              source={{
                uri: itemData.item.profileImg,
              }}
            >
              {itemData.item.profileImg}
            </Avatar>
            <Box alignItems="center" mt={4}>
              {itemData.item.RoleId === 1 || itemData.item.RoleId === 2 ? (
                <Text style={styles.headerText}>
                  Dr.{itemData.item.firstName}
                </Text>
              ) : (
                <Text style={styles.headerText}>{itemData.item.firstName}</Text>
              )}{' '}
            </Box>
          </View>
        </Pressable>
        {/* </Card> */}
      </View>
    );
  };
  const handleTimeAttendanceBtn = () => {
    navigation.navigate('AllTimeAttendanceHistory');
  };
  return (
    <>
      <Button onPress={handleTimeAttendanceBtn}>View History</Button>
      <FlatList
        data={allEmployeesData}
        keyExtractor={(item) => item.id}
        renderItem={renderEmployeesCards}
        numColumns={2}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  Btn: {
    flex: 1,
  },
  gridItem: {
    flex: 1,
    margin: 20,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmployeeCard;

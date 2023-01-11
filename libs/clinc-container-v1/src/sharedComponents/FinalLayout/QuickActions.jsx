import React, { useRef, useEffect } from 'react';
import { Box, IconButton, PresenceTransition, } from 'native-base';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { View, StyleSheet, Animated, Platform } from 'react-native';

function QuickActions({ShowQuickActionProp , setShowQuickAction}) {
  const layoutSore = useSelector((state) => state.finalLayoutStore);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const labelsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(labelsOpacity, {
      toValue: 1,
      duration: 100,
    }).start();
  }, [ShowQuickActionProp]);

  return (
    <Box
      alignItems="center"
      style={{
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 140 : 100,
        right: 20,
        zIndex: ShowQuickActionProp ? 10 : 0,
      }}
    >
      <PresenceTransition
        visible={ShowQuickActionProp}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 200,
          },
        }}
      >
        <View style={styles.quickActions}>
          <IconButton
            onPress={() => {
              navigation.navigate('HrProvider');
              setShowQuickAction(!ShowQuickActionProp)
            }}
            w="50"
            h="50"
            mb="4"
            variant="solid"
            bg="indigo.500"
            colorScheme="indigo"
            borderRadius="full"
            icon={
              <Icon
                name="account-multiple-check"
                style={{ fontSize: 30 }}
                color="warmGray.50"
              />
            }
          />
          <Animated.Text
            style={[styles.actionsLabels, { opacity: labelsOpacity }]}
          >
            Check In
          </Animated.Text>
        </View>
        <View style={styles.quickActions}>
          <IconButton
            onPress={() => {
              navigation.navigate('createTask');
              setShowQuickAction(!ShowQuickActionProp)
            }}
            w="50"
            h="50"
            mb="4"
            variant="solid"
            bg="yellow.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                style={{ fontSize: 30 }}
                name="table-large-plus"
                color="warmGray.50"
              />
            }
          />
          <Animated.Text
            style={[styles.actionsLabels, { opacity: labelsOpacity }]}
          >
            Create Task
          </Animated.Text>
        </View>

        <View style={styles.quickActions}>
          <IconButton
            onPress={() => {
              navigation.navigate('calendar');
              setShowQuickAction(!ShowQuickActionProp)
            }}
            w="50"
            h="50"
            mb="4"
            variant="solid"
            bg="red.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                style={{ fontSize: 30 }}
                name="calendar-plus"
                color="warmGray.50"
              />
            }
          />
          <Animated.Text
            style={[styles.actionsLabels, { opacity: labelsOpacity }]}
          >
            Calender
          </Animated.Text>
        </View>

        <View style={styles.quickActions}>
          <IconButton
            onPress={() => {
              navigation.navigate('CreateNotification');
              setShowQuickAction(!ShowQuickActionProp)
            }}
            w="50"
            h="50"
            mb="4"
            variant="solid"
            bg="orange.400"
            colorScheme="yellow"
            borderRadius="full"
            icon={
              <Icon
                style={{ fontSize: 30 }}
                name="bell-plus"
                color="warmGray.50"
              />
            }
          />
          <Animated.Text
            style={[styles.actionsLabels, { opacity: labelsOpacity }]}
          >
            Create Notification
          </Animated.Text>
        </View>
      </PresenceTransition>
    </Box>
  );
}
const styles = StyleSheet.create({
  quickActions: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  actionsLabels: {
    padding: '2%',
    paddingHorizontal: '3%',
    marginBottom: '5%',
    backgroundColor: 'lightgray',
    borderRadius: 50,
  },
});

export default QuickActions;

import React, { useState, useEffect, useRef } from 'react';
import { Box, IconButton, PresenceTransition } from 'native-base';
import { View, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import Icon from '@expo/vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const HrQuickActions = ({
  hrIsQuickActionsOpen,
  setHrIsQuickActionsOpen,
  allMissingPunchData,
}) => {
  const labelsOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(labelsOpacity, {
      toValue: 1,
      duration: 10,
      delay: 10,
      useNativeDriver: false,
    }).start();
  }, [hrIsQuickActionsOpen]);

  /////////////////////////////////////////////

  return (
    <Box
      alignItems="center"
      style={{
        position: 'absolute',
        top: 80,
        right: 20,
        zIndex: hrIsQuickActionsOpen ? 10 : 0,
      }}
    >
      {/* <DisplayAllMissingPunchRequests
        showAllMissingPunchRequests={showAllMissingPunchRequests}
        setShowAllMissingPunchRequests={setShowAllMissingPunchRequests}
        allMissingPunchData={allMissingPunchData}
      /> */}
      <PresenceTransition
        visible={hrIsQuickActionsOpen}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 150,
          },
        }}
      >
        <View style={styles.quickActions}>
          <IconButton
            // onPress={checkInHandler}
            w="50"
            h="50"
            mb="4"
            variant="solid"
            bg="#4DB6AC"
            // colorScheme={checkInFlag ? 'red' : 'green'}
            borderRadius="full"
            icon={
              <Ionicons
                style={{ fontSize: 30 }}
                name="enter-outline"
                color="white"
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
            // onPress={checkOutHandler}
            w="50"
            h="50"
            mb="4"
            variant="solid"
            bg="#4DB6AC"
            // colorScheme={checkOutFlag ? 'red' : 'green'}
            borderRadius="full"
            icon={
              <Ionicons
                style={{ fontSize: 30 }}
                name="exit-outline"
                color="white"
              />
            }
          />
          <Animated.Text
            style={[styles.actionsLabels, { opacity: labelsOpacity }]}
          >
            Check Out
          </Animated.Text>
        </View>
      </PresenceTransition>
    </Box>
  );
};
const styles = StyleSheet.create({
  quickActions: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  actionsLabels: {
    padding: '1%',
    paddingHorizontal: '3%',
    marginBottom: '5%',
    backgroundColor: 'lightgray',
    borderRadius: 50,
  },
});
export default HrQuickActions;

import React from 'react';
import { Box, Stagger } from 'native-base';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

function Collaborate() {
  const layoutSore = useSelector((state) => state.finalLayoutStore);
  const navigation = useNavigation();

  return (
    <Box
      alignItems="center"
      style={{
        position: 'absolute',
        bottom: 50,
        right: 0,
        zIndex: layoutSore.openCollaborate ? 10 : 0,
      }}
    >
      <Stagger
        visible={layoutSore.openCollaborate}
        initial={{
          opacity: 0,
          scale: 0,
          translateY: 34,
        }}
        animate={{
          translateY: 0,
          scale: 1.1,
          opacity: 1,
          transition: {
            type: 'spring',
            mass: 1,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
        exit={{
          translateY: 34,
          scale: 0.5,
          opacity: 0,
          transition: {
            duration: 100,
            stagger: {
              offset: 30,
              reverse: true,
            },
          },
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Test')}
          style={styles.collaborateBtns}
        >
          <Text>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TasksLandingPage')}
          style={styles.collaborateBtns}
        >
          <Text>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.collaborateBtns}>
          <Text>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.collaborateBtns}>
          <Text>Incidents</Text>
        </TouchableOpacity>
      </Stagger>
    </Box>
  );
}

const styles = StyleSheet.create({
  collaborateBtns: {
    width: 100,
    height: 50,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Collaborate;

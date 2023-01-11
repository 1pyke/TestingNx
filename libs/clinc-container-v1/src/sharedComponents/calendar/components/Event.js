import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import * as Calendar from 'expo-calendar';
import { Entypo } from '@expo/vector-icons';

export default function Event({
  event,
  setshowEditEvent,
  setEditTargetEvent,
  deleteEvent,
}) {
  const [showdots, setshowdots] = useState(false);

  return (
    <View style={{ position: 'relative' }}>
      <View style={style.event}>
        {console.log(event)}
        <Pressable>
          <Text
            style={{
              fontSize: 18,
              marginBottom: 9,
              alignSelf: 'flex-start',
            }}
            onPress={() => Calendar.openEventInCalendar(event.id)}
          >
            {event.title}
          </Text>
          <Entypo
            name="dots-three-vertical"
            size={18}
            color="black"
            style={{
              position: 'absolute',
              top: 3,
              right: 0,
            }}
            onPress={() => setshowdots(!showdots)}
          />
        </Pressable>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            zIndex: -1,
          }}
        >
          <Text style>
            Start Date:{' '}
            {new Date(event.startDate)
              [Symbol.toPrimitive]('string')
              .slice(0, 11)}{' '}
            {new Date(event.startDate)
              [Symbol.toPrimitive]('string')
              .slice(16, 21)}
          </Text>
          <Text style>
            End Date:{' '}
            {new Date(event.startDate)
              [Symbol.toPrimitive]('string')
              .slice(0, 11)}{' '}
            {new Date(event.endDate)
              [Symbol.toPrimitive]('string')
              .slice(16, 21)}
          </Text>
        </View>
      </View>
      {showdots && (
        <View style={style.actionsMenu}>
          <View>
            <TouchableOpacity
              style={{
                padding: 4,
              }}
              onPress={() => {
                setshowEditEvent(true);
                setEditTargetEvent(event);
              }}
            >
              <Text>Edit</Text>
            </TouchableOpacity>
            <View
              style={{
                borderBottomColor: 'gray',
                borderBottomWidth: 2,
              }}
            ></View>
            <TouchableOpacity
              style={{
                padding: 4,
              }}
              onPress={() => deleteEvent(event.id)}
            >
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  event: {
    width: '95%',
    height: 70,
    padding: 6,
    paddingHorizontal: 8,
    alignSelf: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
  },
  actionsMenu: {
    width: '25%',
    position: 'absolute',
    right: '6%',
    top: '50%',
    backgroundColor: 'white',
    zIndex: 1,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

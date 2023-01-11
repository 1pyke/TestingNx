import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';

export default function Task({ task, navigation, type }) {
  const goTask = (id) => {
    console.log(id);
    navigation.navigate('TaskFullView', {
      task_id: id,
      type,
    });
  };
  function getBorderPriority(params) {
    switch (task.priority) {
      case 1:
        return 'red';
      case 2:
        return 'orange';
      case 3:
        return 'yellow';
    }
  }
  return (
    <TouchableOpacity
      style={[
        style.taskVue,
        {
          borderLeftColor: getBorderPriority(),
        },
      ]}
      onPress={() => {
        goTask(task.task_id);
      }}
    >
      {console.log(task)}
      <View style={style.task}>
        <View style={style.leftSide}>
          <Text style={[style.mrl, { fontSize: 18, fontWeight: 'bold' }]}>
            {task.subject}
          </Text>
          <Text style={style.mrl}>By: {task.creator_name}</Text>
          <View style={[style.priority, style.mrl]}>
            <Text style={{ color: 'black ' }}>Priority :</Text>
            <Text
              style={
                task.priority === 1
                  ? style.high
                  : task.priority === 2
                  ? style.meduim
                  : style.low
              }
            >
              {task.priority === 1
                ? ' High'
                : task.priority === 2
                ? ' Meduim'
                : ' Low'}
            </Text>
          </View>
        </View>
        <View style={style.rightSide}>
          <Text style={[style.mrl, style.smallText]}>
            Dead line : {task.deadline}
          </Text>
          <Text style={style.mrl}>
            Assigned To :{' '}
            {task.users.length > 0 ? task.users[0].user_name : '---'}
          </Text>

          <Text style={style.mrl}>status : {task.status}</Text>
          <Text style={[style.mrl, style.smallText]}>
            Created : {task.created}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  taskVue: {
    marginTop: 15,
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    borderLeftWidth: 5,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftSide: {
    width: '50%',
  },
  rightSide: {
    width: '50%',
  },
  priority: {
    flexDirection: 'row',
  },
  mrl: {
    marginVertical: 7,
    color: 'black',
  },
  smallText: {
    fontSize: 12,
    color: 'black',
  },
  high: {
    color: '#ff5252',
  },
  meduim: {
    color: '#fb8c00',
  },
  low: {
    color: '#4caf50',
  },
});

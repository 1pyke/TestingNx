import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import Comment from './Comment';
import axios from 'axios';

export default function Comments({
  navigation,
  id,
  type,
  taskCreator,
  userId,
  userName,
}) {
  const [comments, setComments] = useState([]);
  const [str, setStr] = useState('');
  useEffect(() => {
    if (id) {
      getComments();
    }
    async function getComments() {
      try {
        // const res = await axios.get(
        //   `http://10.0.2.2:30122/comments/task/${id}/${type}`
        // );
        const res = await axios({
          method: 'POST',
          url: 'https://api.development.agentsoncloud.com/external/public/',
          headers: {
            'requsted-service': 'communities',
            'requsted-path': '/comments/task/:id/:type',
            'requsted-method': 'get',
          },
          data: {
            id: id,
            type: type,
          },
        });
        if (res.status) {
          setComments(res.data);
        }
      } catch (error) {
        console.log('error');
      }
    }
  }, [id]);

  const handleInput = (text) => {
    setStr(text);
  };

  const addComment = async () => {
    try {
      // const response = await axios.post(
      //   `http://10.0.2.2:30122/comments/addComment`,
      //   {
      //     task_id: id,
      //     user_id: userId,
      //     user_name: userName,
      //     comment: str,
      //     type: type,
      //   }
      // );
      const response = await axios({
        method: 'POST',
        url: 'https://api.development.agentsoncloud.com/external/public/',
        headers: {
          'requsted-service': 'communities',
          'requsted-path': '/comments/addComment',
          'requsted-method': 'post',
        },
        data: {
          task_id: id,
          user_id: userId,
          user_name: userName,
          comment: str,
          type: type,
        },
      });
      if (response.status) {
        setStr('');
        setComments([...comments, response.data]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={style.container}>
      <Text
        style={{ fontSize: 18, color: 'black', margin: 4, paddingVertical: 15 }}
      >
        Comments :
      </Text>
      <View
        style={{
          alignItems: 'center',
          borderBottomWidth: 2,
          borderColor: '#eee',
        }}
      >
        <View style={{ width: '70%', backgroundColor: 'rgb(245, 245, 245)' }}>
          <TextInput
            onChangeText={handleInput}
            value={str}
            placeholder="Enter your comment here"
          />
        </View>
        <TouchableOpacity style={style.add_comment_btn} onPress={addComment}>
          <View>
            <Text style={style.add_comment_text}>Add comment</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={comments}
        renderItem={({ item, index }) => {
          return (
            <Comment
              comment={item}
              comments={comments}
              setComments={setComments}
              taskCreator={taskCreator}
              userId={userId}
              userName={userName}
            />
          );
        }}
        keyExtractor={(item) => item.comment.id}
      />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    minHeight: 140,
    backgroundColor: 'white',
  },
  add_comment_btn: {
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 40,
    paddingLeft: 40,
    backgroundColor: '#2A416A',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2A416A',
  },
  add_comment_text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});

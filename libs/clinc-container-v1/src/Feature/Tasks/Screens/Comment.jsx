import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import CommentReplay from './CommentReplay';

export default function Comment({
  comment,
  comments,
  setComments,
  taskCreator,
  userId,
  userName,
}) {
  const [updateText, setUpdateText] = useState(false);
  const [str, setStr] = useState('');
  const [showReplay, setShowReplay] = useState(false);
  const [replayText, setReplayText] = useState('');
  const [replayPage, setReplayPage] = useState(1);
  const [replayComments, setreplayComments] = useState([]);
  const [maxReplayPage, setMaxReplayPage] = useState(1);

  useEffect(() => {
    if (comment) {
      setStr(comment.comment.comment);
      setreplayComments(comment.replays.slice(0, (replayPage - 1) * 3 + 3));
      const n = Math.ceil(comment.replays.length / 3);
      setMaxReplayPage(n);
    }
  }, [comment, comments]);

  useEffect(() => {
    setreplayComments(comment.replays.slice(0, (replayPage - 1) * 3 + 3));
  }, [replayPage]);

  const handleInput = (text) => {
    setStr(text);
  };

  /* -------------------------- delete comment ----------------------------------- */

  const openDialogDeleteComment = () => {
    Alert.alert('Delete this comment', `Do you want to delete this comment ?`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'Yes', onPress: deleteComment },
    ]);
  };

  const deleteComment = async () => {
    try {
      // const response = await axios.delete(
      //   `http://10.0.2.2:30122/comments/deleteComment/${comment.comment.comment_id}`
      // );
      const response = await axios({
        method: 'POST',
        url: 'https://api.development.agentsoncloud.com/external/public/',
        headers: {
          'requsted-service': 'communities',
          'requsted-path': '/comments/deleteComment/:id',
          'requsted-method': 'delete',
        },
        data: {
          id: comment.comment.comment_id,
        },
      });
      if (response.status) {
        setComments(
          comments.filter((ele) => {
            return comment.comment.comment_id !== ele.comment.comment_id;
          })
        );
      }
    } catch (error) {
      console.log('error');
    }
  };

  /* ---------------------------- update comment -------------------------------------------- */

  const updateComment = async () => {
    try {
      // const response = await axios.put(
      //   `http://10.0.2.2:30122/comments/updateComment/${comment.comment.comment_id}`,
      //   {
      //     newComment: str,
      //   }
      // );
      const response = await axios({
        method: 'POST',
        url: 'https://api.development.agentsoncloud.com/external/public/',
        headers: {
          'requsted-service': 'communities',
          'requsted-path': '/comments/updateComment/:id',
          'requsted-method': 'put',
        },
        data: {
          id: comment.comment.comment_id,
          newComment: str,
        },
      });
      if (response.status) {
        const arr = comments.map((ele, i) => {
          if (comment.comment.comment_id === ele.comment.comment_id) {
            return { ...ele, comment: { ...ele.comment, comment: str } };
          } else {
            return ele;
          }
        });
        setComments(arr);
        setUpdateText(false);
      }
    } catch (error) {
      console.log('error');
    }
  };

  /* ---------------------------- add replay -------------------------------------------- */

  const handleReplayText = (text) => {
    setReplayText(text);
  };

  const addReplay = async () => {
    try {
      // const response = await axios.post(
      //   `http://10.0.2.2:30122/comments/addReplay`,
      //   {
      //     comment_id: comment.comment.comment_id,
      //     user_id: userId,
      //     user_name: userName,
      //     comment: replayText,
      //   },
      // );
      const response = await axios({
        method: 'POST',
        url: 'https://api.development.agentsoncloud.com/external/public/',
        headers: {
          'requsted-service': 'communities',
          'requsted-path': '/comments/addReplay',
          'requsted-method': 'post',
        },
        data: {
          comment_id: comment.comment.comment_id,
          user_id: userId,
          user_name: userName,
          comment: replayText,
        },
      });
      if (response.status) {
        setReplayText('');
        const arr = comments.map((ele) => {
          if (ele.comment.comment_id === comment.comment.comment_id) {
            return { ...ele, replays: [...ele.replays, response.data] };
          } else {
            return ele;
          }
        });
        setComments(arr);
      }
    } catch (error) {
      console.log('error');
    }
  };

  /* ------------------------------------------------------------------------ */

  return (
    <View style={style.comment_cont}>
      <View style={style.comment}>
        <View
          style={{
            width: '22%',
          }}
        >
          <Image
            style={{ width: 60, height: 60, borderRadius: 30, marginTop: 5 }}
            source={{
              uri: `https://randomuser.me/api/portraits/men/10.jpg`,
            }}
          />
        </View>
        <View style={{ width: '70%' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={style.userName}> {comment.comment.user_name} </Text>
            <View style={{ flexDirection: 'row' }}>
              {userId === comment.comment.user_id ? (
                <>
                  <Icon
                    name="pencil"
                    style={{ marginRight: 15 }}
                    size={18}
                    color="#009688"
                    onPress={() => {
                      setUpdateText(!updateText);
                    }}
                  />
                  <Icon
                    name="close"
                    size={18}
                    style={{ color: 'red' }}
                    onPress={openDialogDeleteComment}
                  />
                </>
              ) : null}
            </View>
          </View>
          {!updateText ? (
            <Text style={style.text}> {comment.comment.comment} </Text>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: '70%' }}>
                <TextInput
                  onChangeText={handleInput}
                  value={str}
                  placeholder="new comment"
                />
              </View>
              <Icon
                name="check"
                size={20}
                style={{ color: 'blue' }}
                onPress={updateComment}
              />
            </View>
          )}
        </View>
      </View>
      {comment.replays.length ? (
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ width: '70%' }}>
            <Text
              style={{ color: 'blue', textTransform: 'capitalize' }}
              onPress={() => {
                setShowReplay(!showReplay);
              }}
            >
              {showReplay ? 'hide replays' : 'show replays'}
            </Text>
          </View>
        </View>
      ) : null}
      {showReplay ? (
        <View style={{ alignItems: 'center' }}>
          <View style={{ width: '75%', margin: 10, minHeight: 280 }}>
            <FlatList
              data={replayComments}
              renderItem={({ item, index }) => {
                return (
                  <CommentReplay
                    replay={item}
                    comments={comments}
                    setComments={setComments}
                    taskCreator={taskCreator}
                    userId={userId}
                  />
                );
              }}
              keyExtractor={(item) => item.replay_id}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {/* {replayPage !== 1 ? (
              <Text
                style={{margin: 10}}
                onPress={() => {
                  setReplayPage(replayPage + -1);
                }}>
                back
              </Text>
            ) : null} */}
            {/* <Text style={{margin: 10}}> {replayPage} </Text> */}
            {replayPage !== maxReplayPage ? (
              <Text
                style={{ margin: 10 }}
                onPress={() => {
                  setReplayPage(replayPage + 1);
                }}
              >
                Show more
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: '85%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View>
            <TextInput
              onChangeText={handleReplayText}
              value={replayText}
              placeholder="Enter your replay here"
            />
          </View>
          <Icon name="plus" size={22} onPress={addReplay} />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  comment_cont: {
    backgroundColor: 'white',
    // alignItems: 'center',
    minHeight: 90,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  comment: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    width: '80%',
    fontSize: 16,
    color: 'black',
  },
  text: {
    marginTop: 10,
    color: 'black',
    fontSize: 13,
  },
});

import React, { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Modal,
} from 'react-native';
import * as Calendar from 'expo-calendar';
import Icon from '@expo/vector-icons/Ionicons';

export default function EditEvent({
  EditTargetEvent,
  setshowEditEvent,
  setevents,
  events,
}) {
  const [date, setDate] = useState(new Date());
  const [due_date, setDue_date] = useState(
    new Date(EditTargetEvent.startDate).toISOString().slice(5, 7) +
      ' ' +
      new Date(EditTargetEvent.startDate).toISOString().slice(8, 10) +
      ' ' +
      new Date(EditTargetEvent.startDate).toISOString().slice(0, 4)
  );
  const [due_time, setDue_time] = useState(
    new Date(EditTargetEvent.startDate).toISOString().slice(11, 16)
  );
  const [subject, setSubject] = useState(EditTargetEvent.title);
  const [hour, setHour] = useState(
    new Date(EditTargetEvent.endDate).toISOString().slice(11, 13) >=
      new Date(EditTargetEvent.startDate).toISOString().slice(11, 13)
      ? parseInt(
          new Date(EditTargetEvent.endDate).toISOString().slice(11, 13)
        ) -
          parseInt(
            new Date(EditTargetEvent.startDate).toISOString().slice(11, 13)
          ) +
          ''
      : '00'
  );
  const [minutes, setMinutes] = useState(
    new Date(EditTargetEvent.endDate).toISOString().slice(14, 16) >=
      new Date(EditTargetEvent.startDate).toISOString().slice(14, 16)
      ? parseInt(
          new Date(EditTargetEvent.endDate).toISOString().slice(14, 16)
        ) -
          parseInt(
            new Date(EditTargetEvent.startDate).toISOString().slice(14, 16)
          ) +
          ''
      : '00'
  );

  const updateEvent = async (event) => {
    console.log(due_date, due_time, hour, minutes);

    let newEstTime = due_time.split(':');
    let newhh = parseInt(newEstTime[0]) + +hour + '';
    let newmm = parseInt(newEstTime[1]) + +minutes + '';

    console.log(
      new Date(
        +due_date.split(' ')[2],
        +due_date.split(' ')[0] - 1,
        +due_date.split(' ')[1],
        due_time.split(':')[0],
        due_time.split(':')[1]
      )
    );
    if (newhh < 25 && newmm < 61) {
      const eventIdInCalendar = await Calendar.updateEventAsync(
        EditTargetEvent.id,
        {
          title: subject,
          startDate: new Date(
            +due_date.split(' ')[2],
            +due_date.split(' ')[0] - 1,
            +due_date.split(' ')[1],
            due_time.split(':')[0],
            due_time.split(':')[1]
          ),
          endDate: new Date(
            +due_date.split(' ')[2],
            +due_date.split(' ')[0] - 1,
            +due_date.split(' ')[1],
            +newhh,
            +newmm
          ),
        }
      );
      Calendar.openEventInCalendar(eventIdInCalendar); // that will give the user the ability to access the event in phone calendar
      setevents(
        events.map((e) => {
          if (e.id == EditTargetEvent.id)
            return {
              ...e,
              id: EditTargetEvent.id,
              title: subject,
              startDate: new Date(
                +due_date.split(' ')[2],
                +due_date.split(' ')[0] - 1,
                +due_date.split(' ')[1],
                due_time.split(':')[0],
                due_time.split(':')[1]
              ),
              endDate: new Date(
                +due_date.split(' ')[2],
                +due_date.split(' ')[0] - 1,
                +due_date.split(' ')[1],
                +newhh,
                +newmm
              ),
            };
          else return e;
        })
      );
    } else {
      alert('Insert valid Estimated time');
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1 + '';
    if (month.length === 1) month = '0' + month;
    let day = currentDate.getDate() + '';
    if (day.length === 1) day = '0' + day;
    setDue_date(month + ' ' + day + ' ' + year);
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate;
    let hourS = currentDate.getHours() + '';
    if (hourS.length === 1) hourS = '0' + hourS;
    let minutes = currentDate.getMinutes() + '';
    if (minutes.length === 1) minutes = '0' + minutes;
    setDue_time(hourS + ':' + minutes);
    setDate(currentDate);
  };

  const showDate = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      minimumDate: new Date(),
    });
  };

  const showTime = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: onChangeTime,
      mode: 'time',
      is24Hour: false,
    });
  };

  const changeSubject = (str) => {
    setSubject(str);
  };

  const changeHour = (num) => {
    // if (num.length == 1) setHour('0' + num);
    setHour(num);
  };
  const changeMinutes = (num) => {
    // if (num.length == 1) setMinutes('0' + num);
    setMinutes(num);
  };

  return (
    <Modal hasBackdrop={true} backdropColor={'black'} backdropOpacity={0.3}>
      {console.log(EditTargetEvent)}
      <View style={style.container}>
        <View>
          <View>
            <Icon
              style={{ fontSize: 25, alignSelf: 'flex-end' }}
              name="close"
              onPress={() => setshowEditEvent(false)}
            />

            <View style={style.subject}>
              <Text style={style.titleText}>Subject :</Text>
              <TextInput
                style={style.subjectInput}
                placeholder="enter event subject"
                onChangeText={changeSubject}
                value={subject}
              />
            </View>
            <View style={style.due_date_con}>
              <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={style.titleText}>Due Date :</Text>
              </View>
              <View style={style.create_val}>
                <View>
                  <Text style={style.create_text_val}>
                    {' '}
                    {due_date && due_date.slice(0, 2) + ' /'}
                    {due_date && due_date.slice(3, 5) + ' /'}
                    {due_date && due_date.slice(6)}{' '}
                  </Text>
                </View>
                <Icon
                  name="calendar"
                  size={30}
                  color="#2a416a"
                  onPress={showDate}
                />
              </View>
            </View>
            <View style={style.due_date_con}>
              <View style={{ height: 50, justifyContent: 'center' }}>
                <Text style={style.titleText}>Due Time :</Text>
              </View>
              <View style={style.create_val}>
                <View>
                  <Text style={style.create_text_val}> {due_time} </Text>
                </View>
                <Icon
                  name="md-time-outline"
                  size={30}
                  color="#2a416a"
                  onPress={showTime}
                />
              </View>
            </View>
            <View>
              <View style={style.estimated_time_con}>
                <Text style={style.estimated_timeText}>Estimated time :</Text>
                <View style={style.estimated_time}>
                  <TextInput
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="HH"
                    style={{ width: '45%' }}
                    value={hour}
                    onChangeText={changeHour}
                  />
                  <TextInput
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="MM"
                    style={{ width: '45%' }}
                    value={minutes}
                    onChangeText={changeMinutes}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={style.Add_button_con}>
            <TouchableHighlight style={style.button} onPress={updateEvent}>
              <Text style={style.textStyle}>Update Event</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleText: {
    width: 90,
    fontSize: 15,
    color: '#2a416a',
  },
  subject: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  subjectInput: {
    width: '70%',
    height: 40,
    margin: 12,
    // borderWidth: 1,
    padding: 10,
  },
  due_date_con: {
    marginTop: 15,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  create_val: {
    width: '70%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  create_text_val: {
    width: 130,
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  button: {
    width: '90%',
    backgroundColor: '#009688',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#009688',
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  Add_button_con: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
  estimated_time_con: {
    marginTop: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 13,
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  estimated_time: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  estimated_timeText: {
    width: '35%',
    fontSize: 15,
    color: '#2a416a',
  },
});

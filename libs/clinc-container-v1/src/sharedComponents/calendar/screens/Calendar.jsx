import React, { useState, useEffect, useRef } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TextInput,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import * as Calendar from 'expo-calendar';
import { useFocusEffect } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Ionicons';
import EditEvent from '../components/EditEvent';
import Event from '../components/Event';

export default function App() {
  const [calendar, setcalendar] = useState({});
  const [targetCalendar, settargetCalendar] = useState({});
  const [EventIdInCalendar, setEventIdInCalendar] = useState();
  const [date, setDate] = useState(new Date());
  const [due_date, setDue_date] = useState('');
  const [due_time, setDue_time] = useState('');
  const [subject, setSubject] = useState('');
  const [hour, setHour] = useState('');
  const [minutes, setMinutes] = useState('');
  const [events, setevents] = useState([]);
  const [showAddEvent, setshowAddEvent] = useState(false);
  const [showEditEvent, setshowEditEvent] = useState(false);
  const [EditTargetEvent, setEditTargetEvent] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      const calenderHandler = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
          await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT).then(
            (calendars) => {
              let target;
              target = calendars.filter(
                (calendar) => calendar.title === 'laser avenue events'
              );
              setcalendar(calendars);
              settargetCalendar(target[0]);
              if (target.length === 0) {
                const defaultCalendarSource =
                  Platform.OS === 'ios'
                    ? getDefaultCalendarSource()
                    : { isLocalAccount: true, name: 'Expo Calendar' };

                const newCalendarID = Calendar.createCalendarAsync({
                  title: 'laser avenue events',
                  color: 'blue',
                  entityType: Calendar.EntityTypes.EVENT,
                  sourceId: defaultCalendarSource.id,
                  source: defaultCalendarSource,
                  name: 'laser avenue',
                  ownerAccount: 'personal',
                  accessLevel: Calendar.CalendarAccessLevel.OWNER,
                }).then((newCalendarID) => {
                  console.log(`Your new calendar ID is: ${newCalendarID}`);
                  settargetCalendar({ id: newCalendarID });
                });
              }
            }
          );
        }
      };
      calenderHandler();
    }, [])
  );

  useEffect(() => {
    let id =
      calendar && calendar.length > 0
        ? calendar
            .filter((calendar) => calendar.title === 'laser avenue events')
            .map((cal) => cal.id)
        : targetCalendar.id;

    getCalendarEvents(id);
  }, [calendar, targetCalendar]);

  const getCalendarEvents = async (id) => {
    await Calendar.getEventsAsync(
      id,
      new Date(new Date().setDate(new Date().getDate() - 14)),
      new Date(new Date().setDate(new Date().getDate() + 14))
    ).then((eventz) => setevents(eventz));
  };

  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }

  async function createEvent() {
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
      console.log(targetCalendar);

      const eventIdInCalendar = await Calendar.createEventAsync(
        targetCalendar.id,
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
      setEventIdInCalendar(eventIdInCalendar);
      setevents([
        ...events,
        {
          id: eventIdInCalendar,
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
        },
      ]);
    } else {
      alert('Insert valid Estimated time');
    }
  }

  const deleteEvent = async (id) => {
    await Calendar.deleteEventAsync(id).then(() =>
      setevents(events.filter((e) => e.id !== id))
    );
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={style.container}>
          <View>
            {!showAddEvent && (
              <TouchableOpacity
                style={[style.button, { alignSelf: 'center' }]}
                onPress={() => setshowAddEvent(true)}
              >
                <Icon
                  name="add-circle"
                  size={24}
                  color="black"
                  style={{ alignSelf: 'center' }}
                />
                <Text style={style.textStyle}>Add New Event</Text>
              </TouchableOpacity>
            )}
            {showAddEvent && (
              <View>
                <Icon
                  style={{ fontSize: 25, alignSelf: 'flex-end' }}
                  name="close"
                  onPress={() => setshowAddEvent(false)}
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
                    <Text style={style.estimated_timeText}>
                      Estimated time :
                    </Text>
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
            )}
            {showAddEvent && (
              <View style={style.Add_button_con}>
                <TouchableHighlight style={style.button} onPress={createEvent}>
                  <Text style={style.textStyle}>Add New Event</Text>
                </TouchableHighlight>
              </View>
            )}
          </View>
        </View>
        <View style={style.eventsContainer}>
          {events && events.length > 0 ? (
            events.map((event) => (
              <Event
                event={event}
                setshowEditEvent={setshowEditEvent}
                setEditTargetEvent={setEditTargetEvent}
                deleteEvent={deleteEvent}
              />
            ))
          ) : (
            <Text> No Events Found</Text>
          )}
        </View>
      </ScrollView>
      {showEditEvent && (
        <EditEvent
          EditTargetEvent={EditTargetEvent}
          setshowEditEvent={setshowEditEvent}
          setevents={setevents}
          events={events}
        />
      )}
    </View>
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

  eventsContainer: {
    width: '100%',
    marginBottom: 120,
  },
});

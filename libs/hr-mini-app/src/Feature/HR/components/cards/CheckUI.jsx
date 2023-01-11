import React from 'react';
import { HStack, Text, VStack, Heading, Center, Box } from 'native-base';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import requestBuilder from '../../../../requestBuilder';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFormattedDate } from '../../util/dateFormatting';
function CheckinOut({ employeeUuid }) {
  const hrStore = useSelector((state) => state.hrStore);

  const [isCheckedin, setIsCheckedIn] = useState(false);
  const [isCheckedout, setIsCheckedout] = useState(false);
  const [checkinTime, setCheckinTime] = useState('');
  const [checkoutTime, setCheckoutTime] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      isCheckedInHandler();
    }, [hrStore.CheckStatus])
  );

  async function isCheckedInHandler() {
    try {
      const data = await axios(
        requestBuilder('hr', '/getAllTimeAttendance', 'post', {
          providerUuid: employeeUuid,
          date: getFormattedDate(new Date()),
        })
      );
      const json = data.data;

      if (json.length === 0) {
        setIsCheckedIn(false);
        setIsCheckedout(false);
      } else {
        if (json[0].checkOut == null) {
          setIsCheckedIn(true);
          setCheckinTime(json[0].checkIn);
          setIsCheckedout(false);
        } else {
          setIsCheckedIn(true);
          setCheckinTime(json[0].checkIn);

          setIsCheckedout(true);
          setCheckoutTime(json[json.length - 1].checkOut);
        }
      }
      //   setEmployeeData(json[0]);
      //   setRequestComponentStatus(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // <>
    <View
      style={{
        height: 100,
        backgroundColor: 'rgba(255,255,255,0.8)',
        width: '90%',
        marginLeft: '5%',
        borderRadius: 10,
      }}
    >
      <Center style={{ height: '100%', width: '100%' }}>
        <HStack space={10}>
          <VStack>
            <Box
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'black',
                padding: 2,
                width: 150,
                shadowColor: 'black',
                shadowOpacity: 0.25,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 8,
              }}
            >
              <Center>
                <Text
                  style={{ fontSize: 16, fontWeight: '600', color: '#009688' }}
                >
                  Check In
                </Text>
                {isCheckedin == false && (
                  <Text
                    style={{
                      marginTop: 15,
                      color: '#009688',
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    ---
                  </Text>
                )}
                {isCheckedin && (
                  <Text style={{ marginTop: 15 }}>{checkinTime}</Text>
                )}
              </Center>
            </Box>
          </VStack>

          <VStack>
            <Box
              style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'black',
                padding: 2,
                width: 150,
                shadowColor: 'black',
                shadowOpacity: 0.25,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 8,
              }}
            >
              <Center>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'red' }}>
                  Check out
                </Text>
                {isCheckedout == false && (
                  <Text
                    style={{
                      marginTop: 15,
                      color: 'red',
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    ---
                  </Text>
                )}
                {isCheckedout && (
                  <Text style={{ marginTop: 15 }}>{checkoutTime}</Text>
                )}
              </Center>
            </Box>
          </VStack>
        </HStack>
      </Center>
    </View>
    // </>
  );
}

export default CheckinOut;

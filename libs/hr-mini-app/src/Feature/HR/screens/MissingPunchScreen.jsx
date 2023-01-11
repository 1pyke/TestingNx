import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MissingPunchForEmployee from '../components/cards/MissingPunchForEmployee';
import MissingPunchRequestModal from '../components/modals/MissingPunchRequestModal';
import NewMissingPunchRequestModal from '../components/refactor/modals/NewMissingPunchRequestModal';
import requestBuilder from '../../../requestBuilder';
import axios from 'axios';
import { getTimeAttendanceDataService } from '../util/http';
const MissingPunchScreen = () => {
  const [showMissingPunchDialog, setShowMissingPunchDialog] = useState(false);
  const [timeAttendanceData2, setTimeAttendanceData2] = useState();
  const [employeeData, setEmployeeData] = useState([]);

  //////////////////////////////
  ///use effect functions
  // useEffect(() => {
  //   try {
  //     let response = async () => {
  //       const data = await axios(
  //         requestBuilder('hr', '/getAllEmployees', 'post', {
  //           uuid: 'c843d756-84a6-4643-95ba-0e6620dc6202',
  //         })
  //       );
  //       const json = data.data;
  //       setEmployeeData(json[0]);
  //       // setRequestComponentStatus(true);
  //       return json;
  //     };
  //     response();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  ////////////////////////////
  useFocusEffect(
    React.useCallback(() => {
      try {
        let response = async () => {
          const json = await getTimeAttendanceDataService({
            limit: 0,
            offset: 0,
            arrayId: ['HRS-HRP-JOR-c89d9ac1-087a-4f82-9e4e-34693d108151'],
          });

          setTimeAttendanceData2(json.data);
        };
        response();
      } catch (e) {
        console.log(e);
      }
    }, [])
  );

  return (
    <View>
      <MissingPunchForEmployee
        setShowMissingPunchDialog={setShowMissingPunchDialog}
      />

      <NewMissingPunchRequestModal
        showMissingPunchDialog={showMissingPunchDialog}
        setShowMissingPunchDialog={setShowMissingPunchDialog}
        timeAttendanceData={timeAttendanceData2}
        // employeeData={employeeData}
      />
    </View>
  );
};

export default MissingPunchScreen;

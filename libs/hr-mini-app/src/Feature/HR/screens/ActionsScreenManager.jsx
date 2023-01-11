import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLeaveRequestService } from '../util/http';
import MissingAndLeaveRequests from '../components/refactor/cards/MissingAndLeaveRequests';
import DisplayAllMissingPunchRequests from '../components/modals/DisplayAllMissingPunchRequests';

const ActionsScreenManager = () => {
  const AuthStore = useSelector((state) => state.AuthStore);
  const Auth = useSelector((state) => state.hrStore);
  const [facilityId, setFacilityId] = useState(
    'FAC-FCF-JOR-1bf94704-d0c4-4766-ad03-0c2f26fecd46'
  );
  const [employeeId, setEmployeeId] = useState(
    'HRS-HRP-JOR-1730c46d-3b82-4010-b89f-a18a4e4dfd0b'
  );
  const hrStore = useSelector((state) => state.hrStore);
  const [allLeaveRequestsData, setAllLeaveRequestsData] = useState([]);
  //////////////
  useEffect(() => {
    try {
      let response = async () => {
        const data = await getLeaveRequestService({
          limit: 0,
          offset: 0,
          arrayId: null,
          leaveTypeId: null,
          subLeaveType: null,
          leaveStatus: null,
          // id: hrStore.employeeId || "HRS-HRP-JOR-a79df774-0955-4891-bf2f-3a194de60cc7",
          facilityId: AuthStore.user.facility.id ||facilityId,
        });
        const json = data?.row?.leaves || [];
        let dateOffset = 24 * 60 * 60 * 1000; //5 days
        let myDate = new Date();
        myDate.setTime(myDate.getTime() - dateOffset);
        let beforeOneDay = myDate.toISOString().slice(0, 10);
        let arr1 = json.filter(
          (element) => element.status.id == 1 || element.status.id == 5
        );
        // let arr2 = json.filter(
        //   (element) =>
        //     element.applyDate >= beforeOneDay &&
        //     (element.status.id == 2 || element.status.id == 3)
        // );

        setAllLeaveRequestsData(arr1.length > 0 ? arr1 : []);
        return json;
      };
      response();
    } catch (error) {
      console.log(error);
    }
  }, [hrStore.leaveRequestsUIFlagManager]);
  return (
    <View>
      <MissingAndLeaveRequests allLeaveRequestsData={allLeaveRequestsData} />
    </View>
  );
};

export default ActionsScreenManager;

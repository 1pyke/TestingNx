import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import requestBuilder from '../../../src/requestBuilder';
import axios from 'axios';
import { getEmployeesInforamtionService } from './util/http';
const { requestBuilder } = require('../../requestBuilder');

let initialState = {
  employeesData: [],
  employeesLoading: true,
  employeesInfo: [],
  workingHoursData: [],
  workingHoursLoading: true,
  leaveInfo: [],
  timeAttendanceInfo: [],
  isLoading: true,
  leaveRequestsLoading: true,
  timeAttendanceLoading: true,
  dueDate: '',
  leaveRequestsUIFlagEmployee: false,
  leaveRequestsUIFlagManager: false,

  //////////////////////
  isModalVisible: false,
  personalModal: false,
  sickModal: false,
  CheckStatus: false,
  checkInFlag: false,
  checkOutFlag: true,

  //========================
  isCheckedIn: true,
  isCheckedOut: false,
  isBreakedOut: false,
  isBreakedIn: false,
  //========================
  employeeId: '',
  employeeFullProfile: null,
};
export const getAllEmployees = createAsyncThunk(
  'employee/getAllEmployees',
  async (name, thunkAPI, payload) => {
    try {
      let response = await getEmployeesInforamtionService({
        limit: 0,
        offset: 0,
        arrayId: null,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);
export const createNewLeaveRequest = createAsyncThunk(
  'employee/createNewLeaveRequest',
  async (name, thunkAPI, payload) => {
    try {
      // console.log(thunkAPI);
      // console.log(payload);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      if (name.leaveType == 'business') {
        let response = requestBuilder('/hr/leaveApplication', {
          employeeName: name.providerName,
          providerUuid: name.providerUuid,
          applyDate: name.applyDate,
          DateFrom: name.DateFrom,
          dateTo: name.dateTo,
          timeFrom: name.timeFrom,
          timeTo: name.timeTo,
          leaveType: 'business',
          subLeaveType: name.subLeaveType,
          howManyDaysEmployeeAskForBusinessLeave:
            name.howManyDaysEmployeeAskForBusinessLeave,
          howManyHoursEmployeeAskForBusinessLeave:
            name.howManyHoursEmployeeAskForBusinessLeave,
          reasonFromEmployee: name.reasonFromEmployee,
          EmployeeId: name.EmployeeId,
        });
        return response.data;
      } else if (name.leaveType == 'sick') {
        let response = requestBuilder('/hr/leaveApplication', {
          employeeName: name.providerName,
          providerUuid: name.providerUuid,
          applyDate: name.applyDate,
          DateFrom: name.DateFrom,
          dateTo: name.dateTo,
          timeFrom: name.timeFrom,
          timeTo: name.timeTo,
          leaveType: 'sick',
          subLeaveType: name.subLeaveType,
          howManyDaysEmployeeAskForBusinessLeave:
            name.howManyDaysEmployeeAskForBusinessLeave,
          howManyHoursEmployeeAskForBusinessLeave:
            name.howManyHoursEmployeeAskForBusinessLeave,
          reasonFromEmployee: name.reasonFromEmployee,
          EmployeeId: name.EmployeeId,
        });
        return response.data;
      } else {
        let response = requestBuilder('/hr/leaveApplication', {
          employeeName: name.providerName,
          providerUuid: name.providerUuid,
          applyDate: name.applyDate,
          DateFrom: name.DateFrom,
          dateTo: name.dateTo,
          timeFrom: name.timeFrom,
          timeTo: name.timeTo,
          leaveType: 'personal',
          subLeaveType: name.subLeaveType,
          howManyDaysEmployeeAskForBusinessLeave:
            name.howManyDaysEmployeeAskForBusinessLeave,
          howManyHoursEmployeeAskForBusinessLeave:
            name.howManyHoursEmployeeAskForBusinessLeave,
          reasonFromEmployee: name.reasonFromEmployee,
          EmployeeId: name.EmployeeId,
        });
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);
export const getAllTimeAttendance = createAsyncThunk(
  'employee/getAllTimeAttendance',
  async (name, thunkAPI, payload) => {
    try {
      let response = requestBuilder('/hr/getAllTimeAttendance', {
        type: 'requestsMissing',
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong', error);
    }
  }
);
export const getAllLeaveRequests = createAsyncThunk(
  'employee/getAllLeaveRequests',
  async (name, thunkAPI, payload) => {
    try {
      // if (name.employeeUuid === null) {
      // let response = await axios.post(
      //   'http://192.168.1.14:31602/hr/leaves/getLeaves'
      // );
      //
      let response = requestBuilder('/hr/leaves/getLeaves');
      // axios(
      //   requestBuilder('hr', '/getAllLeavingsForEmployees', 'post', {
      //     providerUuid: null,
      //     dateFromFiltred: null,
      //     dateToFiltred: null,
      //   })
      // );
      return response.data;
      // }
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong', error);
    }
  }
);
export const getWorkingHours = createAsyncThunk(
  'employee/getWorkingHours',
  async (name, thunkAPI, payload) => {
    try {
      let response = requestBuilder('/hr/getAllWorkingHours', {
        providerUuid: name.employeeUuid,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong', error);
    }
  }
);

const hrStore = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.isModalVisible = !state.isModalVisible;
    },
    switchingLeaveTypes: (state, action) => {
      if (action.payload === 'Business') {
        state.isModalVisible = !state.isModalVisible;
        state.sickModal = false;
        state.personalModal = false;
      } else if (action.payload === 'Sick') {
        state.sickModal = !state.sickModal;
        state.isModalVisible = false;
        state.personalModal = false;
      } else {
        state.personalModal = !state.personalModal;
        state.isModalVisible = false;
        state.sickModal = false;
      }
    },
    changeLeaveRequetsUIFlag: (state, action) => {
      state.leaveRequestsUIFlagEmployee = !state.leaveRequestsUIFlagEmployee;
    },
    changeLeaveRequetsUIFlagManager: (state, action) => {
      state.leaveRequestsUIFlagManager = !state.leaveRequestsUIFlagManager;
    },
    // createNewLeaveRequest: (state, action) => {
    // },
    increment: (state, action) => {
      state.value = state.value + 1;
    },
    dueDateHandler: (state, action) => {
      let d = new Date();
      const currentDate = d;
      let year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1 + '';
      if (month.length === 1) month = '0' + month;
      let day = currentDate.getDate() + '';
      if (day.length === 1) day = '0' + day;
      state.dueDate = `${year + '-' + month + '-' + day}`;
    },
    updateCheckStatus: (state, action) => {
      state.CheckStatus = !state.CheckStatus;
    },
    updateCheckInTrue: (state, action) => {
      state.checkInFlag = true;
    },
    updateCheckInFalse: (state, action) => {
      state.checkInFlag = false;
    },
    updateCheckOutTrue: (state, action) => {
      state.checkOutFlag = true;
    },
    updateCheckOutFalse: (state, action) => {
      state.checkOutFlag = false;
    },
    //====================================================
    updateCheckInFlag: (state, action) => {
      state.isCheckedIn = action.payload;
      console.log(state.isCheckedIn, ' state.isCheckedIn');
    },
    updateCheckOutFlag: (state, action) => {
      state.isCheckedOut = action.payload;
      console.log(state.isCheckedOut, ' state.isCheckedOut');
    },
    updateBreakOutFlag: (state, action) => {
      state.isBreakedOut = action.payload;
      console.log(state.isBreakedOut, ' state.isBreakedOut');
    },
    updateBreakInFlag: (state, action) => {
      state.isBreakedIn = action.payload;
      console.log(state.isBreakedIn, ' state.isBreakedIn');
    },
    updateEmployeeId: (state, action) => {
      state.employeeId = action.payload;
      console.log(state.employeeId, 'state.employeeId');
    },
    employeeFullProfile: (state, action) => {
      state.employeeFullProfile = action.payload;
      console.log(state.employeeFullProfile, 'state.employeeFullProfile');
    }
  },
  extraReducers: {
    [createNewLeaveRequest.pending]: (state) => {
      state.isLoading = true;
    },
    [createNewLeaveRequest.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.employeesInfo = action.payload;
    },
    [createNewLeaveRequest.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getAllLeaveRequests.pending]: (state) => {
      state.leaveRequestsLoading = true;
    },
    [getAllLeaveRequests.fulfilled]: (state, action) => {
      state.leaveRequestsLoading = false;
      console.log(action.payload, 'action.payloadaction.payloadaction.payload');
      state.leaveInfo = action.payload;
    },
    [getAllLeaveRequests.rejected]: (state, action) => {
      state.leaveRequestsLoading = false;
    },
    [getAllTimeAttendance.pending]: (state) => {
      state.timeAttendanceLoading = true;
    },
    [getAllTimeAttendance.fulfilled]: (state, action) => {
      state.timeAttendanceLoading = false;
      state.timeAttendanceInfo = action.payload;
    },
    [getAllTimeAttendance.rejected]: (state, action) => {
      state.timeAttendanceLoading = false;
    },
    [getAllEmployees.pending]: (state) => {
      state.employeesLoading = true;
    },
    [getAllEmployees.fulfilled]: (state, action) => {
      state.employeesLoading = false;
      state.employeesData = action.payload;
    },
    [getAllEmployees.rejected]: (state, action) => {
      state.employeesLoading = false;
    },
    [getWorkingHours.pending]: (state) => {
      state.workingHoursLoading = true;
    },
    [getWorkingHours.fulfilled]: (state, action) => {
      state.workingHoursLoading = false;
      state.workingHoursData = action.payload;
    },
    [getWorkingHours.rejected]: (state, action) => {
      state.workingHoursLoading = false;
    },
  },
});
export const {
  increment,
  dueDateHandler,
  toggleModal,
  switchingLeaveTypes,
  updateCheckStatus,
  updateCheckInFalse,
  updateCheckInTrue,
  updateCheckOutTrue,
  updateCheckOutFalse,
  changeLeaveRequetsUIFlag,
  changeLeaveRequetsUIFlagManager,
  updateCheckInFlag,
  updateCheckOutFlag,
  updateBreakOutFlag,
  updateBreakInFlag,
  updateEmployeeId,
  employeeFullProfile
} = hrStore.actions;
export default hrStore.reducer;
// export default hrStore.reducer;

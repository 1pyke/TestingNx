import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

export const dashboard = createSlice({
  name: 'layout',
  initialState: {
    value: 66,
    userToken: {},
    accessToken: {},
    ShowMenuFlag77: false,
    notificationModal: false,
    modalVisible: false,
    AdditionalAppointmentData: [],
    FullViewAppData: {},
    FullViewAppFlag: false,
    providerId: '',
    employeeId: '',
    statusModal: false,
    taskStatus: {},
    updateData: false,
  },
  reducers: {
    increment: (state, action) => {
      state.value = state.value + action.payload;
    },
    userTokenHandler: (state, action) => {
      let decoded = action.payload;
      console.log(decoded);

      state.userToken = decoded;
    },
    accessSaveToken: (state, action) => {
      let decoded = action.payload;

      state.accessToken = decoded;
    },
    changeShowMenuFlag77: (state, action) => {
      state.ShowMenuFlag77 = !state.ShowMenuFlag77;
    },
    closeMenue: (state, action) => {
      state.ShowMenuFlag77 = false;
    },
    notificationModalHandler: (state, action) => {
      state.notificationModal = !state.notificationModal;
    },
    closeModalHandler: (state, action) => {
      state.notificationModal = false;
    },
    modalVisibleHandler: (state, action) => {
      state.modalVisible = !state.modalVisible;
    },
    AdditionalAppointmentDataHandler: (state, action) => {
      state.AdditionalAppointmentData = action.payload;
    },
    fullViewAppHandler: (state, action) => {
      state.FullViewAppData = action.payload;
      state.FullViewAppFlag = true;
    },
    FullViewCloseHandler: (state, action) => {
      state.FullViewAppFlag = false;
    },
    saveProviderId: (state, action) => {
      state.providerId = action.payload;
    },
    statusModalHandler: (state, actions) => {
      console.log('actionsactionsactions', actions.payload);
      state.taskStatus = actions.payload;
      state.statusModal = true;
    },
    SaveModalHandler: (state, actions) => {
      state.statusModal = false;
      state.updateData = !state.updateData;
    },
    closeStatusModal: (state, actions) => {
      state.statusModal = false;
    },
  },
});
export const {
  increment,
  userTokenHandler,
  changeShowMenuFlag77,
  closeMenue,
  notificationModalHandler,
  closeModalHandler,
  modalVisibleHandler,
  AdditionalAppointmentDataHandler,
  fullViewAppHandler,
  FullViewCloseHandler,
  saveProviderId,
  statusModalHandler,
  SaveModalHandler,
  closeStatusModal,
  accessSaveToken,
} = dashboard.actions;
export default dashboard.reducer;

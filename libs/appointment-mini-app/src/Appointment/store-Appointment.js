import { createSlice } from '@reduxjs/toolkit';
let datanow = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .substr(0, 10);
export const AppointmentStore = createSlice({
  name: 'AppointmentStore',
  initialState: {
    value: 0,
    body: {
      provider: null,
      consumer: null,
      followupAppointmentId: null,
      date: datanow,
      timeFrom: null,
      timeTo: null,
      // type: null,
      // room: null,
      // duration: null,
      // assistant: null,
      services: [],
      status: { name: 'Scheduled' },
      priority: 'medium',
      locationSetting: 'onSite',
      needsFollowup: false,
      facility: null,
      notes: null,
      createdBy: null, //name,image,id
      changedBy: null,
      voucher: null,
    },
  },
  reducers: {
    increment: (state, action) => {
      state.value = action.payload;
    },
    setNewAppointment: (state, action) => {
      state.body = {
        ...state.body,
        [action.payload.name]: action.payload.value,
      };
    },
  },
});

export const { increment, setNewAppointment } = AppointmentStore.actions;
export default AppointmentStore.reducer;

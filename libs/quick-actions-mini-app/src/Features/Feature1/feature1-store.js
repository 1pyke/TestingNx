import { createSlice } from '@reduxjs/toolkit';
// const { requestBuilder } = require('../../../requestBuilder');
const { requestBuilder } = require('../../requestBuilder');

const initialState = {
  user: {},
  dashboardTemplates: [],
  userRoles: [],
};

export const dashboardActionsTemplatesStore = createSlice({
  name: 'dashboardActionsTemplatesStore',
  initialState,
  reducers: {
    dispatchDashboardTemplates: (state, action) => {
      state.dashboardTemplates = action.payload.templates;
    },

    storeUserRoles: (state, action) => {
      state.userRoles = action.payload.userRoles;
    },
  },
});

// Action creators are generated for each case reducer function
export const { dispatchDashboardTemplates, storeUserRoles } =
  dashboardActionsTemplatesStore.actions;

export default dashboardActionsTemplatesStore.reducer;

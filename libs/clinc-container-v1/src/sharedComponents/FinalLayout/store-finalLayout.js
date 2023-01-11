import { createSlice } from '@reduxjs/toolkit';

export const finalLayoutStore = createSlice({
  name: 'layout',
  initialState: {
    loginFlag: false,
    settingsFlag: false,
    componentsLoader: false,
    selected: 0,
    openCollaborate: false,
    isQuickActionsOpen: false,
    searchFlag: false,
    drawerFlag: 'locked-closed',
  },
  reducers: {
    loginFlagHandler: (state, action) => {
      state.loginFlag = true;
    },
    closeloginFlagHandler: (state, action) => {
      state.loginFlag = false;
    },
    settingsHandler: (state, action) => {
      state.settingsFlag = !state.settingsFlag;
    },
    componentsLoaderHandler: (state, action) => {
      state.componentsLoader = !state.componentsLoader;
    },
    selectedHandler: (state, action) => {
      state.selected = action.payload;
    },
    openCollaborateHandler: (state, action) => {
      state.openCollaborate = !state.openCollaborate;
    },
    isQuickActionsOpenHandler: (state, action) => {
      state.isQuickActionsOpen = !state.isQuickActionsOpen;
    },
    HeaderSearchHandler: (state, action) => {
      state.searchFlag = !state.searchFlag;
    },
    drawerHandler: (state, action) => {
      state.drawerFlag = 'unlocked';
    },
  },
});

export const {
  loginFlagHandler,
  closeloginFlagHandler,
  settingsHandler,
  componentsLoaderHandler,
  selectedHandler,
  openCollaborateHandler,
  isQuickActionsOpenHandler,
  HeaderSearchHandler,
  drawerHandler,
} = finalLayoutStore.actions;
export default finalLayoutStore.reducer;

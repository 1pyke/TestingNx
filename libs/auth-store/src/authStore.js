import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthStore = createSlice({
  name: 'AuthStore',
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      AsyncStorage.setItem(
        'accessToken',
        JSON.stringify(action.payload.accessToken)
      );
      AsyncStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state, action) => {
      state.user = null;
      state.accessToken = null;
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('user');
    },
    isLogged: async (state, action) => {
      try {
        let accessToken = await AsyncStorage.getItem('accessToken');
        let user = await AsyncStorage.getItem('user');
        // console.log(accessToken);

        if (accessToken) {
          // console.log('herere');
          state.accessToken = accessToken;
        }
        if (user) state.user = user;
      } catch (error) {
        console.log(error);
      }
      return true;
    },
  },
});
export const { login, logout } = AuthStore.actions;
export default AuthStore.reducer;

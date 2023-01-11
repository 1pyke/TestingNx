import {createSlice} from '@reduxjs/toolkit'
export const ciamStore=createSlice({
    name:'ciamStore',
    initialState:{
      ottpFlag:false,
      ottpPhone:'' },

    reducers:{
        ottpFlagHandler:(state,action)=>{
        state.ottpFlag = !state.ottpFlag
    },
        ottpPhoneHandler:(state,action)=>{
        state.ottpPhone = action.payload
    }
    }
})
export const {ottpFlagHandler,ottpPhoneHandler} =ciamStore.actions
export default ciamStore.reducer 
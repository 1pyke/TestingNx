import {createSlice} from '@reduxjs/toolkit'

export const billingStore=createSlice({
    name:'billing',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =billingStore.actions
export default billingStore.reducer 
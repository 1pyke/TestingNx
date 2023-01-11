import {createSlice} from '@reduxjs/toolkit'


export const providerStore=createSlice({
    name:'provider',
    initialState:{
        value:66
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    }
    }
})



export const {increment} =providerStore.actions
export default providerStore.reducer 
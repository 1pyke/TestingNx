import {createSlice} from '@reduxjs/toolkit'


export const notificationStore=createSlice({
    name:'notification',
    initialState:{
        value:66,
        modalFlag:false,
        modalFlagUsers:false,
        users:[],
        selectedUsers:[]
    },
    reducers:{
    increment:(state,action)=>{
    state.value = state.value + action.payload
    },
    onOpen:(state,actions)=>{
       state.modalFlag= true
    },
    onClose:(state,actions)=>{
        state.modalFlag= false
     },
     onOpenUsers:(state,actions)=>{
        state.modalFlagUsers= true
     },
     onCloseUsers:(state,actions)=>{
         state.modalFlagUsers= false
      },
    


     saveUsers:(state,actions)=>{
        let usersNames=[]
        for (let i = 0; i < actions.payload.length; i++) {
            usersNames.push({name:actions.payload[i].firstName +" "+ actions.payload[i].middleName,
            profileId:actions.payload[i].userId
        
        })
            
        }
        state.users=usersNames
     },
     saveSelectedUsers:(state,actions)=>{
      state.selectedUsers= []
        for (let i = 0; i < actions.payload.length; i++) {
           
         state.selectedUsers.push({"user_id":actions.payload[i]})
        }
     
     },
    }
})



export const {increment,onOpen,onClose,saveUsers,onCloseUsers,onOpenUsers,saveSelectedUsers} =notificationStore.actions
export default notificationStore.reducer 
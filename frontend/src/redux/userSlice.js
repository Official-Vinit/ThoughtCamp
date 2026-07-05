import { createSlice } from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        isAuthReady: false
    },//setUserData("ankush")<={payload}
    reducers:{
        setUserData:(state,action)=>{
        state.userData=action.payload
        },
        setAuthReady:(state,action)=>{
            state.isAuthReady = action.payload
        }
    }
})

export const {setUserData, setAuthReady}=userSlice.actions
export default userSlice.reducer
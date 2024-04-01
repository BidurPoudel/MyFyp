import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
   token: null,
   userId:null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) =>{
            state.token = action.payload.token;
            state.userId = action.payload.userId;
        },
    }
})

export const {setCredentials } = authSlice.actions;
export default authSlice.reducer;
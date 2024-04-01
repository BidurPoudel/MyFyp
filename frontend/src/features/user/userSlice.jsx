import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
}

const userSlice = createSlice({
    name: 'user', 
    initialState,
    reducers:{
        signIn: (state, action)=>{
            state.currentUser=action.payload;
            state.error = null;
        }
    }
});
export const {signIn} = userSlice.actions;
export default userSlice.reducer;
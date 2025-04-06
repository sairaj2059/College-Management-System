import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: {
        name: "",
        email: "",
    },
    reducers:{
        setUserProfile(state, action){
            state.name = action.payload.name;
            state.email = action.payload.email;
        }
    }
});

export const { setUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;

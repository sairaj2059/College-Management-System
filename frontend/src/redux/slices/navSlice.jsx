import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: 'tabs',
    initialState: { tabValue: 0 },

    reducers: {
        setTab(state, action){
            state.tabValue = action.payload;
        }
    }
});


export const  { setTab } = navSlice.actions;
export default navSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const examSlice = createSlice({
    name : 'questionsList',
    initialState : {
        questions : []
    },

    reducers: {
        setQuestionList(state, action){
            return {
                ...state,
                questions : [...state.questions, action.payload]
            }
        }
    }
})

export const { setQuestionList } = examSlice.actions
export default examSlice.reducer;
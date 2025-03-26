import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './slices/authSlice'
import navSliceReducer from './slices/navSlice'
import ExamReducers from './slices/examSlice'


export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    tabs: navSliceReducer,
    questionsList: ExamReducers.questionsList,
    examList: ExamReducers.examList
  },
})
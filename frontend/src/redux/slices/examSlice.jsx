import { createSlice } from "@reduxjs/toolkit";

const examSlice = createSlice({
  name: "questionsList",
  initialState: {
    questions: [],
  },
  reducers: {
    addQuestion(state, action) {
      state.questions.push(action.payload);
    },
    setQuestionList(state, action) {
      state.questions = action.payload;
    },
    clearQuestions(state) {
      state.questions = [];
    },
  },
});

const questionListSlice = createSlice({
  name: "questionList",
  initialState: {
    questions: [],
  },
  reducers: {
    addQuestionList(state, action){
      state.questions.push(action.payload);
    }
    ,
    setQuestionList(state,action){
      state.questions = (action.payload);
    },
    clearQuestions(state){
      state.questions = [];
    }
  }
})

const questionSlice = createSlice({
  name : "question",
  initialState : {
    questionDetails : null,
    isAttempted: false,
    isCorrect: false,
    marksAwarded: 0
  },
  reducers:{
    setQuestion(state, action){
      state.questionDetails = action.payload.questionDetails;
      state.isAttempted = action.payload.isAttempted;
      state.isCorrect = action.payload.isCorrect;
      state.marksAwarded = action.payload.marksAwarded;

    },
    
  }
})

const examListSlice = createSlice({
  name: "examList",
  initialState: {
    exams: [],
    selectedExam: "",
  },

  reducers: {
    setExamList(state, action) {
      return {
        ...state,
        exams: action.payload,
      };
    },
    setSelectedExam(state, action) {
      return {
        ...state,
        selectedExam: action.payload,
      };
    },
  },
});
const reducers = {
  questionsList: examSlice.reducer,
  examList: examListSlice.reducer,
};
export const { setQuestionList, addQuestion, clearQuestions } = examSlice.actions;
export const { setExamList, setSelectedExam } = examListSlice.actions;


// Export the combined reducers object as the default export
export default reducers;

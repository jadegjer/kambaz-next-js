import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
  quiz: null as any,
  questions: [] as any[],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizzes = [...state.quizzes, action.payload] as any[];
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz: any) =>
        quiz._id === action.payload._id ? action.payload : quiz
      ) as any[];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz: any) => quiz._id !== action.payload
      ) as any[];
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action) => {
      state.questions = [...state.questions, action.payload] as any[];
    },
    updateQuestion: (state, action) => {
      state.questions = state.questions.map((q: any) =>
        q._id === action.payload._id ? action.payload : q
      ) as any[];
    },
    deleteQuestion: (state, action) => {
      state.questions = state.questions.filter(
        (q: any) => q._id !== action.payload
      ) as any[];
    },
  },
});

export const {
  setQuizzes,
  setQuiz,
  addQuiz,
  updateQuiz,
  deleteQuiz,
  setQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
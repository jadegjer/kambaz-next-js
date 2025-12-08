import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

// Quizzes
export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${HTTP_SERVER}/api/courses/${courseId}/quizzes`);
  return response.data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/courses/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

// Questions
export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};

export const createQuestionForQuiz = async (quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const updateQuestion = async (question: any) => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/questions/${question._id}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/api/questions/${questionId}`
  );
  return response.data;
};

// Quiz Attempts
export const submitQuizAttempt = async (quizId: string, answers: any[]) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/attempts`,
    { answers }
  );
  return response.data;
};

export const getAttemptsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts`);
  return response.data;
};

export const getLatestAttempt = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/latest`
  );
  return response.data;
};
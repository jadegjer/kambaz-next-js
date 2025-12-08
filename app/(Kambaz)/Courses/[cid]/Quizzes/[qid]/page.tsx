"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../client";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const quizData = await client.findQuizById(qid as string);
      setQuiz(quizData);
      
      const questionsData = await client.findQuestionsForQuiz(qid as string);
      setQuestions(questionsData);

      // Get latest attempt for students
      if (!isFaculty) {
        try {
          const attempt = await client.getLatestAttempt(qid as string);
          setLatestAttempt(attempt);
        } catch (err) {
          // No attempts yet
        }
      }
    };
    fetchQuizDetails();
  }, [qid, isFaculty]);

  if (!quiz) return <div>Loading...</div>;

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div className="wd-quiz-details p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title}</h2>
        {isFaculty && (
          <div>
            <Link
              href={`/Courses/${cid}/Quizzes/${qid}/Preview`}
              className="btn btn-secondary me-2"
            >
              Preview
            </Link>
            <Link
              href={`/Courses/${cid}/Quizzes/${qid}/Editor`}
              className="btn btn-primary"
            >
              <FaPencil className="me-2" />
              Edit
            </Link>
          </div>
        )}
        {!isFaculty && quiz.published && (
          <Link
            href={`/Courses/${cid}/Quizzes/${qid}/Preview`}
            className="btn btn-danger"
          >
            Start Quiz
          </Link>
        )}
      </div>

      {quiz.description && (
        <div className="mb-4" dangerouslySetInnerHTML={{ __html: quiz.description }} />
      )}

      <div className="row">
        <div className="col-md-6">
          <table className="table">
            <tbody>
              <tr>
                <td><strong>Quiz Type</strong></td>
                <td>{quiz.quizType?.replace(/_/g, " ")}</td>
              </tr>
              <tr>
                <td><strong>Points</strong></td>
                <td>{totalPoints}</td>
              </tr>
              <tr>
                <td><strong>Assignment Group</strong></td>
                <td>{quiz.assignmentGroup}</td>
              </tr>
              <tr>
                <td><strong>Shuffle Answers</strong></td>
                <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td><strong>Time Limit</strong></td>
                <td>{quiz.timeLimit} Minutes</td>
              </tr>
              <tr>
                <td><strong>Multiple Attempts</strong></td>
                <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
              </tr>
              {quiz.multipleAttempts && (
                <tr>
                  <td><strong>How Many Attempts</strong></td>
                  <td>{quiz.howManyAttempts}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <table className="table">
            <tbody>
              <tr>
                <td><strong>Show Correct Answers</strong></td>
                <td>{quiz.showCorrectAnswers}</td>
              </tr>
              <tr>
                <td><strong>Access Code</strong></td>
                <td>{quiz.accessCode || "None"}</td>
              </tr>
              <tr>
                <td><strong>One Question at a Time</strong></td>
                <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td><strong>Webcam Required</strong></td>
                <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td><strong>Lock Questions After Answering</strong></td>
                <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4">
        <h5>Due Dates</h5>
        <table className="table">
          <tbody>
            <tr>
              <td><strong>Due</strong></td>
              <td>{quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "No due date"}</td>
            </tr>
            <tr>
              <td><strong>Available from</strong></td>
              <td>{quiz.availableDate ? new Date(quiz.availableDate).toLocaleString() : "Not set"}</td>
            </tr>
            <tr>
              <td><strong>Until</strong></td>
              <td>{quiz.untilDate ? new Date(quiz.untilDate).toLocaleString() : "Not set"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {!isFaculty && latestAttempt && (
        <div className="mt-4 alert alert-info">
          <h5>Latest Attempt</h5>
          <p>Score: {latestAttempt.score} / {totalPoints}</p>
          <p>Submitted: {new Date(latestAttempt.submittedAt).toLocaleString()}</p>
          <Link href={`/Courses/${cid}/Quizzes/${qid}/Results`} className="btn btn-primary">
            View Results
          </Link>
        </div>
      )}
    </div>
  );
}
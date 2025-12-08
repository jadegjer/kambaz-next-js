"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import * as client from "../../client";
import Link from "next/link";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function QuizResults() {
  const { cid, qid } = useParams();
  const [attempt, setAttempt] = useState<any>(null);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const attemptData = await client.getLatestAttempt(qid as string);
      setAttempt(attemptData);

      const quizData = await client.findQuizById(qid as string);
      setQuiz(quizData);

      const questionsData = await client.findQuestionsForQuiz(qid as string);
      setQuestions(questionsData);
    };
    fetchResults();
  }, [qid]);

  if (!attempt || !quiz || questions.length === 0) {
    return <div>Loading results...</div>;
  }

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);
  const percentage = ((attempt.score / totalPoints) * 100).toFixed(1);

  return (
    <div className="wd-quiz-results p-4">
      <h2>{quiz.title} - Results</h2>

      <div className="alert alert-info mb-4">
        <h4>Your Score: {attempt.score} / {totalPoints} ({percentage}%)</h4>
        <p>Attempt #{attempt.attemptNumber}</p>
        <p>Submitted: {new Date(attempt.submittedAt).toLocaleString()}</p>
      </div>

      <h4>Your Answers:</h4>

      {questions.map((question, index) => {
        const studentAnswer = attempt.answers.find(
          (a: any) => a.question === question._id
        );
        const isCorrect = studentAnswer?.isCorrect;

        return (
          <div
            key={question._id}
            className={`card mb-3 ${isCorrect ? "border-success" : "border-danger"}`}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <h5>
                  Question {index + 1} ({question.points} pts)
                </h5>
                {isCorrect ? (
                  <FaCheck className="text-success fs-3" />
                ) : (
                  <FaTimes className="text-danger fs-3" />
                )}
              </div>

              <p>{question.question}</p>

              {question.type === "MULTIPLE_CHOICE" && (
                <div>
                  <p>
                    <strong>Your Answer:</strong>{" "}
                    <span className={isCorrect ? "text-success" : "text-danger"}>
                      {studentAnswer?.answer || "No answer"}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p>
                      <strong>Correct Answer:</strong>{" "}
                      <span className="text-success">{question.correctAnswer}</span>
                    </p>
                  )}
                </div>
              )}

              {question.type === "TRUE_FALSE" && (
                <div>
                  <p>
                    <strong>Your Answer:</strong>{" "}
                    <span className={isCorrect ? "text-success" : "text-danger"}>
                      {studentAnswer?.answer || "No answer"}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p>
                      <strong>Correct Answer:</strong>{" "}
                      <span className="text-success">{question.correctAnswer}</span>
                    </p>
                  )}
                </div>
              )}

              {question.type === "FILL_IN_BLANK" && (
                <div>
                  <p>
                    <strong>Your Answer:</strong>{" "}
                    <span className={isCorrect ? "text-success" : "text-danger"}>
                      {studentAnswer?.answer || "No answer"}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p>
                      <strong>Possible Correct Answers:</strong>{" "}
                      <span className="text-success">
                        {question.correctAnswers.join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="mt-4">
        {quiz.multipleAttempts && attempt.attemptNumber < quiz.howManyAttempts && (
          <Link
            href={`/Courses/${cid}/Quizzes/${qid}/Preview`}
            className="btn btn-primary me-2"
          >
            Retake Quiz
          </Link>
        )}
        <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-secondary">
          Back to Quizzes
        </Link>
      </div>
    </div>
  );
}
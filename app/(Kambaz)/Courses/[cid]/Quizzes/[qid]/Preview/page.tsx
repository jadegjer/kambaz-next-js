"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";
import { Form, FormControl } from "react-bootstrap";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [attemptCount, setAttemptCount] = useState(0);
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";

  useEffect(() => {
    const fetchQuizData = async () => {
      const quizData = await client.findQuizById(qid as string);
      setQuiz(quizData);
      
      const questionsData = await client.findQuestionsForQuiz(qid as string);
      setQuestions(questionsData);

      // Check attempt count for students
      if (!isFaculty) {
        try {
          const attempts = await client.getAttemptsForQuiz(qid as string);
          setAttemptCount(attempts.length);
        } catch (err) {
          setAttemptCount(0);
        }
      }
    };
    fetchQuizData();
  }, [qid, isFaculty]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    if (!isFaculty) {
      // Check if student has attempts left
      if (quiz.multipleAttempts && attemptCount >= quiz.howManyAttempts) {
        alert("You have no attempts remaining for this quiz.");
        return;
      }
    }

    const answersArray = questions.map((q) => ({
      question: q._id,
      answer: answers[q._id] || "",
    }));

    if (isFaculty) {
      // Faculty preview - just show results without saving
      alert("This is a preview. Your answers were not saved.");
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } else {
      // Student submission - save attempt
      await client.submitQuizAttempt(qid as string, answersArray);
      router.push(`/Courses/${cid}/Quizzes/${qid}/Results`);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  const canTakeQuiz = isFaculty || !quiz.multipleAttempts || attemptCount < quiz.howManyAttempts;

  return (
    <div className="wd-quiz-preview p-4">
      <h2>{quiz.title}</h2>
      {quiz.description && (
        <div className="mb-4" dangerouslySetInnerHTML={{ __html: quiz.description }} />
      )}

      {!canTakeQuiz && (
        <div className="alert alert-warning">
          You have used all {quiz.howManyAttempts} attempts for this quiz.
        </div>
      )}

      {canTakeQuiz && (
        <>
          {questions.map((question, index) => (
            <div key={question._id} className="card mb-4">
              <div className="card-body">
                <h5>
                  Question {index + 1} ({question.points} pts)
                </h5>
                <p>{question.question}</p>

                {question.type === "MULTIPLE_CHOICE" && (
                  <div>
                    {question.choices.map((choice: string, idx: number) => (
                      <Form.Check
                        key={idx}
                        type="radio"
                        name={`question-${question._id}`}
                        label={choice}
                        value={choice}
                        checked={answers[question._id] === choice}
                        onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      />
                    ))}
                  </div>
                )}

                {question.type === "TRUE_FALSE" && (
                  <div>
                    <Form.Check
                      type="radio"
                      name={`question-${question._id}`}
                      label="True"
                      value="true"
                      checked={answers[question._id] === "true"}
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      name={`question-${question._id}`}
                      label="False"
                      value="false"
                      checked={answers[question._id] === "false"}
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    />
                  </div>
                )}

                {question.type === "FILL_IN_BLANK" && (
                  <FormControl
                    type="text"
                    value={answers[question._id] || ""}
                    onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                    placeholder="Type your answer here"
                  />
                )}
              </div>
            </div>
          ))}

          <div className="d-flex gap-2">
            <button onClick={handleSubmit} className="btn btn-danger">
              {isFaculty ? "Finish Preview" : "Submit Quiz"}
            </button>
            <button
              onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}`)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}
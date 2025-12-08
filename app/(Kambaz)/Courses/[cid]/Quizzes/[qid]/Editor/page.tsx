"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FormControl, Form, Nav, NavItem, NavLink } from "react-bootstrap";
import * as client from "../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      const quizData = await client.findQuizById(qid as string);
      setQuiz(quizData);
      
      const questionsData = await client.findQuestionsForQuiz(qid as string);
      setQuestions(questionsData);
    };
    fetchQuizData();
  }, [qid]);

  const handleSave = async () => {
    await client.updateQuiz(quiz);
    router.push(`/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    await client.updateQuiz({ ...quiz, published: true });
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const addNewQuestion = async () => {
    const newQuestion = {
      quiz: qid,
      title: `Question ${questions.length + 1}`,
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: "Option 1",
    };
    const created = await client.createQuestionForQuiz(qid as string, newQuestion);
    setQuestions([...questions, created]);
    setEditingQuestion(created._id);
  };

  const updateQuestion = async (questionId: string, updates: any) => {
    const updated = { ...questions.find(q => q._id === questionId), ...updates };
    await client.updateQuestion(updated);
    setQuestions(questions.map(q => q._id === questionId ? updated : q));
  };

  const deleteQuestion = async (questionId: string) => {
    await client.deleteQuestion(questionId);
    setQuestions(questions.filter(q => q._id !== questionId));
  };

  if (!quiz) return <div>Loading...</div>;

  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div className="wd-quiz-editor p-4">
      <h2>{quiz.title}</h2>

      <Nav variant="tabs" className="mb-4">
        <NavItem>
          <NavLink
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
            style={{ cursor: "pointer" }}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={activeTab === "questions"}
            onClick={() => setActiveTab("questions")}
            style={{ cursor: "pointer" }}
          >
            Questions
          </NavLink>
        </NavItem>
      </Nav>

      {activeTab === "details" && (
        <div className="wd-quiz-details-tab">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <FormControl
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FormControl
              as="textarea"
              rows={4}
              value={quiz.description || ""}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quiz Type</Form.Label>
            <Form.Select
              value={quiz.quizType}
              onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
            >
              <option value="GRADED_QUIZ">Graded Quiz</option>
              <option value="PRACTICE_QUIZ">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select
              value={quiz.assignmentGroup}
              onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
            >
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="PROJECT">Project</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Points (Total: {totalPoints})</Form.Label>
            <FormControl
              type="number"
              value={totalPoints}
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time Limit (minutes)</Form.Label>
            <FormControl
              type="number"
              value={quiz.timeLimit}
              onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Allow Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
            />
          </Form.Group>

          {quiz.multipleAttempts && (
            <Form.Group className="mb-3">
              <Form.Label>How Many Attempts</Form.Label>
              <FormControl
                type="number"
                value={quiz.howManyAttempts}
                onChange={(e) => setQuiz({ ...quiz, howManyAttempts: parseInt(e.target.value) })}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Access Code</Form.Label>
            <FormControl
              value={quiz.accessCode || ""}
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
              placeholder="Leave blank for no access code"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <FormControl
              type="datetime-local"
              value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ""}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Available Date</Form.Label>
            <FormControl
              type="datetime-local"
              value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().slice(0, 16) : ""}
              onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Until Date</Form.Label>
            <FormControl
              type="datetime-local"
              value={quiz.untilDate ? new Date(quiz.untilDate).toISOString().slice(0, 16) : ""}
              onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
            />
          </Form.Group>
        </div>
      )}

      {activeTab === "questions" && (
        <div className="wd-quiz-questions-tab">
          <div className="d-flex justify-content-between mb-3">
            <h4>Questions (Total Points: {totalPoints})</h4>
            <button onClick={addNewQuestion} className="btn btn-danger">
              + New Question
            </button>
          </div>

          {questions.length === 0 && (
            <div className="text-center text-muted p-5">
              <p>No questions yet. Click "+ New Question" to add one!</p>
            </div>
          )}

          {questions.map((question, index) => (
            <QuestionEditor
              key={question._id}
              question={question}
              questionNumber={index + 1}
              isEditing={editingQuestion === question._id}
              onEdit={() => setEditingQuestion(question._id)}
              onSave={(updates) => {
                updateQuestion(question._id, updates);
                setEditingQuestion(null);
              }}
              onCancel={() => setEditingQuestion(null)}
              onDelete={() => deleteQuestion(question._id)}
            />
          ))}
        </div>
      )}

      <div className="mt-4 d-flex gap-2">
        <button onClick={handleSave} className="btn btn-primary">
          Save
        </button>
        <button onClick={handleSaveAndPublish} className="btn btn-success">
          Save & Publish
        </button>
        <button onClick={handleCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
}

// Question Editor Component
function QuestionEditor({
  question,
  questionNumber,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: {
  question: any;
  questionNumber: number;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updates: any) => void;
  onCancel: () => void;
  onDelete: () => void;
}) {
  const [localQuestion, setLocalQuestion] = useState(question);

  useEffect(() => {
    setLocalQuestion(question);
  }, [question]);

  if (!isEditing) {
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5>Question {questionNumber}: {localQuestion.title}</h5>
            <div>
              <button onClick={onEdit} className="btn btn-sm btn-primary me-2">
                Edit
              </button>
              <button onClick={onDelete} className="btn btn-sm btn-danger">
                Delete
              </button>
            </div>
          </div>
          <p className="text-muted">{localQuestion.type.replace(/_/g, " ")} - {localQuestion.points} pts</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <Form.Group className="mb-3">
          <Form.Label>Question Title</Form.Label>
          <FormControl
            value={localQuestion.title}
            onChange={(e) => setLocalQuestion({ ...localQuestion, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Question Type</Form.Label>
          <Form.Select
            value={localQuestion.type}
            onChange={(e) => setLocalQuestion({ ...localQuestion, type: e.target.value })}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True/False</option>
            <option value="FILL_IN_BLANK">Fill in the Blank</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <FormControl
            type="number"
            value={localQuestion.points}
            onChange={(e) => setLocalQuestion({ ...localQuestion, points: parseInt(e.target.value) })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Question Text</Form.Label>
          <FormControl
            as="textarea"
            rows={3}
            value={localQuestion.question}
            onChange={(e) => setLocalQuestion({ ...localQuestion, question: e.target.value })}
          />
        </Form.Group>

        {localQuestion.type === "MULTIPLE_CHOICE" && (
          <div>
            <Form.Label>Choices (select correct answer)</Form.Label>
            {localQuestion.choices.map((choice: string, idx: number) => (
              <div key={idx} className="d-flex mb-2">
                <Form.Check
                  type="radio"
                  name={`correct-${localQuestion._id}`}
                  checked={localQuestion.correctAnswer === choice}
                  onChange={() => setLocalQuestion({ ...localQuestion, correctAnswer: choice })}
                  className="me-2"
                />
                <FormControl
                  value={choice}
                  onChange={(e) => {
                    const newChoices = [...localQuestion.choices];
                    newChoices[idx] = e.target.value;
                    setLocalQuestion({ ...localQuestion, choices: newChoices });
                  }}
                />
                <button
                  onClick={() => {
                    const newChoices = localQuestion.choices.filter((_: any, i: number) => i !== idx);
                    setLocalQuestion({ ...localQuestion, choices: newChoices });
                  }}
                  className="btn btn-sm btn-danger ms-2"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => setLocalQuestion({
                ...localQuestion,
                choices: [...localQuestion.choices, `Option ${localQuestion.choices.length + 1}`]
              })}
              className="btn btn-sm btn-secondary"
            >
              + Add Choice
            </button>
          </div>
        )}

        {localQuestion.type === "TRUE_FALSE" && (
          <Form.Group className="mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="True"
                name={`tf-${localQuestion._id}`}
                checked={localQuestion.correctAnswer === "true"}
                onChange={() => setLocalQuestion({ ...localQuestion, correctAnswer: "true" })}
              />
              <Form.Check
                type="radio"
                label="False"
                name={`tf-${localQuestion._id}`}
                checked={localQuestion.correctAnswer === "false"}
                onChange={() => setLocalQuestion({ ...localQuestion, correctAnswer: "false" })}
              />
            </div>
          </Form.Group>
        )}

        {localQuestion.type === "FILL_IN_BLANK" && (
          <div>
            <Form.Label>Possible Correct Answers</Form.Label>
            {(localQuestion.correctAnswers || [""]).map((answer: string, idx: number) => (
              <div key={idx} className="d-flex mb-2">
                <FormControl
                  value={answer}
                  onChange={(e) => {
                    const newAnswers = [...(localQuestion.correctAnswers || [""])];
                    newAnswers[idx] = e.target.value;
                    setLocalQuestion({ ...localQuestion, correctAnswers: newAnswers });
                  }}
                  placeholder="Possible answer"
                />
                <button
                  onClick={() => {
                    const newAnswers = (localQuestion.correctAnswers || [""]).filter((_: any, i: number) => i !== idx);
                    setLocalQuestion({ ...localQuestion, correctAnswers: newAnswers });
                  }}
                  className="btn btn-sm btn-danger ms-2"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => setLocalQuestion({
                ...localQuestion,
                correctAnswers: [...(localQuestion.correctAnswers || [""]), ""]
              })}
              className="btn btn-sm btn-secondary"
            >
              + Add Possible Answer
            </button>
          </div>
        )}

        <div className="mt-3">
          <button onClick={() => onSave(localQuestion)} className="btn btn-success me-2">
            Save Question
          </button>
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
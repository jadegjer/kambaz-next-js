"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes, deleteQuiz } from "./reducer";
import * as client from "./client";
import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Link from "next/link";
import { Dropdown } from "react-bootstrap";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const dispatch = useDispatch();
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const createQuiz = async () => {
    const newQuiz = {
      title: `New Quiz ${quizzes.length + 1}`,
      description: "",
      course: cid,
      quizType: "GRADED_QUIZ",
      points: 0,
      published: false,
    };
    const quiz = await client.createQuizForCourse(cid as string, newQuiz);
    dispatch(setQuizzes([...quizzes, quiz]));
  };

  const removeQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const togglePublish = async (quiz: any) => {
    const updated = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updated);
    dispatch(setQuizzes(quizzes.map((q: any) => q._id === quiz._id ? updated : q)));
  };

  const getAvailability = (quiz: any) => {
    const now = new Date();
    if (!quiz.availableDate) return "Not available yet";
    
    const availableDate = new Date(quiz.availableDate);
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;
    
    if (now < availableDate) {
      return `Not available until ${availableDate.toLocaleDateString()}`;
    }
    if (untilDate && now > untilDate) {
      return "Closed";
    }
    return "Available";
  };

  return (
    <div className="wd-quizzes">
      {isFaculty && (
        <div className="d-flex justify-content-end mb-3">
          <button onClick={createQuiz} className="btn btn-danger">
            <FaPlus className="me-2" />
            Quiz
          </button>
        </div>
      )}

      {quizzes.length === 0 && (
        <div className="text-center text-muted p-5">
          <p>No quizzes yet.</p>
          {isFaculty && <p>Click the "+ Quiz" button to create one!</p>}
        </div>
      )}

      <ul className="list-group">
        {quizzes.map((quiz: any) => (
          <li key={quiz._id} className="list-group-item">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <span
                  onClick={() => isFaculty && togglePublish(quiz)}
                  style={{ cursor: isFaculty ? "pointer" : "default" }}
                >
                  {quiz.published ? "✅" : "🚫"}
                </span>
              </div>

              <div className="flex-grow-1">
                <Link
                  href={`/Courses/${cid}/Quizzes/${quiz._id}`}
                  className="text-decoration-none text-dark fw-bold"
                >
                  {quiz.title}
                </Link>
                <div className="small text-muted">
                  <div>{getAvailability(quiz)}</div>
                  {quiz.dueDate && (
                    <div>Due: {new Date(quiz.dueDate).toLocaleDateString()}</div>
                  )}
                  <div>
                    {quiz.points} pts | {quiz.questions?.length || 0} questions
                  </div>
                </div>
              </div>

              {isFaculty && (
                <Dropdown>
                  <Dropdown.Toggle variant="link" className="text-dark">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} href={`/Courses/${cid}/Quizzes/${quiz._id}/Editor`}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => removeQuiz(quiz._id)}>
                      Delete
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => togglePublish(quiz)}>
                      {quiz.published ? "Unpublish" : "Publish"}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
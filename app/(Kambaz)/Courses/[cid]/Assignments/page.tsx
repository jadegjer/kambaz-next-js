"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../Database";
import { FaPlus } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { Button } from "react-bootstrap";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div id="wd-assignments" className="p-4">
      {/* Search and Buttons Row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group" style={{ width: "300px" }}>
          <span className="input-group-text bg-white">
            <HiMagnifyingGlass />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search for Assignments"
            id="wd-search-assignment"
          />
        </div>

        <div>
          <Button variant="secondary" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" />
            Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
      </div>

      {/* Assignments List */}
      <ul className="list-group rounded-0" id="wd-assignment-list">
        {/* ASSIGNMENTS Header */}
        <li className="list-group-item p-3 bg-secondary" id="wd-assignments-title">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-4" />
              <FaCaretDown className="me-2" />
              <strong>ASSIGNMENTS</strong>
            </div>
            <div>
              <span className="border border-dark rounded px-2 py-1 me-2">
                40% of Total
              </span>
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
        </li>

        {/* Dynamic Assignment Items */}
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <li 
              key={assignment._id}
              className="wd-assignment-list-item list-group-item p-3 border-start border-success border-5"
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-4 mt-1" />
                  <div>
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link text-decoration-none text-dark fw-bold"
                    >
                      {assignment.title}
                    </Link>
                    <div className="text-muted small mt-1">
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <strong>Not available until</strong> May 6 at 12:00am |{" "}
                      <strong>Due</strong> May 13 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
                <IoEllipsisVertical className="fs-4" />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
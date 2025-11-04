"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  
  const isNew = aid === "new";
  const existingAssignment = assignments.find((a: any) => a._id === aid);
  
  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 100,
    dueDate: "2024-05-13",
    availableFromDate: "2024-05-06",
    availableUntilDate: "2024-05-20",
    course: cid,
  });

  useEffect(() => {
    if (!isNew && existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [aid, existingAssignment, isNew]);

  const handleSave = () => {
    if (isNew) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input
          type="text"
          className="form-control"
          id="wd-name"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="wd-description"
          rows={10}
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-points" className="form-label pt-2">
            Points
          </label>
        </div>
        <div className="col-md-9">
          <input
            type="number"
            className="form-control"
            id="wd-points"
            value={assignment.points}
            onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-group" className="form-label pt-2">
            Assignment Group
          </label>
        </div>
        <div className="col-md-9">
          <select className="form-select" id="wd-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-display-grade-as" className="form-label pt-2">
            Display Grade as
          </label>
        </div>
        <div className="col-md-9">
          <select className="form-select" id="wd-display-grade-as">
            <option value="Percentage">Percentage</option>
            <option value="Points">Points</option>
            <option value="Complete/Incomplete">Complete/Incomplete</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label htmlFor="wd-submission-type" className="form-label pt-2">
            Submission Type
          </label>
        </div>
        <div className="col-md-9">
          <div className="border rounded p-3">
            <select className="form-select mb-3" id="wd-submission-type">
              <option value="Online">Online</option>
              <option value="Paper">Paper</option>
              <option value="External Tool">External Tool</option>
            </select>

            <div className="mb-2">
              <strong>Online Entry Options</strong>
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-text-entry"
              />
              <label className="form-check-label" htmlFor="wd-text-entry">
                Text Entry
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-website-url"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="wd-website-url">
                Website URL
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-media-recordings"
              />
              <label className="form-check-label" htmlFor="wd-media-recordings">
                Media Recordings
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-student-annotation"
              />
              <label
                className="form-check-label"
                htmlFor="wd-student-annotation"
              >
                Student Annotation
              </label>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-file-upload"
              />
              <label className="form-check-label" htmlFor="wd-file-upload">
                File Uploads
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3 text-end">
          <label className="form-label pt-2">Assign</label>
        </div>
        <div className="col-md-9">
          <div className="border rounded p-3">
            <div className="mb-3">
              <label htmlFor="wd-assign-to" className="form-label fw-bold">
                Assign to
              </label>
              <input
                type="text"
                className="form-control"
                id="wd-assign-to"
                defaultValue="Everyone"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="wd-due-date" className="form-label fw-bold">
                Due
              </label>
              <input
                type="date"
                className="form-control"
                id="wd-due-date"
                value={assignment.dueDate}
                onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-from" className="form-label fw-bold">
                  Available from
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="wd-available-from"
                  value={assignment.availableFromDate}
                  onChange={(e) => setAssignment({ ...assignment, availableFromDate: e.target.value })}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="wd-available-until" className="form-label fw-bold">
                  Until
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="wd-available-until"
                  value={assignment.availableUntilDate}
                  onChange={(e) => setAssignment({ ...assignment, availableUntilDate: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
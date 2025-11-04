"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Link from "next/link";

export default function CoursesPage() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  
  return (
    <div>
      <h1>Courses</h1>
      <div className="list-group">
        {courses.map((course: any) => (
          <Link 
            key={course._id}
            href={`/Courses/${course._id}`}
            className="list-group-item list-group-item-action"
          >
            {course.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
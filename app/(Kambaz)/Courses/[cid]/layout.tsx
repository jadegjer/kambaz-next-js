"use client";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  
  // Handle undefined/array case
  const courseId = Array.isArray(cid) ? cid[0] : cid;
  
  // Check if user is enrolled
  useEffect(() => {
    if (currentUser && courseId) {
      const isEnrolled = enrollments.some(
        (enrollment: any) =>
          enrollment.user === (currentUser as any)._id &&
          enrollment.course === courseId
      );
      
      const isFaculty = (currentUser as any).role === "FACULTY";
      
      // Redirect to Dashboard if not enrolled and not faculty
      if (!isEnrolled && !isFaculty) {
        router.push("/Dashboard");
      }
    }
  }, [currentUser, courseId, enrollments, router]);
  
  if (!courseId) {
    return <div>Course not found</div>;
  }
  
  const course = courses.find((course: any) => course._id === courseId);
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation cid={courseId} />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { setEnrollments } from "../Enrollments/reducer";
import { RootState } from "../store";
import { Row, Col, Card, Button, CardImg, CardTitle, CardBody, CardText, FormControl } from "react-bootstrap";
import * as client from "../Courses/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();
  
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<any[]>([]);

  // Fetch enrolled courses on component load
  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch all courses for enrollment view
  const fetchAllCourses = async () => {
    try {
      const courses = await client.fetchAllCourses();
      setAllCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    if (showAllCourses) {
      fetchAllCourses();
    }
  }, [currentUser, showAllCourses]);

  // Check if user is faculty
  let isFaculty = false;
  if (currentUser) {
    isFaculty = (currentUser as any).role === "FACULTY";
  }

  // Determine which courses to display
  const displayedCourses = showAllCourses ? allCourses : courses;

  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    if (!currentUser) return false;
    return courses.some((course: any) => course._id === courseId);
  };

  // Handle enroll
  const handleEnroll = async (courseId: string) => {
    if (currentUser) {
      try {
        await client.enrollInCourse(courseId);
        // Refresh courses to get updated enrollment
        await fetchCourses();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Handle unenroll
  const handleUnenroll = async (courseId: string) => {
    if (currentUser) {
      try {
        await client.unenrollFromCourse(courseId);
        // Refresh courses to get updated enrollment
        await fetchCourses();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Add new course
  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
    } catch (error) {
      console.error(error);
    }
  };

  // Update course
  const onUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      dispatch(setCourses(courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })));
    } catch (error) {
      console.error(error);
    }
  };

  // Delete course
  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      
      {isFaculty && (
        <>
          <h5>New Course
              <button className="btn btn-primary float-end"
                      id="wd-add-new-course-click"
                      onClick={onAddNewCourse} > Add </button>
          </h5><hr />
          <button className="btn btn-warning float-end me-2"
                    onClick={onUpdateCourse} id="wd-update-course-click">
              Update </button>
          
          <FormControl value={course.name} className="mb-2"
                 onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
          <FormControl value={course.description} rows={3} as="textarea"
                 onChange={(e) => setCourse({ ...course, description: e.target.value }) } />
          <hr />
        </>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {showAllCourses ? "All Courses" : "Published Courses"} ({displayedCourses.length})
        </h2>
        <Button 
          variant="primary" 
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Enrollments"}
        </Button>
      </div>
      <hr />
      
      <div id="wd-dashboard-courses">
        {!currentUser && (
          <p>Please <Link href="/Account/Signin">sign in</Link> to view your courses.</p>
        )}
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course: any) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>

                    {/* Enrollment buttons */}
                    {showAllCourses && currentUser && (
                      <div onClick={(e) => e.preventDefault()}>
                        {isEnrolled(course._id) ? (
                          <button
                            className="btn btn-danger w-100 mb-2"
                            onClick={(e) => {
                              e.preventDefault();
                              handleUnenroll(course._id);
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success w-100 mb-2"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEnroll(course._id);
                            }}
                          >
                            Enroll
                          </button>
                        )}
                      </div>
                    )}

                    {/* Faculty buttons */}
                    {isFaculty && !showAllCourses && (
                      <>
                        <button onClick={(event) => {
                          event.preventDefault();
                          onDeleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </>
                    )}

                    <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </CardText>
                    <Button variant="primary"> Go </Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
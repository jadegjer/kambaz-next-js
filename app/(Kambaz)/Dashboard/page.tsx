import Link from "next/link";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  const courses = [
    {
      id: "1234",
      title: "ART1234 Renaissance Art",
      description: "Art from the renaissance period",
      image: "/images/art.jpg",
    },
    {
      id: "2345",
      title: "SCI2345 Astronomy",
      description: "The stars",
      image: "/images/astronomy.jpg",
    },
    {
      id: "3456",
      title: "SCI3456 Chemistry",
      description: "Matter and its properties",
      image: "/images/chemistry.jpg",
    },
    {
      id: "4567",
      title: "ENG4567 Classic Literature",
      description: "Reading the classics",
      image: "/images/literature.jpg",
    },
    {
      id: "5678",
      title: "HIST5678 East Asian History",
      description: "Study of the east asian countries",
      image: "/images/eahist.jpg",
    },
    {
      id: "6789",
      title: "MSC6789 Fundamentals of Music Theory",
      description: "Basics of musical theorem",
      image: "/images/music.jpg",
    },
    {
      id: "7890",
      title: "MATH7890 Calculus I",
      description: "Limits, derivatives, and integrals",
      image: "/images/calculus.jpg",
    },
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col
              key={course.id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href="/Courses/1234/Home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src={course.image}
                    className="card-img-top"
                    alt={course.title}
                    width="100%"
                    height={160}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.title}
                    </h5>
                    <p
                      className="card-text wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </p>
                    <Button variant="primary">Go</Button>
                  </div>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
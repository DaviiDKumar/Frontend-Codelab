import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./pages.css"
const ReactCourses = () => {
  const courses = useSelector((state) =>
    state.course.totalCourses.filter((course) => course.category === "React")
  );

  const navigate = useNavigate();
  return (
    <div className="courses-container">
       <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <h2>React Courses</h2>
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="course-card">
              <div className="course-thumbnail">
                <img src={course.thumbnail || "/default-thumb.jpg"} alt={course.title} />
              </div>
              <div className="course-content">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p><strong>Price:</strong> ₹{course.price}</p>
              </div>
            </div>
          ))
        ) : (
          <h3>No React Courses Found ❌</h3>
        )}
      </div>
    </div>
  );
};

export default ReactCourses;

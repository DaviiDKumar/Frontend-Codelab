import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./pages.css"
const Python = () => {
  const courses = useSelector((state) =>
    state.course.totalCourses.filter((course) => course.category === "Python")
  );

  const navigate = useNavigate();
  return (
    <div className="courses-container">
       <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <h2>Python Courses</h2>
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div className="course-card" key={course._id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Price:</strong> ₹{course.price}</p>
              {course.videos && course.videos.length > 0 && (
                <video width="100%" controls>
                  <source src={course.videos[0]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))
        ) : (
          <h3>No Python Courses Found ❌</h3>
        )}
      </div>
    </div>
  );
};

export default Python;

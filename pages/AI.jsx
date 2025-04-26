import { useSelector } from "react-redux";

const AI = () => {
  const courses = useSelector((state) =>
    state.course.totalCourses.filter((course) => course.category === "AI")
  );

  return (
    <div className="courses-container">
      <h2>AI Courses</h2>
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
          <h3>No AI Courses Found ❌</h3>
        )}
      </div>
    </div>
  );
};

export default AI;

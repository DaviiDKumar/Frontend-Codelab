import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../css/CoursePageNormal.css"; // Unique CSS file

const CoursePageNormal = () => {
  const { id } = useParams();
  const totalCourses = useSelector((state) => state.course.totalCourses);
  const course = totalCourses.find((c) => c._id === id);

  if (!course) return <h3 className="normal-error-message">Course Not Found ❌</h3>;

  console.log("COurse Info", course)

  return (
    <div className="normal-course-page">
      {/* Header Section */}
      <div className="normal-course-header">
        <h1 className="normal-course-title">{course.title}</h1>
        <p className="normal-course-description">{course.description}</p>
      </div>

      {/* Course Content Section */}
      <div className="normal-course-content">
        <img src={course.thumbnail} alt={course.title} className="normal-course-thumbnail" />
        <div className="normal-course-details">
          <h3 className="normal-course-price">Price: ₹{course.price}</h3>
        </div>
      </div>

      {/* Additional Details */}
      <div className="normal-course-extra">
        <h2>What You Will Learn</h2>
        <ul className="normal-course-learnings">
          {course.keyLearnings?.map((learning, index) => (
            <li key={index}>{learning}</li>
          ))}
        </ul>

        <h2>Requirements</h2>
        <ul className="normal-course-requirements">
          {course.requirements?.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>

        <h2>Course Details</h2>
        <p className="normal-long-description">{course.longDescription}</p>
      </div>
    </div>
  );
};

export default CoursePageNormal;

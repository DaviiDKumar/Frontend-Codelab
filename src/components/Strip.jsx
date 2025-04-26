import { Link } from "react-router-dom";  // Import Link from React Router
import "../css/Strip.css";

const Strip = () => {
  const courses = [
    "Web Development",
    "DSA",
    "React",
    "Python",
    "Machine Learning",
    "AI",
    "Blockchain",
    "Cyber Security",
    "DevOps",
    "UI/UX",
  ];

  return (
    <div className="course-strip">
      {courses.map((course, index) => (
        <Link to={`/${course.toLowerCase().replace(/ /g, "-")}`} key={index} className="course-item">
          {course}
        </Link>
      ))}
    </div>
  );
};

export default Strip;

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
        <span key={index} className="course-item">
          {course}
        </span>
      ))}
    </div>
  );
};

export default Strip;

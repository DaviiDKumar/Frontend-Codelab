import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/MyLearning.css";
import { savemyLearn } from "../redux/myLearningSlice.js";
import { Link } from "react-router-dom";

const MyLearning = () => {
  const dispatch = useDispatch();
  const { totalCourses } = useSelector((state) => state.course);
  const myLearning = useSelector((state) => state.myLearning.myLearning);
  const userId = useSelector((state) => state.user.user?._id);

  const learningCourses = myLearning
    .map((learningItem) =>
      totalCourses.find((course) => course._id === learningItem._id)
    )
    .filter((item) => item !== undefined);

  console.log("Learning Courses:", learningCourses);

  // ✅ Optimized Auto-save to prevent redundant API calls
  useEffect(() => {
    if (userId && myLearning.length) {
      const lastSavedLearning = JSON.parse(localStorage.getItem("lastSavedLearning")) || [];

      if (JSON.stringify(lastSavedLearning) !== JSON.stringify(myLearning)) {
        dispatch(savemyLearn({ userId, myLearningItems: myLearning }));
        localStorage.setItem("lastSavedLearning", JSON.stringify(myLearning));
      }
    }
  }, [myLearning, dispatch, userId]);

  return (
    <div className="learning-container">
      <h2 className="learning-title">
        My Learning Courses ({learningCourses.length})
      </h2>

      {learningCourses.length === 0 ? (
        <p className="learning-empty">No courses in My Learning yet!</p>
      ) : (
        <div className="learning-grid">
          {learningCourses.map((course) => (
            <div key={course._id} className="learning-card">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="learning-thumbnail"
              />
              <div className="learning-details">
                <h3 className="learning-course-title">{course.title}</h3>
                <p className="learning-description">{course.description}</p>
                <Link to={`/course/${course._id}`}>
                  <button className="start-course-btn">Start Course</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;

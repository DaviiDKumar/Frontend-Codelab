import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { setCourses, searchCourses, setTotalCourses } from "../redux/courseSlice";
import { Link } from "react-router-dom";
import "../css/Courses.css";
import Search from "./Search";

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [activeCategory, setActiveCategory] = useState("DevOps");

  const dispatch = useDispatch();
  const totalCourses = useSelector((state) => state.course.totalCourses); // Fetch all courses from Redux

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/fetchCourses", {
          withCredentials: true,
        });

        console.log("API called");
        console.log("Courses:", res.data.courses);

        dispatch(setTotalCourses(res.data.courses)); // Store all courses in Redux
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch courses", err);
        setError("Failed to fetch courses");
        setLoading(false);
      }
    };

    if (!totalCourses.length) { // Only fetch if courses are not already loaded
      setLoading(true);
      fetchCourses();
    } else {
      setLoading(false);
    }
  }, [dispatch, totalCourses]);

  // Filter courses based on the selected category
  const filteredCourses = totalCourses.filter((course) =>
    [course.title, course.description].some((field) =>
      field.toLowerCase().includes(activeCategory.toLowerCase())
    )
  );

  const addCourseToCart = (course) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch(addToCart(course));
      setToast(`${course.title} added to cart ✅`);
    } else {
      setToast("Please login to add courses to cart 🚫");
    }
    
    setTimeout(() => setToast(false), 1200);
  };

  const handleSearch = (query) => {
    if (query.trim().length > 2) {
      dispatch(searchCourses(query));
    } else {
      dispatch(setCourses(filteredCourses)); // Reset courses if query length < 3
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="courses-container">
      <div>
        <h2>All Courses</h2>
        <Search onSearch={handleSearch} />
      </div>

      <ul className="categories">
        {["DevOps", "Python", "C++", "C Programming", "MERN"].map((category) => (
          <li
            key={category}
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>

      <div className="courses-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course._id} className="course-card">
              <Link to={`/newcoursepage/${course._id}`}>
                <img src={course.thumbnail} alt={course.title} className="course-image" />
              </Link>
              <div className="course-info">
                <h3>
                  <Link to={`/newcoursepage/${course._id}`}>{course.title}</Link>
                </h3>
                <p>{course.description}</p>
                <p>₹{course.price}</p>
                <div className="course-footer">
                  <button onClick={() => addCourseToCart(course)}>🛒 Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3>No Courses Found ❌</h3>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default Courses;

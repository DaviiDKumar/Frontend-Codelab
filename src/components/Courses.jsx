import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { setTotalCourses } from "../redux/courseSlice";
import "../css/Courses.css";
import { saveCart } from "../redux/cartSlice";
import CourseCard from "../Cards/CourseCard1.jsx"; // Import the CourseCard component
import { motion } from "framer-motion"; // Import Framer Motion for smooth scroll

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const dispatch = useDispatch();
  const totalCourses = useSelector((state) => state.course.totalCourses);

  const categories = ["All", "Web Development", "DSA", "React", "Python"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://backend-codelab.onrender.com/api/fetchCourses", {
          withCredentials: true,
        });

        dispatch(setTotalCourses(res.data.courses));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch courses");
        setLoading(false);
        console.log(err);
      }
    };

    if (!totalCourses.length) {
      setLoading(true);
      fetchCourses();
    } else {
      setLoading(false);
    }
  }, [dispatch, totalCourses]);

  const filteredCourses =
    activeCategory === "All"
      ? totalCourses
      : totalCourses.filter((course) => course.category === activeCategory);

  const addCourseToCart = (course) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // 1. Add course to Redux state and Local Storage (Synchronously)
      dispatch(addToCart(course));  // Update Redux state and local storage

      // 2. Fetch current cart from localStorage and send to backend (Asynchronously)
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      const cartItems = currentCart.map((item) => ({ ...item, quantity: item.quantity || 1 }));

      // 3. Dispatch the saveCart action to send cart items to backend
      dispatch(saveCart({ userId: user._id, cartItems }));

      setToast(`${course.title} added to cart ✅`);
    } else {
      setToast("Please login to add courses to cart 🚫");
    }

    setTimeout(() => setToast(false), 1200);
  };

  if (loading) return <h3>Loading...</h3>;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="coursE-container">
      <div className="coursE-header">
        <h2>Explore Our Courses</h2>
      </div>

      {/* Horizontal Category Strip with Scroll */}
      <div className="category-strip">
        {categories.map((category) => (
          <span
            key={category}
            className={`category-item ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </span>
        ))}
      </div>

      {/* Horizontal Slider with Framer Motion */}
      <motion.div
        className={`mainCourses-grid ${filteredCourses.length < 4 ? "centered" : ""}`}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 25 }}
      >
        <div className="courses-slider">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                onAddToCart={addCourseToCart}
              />
            ))
          ) : (
            <h3>No Courses Found ❌</h3>
          )}
        </div>
      </motion.div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default Courses;

import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

import "./pages.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ReactCourses = () => {
  const allCourses = useSelector((state) => state.course.totalCourses);

  const courses = useMemo(
    () =>
      allCourses?.filter((course) => course.category === "React") || [],
    [allCourses]
  );

  const [activeIndex, setActiveIndex] = useState(null);
  const toggleCollapse = (index) => setActiveIndex(activeIndex === index ? null : index);
  function truncateText(text, maxWords) {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(" ") + " ...";
  }


  return (
    <div className="pages--container">
      {/* Hero Section */}
      <section className="pages--hero-rct">
        <div className="pages--hero-content">
          <h1 className="pages--hero-title">Master React Development</h1>
          <p className="pages--hero-description">
            Learn React to build dynamic user interfaces and become a frontend developer.
          </p>
        </div>
      </section>

      {/* Why Learn React Section */}
      <section className="pages--why-learn-ai">
        <h2 className="pages--heading">Why Learn React?</h2>
        <div className="pages--why-ai-cards-container">
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Component-Based Architecture</h4>
            <p className="pages--ai-card-description">
              React enables a component-based architecture that promotes reusability and maintainability.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Efficient Virtual DOM</h4>
            <p className="pages--ai-card-description">
              React uses a virtual DOM to optimize updates and enhance performance, making it suitable for large-scale applications.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Strong Community and Ecosystem</h4>
            <p className="pages--ai-card-description">
              With a large community, React is supported by numerous tools, libraries, and frameworks, making development easier and faster.
            </p>
          </div>
        </div>
      </section>

      {/* React Courses Section */}
      <section className="pages--courses">
        <h2 className="pages--heading">React Courses</h2>
        <div className="pages--courses-grid-container">
          <div className="pages--courses-grid">
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course._id} className="pages--course-card">
                  <div className="pages--course-thumbnail">
                    <img
                      src={course.thumbnail || "/default-thumb.jpg"}
                      alt={course.title}
                    />
                  </div>
                  <div className="pages--course-content">
                    <h4 className="pages--course-title">{course.title}</h4>
                    <p className="pages--course-description">{truncateText(course.description, 7)}</p>
                    <p className="pages--course-price">
                      <strong>Price:</strong> ₹{course.price}
                    </p>
                  </div>
                  <div className="pages--course-footer">
                    <button className="pages--enroll-btn">Enroll Now</button>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="pages--no-courses">No React Courses Found ❌</h3>
            )}
          </div>
        </div>
      </section>

      {/* React Issues Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">Common React Issues</h2>

        {[{
          title: "State Management Challenges",
          content: "Managing state in React can be complex for large applications, especially when dealing with component states across multiple levels."
        }, {
          title: "Performance Optimization",
          content: "Optimizing React components and avoiding unnecessary re-renders is crucial for improving performance in larger apps."
        }, {
          title: "JSX Syntax Confusion",
          content: "React's JSX syntax, which mixes HTML with JavaScript, can be confusing to beginners coming from other languages."
        }].map((item, i) => (
          <div
            key={i}
            className={`pages--collapsible-item ${activeIndex === i ? "active" : ""}`}
          >
            <button
              onClick={() => toggleCollapse(i)}
              className="pages--collapsible-btn"
            >
              {item.title}
              <ExpandMoreIcon
                className={`pages--collapsible-arrow ${activeIndex === i ? "active" : ""}`}
                style={{
                  transform: activeIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </button>
            <div className="pages--collapsible-content">{item.content}</div>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">FAQ on React</h2>

        {[{
          title: "What is React?",
          content: "React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components for fast and efficient web applications."
        }, {
          title: "Why is React so Popular?",
          content: "React is popular because of its simplicity, performance optimization using the virtual DOM, and the ability to build dynamic and reusable components."
        }, {
          title: "How Do I Get Started with React?",
          content: "To get started, you should learn the basics of JavaScript, JSX, and functional components. Then, dive deeper into hooks and state management with tools like Redux."
        }].map((item, i) => (
          <div
            key={i}
            className={`pages--collapsible-item ${activeIndex === i ? "active" : ""}`}
          >
            <button
              onClick={() => toggleCollapse(i)}
              className="pages--collapsible-btn"
            >
              {item.title}
              <ExpandMoreIcon
                className={`pages--collapsible-arrow ${activeIndex === i ? "active" : ""}`}
                style={{
                  transform: activeIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}
              />
            </button>
            <div className="pages--collapsible-content">{item.content}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReactCourses;

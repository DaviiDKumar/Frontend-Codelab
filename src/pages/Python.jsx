import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

import "./pages.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Python = () => {
  const allCourses = useSelector((state) => state.course.totalCourses);

  const courses = useMemo(
    () =>
      allCourses?.filter((course) => course.category === "Python") || [],
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
      <section className="pages--hero-py">
        <div className="pages--hero-content">
          <h1 className="pages--hero-title">Master Python Programming</h1>
          <p className="pages--hero-description">
            Dive into Python programming and build your skills for various applications in data science, web development, and more.
          </p>
        </div>
      </section>

      {/* Why Learn Python Section */}
      <section className="pages--why-learn-ai">
        <h2 className="pages--heading">Why Learn Python?</h2>
        <div className="pages--why-ai-cards-container">
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Simple and Readable Syntax</h4>
            <p className="pages--ai-card-description">
              Python&apos;s syntax is easy to read and understand, making it ideal for beginners and experienced developers alike.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Versatile and Powerful</h4>
            <p className="pages--ai-card-description">
              Python is used in a wide range of fields, from web development to machine learning and automation.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Huge Community Support</h4>
            <p className="pages--ai-card-description">
              Python has a large and supportive community, making it easy to find resources, libraries, and tools.
            </p>
          </div>
        </div>
      </section>

      {/* Python Courses Section */}
      <section className="pages--courses">
        <h2 className="pages--heading">Python Courses</h2>
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
              <h3 className="pages--no-courses">No Python Courses Found ❌</h3>
            )}
          </div>
        </div>
      </section>

      {/* Python Issues Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">Common Python Issues</h2>

        {[{
          title: "Indentation Errors",
          content: "Python relies on indentation to define code blocks. Missing or incorrect indentation often leads to errors."
        }, {
          title: "Memory Management",
          content: "In some cases, Python’s memory management can be inefficient, leading to performance bottlenecks for large datasets."
        }, {
          title: "Global Interpreter Lock (GIL)",
          content: "Python’s Global Interpreter Lock can limit multi-threaded performance, making it challenging for CPU-bound tasks."
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
        <h2 className="pages--heading">FAQ on Python Programming</h2>

        {[{
          title: "What is Python?",
          content: "Python is a versatile programming language used for web development, data science, scripting, and more. It is known for its simple syntax."
        }, {
          title: "Why is Python Popular?",
          content: "Python's popularity comes from its readability, simplicity, and versatility. It's used by beginners and experts for various applications."
        }, {
          title: "How Can I Learn Python?",
          content: "Start with basic concepts like variables, loops, and functions. Then, progress to libraries and frameworks like Django, Flask, and Pandas."
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

export default Python;

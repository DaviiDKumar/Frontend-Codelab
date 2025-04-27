import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

import "./pages.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const WebDevelopment = () => {
  const allCourses = useSelector((state) => state.course.totalCourses);

  const courses = useMemo(
    () => allCourses?.filter((course) => course.category === "Web Development") || [],
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
      <section className="pages--hero-wd">
        <div className="pages--hero-content">
          <h1 className="pages--hero-title">Master Web Development</h1>
          <p className="pages--hero-description">
            Learn Web Development to build stunning websites and web applications.
          </p>
        </div>
      </section>

      {/* Why Learn Web Development Section */}
      <section className="pages--why-learn-ai">
        <h2 className="pages--heading">Why Learn Web Development?</h2>
        <div className="pages--why-ai-cards-container">
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">High Demand</h4>
            <p className="pages--ai-card-description">
              Web developers are in high demand globally as businesses shift to online platforms.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Creative Career</h4>
            <p className="pages--ai-card-description">
              Web development allows you to express creativity while solving technical challenges.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Wide Range of Opportunities</h4>
            <p className="pages--ai-card-description">
              From freelancing to full-time employment, web development offers numerous career paths.
            </p>
          </div>
        </div>
      </section>

      {/* Web Development Courses Section */}
      <section className="pages--courses">
        <h2 className="pages--heading">Web Development Courses</h2>
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
                    <p className="pages--course-description">{truncateText(course.description, 6)}</p>
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
              <h3 className="pages--no-courses">No Web Development Courses Found ❌</h3>
            )}
          </div>
        </div>
      </section>

      {/* Web Development Issues Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">Common Web Development Issues</h2>

        {[{
          title: "Cross-Browser Compatibility",
          content: "Ensuring your website works on all browsers can be challenging due to differences in rendering engines."
        }, {
          title: "Responsive Design",
          content: "Creating a responsive website that works well on all devices can be complex, but it’s essential in today’s mobile-first world."
        }, {
          title: "Website Performance",
          content: "Optimizing website performance by reducing load times is critical to providing a great user experience."
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
        <h2 className="pages--heading">FAQ on Web Development</h2>

        {[{
          title: "What is Web Development?",
          content: "Web development is the process of building and maintaining websites and web applications for the internet."
        }, {
          title: "What are the main technologies in Web Development?",
          content: "Common web development technologies include HTML, CSS, JavaScript, and various frameworks like React, Angular, and Vue."
        }, {
          title: "How do I get started with Web Development?",
          content: "Start by learning HTML, CSS, and JavaScript, then progress to front-end and back-end frameworks. Build projects to practice your skills."
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

export default WebDevelopment;

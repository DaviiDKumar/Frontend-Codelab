import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

import "./pages.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const UIUX = () => {
  const allCourses = useSelector((state) => state.course.totalCourses);

  const courses = useMemo(
    () => allCourses?.filter((course) => course.category === "UI/UX") || [],
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
      <section className="pages--hero-ui">
        <div className="pages--hero-content">
          <h1 className="pages--hero-title">Master UI/UX Design</h1>
          <p className="pages--hero-description">
            Learn UI/UX to design intuitive user interfaces and provide great user experiences.
          </p>
        </div>
      </section>

      {/* Why Learn UI/UX Section */}
      <section className="pages--why-learn-ai">
        <h2 className="pages--heading">Why Learn UI/UX?</h2>
        <div className="pages--why-ai-cards-container">
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">User-Centered Design</h4>
            <p className="pages--ai-card-description">
              UI/UX focuses on the user experience, creating designs that are easy to use and visually appealing.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Boosts Career Opportunities</h4>
            <p className="pages--ai-card-description">
              UI/UX skills are highly sought after, with a growing demand for professionals in the design industry.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Improves Product Usability</h4>
            <p className="pages--ai-card-description">
              Good UI/UX design makes products easy to navigate, improving customer satisfaction and retention.
            </p>
          </div>
        </div>
      </section>

      {/* UI/UX Courses Section */}
      <section className="pages--courses">
        <h2 className="pages--heading">UI/UX Courses</h2>
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
              <h3 className="pages--no-courses">No UI/UX Courses Found ❌</h3>
            )}
          </div>
        </div>
      </section>

      {/* UI/UX Issues Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">Common UI/UX Issues</h2>

        {[{
          title: "Inconsistent User Interface",
          content: "Having inconsistent UI elements can confuse users and degrade the overall experience."
        }, {
          title: "Poor Navigation",
          content: "Difficult navigation can make users abandon your site or app. Keep it simple and intuitive."
        }, {
          title: "Overcomplicated Designs",
          content: "Too much information or complex designs can overwhelm users, leading to a poor experience."
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
        <h2 className="pages--heading">FAQ on UI/UX</h2>

        {[{
          title: "What is UI/UX Design?",
          content: "UI/UX design is the process of designing user interfaces and experiences for applications and websites to ensure ease of use and satisfaction."
        }, {
          title: "Why is UI/UX important?",
          content: "Good UI/UX design makes digital products more user-friendly, resulting in better user engagement and retention."
        }, {
          title: "How can I learn UI/UX Design?",
          content: "Start with understanding design principles, learning wireframing, prototyping, and user testing. You can also enroll in online courses to gain practical experience."
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

export default UIUX;

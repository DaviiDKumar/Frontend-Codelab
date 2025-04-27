import { useSelector } from "react-redux";
import { useState } from "react";
import "./pages.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';  // Import Material UI arrow icon

const AI = () => {
  const courses = useSelector((state) =>
    state.course.totalCourses.filter((course) => course.category === "AI")
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
      <section className="pages--hero-ai">
        <div className="pages--hero-content">
          <h1 className="pages--hero-title">Unlock the Future with AI</h1>
          <p className="pages--hero-description">
            Dive into the world of Artificial Intelligence and start your learning journey today. Whether you&apos;re a beginner or an expert,
            we have the right course for you.
          </p>
        </div>
      </section>

      {/* Why Learn AI Section */}
      <section className="pages--why-learn-ai">
        <h2 className="pages--heading">Why Learn AI?</h2>
        <div className="pages--why-ai-cards-container">
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Industry Demand</h4>
            <p className="pages--ai-card-description">
              AI professionals are in high demand across various industries, offering endless career opportunities and growth.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Automation & Efficiency</h4>
            <p className="pages--ai-card-description">
              AI helps automate repetitive tasks, saving time and enhancing efficiency in business operations.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Innovative Solutions</h4>
            <p className="pages--ai-card-description">
              AI is at the forefront of innovation, offering new ways to solve problems and create new technologies.
            </p>
          </div>
        </div>
      </section>

      {/* AI Courses Section */}
      <section className="pages--courses">
        <h2 className="pages--heading">AI Courses</h2>
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
              <h3 className="pages--no-courses">No Courses Found ❌</h3>
            )}
          </div>
        </div>
      </section>

      {/* Collapsible FAQ Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">Why AI is the Future?</h2>

        {[{
          title: "What is AI?",
          content: "Artificial Intelligence refers to the simulation of human intelligence in machines that are programmed to think and learn. From Siri to autonomous vehicles, AI is already making a significant impact on our lives."
        }, {
          title: "How is AI Impacting Industries?",
          content: "AI is revolutionizing industries such as healthcare, finance, and manufacturing by automating processes, predicting outcomes, and enhancing decision-making. AI professionals are in high demand to drive these innovations."
        }, {
          title: "Career Opportunities in AI",
          content: "As AI technology continues to grow, the need for skilled AI professionals is increasing. Explore roles like Data Scientist, Machine Learning Engineer, and AI Researcher that offer excellent career prospects."
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

export default AI;

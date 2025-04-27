import { useSelector } from "react-redux";
import { useState } from "react";
import "./pages.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DevOps = () => {
  const courses = useSelector((state) =>
    state.course.totalCourses.filter((course) => course.category === "DevOps")
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
      <section className="pages--hero-do">
        <div className="pages--hero-content">
          <h1 className="pages--hero-title">Transform Your Career with DevOps</h1>
          <p className="pages--hero-description">
            Unlock the power of DevOps practices and accelerate your career in modern software development. Learn from industry experts and apply best practices.
          </p>
        </div>
      </section>

      {/* Why Learn DevOps Section */}
      <section className="pages--why-learn-ai">
        <h2 className="pages--heading">Why Learn DevOps?</h2>
        <div className="pages--why-ai-cards-container">
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Industry Demand</h4>
            <p className="pages--ai-card-description">
              DevOps engineers are in high demand as companies look to increase efficiency, speed up development cycles, and improve collaboration between development and operations teams.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Automation & Efficiency</h4>
            <p className="pages--ai-card-description">
              DevOps practices emphasize automation of manual tasks, which improves efficiency in building, testing, and deploying applications.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Faster Time to Market</h4>
            <p className="pages--ai-card-description">
              DevOps encourages continuous integration and continuous deployment (CI/CD), which reduces time to market and allows teams to deliver new features quickly.
            </p>
          </div>
        </div>
      </section>

      {/* DevOps Courses Section */}
      <section className="pages--courses">
        <h2 className="pages--heading">DevOps Courses</h2>
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

      {/* DevOps Issues Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">DevOps Issues</h2>

        {[{
          title: "Cultural Resistance",
          content: "Many organizations face cultural challenges when adopting DevOps. Teams may be resistant to change and reluctant to embrace a more collaborative way of working."
        }, {
          title: "Tooling Complexity",
          content: "DevOps involves a wide variety of tools for continuous integration, monitoring, and deployment. Integrating these tools into an efficient workflow can be complex."
        }, {
          title: "Managing Security",
          content: "Security is an essential part of DevOps, but it can be challenging to ensure security practices are integrated into the pipeline without disrupting development velocity."
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
        <h2 className="pages--heading">FAQ on DevOps</h2>

        {[{
          title: "What is DevOps?",
          content: "DevOps is a set of practices that aim to automate and integrate the processes of software development (Dev) and IT operations (Ops) to shorten the systems development lifecycle and provide continuous delivery."
        }, {
          title: "Why is DevOps Important?",
          content: "DevOps is important because it fosters collaboration between development and operations teams, reduces time to market, and improves the quality of software. It also helps businesses respond to market changes more quickly."
        }, {
          title: "How Can I Learn DevOps?",
          content: "You can learn DevOps through online courses, hands-on practice, and by learning tools such as Docker, Kubernetes, Jenkins, and others. Our platform offers various DevOps courses to help you get started."
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

export default DevOps;

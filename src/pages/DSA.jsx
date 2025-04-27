import { useSelector } from "react-redux";
import { useState } from "react";
import "./pages.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DSA = () => {
  const courses = useSelector((state) =>
    state.course.totalCourses.filter((course) => course.category === "DSA")
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
      <section className="pages--hero-dsa">
        <div className="pages--hero-content">
          <h1 className="pages--hero-title">Master Data Structures and Algorithms</h1>
          <p className="pages--hero-description">
            Strengthen your problem-solving skills with our comprehensive courses on Data Structures and Algorithms.
            From beginner to advanced, explore a variety of resources to sharpen your skills and ace coding interviews.
          </p>
        </div>
      </section>

      {/* Why Learn DSA Section */}
      <section className="pages--why-learn-ai">
        <h2 className="pages--heading">Why Learn DSA?</h2>
        <div className="pages--why-ai-cards-container">
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Problem-Solving Skills</h4>
            <p className="pages--ai-card-description">
              Mastering DSA enhances your problem-solving skills and prepares you for competitive coding and interviews.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Efficiency</h4>
            <p className="pages--ai-card-description">
              A deep understanding of DSA allows you to write efficient code, optimizing time and space complexity.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Job Readiness</h4>
            <p className="pages--ai-card-description">
              DSA is a crucial skill in software development, and it&apos;s often a major focus in technical interviews.
            </p>
          </div>
        </div>
      </section>

      {/* DSA Courses Section */}
      <section className="pages--courses">
        <h2 className="pages--heading">DSA Courses</h2>
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

      {/* DSA Issues Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">Common DSA Issues</h2>

        {[{
          title: "Complexity of Algorithms",
          content: "Understanding the time and space complexity of algorithms can be challenging. However, mastering complexity analysis helps in optimizing your code."
        }, {
          title: "Implementation Challenges",
          content: "Implementing complex data structures and algorithms without proper understanding can lead to errors. Practicing with real-world problems helps overcome this."
        }, {
          title: "Learning Curve",
          content: "For beginners, learning DSA can be overwhelming. It's important to practice regularly and approach problems step by step to gain proficiency."
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
        <h2 className="pages--heading">FAQ on DSA</h2>

        {[{
          title: "What is DSA?",
          content: "Data Structures and Algorithms (DSA) is the study of organizing and manipulating data efficiently. It covers a range of concepts such as arrays, linked lists, trees, graphs, and sorting algorithms."
        }, {
          title: "Why is DSA important for coding interviews?",
          content: "DSA is a core subject in technical interviews because it tests your problem-solving skills and understanding of how to design efficient algorithms."
        }, {
          title: "How can I improve my DSA skills?",
          content: "Regular practice on platforms like LeetCode, Codeforces, and HackerRank can significantly improve your DSA skills. You can also take our DSA courses to learn step-by-step."
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

export default DSA;

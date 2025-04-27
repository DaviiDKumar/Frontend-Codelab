import { useSelector } from "react-redux";
import { useMemo, useState } from "react";

import "./pages.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MachineLearning = () => {
  const allCourses = useSelector((state) => state.course.totalCourses);

  const courses = useMemo(
    () =>
      allCourses?.filter((course) => course.category === "Machine Learning") || [],
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
      <section className="pages--hero-ml">
        <div className="pages--hero-content">
          <h1 className="pages--hero-title">Dive into the World of Machine Learning</h1>
          <p className="pages--hero-description">
            Explore the endless possibilities of Machine Learning and AI. Our courses provide you with the skills needed to excel in this rapidly growing field.
          </p>
        </div>
      </section>

      {/* Why Learn Machine Learning Section */}
      <section className="pages--why-learn-ai">
        <h2 className="pages--heading">Why Learn Machine Learning?</h2>
        <div className="pages--why-ai-cards-container">
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">High Demand for ML Experts</h4>
            <p className="pages--ai-card-description">
              Machine learning is at the core of today&apos;s technological revolution. Companies are increasingly seeking professionals with ML skills.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Automation of Complex Tasks</h4>
            <p className="pages--ai-card-description">
              Machine learning automates complex tasks and makes intelligent decisions without human intervention.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Innovation and Future Tech</h4>
            <p className="pages--ai-card-description">
              ML is helping to shape the future of technology, including advancements in healthcare, robotics, and self-driving cars.
            </p>
          </div>
        </div>
      </section>

      {/* Machine Learning Courses Section */}
      <section className="pages--courses">
        <h2 className="pages--heading">Machine Learning Courses</h2>
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

      {/* Machine Learning Issues Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">Common Machine Learning Issues</h2>

        {[{
          title: "Overfitting and Underfitting",
          content: "One of the most common challenges in machine learning is balancing between overfitting (model too complex) and underfitting (model too simple)."
        }, {
          title: "Lack of Quality Data",
          content: "Machine learning models rely heavily on data. Inadequate or biased data can result in poor model performance."
        }, {
          title: "Complexity of Algorithms",
          content: "While powerful, many machine learning algorithms are complex and difficult to tune, requiring expertise and extensive experimentation."
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
        <h2 className="pages--heading">FAQ on Machine Learning</h2>

        {[{
          title: "What is Machine Learning?",
          content: "Machine Learning is a subset of AI that allows systems to learn from data, identify patterns, and make decisions without human intervention."
        }, {
          title: "Why is Machine Learning Important?",
          content: "Machine learning powers many applications today, from recommendation systems to predictive analytics, and has revolutionized industries like healthcare, finance, and marketing."
        }, {
          title: "How Can I Start Learning Machine Learning?",
          content: "Start by understanding basic concepts like linear regression, classification algorithms, and neural networks. Practice with projects and datasets to gain hands-on experience."
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

export default MachineLearning;

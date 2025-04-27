import { useSelector } from "react-redux";
import { useState } from "react";
import "./pages.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';  // Import Material UI arrow icon

const Blockchain = () => {
  const courses = useSelector((state) =>
    state.course.totalCourses.filter((course) => course.category === "Blockchain")
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
      <section className="pages--hero-bc">
        <div className="pages--hero-content">
          <h1 className="pages--hero-title">Unlock the Future with Blockchain</h1>
          <p className="pages--hero-description">
            Dive into the world of Blockchain technology and start your learning journey today. Whether you&apos;re a beginner or an expert,
            we have the right course for you.
          </p>
        </div>
      </section>

      {/* Why Learn Blockchain Section */}
      <section className="pages--why-learn-ai">
        <h2 className="pages--heading">Why Learn Blockchain?</h2>
        <div className="pages--why-ai-cards-container">
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Security & Transparency</h4>
            <p className="pages--ai-card-description">
              Blockchain technology offers secure and transparent transactions that cannot be tampered with, providing trust for all stakeholders.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Decentralized Systems</h4>
            <p className="pages--ai-card-description">
              Blockchain eliminates the need for a central authority, offering decentralized networks where participants have control.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Future of Finance</h4>
            <p className="pages--ai-card-description">
              Blockchain is revolutionizing the financial world, from cryptocurrencies to smart contracts, offering numerous possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Blockchain Courses Section */}
      <section className="pages--courses">
        <h2 className="pages--heading">Blockchain Courses</h2>
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
              <h3 className="pages--no-courses">No Blockchain Courses Found ❌</h3>
            )}
          </div>
        </div>
      </section>

      {/* Collapsible FAQ Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">Why Blockchain is the Future?</h2>

        {[{
          title: "What is Blockchain?",
          content: "Blockchain is a decentralized ledger of all transactions across a network. This technology is transparent, secure, and tamper-proof, making it highly useful for industries like finance, healthcare, and supply chain management."
        }, {
          title: "How is Blockchain Revolutionizing Industries?",
          content: "Blockchain is providing solutions to improve transparency, security, and efficiency in various sectors. It helps reduce fraud, streamline processes, and increase trust in digital transactions."
        }, {
          title: "Career Opportunities in Blockchain",
          content: "With the rise of blockchain technology, there is a growing demand for blockchain developers, architects, and engineers. Explore career paths that allow you to work on cutting-edge projects and transform industries."
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

export default Blockchain;

import { useSelector } from "react-redux";
import { useState } from "react";
import "./pages.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CyberSecurity = () => {
  const courses = useSelector((state) =>
    state.course.totalCourses.filter((course) => course.category === "Cyber Security")
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
      <section className="pages--hero-cs">
        <div className="pages--hero-content">
          <h1 className="pages--hero-title">Master Cyber Security</h1>
          <p className="pages--hero-description">
            Unlock the key to a secure digital world with our expert-led Cyber Security courses. Learn from industry leaders and start your journey today.
          </p>
        </div>
      </section>

      {/* About Cyber Security Section */}
      <section className="pages--why-learn-ai">
        <h2 className="pages--heading">Why Learn Cyber Security?</h2>
        <div className="pages--why-ai-cards-container">
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Growing Threat Landscape</h4>
            <p className="pages--ai-card-description">
              With the increasing number of cyberattacks, professionals skilled in cybersecurity are in high demand to protect valuable digital assets.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Protecting Sensitive Data</h4>
            <p className="pages--ai-card-description">
              Cyber Security experts are crucial in ensuring sensitive data remains secure from hackers, ensuring privacy in today&apos;s interconnected world.
            </p>
          </div>
          <div className="pages--why-ai-card">
            <h4 className="pages--ai-card-title">Career Opportunities</h4>
            <p className="pages--ai-card-description">
              As the demand for cyber security professionals grows, there are plenty of career opportunities ranging from security analysts to chief security officers.
            </p>
          </div>
        </div>
      </section>

      {/* Cyber Security Courses Section */}
      <section className="pages--courses">
        <h2 className="pages--heading">Cyber Security Courses</h2>
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

      {/* Cyber Security Issues Section */}
      <section className="pages--collapsible-section">
        <h2 className="pages--heading">Cyber Security Issues</h2>

        {[{
          title: "Data Breaches and Leaks",
          content: "A data breach occurs when sensitive or confidential information is accessed or stolen by unauthorized individuals. This often leads to identity theft, financial loss, and reputational damage."
        }, {
          title: "Malware and Ransomware Attacks",
          content: "Cybercriminals deploy malicious software like malware and ransomware to disrupt systems, steal sensitive information, or lock users out of their data until a ransom is paid."
        }, {
          title: "Phishing Attacks",
          content: "Phishing involves tricking individuals into revealing confidential information, often through fake emails, websites, or social media messages designed to look legitimate."
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
        <h2 className="pages--heading">FAQ on Cyber Security</h2>

        {[{
          title: "What is Cyber Security?",
          content: "Cyber Security refers to the practice of protecting systems, networks, and data from digital attacks, theft, or damage. It includes measures to defend against cyberattacks and unauthorized access."
        }, {
          title: "Why is Cyber Security Important?",
          content: "In today's digital world, cyber security is critical to safeguarding personal, financial, and business information from cybercriminals. As reliance on technology increases, so do the threats to data and privacy."
        }, {
          title: "How Can I Learn Cyber Security?",
          content: "You can start learning Cyber Security through online courses, certifications, and practical experiences. Our platform offers a range of courses to help you get started and develop your skills in this field."
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

export default CyberSecurity;

import { useState } from "react";
import "../css/LearningGoals.css"; // Import your CSS file for styling
import CodeIcon from '@mui/icons-material/Code';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import InsightsIcon from '@mui/icons-material/Insights';
import TuneIcon from '@mui/icons-material/Tune';

const LearningGoals = () => {
  const [selectedImage, setSelectedImage] = useState("/learngoals.webp");
  const [activeCard, setActiveCard] = useState("hands-on-training");

  const handleCardClick = (image, cardName) => {
    setSelectedImage(image);
    setActiveCard(cardName);
  };

  return (
    <div className="learning-goals">
      <div className="left-section">
        <h2>Learning focused on your goals</h2>

        <div
          className={`goal-card ${activeCard === "hands-on-training" ? "active" : ""}`}
          onClick={() => handleCardClick("/learngoals.webp", "hands-on-training")}
        >
          <CodeIcon className="icon" />
          <div>
            <h3>Hands-on training</h3>
            <p>Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.</p>
          </div>
        </div>

        <div
          className={`goal-card ${activeCard === "certification-prep" ? "active" : ""}`}
          onClick={() => handleCardClick("/lg2.webp", "certification-prep")}
        >
          <WorkspacePremiumIcon className="icon" />
          <div>
            <h3>Certification prep</h3>
            <p>Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.</p>
            <a href="#">Explore courses</a>
          </div>
        </div>

        <div
          className={`goal-card ${activeCard === "insights-analytics" ? "active" : ""}`}
          onClick={() => handleCardClick("/lg3.png", "insights-analytics")}
        >
          <InsightsIcon className="icon" />
          <div>
            <h3>Insights and analytics <span className="enterprise-tag">Enterprise Plan</span></h3>
            <p>Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.</p>
            <a href="#">Find out more</a>
          </div>
        </div>

        <div
          className={`goal-card ${activeCard === "customizable-content" ? "active" : ""}`}
          onClick={() => handleCardClick("/lg4.png", "customizable-content")}
        >
          <TuneIcon className="icon" />
          <div>
            <h3>Customizable content <span className="enterprise-tag">Enterprise Plan</span></h3>
            <p>Create tailored learning paths for team and organization goals and even host your own content and resources.</p>
            <a href="#">Find out more</a>
          </div>
        </div>
      </div>

      <div className="right-section">
        {/* Display the image based on the selected card */}
        <img src={selectedImage} alt="Learning progress" />
      </div>
    </div>
  );
};

export default LearningGoals;

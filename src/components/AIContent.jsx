import '../css/AIContent.css';
import img1 from '/aiimg1.png';
import { useNavigate } from 'react-router-dom'; // Corrected import

const AIContent = () => {
  const navigate = useNavigate();

  const handleainavigate = () => {
    navigate('/ai'); // Navigate to the AI page
  }

  return (
    <section className="ai-section">
      <div className="ai-left">
        <h1>AI for Business Leaders</h1>
        <p>
          Build an AI-habit for you and your team that builds hands-on skills to help you lead effectively.
        </p>
        <button className="start-btn" onClick={handleainavigate}>Start Learning </button>
      </div>

      <div className="ai-right">
        <img
          src={img1}
          alt="AI Business Leadership"
          className="ai-card"
        />
      </div>
    </section>
  );
};

export default AIContent;


import "../css/Feedback.css";

const feedbacks = [
  {
    message: "Code Lab helped me land my first freelance project. The React course was very clear and practical.",
    name: "Ankit Sharma",
   
  },
  {
    message: "The backend section was a game changer. I now understand how to build full-stack apps from scratch.",
    name: "Priya Verma",
  
  },
  {
    message: "I really liked the MongoDB module. The explanations were simple and beginner-friendly.",
    name: "Ravi Meena",
   
  },
  {
    message: "These courses are gold! I've built and deployed my own MERN project thanks to Code Lab.",
    name: "Sonal Patel",
   
  },
];

const Feedback = () => {
  return (
    <section className="feedback-section">
      <h2 className="feedback-heading">See what others are achieving through learning</h2>
      <div className="feedback-grid">
        {feedbacks.map((feedback, index) => (
          <div key={index} className="feedback-card">
            <p className="feedback-message">{feedback.message}</p>
            <div className="feedback-footer">
              <p className="feedback-name">{feedback.name}</p>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feedback;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the default styles
import "../css/Signup.css"; // Import the CSS file

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmPassword state
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // Make the API request (backend not affected by password match check)
      await axios.post("http://localhost:3000/api/signup", {
        name,
        email,
        password,
      });
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      toast.error("Signup failed! Please try again.");
    }
  };

  return (
    <div className="signup-container">
      {/* Wrapper div for both form and other content */}
      <div className="form-container">
        {/* Signup form */}
        <form onSubmit={handleSignup} className="signup-form">
          <h2>Sign Up</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="signup-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-input"
          />

          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>

        {/* Alternative section (Already a member? Login and image) */}
        <div className="login-info">
          <p>Already a member? <a href="/login">Login here</a></p>
          <img src="/sugnup-removebg-preview.png" alt="Signup Image" className="signup-image" />
        </div>
      </div>

   
    </div>
  );
};

export default Signup;

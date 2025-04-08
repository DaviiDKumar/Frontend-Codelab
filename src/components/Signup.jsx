import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Signup.css"; // Import the CSS file

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/signup", {
        name,
        email,
        password,
      });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      alert("Signup failed! Please try again.");
    }
  };

  return (
    <div className="signup-container">
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
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;

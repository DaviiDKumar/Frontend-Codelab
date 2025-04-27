import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { setCart } from "../redux/cartSlice";
import { setMyLearning } from "../redux/myLearningSlice";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

// Importing Material UI Icons
import BookIcon from '@mui/icons-material/Book';

import HelpIcon from '@mui/icons-material/Help';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post(
        "https://backend-codelab.onrender.com/api/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(loginSuccess(res.data));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(setCart(res.data.user.cart));
      localStorage.setItem("cart", JSON.stringify(res.data.user.cart));
      dispatch(setMyLearning(res.data.user.myLearning));
      localStorage.setItem("myLearning", JSON.stringify(res.data.user.myLearning));

      navigate("/");
      navigate(0);
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message);
      dispatch(loginFailure(err.response?.data?.message));
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const navigateToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="loginContainer">
      <div className="centeredContent">
        {/* Left Section */}
        <div className="leftPanel">
          <h1>New Here?</h1>
          <p>Join the best coding platform today.</p>
         

          {/* Features with Icons */}
          <div className="iconList">
            <div className="iconItem">
              <BookIcon className="icon" />
              <p>Learn from top courses</p>
            </div>
          
            <div className="iconItem">
              <HelpIcon className="icon" />
              <p>Get support anytime</p>
            </div>
            <button className="btnSignUp" onClick={navigateToSignup}>
            Create an Account
          </button>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="rightPanel">
          <form onSubmit={handleLogin} className="form">
            <h2>Login to Your Account</h2>

            {error && <p className="error">{error}</p>}

            <div className="inputGroup">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>

            <div className="inputGroup passwordGroup">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                required
              />
              <span className="togglePassword" onClick={togglePassword}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button type="submit" className="button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

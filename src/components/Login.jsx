import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { setCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { setMyLearning } from "../redux/myLearningSlice";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post(
        "http://localhost:3000/api/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(loginSuccess(res.data));
      localStorage.setItem("user", JSON.stringify(res.data.user));

      dispatch(setCart(res.data.user.cart));
      localStorage.setItem("cart", JSON.stringify(res.data.user.cart));

      dispatch(setMyLearning(res.data.user.myLearning));
      localStorage.setItem("myLearning", JSON.stringify(res.data.user.myLearning));

     

      window.refresh
      navigate("/")
      navigate(0);
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message);
      dispatch(loginFailure(err.response?.data?.message));
    }
  };

  // Re-render component immediately when cart updates
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    console.log("Cart Updated:", cart);
  }, [cart]);

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
